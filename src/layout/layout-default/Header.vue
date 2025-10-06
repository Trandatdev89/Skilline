<template>
  <header class="header">
    <div class="container">
      <div class="header__top">
        <div class="header__logo">
          <img :srcset="logo" alt="logo">
        </div>
        <div class="header__list">
          <div class="header__item">
            <RouterLink to="/">Home</RouterLink>
          </div>
          <div class="header__item">
            <RouterLink to="/course">Course</RouterLink>
          </div>
          <div class="header__item">
            <RouterLink to="/blog">Blog</RouterLink>
          </div>
          <div class="header__item">
            <RouterLink to="/category">Category</RouterLink>
          </div>
        </div>
        <div class="header__auth header__auth--dropdown" v-if="userInfo.isAuthentication">
          <DropDownCustom :title="userInfo.name"
                          :list-link="listLink"
                          avatar="https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg" />
        </div>
        <div class="header__auth" v-else>
          <RouterLink to="/login" class="btn btn--primary">
            Login
          </RouterLink>
          <RouterLink to="/register" class=" btn btn--second">
            Sign Up
          </RouterLink>
        </div>
        <div class="header__bar">
          <i class="fa-solid fa-bars" @click="handleShowBar"></i>
        </div>
        <div :class="['dropdown', { show: isShow }]">
          <ul class="dropdown__item"><a href="/public">Home</a></ul>
          <ul class="dropdown__item"><a href="/public">Careers</a></ul>
          <ul class="dropdown__item"><a href="/public">Blog</a></ul>
          <ul class="dropdown__item"><a href="/public">About Us</a></ul>
        </div>
      </div>
      <div class="header__banner" v-if="router.path==='/'">
        <div class="header__content">
          <div class="header__title">
            <span>Studying</span> Online is now much easier
          </div>
          <div class="header__desc">
            Skilline is an interesting platform that will teach you in more an interactive way
          </div>
          <div class="header__watch">
            <a href="/public" class="btn btn--second">
              Join for free
            </a>
            <div class="header__play">
              Play
            </div>
            <div class="header__subdesc">
              Watch how it works
            </div>
          </div>
        </div>
        <div class="header__girl">
          <img :srcset="girl" alt="gril">
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>

  import logo from '@/assets/img/logo.png'
  import girl from '@/assets/img/header-pic.png'
  import { ref } from 'vue'
  import { RouterLink, useRoute } from 'vue-router'
  import useAuthentication from '@/stores/Authentication.ts'
  import DropDownCustom from '@/components/dropdown/DropDownCustom.vue'
  import { storeToRefs } from 'pinia'

  const isShow = ref<boolean>(false)
  const router = useRoute()

  const handleShowBar = () => {
    isShow.value = !isShow.value
  }

  const listLink = ref<any>([
    {
      label: 'Khóa học đã mua',
      url: '/course'
    },
    {
      label: 'Thông tin cá nhân',
      url: '/info'
    },
    {
      label: 'Đăng xuất',
      url: '/logout'
    }
  ])

  const { userInfo } = storeToRefs(useAuthentication())

</script>

<style lang="scss" scoped>
  a{
    text-decoration: none;
    font-size: 18px;
    font-weight: 500;
  }
</style>