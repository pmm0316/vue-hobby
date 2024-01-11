<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue'
  import * as THREE from 'three'
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
  import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
  import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
  import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
  import * as TWEEN from 'three/examples/jsm/libs/tween.module.js'
  
  const { innerHeight, innerWidth } = window
  
  let canvasDom = ref<any>(null)
  let selectedBodyColor = ref<string>('')
  let selectedFontColor = ref<string>('')
  let selectedHoodColor = ref<string>('')
  let selectedWheelsColor = ref<string>('')
  
  // 创建场景
  const scene = new THREE.Scene()
  
  // 创建相机
  const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
  camera.position.set(0, 2, 6)
  
  // 创建渲染器
  const renderer = new THREE.WebGLRenderer({
    // 抗锯齿
    antialias: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  
  // 创建轨道控制器
  let controls = new OrbitControls(camera, renderer.domElement)
  
  function render() {
    renderer.render(scene, camera)
    requestAnimationFrame(render)
    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01
    // controls.update()
    // 渲染
    controls && controls.update()
    // 更新
    // tween.update()
  }
  
  let wheels = []
  let carBody, frontCar, hoodCar, glassCar
  
  // 创建材质
  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: '#FF0000',
    // 金属感
    metalness: 1,
    // 粗糙度
    roughness: 0.5,
    // 清漆
    clearcoat: 1,
    clearcoatRoughness: 0
  })
  
  const fontMaterial = new THREE.MeshPhysicalMaterial({
    color: '#FF0000',
    // 金属感
    metalness: 1,
    // 粗糙度
    roughness: 0.5,
    // 清漆
    clearcoat: 1,
    clearcoatRoughness: 0
  })
  
  const hoodMaterial = new THREE.MeshPhysicalMaterial({
    color: '#FF0000',
    // 金属感
    metalness: 1,
    // 粗糙度
    roughness: 0.5,
    // 清漆
    clearcoat: 1,
    clearcoatRoughness: 0
  })
  
  const wheelsMaterial = new THREE.MeshPhysicalMaterial({
    color: '#FF0000',
    // 金属感
    metalness: 1,
    // 粗糙度
    roughness: 0.1
  })
  
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: '#FFFFFF',
    metalness: 0,
    // 粗糙度
    roughness: 0.01,
    // opacity: 1,
    transmission: 1,
    transparent: true
  })
  
  const colors: any[] = ['red', 'blue', 'green', 'yellow', 'orange']
  
  const materials: any[] = [
    { name: '磨砂', value: 1 },
    { name: '冰晶', value: 0 }
  ]
  
  const selectColor = (color: string, type: string) => {
    const eventObj = {
      bodyMaterial: () => {
        selectedBodyColor.value = color
        bodyMaterial.color.set(color)
      },
      fontMaterial: () => {
        selectedFontColor.value = color
        fontMaterial.color.set(color)
      },
      hoodMaterial: () => {
        selectedHoodColor.value = color
        hoodMaterial.color.set(color)
      },
      wheelsMaterial: () => {
        selectedWheelsColor.value = color
        wheelsMaterial.color.set(color)
      }
    }
    // @ts-ignore
    eventObj[type]()
  }
  
  const selectMaterial = (item: any) => {
    bodyMaterial.clearcoatRoughness = item.value
    fontMaterial.clearcoatRoughness = item.value
    hoodMaterial.clearcoatRoughness = item.value
  }
  
  // 灯光定位数组
  const lightPositionGroup: Array<number>[] = [
    [0, 0, 10],
    [0, 0, -10],
    [-10, 0, 0],
    [10, 0, 0],
    [0, 10, 0],
    [5, 10, 0],
    [0, 10, 5],
    [0, 10, -5],
    [-5, 10, 0]
  ]
  
  onMounted(() => {
    if (!canvasDom.value) return
    // 将渲染器插入到dom中
    canvasDom?.value.appendChild(renderer.domElement)
  
    // 初始化渲染器，渲染背景
    renderer.setClearColor('#000')
    scene.background = new THREE.Color('#CCC')
    // scene.environment = new THREE.Color('#ccc')
    render()
  
    // 添加网格地面
    const gridHelper = new THREE.GridHelper(10, 10)
    gridHelper.material.opacity = 0.2
    gridHelper.material.transparent = true
    scene.add(gridHelper)
  
    // 添加汽车模型
    const loader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('./draco/')
    loader.setDRACOLoader(dracoLoader)
    loader.load('./model/bmw01.glb', (gltf) => {
      const bmw = gltf.scene
      console.log('gltf', gltf)
      bmw.traverse((child: any) => {
        if (child.isMesh) {
          console.log(child.name)
        }
        if (child.isMesh) {
          // 判断是否是轮毂
          if (child.name.includes('轮毂')) {
            child.material = wheelsMaterial
            wheels.push(child)
          }
          // 判断是否是车身
          if (child.name.includes('Mesh002')) {
            child.material = bodyMaterial
            carBody = child
          }
          // 判断是否是前脸
          if (child.name.includes('前脸')) {
            child.material = fontMaterial
            frontCar = child
          }
          // 判断是否是引擎盖
          if (child.name.includes('引擎盖_1')) {
            child.material = hoodMaterial
            hoodCar = child
          }
          // 判断是否是挡风玻璃
          if (child.name.includes('挡风玻璃')) {
            child.material = glassMaterial
            hoodCar = child
          }
        }
      })
      scene.add(bmw)
    })
    // 添加灯光
    lightPositionGroup.forEach((item: number[]) => {
      const light = new THREE.DirectionalLight(0xffffff, 1)
      light.position.set(item[0], item[1], item[2])
      scene.add(light)
    })
  })
  </script>
  
  <template>
    <div class="home">
      <div class="canvas-container" ref="canvasDom"></div>
      <div class="home-content">
        <h2>选择车身颜色</h2>
        <div class="select">
          <div
            class="color-item"
            :class="{ 'active-item': selectedBodyColor === value }"
            :key="value"
            v-for="value in colors"
            :style="{ background: value }"
            @click="selectColor(value, 'bodyMaterial')"
          ></div>
        </div>
        <h2>引擎盖选择</h2>
        <div class="select">
          <div
            class="color-item"
            :class="{ 'active-item': selectedHoodColor === value }"
            :key="value"
            v-for="value in colors"
            @click="selectColor(value, 'hoodMaterial')"
            :style="{ background: value }"
          ></div>
        </div>
        <h2>前脸选择</h2>
        <div class="select">
          <div
            class="color-item"
            :class="{ 'active-item': selectedFontColor === value }"
            :key="value"
            v-for="value in colors"
            @click="selectColor(value, 'fontMaterial')"
            :style="{ background: value }"
          ></div>
        </div>
        <h2>轮毂选择</h2>
        <div class="select">
          <div
            class="color-item"
            :class="{ 'active-item': selectedWheelsColor === value }"
            :key="value"
            v-for="value in colors"
            @click="selectColor(value, 'wheelsMaterial')"
            :style="{ background: value }"
          ></div>
        </div>
        <!-- <h2>选择贴膜材质</h2>
        <div class="select">
          <div
            class="color-item"
            :key="item.name"
            v-for="item in materials"
            @click="selectMaterial(item)"
          >
            <div class="color-item-text">
              {{ item.name }}
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </template>
  
  <style scoped>
  .home-content {
    position: fixed;
    top: 0;
    right: 20px;
  }
  .select {
    display: flex;
  }
  .color-item {
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    cursor: pointer;
    margin-right: 15px;
  }
  .active-item {
    width: 43px;
    height: 43px;
    border: 2px solid #333;
  }
  </style>
  