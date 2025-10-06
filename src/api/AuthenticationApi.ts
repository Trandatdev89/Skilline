
import type { ApiResponse } from '@/type/ApiResponse';
import { httpApi } from '@/utils/http-api.ts'

class AuthenticationApi{

  async login(dataLogin:any): Promise<ApiResponse<any>>{
    const response : ApiResponse<any> = await httpApi.post("/auth/login",dataLogin,{
      headers:{
        'Content-Type':"application/json"
      }
    });
    return response;
  }

  async isAuthentication(accessToken:string,tokenType:string): Promise<ApiResponse<any>>{
    const response : ApiResponse<any> = await httpApi.post(`/auth/introspect-token?tokenType=${tokenType}`,{accessToken},{
      headers:{
        'Content-Type':"application/json"
      }
    });
    return response;
  }

  async logout(): Promise<ApiResponse<any>>{
    return await httpApi.get("/auth/logout");
  }

}

export default new AuthenticationApi();
