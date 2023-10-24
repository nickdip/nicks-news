import React, { useEffect, useState, useContext } from 'react'
import '../styles/header.css'
import NewsAPI from '../api.js'
import UserContext from '../contexts/UserContext.jsx'

export default function Header() {

  const [ usersTotal, setUsersTotal ] = useState(0)

  const { user } = useContext(UserContext)

  useEffect(() => {
    NewsAPI.getAllUsers()
    .then( ( { users } ) => {
      setUsersTotal(users.length)
    })
  })
  return (
    <div className="header">
      <div className="header-title">Nicks News</div>
      <div className="users-joined-text">
      <div>{new Date().toUTCString().slice(0, 17)}</div>
        <div>Welcome, {user.username}!</div>
        <div>{usersTotal} users</div>
      </div>
      </div>
  )
}
