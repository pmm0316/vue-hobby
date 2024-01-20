<script setup lang="ts">
import { onMounted } from 'vue'
import * as echarts from 'echarts'
// @ts-ignore
import zhejiangMap from '@/assets/map/zhejiang.json'

const gdpList = [
  { name: '杭州市', gdp: '18753' },
  { name: '宁波市', gdp: '15704.3' },
  { name: '温州市', gdp: '7585' },
  { name: '绍兴市', gdp: '6795，3' },
  { name: '嘉兴市', gdp: '6355.3' },
  { name: '台州市', gdp: '5786.2' },
  { name: '金华市', gdp: '5355.4' },
  { name: '湖州市', gdp: '1875.6' },
  { name: '衢州市', gdp: '1703.6' },
  { name: '丽水市', gdp: '1710' },
  { name: '舟山市', gdp: '1703.6' }
]
onMounted(() => {
  const myChart = echarts.init(document.getElementById('container'))
  // @ts-ignore
  echarts.registerMap('zhejiang', zhejiangMap)
  const option = {
    title: {text: '2022年浙江省各市GDP'},
    tooltip: {
      show: true,
      formatter: function (params: any) {
        console.log(params)
        const { name } = params
        const currentCity = gdpList.find((item) => item.name === name)
        console.log('currentCity', currentCity)
        return `<div>${currentCity?.name}: ${currentCity?.gdp}亿元</div>`
      }
    },
    legend: { show: false },
    series: [
      {
        name: '浙江地图',
        type: 'map',
        map: 'zhejiang',
        roam: true,
        label: {
          show: true
        }
      }
    ]
  }
  myChart.setOption(option)
})
</script>

<template>
  <div class="container" id="container" style="{width: 100vw - 200px; height: 100vh;}"></div>
</template>

<style scoped></style>
