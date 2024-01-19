<template>
  <div id="cesiumContainer"></div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import * as Cesium from 'cesium'

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
onMounted(() => {
  Cesium.Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3YTJjNDU5OS1lMDE2LTRkNzctYjNiMC05ZjM2MWRiYzU4MzAiLCJpZCI6MTg3ODk4LCJpYXQiOjE3MDUyMzEzNzh9.zn6EbdsGZY9CL6iLKOjYQIwfi8do0iuG192d62O36Pc'

  const viewer = new Cesium.Viewer('cesiumContainer')
})
</script>

<style scoped>
#cesiumContainer {
  height: 100vh;
}
</style>
