import { ref } from 'vue'
import axios from 'axios'


const API_URL = 'http://localhost:8080/api/push'

const usePushNotification = () => {

  const isSupport = ref<boolean>(false)
  const isSubscribed = ref(false)
  const subscription = ref()

  const checkSupport = () => {
    isSupport.value = 'serviceWorker' in navigator && 'PushManager' in window
    return isSupport.value
  }

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      console.log('Service Worker registered:', registration)
      return registration
    } catch (Error) {
      throw Error
    }
  }

  const subscribeToPush = async (userId: number) => {
    try {

      const permission = await Notification.requestPermission()
      if (permission !== 'granted') {
        throw new Error('Permission denied!')
      }

      const registration = await registerServiceWorker()

      const { data } = await axios.get(`${API_URL}/public-key`)
      const applicationServerKey = urlBase64ToUint8Array(data.publicKey)

      // Subscribe
      const pushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
      })

      isSubscribed.value = true
      if (pushSubscription) {
        subscription.value = pushSubscription
      }

      await axios.post(`${API_URL}/subscribe`, pushSubscription, {
        params: { userId }
      })

      console.log('Subscribed successfully:', pushSubscription)
      return pushSubscription


    } catch (Error) {
      throw Error
    }
  }

  const unSubscribeToPush = async (userId: number) => {
    try {
      const registration = await navigator.serviceWorker.ready

      const currentSubscription = await registration.pushManager.getSubscription()

      if (!currentSubscription) {
        console.log('No active subscription found')
        isSubscribed.value = false
        subscription.value = null
        return
      }

      const successful = await currentSubscription.unsubscribe()
      if (successful) {
        await axios.post(`${API_URL}/unsubscribe`, currentSubscription, {
          params: { userId }
        })

        isSubscribed.value = false
        subscription.value = null

        return true
      } else {
        throw new Error('Failed to unsubscribe')
      }

    } catch (error) {
      console.error('Error unsubscribing:', error)
      throw error
    }
  }


  return {
    isSupport,
    isSubscribed,
    subscription,
    checkSupport,
    subscribeToPush,
    unSubscribeToPush
  }
}

export default usePushNotification