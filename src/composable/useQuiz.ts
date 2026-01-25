import { computed, ref } from 'vue'
import type { QuestionExamUser } from '@/type/res/QuestionRes.ts'
import type { QuizDto } from '@/type/res/QuizDto.ts'
import QuizApi from '@/api/QuizApi.ts'
import AlertService from '@/service/AlertService.ts'
import type { SaveQuestionReq } from '@/type/req/SaveQuestionReq.ts'
import QuestionApi from '@/api/QuestionApi.ts'


const useQuiz = ()=>{

  const listQuestionOfQuiz = ref<QuestionExamUser[]>([]);
  const quizOfLecture = ref<QuizDto>();
  const currentQuizId = computed<number|null>(()=>{
    return quizOfLecture.value?.id ?? null;
  });

  //action of quiz
  const saveQuiz = async (formDataQuiz:QuizDto)=>{
    try{
      const res = await QuizApi.saveQuiz(formDataQuiz);
      if(res.code!==200){
        throw new Error(res.message);
      }
      if(formDataQuiz.id){
        AlertService.success("Success","Cap nhap quiz thanh cong!");
      }else{
        AlertService.success("Success",res.message);
      }
    }catch (e:any){
      AlertService.error("Error",e);
    }
  }

  const getQuizByLectureId = async (lectureId:string)=>{
    try{
      const res = await QuizApi.getQuizByLectureId(lectureId);
      if(res.code!==200){
        throw new Error(res.message);
      }
      quizOfLecture.value = res.data;
    }catch (e:any){
      AlertService.error("Error",e);
    }
  }

  //action of question:
  const saveQuestion = async (formDataQuestion:SaveQuestionReq)=>{
    try{
      const res = await QuestionApi.saveQuestion(formDataQuestion);
      if(res.code!==200){
        throw new Error(res.message);
      }
      AlertService.success("Success",res.message);
    }catch (e:any){
      AlertService.error("Error",e);
    }
  }


  return {
    listQuestionOfQuiz,
    currentQuizId,


    saveQuiz,
    getQuizByLectureId,
    saveQuestion
  }
}