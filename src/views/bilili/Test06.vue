<script setup lang="ts">
  import { onMounted } from 'vue'
  import * as THREE from 'three'
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
  import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
  import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
  import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
  
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
  
    const gui = new GUI()
    const sphere1 = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0x00ff00
      })
    )
    sphere1.position.x = -4
    scene.add(sphere1)
    const sphere2 = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0x0000ff
      })
    )
    scene.add(sphere2)
    const sphere3 = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0xff0000
      })
    )
    sphere3.position.x = 4
    scene.add(sphere3)
  
    // 创建射线
    const raycaster = new THREE.Raycaster()
    // 创建鼠标向量
    const mouse = new THREE.Vector2()
  
    // 监听click事件
    window.addEventListener('click', (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      console.log(mouse.x, mouse.y)
      // 通过摄像机和鼠标位置更新射线
      raycaster.setFromCamera(mouse, camera)
  
      // 计算物体和射线的焦点
      const intersects = raycaster.intersectObjects([sphere1, sphere2, sphere3])
      if (intersects.length > 0) {
        // @ts-ignore
        if (intersects[0].object['_isSelect']) {
          // @ts-ignore
          intersects[0].object['_isSelect'] = false
          // @ts-ignore
          intersects[0].object.material.color.set(intersects[0].object['_originColor'])
        } else {
          // @ts-ignore
          intersects[0].object['_originColor'] = intersects[0].object.material.color.getHex()
          // @ts-ignore
          intersects[0].object['_isSelect'] = true
          // @ts-ignore
          intersects[0].object.material.color.set(0xff0000)
        }
      }
      console.log('intersects', intersects)
    })
  })
  </script>
  
  <template>
    <div></div>
  </template>
  
  <style scoped></style>
  