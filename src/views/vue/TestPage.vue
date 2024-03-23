<script setup lang="ts">
import ProTable from '@/components/proTable/index.vue';

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
]

const columns: any[] = [
  {
    label: '日期',
    prop: 'date',
    // width: 150
  },
  {
    label: '名字',
    prop: 'name',
    // width: 150
  },
  {
    label: '状态',
    prop: 'state',
    // width: 150
  },
  {
    label: '城市',
    prop: 'city',
    // width: 150
  },
  {
    label: '地址',
    prop: 'address',
    // width: 150
  },
]
</script>
<template>
  <div>
    <ProTable :data="tableData" :columns="columns" />
  </div>
</template>
<style scoped></style>
