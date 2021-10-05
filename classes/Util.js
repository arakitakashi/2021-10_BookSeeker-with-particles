/**
 * 便利メソッドクラスです。
 */
 export default class Util {
  /**
   * min, maxの間でランダムな数を返します。
   */
  random(min, max) {
    return Math.random() * (max - min) + min
  }
}