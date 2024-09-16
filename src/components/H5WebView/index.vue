<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { defineProps } from 'vue'

const props = defineProps({
  src: {
    required: true,
    type: String,
  }
})

const IframeStyle: CSSProperties = {
  height: '600px',
  width: '300px',
  overflowY: 'auto',
  border: '1px solid #ccc'
}

</script>
<template>
  <iframe :style="IframeStyle" :src="props.src"></iframe>
</template>