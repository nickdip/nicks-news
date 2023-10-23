
import React, { useEffect, useState } from 'react'
import NewsAPI from "../api.js"
import Article from "./Article"

export default function AllArticles() {

  const [ articles, setArticles ] = useState([])

  console.log("HELLLO")
  useEffect(() => {
     NewsAPI.getAllArticles()
     .then( ( { articles }) => {
        console.log(articles)
        setArticles(articles)
     })
  }, [])

  return (
    <div>
      <h2>All Articles</h2>
      <ul className="articles-list">
      {articles.map((article) => {
        return (<li key={`${article.article_id}-items`} className="article-li">
        <Article article={article}></Article>
        </li>)})}
      </ul>
    </div>
  )
}
