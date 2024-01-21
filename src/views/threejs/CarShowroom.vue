<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import * as TWEEN from 'three/examples/jsm/libs/tween.module.js'

const { innerHeight, innerWidth } = window

let canvasDom = ref<any>(null)
// 车身颜色
let carColor = ref<string>('#EF3507')
// 轮毂颜色
let wheelColor = ref<string>('#3735BA')

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
camera.position.set(0, 2, 4)

// 创建渲染器
const renderer = new THREE.WebGLRenderer({
  // 抗锯齿
  antialias: true
})
renderer.setSize(window.innerWidth - 200, window.innerHeight)

// 创建轨道控制器
let controls = new OrbitControls(camera, renderer.domElement)

function render() {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
  // cube.rotation.x += 0.01
  // cube.rotation.y += 0.01
  // controls.update()
  // 渲染
  controls && controls.update()
  // 更新
  // tween.update()
}

let wheels = []
let carBody, frontCar, hoodCar, glassCar

// 创建材质
const bodyMaterial = new THREE.MeshPhysicalMaterial({
  color: carColor.value,
  // 金属感
  metalness: 1,
  // 粗糙度
  roughness: 0.5,
  // 清漆
  clearcoat: 1,
  clearcoatRoughness: 0
})

const fontMaterial = new THREE.MeshPhysicalMaterial({
  color: carColor.value,
  // 金属感
  metalness: 1,
  // 粗糙度
  roughness: 0.5,
  // 清漆
  clearcoat: 1,
  clearcoatRoughness: 0
})

const hoodMaterial = new THREE.MeshPhysicalMaterial({
  color: carColor.value,
  // 金属感
  metalness: 1,
  // 粗糙度
  roughness: 0.5,
  // 清漆
  clearcoat: 1,
  clearcoatRoughness: 0
})

const wheelsMaterial = new THREE.MeshPhysicalMaterial({
  color: wheelColor.value,
  // 金属感
  metalness: 1,
  // 粗糙度
  roughness: 0.1
})

const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: '#FFFFFF',
  metalness: 0,
  // 粗糙度
  roughness: 0.01,
  // opacity: 1,
  transmission: 1,
  transparent: true
})

const materials: any[] = [
  { name: '磨砂', value: 1 },
  { name: '冰晶', value: 0 }
]

const selectMaterial = (item: any) => {
  bodyMaterial.clearcoatRoughness = item.value
  fontMaterial.clearcoatRoughness = item.value
  hoodMaterial.clearcoatRoughness = item.value
}

// 灯光定位数组
const lightPositionGroup: Array<number>[] = [
  [0, 0, 10],
  [0, 0, -10],
  [-10, 0, 0],
  [10, 0, 0],
  [0, 10, 0],
  [5, 10, 0],
  [0, 10, 5],
  [0, 10, -5],
  [-5, 10, 0]
]

onMounted(() => {
  if (!canvasDom.value) return
  // 将渲染器插入到dom中
  canvasDom?.value.appendChild(renderer.domElement)

  // 初始化渲染器，渲染背景
  renderer.setClearColor('#000')
  scene.background = new THREE.Color('#CCC')
  // scene.environment = new THREE.Color('#ccc')
  render()

  // 添加网格地面
  const gridHelper = new THREE.GridHelper(10, 10)
  gridHelper.material.opacity = 0.2
  gridHelper.material.transparent = true
  scene.add(gridHelper)

  // 添加汽车模型
  const loader = new GLTFLoader()
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('./draco/')
  loader.setDRACOLoader(dracoLoader)
  // D:\project\threejs-demo\public\model\bmw01.glb
  loader.load('./models/bmw.glb', (gltf) => {
    const bmw = gltf.scene
    console.log('gltf', gltf)
    bmw.traverse((child: any) => {
      if (child.isMesh) {
        // console.log(child.name)
      }
      if (child.isMesh) {
        // 判断是否是轮毂
        if (child.name.includes('轮毂')) {
          child.material = wheelsMaterial
          wheels.push(child)
        }
        // 判断是否是车身
        if (child.name.includes('Mesh002')) {
          child.material = bodyMaterial
          carBody = child
        }
        // 判断是否是前脸
        if (child.name.includes('前脸')) {
          child.material = fontMaterial
          frontCar = child
        }
        // 判断是否是引擎盖
        if (child.name.includes('引擎盖_1')) {
          child.material = hoodMaterial
          hoodCar = child
        }
        // 判断是否是挡风玻璃
        if (child.name.includes('挡风玻璃')) {
          child.material = glassMaterial
          hoodCar = child
        }
      }
    })
    scene.add(bmw)
  })
  // 添加灯光
  lightPositionGroup.forEach((item: number[]) => {
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(item[0], item[1], item[2])
    scene.add(light)
  })
})
watch(carColor, async (newColor) => {
  bodyMaterial.color.set(newColor)
  fontMaterial.color.set(newColor)
  hoodMaterial.color.set(newColor)
})
watch(wheelColor, async (newColor) => {
  console.log('newColor', newColor)
  wheelsMaterial.color.set(newColor)
})
</script>

<template>
  <div class="bmw-wrapper">
    <div class="canvas-container" ref="canvasDom"></div>
    <div class="action-wrapper">
      <el-space :size="15">
        <div>车身颜色 <el-color-picker v-model="carColor" /></div>
        <div>轮毂颜色 <el-color-picker v-model="wheelColor" /></div>
      </el-space>
    </div>
  </div>
</template>

<style scoped>
.action-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  padding: 8px 3px 8px 15px;
  display: flex;
  background: #000;
  color: #fff;
}
</style>
