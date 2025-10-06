import type { ApiResponse } from '@/type/ApiResponse.ts'
import { httpApi } from '@/utils/http-api.ts'

class CourseApi {
  async getListCourseByCategoryId(id:number): Promise<ApiResponse<any>> {
    return await httpApi.get(`/api/course?categoryId=${id}`);
  }

  async getListCourses(): Promise<ApiResponse<any>> {
    return await httpApi.get(`/api/course`);
  }

  async getListCourseById(ids:string[]): Promise<ApiResponse<any>> {
    return await httpApi.get(`/api/course/list/${ids}`);
  }
}

export default new CourseApi()