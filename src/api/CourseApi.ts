import type { ApiResponse } from '@/type/ApiResponse.ts'
import { httpApi } from '@/utils/http-api.ts'

class CourseApi {
  async getListCourseByCategoryId(id:number): Promise<ApiResponse<any>> {
    return await httpApi.get(`/api/course?categoryId=${id}`);
  }

  async getListCourses(params?:any): Promise<ApiResponse<any>> {
    const config = {
      params: params ? params : {}
    };
    return await httpApi.get(`/api/course/all`,config);
  }

  async getListCourseNotPagi(): Promise<ApiResponse<any>> {
    return await httpApi.get(`/api/course/not-pagi`);
  }

  async getListCourseById(ids:number[]): Promise<ApiResponse<any>> {
    return await httpApi.get(`/api/course/list/${ids}`);
  }

  async saveCourse(data:any): Promise<ApiResponse<any>> {
    return await httpApi.post("/api/course/save",data);
  }

  async deleteCourse(ids:number[]): Promise<ApiResponse<any>> {
    return await httpApi.delete("/api/course/list/${ids}");
  }
}

export default new CourseApi()