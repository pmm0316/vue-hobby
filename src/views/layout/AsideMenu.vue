<script setup lang="ts">
import { useRouter } from 'vue-router'
import { menuList } from '../../configData/menuList'
import routerConfig from '../../router';
const router = useRouter()

console.log('routerConfig', routerConfig.getRoutes())

const handleOpen = () => {}

const handleClose = () => {}

const handleClickMenu = (path: string) => {
  router.push({
    path: path
  })
}

</script>
<template>
  <el-aside width="200px">
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="my-el-menu"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
    >
      <div v-for="(item) in menuList" :key="item.path">
        <template v-if="item.children">
          <el-sub-menu :key="item.path" :index="item.path">
            <template #title>{{ item.name }}</template>
            <el-menu-item
              v-for="cItem in item.children"
              :index="cItem.path"
              :key="cItem.path"
              @click="handleClickMenu(cItem.path)"
            >
              {{ cItem.name }}
            </el-menu-item>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path" :key="item.path" @click="handleClickMenu(item.path)">
            {{ item.name }}
          </el-menu-item>
        </template>
      </div>
    </el-menu>
  </el-aside>
</template>

<style scoped>
.my-el-menu {
  height: 100vh;
}
</style>
