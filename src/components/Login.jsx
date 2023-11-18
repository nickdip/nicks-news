import React, { useState, useContext } from 'react'
import UserContext from '../contexts/UserContext.jsx'
import '../styles/Login.css'

export default function Login() {

    useContext(UserContext)

    const [ usernameInput, setUsernameInput ] = useState("")   

    const { loginUser } = useContext(UserContext)

    const handleChange = (event) => {
        setUsernameInput(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        loginUser(usernameInput)
        setUsernameInput("")

    }

  return (
    <div className="login-form">
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={usernameInput} onChange={handleChange}></input>
            <label HTMLFor="password">Password:</label>
            <input type="password" id="password" name="password"></input>
            <button type="submit" className="login-text">Log in!</button>   
        </form>
    </div>
  )
}
