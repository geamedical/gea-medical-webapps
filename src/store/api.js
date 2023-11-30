import axios from 'axios'
import store from './index.js'

const $axios = axios.create({
    baseURL: `${process.env.SERVICES_PROTOCOL}://${process.env.SERVICES_HOST}:${process.env.SERVICES_PORT}/`,
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