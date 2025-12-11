import type { ApiResponse } from '@/type/ApiResponse.ts'
import { httpAuth } from '@/utils/httpAuth.ts'

class EnrollmentApi {

  async getListCourseUserBought(): Promise<ApiResponse<any>> {
    return await httpAuth.get(`/api/enrollment/buy`);
  }

  async checkUserEnrollment(courseId?:any): Promise<ApiResponse<any>>{
    return await httpAuth.get(`/api/enrollment/check?courseId=${courseId}`);
  }

}

export default new EnrollmentApi()