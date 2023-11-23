import React, { useEffect, useState, useRef } from 'react'
import NewsAPI from '../api/newsReaderAPI'
import Article from './ArticleInList'
import useLoading from '../hooks/useLoading'
import Loading from './Loading'
import "../styles/Home.css"

export default function Home({homeKey, setHomeKey}) {

  console.log(homeKey, "homeKey")


  const containerRef = useRef(null)


  const [ recentArticles, setRecentArticles ] = useState([])  
  const { isLoading, setIsLoading } = useLoading(false)

  const getMostRecentArticles = async () => {
    const { articles } = await NewsAPI.getAllArticles("?sort_by=created_at&limit=3")
    setRecentArticles(articles)
    setIsLoading(false)
    }


  useEffect( () => {
    setIsLoading(true)
    getMostRecentArticles()

    const handleScroll = () => {
      if (containerRef.current) {
          containerRef.current.scrollLeft = window.scrollX;
      }
    }

    window.addEventListener('scroll', handleScroll)
    
  }, [homeKey])



  if (isLoading || !recentArticles.length) return <Loading></Loading>

  return (
    <div className="home-flex">
      <div className="home-main-article">
        <Article article={recentArticles[0]} size={"large"}></Article>
      </div>
      <div className="home-small-articles">
        <div className="article1">
         <Article article={recentArticles[1]} size={"small"}></Article>
         </div>
        <div className="article2">
        <Article article={recentArticles[2]} size={"small"}></Article>
        </div>
      </div>
    </div>
  )
}
