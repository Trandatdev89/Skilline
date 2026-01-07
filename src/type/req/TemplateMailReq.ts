import type { TypeTemplateMail } from '@/type/TypeTemplateMail.ts'

export default interface TemplateMailReq{
  type : TypeTemplateMail,
  subject?:string,
  htmlContent:string,
  language?:string,
  active:boolean
}