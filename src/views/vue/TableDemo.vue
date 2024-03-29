<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ProTable from '../../components/ProTable/index.vue'
import request from '../../service/request'
import { type ProColumnType } from '../../components/ProTable/interface'

const columns: ProColumnType[] = [
  {
    label: '标题',
    prop: 'title'
  },
  {
    label: '状态',
    prop: 'state',
    valueType: 'select',
    options: [
      {
        value: 'open',
        label: '未解决'
      },
      {
        value: 'closed',
        label: '已解决'
      }
    ]
  },
  {
    label: '状态2',
    prop: 'state2',
    valueType: 'selectMultiple',
    options: [
      {
        value: 'open',
        label: '未解决'
      },
      {
        value: 'closed',
        label: '已解决'
      }
    ]
  },
  {
    label: '标签',
    prop: 'labels',
    search: false
  },
  {
    label: '创建时间',
    prop: 'created_at',
    valueType: 'dateRange'
  },
  {
    label: '标题1',
    prop: 'title1'
  },
  {
    label: '标题2',
    prop: 'title2'
  },
  {
    label: '标题3',
    prop: 'title3'
  },
  {
    label: '标题4',
    prop: 'title4'
  },
]

const fetchDataSource = (params: any) => {
  return request.get('https://proapi.azurewebsites.net/github/issues', {
    params
  })
}
</script>
<template>
  <div>
    <ProTable :columns="columns" :request="fetchDataSource" :params="{ aa: 1 }">
      <template #leftToolBar>
        <el-button type="primary">新增</el-button>
      </template>
      <template #operations>
        <el-button link type="primary" size="small">编辑  </el-button>
      </template>
    </ProTable>
  </div>
</template>
