import React, { useEffect, useState } from 'react'
import NewsAPI from "../api/newsReaderAPI.js"
import Article from "./ArticleInList.jsx"
import '../styles/AllTopics.css'
import useLoading from '../hooks/useLoading'
import Loading from './Loading'
import ArticleError from './Errors/ArticleError.jsx'
import TopicError from './Errors/TopicError.jsx'
import BadRequestError from './Errors/BadRequestError.jsx'

export default function AllTopics() {
    const [articlesByTopic, setArticlesByTopic] = useState({})
    const [allTopics, setAllTopics] = useState({})
    const { isLoading, setIsLoading } = useLoading();
    const [ articleError, setArticleError ] = useState(false)
    const [ topicError, setTopicError ] = useState(false)
    const [ Error400, setError400 ] = useState(false)

    console.log(location, "location")

    const topicQuery = location.pathname.split("/")[2]

    const fetchTopics = async () => {
        try {
            let { topics } = await NewsAPI.getTopics();
            const topicsObj = {};
            for (let topic of topics) {
                topicsObj[topic.slug] = topic.description;
            }

            setAllTopics(topicsObj)
            return topics

        } catch (err) {
            if (err === 400) setError400(true)
            else if (err === 404) setArticleError(true)
            return null
        }
    }
    const fetchArticles = async (topics) =>{
        try {
            for (let topic of topics) {
                const { articles } = await NewsAPI.getArticlesByTopic(topic.slug);
                setArticlesByTopic(prev => ({
                    ...prev,
                    [topic.slug]: articles
                }));
            }
        } catch (err) {
            if (err === 400) setError400(true)
            else if (err === 404) setTopicError(true)
            return null
        }

        setIsLoading(false)
    }

    const fetchArticlesByTopic = async (topic) => {
        try {
            const { articles } = await NewsAPI.getArticlesByTopic(topic)

            console.log(articles, "articles")
            setArticlesByTopic(prev => ({
                ...prev,
                [topic]: articles
            }));
        } catch (err) {
            if (err === 400) setError400(true)
            else if (err === 404) setTopicError(true)
            return null
        }
        setIsLoading(false)
    }

    const allFetching = async () => {
        if (topicQuery) await fetchArticlesByTopic(topicQuery)
        else {
            let topics = await fetchTopics()
            console.log(topics, "topics")   
            if (topics) await fetchArticles(topics)
        }
    }


    useEffect(() => {
        setIsLoading(true)
        allFetching()
    }, []);

    if (isLoading) return <Loading></Loading>
    if (Error400) return <BadRequestError></BadRequestError>
    if (articleError) return <ArticleError></ArticleError>  
    if (topicError) return <TopicError></TopicError>


    return (
        <div>
            {Object.keys(articlesByTopic).map((topic) => {
                return (
                    <div className="topic-container" key={topic}>
                        <div className="topics">
                            <div className="topic-title">{topic}</div>
                            <div className="topic-description">
                                {allTopics[topic] ? allTopics[topic] : null}
                            </div>
                            <div className="topic-articles">
                                {articlesByTopic[topic]
                                    ? articlesByTopic[topic].map((article) => (
                                        <Article key={article.id} article={article} size={"normal"}/>
                                    ))
                                    : null}
                            </div>
                        </div>

                    </div>
                );
            })}
        </div>
    );
}