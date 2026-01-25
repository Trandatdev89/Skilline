import type { QuestionType } from '@/enums/QuestionType.ts'
import type { AnswerReq } from '@/type/req/AnswerReq.ts'

export interface QuestionReq {
  id?:number,
  content:string,
  type:QuestionType,
  position:number,
  score:number,
  answerReqs:AnswerReq[]
}