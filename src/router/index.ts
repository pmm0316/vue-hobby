import { createRouter, createWebHistory } from 'vue-router'
import SmartPark from '../views/SmartPark.vue'
import CarShowroom from '../views/CarShowroom.vue'
import Keyframes from '../views/Keyframes.vue'
import CesiumDemo from '../views/CesiumDemo.vue'
import HomePage from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  strict: true,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/home',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/threejs/carShowroom',
      name: 'carShowroom',
      component: CarShowroom
    },
    {
      path: '/keyframes',
      name: 'keyframes',
      component: Keyframes
    },
    {
      path: '/cesiumDemo',
      name: 'cesiumDemo',
      component: CesiumDemo
    },
  ]
})

export default router
