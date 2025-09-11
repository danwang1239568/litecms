import { defineStore } from "pinia";
import { ref } from "vue";
import { userGetInfoApi } from "@/api/user";

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const setToken = newToken => {
    console.log(newToken)
    token.value = newToken
  }
  const removeToken = () => {
    token.value = ''
  }
  const user = ref({})
  const getUser = async () => {
    const res = await userGetInfoApi()
    user.value = res.data.data
  }
  const logout = () => {
    user.value = {}
    token.value = ''
  }

  return {
    token,
    setToken,
    removeToken,
    user,
    getUser,
    logout
  }
}, {
  persist: true
})
