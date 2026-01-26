export interface RequestParam {
  page: number,
  size: number,
  keyword?: string,
  sort?: string,
  courseId?:number,
  lectureId?:string
}