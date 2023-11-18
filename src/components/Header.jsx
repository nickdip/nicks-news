import React, { useEffect, useState, useContext } from 'react'
import '../styles/header.css'
import NewsAPI from "../api/newsReaderAPI.js"
import UserContext from '../contexts/UserContext.jsx'
import { Link } from 'react-router-dom'

export default function Header({ onHomeClick }) {

  const [ loading, setLoading ] = useState(false)

  const [ usersTotal, setUsersTotal ] = useState(0)

  const { user, logoutUser } = useContext(UserContext)


  useEffect(() => {
    NewsAPI.getAllUsers()
    .then( ( { users } ) => {
      setUsersTotal(users.length)
    })
  }, [])

  const displayWelcome = () => {
    if (user.username) return (
      <div>Welcome, {user.username}! <a href="#" onClick={logoutUser}>Log Out</a></div>
    )

    return <div>
      <Link to="/login" className="header-login-link">
            Log In
      </Link>
      </div>


  }


  return (
    <div className="header">
      <div className="header-title"><Link to="/" onClick={onHomeClick} className="header-title-link">Nicks News</Link></div>
      <div className="users-joined-text">
      <div>{new Date().toUTCString().slice(0, 17)}</div>
        <div>{console.log(user, "user")}</div>
        {displayWelcome()}
        <div>{usersTotal} users</div>
      </div>
      </div>
  )
}
