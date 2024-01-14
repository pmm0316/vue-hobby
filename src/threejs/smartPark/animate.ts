import * as THREE from 'three'
import renderer from './renderer'
import scene from './scene'
import cameraModule from './camera'
import { updateMesh } from './createMesh'

const clock = new THREE.Clock()
function animate() {
  // controls.update()
  const time = clock.getElapsedTime()
  updateMesh(time)
  requestAnimationFrame(animate)
  renderer.render(scene, cameraModule.activeCamera)
}

export default animate
