import axios from 'axios'

const $axios = axios.create({
    baseURL: process.env.VUE_APP_API_URL
})

const authInterceptor = config => {
    config.headers.authorization = localStorage.getItem('token')
    return config
}

$axios.interceptors.request.use(authInterceptor)

export default $axios