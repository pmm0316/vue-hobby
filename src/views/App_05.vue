<script setup lang="ts">
import * as THREE from 'three'
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 创建一个场景
const scene = new THREE.Scene()
// 创建一个相机
const { innerWidth, innerHeight } = window
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
//设置相机位置 x y z轴坐标
camera.position.set(0, 0, 10)
// 把相机添加到场景中
scene.add(camera)

// 导入纹理
const texture = new THREE.TextureLoader().load('./images/texture01.png')
console.log(texture)

// 添加物体
// 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1)
// 材质
const basicMaterial = new THREE.MeshBasicMaterial({
  color: '#ffff00',
  map: texture,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.5,
})
const cube = new THREE.Mesh(geometry, basicMaterial)
scene.add(cube)

// 添加平面
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  basicMaterial
)
plane.position.set(3, 0, 0)
scene.add(plane)

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
