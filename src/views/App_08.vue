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

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  wireframe: true // 边框
})
const redMaterial = new THREE.MeshBasicMaterial({
  color: '#ff0000'
})

const cubeArr: THREE.Object3D<THREE.Object3DEventMap>[] = []
for (let i = -5; i < 5; i++) {
  for (let j = -5; j < 5; j++) {
    for (let z = -5; z < 5; z++) {
      const cube = new THREE.Mesh(geometry, material)
      cube.position.set(i, j, z)
      scene.add(cube)
      cubeArr.push(cube)
    }
  }
}

// 创建投射光线对象
const raycaster = new THREE.Raycaster()

// 鼠标的位置对象
const pointer = new THREE.Vector2()

// 监听鼠标的位置
window.addEventListener('mousemove', (event) => {
  console.log('event', event)
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
  raycaster.setFromCamera(pointer, camera)
  const result: any[] = raycaster.intersectObjects(cubeArr)
  console.log(result)
  result.forEach((item: { object: { material: THREE.MeshBasicMaterial } }) => {
    item.object.material = redMaterial
  })
})

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
