import api from "./api"


const authApi = {

    login: async (email: string, password: string) => {

        const result = await api.post('/api/v1/auth/login', {
            email,
            password
        })

        return result

    },

    register: async (username: string, email: string, password: string) => {
        const result = await api.post('/api/v1/auth/register', {
            name: username,
            email,
            password
        })

        return result
    },

    me: async () => {
        const result = await api.get('/api/v1/auth/me')

        return result
    }



}

export default authApi