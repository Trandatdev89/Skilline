<template>
  <div class="headerAdmin">
    <InputSearch class="headerAdmin__input"/>
    <div class="headerAdmin__action">
      <el-switch />
      <div class="notification">
        <el-button :icon="Bell" style="font-size: 24px;border: none"/>
      </div>
      <AvatarUser/>
    </div>
  </div>
</template>

<script setup lang="ts">

  import InputSearch from '@/components/input/InputSearch.vue'
  import {Bell} from '@element-plus/icons-vue'
  import AvatarUser from '@/components/avatar/AvatarUser.vue'
</script>

<style scoped lang="scss">
   .headerAdmin{
     display: flex;
     align-items: center;
     justify-content: space-between;
     gap: 20px;
     padding-top: 10px;

     &__input{
       flex: 1;
     }

     &__action{
       width: auto;
       display: flex;
       align-items: center;
       gap: 15px;
     }
   }
</style>