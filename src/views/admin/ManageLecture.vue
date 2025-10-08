<template>
  <div class="order">
    <div class="order__add" style="display: flex;align-items: center;justify-content: space-between">
      <el-select
          v-model="courseIdSelected"
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="Choose tags for your article"
          style="width: 240px"
      >
        <el-option
            v-for="item in listCourse"
            :key="item.id"
            :label="item.name"
            :value="item.id"
        />
      </el-select>
      <el-button @click="handleShowCreateCourse">
        Add Multiple Course
      </el-button>
    </div>
    <div class="order__table">
      <DataTable
          ref="dataTable"
          :get-data-function="getListLectureByCourseId"
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
                <el-button @click="deleteCourse(scope.row)" type="danger">
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
          <el-option v-for="item in listCourse" :value="item.id">
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
      </el-form-item>
    </el-form>
  </CreateDialog>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref, watch, watchEffect } from 'vue'
  import DataTable from '@/components/datatable/DataTable.vue'
  import CreateDialog from '@/components/dialog/CreateDialog.vue'
  import LevelStudent from '@/enums/LevelStudent.ts'
  import type { FormInstance, FormRules } from 'element-plus'
  import CourseApi from '@/api/CourseApi.ts'
  import AlertService from '@/service/AlertService.ts'
  import LectureApi from '@/api/LectureApi.ts'
  import { SortField } from '@/type/SortField.ts'

  const dataTable = ref()
  const createDialog = ref()
  const listCourse = ref<any>([])
  const createCourseForm = ref<FormInstance>()
  const loading = ref(false)
  const courseIdSelected = ref(1)
  const listLectureByIdCourse = ref<any>([])


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
    }
  }

  const updateCourse = (row: any) => {
    course.id = row.id
    course.desc = row.desc
    course.price = row.price
    course.title = row.title
    course.level = row.level
    course.categoryId = row.categoryId
    course.thumbnail = row.thumbnail
    createDialog.value?.show()
  }

  const deleteCourse = async (row: any) => {
    const res = await CourseApi.deleteCourse([row.id])
    if (res.code === 200) {
      AlertService.success('Thanh cong', 'xoa san pham thanh cong')
    } else {
      AlertService.error('That bai', 'xoa san pham that bai')
    }
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

  const getListCourses = async () => {
    const res = await CourseApi.getListCourseNotPagi()
    listCourse.value = res.data
  }

  const getListLectureByCourseId = async (prams: any) => {
    listLectureByIdCourse.value = await LectureApi.getLecturesByCourseId(prams,1)
  }

  // watch(courseIdSelected,async (newVal,oldVal)=>{
  //   dataTable.value?.getData()
  // })

</script>


<style scoped lang="scss">

</style>

