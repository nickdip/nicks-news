import React, { useEffect, useState } from 'react'
import NewsAPI from "../api.js"
import { useParams } from 'react-router-dom';
import dateFormat from '../utils/dateFormat.js';
import votesColour from '../utils/votes.js';
import '../styles/ViewArticle.css'
import ArticleComment from './ArticleComment.jsx'
import PostComment from './PostComment.jsx'
import newsAPI from '../api.js';
import useLoading from '../hooks/useLoading';
import Loading from './Loading.jsx';


export default function ViewArticle() {

    const { isLoading, setIsLoading } = useLoading();

    const { id } = useParams()
    const [ article, setArticle ] = useState({})

    const [ currentVotes, setCurrentVotes ] = useState(0)
    const [ hasVoted, setHasVoted ] = useState(false)

    const [ postComment, setPostComment ] = useState(false)

    const handleVote = (vote) => { 
        if (hasVoted) return
        newsAPI.patchArticleById(id, { inc_votes: vote })
        .then( () => {
            setCurrentVotes(currentVotes + vote)
            setHasVoted(true)})

    }

    useEffect(() => {
        setIsLoading(true)
        NewsAPI.getArticleById(id)
        .then( ( { article } ) => {
            setArticle(article)
            setCurrentVotes(article.votes)
            setIsLoading(false)
        })

    }, [])

    console.log(1)

    if (isLoading) return <Loading></Loading>

    console.log(2)

    if (article.article_id) return (
    <>
    <div className="viewArticleGrid">
        <div className="viewArticle-id">#{article.article_id}</div>
        <div className="viewArticle-topic">{article.topic}</div>
        <h1 className="viewArticle-title">{article.title}</h1>
        <div className="viewArticle-date">{dateFormat(article.created_at)}</div>
        <div className="viewArticle-author">{article.author}</div>
        <div className="viewArticle-img-url"><img src={article.article_img_url} className="viewArticle-img-size" alt={`Picture for article with title ${article.topic}`}/></div>
        <div className="viewArticle-body">{article.body}</div>
        <div className="viewArticle-votes"><span style={votesColour(article.votes)}>{currentVotes}</span>
            <a href="#" onClick={ () => handleVote(1)}>
            <img src={"../src/static/up.png"} className="viewArticle-votes-up"/></a>
            <a href="#" onClick={ () => handleVote(-1) }>
            <img src={"../src/static/down.png"} className="viewArticle-votes-down"/></a>
            </div>
        <div className="viewArticle-comment"><a href="#comments">Comments ({article.comment_count})</a></div>
    </div>
    <div className="show-comments">
        <div id="comments">
            <PostComment postComment={postComment} setPostComment={setPostComment}></PostComment>
            <h2>Show Comments</h2>
            <ArticleComment postComment={postComment}></ArticleComment>
        </div>
    </div>
    </>
  )
}