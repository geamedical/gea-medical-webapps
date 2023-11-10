import axios from 'axios'
import store from './index.js'

const $axios = axios.create({
    baseURL: 'http://127.0.0.1:3333/',
    headers: {
        'Content-Type': 'application/json',
    },
})
$axios.interceptors.request.use(
    config => {
        const { token } = store.state
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => Promise.reject(error),
)

export default $axios