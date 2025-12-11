import { httpAuth } from '@/utils/httpAuth.ts'
import type { ApiResponse } from '@/type/ApiResponse.ts'

class OrderApi {

  async getOrders(params: any): Promise<ApiResponse<any>> {
    const config = {
      params: params ? params : {}
    };
    const res : ApiResponse<any> = await  httpAuth.get("/api/order",config)
    return res;
  }

  async saveOrder(data: any): Promise<ApiResponse<any>> {
    const res : ApiResponse<any> = await  httpAuth.post("/api/order",data)
    console.log(res);
    return res;
  }

}


const orderApi = new OrderApi()
export default orderApi