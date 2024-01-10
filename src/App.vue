<script setup lang="ts">
import { onMounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

onMounted(() => {
  const { innerHeight, innerWidth } = window
  // 创建场景
  const scene = new THREE.Scene()
  // 创建相机
  const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)

  // 创建渲染器
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  camera.position.z = 5
  camera.position.x = 2
  camera.position.y = 2
  camera.lookAt(0, 0, 0)

  // 创建轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement)
  // 设置阻尼惯性
  controls.enableDamping = true

  // 创建坐标轴
  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)

  function animate() {
    requestAnimationFrame(animate)
    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01
    controls.update()
    // 渲染
    renderer.render(scene, camera)
  }
  animate()
  window.addEventListener('resize', () => {
    console.log('innerWidth', innerWidth)
    console.log('innerHeight', innerHeight)
    // 重置渲染器宽高比
    renderer.setSize(window.innerWidth, window.innerHeight)
    // 重置相机宽高比
    camera.aspect = window.innerWidth / window.innerHeight
    // 更新相机投影矩阵
    camera.updateProjectionMatrix()
  })

  const gui = new GUI()
  // 创建纹理加载器
  const textureLoader = new THREE.TextureLoader()

  // 加载纹理
  const texture = textureLoader.load('./texture/watercover/CityNewYork002_COL_VAR1_1K.png')

  // 加载ao贴图
  const aoMap = textureLoader.load('./texture/watercover/CityNewYork002_AO_1K.png')

  // 加载透明度贴图
  // public\texture\door\height.jpg
  const alphaMap = textureLoader.load('./texture/door/height.jpg')

  // 光照贴图
  const lightMap = textureLoader.load('./texture/colors.png')

  // 高光贴图 public\texture\watercover\CityNewYork002_GLOSS_1K.jpg
  const specularMap = textureLoader.load('./texture/watercover/CityNewYork002_GLOSS_1K.jpg')

  // 加载hdr贴图
  const rgbeLoader = new RGBELoader()
  rgbeLoader.load("./texture/Alex_Hart-Nature_Lab_Bones_2k.hdr", (envMap) => {
    // 设置球形贴图
    envMap.mapping = THREE.EquirectangularReflectionMapping
    // 设置环境贴图
    scene.background = envMap
    // 设置plane的环境贴图
    planeMaterial.envMap = envMap
  })

  const planeGeometry = new THREE.PlaneGeometry(1, 1)
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: texture,
    transparent: true,
    aoMap,
    aoMapIntensity: 0,
    // alphaMap,
    lightMap,
    specularMap,
  })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  scene.add(plane)
  gui.add(planeMaterial, 'aoMapIntensity').min(0).max(1).name('ao强度')
})
</script>

<template>
  <div></div>
</template>

<style scoped></style>
