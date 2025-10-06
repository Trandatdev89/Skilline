import type { ApiResponse } from '@/type/ApiResponse.ts'
import { httpApi } from '@/utils/http-api.ts'

class CategoryApi {
  async getListCategory(): Promise<ApiResponse<any>> {
    return await httpApi.get(`/api/category`);
  }
}

export default new CategoryApi()