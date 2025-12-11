import type { ApiResponse } from '@/type/ApiResponse.ts'
import { httpAuth } from '@/utils/httpAuth.ts'

class UserApi{

  async getInfo(): Promise<ApiResponse<any>>{
    return await httpAuth.get(`/api/user/info`);
  }

  async updateInfo(data:any): Promise<ApiResponse<any>>{
    return await httpAuth.post(`/api/user`,data);
  }

  async logout(): Promise<ApiResponse<any>>{
    return await httpAuth.get("/api/user/logout");
  }
}

export default new UserApi();