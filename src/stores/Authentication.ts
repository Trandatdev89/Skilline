import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

const useAuthentication = defineStore('useAuthentication', () => {

    const userInfo = reactive({
      userId: '',
      isAuthentication: false,
      name:''
    })

    const isAuthentication = (value: any) => {
      userInfo.isAuthentication = true
      userInfo.userId = value.userId
      userInfo.name = value.username
    }

    const logout = () => {
      userInfo.isAuthentication = false;
      userInfo.userId = ''
      userInfo.name = ''
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }

    return { userInfo, isAuthentication,logout }
  },
  {
    persist: true
  })

export default useAuthentication