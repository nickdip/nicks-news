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

}

export default api