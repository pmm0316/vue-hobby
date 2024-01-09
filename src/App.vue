<script setup lang="ts">
import { onMounted } from 'vue'
import * as THREE from 'three'
// @ts-ignore
import VertexShader from '@/shader/test/Vertex.glsl?raw'

onMounted(() => {
  console.log(VertexShader)
})
</script>

<template>
  <div class="container">11</div>
</template>

<style scoped></style>
