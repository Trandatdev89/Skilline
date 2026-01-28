import LevelStudent from '@/enums/LevelStudent.ts'

export interface CourseReq {
  id: number | null,
  title: string,
  level: LevelStudent,
  desc: string,
  price: number | null,
  discount:number | null,
  categoryId:number | null,
  thumbnail:File | null,
  rate:number
}