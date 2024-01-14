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

  const viewer = new Cesium.Viewer('cesiumContainer', {
    infoBox: false,
    terrain: Cesium.Terrain.fromWorldTerrain()
  })
  // @ts-ignore 隐藏cesium的icon
  viewer.cesiumWidget.creditContainer.style.display = 'none'
  const dataGeo = Cesium.GeoJsonDataSource.load(
    'https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000_full',
    {
      stroke: Cesium.Color.RED,
      strokeWidth: 4,
      fill: Cesium.Color.SKYBLUE.withAlpha(0.5)
    }
  )
  dataGeo.then((dataSource) => {
    console.log('dataSource', dataSource)
    viewer.dataSources.add(dataSource)
    const entities = dataSource.entities.values
    entities.forEach((entity: any) => {
      entity.polygon.material = Cesium.Color.fromRandom({
        alpha: 1
      })
      entity.polygon.outline = false
      // 凸起来的高度 
      entity.polygon.extrudedHeight = 1000000 * Math.random()
    })
  })
})
</script>

<style scoped></style>
