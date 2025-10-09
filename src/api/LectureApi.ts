import type { ApiResponse } from '@/type/ApiResponse.ts'
import { httpApi } from '@/utils/http-api.ts'

class LectureApi{

  async getLectureById(lectureId:any): Promise<ApiResponse<any>>{
    return await httpApi.get(`/api/lecture/stream/${lectureId}`);
  }

  async getLecturesByCourseId(params:any): Promise<ApiResponse<any>>{
    const config = {
      params: params ? params : {}
    };

    console.log(config);
    return await httpApi.get(`/api/lecture`,config);
  }

  async getLecturesByCourseIdNotPagi(courseId:any): Promise<ApiResponse<any>>{
    return await httpApi.get(`/api/lecture/not-pagi?courseId=${courseId}`);
  }

  async saveLecturesByCourseId(data:any): Promise<ApiResponse<any>>{
    return await httpApi.post(`/api/lecture/save`,data);
  }

}

export default new LectureApi();