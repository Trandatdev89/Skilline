import { ref } from 'vue'
import axios from 'axios'


const API_URL = 'http://localhost:8080/api/push'

const usePushNotification = ()=>{

  const isSupport = ref<boolean>(false);
  const isSubscribed = ref(false);
  const subscription = ref();

  const checkSupport = ()=>{
    isSupport.value = 'serviceWorker' in navigator && 'PushManager' in window;
    return isSupport.value;
  }

  const urlBase64ToUint8Array = (base64String:string) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const registerServiceWorker = async ()=>{
    try{
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log('Service Worker registered:', registration);
      return registration;
    }catch (Error){
      throw Error;
    }
  }

  const subscribeToPush = async (userId:number)=>{
    try{
      if(!checkSupport()){
        return;
      }

      const permission = await Notification.requestPermission();
      if(permission !== 'granted'){
         throw new Error("Permission denied!");
      }

      const registration = await registerServiceWorker();

      const { data } = await axios.get(`${API_URL}/public-key`);
      const applicationServerKey = urlBase64ToUint8Array(data.publicKey);

      // Subscribe
      const pushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
      });

      isSubscribed.value = true;
      if (pushSubscription){
        subscription.value = pushSubscription;
      }

      await axios.post(`${API_URL}/subscribe`, pushSubscription, {
        params: { userId }
      });

      console.log('Subscribed successfully:', pushSubscription);
      return pushSubscription;


    }catch (Error){
      throw Error;
    }
  }


  return {
    isSupport,
    isSubscribed,
    subscription,
    checkSupport,
    subscribeToPush,
  }
};

export default usePushNotification;