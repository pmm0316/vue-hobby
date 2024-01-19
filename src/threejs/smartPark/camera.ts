import * as THREE from 'three'

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000)
// 设置相机的位置
camera.position.set(1000, 1000, 1000)

class CameraModule {
  activeCamera: THREE.PerspectiveCamera
  collection: any
  constructor () {
    this.activeCamera = camera
    this.collection = {
      default: camera
    }
  }
  add(name: string, camera: any) {
    this.collection[name] = camera
  }
  setActive (name: string) {
    this.activeCamera = this.collection[name]
  }
}

export default new CameraModule()
