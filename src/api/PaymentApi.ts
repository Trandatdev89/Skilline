import { httpApi } from '@/utils/http-api.ts'
import type { ApiResponse } from '@/type/ApiResponse.ts'

class PaymentApi {

  async vnPayment(params: any): Promise<ApiResponse<any>> {
    const config = {
      params: params ? params : {}
    };
    return await  httpApi.post("/api/order",config)
  }

}


const paymentApi = new PaymentApi()
export default paymentApi;