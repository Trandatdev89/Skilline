import { TokenType } from '@/enums/TokenType.ts'

export interface TokenRes{
  accessToken:string,
  refreshToken?:string,
  tokenType:TokenType
}