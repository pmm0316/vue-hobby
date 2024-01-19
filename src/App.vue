<template>
  <div class="common-layout">
    <el-container>
      <AsideMenu />
      <el-main class="my-el-main" >
        <router-view />
      </el-main>
    </el-container>
    <!-- <router-view /> -->
  </div>
</template>
<script setup lang="ts">
import AsideMenu from './components/AsideMenu.vue'
</script>

<style scoped>
.my-el-main {
  padding: 0;
}
</style>
