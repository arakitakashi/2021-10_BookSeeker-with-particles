import {
  AdditiveBlending,
  Sprite,
  SpriteMaterial,
  Vector3
} from 'three'

import Util from './Util'
import TimerModel from './TimerModel';

export default class Partcle extends Sprite {
  constructor(texture, color = 0x88ccff) {
    super(new SpriteMaterial({
      map: texture,
      color,
      transparent: true,
      blending: AdditiveBlending
    }))

    this.timerModel = new TimerModel()

    this.util = new Util()

    this._counter = 0
    this._velocity = new Vector3()
    this._startPosition = new Vector3()
  
    this._lifePoint = 0
    this.isAlive = false
    this._incrementCountNum = 0
    this._maxScale = 0
  }

  init(radius, angle) {
    const rad = (angle * Math.PI) / 180
    const x = radius * Math.sin(rad)
    const y = 4 * Math.sin(rad * 0.3)
    const z = radius * Math.cos(rad)
    this.position.set(x, y, z)

    this._maxScale = Math.random() * 1.5 + 0.5
    this.scale.set(0, 0, 0)
    this._velocity = new Vector3(
      this.util.random(-0.07, 0.07),
      this.util.random(0.03, 0.08),
      this.util.random(-0.07, 0.07)
    )
    this.material.opacity = 1
    this.isAlive = true

    this._lifePoint = Math.random() * 50 + 10
    this._counter = 0
    this._incrementCountNum = Math.random() * 0.5 + 0.2
  }

  update() {
    const timeRatio = this.timerModel.getTimeRatio()
    this._counter += this._incrementCountNum * timeRatio
    this.position.add(this._velocity.clone().multiplyScalar(timeRatio))
    this.material.opacity -= 0.009 * timeRatio

    const rad = Math.sin((this._counter * 30 * Math.PI) / 180)
    const scale = this._maxScale * rad
    this.scale.set(scale, scale, scale)

    if(this._lifePoint < this._counter) {
      this.isAlive = false
    }
  }

  dispose() {
    this._counter = null
    this._startPosition = null
    this._velocity = null
    this.material = null
  }
}