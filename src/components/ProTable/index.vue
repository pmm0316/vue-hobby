<template>
  <div class="pro-table">
    <el-form :form="searchForm">
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
            <el-input />
          </el-form-item>
        </el-col>
        <el-col style="text-align: right" :span="6" :offset="searchOffsetSpan">
          <el-space>
            <el-button type="primary" @click="handleClickSearch">查询</el-button>
            <el-button @click="handleClickReset">重置</el-button>
            <span v-if="searchList.length > 3" class="" @click="searchFold = !searchFold">{{
              searchFold ? '展开' : '收起'
            }}</span>
          </el-space>
        </el-col>
      </el-row>
    </el-form>
    <el-table>
      <el-table-column
        :key="item.prop"
        v-for="item in columns"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      />
    </el-table>
  </div>
</template>
<script setup lang="ts">
import { watch, toRefs, ref, defineProps, computed } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const props = defineProps({
  columns: {
    type: Array<any>,
    default: []
  }
})

const { columns } = toRefs(props)

const searchForm = ref<FormInstance>()

// 查询项 默认收起
const searchFold = ref<boolean>(true)

const searchList = computed(() =>
  props.columns.filter((item) => item.label && item.label !== '操作')
)

const searchOffsetSpan = computed(() => {
  const showLen = searchFold.value ? 3 : searchList.value.length
  return 24 - ((showLen % 4) + 1) * 6
})

const handleClickSearch = () => {}

const handleClickReset = () => {}
</script>

<style lang="scss" scoped>
.pro-table {
  .el-col {
    padding-right: 12px;
  }
  .el-form-item-hidden {
    display: none;
  }
}
</style>
