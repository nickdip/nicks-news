import React, { useEffect, useState } from 'react'
import NewsAPI from "../api.js"
import { useParams } from 'react-router-dom';
import dateFormat from '../utils/dateFormat.js';
import '../styles/viewArticle.css'


export default function ViewArticle() {

    const { id } = useParams()
    const [ article, setArticle ] = useState({})

    useEffect(() => {
        NewsAPI.getArticleById(id)
        .then( ( { article } ) => {
            setArticle(article)
        })

    }, [])

    if (article.article_id) return (
    <div className="viewArticleGrid">
    <div className="viewArticle-id">#{article.article_id}</div>
    <div className="viewArticle-topic">{article.topic}</div>
    <h1 className="viewArticle-title">{article.title}</h1>
    <div className="viewArticle-date">{dateFormat(article.created_at)}</div>
    <div className="viewArticle-author">{article.author}</div>
    <div className="viewArticle-img-url"><img src={article.article_img_url} className="viewArticle-img-size" alt={`Picture for article with title ${article.topic}`}/></div>
    <div className="viewArticle-body">{article.body}</div>
    <div className="viewArticle-votes">{article.votes}<img src="../src/static/votes.png" className="viewArticle-votes-picture"/></div>
    <div className="viewArticle-comment">Comments ({article.comment_count})</div>

    </div>
  )
  else return <div>Loading...</div>
}
