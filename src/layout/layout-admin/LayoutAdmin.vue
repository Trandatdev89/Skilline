<template>
  <div class="layoutAdmin">
    <el-container>
      <el-aside>
        <LeftMenu/>
      </el-aside>
      <el-container>
        <el-header>
          <HeaderAdmin/>
        </el-header>
        <el-main>
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

<style scoped>

</style>