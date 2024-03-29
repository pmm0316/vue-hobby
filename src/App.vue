<template>
  <ElConfigProvider :locale="zhCn" size="default">
    <div class="app-container">
      <router-view />
    </div>
  </ElConfigProvider>
</template>
<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>
<style scoped></style>
