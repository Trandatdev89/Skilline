<template>
  <div class="layout-default">
    <Header/>
    <div class="main" style="padding: 100px 0;">
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script setup lang="ts">

  import Header from "@/layout/layout-admin/Header.vue";
  import Footer from "@/layout/layout-admin/Footer.vue";
</script>

<style lang="scss" scoped>

</style>