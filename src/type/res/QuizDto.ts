export interface QuizDto {
  id?:number,
  lectureId: string,
  title: string,
  description: string,
  timeLimit: string,
  maxAttempt: number
}