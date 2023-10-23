import React from 'react'
import "../styles/Article.css"
import dateFormat from "../utils/dateFormat"
import bodyPreview from "../utils/bodyPreview"

export default function Article({article}) {
    return (
    <ul key={`${article.article_id}-items`} className="article-list">
        <div className="article-grid">
        <li key={`${article.article_id}-title`} className="article-list-title">{article.title}</li>
        <li key={`${article.article_id}-topic`} className="article-list-topic">{article.topic}</li>
        <li key={`${article.article_id}-author`} className="article-list-author">{article.author}</li>
        <li key={`${article.article_id}-date`} className="article-list-date">{dateFormat(article.created_at)}</li>
        <li key={`${article.article_id}-img`} className="article-list-img"><img src={`${article.article_img_url}`} className="article-list-img-size" alt={`A picture of article with title: ${article.title}`}/></li>
        <li key={`${article.article_id}-comment`} className="article-list-comment">Comments ({article.comment_count})</li>
        <li key={`${article.article_id}-votes`} className="article-list-votes">{article.votes}<img src="./src/static/votes.png" className="votes-picture"/></li>
        </div>
    </ul>
    )
    
}
