import axios from 'axios'

const timeOut = 1000 * 60 * 5;
const createApiRequest = (baseUrl:string)=>{
  const request = axios.create({
    timeout:timeOut,
    baseURL:baseUrl,
    headers:{
      'X-Requested-With': 'XMLHttpRequest'
    }
  });

  request.interceptors.request.use((config:any)=>{
    config.headers = {
      ...config.headers,
      'Content-Type' : 'application/json'
    }
    return config;
  },(error)=>{
    return Promise.reject(error);
  })

  request.interceptors.response.use((response: any) => {
    return response.data
  }, async (error) => {
    return Promise.reject(error)
  })

  return request;

}

export const httpApi = createApiRequest("http://localhost:8080/");
