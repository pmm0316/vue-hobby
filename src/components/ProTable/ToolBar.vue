<script lang="ts" setup>
import { ref } from 'vue'
</script>
<template>
  <div class="tool-bar">
    <div>
      <el-space>
        <slot name="left"></slot>
      </el-space>
    </div>
    <div></div>
  </div>
</template>

<style scoped lang="scss">
.tool-bar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
</style>
