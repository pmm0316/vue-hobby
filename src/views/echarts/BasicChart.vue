<script setup lang="ts">
import { onMounted } from 'vue'
import * as echarts from 'echarts'

const option1 = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
}
console.log(option1)
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
