<template>
  <div class="custom-dialog">
    <el-dialog v-model="visiableDialog">
      <h1>{{props.title}}</h1>
      <p>{{props.message}}</p>

      <template #footer>
        <el-button type="default" @click="closeDialog">
          Cancel
        </el-button>
        <el-button @click="submitDialog"
                   :type="typeConfirm===TypeDialogConfirm.CONFIRM ? 'primary' : 'danger' ">
          Confirm
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
   import { ref } from 'vue'
   import { TypeDialogConfirm } from '@/type/TypeDialogConfirm.ts'

   const visiableDialog = ref<boolean>(false);
   const emit = defineEmits(['on-submit','close-dialog']);
   const props = defineProps<{
     title:{
       require:true,
       type:string
     },
     message:{
       require:true,
       type:string
     },
     typeConfirm:{
       require:true,
       type:string
     }
   }>();

   const submitDialog = ()=>{
     emit('on-submit');
   }

   const closeDialog = ()=>{
     emit('close-dialog');
   }

   const show = ()=>{
     visiableDialog.value = true;
   }

   const hide = ()=>{
     visiableDialog.value = false;
   }

   defineExpose({show,hide})

</script>

<style lang="scss" scoped>

</style>