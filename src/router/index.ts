import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  strict: true,
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        title: '登录页'
      },
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/menu',
      meta: {
        title: 'Menu'
      },
      component: () => import('@/views/layout/index.vue'),
      children: [
        {
          path: '/home',
          name: 'Home',
          meta: {
            title: '首页'
          },
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
        }
      ]
    }
  ]
})

router.beforeEach((to, form) => {
  const token = window.VueCookies.get('token')
  if (!token && to.name !== 'Login') {
    // 将用户重定向到登录页面
    return { name: 'Login' }
  }
  // 有token时，不用登录，直接进入首页
  if (token && to.name === 'Login') {
    return { name: 'Home' }
  }
})

export default router
