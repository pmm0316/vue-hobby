import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import HelloCesium from '@/views/HelloCesium.vue'
import BoxGeometry from '@/views/threejs/BoxGeometry.vue'
import BufferGeomery from '@/views/threejs/BufferGeomery.vue'
import BasicChart from '@/views/echarts/BasicChart.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  strict: true,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/threejs/boxGeometry',
      name: 'BoxGeometry',
      component: BoxGeometry
    },
    {
      path: '/threejs/bufferGeometry',
      name: 'BufferGeometry',
      component: BufferGeomery
    },
    {
      path: '/cesium/helloCesium',
      name: 'helloCesium',
      component: HelloCesium
    },
    {
      path: '/echarts/basicChart',
      name: 'basicChart',
      component: BasicChart
    },
  ]
})

export default router
