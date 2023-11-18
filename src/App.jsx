import { useState, useContext, useEffect } from 'react'
import './App.css'
import { Routes, Route, useLocation } from "react-router-dom"
import Header from "./components/Header"
import AllArticles from "./components/AllArticles"
import ViewArticle from "./components/ViewArticle"
import Sidebar from "./components/Sidebar"
import UserContext from './contexts/UserContext'
import AllTopics from './components/AllTopics'
import Home from './components/Home'
import PathErrors from './components/Errors/PathErrors'
import { useCookies } from 'react-cookie'
import Login from './components/Login'



//TODO: Add alt text to images
//TODO: Fix Nicks News crashing when on other pages
//TODO: Improve user experience of loading spinner (don't include filters)
//TODO: Fix error handling of loading spinner
//TODO: Fix scroll

export default function App() {



  useContext(UserContext)
  const { user, loginUser } = useContext(UserContext)

  const [ homeKey, setHomeKey ] = useState(0)

  useEffect(() => {
    console.log(user, "USER HERE?")
    loginUser(user)
  }, [])


  return (
    <>
    <Header onHomeClick={() => { setHomeKey(prev => prev + 1) }}></Header>
    <div className="main">
    <Routes>
        <Route path="/" element={<Home homeKey={homeKey} setHomeKey={setHomeKey}/>} />
        <Route path="/articles" element={<AllArticles />} />
        <Route path="/articles/:id" element={<ViewArticle />} />
        <Route path="/topics" element={<AllTopics />} />
        <Route path="/topics/:topic" element={<AllArticles/>} />
        <Route path="/*" element={<PathErrors></PathErrors>} />
        <Route path="/login" element={<Login></Login>} />
    </Routes>
    </div>
    <Sidebar></Sidebar>
    </>
  )
}

