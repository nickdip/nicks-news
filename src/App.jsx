import { useState, useContext, useEffect } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import AllArticles from "./components/AllArticles"
import ViewArticle from "./components/ViewArticle"
import Sidebar from "./components/Sidebar"
import UserContext from './contexts/UserContext'
import AllTopics from './components/AllTopics'

//TODO: Sort out loading states
//TODO: Add alt text to images


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
        <Route path="/alltopics" element={<AllTopics />} />
    </Routes>
    </div>
    <Sidebar></Sidebar>
    </>
  )
}

