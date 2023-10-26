import React, { useEffect, useState, useRef } from 'react'
import NewsAPI from "../api/newsReaderAPI.js"
import { useParams, useLocation } from 'react-router-dom';
import dateFormat from '../utils/dateFormat.js';
import votesColour from '../utils/votes.js';
import '../styles/ViewArticle.css'
import ArticleComment from './ArticleComment.jsx'
import PostComment from './PostComment.jsx'
import newsAPI from "../api/newsReaderAPI.js"
import useLoading from '../hooks/useLoading';
import Loading from './Loading.jsx';
import ArticleError from '../components/Errors/ArticleError.jsx'
import BadRequestError from '../components/Errors/BadRequestError.jsx'


export default function ViewArticle() {

    const { isLoading, setIsLoading } = useLoading();

    const { id } = useParams()
    const [ article, setArticle ] = useState({})

    const [ currentVotes, setCurrentVotes ] = useState(0)
    const [ hasVoted, setHasVoted ] = useState(false)

    const [ postComment, setPostComment ] = useState(false)

    const [ article404Error, setArticle404Error ] = useState(false)  
    const [ article400Error, setArticle400Error ] = useState(false)

    const commentsRef = useRef(null)

    const location = useLocation()

    const handleVote = (vote) => { 
        if (hasVoted) return
        newsAPI.patchArticleById(id, { inc_votes: vote })
        .then( () => {
            setCurrentVotes(currentVotes + vote)
            setHasVoted(true)})

    }

    useEffect( () => {
        setIsLoading(true)
        getArticleById(id)
    }, [])

    useEffect(() => {
        if (location.hash === "#comments" && commentsRef.current) {

            commentsRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [article])

    const getArticleById = async (id) => {
        try {
        const { article } = await NewsAPI.getArticleById(id)
        console.log(article, "<< article")
        setArticle(article)
        setCurrentVotes(article.votes)
        }
        catch (err) {
            console.log(err, "<< err")
            if (err === 404) setArticle404Error(true)
            if (err === 400) setArticle400Error(true)
        }
        setIsLoading(false)
    }
        



    if (isLoading) return <Loading></Loading>
    if (article400Error) return <BadRequestError></BadRequestError>
    if (article404Error) return <ArticleError></ArticleError>



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
        <div ref={commentsRef} id="comments">
            <PostComment postComment={postComment} setPostComment={setPostComment}></PostComment>
            <h2>Show Comments</h2>
            <ArticleComment postComment={postComment}></ArticleComment>
        </div>
    </div>
    </>
  )
}