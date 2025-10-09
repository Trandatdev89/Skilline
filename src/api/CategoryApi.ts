import type { ApiResponse } from '@/type/ApiResponse.ts'
import { httpApi } from '@/utils/http-api.ts'

class CategoryApi {
  async getListCategory(): Promise<ApiResponse<any>> {
    return await httpApi.get(`/api/category`);
  }

  async getListCategoryPagination(params:any): Promise<ApiResponse<any>> {
    const config = {
      params: params ? params : {}
    };
    return await httpApi.get(`/api/category/pagination`,config);
  }

  async save(data:any): Promise<ApiResponse<any>> {
    return await httpApi.post(`/api/category`,data);
  }
}

export default new CategoryApi()