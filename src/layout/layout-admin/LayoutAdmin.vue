<template>
  <div class="layout-admin">
    <button @click="handleClick">
      Click me!
    </button>

    <ConfirmDialog
        ref="confirmDialog"
        @close-dialog="handleClose"
        title="Xoa bai viet"
        message="Neu xoa bai viet thi se khong the khoi phuc lai duoc?"
        type-confirm="delete"
        @on-submit="handleDelete"/>
  </div>
</template>

<script setup lang="ts">

  import ConfirmDialog from '@/components/dialog/ConfirmDialog.vue'
  import { ref } from 'vue'

  const confirmDialog = ref();

  const handleClick = ()=>{
    confirmDialog.value?.show();
  }

  const handleDelete = ()=>{
    // call api:
    console.log("Delete success!")
    confirmDialog.value?.hide();
  }

  const handleClose = ()=>{
    confirmDialog.value?.hide();
  }
</script>

<style scoped>

</style>