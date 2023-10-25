import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import UserContext from '../contexts/UserContext'
import NewsAPI from '../api.js'
import sleep from '../utils/sleep.js'

export default function PostComment({postComment, setPostComment}) {

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
    }, [])

    useEffect(() => {
        if (!messageUnderComment) {
            if (user.username) {
                setMessageUnderComment(`Logged in as ${user.username}`)
            }
            else setMessageUnderComment('Please log in to comment')
        }
    }, [postComment])

    const handleChange = (event) => {
        setFormInput(event.target.value)
    }

    const handleSubmit = async (e) => {
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
        try {
            await NewsAPI.postComment(id, { username: user.username, body: formInput })
            setFormInput("")
            setMessageUnderComment("Comment posted!")
            await sleep(2000)
            setBlockNewComment(false)
            setPostComment(true)
            setMessageUnderComment("")
        }
        catch (err) {
                console.log("Error posting comment:", err);
                setMessageUnderComment("Error posting comment. Please try again")   
                setBlockNewComment(false)
        };
    }


  return (
    <div>
        <form>    
            <input placeholder="Leave a comment here" onChange={handleChange} value={formInput}></input>
            <button type="button" disabled={blockNewComment} onClick={(e) => handleSubmit(e)}>Post!</button>
            <div>{messageUnderComment}</div>
        </form>
    </div>
  )
}

