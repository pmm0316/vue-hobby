<template>
  <div class="container" ref="container"></div>
</template>
<script setup lang="ts">
// @ts-nocheck
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import gsap from "gsap";
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'

// @ts-ignore 导入场景
import scene from '@/threejs/smartPark/scene'
// @ts-ignore 导入相机
import cameraModule from '@/threejs/smartPark/camera'

// @ts-ignore 导入物体函数
import createMesh from '@/threejs/smartPark/createMesh'

// @ts-ignore 导入渲染器
import renderer from '@/threejs/smartPark/renderer'

// @ts-ignore 导入动画
import animate from '@/threejs/smartPark/animate'

// 创建坐标轴
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
const container = ref<any>(null)
const controls = new OrbitControls(cameraModule.activeCamera, renderer.domElement)
controls.enableDamping = true
createMesh()
onMounted(() => {
  if (!container.value) return

  container.value.appendChild(renderer.domElement)
  animate()
})
</script>

<style scoped></style>
