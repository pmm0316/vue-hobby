<script setup lang="ts">
import { onMounted } from 'vue'
// 引入高德地图
import AMapLoader from '@amap/amap-jsapi-loader'
import { gaodeKey, gaodeWebKey } from '@/configData/gaode'


// 请求地理编码
const url = `https://restapi.amap.com/v3/geocode/geo?key=${gaodeWebKey}&address=浙江省宁波市海曙区南门街道甬水桥科创中心`
fetch(url).then((res) => {
  res.text().then((data) => {})
})

let map: any = null

const position1 = [121.529959, 29.888224] // 我家
const position2 = [121.533604, 29.856635] // 前公司


onMounted(() => {
  AMapLoader.load({
    key: gaodeKey, // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [],
    Loca: {
      // 是否加载 Loca， 缺省不加载
      version: '2.0.0' // Loca 版本，缺省 1.3.2
    }
  })
    .then((AMap) => {
      map = new AMap.Map('amap', {
        center: position1 //初始化地图中心点
      })
      map.setZoom(16)
      const marker1 = new AMap.Marker({
        position: position1 //位置
      })
      const marker2 = new AMap.Marker({
        position: position2 //位置
      })
      map.add(marker1) //添加到地图
      map.add(marker2) //添加到地图
    })
    .catch((e) => {
      console.log(e)
    })
})

function handleClickBtn(position: number[]) {
  map.setCenter(position)
}
</script>

<template>
  <div class="amap-wrapper">
    <div id="amap"></div>
    <div class="btn-wrapper">
      <el-button @click="handleClickBtn(position1)">我家</el-button>
      <el-button @click="handleClickBtn(position2)">前公司</el-button>
    </div>
  </div>
</template>

<style scoped>
.amap-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  .btn-wrapper {
    position: absolute;
    right: 10px;
    top: 10px;
  }
}
#amap {
  width: 100%;
  height: 100%;
}
</style>
