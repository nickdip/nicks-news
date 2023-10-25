
import React, { useEffect, useState} from 'react'
import NewsAPI from "../api.js"
import Article from "./ArticleInList.jsx"
import { useSearchParams, useLocation, Link } from 'react-router-dom'
import '../styles/AllArticles.css'
import useLoading from '../hooks/useLoading'
import Loading from './Loading'
import ClipLoader from "react-spinners/ClipLoader";


export default function AllArticles() {

  const { isLoading, setIsLoading } = useLoading();

  const [ articles, setArticles ] = useState([])

  const [ searchParams, setSearchParams ] = useSearchParams("")

  let order = searchParams.get("order")

  const [ isAscending, setIsAscending ] = order ? useState(order === "asc") : useState(true)

  const [ sortBy, setSortBy ] = useState({})


  const updateSearchParams = (params) => {
    const newParams = { ...searchParams, ...params }
    console.log(newParams)
    setSearchParams(newParams)
  }

  const returnOrder = () => {
    return isAscending ? "asc" : "desc"
  }

  const orderTextDisplayed = () => {
    return isAscending ? "Lowest - Highest" : "Highest - Lowest "
  }


  const location = useLocation()


  useEffect(() => {
    setIsLoading(true)
     NewsAPI.getAllArticles(location.search)
     .then( ( { articles }) => {
        setArticles(articles)
        setIsLoading(false)
     })
  }, [searchParams])

  if (isLoading) return <Loading></Loading>

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
        <Link class="order-pic-text" onClick={() => {
          setIsAscending(!isAscending)
          updateSearchParams({ order: returnOrder() })} }to={`/all?order=${returnOrder()}`}>
            <img src="../src/static/up-down-sort.png" className="order-arrows-pic" alt="up and down arrows to change whether order is ascending or descending"/>
            {orderTextDisplayed()}
            </Link>
      </div>
      <ul className="articles-list">
      {articles.map((article) => {
        return (<li key={`${article.article_id}-items`} className="article-li">
        <Article article={article}></Article>
        </li>)})}
      </ul>
    </div>
  )
}
