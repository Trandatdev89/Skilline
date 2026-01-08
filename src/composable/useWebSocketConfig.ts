import { ref } from 'vue'
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs'

export const useWebSocketConfig = () => {
  const client = ref<Client | null>(null)
  const isConnect = ref<boolean>(false);

  const connectStomp = async ()=>{
    const token = localStorage.getItem("accessToken");

    client.value = new Client({
      webSocketFactory:()=> new SockJS("http://localhost:8080/ws"),
      debug: (msg) => console.log('STOMP:', msg),
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      connectHeaders: {
        Authorization: `Bearer ${token}`
      },
      onConnect(frame) {
          isConnect.value = true;
      },
      onDisconnect(frame) {
          isConnect.value = false;
      },
      onStompError: (frame) => {
        console.error('STOMP error:', frame);
      }
    });
     client.value.activate();
  }

  const disconnect = ()=>{
    if(client.value){
      client.value.deactivate();
      client.value = null;
      isConnect.value = false;
    }
  }

  const subscribe = (destination:string,callback:(message:any)=>void)=>{
      if(!client.value){
        return;
      }

      return client.value.subscribe(destination,(message)=>{
        callback(JSON.parse(message.body))
      })
  }

  const publish = (destination:string,body:any)=>{
    if (!client.value || !isConnect.value) {
      console.error('Client chưa kết nối');
      return;
    }

    client.value.publish({
      destination,
      body: JSON.stringify(body)
    });
  }

  return {client,isConnect,connectStomp,disconnect,subscribe,publish}
}
