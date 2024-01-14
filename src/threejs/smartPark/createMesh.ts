import City from "./City"
import scene from "./scene"

let city: any = null
export default function createMesh() {
  city = new City(scene)
}

export function updateMesh(time: any) {
  city.update(time)
}