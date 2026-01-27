<template>
  <div class="headerAdmin">
    <InputSearch class="headerAdmin__input"/>
    <div class="headerAdmin__action">
      <el-switch />
      <div class="notification">
        <el-button :icon="Bell" style="font-size: 24px;border: none"/>
      </div>
      <DropDownCustom avatar="https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
                      :list-link="listLink"
                      :title="userInfo.name"/>
    </div>
  </div>
</template>

<script setup lang="ts">

  import InputSearch from '@/components/input/InputSearch.vue'
  import { Bell } from '@element-plus/icons-vue'
  import DropDownCustom from '@/components/dropdown/DropDownCustom.vue'
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import useAuthentication from '@/stores/Authentication.ts'
  import { RoleType } from '@/enums/RoleType.ts'

  const listLink = ref<any>([
    {
      title: 'Trang quản lý',
      url: '/admin/dashboard',
      role: [RoleType.ADMIN, RoleType.TEACHER]
    },
    {
      title: 'Khóa học đã mua',
      url: '/bought',
      role: RoleType.USER
    },
    {
      title: 'Thông tin cá nhân',
      url: '/info',
      role: [RoleType.USER, RoleType.ADMIN, RoleType.TEACHER]
    },
    {
      title: 'Đăng xuất',
      url: '/logout',
      role: [RoleType.USER, RoleType.ADMIN, RoleType.TEACHER]
    }
  ])

  const { userInfo } = storeToRefs(useAuthentication())

</script>

<style scoped lang="scss">
   .headerAdmin{
     display: flex;
     align-items: center;
     justify-content: space-between;
     gap: 20px;
     padding-top: 10px;

     &__action{
       width: auto;
       display: flex;
       align-items: center;
       gap: 15px;
     }
   }
</style>