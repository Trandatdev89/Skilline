<template>

</template>

<script setup lang="ts">

  import { onMounted } from 'vue'
  import { jwtDecode } from 'jwt-decode'
  import { useRouter } from 'vue-router'
  import pages from '@/router/pages.ts'

  const token = localStorage.getItem('accessToken')!
  const tokenDecode = jwtDecode<any>(token)
  const route = useRouter()

  const redirect = () => {
    let role = tokenDecode?.scope
    if (role === 'ADMIN') {
      redirectAdmin()
    } else {
      redirectUser()
    }
  }

  const redirectAdmin = () => {
    route.push(pages.dashboard)
  }

  const redirectUser = () => {
    route.push(pages.home)
  }

  onMounted(() => {
    redirect()
  })
</script>

<style lang="scss" scoped>

</style>