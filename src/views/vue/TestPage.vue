<script setup lang="ts">
import { useMouse } from '../../hooks/mouse.js'

const { x, y } = useMouse()

console.log('x, y', x, y)
</script>
<template>
  <div>x {{ x }}, y {{ y }}</div>
</template>
<style scoped></style>
