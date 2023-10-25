import React from 'react'
import NewsApi from '../api.js'
import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import dateFormat from '../utils/dateFormat.js'
import timeFormat from '../utils/timeFormat.js'
import votesColour from '../utils/votes.js'
import '../styles/comments.css'
import UserContext from '../contexts/UserContext'
import Loading from './Loading'
import sleep from '../utils/sleep.js'


export default function ArticleComment({postComment}) {

    console.log(postComment, "POST COMMENT")

    const [ commentLoading, setCommentLoading ] = useState(false)

    const [ commentDeleted, setCommentDeleted ] = useState({deleted: false})

    const [ commentError, setCommentError ] = useState(false)

    const [ comments, setComments ] = useState([])

    const { user } = useContext(UserContext)

    const { id } = useParams()

    useEffect(() => {
        setCommentLoading(true)
        fetchComments()
    }, [postComment])

    const fetchComments = async () => {
        try {
        const { comments } = await NewsApi.getCommentsByArticleId(id)
        setCommentLoading(false)
        setComments(comments)
        }
        catch {
            setCommentError(true)
            setCommentLoading(false)
        }
    }


    const deleteComment = async (comment_id) => {
        try {
            await NewsApi.deleteComment(comment_id)
            setCommentDeleted({id: comment_id, deleted: true})
            await sleep(2000)
            fetchComments()
        }
        catch (err) {
            console.log(err)
            setCommentError(true)
        }
            
    }

    const displayDeleteMessage = () => {
        if (commentDeleted) return (
            <div className="comment-deleted">Comment deleted</div>
            )
        if (commentError) return (
            <div className="comment-error">Error deleting comment"</div>
        )

    }

    console.log(3)


    if (commentLoading) return <Loading childLoading={commentLoading}></Loading>

    console.log(4)

  return (
    <div>
        {comments.map( (comment) => {
            return (
            <ul key={`${comment.comment_id}-ul`} className="comments-Grid">
            <li key={`${comment.comment_id}-delete`} className="comment-delete-message">
            {commentDeleted.id === comment.comment_id ? displayDeleteMessage() : null}
            </li>
            <li key={`${comment.comment_id}-author`} className="comments-author">{comment.author}</li>
            <li key={`${comment.comment_id}-date`} className="comments-date">{dateFormat(comment.created_at)}</li>
            <li key={`${comment.comment_id}-time`} className="comments-time">{timeFormat(comment.created_at)} GMT</li>
            <li key={`${comment.comment_id}-body`} className="comments-body">{comment.body}</li>
            <li key={`${comment.comment_id}-votes`} className="comments-votes"><span style={votesColour(comment.votes)}>{comment.votes}</span></li>
            {user.username === comment.author ? 
                <li key={`${comment.comment_id}-delete`} className="comments-delete">
                    <button onClick={() => deleteComment(comment.comment_id)} className="comments-delete-button">
                        <img src="../src/static/x-delete-comment.png" alt="hyperlink image to delete a comment" className="comments-delete-icon"/>
                    </button>
                    </li> : null}
            <li key={`${comment.comment_id}-id`} className="comments-id">#{comment.comment_id}</li>
            </ul>
            )
        })}
    </div>
  )
}
