<script setup lang="ts">
import { defineModel, defineEmits } from 'vue'

const pagination: any = defineModel('pagination')

const emits = defineEmits<{
  (e: 'update:pagination', title: string): void
  (e: 'currentChange', currentPage: number): void
  (e: 'sizeChange'): void
}>()

const handleCurrentChange = (currentPage: number) => {
  emits('currentChange', currentPage)
}
const handleSizeChange = () => {
  emits('sizeChange')
}
</script>
<template>
  <div class="pagination-wrapper">
    <el-pagination
      v-model:current-page="pagination.currentPage"
      v-model:page-size="pagination.pageSize"
      :page-sizes="[2, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
