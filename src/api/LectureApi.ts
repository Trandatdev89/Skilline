import type { ApiResponse } from '@/type/ApiResponse.ts'
import { httpAuth } from '@/utils/httpAuth.ts'

class LectureApi{

  async getLectureById(lectureId:any): Promise<ApiResponse<any>>{
    return await httpAuth.get(`/api/lecture/stream/${lectureId}`);
  }

  async getLecturesByCourseId(params:any): Promise<ApiResponse<any>>{
    const config = {
      params: params ? params : {}
    };

    console.log(config);
    return await httpAuth.get(`/api/lecture`,config);
  }

  async getLecturesByCourseIdNotPagi(courseId:any): Promise<ApiResponse<any>>{
    return await httpAuth.get(`/api/lecture/not-pagi?courseId=${courseId}`);
  }

  async saveLecturesByCourseId(data:any): Promise<ApiResponse<any>>{
    return await httpAuth.post(`/api/lecture/save`,data);
  }

}

export default new LectureApi();