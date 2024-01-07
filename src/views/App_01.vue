<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'

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
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffff00
})
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
// 将物体添加到场景中
scene.add(cube)

// 修改物体的位置
// cube.position.set(5, 0, 0)
// cube.position.x = 2
// 缩放
// cube.scale.set(3, 2, 1)
// 旋转
// cube.rotation.set(Math.PI / 4, 0, 0)

console.log(cube)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染的尺寸大小
renderer.setSize(innerWidth, innerHeight)
// 将webgl旋绕的canvaas内容添加到body中
document.body.appendChild(renderer.domElement)


// 创建轨道控制器
const controls = new OrbitControls( camera, renderer.domElement );
// 设置阻尼感
controls.enableDamping = true

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)

scene.add(axesHelper)

// 设置时钟
const clock = new THREE.Clock()

// 设置动画
const animate = gsap.to(cube.position, {
  x: 5,
  duration: 5,
  // 设置重复的次数
  repeat: 2,
  // 往返运动
  yoyo: true,
  // 延迟2s运动
  delay: 2,
  onComplete: () => {
    console.log('动画完成')
  },
  onStart: () => {
    console.log('动画开始')
  }
})
gsap.to(cube.rotation, {
  x: 2 * Math.PI,
  duration: 5
})

// 监听双击
window.addEventListener("dblclick", () => {
  if (animate.isActive()) {
    // 暂停
    animate.pause();
  } else {
    // 恢复
    animate.resume();
  }
})

// 设置
function render() {
  // 设置阻尼感后，需要调用update方法
  controls.update()
  // 使用渲染器，通过相机将场景渲染进来
  renderer.render(scene, camera)
  // 渲染下一帧的时候就会调用render函数
  requestAnimationFrame( render )
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

<template><div></div></template>