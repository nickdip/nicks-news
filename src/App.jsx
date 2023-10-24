import { useState, useContext, useEffect } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import AllArticles from "./components/AllArticles"
import ViewArticle from "./components/ViewArticle"
import Sidebar from "./components/Sidebar"
import UserContext from './contexts/UserContext'

export default function App() {


  useContext(UserContext)
  const { user, loginUser } = useContext(UserContext)

  useEffect(() => {
    `Login an example user for testing purposes`
    loginUser("tickle122")

  }, [])

  return (
    <>
    <Header></Header>
    <div className="main">
    <Routes>
        <Route path="/all" element={<AllArticles />} />
        <Route path="/articles/:id" element={<ViewArticle />} />
    </Routes>
    </div>
    <Sidebar></Sidebar>
    </>
  )
}

