import type { AxiosInstance } from 'axios'
import axios from 'axios'
import AuthenticationSecurity from '@/security/AuthenticationSecurity.ts'
import { TokenType } from '@/enums/TokenType.ts'


const timeOut = 1000 * 60 * 5
const createApiRequest = (baseUrl: any): AxiosInstance => {
  const request = axios.create({
    baseURL: baseUrl,
    timeout: timeOut,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  })

  request.interceptors.request.use((config: any) => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken !== null && accessToken !== '') {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${accessToken}`
      }
    }
    return config

  }, (error) => {
    return Promise.reject(error)
  });

  request.interceptors.response.use((response:any)=> {
    return response.data;
  },async (error)=>{
    if(error && error.response.status===401){
      const refreshToken = AuthenticationSecurity.getRefreshToken();
      const response = await axios.post("http://localhost:8080/auth/refresh",{
        refreshToken: refreshToken, tokenType: TokenType.REFRESH_TOKEN
      });

      const {accessToken} = response.data;

      AuthenticationSecurity.setAccessToken(accessToken);
    }
    return Promise.reject(error);
  })


  return request
}

const httpAuth = createApiRequest(import.meta.env.VITE_API_LOCAL)
export { httpAuth }