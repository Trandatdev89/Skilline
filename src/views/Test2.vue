<template>
  <div class="scroll-content">
    <div class="wrapper"
         v-infinite-scroll="getData"
         :infinite-scroll-disabled="loading || a"
         :infinite-scroll-distance="50">
      <div v-for="item in data" :key="item?.id" class="item">
        {{ item?.name }}
      </div>
      <p v-if="loading" class="loading">Đang tải thêm...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import axios from 'axios'
  import { ref } from 'vue'

  const skip = ref(0)
  const limit = ref(10)
  const data = ref<any[]>([])
  const loading = ref(false)
  const total = ref(0)
  const a =  ref(false);

  const getData = async () => {
    if (loading.value){
      console.log("oki");
      return;
    }
    loading.value = true

    const res: any = await axios.get(
        `https://dummyjson.com/products/categories?skip=${skip.value}&limit=${limit.value}`
    )

    if(res.data.length<limit.value){
      console.log("oki")
      a.value = true;
    }

    // Tổng số sản phẩm (API trả về)
    total.value = res.data?.total || 0

    // Append data chứ không overwrite
    data.value.push(...res.data)

    // Tăng skip cho lần sau
    skip.value += limit.value

    loading.value = false
  }
</script>

<style scoped lang="scss">
  .scroll-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .wrapper {
    border: 1px solid #000;
    height: 100vh;
    overflow-y: auto;
    padding: 20px;
  }

  .item {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }

  .loading {
    text-align: center;
    padding: 10px;
    font-style: italic;
  }
</style>
