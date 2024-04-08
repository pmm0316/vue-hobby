<template>
  <div class="pro-table">
    <SearchForm
      v-if="props.search !== false"
      :search="props.search"
      :columns="columns"
      @on-search="handleClickSearch"
      @on-reset="handleClickReset"
    />
    <ToolBar v-model:list="tableColumns">
      <template #left>
        <slot name="leftToolBar"></slot>
      </template>
    </ToolBar>
    <div class="table-wrapper">
      <el-table border :data="tableData" height="100%" :row-key="props.rowKey" stripe>
        <el-table-column type="selection" :width="selection.width" v-if="selection" />
        <el-table-column
          v-for="item in customTableColumns"
          :key="item.prop"
          :prop="item.prop"
          :fixed="item?.fixed"
          :label="item.label"
          :width="item?.width"
          :show-overflow-tooltip="true"
        >
          <template #default="scope">
            <div>
              <span style="margin-left: 8px">{{ getRenderText(scope.row, item) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template #default>
            <slot name="operations"></slot>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-wrapper">
      <el-pagination
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[5, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  watch,
  ref,
  toRef,
  defineProps,
  onMounted,
  reactive,
  defineEmits,
  computed,
  withDefaults
} from 'vue'
import SearchForm from './SearchForm.vue'
import ToolBar from './ToolBar.vue'
import type { SearchModelType, ProColumnType, ProTableProps } from './interface'

const props = withDefaults(defineProps<ProTableProps>(), {
  columns: () => [],
  search: () => {
    return {}
  },
  rowKey: 'id',
  selection: () => {
    return { width: 45 }
  }
})

const tableColumns = ref<ProColumnType[]>(props.columns)
const selection = ref(props?.selection)
let tableData = ref([])

const customTableColumns = computed(() =>
  tableColumns.value.filter((item) => item.hideInTable !== true)
)

const emits = defineEmits(['onReset'])

let pagination = reactive<any>({
  current: 1,
  pageSize: 5,
  total: 0
})

const handleClickSearch = (values: SearchModelType) => {
  console.log('handleClickSearch', values)
  fetchData(values)
}

const handleClickReset = () => {
  fetchData()
  emits('onReset')
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
  const tableParams = {
    current,
    pageSize,
    ...searchValues
  }
  const { request, params } = props
  if (request) {
    const fetchParams = {
      ...params,
      ...tableParams
    }
    request(fetchParams).then((res: any) => {
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
watch(
  () => props.params,
  () => {
    fetchData()
  },
  { deep: true }
)
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
    padding: 10px;
  }
}
</style>
