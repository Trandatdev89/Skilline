import type { ApiResponse } from '@/type/ApiResponse.ts'
import { httpAuth } from '@/utils/httpAuth.ts'

class CourseApi {
  async getListCourseByCategoryId(id:number): Promise<ApiResponse<any>> {
    return await httpAuth.get(`/api/course?categoryId=${id}`);
  }

  async getListCourses(params?:any): Promise<ApiResponse<any>> {
    const config = {
      params: params ? params : {}
    };
    return await httpAuth.get(`/api/course/all`,config);
  }

  async getListCourseNotPagi(): Promise<ApiResponse<any>> {
    return await httpAuth.get(`/api/course/not-pagi`);
  }

  async getListCourseById(ids:number[]): Promise<ApiResponse<any>> {
    return await httpAuth.get(`/api/course/list/${ids}`);
  }

  async saveCourse(data:any): Promise<ApiResponse<any>> {
    return await httpAuth.post("/api/course/save",data);
  }

  async deleteCourse(ids:number[]): Promise<ApiResponse<any>> {
    return await httpAuth.delete("/api/course/list/${ids}");
  }
}

export default new CourseApi()