import { EventDispatcher } from 'three'

class DatGui extends EventDispatcher {
  constructor() {
    super()
    if (process.client) {
      const gui = require('three/examples/jsm/libs/dat.gui.module')
      this.GUI = gui.GUI
    }

    this.particleNum = 500
    this.particleMaxNum = 1500
    this.timeRatioMode = false

    if(this.GUI){
      this.setGui()
    }
  }

  setGui() {
    this._gui = new this.GUI()

    const particleNumRow = this._gui.add(
      this,
      'particleNum',
      100,
      this.particleMaxNum
    )
    particleNumRow.onChange(() => {
      this._onChangeParticleNum()
    })

    // FPSを30に
    const timeRatioRow = this._gui.add(this, 'timeRatioMode')
    timeRatioRow.onChange(() => {
      this._onChangeTimeRatioMode()
    })
  }

  _onChangeParticleNum() {
    this.dispatchEvent({ type: 'changeParticleNum' })
  }

  /**
   * FPS30モードの切替え時のハンドラーです。
   */
   _onChangeTimeRatioMode() {
    // イベントを発火
    this.dispatchEvent({ type: 'changeTimeRatioMode' });
  }
}

const _instance = new DatGui()
export default _instance