import { httpAuth } from '@/utils/httpAuth.ts'
import type { ApiResponse } from '@/type/ApiResponse.ts'

const apiPrefixQuiz = "/api/question";
class QuestionApi {

  async saveQuestion(formData: any): Promise<ApiResponse<any>> {
    return await httpAuth.post(`${apiPrefixQuiz}`,formData);
  }

}

export default new QuestionApi();