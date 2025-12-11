<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import useAuthentication from '@/stores/Authentication.ts'

const router = useRouter()
const authStore = useAuthentication()

onMounted(async () => {
  const isValid = await authStore.isAuthentication()
  console.log(isValid);
})
</script>

<template>
    <router-view />
</template>
