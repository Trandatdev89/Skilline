import { httpAuth } from '@/utils/httpAuth.ts'
import type { ApiResponse } from '@/type/ApiResponse.ts'

const BASE_URL='/api/config';

class TemplateMailApi{
  async saveTemplateMail(formData:any):Promise<ApiResponse<any>>{
    return httpAuth.post(`${BASE_URL}/save-template-mail`,formData)
  }
}

export default new TemplateMailApi();