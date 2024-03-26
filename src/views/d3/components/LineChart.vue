<template>
  <div id="lineChart"></div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import * as d3 from 'd3'

interface datasetProps {
  name: string
  value: number
}
const margin = {
  left: 30,
  top: 30,
  bottom: 30,
  right: 30
}

// 数据源
const dataset: datasetProps[] = [
  { name: '衬衫', value: 5 },
  { name: '羊毛衫', value: 20 },
  { name: '雪纺衫', value: 36 },
  { name: '裤子', value: 10 },
  { name: '高跟鞋', value: 10 },
  { name: '袜子', value: 20 }
]

const xData = dataset.map((item) => item.name)
const svgHeight = 300
const svgWidth = 500

onMounted(() => {
  const svg = d3
    .select('#lineChart')
    .append('svg')
    .attr('height', svgHeight)
    .attr('width', svgWidth)

  const xScale = d3
    .scaleBand()
    .domain(xData)
    .rangeRound([margin.left, svgWidth - margin.right])
  const yScale = d3.scaleLinear([0, 40], [svgHeight - margin.top, margin.bottom])
  //x轴
  const xAxis = d3.axisBottom(xScale)

  svg
    .append('g')
    .attr('transform', `translate(0, ${svgHeight - margin.bottom})`)
    .call(xAxis)
  // y轴
  const yAxis = d3.axisLeft(yScale)
  svg.append('g').attr('transform', `translate(${margin.left}, 0)`).call(yAxis)

  // 绘制折线
  const line = d3
    .line()
    .x((d: any) => {
      return xScale(d.name) || 0
    })
    .y((d: any) => yScale(d.value || 0))
  // 绘制折线
  svg
    .append('path')
    .attr('class', 'line')
    // @ts-ignore
    .attr('d', line(dataset))
    .attr('fill', 'none')
    .attr('transform', `translate(${xScale.bandwidth() / 2}, 0)`)
    .attr('stroke', '#75A134')
    .attr('stroke-width', 1)
  // 添加背景图
  svg
    .append('rect')
    .attr('width', 500)
    .attr('height', 300)
    .attr('class', 'chart-bg')
    .style('opacity', 0)
})
</script>

<style scoped>
.svg-bg {
  background: url('../../assets/images/bg01.jpeg');
}
</style>
