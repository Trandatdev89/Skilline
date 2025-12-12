
import type { ApiResponse } from '@/type/ApiResponse';
import type { TokenRes } from '@/type/TokenRes.ts'
import { httpApi } from '@/utils/httpApi.ts'

class AuthenticationApi{

  async login(dataLogin:any): Promise<ApiResponse<any>>{
    const response : ApiResponse<any> = await httpApi.post("/auth/login",dataLogin,{
      headers:{
        'Content-Type':"application/json"
      }
    });
    return response;
  }

  async checkAuthentication(tokenRes:TokenRes): Promise<ApiResponse<any>>{
    return await  httpApi.post(`/auth/introspect-token`,tokenRes);
  }

  async register(data:any): Promise<ApiResponse<any>>{
    return await httpApi.post("/auth/register",data);
  }

  async forgotPassword(email:string):Promise<ApiResponse<any>>{
    return await httpApi.get(`/auth/forgot-password?email=${email}`);
  }

  async refreshToken(tokenRequest:any):Promise<ApiResponse<any>>{
    return await httpApi.post("/auth/refresh-token",tokenRequest);
  }

}

export default new AuthenticationApi();
