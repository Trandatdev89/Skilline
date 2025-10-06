<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__wrap">
        <div class="footer__logo">
          <img :srcset="logo" alt="logo">
        </div>
        <div class="footer__desc">
          Subscribe to get our Newsletter
        </div>
        <div class="footer__form">
          <input type="text">
          <a href="/public" class="btn btn--second">
            Subscribe
          </a>
        </div>
        <div class="footer__copy">
          <span>Careers</span>
          <span>Privacy Policy</span>
          <span>Terms & Conditions</span>
        </div>
        <p class="footer__desc">© 2021 Class Technologies Inc. </p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import logo from "@/assets/img/logo.png";

</script>

<style lang="scss" scoped>

</style>