import React, { useEffect, useState, useRef } from 'react'
import NewsAPI from '../api/newsReaderAPI'
import Article from './ArticleInList'
import useLoading from '../hooks/useLoading'
import Loading from './Loading'
import "../styles/Home.css"
import { useLocation } from 'react-router-dom'

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
        <Article article={recentArticles[0]} imageSize={"xsmall"}></Article>
         <Article article={recentArticles[1]} imageSize={"small"}></Article>
        <Article article={recentArticles[2]} imageSize={"small"}></Article>
        </div>
    </div>
  )
}
