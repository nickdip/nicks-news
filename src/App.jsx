import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import AllArticles from "./components/AllArticles"
import ViewArticle from "./components/ViewArticle"
import Sidebar from "./components/Sidebar"

export default function App() {
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

