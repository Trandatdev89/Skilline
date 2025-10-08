import { httpApi } from '@/utils/http-api.ts'
import type { ApiResponse } from '@/type/ApiResponse.ts'

class PaymentApi {

  async vnPayment(params:  Record<string, any>): Promise<ApiResponse<any>> {
    return await  httpApi.get("/api/payment",{ params })
  }

}


const paymentApi = new PaymentApi()
export default paymentApi;