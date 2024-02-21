type MenuType = {
  name: string
  path: string
  children?: MenuType[]
}

export const menuList: MenuType[] = [
  {
    name: '首页',
    path: '/home'
  },
  {
    name: 'Echarts',
    path: '/echarts',
    children: [
      {
        name: '基础图表',
        path: '/echarts/basicChart'
      },
      {
        name: '浙江地图',
        path: '/echarts/zjMap'
      }
    ]
  },
  {
    name: '高德地图',
    path: '/gaode',
    children: [
      {
        name: '基础地图',
        path: '/gaode/basicMap'
      }
    ]
  },
  {
    name: 'Threejs',
    path: '/threejs',
    children: [
      {
        name: 'BoxGeometry',
        path: '/threejs/boxGeometry'
      },
      {
        name: 'BufferGeometry',
        path: '/threejs/bufferGeometry'
      },
      {
        name: '汽车展厅',
        path: '/threejs/carShowroom'
      },
      {
        name: '点球游戏',
        path: '/threejs/penaltyGame'
      },
      {
        name: '卡通机器人',
        path: '/threejs/cartoonRobot'
      }
    ]
  },
  {
    name: 'Cesium',
    path: '/cesium',
    children: [
      {
        name: 'HelloCesium',
        path: '/cesium/helloCesium'
      }
    ]
  },
  {
    name: 'Vue',
    path: '/vue',
    children: [
      {
        name: '测试页面',
        path: '/vue/testPage'
      }
    ]
  }
]
