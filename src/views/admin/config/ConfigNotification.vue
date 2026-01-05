<template>
  <div>
    Config Notification
  </div>
  <button @click="handleSendNotificationForAll">Send notification</button>
</template>
<script setup lang="ts">

   import NotificationApi from '@/api/NotificationApi.ts'
   import useAuthentication from '@/stores/Authentication.ts'

   const userId = useAuthentication().userInfo.userId;

   const handleSendNotificationForAll = async ()=>{
      await NotificationApi.sendPushNotification({
        "userId":Number(userId),
        "title":"System Admin send",
        "body":"Voucher nay giam gia 80%"
      })
   }
</script>
<style scoped lang="scss">

</style>