<template>
   <div class="category">
     <div class="container">
       <div class="category__main">
         <template v-for="item in listCategory" :key="item.id">
           <CardUi img="https://images.pexels.com/photos/2049422/pexels-photo-2049422.jpeg"
                   :title="item?.name" @click="handleNavigateCourse(item.id)"/>
         </template>
       </div>
     </div>
   </div>
</template>


<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import CategoryApi from '@/api/CategoryApi.ts'
  import CardUi from '@/components/card/CardUi.vue'
  import { useRouter } from 'vue-router'

  const listCategory = ref<any>([]);
  const router = useRouter();

  const getListCategory = async ()=>{
    const res = await CategoryApi.getListCategory();
    listCategory.value = res.data;
  }

  const handleNavigateCourse = (id:number)=>{
    router.push(`/course?category=${id}`);
  }

  onMounted(async ()=>{
    await getListCategory();
  });

</script>

<style scoped lang="scss">
   .category{
     &__main{
       display: flex;
       align-items: center;
       justify-content: space-between;
       gap: 15px;
     }
   }
</style>