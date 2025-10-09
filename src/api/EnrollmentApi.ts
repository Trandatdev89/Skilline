import type { ApiResponse } from '@/type/ApiResponse.ts'
import { httpApi } from '@/utils/http-api.ts'

class EnrollmentApi {

  async getListCourseUserBought(): Promise<ApiResponse<any>> {
    return await httpApi.get(`/api/enrollment/buy`);
  }

  async checkUserEnrollment(courseId?:any): Promise<ApiResponse<any>>{
    return await httpApi.get(`/api/enrollment/check?courseId=${courseId}`);
  }

}

export default new EnrollmentApi()