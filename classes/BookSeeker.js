import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

export default class BookSeeker {
  constructor(scene) {
    this.scene = scene
    this.modelLoader = new GLTFLoader()
    this.clock = new THREE.Clock()

    this.params = {
      speed: 1,
      circleSize: 15,
      frame: 0
    }

    this.createCourse()
  }

  init() {
    this.modelLoader.load('./models/book_seeker.glb', (glb) => {
      this.bookSeeker = glb.scene
      this.scene.add(this.bookSeeker)
    })
  }

  createCourse() {
    this.points = []
    const radius = this.params.circleSize

    for (let i = 0; i < 360; i++) {
      const rad =  (i * Math.PI) / 180
      const x = radius * Math.cos(rad)
      const y = radius * Math.sin(rad)
      this.points.push(new THREE.Vector3(x, y, 0))
    }

    this.normal = this.getNormal(this.points[this.params.frame], this.points[this.params.frame + 1])
  }

  update() {
    const delta = this.clock.getDelta()
    this.params.frame += 1 + Math.floor(delta * 100 / 2) 

    if(this.params.frame > 358) {
      this.params.frame = 0
    }
    
    if(this.bookSeeker) {
        this.bookSeeker.position.copy(this.points[this.params.frame])
        this.bookSeeker.up.set(this.normal.x, this.normal.y, this.normal.z)
        if(this.points[this.params.frame + 1]){
          this.bookSeeker.lookAt(this.points[this.params.frame + 1])
        }
    }
  }

  // 現在位置と次フレームの位置から法線を算出します。
  getNormal(currentPoint, nextPoint) {
    const vAB = nextPoint
      .clone()
      .sub(currentPoint)
      .normalize();
    const vAZ = new THREE.Vector3(0, 0, 1);
    const normalVec = vAB.cross(vAZ);

    return normalVec;
  }
}