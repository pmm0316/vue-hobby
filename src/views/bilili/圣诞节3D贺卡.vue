<script setup lang="ts">
  import {} from 'vue'
  import * as THREE from 'three'
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
  import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
  import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
  import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
  import * as TWEEN from 'three/examples/jsm/libs/tween.module.js'
  import { Water } from 'three/examples/jsm/objects/Water2.js'
  
  // 初始化场景
  const scene = new THREE.Scene()
  
  // 初始化相机
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  
  // 设置相机位置
  camera.position.set(-3.23, 2.98, 4.06)
  // 更新投影矩阵
  camera.updateProjectionMatrix()
  
  // 初始化渲染器
  const renderer = new THREE.WebGLRenderer({
    // 设置抗锯齿
    antialias: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  
  // 设置色调映射
  // renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.5
  
  // 允许阴影
  renderer.shadowMap.enabled = true
  
  // 设置水面效果
  
  // 初始化控制器
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  
  // 初始化解压模型
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('./draco/')
  const gltfLoader = new GLTFLoader()
  gltfLoader.setDRACOLoader(dracoLoader)
  
  // 加载环境纹理
  let rgbeLoader = new RGBELoader()
  rgbeLoader.load('./texture/sky.hdr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping
    scene.background = texture
    scene.environment = texture
  })
  
  // 添加模型
  gltfLoader.load('./model/scene.glb', (gltf) => {
    const model = gltf.scene
    model.traverse((child) => {
      if (child.name === 'Plane') {
        // 隐藏原来的平台
        child.visible = false
      }
      // @ts-ignore
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    scene.add(model)
  })
  
  // 创建水面
  const waterGeometry = new THREE.CircleGeometry(300, 32)
  const water = new Water(waterGeometry, {
    textureWidth: 1024,
    textureHeight: 1024,
    color: 0xeeeeff,
    flowDirection: new THREE.Vector2(1, 1),
    scale: 100
  })
  water.rotation.x = -Math.PI / 2
  water.position.y = -0.4
  scene.add(water)
  
  // 添加平行光
  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(0, 50, 0)
  scene.add(light)
  
  // 添加点光源
  const pointLight = new THREE.PointLight(0xffffff, 50)
  pointLight.position.set(0.1, 2.4, 0)
  pointLight.castShadow = true
  scene.add(pointLight)
  
  // 创建点光源组
  const pointLightGroup = new THREE.Group()
  pointLightGroup.position.set(-8, 2.5, -1.5)
  let radius = 3
  let pointLightArr = []
  for (let i = 0; i < 3; i++) {
    // 创建球体当灯泡
    const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32)
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 10,
    })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.position.set(
      radius * Math.cos((i * 2 * Math.PI) / 3),
      Math.cos((i * 2 * Math.PI) / 3),
      radius * Math.sin((i * 2 * Math.PI) / 3)
    )
    pointLightArr.push(sphere)
    const pointLight = new THREE.PointLight(0xffffff, 50)
    sphere.add(pointLight)
    pointLightGroup.add(sphere)
  }
  scene.add(pointLightGroup)
   
  function render() {
    renderer.render(scene, camera)
    requestAnimationFrame(render)
    controls && controls.update()
  }
  render()                
  </script>
  
  <template>
    <div></div>
  </template>
  
  <style scoped></style>
  