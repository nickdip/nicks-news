import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import AllArticles from "./components/AllArticles"
import ViewArticle from "./components/ViewArticle"

export default function App() {
  return (
    <>
    <Header></Header>
    <Routes>
        <Route path="/all" element={<AllArticles />} />
        <Route path="/articles/:id" element={<ViewArticle />} />
    </Routes>
    </>
  )
}

