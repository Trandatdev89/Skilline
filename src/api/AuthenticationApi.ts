
import type { ApiResponse } from '@/type/ApiResponse';
import { httpAuth } from '@/utils/httpAuth.ts'
import type { TokenRes } from '@/type/TokenRes.ts'

class AuthenticationApi{

  async login(dataLogin:any): Promise<ApiResponse<any>>{
    const response : ApiResponse<any> = await httpAuth.post("/auth/login",dataLogin,{
      headers:{
        'Content-Type':"application/json"
      }
    });
    return response;
  }

  async checkAuthentication(tokenRes:TokenRes): Promise<ApiResponse<any>>{
    return await  httpAuth.post(`/auth/introspect-token`,tokenRes);
  }

  async register(data:any): Promise<ApiResponse<any>>{
    return await httpAuth.post("/auth/register",data);
  }

  async forgotPassword(email:string):Promise<ApiResponse<any>>{
    return await httpAuth.get(`/auth/forgot-password?email=${email}`);
  }

  async refreshToken(tokenRequest:any):Promise<ApiResponse<any>>{
    return await httpAuth.post("/auth/refresh-token",tokenRequest);
  }

}

export default new AuthenticationApi();
