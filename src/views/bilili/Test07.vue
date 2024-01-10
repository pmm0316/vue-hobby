<script setup lang="ts">
  import { onMounted } from 'vue'
  import * as THREE from 'three'
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
  import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
  import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
  import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
  import * as TWEEN from 'three/examples/jsm/libs/tween.module.js'
  
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
  
    camera.position.z = 15
    camera.position.x = 2
    camera.position.y = 2
    camera.lookAt(0, 0, 0)
  
    // 创建轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement)
    // 设置阻尼惯性
    controls.enableDamping = true
  
    // 创建坐标轴
    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper)
  
    const sphere1 = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0x00ff00
      })
    )
    sphere1.position.x = -4
    scene.add(sphere1)
    const tween = new TWEEN.Tween(sphere1.position)
    tween.to({ x: 4}, 1000)
    // 设置循环多次
    // tween.repeat(100)
    // 设置缓动 函数
    // tween.easing(TWEEN.Easing.Quadratic.InOut)
    const tween2 = new TWEEN.Tween(sphere1.position)
    tween2.to({ y: -4 }, 1000)
    tween.chain(tween2)
  
    // 启动补间动画
    tween.start()
  
    function animate() {
      requestAnimationFrame(animate)
      // cube.rotation.x += 0.01
      // cube.rotation.y += 0.01
      controls.update()
      // 渲染
      renderer.render(scene, camera)
  
      // 更新
      // tween.update()
      tween2.update()
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
  
    // const gui = new GUI()
  })
  </script>
  
  <template>
    <div></div>
  </template>
  
  <style scoped></style>
  