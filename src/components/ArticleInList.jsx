import React from 'react'
import "../styles/Article.css"
import dateFormat from "../utils/dateFormat"
import { Link } from 'react-router-dom'

export default function Article({article, size}) {
    return (
    <ul key={`${article.article_id}-items`} className="article-list">
        <div className={`article-grid-${size}`}>
        <li key={`${article.article_id}-title`} className={`article-list-title-${size}`}><Link to={`/articles/${article.article_id}`}>{article.title}</Link></li>
        <li key={`${article.article_id}-topic`} className={`article-list-topic-${size}`}>{article.topic}</li>
        <li key={`${article.article_id}-author`} className={`article-list-author-${size}`}>{article.author}</li>
        <li key={`${article.article_id}-img`} className={`article-list-img-${size}`}><img src={`${article.article_img_url}`} className={`article-list-img-${size}`} alt={`A picture of article with title: ${article.title}`}/></li>
        <li key={`${article.article_id}-comment`} className={`article-list-comment-${size}`}><Link to={`/articles/${article.article_id}#comments`}>Comments ({article.comment_count})</Link></li>
        <li key={`${article.article_id}-votes`} className={`article-list-votes-${size}`}>
            <div className={`votes-pic-text-${size}`}>
                {article.votes}
                <img src="../src/static/up.png" className={`votes-picture-${size}`}/>
            </div>
            </li>
        </div>
    </ul>
    )
    
}
