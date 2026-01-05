<template>
  <div class="leftMenu" :style="!isCollapse ? { 'box-shadow': '0 5px 7px rgba(0, 0, 0, 0.3)'} : {}">
    <div class="leftMenu__header">
      <img
        style="max-width: 100px"
        v-if="!isCollapse"
        :src="logo" alt="loading..." />
      <el-button @click="isCollapse=!isCollapse"
                 :icon="isCollapse ? Expand : Fold" style="font-size: 30px;
                 border: none;" />
    </div>
    <div class="leftMenu__main">
      <el-menu style="height: 100% !important;"
               :collapse="isCollapse"
               default-active="1"
               @open="handleOpen"
      >
        <template  v-for="(menu) in listMenu">
          <el-menu-item :index="menu.id" v-if="menu.role.includes(<RoleType>role)">
            <template #title>
              <el-icon>
                <component :is="menu.icon"/>
              </el-icon>
              <span>
                <RouterLink :to="menu.link">
                  {{menu.title}}
                </RouterLink>
              </span>
            </template>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>

  import logo from '@/assets/img/logo.png'
  import { Expand, Fold, Menu, Setting, Tickets, Monitor, Files } from '@element-plus/icons-vue'

  import { ref } from 'vue'
  import { RoleType } from '@/enums/RoleType.ts'
  import useAuthentication from '@/stores/Authentication.ts'

  const isCollapse = ref<boolean>(false);

  const listMenu = [
    {id:1,title:"Trang quản lý",icon:Menu,link:"/admin/dashboard",role:[RoleType.TEACHER,RoleType.ADMIN]},
    {id:2,title:"Quản lý danh muc",icon:Monitor,link:"/admin/category",role:[RoleType.TEACHER,RoleType.ADMIN]},
    {id:3,title:"Quản lý khóa học",icon:Monitor,link:"/admin/courses",role:[RoleType.TEACHER,RoleType.ADMIN]},
    {id:4,title:"Quản lý đơn hàng",icon:Tickets,link:"/admin/order",role:[RoleType.TEACHER,RoleType.ADMIN]},
    {id:5,title:"Quản lý bai học",icon:Tickets,link:"/admin/lecture",role:[RoleType.TEACHER,RoleType.ADMIN]},
    {id:6,title:"Cài đặt",icon:Setting,link:"/admin/setting",role:[RoleType.ADMIN]},
  ];

  const role = useAuthentication().userInfo.role;

  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
</script>

<style lang="scss" scoped>
  .leftMenu {
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    border-right:1px solid #dcdfe6;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 30px;
      padding-left: 20px;
      padding-top: 15px;
      img {
        max-height: 70px;
        width: auto;
      }
    }

    &__main {
      flex: 1;
      overflow-y: auto;
    }
  }

  a {
    text-decoration: none !important;
    color: #000;
  }

  :deep(.el-menu){
    border: none !important;
  }

</style>
