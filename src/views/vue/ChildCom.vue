<template>
  <div>子组件接收到的值：{{ text }}</div>
  <div>emit改变父组件的值：<el-button @click="handleOnChange">随机数</el-button></div>
</template>
<script setup lang="ts">
defineProps({
  text: String
})
const emit = defineEmits(['change'])
const handleOnChange = () => {
  emit('change', Math.random())
}
</script>
