<template>
  <div class="inputSearch">
    <div class="inputSearch__icon">
      <el-icon>
        <Search />
      </el-icon>
    </div>
    <input placeholder="Type to search..."/>
  </div>
</template>

<script lang="ts" setup>
  import { Search } from '@element-plus/icons-vue'

</script>

<style lang="scss" scoped>
   .inputSearch{
     padding: 5px 10px;
     border: 1px solid #333333;
     position: relative;
     border-radius: 5px;

     &__icon{
       width: 20px;
       height: 20px;
       position: absolute;
       right: 18px;
       top: 8px;
     }
     input{
       flex: 1;
       width: 100%;
       height: 100%;
       border: none;
       outline: none;
       padding: 0px 30px;
     }
   }
</style>