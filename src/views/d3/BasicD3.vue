<script setup lang="ts">
import BarChart from './components/BarChart.vue'
import LineChart from './components/LineChart.vue'
</script>

<template>
  <div class="content-wrapper">
    <BarChart />
    <LineChart />
  </div>
</template>
<style scoped>
.content-wrapper {
  display: flex;
  height: 100vh;
  width: 100%;
}
</style>
