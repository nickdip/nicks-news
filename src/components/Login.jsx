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
    <div>
        <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="username">Username:</label>
            <input className="login-username" type="text" id="username" name="username" value={usernameInput} onChange={handleChange}></input>
            <label HTMLFor="password">Password:</label>
            <input className="login-password" type="password" id="password" name="password"></input>
            <button className="login-submit"  type="submit">Log in!</button>   
        </form>
    </div>
  )
}
