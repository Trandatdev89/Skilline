import type { QuestionType } from '@/enums/QuestionType.ts'
import type { AnswerRes } from '@/type/res/AnswerRes.ts'

export interface QuestionExamUser {
  questionId: number,
  content: string,
  questionType: QuestionType,
  maxScore: number,
  scoreAchieved: number,
  answers: AnswerRes[]
}