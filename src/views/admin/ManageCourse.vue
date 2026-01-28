<template>
  <div class="course">
    <div class="course__add" style="display: flex;align-items: center;justify-content: space-between;margin: 25px 0">
      <el-select
          v-model="categoryIdSelected"
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          @visible-change="handleVisibleChange"
          placeholder="Choose tags for your article"
          style="width: 240px"
      >
        <el-option
            v-for="item in listCategory"
            :key="item.id"
            :label="item.name"
            :value="item.id"
        />
      </el-select>
      <el-button @click="handleShowCreateCourse">
        Add Multiple Course
      </el-button>
    </div>
    <div class="course__table">
      <DataTable
          ref="dataTable"
          :get-data-function="getListCourse"
      >
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="title" label="Tiêu đề" />
        <el-table-column prop="level" label="Cấp độ" />
        <el-table-column prop="status" label="Trạng thái">
          <template #default="scope">
            <el-tag>
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="Giá" />
        <el-table-column prop="discount" label="Giảm giá" />
        <el-table-column prop="rate" label="Đánh giá" />
        <el-table-column prop="categoryName" label="Danh mục" />
        <el-table-column prop="createAt" label="Ngày tạo" />
        <el-table-column prop="updateAt" label="Ngày cập nhập" />
        <el-table-column prop="action" label="Hành động">
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
                :title="'Tạo mới khóa học'"
                text-btn-ok="Lưu"
                :type-action="TypeAction.CREATE"
                @create="handleCreateCourse">
    <FormSaveCourse v-model="course" ref="formSaveCourse" />
  </CreateDialog>
</template>

<script setup lang="ts">
  import { nextTick, onMounted, reactive, ref, watch, watchEffect } from 'vue'
  import DataTable from '@/components/datatable/DataTable.vue'
  import CreateDialog from '@/components/dialog/common/CreateDialog.vue'
  import LevelStudent from '@/enums/LevelStudent.ts'
  import CourseApi from '@/api/CourseApi.ts'
  import { RefreshLeft } from '@element-plus/icons-vue'
  import useCourse from '@/composable/useCourse.ts'
  import useCategory from '@/composable/useCategory.ts'
  import { TypeAction } from '@/enums/TypeAction.ts'
  import FormSaveCourse from '@/components/form/FormSaveCourse.vue'
  import type { CourseReq } from '@/type/req/CourseReq.ts'
  import { useRoute } from 'vue-router'


  const dataTable = ref<InstanceType<typeof DataTable> | null>();
  const createDialog = ref()

  const loading = ref(false)
  const { listCourse, saveCourse } = useCourse()
  const { listCategory, getListCategory } = useCategory()
  const categoryIdSelected = ref<number>()
  const selectDropdown = ref<HTMLElement | null>(null)
  const formSaveCourse = ref()
  const route = useRoute()
  const isEdit = ref(false)

  const course = reactive<CourseReq>({
    id: null,
    title: '',
    desc: '',
    level: LevelStudent.BEGINNER,
    price: null,
    thumbnail: null,
    categoryId: null,
    discount: null,
    rate: 5
  })

  const updateCourse = (row: any) => {
    console.log(row)
    isEdit.value = true
    course.id = row.id
    course.desc = row.description
    course.price = row.price
    course.title = row.title
    course.level = row.level
    course.categoryId = row.categoryId
    course.rate = row.rate
    course.discount = Number(row.discount)
    course.thumbnail = row.thumbnail_url
    createDialog.value?.show()
  }

  function handleShowCreateCourse() {
    createDialog.value?.show()
  }

  const handleCreateCourse = async () => {

    const isValid = formSaveCourse.value?.validate()
    if (!isValid) {
      return
    }
    loading.value = true

    try{
      const formData = new FormData()

      if (course.id) {
        formData.append('id', String(course.id))
      }
      formData.append('title', course.title)
      formData.append('desc', course.desc)
      formData.append('level', course.level)
      formData.append('price', String(course.price))
      formData.append('categoryId', String(course.categoryId))
      formData.append('rate', String(course.rate))
      formData.append('discount', String(course.discount))
      if (course.thumbnail && course.thumbnail instanceof File) {
        formData.append('thumbnail', course.thumbnail)
      }

      await saveCourse(formData)
      formSaveCourse.value?.resetFields()
      createDialog.value?.hide()
      dataTable.value?.reload(dataTable.value?.request)
      resetData()
    }catch(e){
      console.log(e);
    }
  }

  const getListCourse = async (pageRequest: any) => {
    return await CourseApi.getListCourses(pageRequest)
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

  const resetData = () => {
    course.id = null
    course.title = ''
    course.desc = ''
    course.level = LevelStudent.BEGINNER
    course.price = null
    course.thumbnail = null
    course.categoryId = null
    course.discount = null
    course.rate = 5
  }

  watch(()=>categoryIdSelected.value,(newValue,oldValue)=>{
    if(newValue && newValue!==oldValue){
      if (dataTable.value?.request) {
        dataTable.value.request.categoryId = newValue;
        dataTable.value.reload(dataTable.value.request);
      }
    }
  })

  watch(() => route.query.keyword, (newKeyword) => {
    if (newKeyword !== undefined) {
      dataTable.value?.reload({
        page: 1,
        size: 10,
        keyword: newKeyword as string
      })
    }
  }, { immediate: true })

  onMounted(async () => {
    await getListCategory()
  })
</script>


<style scoped lang="scss">

</style>