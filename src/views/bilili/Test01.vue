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
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const pMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('rgb(255, 0, 0)') })
    // 创建网格
    const cube = new THREE.Mesh(geometry, material)
    const pcube = new THREE.Mesh(geometry, pMaterial)
    // 设置放大
    cube.scale.set(2, 2, 2)
    // 设置旋转
    cube.rotation.x = Math.PI / 4
  
    cube.position.set(0, 0, 0)
    pcube.position.set(-3, 0, 0)
  
    // 没有显示出cube，可能版本问题，方法变了
    // pcube.add(cube)
    scene.add(pcube)
    scene.add(cube)
    console.log('pcube', pcube)
  
    camera.position.z = 5
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
      },
    }
    const gui = new GUI()
    // 添加按钮
    gui.add(eventObj, 'Fullscreen').name('全屏')
    gui.add(eventObj, 'ExitFullscreen').name('退出全屏')
    const folder = gui.addFolder('立方体位置')
    // 控制立方体位置
    folder.add(cube.position, "x").min(-10).max(10).step(1).name('立方体x轴位置')
    folder.add(cube.position, "y").min(-10).max(10).step(1).name('立方体y轴位置')
    folder.add(cube.position, "z").min(-10).max(10).step(1).name('立方体z轴位置')
    gui.add(pMaterial, 'wireframe').name('父元素的线框模式')
  })
  </script>
  
  <template>
    <div></div>
  </template>
  
  <style scoped></style>
  