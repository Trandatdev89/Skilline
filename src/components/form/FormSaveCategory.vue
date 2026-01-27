<template>
  <el-form
      ref="formRef"
      :model="modelValue"
      :rules="rules">
    <el-form-item label-position="top" label="Tiêu đề danh mục" prop="title">
      <el-input v-model="modelValue.title" />
    </el-form-item>
    <el-form-item label-position="top" label="Ảnh danh mục" prop="path">
      <el-upload v-model:file-list="fileList" :limit="1" @change="handleProcessFile" :auto-upload="false"
                 :show-file-list="false" accept="image/*">
        <el-button :icon="Upload" style="width: 100px" />
      </el-upload>
    </el-form-item>
  </el-form>
  <div style="position: relative;width: 100px;height: 100px" v-if="imgUpload">
    <span style="position: absolute;color: red;font-size: 25px;cursor: pointer;top: -18px;right: -8px"
          @click="handleRemoveFile">X</span>
    <img :src="imgUpload" alt="avatar..." style="width: 100%;height: 100%;object-fit: cover" />
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, watch } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import { Upload } from '@element-plus/icons-vue'

  const imgUpload = ref()
  const fileList = ref<any[]>([])
  const formRef = ref<FormInstance>()
  const rules = reactive<FormRules>({
    title: [
      { required: true, message: 'Trường này băt buộc', trigger: 'blur' }
    ]
  })
  const modelValue = defineModel<{
    id: number | null,
    title: string,
    path: any
  }>({ required: true })


  const handleProcessFile = (file: any) => {
    if (file.raw) {
      modelValue.value.path = file.raw
    }
  }

  const handleRemoveFile = () => {
    if (imgUpload.value) {
      URL.revokeObjectURL(imgUpload.value)
    }
    imgUpload.value = ''
    modelValue.value.path = null
    fileList.value = []
  }

  const validate = async (): Promise<boolean> => {
    if (!formRef.value) return false

    try {
      await formRef.value.validate()
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const resetFields = () => {
    formRef.value?.resetFields()
    handleRemoveFile()
  }

  watch(() => modelValue.value.path, (newValue) => {
    if (newValue) {
      if (typeof newValue === 'string') {
        imgUpload.value = newValue
      } else if (newValue instanceof File) {
        imgUpload.value = URL.createObjectURL(newValue)
      }
    }else {
      imgUpload.value = ''
    }
  }, { immediate: true })

  defineExpose({
    validate,
    resetFields
  })
</script>


<style scoped lang="scss">

</style>