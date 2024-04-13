<script setup lang="ts">
import { reactive, ref } from 'vue'
import ProTable from '../../components/ProTable/index.vue'
import request from '../../service/request'
import MyModal from '../../components/MyModal/index.vue'
import { type ProColumnType } from '../../components/ProTable/interface'

let params = reactive({})
let open = ref(false)
// const aa = reactive(1)

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
    label: '选项',
    prop: 'state2',
    valueType: 'checkbox',
    options: [
      {
        value: 'a',
        label: '选项1'
      },
      {
        value: 'b',
        label: '选项2'
      }
    ]
  },
  {
    label: '标签',
    prop: 'labels',
    valueType: 'radio',
    options: [
      {
        value: 'a',
        label: '标签1'
      },
      {
        value: 'b',
        label: '标签2'
      }
    ]
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
  }
]

const fetchDataSource = (params: any) => {
  return request.get('https://proapi.azurewebsites.net/github/issues', {
    params
  })
}
const handleClick = () => {
  params = {
    aa: 1
  }
  console.log(params)
}

const handleClickCollapsed = (val: boolean) => {
  console.log('val', val)
}
</script>
<template>
  <div>
    <ProTable
      :columns="columns"
      :request="fetchDataSource"
      :params="params"
      @on-collapsed="handleClickCollapsed"
    >
      <template #leftToolBar>
        <el-button type="primary" @click="open = true">新增</el-button>
      </template>
      <template #operations>
        <el-button link type="primary" size="small" @click="handleClick">编辑</el-button>
      </template>
    </ProTable>
    <MyModal v-model:open="open" title="新增" @on-cancel="open = false">
      <div>自定义内容</div>
    </MyModal>
  </div>
</template>
