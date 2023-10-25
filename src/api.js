import axios from 'axios';

class NewsAPI {
    constructor(URL) {
        this.url = URL;
        this.api = axios.create({
            url: this.url})
    }

    get(endpoint, query) {
        let path = `${this.url}/${endpoint}`
        if (query) path += query
        console.log(path, "PATH")
        return this.api.get(path).then(({data}) => data)
        .catch((err) => {
            throw new Error(`Error with API GET Request: ${err}`)
        })
    }

    patch(endpoint, body) {
        return this.api.patch(`${this.url}/${endpoint}`, body).then(({data}) => data)
        .catch((err) => {
            throw new Error(`Error with API PATCH Request: ${err}`)
        })
    }

    delete(endpoint) {
        return this.api.delete(`${this.url}/${endpoint}`)
        .catch((err) => {
            throw new Error(`Error with API DELETE Request: ${err}`)
        })
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

NewsAPI = new NewsAPI("https://nicks-nc-news.onrender.com/api")

export default NewsAPI