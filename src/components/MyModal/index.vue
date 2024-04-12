<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  defineModel,
  watchEffect,
  withDefaults,
  toRefs,
  isRef
} from 'vue'

const props = withDefaults(
  defineProps<{
    title?: string
    okText?: string
    cancelText?: string
  }>(),
  {
    title: '标题',
    okText: '确定',
    cancelText: '取消'
  }
)
const { title, okText, cancelText } = toRefs(props)

const open = defineModel('open', {
  default: false,
  type: Boolean,
  required: false
})
watchEffect(() => {
  console.log('open', open.value)
})
const emits = defineEmits<{
  (e: 'update:open', open: boolean): void
  (e: 'onOk'): void
  (e: 'onCancel'): void
}>()
</script>
<template>
  <Teleport to="body">
    <div class="my-modal-mask" v-if="open">
      <div class="my-modal">
        <div class="my-modal-header">
          <div class="my-modal-title">{{ title }}</div>
        </div>
        <div class="my-modal-body">
          <slot></slot>
        </div>
        <div class="my-modal-footer">
          <el-button @click="emits('onOk')" type="primary">{{ okText }}</el-button>
          <el-button @click="emits('onCancel')">{{ cancelText }}</el-button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.my-modal-mask {
  position: fixed;
  z-index: 888;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  .my-modal {
    position: absolute;
    z-index: 900;
    top: 20%;
    left: 50%;
    width: 300px;
    margin-left: -150px;
    background: #fff;
    border-radius: 4px;
    padding: 15px;
    .my-modal-title {
      color: rgba(0, 0, 0, 0.88);
      font-size: 16px;
      font-weight: bold;
    }
    .my-modal-footer {
      display: flex;
      justify-content: end;
    }
  }
}
</style>
