import React, { useEffect, useState } from 'react'
import NewsAPI from '../api'
import Article from "./ArticleInList.jsx"
import '../styles/AllTopics.css'

export default function AllTopics() {
    const [articlesByTopic, setArticlesByTopic] = useState({});
    const [allTopics, setAllTopics] = useState({});

    useEffect(() => {
        const fetchTopicsAndArticles = async () => {
            try {
                const { topics }= await NewsAPI.getTopics();

                const topicsObj = {};
                for (let topic of topics) {
                    topicsObj[topic.slug] = topic.description;
                }

                setAllTopics(topicsObj);

                for (let topic of topics) {
                    const { articles } = await NewsAPI.getArticlesByTopic(topic.slug);
                    setArticlesByTopic(prev => ({
                        ...prev,
                        [topic.slug]: articles
                    }));
                }
            } catch (err) {
                throw new Error('Error fetching topics and articles:', err);
            }
        };

        fetchTopicsAndArticles();
    }, []);

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