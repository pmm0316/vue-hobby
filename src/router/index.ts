import { createRouter, createWebHistory } from 'vue-router'
import SmartPark from '../views/SmartPark.vue'
import CarShowroom from '../views/CarShowroom.vue'
import Keyframes from '../views/Keyframes.vue'
import CesiumDemo from '../views/CesiumDemo.vue'
import HomePage from '../views/HomePage.vue'
import HelloCesium from '@/views/HelloCesium.vue'
import TechnologyStack from '@/views/TechnologyStack.vue'
import BoxGeometry from '@/views/threejs/BoxGeometry.vue'
import BufferGeomery from '@/views/threejs/BufferGeomery.vue'

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
    // {
    //   path: '/threejs/keyframes',
    //   name: 'keyframes',
    //   component: Keyframes
    // },
    // {
    //   path: '/threejs/technologyStack',
    //   name: 'TechnologyStack',
    //   component: TechnologyStack
    // },
    // {
    //   path: '/cesiumDemo',
    //   name: 'cesiumDemo',
    //   component: CesiumDemo
    // },
  ]
})

export default router
