<template>
  <div class="common-layout">
    <el-container>
      <AsideMenu />
      <el-main>
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
.top-wrapper {
  display: flex;
  justify-content: flex-end;
}
.demo-tabs {
  width: 100%;
}
</style>
