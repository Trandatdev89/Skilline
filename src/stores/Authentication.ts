import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import AuthenticationApi from '@/api/AuthenticationApi.ts'
import { TokenType } from '@/enums/TokenType.ts'
import AuthenticationSecurity from '@/security/AuthenticationSecurity.ts'

const useAuthentication = defineStore('useAuthentication', () => {

    const userInfo = reactive({
      userId: '',
      isAuthenticated: false,
      name:'',
      role:''
    })

    const isLoading = ref<boolean>(false);

    const isAuthentication = async () => {
      try{
        isLoading.value = true;
        const accessToken = AuthenticationSecurity.getAccessToken();
        const refreshToken = AuthenticationSecurity.getRefreshToken();

        if (!accessToken && !refreshToken) {
          resetUserInfo()
          return false
        }


        if(accessToken) {
          console.log(accessToken);
          const res = await AuthenticationApi.checkAuthentication({
            accessToken: accessToken,
            tokenType: TokenType.ACCESS_TOKEN
          });

          if (res && res.data === true) {
            return true;
          } else {
            resetUserInfo();
            return false;
          }
        }
        isLoading.value = false;
      }catch (error){
        isLoading.value = false;
      }
    }

    const resetUserInfo = ()=>{
      userInfo.isAuthenticated = false;
      userInfo.userId = '';
      userInfo.name = '';
      userInfo.role='';
    }

    const setAuthToken = (value: any)=>{
      localStorage.setItem('accessToken', value.accessToken)
      localStorage.setItem('refreshToken', value.refreshToken)
      userInfo.isAuthenticated = true
      userInfo.userId = value.userId
      userInfo.name = value.username
      userInfo.role = value.role
    }

    const logout = () => {
      isLoading.value = true;
      resetUserInfo();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userInfo");
      isLoading.value = false;
    }

    return { userInfo, isAuthentication,logout,setAuthToken,isLoading}
  },
  {
    persist: {
      key:'userInfo',
      pick: ['userInfo']
    }
  })

export default useAuthentication