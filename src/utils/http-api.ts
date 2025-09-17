import type { AxiosInstance } from 'axios'
import axios from 'axios'


const timeOut = 1000 * 60 * 5
const createApiRequest = (baseUrl: any): AxiosInstance => {
  const request = axios.create({
    baseURL: baseUrl,
    timeout: timeOut,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  })

  request.interceptors.response.use((response: any) => {
    return response.data
  }, async (error) => {
    return Promise.reject(error)
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


  return request
}

const httpApi = createApiRequest('http://localhost:8080')
export { httpApi }