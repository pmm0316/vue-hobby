<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as CANNON from 'cannon-es'
// import { type BodyType } from 'cannon-es'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { Body } from 'cannon-es'
import gsap from 'gsap'

const container = ref()
// 初始化场景
const scene = new THREE.Scene()

const width = window.innerWidth - 200
const height = window.innerHeight

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100)
camera.updateProjectionMatrix()
// 设置相机位置
camera.position.set(4, 2, 0)

const renderer = new THREE.WebGLRenderer({
  // 抗锯齿
  antialias: true,
  // 使用对数缓存
  logarithmicDepthBuffer: true
})

renderer.setSize(width, height)
// 设置色调映射
renderer.toneMapping = THREE.ACESFilmicToneMapping
// 色调映射曝光
renderer.toneMappingExposure = 0.5
// 设置阴影
renderer.shadowMap.enabled = true
// 设置阴影类型
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// 初始化控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
// 设置顶部转动的最大角度
controls.maxAzimuthAngle = Math.PI
// 设置底部转动的最小角度
controls.maxPolarAngle = Math.PI / 2 - 0.1

// 加载纹理
const textureLoader = new THREE.TextureLoader()
textureLoader.load('./texture/outdoor.jpg', (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping
  // 设置环境纹理
  scene.background = texture
  scene.environment = texture
  // 设置背景模糊点
  scene.backgroundBlurriness = 0.2
})

// 添加聚光灯
const spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(10, 50, 0)
spotLight.castShadow = true
spotLight.shadow.mapSize.width = 2048
spotLight.shadow.mapSize.height = 2048
spotLight.shadow.camera.near = 0.5
spotLight.shadow.camera.far = 500
spotLight.shadow.camera.fov = 30
spotLight.shadow.bias = -0.00008
spotLight.intensity = 2
scene.add(spotLight)

// 创建物理世界
const world = new CANNON.World()
world.gravity.set(0, -9.82, 0)

let ball: THREE.Mesh, ballBody: Body

// 加载模型
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('./draco/')
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)
gltfLoader.load('./models/playground.glb', (gltf) => {
  const model = gltf.scene
  console.log('model', model)
  model.traverse((child: any) => {
    if (child.isMesh && child.name.search(/Solid/) === -1) {
      child.castShadow = true
      child.receiveShadow = true
      // trimesh类型
      const trimesh = new CANNON.Trimesh(
        child.geometry.attributes.position.array,
        child.geometry.index.array
      )
      // 创建刚体
      const trimeshBody = new CANNON.Body({
        mass: 0,
        shape: trimesh
      })
      //获取世界位置和旋转到物理世界
      trimeshBody.position.copy(child.getWorldPosition(new THREE.Vector3()))
      trimeshBody.quaternion.copy(child.getWorldQuaternion(new THREE.Quaternion()))
      // 添加刚体到物理世界
      world.addBody(trimeshBody)
    }
    if (child.name === 'Soccer_Ball') {
      ball = child
      // 创建球体
      const ballShape = new CANNON.Sphere(0.15)
      // 创建刚体
      ballBody = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, 35, 0),
        shape: ballShape
      })
      // 添加刚体到物理世界
      world.addBody(ballBody)
      setTimeout(() => {
        resetBall()
      }, 2000)
    }
    if (child.name === 'door') {
      child.material = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0
      })
    }
  })
  // 添加模型到场景
  scene.add(model)
})

let clock = new THREE.Clock()
function render() {
  let delta = clock.getDelta()
  world.step(delta)
  if (ball && ballBody) {
    // @ts-ignore
    ball.position.copy(ballBody.position)
    // @ts-ignore
    ball.quaternion.copy(ballBody.quaternion)
  }
  controls.update
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

function resetBall() {
  ballBody.position.set(0, 15, 0)
  ballBody.velocity.set(0, 0, 0)
  ballBody.angularVelocity.set(0, 0, 0)
}

let isClick = false
window.addEventListener('click', () => {
  if (isClick) return
  isClick = true
  ballBody.applyForce(new CANNON.Vec3(-100, 60, 8), ballBody.position)
  setTimeout(() => {
    isClick = false
    resetBall()
  }, 6000)
})

onMounted(() => {
  if (!container.value) return
  container.value.appendChild(renderer.domElement)
  render()
})
</script>
<template>
  <div ref="container" class="container"></div>
</template>

<style scoped></style>
