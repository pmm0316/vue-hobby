import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  strict: true,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/HomePage.vue')
    },
    {
      path: '/threejs/boxGeometry',
      name: 'BoxGeometry',
      component: () => import('@/views/threejs/BoxGeometry.vue')
    },
    {
      path: '/threejs/bufferGeometry',
      name: 'BufferGeometry',
      component: () => import('@/views/threejs/BufferGeomery.vue')
    },
    {
      path: '/threejs/carShowroom',
      name: 'carShowroom',
      component: () => import('@/views/threejs/CarShowroom.vue')
    },
    {
      path: '/cesium/helloCesium',
      name: 'helloCesium',
      component: () => import('@/views/HelloCesium.vue')
    },
    {
      path: '/echarts/basicChart',
      name: 'basicChart',
      component: () => import('@/views/echarts/BasicChart.vue')
    },
    {
      path: '/echarts/zjMap',
      name: 'zhejiangMap',
      component: () => import('@/views/echarts/ZhejiangMap.vue')
    },
    {
      path: '/gaode/basicMap',
      name: 'basicMap',
      component: () => import('@/views/gaode/basicMap.vue')
    },
    {
      path: '/threejs/penaltyGame',
      name: 'penaltyGame',
      component: () => import('@/views/threejs/PenaltyGame.vue')
    },
    {
      path: '/threejs/cartoonRobot',
      name: 'cartoonRobot',
      component: () => import('@/views/threejs/CartoonRobot.vue')
    },
    {
      path: '/vue/testPage',
      name: 'TestPage',
      component: () => import('@/views/vue/TestPage.vue')
    },
  ]
})

export default router
