<template>
  <el-form
      ref="createCourseForm"
      :model="modelValue"
      :rules="rules">
    <el-form-item label-position="top" label="Tieu de khoa hoc" prop="title">
      <el-input v-model="modelValue.title" />
    </el-form-item>
    <el-form-item label-position="top" label="Cap do khoa hoc" prop="level">
      <el-select v-model="modelValue.level" >
        <el-option :value="LevelStudent.BEGINNER">
          Beginner
        </el-option>
        <el-option :value="LevelStudent.ADVANCE">
          Advance
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label-position="top" label="Giá khóa hoc " prop="price">
      <el-input-number v-model="modelValue.price" />
    </el-form-item>
    <el-form-item label-position="top" label="Danh muc" prop="categoryId">
      <el-select v-model="modelValue.categoryId" multiple-limit="1" @visible-change="handleVisibleChange">
        <el-option v-for="item in listCategory" :key="item.id" :value="item.id">
          {{ item.name }}
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label-position="top" label="Mo ta khoa hoc" prop="desc">
      <el-input type="textarea" v-model="modelValue.desc" />
    </el-form-item>
    <el-form-item label-position="top" label="Ảnh khóa học" prop="thumbnail">
      <el-upload :limit="1" @change="handleProcessFile">
        <el-button type="primary">Click to upload</el-button>
      </el-upload>
      <div style="position: relative;top: -5px;right: -5px" v-if="imgUpload">
        <span style="position: absolute;color: red;font-size: 14px;cursor: pointer" @click="handleRemoveFile">X</span>
        <img :src="imgUpload" alt="avatar..." style="width: 50px;height: 50px;object-fit: cover" />
      </div>
    </el-form-item>
  </el-form>
</template>


<script setup lang="ts">

  import LevelStudent from '@/enums/LevelStudent.ts'
  import { nextTick, reactive, ref } from 'vue'
  import type { FormRules } from 'element-plus'
  import useCategory from '@/composable/useCategory.ts'

  const imgUpload = ref()
  const { listCategory, getListCategory } = useCategory()
  const selectDropdown = ref<HTMLElement | null>(null)
  const validationPrice = (rule: any, value: any, callback: any) => {
    if (value < 0) {
      callback(new Error('Giá giảm không được nhỏ hơn 0'))
    } else {
      callback()
    }
  }

  const rules = reactive<FormRules>({
    title: [
      { required: true, message: 'Trường này băt buộc', trigger: 'blur' }
    ],
    level: [
      { required: true, message: 'Trường này băt buộc', trigger: 'blur' }
    ],
    price: [
      { required: true, message: 'Trường này băt buộc', trigger: 'blur' },
      { validator: validationPrice, trigger: 'blur' }
    ],
    thumbnail: [
      { required: true, message: 'Trường này băt buộc', trigger: 'blur' }
    ]
  })

  const modelValue = defineModel<{
    id: number | null,
    title: string,
    desc: string,
    level: LevelStudent,
    price: number | null,
    thumbnail: File | null,
    categoryId: number | null
  }>({ required: true })

  const handleProcessFile = (file: any) => {
    if (file.raw) {
      modelValue.value.thumbnail = file.raw
      imgUpload.value = URL.createObjectURL(file.raw)
    }
  }

  const handleRemoveFile = () => {
    imgUpload.value = ''
    modelValue.value.thumbnail = null
  }

  const handleScroll = async (e: Event) => {
    const ev = e.target as HTMLElement
    if (ev.scrollTop + ev.clientHeight >= ev.scrollHeight - 20) {
      await getListCategory()
    }
  }

  const handleVisibleChange = async (visible: boolean) => {
    if (visible) {
      await nextTick()
      // Tìm dropdown element
      const dropdown = document.querySelector('.el-select-dropdown__wrap')
      if (dropdown) {
        selectDropdown.value = dropdown as HTMLElement
        dropdown.addEventListener('scroll', handleScroll, { passive: true })
      }
    } else {
      // Remove listener khi đóng dropdown
      if (selectDropdown.value) {
        selectDropdown.value.removeEventListener('scroll', handleScroll)
      }
    }
  }

</script>

<style scoped lang="scss">

</style>