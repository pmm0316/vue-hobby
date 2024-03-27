<script setup lang="ts">
const columns: any[] = [
  {
    label: '标题',
    prop: 'label',
    copyable: true,
    ellipsis: true,
    tooltip: '标题过长会自动收缩'
  },
  {
    disable: true,
    label: '状态',
    prop: 'state',
    filters: true,
    onFilter: true,
    ellipsis: true
  },
  {
    disable: true,
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
    label: '操作',
    valueType: 'option',
    key: 'option'
  }
]
</script>
<template>
  <div class="pro-table">
    <ProTable :columns="columns" />
  </div>
</template>
