import { ref } from 'vue'
import useLoadMore from '@/composable/useLoadMore.ts'
import LectureApi from '@/api/LectureApi.ts'
import type { RequestParam } from '@/type/RequestParam.ts'

const useLecture= ()=>{

  const listLectureOfCourse = ref();
  const { loadMoreData, data } = useLoadMore();

  const getListLectureByCourseId = async (courseId:number)=>{
    await loadMoreData((req: RequestParam) => {
      req.courseId = courseId;
      return LectureApi.getLecturesByCourseId(req);
    });
    listLectureOfCourse.value = data.value;
  }

  return {
    listLectureOfCourse,

    //action
    getListLectureByCourseId
  }
}

export default useLecture;