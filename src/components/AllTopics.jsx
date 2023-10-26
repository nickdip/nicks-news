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

    const fetchTopicsAndArticles = async () => {
        setIsLoading(true)
        let foundTopics
        try {
            let { topics } = await NewsAPI.getTopics();
            foundTopics = topics
            const topicsObj = {};
            for (let topic of topics) {
                topicsObj[topic.slug] = topic.description;
            }

            setAllTopics(topicsObj);

        } catch (err) {
            if (err.response.status === 400) setError400(true)
            else if (err.response.status === 404) setArticleError(true)
        }

        try {
            for (let topic of foundTopics) {
                const { articles } = await NewsAPI.getArticlesByTopic(topic.slug);
                setArticlesByTopic(prev => ({
                    ...prev,
                    [topic.slug]: articles
                }));
            }
        } catch (err) {
            console.log(err, "err")
            if (err.response.status === 400) setError400(true)
            else if (err.response.status === 404) setTopicError(true)
        }

        setIsLoading(false)
    };

    useEffect(() => {
        fetchTopicsAndArticles();
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
                                        <Article key={article.id} article={article} />
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