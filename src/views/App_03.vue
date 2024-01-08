<script setup lang="ts">
import * as THREE from 'three'
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
// 导入图形用户界面库
import * as dat from 'dat.gui'

// 创建一个场景
const scene = new THREE.Scene()
// 创建一个相机
const { innerWidth, innerHeight } = window
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
//设置相机位置 x y z轴坐标
camera.position.set(0, 0, 10)
// 把相机添加到场景中
scene.add(camera)
// 添加物体
// 创建几何体
for (let i = 0; i < 50; i++) {
  const geometry = new THREE.BufferGeometry()
  const positionArray = new Float32Array(9)
  for (let j = 0; j < 9; j++) {
    positionArray[j] = Math.random() * 10 - 5
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
  console.log('positionArray', positionArray)
  const color = new THREE.Color(Math.random(), Math.random(), Math.random())
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.5
  })
  const mesh = new THREE.Mesh(geometry, material)
  console.log('mesh', mesh)
  scene.add(mesh)
}

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染的尺寸大小
renderer.setSize(innerWidth, innerHeight)
// 将webgl旋绕的canvaas内容添加到body中
document.body.appendChild(renderer.domElement)

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置阻尼感
controls.enableDamping = true

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)

scene.add(axesHelper)

// 监听双击
window.addEventListener('dblclick', () => {
  const fullScreenElement = document.fullscreenElement
  console.log('fullScreenElement', fullScreenElement)
  // 控制屏幕进入全屏，退出全屏
  if (fullScreenElement) {
    document.exitFullscreen()
  } else {
    renderer.domElement.requestFullscreen()
  }
})

// 设置
function render() {
  // 设置阻尼感后，需要调用update方法
  controls.update()
  // 使用渲染器，通过相机将场景渲染进来
  renderer.render(scene, camera)
  // 渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render)
}
render()
</script>

<template>
  <div></div>
</template>

<style scoped></style>
