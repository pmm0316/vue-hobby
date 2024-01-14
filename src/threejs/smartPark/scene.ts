import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

const scene = new THREE.Scene()
const rgbeLoader = new RGBELoader()

rgbeLoader.loadAsync("./smartPark/textures/023.hdr").then(texture => {
  scene.background = texture
  scene.environment = texture
  scene.environment.mapping = THREE.EquirectangularReflectionMapping
})

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(10, 100, 10)
scene.add(light)

export default scene