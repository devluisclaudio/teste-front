import { ref } from 'vue'
import { defineStore } from 'pinia'
import {validaJson , convertJson} from '@/services/validaJsonLocalStorage'

type User = {
  id: number,
  name: string,
  email: string,
  createdAt: string,
  updatedAt: string,
}

export const useUserStore = defineStore('user', () => {
  const key = 'username'
  
  const user = ref<User | string | null>(convertJson(localStorage.getItem(key)))

  const setUser = async (value: User) => {
    user.value = value
    localStorage.setItem(key, validaJson(value))
  }

  const userLogout = async () => {
    await setUser({} as User);
    localStorage.removeItem(key);
  }

  return { user, setUser, userLogout }
})
