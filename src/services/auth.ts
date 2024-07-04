import api from "./api"


const authApi = {

    login: async (username: string, password: string) => {

        const result = await api.post('/api/auth/login', {
            identifier: username,
            password: password
        })

        return result

    },

    register: async (username: string, email: string, password: string) => {
        const result = await api.post('/api/auth/register', {
            username,
            email,
            password
        })

        return result
    },

    me: async () => {
        const result = await api.get('/api/auth/me')

        return result
    }



}

export default authApi