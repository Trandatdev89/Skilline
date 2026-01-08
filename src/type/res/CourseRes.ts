import LevelStudent from '@/enums/LevelStudent.ts'

export interface CourseRes {
  id: number,
  title: string,
  categoryName: string,
  level: LevelStudent,
  thumbnail_url: string,
  description: string,
  status: boolean
  price: number,
  createAt: string,
  updateAt: string
}