import { type RouteComponent, type RouteMeta } from 'vue-router'

type MenuType = {
  name: string
  path: string
  children?: MenuType[]
  component?: RouteComponent
  meta?: RouteMeta
}

export const menuList: MenuType[] = [
  {
    name: 'Home',
    path: '/home',
    meta: {
      title: '首页'
    },
    component: () => import('@/views/HomePage.vue')
  },
  {
    name: 'Vue',
    path: '/vue',
    meta: {
      title: '组件封装'
    },
    children: [
      {
        name: 'TableDemo',
        path: '/vue/tableDemo',
        component: () => import('@/views/vue/TableDemo.vue'),
        meta: {
          title: '表格演示'
        }
      }
    ]
  },
  {
    name: 'D3',
    path: '/d3',
    meta: {
      title: 'D3.js'
    },
    children: [
      {
        name: 'BasicD3',
        path: '/d3/basicD3',
        component: () => import('@/views/d3/BasicD3.vue'),
        meta: {
          title: '基础'
        }
      }
    ]
  },
  {
    name: 'Echarts',
    path: '/echarts',
    children: [
      {
        name: '基础图表',
        path: '/echarts/basicChart',
        component: () => import('@/views/echarts/BasicChart.vue')
      },
      {
        name: '浙江地图',
        path: '/echarts/zjMap',
        component: () => import('@/views/echarts/ZhejiangMap.vue')
      }
    ]
  },
  {
    name: '高德地图',
    path: '/gaode',
    children: [
      {
        name: '基础地图',
        path: '/gaode/basicMap',
        component: () => import('@/views/gaode/basicMap.vue')
      }
    ]
  },
  {
    name: 'Threejs',
    path: '/threejs',
    children: [
      {
        name: 'BoxGeometry',
        path: '/threejs/boxGeometry',
        component: () => import('@/views/threejs/BoxGeometry.vue')
      },
      {
        name: 'BufferGeometry',
        path: '/threejs/bufferGeometry',
        component: () => import('@/views/threejs/BufferGeomery.vue')
      },
      {
        name: '汽车展厅',
        path: '/threejs/carShowroom',
        component: () => import('@/views/threejs/CarShowroom.vue')
      },
      {
        name: '点球游戏',
        path: '/threejs/penaltyGame',
        component: () => import('@/views/threejs/PenaltyGame.vue')
      },
      {
        name: '卡通机器人',
        path: '/threejs/cartoonRobot',
        component: () => import('@/views/threejs/CartoonRobot.vue')
      }
    ]
  },
  {
    name: 'Cesium',
    path: '/cesium',
    children: [
      {
        name: 'HelloCesium',
        path: '/cesium/helloCesium',
        component: () => import('@/views/HelloCesium.vue')
      }
    ]
  }
]
