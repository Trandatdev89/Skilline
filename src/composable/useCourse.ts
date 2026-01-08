import { ref } from 'vue'
import type { CourseRes } from '@/type/res/CourseRes.ts'
import CourseApi from '@/api/CourseApi.ts'
import AlertService from '@/service/AlertService.ts'
import useLoadMore from '@/composable/useLoadMore.ts'

const useCourse = () => {
  const listCourse = ref<CourseRes[]>([])

  const { loadMoreData, data } = useLoadMore();


  const getListCourse = async () => {
    await loadMoreData(CourseApi.getListCourses)
    listCourse.value = data.value
  }

  const saveCourse = async (formData: any) => {
    try {
      const res = await CourseApi.saveCourse(formData)
      if (res.code !== 200) {
        throw res.message
      }
      AlertService.success('Success', res.message)
    } catch (error: any) {
      AlertService.error('Error', error)
    }
  }

  const getListCourseByListId = async (ids: number[]) => {
    try {
      const res = await CourseApi.getListCourseById(ids)
      if (res.code !== 200) {
        throw res.message
      }

      listCourse.value = res.data
    } catch (error: any) {
      AlertService.error('Error', error)
    }
  }

  const deleteCourse = async (ids: number[]) => {
    try {
      const res = await CourseApi.deleteCourse(ids)
      if (res.code !== 200) {
        throw res.message
      }

      AlertService.success('Success', res.message)

    } catch (error: any) {
      AlertService.error('Error', error)
    }
  }


  return {
    //state
    listCourse,

    //action
    getListCourse,
    saveCourse,
    getListCourseByListId,
    deleteCourse
  }
}

export default useCourse