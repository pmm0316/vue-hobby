<template>
  <div class="home-page">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>基本信息</span>
            </div>
          </template>
          <el-descriptions title="">
            <el-descriptions-item label="姓名">彭明明</el-descriptions-item>
            <el-descriptions-item label="出生年月">1993.03</el-descriptions-item>
            <el-descriptions-item label="民族">汉</el-descriptions-item>
            <el-descriptions-item label="性别">男</el-descriptions-item>
            <el-descriptions-item label="邮箱">18267914053@163.com</el-descriptions-item>
            <el-descriptions-item label="联系电话">18267914053</el-descriptions-item>
            <el-descriptions-item label="毕业院校">浙江师范大学行知学院</el-descriptions-item>
            <el-descriptions-item label="学历">本科（统招）</el-descriptions-item>
            <el-descriptions-item label="专业">光信息科学与技术</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>技能证书</span>
            </div>
          </template>
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
              :color="activity.color"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>技术栈</span>
        </div>
      </template>
      <div>
        1. 熟练掌握前端框架 vue2，react，ant-design，element-ui，ant-design-mobile，protable
      </div>
      <div>2. 熟悉可视化图表库 echarts，Highcharts</div>
      <div>3. 了解 3D 的 js 库 threejs、cesium</div>
      <div>4. 了解打包工具 webpack，vite</div>
      <div>5. 了解 java，springMVC，mybatis</div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
const activities = [
  {
    content: '软件设计师',
    timestamp: '2023-11',
    color: '#0bbd87'
  },
  {
    content: '英语CET-4',
    timestamp: '2012-06',
    color: '#0bbd87'
  }
]
const tableData = [
  {
    companyName: '蓝卓数字科技有限公司',
    workingTime: '2020.05-2024.01',
    post: '前端开发工程师'
  },
  {
    companyName: '湖北牛富软件杭州分公司',
    workingTime: '2019.03-2020.03',
    post: '前端开发工程师'
  },
  {
    companyName: '吉利汽车研究院',
    workingTime: '2018.02-2019.03',
    post: '业务（前端）开发工程师'
  },
]
</script>

<style scoped>
.home-page {
  padding: 20px;
  .box-card {
    margin-bottom: 20px;
  }
  .technology {
    font-size: 20px;
  }
  .el-timeline-item {
    &:last-child {
      padding-bottom: 0;
    }
  }
}
</style>
