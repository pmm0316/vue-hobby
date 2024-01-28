<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MeshGouraudMaterial } from 'three/examples/jsm/Addons.js'

const api = { state: 'Walking' }
const states = ['Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing']
// const statesName = ['Idle', '走路', '奔跑', '跳舞', '死亡', 'Sitting', 'Standing']
let stats, gui: any, mixer: any, actions: any, activeAction: any, previousAction
const container = ref()
const scene = new THREE.Scene()
// 设置场景背景色
scene.background = new THREE.Color(0xe0e0e0)
scene.fog = new THREE.Fog(0xe0e0e0, 20, 100)

const camera = new THREE.PerspectiveCamera(
  45,
  (window.innerWidth - 200) / window.innerHeight,
  0.25,
  100
)
camera.position.set(-5, 3, 10)
camera.lookAt(0, 2, 0)

// 设置lights
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3)
hemiLight.position.set(0, 20, 0)
scene.add(hemiLight)

const dirLight = new THREE.DirectionalLight(0xffffff, 3)
dirLight.position.set(0, 20, 10)
scene.add(dirLight)

// 设置mesh
const mesh = new THREE.Mesh(
  new THREE.PlaneGeometry(2000, 2000),
  new THREE.MeshPhongMaterial({ color: 0xcbcbcb, depthWrite: false })
)
mesh.rotation.x = -Math.PI / 2
scene.add(mesh)

const grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000)
grid.material.opacity = 0.2
grid.material.transparent = true
scene.add(grid)

// model

const renderer = new THREE.WebGLRenderer({
  antialias: true
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth - 200, window.innerHeight)

const clock = new THREE.Clock()
function animate() {
  const dt = clock.getDelta()
  if (mixer) mixer.update(dt)
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

function createGUI(model: any, animations: any[]) {
  
  gui = new GUI()

  mixer = new THREE.AnimationMixer(model)
  actions = {}

  for (let i = 0; i < animations.length; i++) {
    const clip = animations[i]
    const action = mixer.clipAction(clip)
    actions[clip.name] = action

    // if (emotes.indexOf(clip.name) >= 0 || states.indexOf(clip.name) >= 4) {
    //   action.clampWhenFinished = true
    //   action.loop = THREE.LoopOnce
    // }
  }
  const statesFolder = gui.addFolder('状态')
  const clipCtrl = statesFolder.add(api, 'state').options(states)
  clipCtrl.onChange(function () {
    console.log('api', api)

    fadeToAction(api.state, 0.5)
  })
  statesFolder.open()
  activeAction = actions['Walking']
  console.log('actions', actions)
  activeAction.play()
}

function fadeToAction(name: string | number, duration: any) {
  previousAction = activeAction
  activeAction = actions[name]

  if (previousAction !== activeAction) {
    previousAction.fadeOut(duration)
  }
  activeAction.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(duration).play()
}

onMounted(() => {
  container.value.appendChild(renderer.domElement)
  const loader = new GLTFLoader()
  loader.load('./models/RobotExpressive.glb', function (gltf) {
    const model = gltf.scene
    // console.log('model', model)
    scene.add(model)
    createGUI(model, gltf.animations)
  })
  animate()
})
onUnmounted(() => {
  gui.hide()
})
</script>
<template>
  <div ref="container"></div>
</template>

<style scoped></style>
