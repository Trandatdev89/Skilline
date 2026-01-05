import { httpApi } from '@/utils/httpApi.ts'

class NotificationApi{
  sendPushNotification = async (params:any)=>{
    await httpApi.post("/api/push/send",null,{
      params
    });
  }
}

export default new NotificationApi();