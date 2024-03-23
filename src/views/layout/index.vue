<script setup lang="ts">
import AsideMenu from './AsideMenu.vue'
</script>
<template>
  <el-container>
    <aside-menu />
    <el-main class="my-el-main">
      <router-view />
    </el-main>
  </el-container>
</template>

<style scoped>
.my-el-main {
  padding: 0;
  overflow-y: auto;
  height: 100vh;
}
</style>
