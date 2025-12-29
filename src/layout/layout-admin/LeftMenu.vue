<template>
  <div class="leftMenu" :style="!isCollapse ? { 'box-shadow': '0 5px 7px rgba(0, 0, 0, 0.3)'} : {}">
    <div class="leftMenu__header">
      <el-button @click="isCollapse=!isCollapse"
                 :icon="isCollapse ? Expand : Fold" style="font-size: 30px;
                 border: none;" />
      <img
          v-if="!isCollapse"
          :src="logo" alt="loading..." />
    </div>
    <div class="leftMenu__main">
      <el-menu style="height: 100% !important;"
               :collapse="isCollapse"
               default-active="1"
               @open="handleOpen"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <Menu />
            </el-icon>
            <span><RouterLink to="/admin/dashboard">
                Trang quản lý
              </RouterLink></span>
          </template>
          <el-menu-item index="1-1">Item 1</el-menu-item>
          <el-menu-item index="1-2">Item 2</el-menu-item>
          <el-menu-item index="1-3">Item 3</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="10">
          <template #title>
            <el-icon>
              <Monitor />
            </el-icon>
            <span>
              <RouterLink to="/admin/category">
                Quản lý danh muc
              </RouterLink>
              </span>
          </template>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <Monitor />
            </el-icon>
            <span>
              <RouterLink to="/admin/courses">
                Quản lý khóa học
              </RouterLink>
              </span>
          </template>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <Tickets />
            </el-icon>
            <span>
              <RouterLink to="/admin/order">
                Quản lý đơn hàng
              </RouterLink>
            </span>
          </template>
          <el-menu-item>Item 5</el-menu-item>
          <el-menu-item>Item 6</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="4">
          <template #title>
            <el-icon>
              <Tickets />
            </el-icon>
            <span>
              <RouterLink to="/admin/lecture">
                Quản lý bai học
              </RouterLink>
            </span>
          </template>

        </el-menu-item>
        <el-menu-item index="5">
          <el-icon>
            <Setting />
          </el-icon>
          <template #title>
             <span>
              <RouterLink to="/admin/setting">
                Cài đặt
              </RouterLink>
            </span>
          </template>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>

  import logo from '@/assets/img/logo.png'
  import { Expand, Fold, Menu, Setting, Tickets, Monitor, Files } from '@element-plus/icons-vue'

  import { ref } from 'vue'

  const isCollapse = ref<boolean>(false)

  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
</script>

<style lang="scss" scoped>
  .leftMenu {
    width: 290px;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;

    &__header {
      display: flex;
      align-items: center;
      gap: 30px;
      padding: 3px;

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

</style>
