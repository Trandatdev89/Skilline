<template>
  <div style="text-align: center;margin-top: 50px" v-loading="loading">Đang đăng xuất</div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import AuthenticationApi from '@/api/AuthenticationApi.ts'
  import useAuthentication from '@/stores/Authentication.ts'
  import AlertService from '@/service/AlertService.ts'
  import { useRouter } from 'vue-router'

  const loading = ref(false)
  const router = useRouter()
  const authentication = useAuthentication()

  const logoutAccount = async () => {
    loading.value = true
    const res = await AuthenticationApi.logout()
    if (res.code === 200) {
      authentication.logout()
      router.push('/login')
      AlertService.success('Thành công', 'Đăng xuất thành công')
    } else {
      AlertService.error('Thất bại', 'Đăng xuất thất bại')
    }
    loading.value = false
  }


  onMounted(async () => {
    await logoutAccount()
  })

</script>

<style lang="scss" scoped>

</style>