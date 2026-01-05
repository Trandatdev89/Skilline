<template>
  <div class="layoutAdmin">
    <el-container class="layoutAdmin__container">
      <el-aside width="320px">
        <LeftMenu/>
      </el-aside>

      <el-container>
        <el-header class="layoutAdmin__header">
          <HeaderAdmin/>
        </el-header>
        <el-main class="layoutAdmin__main">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script setup lang="ts">


import LeftMenu from '@/layout/layout-admin/LeftMenu.vue'
import HeaderAdmin from '@/layout/layout-admin/HeaderAdmin.vue'
</script>

<style scoped lang="scss">
.layoutAdmin {
  &__container {
    min-height: 100vh !important;
    display: flex;
    gap: 16px; /* khoảng cách bạn muốn */
  }

  &__header,
  &__main {
    padding: 0;
  }
}

</style>