import React, { useEffect, useState, useContext } from 'react'
import '../styles/header.css'
import NewsAPI from "../api/newsReaderAPI.js"
import UserContext from '../contexts/UserContext.jsx'
import { Link } from 'react-router-dom'

export default function Header() {

  const [ usersTotal, setUsersTotal ] = useState(0)

  const { user } = useContext(UserContext)

  useEffect(() => {
    NewsAPI.getAllUsers()
    .then( ( { users } ) => {
      setUsersTotal(users.length)
    })
  }, [])
  return (
    <div className="header">
      <div className="header-title"><Link to="/" className="header-title-link">Nicks News</Link></div>
      <div className="users-joined-text">
      <div>{new Date().toUTCString().slice(0, 17)}</div>
        <div>Welcome, {user.username}!</div>
        <div>{usersTotal} users</div>
      </div>
      </div>
  )
}
