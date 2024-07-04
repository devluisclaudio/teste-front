import { jwtStore } from "@/stores/jwt";
import axios from "axios";


const api = axios.create({
    baseURL: 'http://localhost:3000'
})

api.interceptors.request.use(async function (config) {
    const store = jwtStore()
    if (store.jwt)
        config.headers.Authorization = `Bearer ${store.jwt}`

    return config;
}, error => {
    return Promise.reject(error)
})

export default api