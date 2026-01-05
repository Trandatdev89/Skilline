<template>
  <div class="dropdownCustom">
    <el-dropdown popper-class="category-dropdown">
       <span style="font-size: 20px;font-weight: 500;color: #000000">{{ props.title }}</span>
      <template #dropdown>
        <el-dropdown-menu style="max-height: 200px!important;overflow-y: auto" @scroll.passive="handleScroll">
          <el-dropdown-item v-for="(item,index) in listItem" :key="index" style="width: 200px!important;">
            {{ item.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">

  const props = defineProps<{
    title?: string,
    listItem?: {
      name: string;
    }[],
  }>();

  const emit = defineEmits(['loadMore']);


  const handleScroll = (e:Event)=>{
    const ev = e.target as HTMLElement;
    if(ev.scrollTop+ev.clientHeight >= ev.scrollHeight - 20){
      emit('loadMore');
    }
  }


</script>

<style scoped lang="scss">

  ::v-deep(.el-dropdown) {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;

    &:hover,
    &:focus {
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
    }
  }

  .dropdownCustom__info {
    cursor: pointer;
    border: none;
    outline: none;
  }

  a {
    text-decoration: none;
    font-size: 14px;
    color: #000000;
  }

  .category-dropdown {
    width: 240px;
    max-height: 300px;
    overflow-y: auto;
  }

  ::v-deep(.el-dropdown-menu) {
    width: 240px !important;
    max-height: 300px !important;
    overflow-y: auto !important;
  }

  ::v-deep(.el-dropdown-menu__item) {
    height: 40px;
    line-height: 40px;
  }
</style>