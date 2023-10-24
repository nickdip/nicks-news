import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import UserContext from '../contexts/UserContext'
import NewsAPI from '../api.js'
import { set } from 'husky'

export default function PostComment() {

    const { id } = useParams()

    const { user } = useContext(UserContext)

    const [ formInput, setFormInput ] = useState("")

    const [ blockNewComment, setBlockNewComment ] = useState(false)

    const [ newComment, setNewComment ] = useState(false)

    const handleChange = (event) => {
        setFormInput(event.target.value)
    }

    const handleSubmit = () => {
        if (blockNewComment) return
        setBlockNewComment(true)
        NewsAPI.postComment(id, { username: user.username, body: formInput })
        .then(() => {
            setBlockNewComment(false)
            setNewComment(true)})
    }


  return (
    <div>
        <form>
            <input placeholder="Leave a comment here" onChange={handleChange}></input>
            <button type="button" disabled={blockNewComment} onClick={(e) => handleSubmit(e)}>Post!</button>
            <div>Logged in as {user.username}</div>
            <div>{newComment ? "Comment posted!" : ""}</div>
        </form>
    </div>
  )
}

