<template>
  <el-dialog v-model="visibilityModel"
  :width="1000">
    <template #header>
         <span>
           Tao khoa hoc
         </span>
    </template>
    <div class="dialog-main">
      <slot></slot>
    </div>
    <template #footer>
      <el-button @click="hide">Cancel</el-button>
      <el-button @click="$emit('create-course')">Ok</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const visibilityModel = ref(false)
  const emit = defineEmits(['create-course']);
  const show = () => {
    visibilityModel.value =true;
  }

  const hide = () => {
    visibilityModel.value = false;
  }

  defineExpose({show,hide});
</script>

<style scoped lang="scss">

</style>