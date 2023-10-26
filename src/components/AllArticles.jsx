
import React, { useEffect, useState} from 'react'
import NewsAPI from "../api/newsReaderAPI.js"
import Article from "./ArticleInList.jsx"
import { useSearchParams, useLocation, Link } from 'react-router-dom'
import '../styles/AllArticles.css'
import useLoading from '../hooks/useLoading'
import Loading from './Loading'
import TopicError from './Errors/TopicError.jsx'


export default function AllArticles() {

  const { isLoading, setIsLoading } = useLoading();

  const [ articles, setArticles ] = useState([])

  const [ searchParams, setSearchParams ] = useSearchParams()

  const [ topicError, setTopicError ] = useState(false) 

  const location = useLocation()

  const [ topicQuery, setTopicQuery ] = useState(location.pathname.split("/")[2])


  let order = searchParams.get("order")


  const [ isAscending, setIsAscending ] = order ? useState(order === "asc") : useState(true)

  const [ sortBy, setSortBy ] = useState({})


  const updateSearchParams = (params) => {
    const newParams = { ...searchParams, ...params }
    setSearchParams(newParams)
  }

  const returnOrder = () => {
    return isAscending ? "asc" : "desc"
  }

  const orderTextDisplayed = () => {
    return isAscending ? "Lowest - Highest" : "Highest - Lowest "
  }

  console.log(location.search)


  useEffect(() => {
    setIsLoading(true)
     let searchQuery = location.search
     if (topicQuery) {
       searchQuery = `?topic=${topicQuery}&` + searchQuery
     }
     NewsAPI.getAllArticles(searchQuery)
     .then( ( { articles }) => {
        if (topicQuery && articles.length === 0) {
          setTopicError(true)
        }
        setArticles(articles)
        setIsLoading(false)
     })
  }, [searchParams])

  if (isLoading) return <Loading></Loading>
  if (topicError) return <TopicError></TopicError>

  return (
    <div>
      <h2>All Articles</h2>
      <div className="all-article-queries">
        <form>
          <label htmlFor="sort_by">Sort By: </label>
          <select name="sort_by" id="sort_by" onChange={(e) => setSortBy(e.target.value)}>
            <option value="created_at">Date</option>
            <option value="comment_count">Comment Count</option>
            <option value="votes">Votes</option>
          </select>
          <button type="button" onClick={() => {updateSearchParams({sort_by: sortBy})}}>Sort</button>
        </form>
        <Link className="order-pic-text" onClick={() => {
          setIsAscending(!isAscending)
          updateSearchParams({ order: returnOrder() })} }to={`/all?order=${returnOrder()}`}>
            <img src="../src/static/up-down-sort.png" className="order-arrows-pic" alt="up and down arrows to change whether order is ascending or descending"/>
            {orderTextDisplayed()}
            </Link>
      </div>
      <ul className="articles-list">
      {articles.map((article) => {
        return (<li key={`${article.article_id}-items`} className="article-li">
        <Article article={article} imageSize={"normal"}></Article>
        </li>)})}
      </ul>
    </div>
  )
}
