<script setup lang="ts">
import { onMounted } from 'vue'
import * as echarts from 'echarts'
// @ts-ignore
import { option1 } from '@/configData/basicChart'

onMounted(() => {
  const myChart = echarts.init(document.getElementById('container'))
  myChart.setOption(option1)
})
</script>

<template>
  <div class="container" id="container"></div>
</template>

<style scoped>
.container {
  height: 250px;
  width: 400px;
}
</style>
