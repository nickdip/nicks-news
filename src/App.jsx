import { useState, useContext, useEffect } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import AllArticles from "./components/AllArticles"
import ViewArticle from "./components/ViewArticle"
import Sidebar from "./components/Sidebar"
import UserContext from './contexts/UserContext'
import AllTopics from './components/AllTopics'
import Home from './components/Home'
import PathErrors from './components/Errors/PathErrors'


//TODO: Add alt text to images
//TODO: Improve user experience of loading spinner (don't include filters)
//TODO: Fix error handling of loading spinner
//TODO: Fix crappy CSS


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
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<AllArticles />} />
        <Route path="/articles/:id" element={<ViewArticle />} />
        <Route path="/alltopics" element={<AllTopics />} />
        <Route path="/*" element={<PathErrors></PathErrors>} />
    </Routes>
    </div>
    <Sidebar></Sidebar>
    </>
  )
}

