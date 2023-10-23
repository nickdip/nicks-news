import React, { useEffect, useState } from 'react'
import NewsAPI from "../api.js"
import { useParams } from 'react-router-dom';
import dateFormat from '../utils/dateFormat.js';

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
    <div className="viewArticle-id">{article.article_id}</div>
    <div className="viewArticle-topic">{article.topic}</div>
    <h2 className="viewArticle-title">{article.title}</h2>
    <div className="viewArticle-id">{dateFormat(article.created_at)}</div>
    <div>{article.author}</div>
    <div>{article.article_img_url}</div>
    <div>{article.body}</div>
    <div>{article.votes}</div>
    <div>{article.comment_count}</div>

    </div>
  )
  else return <div>Loading...</div>
}
