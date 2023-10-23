import React, { useEffect, useState } from 'react'
import '../styles/header.css'
import NewsAPI from '../api.js'
import { set } from 'husky'

export default function Header() {

  const [ usersTotal, setUsersTotal ] = useState(0)

  useEffect(() => {
    NewsAPI.getAllUsers()
    .then( ( { users } ) => {
      console.log(users, "USERS")
      setUsersTotal(users.length)
    })
  })
  return (
    <div className="header">
      <div className="header-title">Nicks News</div>
      <div className="users-joined-text">
      <div>{new Date().toUTCString().slice(0, 17)}</div>
        <div>Welcome, ExampleUser!</div>
        <div>{usersTotal} users</div>
      </div>
      </div>
  )
}
