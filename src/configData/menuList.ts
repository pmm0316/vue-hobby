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
        name: '宝马',
        path: '/threejs/bmwCar'
      },
      {
        name: '点球游戏',
        path: '/threejs/penaltyGame'
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
  }
]
