import type { QuestionReq } from '@/type/req/QuestionReq.ts'

export interface SaveQuestionReq {
  quizId:number,
  questions:QuestionReq[]
}