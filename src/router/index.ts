import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import { menuList } from '../configData/menuList'
import { treeToArray } from '../utils/utils'

const router = createRouter({
  history: createWebHashHistory('/vue-hobby'),
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
      path: '/layout',
      name: 'Layout',
      meta: {
        title: 'layout'
      },
      component: () => import('@/views/layout/index.vue'),
    }
  ]
})

// 根据菜单，动态新增路由
treeToArray(menuList).forEach((item: RouteRecordRaw) => {
  if (item.component) {
    router.addRoute('Layout', item)
  }
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
