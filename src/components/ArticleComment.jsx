import React from 'react'
import NewsApi from '../api.js'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import dateFormat from '../utils/dateFormat.js'
import timeFormat from '../utils/timeFormat.js'
import votes from '../utils/votes.js'
import '../styles/comments.css'

export default function ArticleComment() {

    const [ comments, setComments ] = useState([])

    const { id } = useParams()

    useEffect(() => {
        NewsApi.getCommentsByArticleId(id)
        .then( ( { comments } ) => {
            setComments(comments)
        })
    }, [])

  return (
    <div>
        {comments.map( (comment) => {
            return (
            <ul key={`${comment.comment_id}-ul`} className="comments-Grid">
            <li key={`${comment.comment_id}-author`} className="comments-author">{comment.author}</li>
            <li key={`${comment.comment_id}-date`} className="comments-date">{dateFormat(comment.created_at)}</li>
            <li key={`${comment.comment_id}-time`} className="comments-time">{timeFormat(comment.created_at)} GMT</li>
            <li key={`${comment.comment_id}-body`} className="comments-body">{comment.body}</li>
            <li key={`${comment.comment_id}-votes`} className="comments-votes">{comment.votes}<img src={votes(comment.votes)} className="comments-votes-img"/></li>
            <li key={`${comment.comment_id}-id`} className="comments-id">#{comment.comment_id}</li>
            </ul>
            )
        })}
    </div>
  )
}
