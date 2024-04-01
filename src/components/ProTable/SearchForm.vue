<template>
  <div class="search-form">
    <el-form :form="searchForm" :model="searchModel" label-suffix=" :" size="default">
      <el-row>
        <el-col
          :span="6"
          v-for="(item, index) in searchList"
          :key="item.prop"
          :class="{
            'el-form-item-hidden': searchFold && index > 2
          }"
        >
          <el-form-item
            :label="item.label"
            :prop="item.prop"
            :label-width="search?.labelWidth || 80"
          >
            <el-select
              placeholder="请选择"
              :multiple="item?.valueType !== 'select'"
              v-if="['select', 'selectMultiple'].includes(item.valueType)"
              v-model="searchModel[item.prop]"
            >
              <el-option
                :label="op.label"
                v-for="op in item.options"
                :key="op.value"
                :value="op.value"
              />
            </el-select>
            <el-date-picker
              v-else-if="['date', 'dateRange'].includes(item?.valueType)"
              v-model="searchModel[item.prop]"
              type="daterange"
              unlink-panels
              range-separator="~"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              size="default"
            />
            <el-checkbox-group
              v-else-if="item?.valueType === 'checkbox'"
              v-model="searchModel[item.prop]"
            >
              <el-checkbox
                :label="op.label"
                v-for="op in item.options"
                :key="op.value"
                :value="op.value"
              />
            </el-checkbox-group>
            <el-radio-group
              v-model="searchModel[item.prop]"
              v-else-if="item?.valueType === 'radio'"
            >
              <el-radio
                :label="op.label"
                v-for="op in item.options"
                :key="op.value"
                :value="op.value"
              />
            </el-radio-group>
            <el-input v-else v-model="searchModel[item.prop]" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col style="text-align: right" :span="6" :offset="colOffset">
          <el-space>
            <el-button type="primary" @click="handleClickSearch">{{
              search?.searchText || '查询'
            }}</el-button>
            <el-button @click="handleClickReset">{{ search?.resetText || '重置' }}</el-button>
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
import { onMounted, watch, reactive, ref, defineProps, computed, toRef, defineEmits } from 'vue'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import type { ProColumnType, SearchModelType, ProTableSearchType, ProTableProps } from './interface'
import type { FormInstance, FormRules } from 'element-plus'

const props = defineProps(['columns', 'search'])

const emits = defineEmits(['onSearch', 'onReset'])

const columns = toRef(props, 'columns')
const search = toRef(props, 'search')

console.log('columns', columns)

const searchForm = ref<FormInstance>()

// 查询项 默认收起
const searchFold = ref<boolean>(!search.value.defaultCollapsed)

let searchModel = reactive<SearchModelType>({})

const initialValues = () => {
  columns.value.forEach((item: ProColumnType) => {
    if (item.valueType === 'checkbox') {
      searchModel[item.prop] = []
    } else {
      searchModel[item.prop] = ''
    }
  })
}

const searchList = computed(() =>
  props.columns.filter(
    (item: { label: string; search: boolean }) =>
      item.label && item.label !== '操作' && item.search !== false
  )
)

const colOffset = computed(() => {
  const showLen = searchFold.value ? 3 : searchList.value.length
  return 24 - ((showLen % 4) + 1) * 6
})

const handleClickSearch = () => {
  const values: SearchModelType = {}
  // 过滤掉空值
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
  .el-form-item {
    margin-bottom: 10px;
    .el-checkbox, .el-radio {
      margin-right: 10px
    }
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
    cursor: pointer;
  }
}
</style>
