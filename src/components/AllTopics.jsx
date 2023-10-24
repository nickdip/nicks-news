import React, { useEffect, useState } from 'react'
import NewsAPI from '../api'
import Article from "./ArticleInList.jsx"

export default function AllTopics() {

    // NewsAPI.getArticlesByTopic("coding").then(( { articles }) => {
    //     console.log(articles, "CODINGARTICLES")
    // })

    const [ articlesByTopic, setArticlesByTopic ] = useState({})

    useEffect(() => {
        NewsAPI.getTopics()
        .then(( { topics }) => {
            console.log(topics, "TOPICS")
            topics.forEach(({slug}) => getTopicAPI(slug) )
        })
    }, [])

    const getTopicAPI = (topic) => {
        NewsAPI.getArticlesByTopic(topic)
        .then(( { articles } ) => {
            setArticlesByTopic(
                {
                ...articlesByTopic, 
                [topic]: articles
                }
            )
        })
    }

  return (
    <div>
        {Object.keys(articlesByTopic).map((topic) => {
            return (<div className="topic-container" key={topic}>
                <div className="topic-title">
                    {topic.slug}
                </div>
                <div className="topic-description">
                    {topic.description}
                </div>
                <div className="topic-articles">
                    {articlesByTopic[topic] ? articlesByTopic[topic].map((article) => {
                       return (
                       <Article key={article.id} article={article}></Article>
                       )
                       }) : null}
                </div>
            </div>)
        })}
    </div>
  )
}
