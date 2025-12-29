<template>
  <div style="display: flex;align-items: center;justify-content: center">
    <input v-model="message" />
    <button @click="handleSendMessage">Send Message</button>npm run dev

  </div>

  <div v-for="item in data">
    <span>User : {{ item.username }}</span>
    <span>Message : {{ item.message }}</span>
  </div>
</template>

<script setup lang="ts">


  import { useWebSocketConfig } from '@/composable/useWebSocketConfig.ts'
  import { onMounted, onUnmounted, ref, watch, watchEffect } from 'vue'


  const { connectStomp, disconnect, publish, isConnect, subscribe } = useWebSocketConfig()
  const message = ref<string>('')
  const data = ref<any>([])

  const handleSendMessage = () => {
    if (isConnect.value) {
      publish('/app/chat.send', { username: 'TRAN DAT', message: message.value })
      message.value = ''
    }
  }

  onMounted(() => {
    connectStomp()
  })

  watch(isConnect, () => {
    if (isConnect.value) {
      subscribe('/topic/message', (payload: any) => {
        data.value.push(payload)
      })
    }
  })

  onUnmounted(() => {
    disconnect()
  })

</script>
