import { httpAuth } from '@/utils/httpAuth.ts'
import type { ApiResponse } from '@/type/ApiResponse.ts'

const apiPrefixQuiz = "/api/quiz";
class QuizApi {

  async saveQuiz(formData: any): Promise<ApiResponse<any>> {
     return await httpAuth.post(`${apiPrefixQuiz}`,formData);
  }

  async getQuizByLectureId(lectureId:string): Promise<ApiResponse<any>> {
    return await httpAuth.get(`${apiPrefixQuiz}?lectureId=${lectureId}`);
  }

}

export default new QuizApi();