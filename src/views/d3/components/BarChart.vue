<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div class="grid-item" id="main1"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import * as d3 from 'd3'

// 数据源
const dataset = [
  { name: '衬衫', value: 5 },
  { name: '羊毛衫', value: 20 },
  { name: '雪纺衫', value: 36 },
  { name: '裤子', value: 10 },
  { name: '高跟鞋', value: 10 },
  { name: '袜子', value: 20 }
]
onMounted(() => {
  const svgHeight = 300
  const svgWidth = 500
  // 创建svg
  const svg = d3.select('#main1').append('svg').attr('width', svgWidth).attr('height', svgHeight)
  const margin = { left: 30, top: 40, bottom: 20, right: 20 }

  const innerWidth = svgWidth - margin.left - margin.right
  const innerHeight = svgHeight - margin.top - margin.bottom
  const xData = dataset.map((item) => item.name)

  // 定义比例尺
  const xScale = d3.scaleBand().domain(xData).rangeRound([0, innerWidth]).padding(0.3) // 添加内边距
  const yScale = d3.scaleLinear().domain([0, 40]).range([innerHeight, 0])

  // 定义x坐标
  const xAxis = d3.axisBottom(xScale)

  // 定义y坐标
  // tickPadding 设置间距
  // tickSize 设置tick长度
  // ticks() 设置tick数量
  const yAxis = d3.axisLeft(yScale).ticks(5).tickSize(0).tickPadding(5)

  // 设置x坐标到svg中
  svg
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top + innerHeight})`)
    .call(xAxis)

  // 设置y坐标到svg中
  svg
    .append('g')
    .attr('id', 'gyaxis')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .call(yAxis)
  // 计算柱状的宽度
  const barWidth = xScale.bandwidth()

  // 获取y轴上的所有tick值
  const yTicks = d3.selectAll('#gyaxis .tick text').nodes()
  const tickValues = yTicks.map((item) => parseInt(d3.select(item).text()))
  // 绘制直线
  svg
    .append('g')
    .selectAll('line')
    .data(tickValues)
    .enter()
    .append('line')
    .attr('x1', margin.left)
    .attr('y1', (d) => {
      return yScale(d) - margin.bottom
    })
    .attr('x2', svgWidth - margin.right)
    .attr('y2', (d) => {
      return yScale(d) - margin.bottom
    })
    .attr('stroke', '#E0E6F1') // 定义线的颜色
    .attr('stroke-width', 1)
    .style("stroke-dasharray", "5") // 定义虚线的样式

  // 添加提示框
  const tooltip = d3
    .select('#main1')
    .append('div')
    .style('display', 'none')
    .style('position', 'absolute')

  // 设置bar
  svg
    .selectAll('.bar')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('fill', (d, i) => {
      // return i % 2 === 0 ? '#69b3a2' : 'red'
      return '#69b3a2'
    })
    .attr('x', (d, i) => {
      // @ts-ignore
      return xScale(d.name) + margin.left
    })
    .attr('y', (d, i) => {
      return yScale(d.value) + margin.top
    })
    .attr('width', barWidth)
    .attr('height', function (d) {
      // 设置矩形高度
      return innerHeight - yScale(d.value)
    })
    .on('mousemove', function (e, d) {
      d3.select(this).transition().duration(100).attr('fill', 'green')
      tooltip
        .html(
          `<div>
            ${d?.name}：${d?.value}
          </div>`
        ) //为数据提示框添加对象对应的数据
        .attr('class', 'tooltip')
        .style('left', `${e.pageX + 20}px`)
        .style('top', `${e.pageY + 20}px`)
        .style('font-size', `13px`)
        .style('display', 'block')
    })
    .on('mouseout', function () {
      d3.select(this).transition().duration(100).attr('fill', '#69b3a2')
      tooltip.style('display', 'none')
    })
  // 设置y轴不显示
  d3.select('#gyaxis .domain').remove()

  // 每个柱子上加上对应的数字
  svg
    .append('g')
    .selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
    .attr('fill', '#000')
    .style('font-size', 12)
    .style('width', barWidth)
    .attr('x', (d, i) => {
      // @ts-ignore
      return xScale(d.name) + margin.left + (barWidth / 2 - `${d.value}`.length * 3)
    })
    .attr('y', (d, i) => {
      return yScale(d.value) + margin.top - 3
    })
    .text((d, i) => {
      return d.value
    })
})
</script>
<style scoped></style>
