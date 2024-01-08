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
const { innerWidth, innerHeight, devicePixelRatio } = window
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
//设置相机位置 x y z轴坐标
camera.position.set(0, 0, 10)
// 把相机添加到场景中
scene.add(camera)
// 添加物体
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffff00
})
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
// 将物体添加到场景中
scene.add(cube)

// 创建GUI
const gui = new dat.GUI()
gui
  .add(cube.position, 'x')
  .min(0)
  .max(5) // 最大值
  .step(0.1) // 步长
  .name('移动x坐标')
  .onChange((value) => {
    console.log('onChange', value)
  })
  .onFinishChange((value) => {
    console.log('onFinishChange', value)
  })
//修改物体的颜色
const params = {
  color: '#ffff00',
  fn: () => {
    // 让立方体运行起来
    gsap.to(cube.position, { x: 5, duration: 2, yoyo: true, repeat: -1 })
  }
}
// 设置颜色
gui.addColor(params, 'color').onChange((value) => {
  console.log('onChange-color', value)
  cube.material.color.set(value)
})

// 设置按钮点击 触发某个事件
gui.add(params, 'fn').name('立方体运动')
// 增加文件夹
const folder = gui.addFolder('设置立方体')
folder.add(cube.material, 'wireframe')
// 设置选项框
folder.add(cube, 'visible').name('是否显示')
console.log(cube)

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

// 设置时钟
const clock = new THREE.Clock()

gsap.to(cube.rotation, {
  x: 2 * Math.PI,
  duration: 5
})

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

// 监听=画面变化，更新渲染画面
window.addEventListener('resize', () => {
  // 更新摄像头
  camera.aspect = innerWidth / innerHeight
  // 更新摄像头的投影矩阵
  camera.updateProjectionMatrix()
  // 更新渲染器
  renderer.setSize(innerWidth, innerHeight)
  // 设置渲染器的像素比
  renderer.setPixelRatio(devicePixelRatio)
})
</script>

<template>
  <div></div>
</template>

<style scoped></style>
