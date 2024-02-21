<template>
  <div>
    父组件的input <el-input style="width: 120px" v-model="textInput" />
    <ChildCom :text="textInput" @change="handleOnChange"/>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import ChildCom from './ChildCom.vue'

const textInput = ref('')
const handleOnChange = (value) => {
  console.log('value', value);
  
  textInput.value = value
}
</script>

<style scoped></style>
