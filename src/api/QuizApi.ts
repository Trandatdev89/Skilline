import { httpAuth } from '@/utils/httpAuth.ts'
import type { ApiResponse } from '@/type/ApiResponse.ts'

const apiPrefixQuiz = "/api/quiz";
class QuizApi {

  async saveQuiz(formData: any): Promise<ApiResponse<any>> {
     return await httpAuth.post(`${apiPrefixQuiz}`,formData);
  }

  async getQuizByLectureId(params:any): Promise<ApiResponse<any>> {
    const config = {
      params: params ? params : {}
    };
    return await httpAuth.get(`${apiPrefixQuiz}/lecture`,config);
  }

}

export default new QuizApi();