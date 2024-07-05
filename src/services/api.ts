import { jwtStore } from "@/stores/jwt";
import axios from "axios";


const api = axios.create({
    baseURL: import.meta.env.VITE_API || 'http://localhost'
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