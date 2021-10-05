import { Object3D, TextureLoader } from 'three'
import Particle from './Particle';
import DatGui from './DatGui'
import TimerModel from './TimerModel'

export default class ParticleEmitter extends Object3D {
  constructor(scene) {
    super()
    this.scene = scene
    this._particleNum = 0
    this._interval = 100
    this._angle = 0
    this._radius = 20
    this._colorList = [0x88ccff, 0xffffdd, 0x44eeff]

    this.timerModel = new TimerModel()

    this.init()
  }

  init() {
    DatGui.addEventListener('changeParticleNum', (event) => {
      this._onChangeParticleNum(event)
    })

    const loader = new TextureLoader()
    loader.load('./images/window_02.png', (texture) => {
      this._texture = texture
    })

    this._particleNum = DatGui.particleNum
  }


  update() {
    if(!this._texture) {
      return
    }
    const incrementNumber = 7 * this.timerModel.getTimeRatio()
    this._angle += incrementNumber

    let notAliveNum = 0
    this.children.forEach((particle) => {
      if(!particle.isAlive) {
        notAliveNum++
      }
    })

    let initNum = 0
    this.children.forEach((particle, index) => {
      if(particle.isAlive) {
        particle.update()
      } else {
        particle.init(
          this._radius,
          this._angle - (incrementNumber / notAliveNum) * initNum
        )
        initNum++
      }

      const perLength = Math.floor(
        DatGui.particleMaxNum / this._particleNum
      )
      if(index % perLength === 0) {
        particle.visible = true
      } else {
        particle.visible = false
      }
    })

    if(this.children.length < DatGui.particleMaxNum) {
      for (let i = 0; i < 10; i++) {
        this._addParticle()
      }
    }
  }

  _addParticle() {
    if (this.children.length > DatGui.particleMaxNum) {
      return
    }

    const rand = Math.floor(Math.random() * 3)
    const color = this._colorList[rand]
    const particle = new Particle(this._texture, color)
    particle.visible = false
    this.add(particle)
  }

  _onChangeParticleNum(event) {
    this._particleNum = DatGui.particleNum
  }
}