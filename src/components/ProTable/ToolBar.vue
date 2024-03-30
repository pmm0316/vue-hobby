<script lang="ts" setup>
import { ref, defineEmits, defineProps, watch } from 'vue'
import { Setting } from '@element-plus/icons-vue'
import Draggable from 'vuedraggable'

const props = defineProps(['list'])

const settingList = ref<any[]>(props.list)

const emits = defineEmits(['update:list'])

let drag = ref<boolean>(false)

watch(
  settingList,
  (newData) => {
    emits('update:list', newData)
  },
  { deep: true }
)
</script>
<template>
  <div class="tool-bar">
    <div>
      <el-space>
        <slot name="left"></slot>
      </el-space>
    </div>
    <div class="right-tool-bar">
      <el-dropdown trigger="click">
        <el-button>列设置</el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <Draggable
              v-model="settingList"
              group="people"
              @start="drag = true"
              @end="drag = false"
              item-key="prop"
            >
              <template #item="{ element }">
                <div class="column-drag-item" style="width: 150px">{{ element.label }}</div>
              </template>
            </Draggable>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
.column-drag-item {
  font-size: 13px;
  padding: 3px 5px;
  &:hover {
    background: #ecf5ff;
    cursor: move;
  }
}
.tool-bar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  .right-tool-bar {
    display: flex;
  }
}
</style>
