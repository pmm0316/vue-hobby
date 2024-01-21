<script setup lang="ts">
import { onMounted } from 'vue'
import * as echarts from 'echarts'
// @ts-ignore
import { option1, option2, option3, option4 } from '@/configData/basicChart'

onMounted(() => {
  const optionArr = [option1, option2, option3, option4]
  for (let i = 0; i < 4; i++) {
    const id = `container${i}`
    const myChart = echarts.init(document.getElementById(id))
    myChart.setOption(optionArr[i])
  }
})
</script>

<template>
  <div class="chart-wrapper">
    <div class="container" id="container0"></div>
    <div class="container" id="container1"></div>
    <div class="container" id="container2"></div>
    <div class="container" id="container3"></div>
  </div>
</template>

<style scoped>
.chart-wrapper {
  display: flex;
  flex-wrap: wrap;
}
.container {
  height: 300px;
  width: 500px;
}
</style>
