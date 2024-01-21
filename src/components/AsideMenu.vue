<script setup lang="ts">
import { useRouter } from 'vue-router'
import { menuList } from '../configData/menuList'
const router = useRouter()

const handleOpen = () => {}

const handleClose = () => {}

const handleClickMenu = (url: string) => {
  console.log('url', url)
  router.push({
    path: url
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
      <div v-for="(item) in menuList" :key="item.url">
        <template v-if="item.children">
          <el-sub-menu :key="item.url" :index="item.url">
            <template #title>{{ item.name }}</template>
            <el-menu-item
              v-for="cItem in item.children"
              :index="cItem.url"
              :key="cItem.url"
              @click="handleClickMenu(cItem.url)"
            >
              {{ cItem.name }}
            </el-menu-item>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.url" :key="item.url" @click="handleClickMenu(item.url)">
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
