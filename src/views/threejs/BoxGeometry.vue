<template>
  <div ref="container" class="container"></div>
</template>
<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { ref, onMounted } from 'vue'

const container = ref<any>(null)
const menuWidth = 200
const scene = new THREE.Scene()
const boxGeometry = new THREE.BoxGeometry(50, 50, 50)
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
const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height) // canvas画布宽高比
renderer.render(scene, camera)

// 创建相机轨道控制器
// const controls = new OrbitControls(camera, renderer.domElement)

// const clock = new THREE.Clock()
function render() {
  // const delta = clock.getDelta() * 1000 //毫秒
  // console.log('delta', delta)

  mesh.rotateY(0.01)
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

onMounted(() => {
  if (!container.value) return
  container.value.appendChild(renderer.domElement)
  // controls.addEventListener("change", () => {
  //   renderer.render(scene, camera)
  // })
  render()
  window.onresize = function () {
    console.log('1')
    const changeWidth = window.innerWidth - menuWidth
    camera.aspect = changeWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(changeWidth, window.innerHeight)
  }
})
</script>

<style scoped>
.tsContainer {
  height: calc(100vh - 40px);
}
</style>
