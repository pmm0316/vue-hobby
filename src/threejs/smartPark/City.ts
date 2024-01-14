import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { Scene } from 'three'
import gsap from "gsap";
import * as THREE from 'three'

export default class City {
  [x: string]: any
  scene: Scene
  loader: GLTFLoader
  mixer: any
  constructor(scene: Scene) {
    this.scene = scene
    this.loader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('./draco/')
    this.loader.setDRACOLoader(dracoLoader)
    this.loader.load('/smartPark/model/city4.glb', (gltf: any) => {
      console.log('gltf', gltf)
      this.scene.add(gltf.scene)
      gltf.scene.traverse((child: any) => {
        if (child.name === '热气球') {
          console.log('热气球', child)
          this.mixer = new THREE.AnimationMixer(child)
          this.clip = gltf.animations[1]
          // this.clip.duration = 10
          this.action = this.mixer.clipAction(this.clip)
          this.action.play()
        }
        if (child.name === '汽车园区轨迹') {
          const line = child
          const points = []
          const p = line.geometry.attributes.position
          for (let i = 0; i < p.count; i++) {
            points.push(new THREE.Vector3(p.getX(i), p.getY(i), p.getZ(i)))
          }
          this.curve = new THREE.CatmullRomCurve3(points)
          this.curveProgress = 0
          this.carAnimation()
        }
        if (child.name === 'redcar') {
          console.log('redcar', child)
          this.redcar = child
        }
      })
    })
  }
  update(time: any) {
    if (this.mixer) {
      this.mixer.update(time)
    }
  }
  carAnimation() {
    gsap.to(this, {
      curveProgress: 0.99,
      duration: 10,
      repeat: -1,
      onUpdate: () => {
        const point = this.curve.getPoint(this.curveProgress);
        this.redcar.position.set(point.x, point.y, point.z);
        if (this.curveProgress + 0.001 < 1) {
          const point = this.curve.getPoint(this.curveProgress + 0.001);
          this.redcar.lookAt(point);
        }
      }
    })
  }
}
