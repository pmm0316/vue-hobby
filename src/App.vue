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

const canvasContainer: any = ref(null)
onMounted(() => {
  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(
    0.75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  camera.position.set(1.5, 1, 1.5)
  camera.aspect = window.innerWidth / window.innerHeight
  // 更新相机的投影矩阵
  camera.updateProjectionMatrix()

  const loader = new THREE.TextureLoader()
  const texture = loader.load('./images/050.jpg')
  // texture.mapping = THREE.EquirectangularRefractionMapping
  scene.background = texture
  scene.environment = texture

  // 添加环境光
  const ambient = new THREE.AmbientLight(0xffffff, 1)
  scene.add(ambient)

  // 加载小熊模型
  const gltfLoader = new GLTFLoader()
  gltfLoader.load('./model/bear.gltf', (gltf) => {
    const model: any = gltf.scene
    model.material = new THREE.MeshPhongMaterial({
      color: '0xffffff',
      envMap: texture,
      refractionRatio: 0.7,
      reflectivity: 0.99
    })
    model.scale.set(0.02, 0.02, 0.02)
    scene.add(model)
  })

  // 初始化渲染器
  const renderer = new THREE.WebGLRenderer({
    antialias: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  })
  // 将渲染器添加到页面
  console.log('ss', canvasContainer.value)
  canvasContainer.value?.appendChild(renderer.domElement)

  // 添加控制器
  const controls = new OrbitControls(camera, renderer.domElement)
  // 设置控制器阻尼
  controls.enableDamping = true

  // 渲染函数
  function render() {
    // 更新控制器
    controls.update()
    // 渲染场景
    renderer.render(scene, camera)
    // 循环渲染
    requestAnimationFrame(render)
  }
  render()
})
</script>

<template>
  <div class="canvasContainer" ref="canvasContainer"></div>
</template>

<style scoped></style>
