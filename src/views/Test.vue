<template>
  <el-button @click="handleShowLecture">Click me!</el-button>
   <LectureVideoDialog ref="lectureVideoDialog" title="Bai 1 :bien va vong lap"
                       video-id="52fe77ea-2fd1-42b3-a791-af4af571c3d7"/>
</template>

<script setup lang="ts">
  import LectureVideoDialog from '@/components/dialog/LectureVideoDialog.vue'
  import { ref } from 'vue'

  const lectureVideoDialog = ref();

  const handleShowLecture = ()=>{
    lectureVideoDialog.value?.show();
  }

</script>
