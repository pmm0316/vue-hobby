<script setup lang="ts">
import { ref } from 'vue'
import { useMouse } from '@/hooks/mouse.js'
import MyModal from '../../components/MyModal/index.vue'

const { x, y } = useMouse()
let open = ref(false)
let title = ref('新增')
</script>
<template>
  <div>x {{ x }}, y {{ y }}</div>
  <el-button @click="title = 'title!!'">123</el-button>
  <el-button @click="open = true">open</el-button>
  <MyModal v-model:open="open" :title="title" @on-cancel="open = false">
    <div>1231</div>
  </MyModal>
</template>
<style scoped></style>
