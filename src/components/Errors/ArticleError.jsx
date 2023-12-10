import React from 'react'
import '../../styles/Errors.css'
import errorImage from "../../static/404-article-error.webp"

export default function ArticleError() {
  return (
    <div className="errors">
        <img src={errorImage} className="errors-img" alt="404 error"/>
    </div>
  )
}
