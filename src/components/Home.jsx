import React, { useEffect, useState } from 'react'
import NewsAPI from '../api/newsReaderAPI'
import Article from './ArticleInList'
import useLoading from '../hooks/useLoading'
import Loading from './Loading'
import "../styles/Home.css"

export default function Home() {

  //https://nicks-nc-news.onrender.com/api/articles?sort_by=created_at&limit=3

  const [ recentArticles, setRecentArticles ] = useState([])  
  const { isLoading, setIsLoading } = useLoading();
  
  useEffect( () => {
    setIsLoading(true)
    getMostRecentArticles()
  }, [])

  const getMostRecentArticles = async () => {
    const { articles } = await NewsAPI.getAllArticles("?sort_by=created_at&limit=3")
    setRecentArticles(articles)
    setIsLoading(false)
    console.log(recentArticles, "recentArticles")
    }

    if (isLoading) return <Loading></Loading>

  return (
    <div className="home-flex">
      <div className="home-main-article">
        <Article article={recentArticles[0]} imageSize={"xsmall"}></Article>
      </div>
      <div className="home-small-articles-flex">
        <div className="home-small-article">
          <Article article={recentArticles[1]} imageSize={"small"}></Article>
        </div>
        <div className="home-small-article">
          <Article article={recentArticles[2]} imageSize={"small"}></Article>
        </div>
      </div>
    </div>
  )
}
