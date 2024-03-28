<template>
  <div class="pro-table">
    <SearchForm
      :columns="props.columns"
      @on-search="handleClickSearch"
      @on-reset="handleClickReset"
    />
    <div class="table-wrapper">
      <el-table border :data="tableData" height="100%" size="small" :row-key="rowKey">
        <el-table-column
          v-for="item in props.columns"
          :key="item.prop"
          :prop="item.prop"
          :fixed="item.fixed"
          :label="item.label"
          :width="item.width"
          :show-overflow-tooltip="true"
        >
          <template #default="scope">
            <div>
              <span style="margin-left: 8px">{{ getRenderText(scope.row, item) }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-wrapper">
      <el-pagination
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[5, 20, 50, 100]"
        :small="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { watch, toRefs, ref, defineProps, onMounted, reactive } from 'vue'
import SearchForm from './SearchForm.vue'
import type { SearchModelType } from './interface'

const props = defineProps({
  columns: {
    type: Array<any>,
    default: []
  },
  dataSource: {
    default: []
  },
  request: {
    type: Function
  },
  rowKey: {
    type: String,
    default: 'id'
  }
})

let tableData = ref<any[]>([])
let pagination = reactive<any>({
  current: 1,
  pageSize: 5,
  total: 0
})
const { request } = props

const handleClickSearch = (values: SearchModelType) => {
  console.log('handleClickSearch', values)
  fetchData(values)
}

const handleClickReset = () => {
  fetchData()
}

const handleSizeChange = (val: number) => {
  console.log('val', val)
  fetchData()
}

const handleCurrentChange = (val: number) => {
  pagination.current = val
  fetchData()
}

const getRenderText = (
  row: { [x: string]: any },
  colItem: { prop?: any; options?: any; valueType?: any }
) => {
  const { options, valueType } = colItem
  if (valueType === 'select') {
    return options.find((item: { value: any }) => item.value === row[colItem.prop]).label
  }
  return row[colItem.prop]
}

const fetchData = (searchValues?: SearchModelType) => {
  const { current, pageSize } = pagination
  const params = {
    current,
    pageSize,
    ...searchValues
  }
  if (request) {
    request(params).then((res: any) => {
      console.log('res', res)
      const { data, total } = res
      tableData.value = data
      pagination.total = total
    })
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style lang="scss" scoped>
.pro-table {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .table-wrapper {
    flex: 1;
    overflow-y: auto;
  }
  .pagination-wrapper {
    padding: 15px;
  }
}
</style>
