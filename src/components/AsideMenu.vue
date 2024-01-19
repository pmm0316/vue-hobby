<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()

const menuList = [
  {
    name: '首页',
    url: '/home'
  },
  {
    name: 'threejs',
    url: '/threejs',
    children: [
      {
        name: '汽车展厅',
        url: '/threejs/carShowroom'
      }
    ]
  }
]
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
      default-active="2"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
    >
      <!-- <el-sub-menu index="1" :title="item.name" v-for="item in menuList" :key="item.url">
       

      </el-sub-menu> -->
      <div v-for="(item, index) in menuList" :key="item.url">
        <template v-if="item.children">
          <el-sub-menu :key="item.url" :index="index">
            <template #title>{{ item.name }}</template>
            <el-menu-item
              v-for="cItem in item.children"
              :key="cItem.url"
              @click="handleClickMenu(cItem.url)"
            >
              {{ cItem.name }}
            </el-menu-item>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :key="item.url" @click="handleClickMenu(item.url)">
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
