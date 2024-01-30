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

let container = ref<any>(null)
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let orbitControls: OrbitControls

const doors: any[] = []

// 车身材质
const bodyMaterial = new THREE.MeshPhysicalMaterial({
  color: 'red',
  metalness: 1,
  roughness: 0.5,
  clearcoat: 1,
  clearcoatRoughness: 0.03
})

// 玻璃材质
const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: '#793e3e',
  metalness: 0.25,
  roughness: 0,
  transmission: 1 // 透光性
})

// 初始化场景
const initScene = () => {
  scene = new THREE.Scene()
}

// 初始化相机
const initCamera = () => {
  camera = new THREE.PerspectiveCamera(45, (innerWidth - 200) / innerHeight, 0.1, 1000)
  camera.position.set(4.25, 1.4, -4.5)
}

// 初始化渲染器
const initRenderer = () => {
  renderer = new THREE.WebGLRenderer({
    antialias: true
  })
  renderer.setSize(innerWidth - 200, innerHeight)
  if (container.value) {
    container.value.appendChild(renderer.domElement)
  }
}
// 初始化坐标轴
const initAxesHelper = () => {
  // 创建一个三维坐标轴
  const axesHelper = new THREE.AxesHelper(3)
  scene?.add(axesHelper)
}

// 初始化轨道控制器
const initOrbitControls = () => {
  if (camera && renderer) {
    orbitControls = new OrbitControls(camera, renderer.domElement)
    orbitControls.enableDamping = true

    orbitControls.maxDistance = 9 // 最大
    orbitControls.minDistance = 1 // 最小
    orbitControls.minPolarAngle = 0
    orbitControls.maxPolarAngle = (80 / 360) * 2 * Math.PI
  }
}

const init = () => {
  initScene()
  initCamera()
  initRenderer()
  initAxesHelper()
  initOrbitControls()
  // initGridHelper()
  loadCarModel()
  initAmbientLight()
  initFloor()
  initSpotLight()
  initCylinder()
  initGUI()
}

const render = (time?: number | undefined) => {
  if (scene && camera) {
    renderer?.render(scene, camera)
  }
  orbitControls.update()
  TWEEN.update(time)
  requestAnimationFrame(render)
}

const resizeView = () => {
  window.addEventListener('resize', () => {
    if (camera) {
      camera.aspect = (window.innerWidth - 200) / window.innerHeight
      camera.updateProjectionMatrix()
    }
    renderer?.setSize(window.innerWidth - 200, window.innerHeight)
  })
}

const initGridHelper = () => {
  const grid = new THREE.GridHelper(20, 40, 'red', 0xffffff)
  grid.material.opacity = 0.2
  grid.material.transparent = true
  scene?.add(grid)
}

const loadCarModel = () => {
  const glftLoader = new GLTFLoader()
  glftLoader.load('./models/Lamborghini.glb', (glft) => {
    const model = glft.scene
    model.rotation.y = Math.PI
    model.traverse((obj: any) => {
      if (['Object_103', 'Object_64', 'Object_77'].includes(obj.name)) {
        obj.material = bodyMaterial
      } else if (['Object_90'].includes(obj.name)) {
        obj.material = glassMaterial
      } else if (['Empty001_16', 'Empty002_20'].includes(obj.name)) {
        console.log('obj', obj)
        doors.push(obj)
      }
    })
    scene?.add(model)
  })
}

const initAmbientLight = () => {
  const light = new THREE.AmbientLight('#ffffff', 0.5)
  scene?.add(light)
}

const initFloor = () => {
  const planeGeometry = new THREE.PlaneGeometry(20, 20)
  const material = new THREE.MeshPhysicalMaterial({
    side: THREE.DoubleSide,
    color: 0x808080,
    metalness: 0,
    roughness: 0.1
  })
  const mesh = new THREE.Mesh(planeGeometry, material)
  mesh.rotation.x = Math.PI / 2
  scene?.add(mesh)
}

const initSpotLight = () => {
  const spotLight = new THREE.SpotLight('#ffffff', 100)
  spotLight.angle = Math.PI / 8 // 散射角度，跟水平线的夹角
  spotLight.penumbra = 0.2 //横向：聚光锥的半影衰减百分比
  spotLight.decay = 2 // 纵向：沿着光照距离的衰减量
  spotLight.distance = 30
  spotLight.shadow.radius = 10
  // 阴影映射宽度，阴影映射高度
  spotLight.shadow.mapSize.set(4096, 4096)
  spotLight.position.set(-5, 10, 1)
  // 光照射的方向
  spotLight.target.position.set(0, 0, 0)
  spotLight.castShadow = true
  scene?.add(spotLight)
}

const initCylinder = () => {
  const cylinderGeometry = new THREE.CylinderGeometry(12, 12, 20, 32)
  const material = new THREE.MeshPhysicalMaterial({
    color: 0x6c6c6c,
    side: THREE.DoubleSide
  })
  const mesh = new THREE.Mesh(cylinderGeometry, material)
  scene?.add(mesh)
}

const initGUI = () => {
  const obj = {
    bodyColor: '#6e2121',
    glassColor: '#aaa',
    carRightOpen: false,
    carLeftOpen: false,
    carIn: false
  }
  const gui = new GUI()
  gui
    .addColor(obj, 'bodyColor')
    .name('车身颜色')
    .onChange((value) => {
      bodyMaterial.color.set(value)
    })
  gui
    .addColor(obj, 'glassColor')
    .name('玻璃颜色')
    .onChange((value) => {
      glassMaterial.color.set(value)
    })
  gui
    .add(obj, 'carRightOpen')
    .name('打开右车门')
    .onChange((value) => {
      console.log('carOpen', value)
      if (value) {
        setAnimationDoor({ x: 0 }, { x: Math.PI / 3 }, doors[1])
      } else {
        setAnimationDoor({ x: Math.PI / 3 }, { x: 0 }, doors[1])
      }
    })
  gui
    .add(obj, 'carLeftOpen')
    .name('打开左车门')
    .onChange((value) => {
      console.log('carLeftOpen', value)
      if (value) {
        setAnimationDoor({ x: 0 }, { x: Math.PI / 3 }, doors[0])
      } else {
        // carClose()
        setAnimationDoor({ x: Math.PI / 3 }, { x: 0 }, doors[0])
      }
    })

  gui
    .add(obj, 'carIn')
    .name('车内视角')
    .onChange((value) => {
      if (value) {
        setAnimationCamera(
          { cx: 4.25, cy: 1.4, cz: -4.5, ox: 0, oy: 0.5, oz: 0 },
          { cx: -0.27, cy: 0.83, cz: 0.6, ox: 0, oy: 0.5, oz: -3 }
        )
      } else {
        setAnimationCamera(
          { cx: -0.27, cy: 0.83, cz: 0.6, ox: 0, oy: 0.5, oz: -3 },
          { cx: 4.25, cy: 1.4, cz: -4.5, ox: 0, oy: 0.5, oz: 0 }
        )
      }
    })
}

const setAnimationDoor = (start: { x: number }, end: { x: number }, mesh: any) => {
  const tween = new TWEEN.Tween(start).to(end, 1000).easing(TWEEN.Easing.Quadratic.Out)
  tween.onUpdate((that) => {
    mesh.rotation.x = that.x
  })
  tween.start()
}

function setAnimationCamera(start: any, end: { [x: string]: any }) {
  const tween = new TWEEN.Tween(start).to(end, 3000).easing(TWEEN.Easing.Quadratic.Out)
  tween.onUpdate((that) => {
    //  camera.postition  和 controls.target 一起使用
    camera?.position.set(that.cx, that.cy, that.cz)
    orbitControls.target.set(that.ox, that.oy, that.oz)
  })
  tween.start()
}

onMounted(() => {
  init()
  render()
  resizeView()
})
</script>

<template>
  <div class="container" ref="container"></div>
</template>

<style scoped></style>
