<template>
  <div class="search-form">
    <el-form :form="searchForm" :model="searchModel" label-suffix=" :" size="small">
      <el-row>
        <el-col
          :span="6"
          v-for="(item, index) in searchList"
          :key="item.prop"
          :class="{
            'el-form-item-hidden': searchFold && index > 2
          }"
        >
          <el-form-item :label="item.label" :prop="item.prop" :label-width="80">
            <el-select
              placeholder="请选择"
              v-if="item.valueType === 'select'"
              v-model="searchModel[item.prop]"
            >
              <el-option
                :label="op.label"
                v-for="op in item.options"
                :key="op.value"
                :value="op.value"
              />
            </el-select>

            <el-input v-else v-model="searchModel[item.prop]" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col style="text-align: right" :span="6" :offset="colOffset">
          <el-space>
            <el-button type="primary" @click="handleClickSearch">查询</el-button>
            <el-button @click="handleClickReset">重置</el-button>
            <span v-if="searchList.length > 3" class="fold-btn" @click="searchFold = !searchFold"
              >{{ searchFold ? '展开' : '收起' }}
              <el-icon
                ><ArrowUp v-show="!searchFold" />
                <ArrowDown v-show="searchFold" />
              </el-icon>
            </span>
          </el-space>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { onMounted, watch, reactive, ref, defineProps, computed, toRefs, defineEmits } from 'vue'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { type SearchModelType } from './interface'
import type { FormInstance, FormRules } from 'element-plus'

const props = defineProps({
  columns: {
    type: Array<any>,
    default: []
  }
})

const emits = defineEmits(['onSearch', 'onReset'])

const { columns } = toRefs(props)

console.log('columns', columns)

const searchForm = ref<FormInstance>()

// 查询项 默认收起
const searchFold = ref<boolean>(true)

let searchModel = reactive<SearchModelType>({})

const initialValues = () => {
  columns.value.forEach((item) => {
    searchModel[item.prop] = ''
  })
}

const searchList = computed(() =>
  props.columns.filter((item) => item.label && item.label !== '操作' && item.search !== false)
)

const colOffset = computed(() => {
  const showLen = searchFold.value ? 3 : searchList.value.length
  return 24 - ((showLen % 4) + 1) * 6
})

const handleClickSearch = () => {
  const values: SearchModelType = {}
  for (let key in searchModel) {
    if (searchModel[key] !== '' && searchModel[key] !== undefined) {
      values[key] = searchModel[key]
    }
  }
  emits('onSearch', values)
}

const handleClickReset = () => {
  initialValues()
  emits('onReset')
}

onMounted(() => {
  initialValues()
})
</script>

<style lang="scss" scoped>
.search-form {
  padding: 15px;
  border: 1px solid #ebeef5;
  border-radius: 5px;
  .el-form-item--small {
    margin-bottom: 10px;
  }
  .el-col {
    padding-right: 12px;
  }
  .el-form-item-hidden {
    display: none;
  }
  .fold-btn {
    font-size: 13px;
    color: #1677ff;
  }
}
</style>
