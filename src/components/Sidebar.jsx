import React from 'react'
import "../styles/sidebar.css"
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (<div className="sidebar">
    <div className="sidebar-list">
    <Link to="/articles" className="all-articles-link">All Articles</Link>
    <Link to="/topics" className="all-topics-link">All Topics</Link>
    </div>
    </div>)
}
