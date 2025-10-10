<template>
  <div class="order">
    <div class="order__add">
      <el-button @click="handleShowCreateCourse">
        Add Multiple Course
      </el-button>
    </div>
    <div class="order__table">
      <DataTable
          ref="dataTable"
          :get-data-function="getDataOrder"
      >
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="quantity" label="Số khóa học">
          <template #default="scope">
            <el-tag>
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="totalPrice" label="Tổng tiền" />
        <el-table-column prop="userId" label="Người tạo đơn" />
        <el-table-column prop="createdAt" label="Ngày tạo đơn" />
        <el-table-column prop="status" label="Hanh dong">
          <template #default="scope">
            <el-button @click="updateCourse(scope.row)">
              <el-icon><RefreshLeft /></el-icon>
            </el-button>
          </template>
        </el-table-column>
      </DataTable>
    </div>
  </div>
  <CreateDialog ref="createDialog"
                v-loading="loading"
                @create-course="handleCreateCourse">
    <el-form
        ref="createCourseForm"
        :model="course"
        :rules="rules">
      <el-form-item label-position="top" label="Tieu de khoa hoc" prop="title">
        <el-input v-model="course.title" />
      </el-form-item>
      <el-form-item label-position="top" label="Cap do khoa hoc" prop="level">
        <el-select v-model="course.level">
          <el-option :value="LevelStudent.BEGINNER">
            Beginner
          </el-option>
          <el-option :value="LevelStudent.ADVANCE">
            Advance
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-position="top" label="Giá khóa hoc " prop="price">
        <el-input-number v-model="course.price" />
      </el-form-item>
      <el-form-item label-position="top" label="Danh muc" prop="categoryId">
        <el-select v-model="course.categoryId" multiple-limit="1">
          <el-option v-for="item in listCate" :value="item.id">
            {{ item.name }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-position="top" label="Mo ta khoa hoc" prop="desc">
        <el-input type="textarea" v-model="course.desc" />
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
  import {RefreshLeft,Delete} from "@element-plus/icons-vue";
  import orderApi from '@/api/OrderApi.ts'

  const dataTable = ref()
  const imgUpload = ref()
  const createDialog = ref()
  const listCate = ref()
  const listCourse = ref([{
    id: null,
    title: '',
    desc: '',
    level: LevelStudent.BEGINNER,
    price: null,
    thumbnail: null,
    categoryId: null
  }])
  const createCourseForm = ref<FormInstance>()
  const loading = ref(false)


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

  const course = reactive({
    id: null,
    title: '',
    desc: '',
    level: LevelStudent.BEGINNER,
    price: null,
    thumbnail: null,
    categoryId: null
  })

  const handleProcessFile = (file: any) => {
    if (file.raw) {
      course.thumbnail = file.raw
      imgUpload.value = URL.createObjectURL(file.raw)
    }
  }

  const handleRemoveFile = () => {
    imgUpload.value = ''
    course.thumbnail = null
  }

  const updateCourse = (row:any)=>{
    course.id = row.id;
    course.desc = row.desc;
    course.price = row.price;
    course.title = row.title;
    course.level = row.level;
    course.categoryId = row.categoryId;
    course.thumbnail = row.thumbnail;
    createDialog.value?.show()
  }


  function handleShowCreateCourse() {
    createDialog.value?.show()
  }

  const handleCreateCourse = () => {
    loading.value = true
    createCourseForm.value?.validate(async (valid) => {
      if (valid) {
        const formData = new FormData()

        formData.append('id', course.id ?? '')
        formData.append('title', course.title)
        formData.append('desc', course.desc)
        formData.append('level', course.level)
        formData.append('price', course.price ?? '')
        formData.append('categoryId', course.categoryId ?? '')

        if (course.thumbnail) {
          formData.append('thumbnail', course.thumbnail)
        }

        const res = await CourseApi.saveCourse(formData)
        listCourse.value.push(res.data)
        AlertService.success('Thanh cong', 'Them khoa hoc thanh cong!')
      } else {
        AlertService.success('Thanh cong', 'Them khoa hoc that bai!')
      }
    })
  }

  const getListCategory = async () => {
    const res = await CategoryApi.getListCategory()
    listCate.value = res.data
  }

  const getDataOrder = async (pageRequest: any) => {
    return await orderApi.getOrders(pageRequest)
  }

  onMounted(async () => {
    await getListCategory()
  })

  watchEffect(() => {
    console.log(listCourse.value)
  })

</script>


<style scoped lang="scss">

</style>

