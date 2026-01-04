<template>
  <div class="dropdownCustom">
    <el-dropdown>
    <span class="dropdownCustom__info">
      <div style="font-size: 20px;font-weight: 500;color: #000000">{{ props.title }}</div>
      <div class="dropdownCustom__avatar">
        <img v-if="props.avatar" alt="Avatar..." :src="props.avatar" />
      </div>
    </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="(item,index) in filterLinks" :key="index">
            <RouterLink :to="item.url">
              {{ item.title }}
            </RouterLink>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">

  import useAuthentication from '@/stores/Authentication.ts'
  import type { RoleType } from '@/enums/RoleType.ts'
  import { computed } from 'vue'

  const role = useAuthentication().userInfo.role;

  const props = defineProps<{
    title?: string,
    avatar?: string,
    listLink?: {
      title: string;
      url: string;
      role?:RoleType | RoleType[]
    }[],
  }>();

  const filterLinks = computed(()=>{
    if(!props.listLink){
      return [];
    }

    return props.listLink.filter((item)=>{

        if(Array.isArray(item.role)){
          return item.role.includes(<RoleType>role.toString());
        }

        return item.role === <RoleType>role.toString();
    })
  });



</script>

<style scoped lang="scss">
  .dropdownCustom {
    &__avatar {
      width: 50px;
      height: 50px;
      overflow: hidden;

      img {
        width: 100%;
        border-radius: 50%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;
    }
  }

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

  a{
    text-decoration: none;
    font-size: 14px;
    color: #000000;
  }
</style>