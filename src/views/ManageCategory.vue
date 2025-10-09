<template>
  <div class="order">
    <div class="order__add">
      <el-button @click="handleShowCreateCate">
        Add Multiple Course
      </el-button>
    </div>
    <div class="order__table">
      <DataTable
        ref="dataTable"
        :get-data-function="getListCategory"
      >
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="Tên danh mục"/>
        <el-table-column prop="path" label="Ảnh">
          <template #default="scope">
            <img :src="scope.row.path" alt="image..."/>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="Hanh dong">
          <template #default="scope">
            <el-button @click="updateCategory(scope.row)">
              <el-icon>
                <RefreshLeft />
              </el-icon>
            </el-button>
            <el-popconfirm
              class="box-item"
              title="Top Left prompts info"
              placement="top-start"
            >
              <template #reference>
                <el-button @click="deleteCategory(scope.row)" type="danger">
                  <el-icon>
                    <Delete />
                  </el-icon>
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </DataTable>
    </div>
  </div>
  <CreateDialog ref="createDialog"
                v-loading="loading"
                @create-course="handleCreateCate">
    <el-form
      ref="createCateForm"
      :model="category"
      :rules="rules">
      <el-form-item label-position="top" label="Tieu de khoa hoc" prop="title">
        <el-input v-model="category.title" />
      </el-form-item>
      <el-form-item label-position="top" label="Ảnh khóa học" prop="path">
        <el-upload :limit="1" @change="handleProcessFile" :auto-upload="false">
          <el-button type="primary">Click to upload</el-button>
        </el-upload>
        <div style="position: relative;top: -5px;right: -5px" v-if="imgUpload">
          <span style="position: absolute;color: red;font-size: 14px;cursor: pointer" @click="handleRemoveFile">X</span>
          <img :src="imgUpload" alt="avatar..." style="width: 50px;height: 50px;object-fit: cover" />
        </div>
      </el-form-item>
    </el-form>
  </CreateDialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watchEffect } from 'vue'
import DataTable from '@/components/datatable/DataTable.vue'
import CreateDialog from '@/components/dialog/CreateDialog.vue'
import LevelStudent from '@/enums/LevelStudent.ts'
import type { FormInstance, FormRules } from 'element-plus'
import CourseApi from '@/api/CourseApi.ts'
import AlertService from '@/service/AlertService.ts'
import CategoryApi from '@/api/CategoryApi.ts'
import { RefreshLeft, Delete } from '@element-plus/icons-vue'
import orderApi from '@/api/OrderApi.ts'

const dataTable = ref()
const imgUpload = ref()
const createDialog = ref()
const listCate = ref()
const createCateForm = ref<FormInstance>()
const loading = ref(false)


const rules = reactive<FormRules>({
  title: [
    { required: true, message: 'Trường này băt buộc', trigger: 'blur' }
  ],
  path: [
    { required: true, message: 'Trường này băt buộc', trigger: 'blur' }
  ]
})

const category = reactive({
  id: null,
  title: '',
  path:null
})

const handleProcessFile = (file: any) => {
  if (file.raw) {
    category.path = file.raw
    imgUpload.value = URL.createObjectURL(file.raw)
  }
}

const handleRemoveFile = () => {
  imgUpload.value = ''
  category.path = null
}

const updateCategory = (row: any) => {
  category.id = row.id
  category.title = row.name
  category.path = row.path
  createDialog.value?.show();
}

const deleteCategory = async (row: any) => {
  const res = await CourseApi.deleteCourse([row.id])
  if (res.code === 200) {
    AlertService.success('Thanh cong', 'xoa san pham thanh cong')
  } else {
    AlertService.error('That bai', 'xoa san pham that bai')
  }
}

function handleShowCreateCate() {
  createDialog.value?.show()
}

const handleCreateCate = () => {
  loading.value = true
  createCateForm.value?.validate(async (valid) => {
    if (valid) {
      const formData = new FormData()

      formData.append('id', category.id ?? '')
      formData.append('name', category.title)

      if (category.path) {
        formData.append('path', category.path)
      }

      const res = await CategoryApi.save(formData);
      if(res.code === 200){
        AlertService.success('Thanh cong', 'Them danh muc thanh cong!')
      }else{
        AlertService.error('That bai', 'Them danh muc that bai!')
      }
    }
  })
}

const getListCategory = async (params:any) => {
  return await CategoryApi.getListCategoryPagination(params)
}

</script>


<style scoped lang="scss">

</style>

