import api from './api'

class NicksNews extends api{
    constructor(URL) {
        super(URL)
    }
    getAllArticles(query) {
        return this.get('articles', query);
    }

    getArticleById(id) {
        return this.get(`articles/${id}`);
    }

    getAllUsers() {
        return this.get('users');
    }

    getCommentsByArticleId(id) {
        return this.get(`articles/${id}/comments`);
    }

    getTopics() {
        return this.get('topics');
    }

    patchArticleById(id, body) {
        return this.patch(`articles/${id}`, body);
    }

    getArticlesByTopic(topic) {
        return this.get('articles', `?topic=${topic}`)
    }

    login(username) {
        return this.get(`users/${username}`).then(({ user }) => user[0])
        .catch((err) => {
            throw new Error(`Error retrieving user: ${err}`)
        })
    }

    postComment(id, body) {
        return this.api.post(`${this.url}/articles/${id}/comments`, body).then(({data}) => data)
        .catch((err) => {
            throw new Error(`Error with API POST Request: ${err}`)
        })
    }


    deleteComment(id) {
        return this.delete(`comments/${id}`)
    }
    
}

const NewsAPI = new NicksNews("https://nicks-nc-news.onrender.com/api")

export default NewsAPI