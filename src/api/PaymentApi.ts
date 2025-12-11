import { httpAuth } from '@/utils/httpAuth.ts'
import type { ApiResponse } from '@/type/ApiResponse.ts'

class PaymentApi {

  async vnPayment(params:  any): Promise<ApiResponse<any>> {
    const config = {
      params: params ? params : {}
    };
    console.log(config);
    return await  httpAuth.get("/api/payment",config)
  }

}


const paymentApi = new PaymentApi()
export default paymentApi;