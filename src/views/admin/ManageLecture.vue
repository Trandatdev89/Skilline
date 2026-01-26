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
            :label="item.title"
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
        <el-table-column prop="title" label="Tiêu đề"/>
        <el-table-column prop="courseName" label="Tên khóa học"/>
        <el-table-column prop="categoryName" label="Danh mục"/>
        <el-table-column prop="duration" label="Thời lượng" />
        <el-table-column prop="position" label="Vi tri" />
        <el-table-column prop="createAt" label="Ngày tạo đơn" />
        <el-table-column prop="updateAt" label="Ngày cập nhap" />
        <el-table-column prop="urlThumbnail" label="Hình ảnh">
          <template #default="scope">
            <img :src="scope.row.urlThumbnail" alt="loading..."/>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="Hanh dong">
          <template #default="scope">
            <el-button @click="updateCourse(scope.row)">
              <el-icon>
                <RefreshLeft />
              </el-icon>
            </el-button>
          </template>
        </el-table-column>
      </DataTable>
    </div>
  </div>
  <CreateDialog ref="createDialog"
                v-loading="loading"
                @create-course="handleCreateLecture">
    <el-form
        ref="createCourseForm"
        :model="lecture"
        :rules="rules">
      <el-form-item label-position="top" label="Tieu de khoa hoc" prop="title">
        <el-input v-model="lecture.title" />
      </el-form-item>
      <el-form-item label-position="top" label="Video bai giang" prop="videoFile">
        <el-upload :auto-upload="false"
                   accept="video/*"
                   :limit="1"
                   @change="handleProcessFile">
          <el-button type="primary">Tai video</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </CreateDialog>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref, watch } from 'vue'
  import DataTable from '@/components/datatable/DataTable.vue'
  import CreateDialog from '@/components/dialog/CreateDialog.vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import CourseApi from '@/api/CourseApi.ts'
  import AlertService from '@/service/AlertService.ts'
  import LectureApi from '@/api/LectureApi.ts'
  import { RefreshLeft, Delete } from '@element-plus/icons-vue'

  const dataTable = ref()
  const createDialog = ref()
  const listCourse = ref<any>([])
  const createCourseForm = ref<FormInstance>()
  const loading = ref(false)
  const courseIdSelected = ref(1)
  const listLectureByIdCourse = ref<any>([])


  const rules = reactive<FormRules>({
    title: [
      { required: true, message: 'Trường này băt buộc', trigger: 'blur' }
    ],
    courseId: [
      { required: true, message: 'Trường này băt buộc', trigger: 'blur' }
    ],
    position: [
      { required: true, message: 'Trường này băt buộc', trigger: 'blur' }
    ],
    videoFile: [
      { required: true, message: 'Trường này băt buộc', trigger: 'blur' }
    ]
  })

  const lecture = reactive({
    id: null,
    title: '',
    courseId: courseIdSelected.value,
    position: null,
    videoFile: null
  })

  const handleProcessFile = (file: any) => {
    lecture.videoFile = file.raw
  }

  const updateCourse = (row: any) => {
    lecture.id = row.id
    lecture.courseId = row.courseId
    lecture.title = row.title
    lecture.position = row.position
    lecture.videoFile = row.videoFile
    createDialog.value?.show()
  }


  function handleShowCreateCourse() {
    createDialog.value?.show()
  }

  const handleCreateLecture = () => {
    loading.value = true
    const formData = new FormData();
    createCourseForm.value?.validate(async (valid) => {
      if (valid) {

        Object.keys(lecture).forEach((key) => {
          let data = lecture[key as keyof typeof lecture];
          if (data) {
            formData.append(key, data);
          }
        });

        const res = await LectureApi.saveLecturesByCourseId(formData)
        listLectureByIdCourse.value.push(res.data)
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

  const getListLectureByCourseId = async (params: any) => {
    const requestParams = {
      ...params,
      courseId: courseIdSelected.value
    }
    return await LectureApi.getLecturesByCourseId(requestParams);
  }

  watch(courseIdSelected, async (newVal, oldVal) => {
    await dataTable.value?.getData()
    lecture.courseId = courseIdSelected.value
  })


  onMounted(async () => {
    await getListCourses()
  })

</script>


<style scoped lang="scss">

</style>

