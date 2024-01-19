<template>
  <div ref="tsContainer" class="tsContainer"></div>
</template>
<script setup lang="ts">
import * as THREE from 'three'
import { ref, onMounted } from 'vue'

import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

const tsContainer = ref<any>(null)

let camera: any,
  scene: any,
  renderer: any = null

init()

const textArray = [
  {
    label: 'React Vue',
    fontSize: 50,
    position: [-150, 0, 0],
    Color: new THREE.Color().setRGB(255, 255, 255)
  },
  {
    label: 'Ant-design',
    fontSize: 20,
    position: [-400, 100, 0],
    Color: new THREE.Color().setRGB(255, 255, 255)
  },
  {
    label: 'Ant-design-mobile',
    fontSize: 15,
    position: [-500, 200, -20],
    Color: new THREE.Color().setRGB(255, 255, 255)
  },
  {
    label: 'Webpack Vite',
    fontSize: 15,
    position: [0, 300, -30],
    Color: new THREE.Color().setRGB(255, 255, 255)
  },
  {
    label: 'Ant-design-mobile',
    fontSize: 15,
    position: [-500, 200, -20],
    Color: new THREE.Color().setRGB(255, 255, 255)
  },
  {
    label: 'element-ui element-plus',
    fontSize: 20,
    position: [400, 300, 0],
    Color: new THREE.Color().setRGB(255, 255, 255)
  }
]

function init() {
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000)
  camera.position.set(0, -400, 600)

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)

  const dirLight = new THREE.DirectionalLight(0xffffff, 10)
  dirLight.position.set(0, -400, 600)
  scene.add(dirLight)

  const loader = new FontLoader()
  loader.load('./fonts/helvetiker_regular.typeface.json', function (font) {
    const color = 0x006699

    const matDark = new THREE.LineBasicMaterial({
      color: color,
      side: THREE.DoubleSide
    })

    textArray.forEach((item: any) => {
      const shapes = font.generateShapes(item.label, item.fontSize)
      const geometry: any = new THREE.ShapeGeometry(shapes)

      geometry.computeBoundingBox()
      const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x)
      geometry.translate(xMid, 0, 0)
      geometry.rotation = Math.random() * Math.PI

      const matLite = new THREE.MeshBasicMaterial({
        color: item.color,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide
      })

      const text = new THREE.Mesh(geometry, matLite)
      // @ts-ignore
      text.position.set(...item.position)
      scene.add(text)
      // const holeShapes: any[] = []

      // for (let i = 0; i < shapes.length; i++) {
      //   const shape = shapes[i]

      //   if (shape.holes && shape.holes.length > 0) {
      //     for (let j = 0; j < shape.holes.length; j++) {
      //       const hole = shape.holes[j]
      //       holeShapes.push(hole)
      //     }
      //   }
      // }

      // shapes.push.apply(shapes, holeShapes)

      // const lineText = new THREE.Object3D()

      // for (let i = 0; i < shapes.length; i++) {
      //   const shape = shapes[i]

      //   const points = shape.getPoints()
      //   const geometry = new THREE.BufferGeometry().setFromPoints(points)

      //   geometry.translate(xMid, 0, 0)

      //   const lineMesh = new THREE.Line(geometry, matDark)
      //   lineText.add(lineMesh)
      // }

      // scene.add(lineText)
    })

    // make line shape ( N.B. edge view remains visible )

    render()
  }) //end load function

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0, 0)
  controls.update()

  controls.addEventListener('change', render)

  window.addEventListener('resize', onWindowResize)
} // end init
const controls = new OrbitControls(camera, renderer.domElement)
// 动画更新逻辑
function render() {
  renderer.render(scene, camera)
  requestAnimationFrame(render)

  controls.update()
}

function onWindowResize() {
  const wHeight = window.innerHeight - 40
  camera.aspect = window.innerWidth / wHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, wHeight)
  render()
}

onMounted(() => {
  if (!tsContainer.value) return
  tsContainer.value?.appendChild(renderer.domElement)
  render()
})
</script>

<style scoped>
.tsContainer {
  height: calc(100vh - 40px);
}
</style>
