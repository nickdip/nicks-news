import axios from 'axios';

class NewsAPI {
    constructor(URL) {
        this.url = URL;
        this.api = axios.create({
            url: this.url})
    }

    get(endpoint) {
        return this.api.get(`${this.url}/${endpoint}`).then(({data}) => data)
        .catch((err) => {
            throw new Error(`Error with API Request: ${err}`)
        })
    }

    getAllArticles() {
        return this.get('articles');
    }

    getArticleById(id) {
        return this.get(`articles/${id}`);
    }

    getAllUsers() {
        return this.get('users');
    }
}

NewsAPI = new NewsAPI("https://nicks-nc-news.onrender.com/api")

export default NewsAPI