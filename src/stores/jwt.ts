import api from '@/services/api'
import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { validaJson } from '@/services/validaJsonLocalStorage'



export const jwtStore = defineStore('jwt', () => {
    const key: string = 'jwt'

    const jwt = ref<string>(localStorage.getItem(key) ?? '')
    const countRetest = ref<number>(0)


    async function setJwt(value: string) {
        jwt.value = value
        countRetest.value = 0
        localStorage.setItem(key, validaJson(value))
    }

    // function refreshJwt() {
    //     countRetest.value++
    //     return api.get('auth/refreshJwt')
    // }

    async function jwtLogout() {
        await setJwt('');
        localStorage.removeItem(key);
        const store = useUserStore()
        await store.userLogout()
    }

    return { jwt, countRetest, setJwt, jwtLogout }
})