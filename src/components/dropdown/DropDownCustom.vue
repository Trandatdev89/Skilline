<template>
  <div class="dropdownCustom">
    <el-dropdown>
    <span class="dropdownCustom__info">
      <div style="font-size: 20px;font-weight: 500;color: #000000">{{ props.title }}</div>
      <div class="dropdownCustom__avatar">
        <img alt="Avatar..." :src="props.avatar" />
      </div>
    </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-if="role==='ADMIN'">
            <RouterLink to="/admin/dashboard">
              Trang quản lý
            </RouterLink>
          </el-dropdown-item>
          <el-dropdown-item v-for="(item,index) in props.listLink" :key="index">
            <RouterLink :to="item.url">
              {{ item.label }}
            </RouterLink>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">

  import { getRole } from '@/security/getRole.ts'

  const role = getRole();

  const props = defineProps<{
    title: string,
    avatar: string,
    listLink: { label: string; url: string;}[]
  }>()

  console.log(role);

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