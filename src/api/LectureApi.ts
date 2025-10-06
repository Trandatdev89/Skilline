import type { ApiResponse } from '@/type/ApiResponse.ts'
import { httpApi } from '@/utils/http-api.ts'

class LectureApi{

  async getLectureById(lectureId:any): Promise<ApiResponse<any>>{
    return await httpApi.get(`/api/lecture/stream/${lectureId}`);
  }

  async getLecturesByCourseId(lectureId:any): Promise<ApiResponse<any>>{
    return await httpApi.get(`/api/lecture?courseId=${lectureId}`);
  }

}

export default new LectureApi();