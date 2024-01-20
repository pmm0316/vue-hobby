<template>
  <div ref="container" class="container"></div>
</template>
<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { ref, onMounted, onUnmounted } from 'vue'

const container = ref<any>(null)
const menuWidth = 200
const width = window.innerWidth - menuWidth

const height = window.innerHeight
const scene = new THREE.Scene()
const bufferGeomery = new THREE.BufferGeometry()
const vertices = new Float32Array([
  0,
  0,
  0, //顶点1坐标
  50,
  0,
  0, //顶点2坐标
  0,
  100,
  0, //顶点3坐标
  0,
  0,
  10, //顶点4坐标
  0,
  0,
  100, //顶点5坐标
  50,
  0,
  10 //顶点6坐标
])
const attribue = new THREE.BufferAttribute(vertices, 3)
bufferGeomery.attributes.position = attribue

const pointsMaterial = new THREE.PointsMaterial({
  color: 0xff0000,
  size: 10
})

// 线条材质
const lineMaterial = new THREE.LineBasicMaterial({
  color: 0xff0000,
})

const points = new THREE.Points(bufferGeomery, pointsMaterial)

const line = new THREE.Line(bufferGeomery, lineMaterial)

const lineLoop = new THREE.LineLoop(bufferGeomery, lineMaterial)

scene.add(points)
scene.add(lineLoop)

const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 3000)
camera.position.set(200, 200, 200)
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer()
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(width, height) // canvas画布宽高比
renderer.render(scene, camera)

// 创建相机轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)

// 创建一个三维坐标轴
const axesHelper = new THREE.AxesHelper(100)
scene.add(axesHelper)

onMounted(() => {
  if (!container.value) return
  container.value.appendChild(renderer.domElement)
 
  controls.addEventListener('change', () => {
    renderer.render(scene, camera)
  })
  function render() {
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
</script>

<style scoped></style>
