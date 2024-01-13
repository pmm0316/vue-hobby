<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container" ref="container"></div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
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
camera.position.set(0, 0, 0.1)
// camera.updateProjectionMatrix()
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
const container = ref<any>(null)

function render() {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
// 添加立方体
const boxGeometry = new THREE.BoxGeometry(10, 10, 10)

const arr = ['4_l', '4_r', '4_u', '4_d', '4_b', '4_f']
const boxMaterials: THREE.MeshBasicMaterial[] | undefined = []

arr.forEach((item) => {
  const texture = new THREE.TextureLoader().load(`./kanfang/living/${item}.jpg`)
  if (['4_u', '4_d'].includes(item)) {
    texture.center = new THREE.Vector2(0.5, 0.5)
    texture.rotation = Math.PI
  }
  boxMaterials.push(
    new THREE.MeshBasicMaterial({
      map: texture
    })
  )
})
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterials)
boxMesh.geometry.scale(1, 1, -1)
scene.add(boxMesh)

onMounted(() => {
  if (!container.value) return
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  container.value.appendChild(renderer.domElement)
  render()
})
</script>

<style scoped></style>
