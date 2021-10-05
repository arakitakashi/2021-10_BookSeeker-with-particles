import DatGui from './DatGui';

export default class TimerModel {
  constructor() {
    this._time = 0
    this._timeRatio = 1
  }

  getTimeRatio() {
    return this._timeRatio
  }

  getInstance() {
    return new TimerModel()
  }

  updateTimeRatio() {
    if (!DatGui.timeRatioMode) {
      this._timeRatio = 1
      this._time = new Date().getTime()
      return
    }

    const lastTime = this._time
    if(lastTime > 0) {
      const FPS_60_SEC = 1000 / 60
      const dTime = new Date().getTime() - lastTime
      this._timeRatio = dTime / FPS_60_SEC
    } else {
      this._timeRatio = 1
    }

    this._time = new Date().getTime()

    return this._timeRatio
  }
}