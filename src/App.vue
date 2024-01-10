<script setup lang="ts">
import { onMounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

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

  // 创建几何体
  const geometry = new THREE.BufferGeometry()
  // 创建顶点数据
  const vertices = new Float32Array([
    -1.0,
    -1.0,
    0, // v0
    1.0,
    -1.0,
    0, // v1
    1.0,
    1.0,
    0, // v2

    -1.0,
    1.0,
    0 // v3
    // -1.0,
    // 1.0,
    // 0, // v4
    // -1.0,
    // -1.0,
    // 0 // v5
  ])
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

  // 创建索引
  const indices = new Uint16Array([0, 1, 2, 2, 3, 0])
  geometry.setIndex(new THREE.BufferAttribute(indices, 1))

  // 设置2个顶点组，形成2个材质
  geometry.addGroup(0, 3, 0)
  geometry.addGroup(3, 3, 1)

  const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
  const material2 = new THREE.MeshBasicMaterial({ color: 0xff0000 })
  const mesh = new THREE.Mesh(geometry, [material, material2])
  console.log('geometry', geometry)
  scene.add(mesh)

  // 创建一个立方体
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
  const cubeMaterial1 = new THREE.MeshBasicMaterial({ color: 0xff0000 })
  const cubeMaterial2 = new THREE.MeshBasicMaterial({ color: 0x0ff000 })
  const cubeMaterial3 = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const cubeMaterial4 = new THREE.MeshBasicMaterial({ color: 0x000ff0 })
  const cubeMaterial5 = new THREE.MeshBasicMaterial({ color: 0x0000ff })
  const cubeMaterial6 = new THREE.MeshBasicMaterial({ color: 0xff0f60 })
  const cube = new THREE.Mesh(cubeGeometry, [
    cubeMaterial1,
    cubeMaterial2,
    cubeMaterial3,
    cubeMaterial4,
    cubeMaterial5,
    cubeMaterial6
  ])
  cube.position.x = 2
  scene.add(cube)

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

  const eventObj = {
    Fullscreen: () => {
      // 全屏
      document.body.requestFullscreen()
    },
    ExitFullscreen: () => {
      // 退出全屏
      document.exitFullscreen()
    }
  }
  const gui = new GUI()
  // 添加按钮
  gui.add(eventObj, 'Fullscreen').name('全屏')
  gui.add(eventObj, 'ExitFullscreen').name('退出全屏')
  // const folder = gui.addFolder('立方体位置')
})
</script>

<template>
  <div></div>
</template>

<style scoped></style>
