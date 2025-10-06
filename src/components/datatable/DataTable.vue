<template>
  <div class="data-table">
    <el-table v-if="data"
              :data="data"
              ref="tableRef"
              v-loading.fullscreen.lock="loading"
              empty-text="Data Empty">
      <slot></slot>
    </el-table>

    <div style="display: flex;align-items: center;justify-content: center;margin-top: 20px">
      <el-pagination
          :page-size="size"
          :page-count="totalPage"
          @change="reload"
          layout="prev, pager, next"
          :total="totalElement"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>


  import { onMounted, ref } from 'vue'
  import { SortField } from '@/type/SortField.ts'
  import AlertService from '@/service/AlertService.ts'

  const data = ref<any>([])
  const page = ref<number>(1)
  const size = ref<number>(1)
  const totalElement = ref<number>(0)
  const totalPage = ref<number>(0)
  const loading = ref<boolean>(false)

  const props = defineProps({
    getDataFunction: {
      type: Function,
      require: true
    },
    rowClassName: {
      type: Function,
      require: false
    },
    isShowPagination: {
      type: Boolean,
      required: false,
      default: true
    }
  })

  const getData = async () => {
    loading.value = true
    const request = {
      page: page.value,
      size: size.value,
      sort: SortField.ASC,
      keyword: 'id'
    }
    const res = await props?.getDataFunction(request)
    if (res.code === 200) {
      data.value = res.data.list
      updatePageRequest(res.data)
    } else {
      AlertService.error('Error', res.message)
    }
    loading.value = false
  }

  const reload = async (currentPage:number,pageSize:number) => {
    loading.value = true
    const request = {
      page: currentPage,
      size: pageSize
    }
    const res = await props?.getDataFunction(request)
    if (res.code === 200) {
      data.value = res.data.list

      updatePageRequest(res.data)
      loading.value = false
    } else {
      AlertService.error('Error', res.message)
      loading.value = false
    }
  }

  const updatePageRequest = (data: any) => {
    page.value = data.page
    size.value = data.size
    totalElement.value = data.totalElements
    totalPage.value = data.totalPages
  }

  const handleChange = async (pageCurrent:number,pageSize:number)=>{
    page.value = pageCurrent
    size.value = pageSize
    await getData();
  }

  onMounted(async () => {
    await getData()
  })

  // defineExpose({ getData })

</script>

<style lang="scss" scoped>

</style>