import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import UserContext from '../contexts/UserContext'
import NewsAPI from '../api.js'

export default function PostComment() {

    const { id } = useParams()

    const { user } = useContext(UserContext)

    const [ formInput, setFormInput ] = useState("")

    const [ blockNewComment, setBlockNewComment ] = useState(false)

    const [ messageUnderComment, setMessageUnderComment ] = useState("")


    useEffect(() => {
        if (!messageUnderComment) {
            if (user.username) {
                setMessageUnderComment(`Logged in as ${user.username}`)
            }
            else setMessageUnderComment('Please log in to comment')
        }
    })

    const handleChange = (event) => {
        setFormInput(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (blockNewComment || !user.username) {
            setMessageUnderComment('You are trying to post too much! Please wait')
            return
        }
        if (formInput.match(/^\s+$/g)) {
            setMessageUnderComment('Please enter a comment')
            return
        }
        setBlockNewComment(true)
        NewsAPI.postComment(id, { username: user.username, body: formInput })
        .then(() => {
            setFormInput("")
            setMessageUnderComment("Comment posted!")
            setTimeout(() => {
                setBlockNewComment(false)
            }, 5000)
            })
        .catch(error => {
                console.error("Error posting comment:", error);
                setMessageUnderComment("Error posting comment. Please try again")   
                setBlockNewComment(false)
            });
    }


  return (
    <div>
        <form>    
            <input placeholder="Leave a comment here" onChange={handleChange}></input>
            <button type="button" disabled={blockNewComment} onClick={(e) => handleSubmit(e)}>Post!</button>
            <div>{messageUnderComment}</div>
        </form>
    </div>
  )
}

