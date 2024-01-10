<script setup lang="ts">
  import { onMounted } from 'vue'
  import * as THREE from 'three'
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
  import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
  import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
  import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
  
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
    // 创建场景fog
    // scene.fog = new THREE.Fog(0x999999, 0.1, 50)
    // 创建场景指数fog
    scene.fog = new THREE.FogExp2(0x999999, 0.1)
    scene.background = new THREE.Color(0x999999)
  
    // 实例化加载器gltf
    const gltfLoader = new GLTFLoader()
    gltfLoader.load('./model/Duck.glb', (gltf) => {
      scene.add(gltf.scene)
    })
  
    // 加载环境贴图
    const rgbeLoader = new RGBELoader()
    rgbeLoader.load("./texture/Alex_Hart-Nature_Lab_Bones_2k.hdr", (envMap) => {
      envMap.mapping = THREE.EquirectangularReflectionMapping
      // 设置环境贴图
      scene.environment = envMap
    })
  
    // 解码器  压缩的glb模型需要用解码器
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( './draco/' );
    gltfLoader.setDRACOLoader(dracoLoader)
  
    gltfLoader.load("./model/city.glb", (gltf) => {
      scene.add(gltf.scene)
    })
  })
  </script>
  
  <template>
    <div></div>
  </template>
  
  <style scoped></style>
  