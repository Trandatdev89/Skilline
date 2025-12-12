import { httpAuth } from '@/utils/httpAuth.ts'
import type { ApiResponse } from '@/type/ApiResponse.ts'

class OrderApi {

  async getOrders(params: any): Promise<ApiResponse<any>> {
    const config = {
      params: params ? params : {}
    };
    return await  httpAuth.get("/api/order",config)
  }

  async saveOrder(data: any): Promise<ApiResponse<any>> {
    return await  httpAuth.post("/api/order",data)
  }

}

const orderApi = new OrderApi()
export default orderApi