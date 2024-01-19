<template>
  <div ref="container" class="container"></div>
</template>
<script setup lang="ts">
import * as THREE from 'three'
import { ref, onMounted } from 'vue'

const container = ref<any>(null)
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
pointLight.position.set(400, 0, 0)
scene.add(pointLight)

// 创建一个三维坐标轴
const axesHelper = new THREE.AxesHelper(100)
scene.add(axesHelper)

const width = 800

const height = 500

const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 3000)
camera.position.set(200, 200, 200)
camera.lookAt(0, 0, 0)

// 创建一个WebGL渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height) // canvas画布宽高比
renderer.render(scene, camera)

onMounted(() => {
  if (!container.value) return
  container.value.appendChild(renderer.domElement)
})
</script>

<style scoped>
.tsContainer {
  height: calc(100vh - 40px);
}
</style>
