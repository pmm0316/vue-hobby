<script lang="ts" setup>
import { ref, defineEmits, defineProps, watch } from 'vue'
import Draggable from 'vuedraggable'

const props = defineProps(['list'])

const orderList = ref<any[]>(props.list)
const checkedList = ref<string[]>([])

const emits = defineEmits(['update:list'])

let drag = ref<boolean>(false)

watch(
  orderList,
  (newData) => {
    console.log('settingList', newData)
    checkedList.value = newData.filter(item => item.hideInTable === false).map((item) => item.prop)
    emits('update:list', newData)
  },
  { deep: true }
)

const handleOnChange = (newData: any) => {
  const newList = [...orderList.value]
  newList.forEach((item) => {
    item.hideInTable = !newData.includes(item.prop)
  })
  console.log('newList', newList)
  emits('update:list', newList)
}
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
            <el-checkbox-group @change="handleOnChange" v-model="checkedList" size="small">
              <Draggable
                v-model="orderList"
                group="people"
                @start="drag = true"
                @end="drag = false"
                item-key="prop"
              >
                <template #item="{ element }">
                  <div class="column-drag-item" style="width: 150px">
                    <el-checkbox
                      :checked="element?.hideInTable !== false"
                      :key="element.prop"
                      :value="element.prop"
                      >{{ element.label }}</el-checkbox
                    >
                  </div>
                </template>
              </Draggable>
            </el-checkbox-group>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
.column-drag-item {
  font-size: 12px;
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
