export const menuList = [
  {
    name: '首页',
    url: '/home'
  },
  {
    name: 'Echarts',
    url: '/echarts',
    children: [
      {
        name: '基础图表',
        url: '/echarts/basicChart'
      },
      {
        name: '浙江地图',
        url: '/echarts/zjMap'
      },
    ]
  },
  {
    name: '高德地图',
    url: '/gaode',
    children: [
      {
        name: '基础地图',
        url: '/gaode/basicMap'
      },
    ]
  },
  {
    name: 'Threejs',
    url: '/threejs',
    children: [
      {
        name: 'BoxGeometry',
        url: '/threejs/boxGeometry'
      },
      {
        name: 'BufferGeometry',
        url: '/threejs/bufferGeometry'
      },
    ]
  },
  {
    name: 'Cesium',
    url: '/cesium',
    children: [
      {
        name: 'HelloCesium',
        url: '/cesium/helloCesium'
      }
    ]
  }
]