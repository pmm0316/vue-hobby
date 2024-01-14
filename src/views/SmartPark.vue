<template>
  <div class="container" ref="container"></div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
//   import {} from ''
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import * as TWEEN from 'three/examples/jsm/libs/tween.module.js'
import { Water } from 'three/examples/jsm/objects/Water2.js'

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// 设置相机的位置
camera.position.set(0, 20, 30)
// camera.updateProjectionMatrix()
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
// 创建坐标轴
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
const container = ref<any>(null)
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
function render() {
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
render()
onMounted(() => {
  if (!container.value) return

  container.value.appendChild(renderer.domElement)
})
</script>

<style scoped></style>
