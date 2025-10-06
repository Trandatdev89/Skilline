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
        <el-table-column prop="userId" label="User ID" />
        <el-table-column prop="totalPrice" label="Tổng tiền" />
        <el-table-column prop="status" label="Trạng thái">
          <template #default="scope">
            <el-tag>
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="Ngày tạo đơn" />
        <el-table-column prop="updatedAt" label="Ngày cập nhập đơn" />
        <el-table-column prop="fullname" label="Tên người tạo" />

      </DataTable>
    </div>
  </div>
  <CreateDialog ref="createDialog"
                @create-course="handleCreateOrUpdateCourse">
    <el-button @click="handleAdd">Add</el-button>
    <div v-for="(product, index) in listCourse" :key="index">
      <el-form>

      </el-form>
    </div>
  </CreateDialog>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue'
  import orderApi from '@/api/OrderApi.ts'
  import DataTable from '@/components/datatable/DataTable.vue'
  import CreateDialog from '@/components/dialog/CreateDialog.vue'
  import LevelStudent from '@/enums/LevelStudent.ts'

  const dataTable = ref()
  const createDialog = ref()
  const listCourse = ref([{
    id:null,
    title:'',
    desc:'',
    level:LevelStudent.BEGINNER,
    price:null,
    discount:null,
    thumbnail:null,
    categoryId:null
  }]);

  const handleAdd = () => {
    listCourse.value.push({
          id: null,
          title: '',
          desc: '',
          level: LevelStudent.BEGINNER,
          price: null,
          discount: null,
          thumbnail: null,
          categoryId: null
        });
  }

  const handleShowCreateCourse = () => {
    createDialog.value?.show()
  }

  const handleCreateOrUpdateCourse = () => {

  }

  const getDataOrder = async (pageRequest: any) => {
    console.log(pageRequest)
    return await orderApi.getOrders(pageRequest)
  }

</script>


<style scoped lang="scss">

</style>