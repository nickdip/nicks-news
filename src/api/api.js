import axios from 'axios';

class api {
    constructor(URL) {
        this.url = URL;
        this.api = axios.create({
            url: this.url})
    }

    get(endpoint, query) {
        let path = `${this.url}/${endpoint}`
        if (query) path += query
        return this.api.get(path).then(({data}) => data)
        .catch((err) => {
            console.log(`Error with API GET Request: ${err}`)
            return Promise.reject(err.response.status)
        })
    }

    patch(endpoint, body) {
        return this.api.patch(`${this.url}/${endpoint}`, body).then(({data}) => data)
        .catch((err) => {
            console.log(`Error with API PATCH Request: ${err}`)
            return Promise.reject(err.response.status)
        })
    }

    delete(endpoint) {
        return this.api.delete(`${this.url}/${endpoint}`)
        .catch((err) => {
           console.log(`Error with API DELETE Request: ${err}`)
        
           return Promise.reject(err.response.status)
        })
    }

}

export default api