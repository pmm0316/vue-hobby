import { createRouter, createWebHistory } from 'vue-router'
import SmartPark from '../views/SmartPark.vue'
import CarShowroom from '../views/CarShowroom.vue'
import Keyframes from '../views/Keyframes.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  strict: true,
  routes: [
    {
      path: '/smartPark',
      name: 'smartPark',
      component: SmartPark
    },
    {
      path: '/carShowroom',
      name: 'carShowroom',
      component: CarShowroom
    },
    {
      path: '/keyframes',
      name: 'keyframes',
      component: Keyframes
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
