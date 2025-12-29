import type { ApiResponse } from '@/type/ApiResponse.ts'
import { httpAuth } from '@/utils/httpAuth.ts'
import { httpApi } from '@/utils/httpApi.ts'

class CategoryApi {

  private SUFFIX_URL = '/api/category';

  async getListCategory(): Promise<ApiResponse<any>> {
    return await httpAuth.get(this.SUFFIX_URL);
  }

  async getListCategoryPagination(params:any): Promise<ApiResponse<any>> {
    const res:any =  await httpApi.get(`${this.SUFFIX_URL}/pagination`, {
      params: params || {}
    });
    return res;
  }

  async save(data:any): Promise<ApiResponse<any>> {
    return await httpAuth.post(this.SUFFIX_URL,data);
  }
}

export default new CategoryApi()