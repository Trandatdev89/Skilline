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

  import Header from "@/layout/layout-default/Header.vue";
  import Footer from "@/layout/layout-default/Footer.vue";
</script>

<style lang="scss" scoped>

</style>