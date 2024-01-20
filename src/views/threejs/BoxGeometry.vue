<template>
  <div ref="container" class="container"></div>
</template>
<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// 引入性能监视器
import Stats from 'three/addons/libs/stats.module.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { ref, onMounted, onUnmounted } from 'vue'

const container = ref<any>(null)
const menuWidth = 200
const scene = new THREE.Scene()
const gui = new GUI()
gui.domElement.style.right = '0px'
const boxGeometry = new THREE.BoxGeometry(20, 20, 20)
const material = new THREE.MeshLambertMaterial({
  color: 0xff0000
})
const mesh = new THREE.Mesh(boxGeometry, material)
// mesh.position.set(0, 10, 0)
scene.add(mesh)

// 设置光源
const pointLight = new THREE.PointLight(0xffffff, 1.0)
pointLight.decay = 0 // 不随距离衰减
pointLight.position.set(400, 700, 100)
// scene.add(pointLight)

// 可视化光源
const pointLightHelper = new THREE.PointLightHelper(pointLight, 10)
scene.add(pointLightHelper)

// 添加一个环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const guiObj = {
  x: 0,
  y: 0,
  z: 0,
  color: '#00FFFF',
  scale: 0,
  bool: false
}

const materialFolder = gui.addFolder('材质')
const positionFolder = gui.addFolder('位置')

gui.add(ambientLight, 'intensity', 0, 2).step(0.1).name('光照强度')
positionFolder.add(guiObj, 'x', 0, 100).onChange((value) => {
  mesh.position.x = value
})
positionFolder
  .add(guiObj, 'y', 0, 100)
  .name('y')
  .onChange((value) => {
    mesh.position.y = value
  })
positionFolder
  .add(guiObj, 'z', 0, 100)
  .name('y')
  .onChange((value) => {
    mesh.position.z = value
  })
materialFolder
  .addColor(guiObj, 'color')
  .name('颜色')
  .onChange((value) => {
    mesh.material.color.set(value)
  })

gui.add(guiObj, 'bool').onChange((value) => {
  console.log(value)
})

// 添加一个平行光

// 创建一个三维坐标轴
const axesHelper = new THREE.AxesHelper(100)
scene.add(axesHelper)

const width = window.innerWidth - menuWidth

const height = window.innerHeight

const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 3000)
camera.position.set(200, 200, 200)
camera.lookAt(0, 0, 0)

// 创建一个WebGL渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true
})
renderer.setPixelRatio(window.devicePixelRatio)
console.log('width', width)
console.log('height', height)
renderer.setSize(width, height) // canvas画布宽高比
renderer.render(scene, camera)
// 设置背景色
renderer.setClearColor('#000', 0.9)

// 创建相机轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)

// 创建性能监测
const stats = new Stats()
// const clock = new THREE.Clock()

onMounted(() => {
  if (!container.value) return
  container.value.appendChild(renderer.domElement)

  // statsWrapper.value.appendChild(stats.dom)
  controls.addEventListener('change', () => {
    renderer.render(scene, camera)
  })
  function render() {
    // const delta = clock.getDelta() * 1000 //毫秒
    // console.log('delta', delta)
    stats.update()
    // mesh.rotateY(0.01)
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }

  render()
  window.onresize = function () {
    const changeWidth = window.innerWidth - menuWidth
    camera.aspect = changeWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(changeWidth, window.innerHeight)
  }
})
onUnmounted(() => {
  // 隐藏gui
  gui.hide()
})
</script>

<style scoped></style>
