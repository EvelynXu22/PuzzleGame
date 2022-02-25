
class LevelMap {
  constructor() {

  }

  getLevel(level) {
    return eval('this.level' + level);
  }

  /**
   * -1 ==>无Dot
   * 0  ==>Dot
   * >0 ==>按钮(同数字配对)
   */

  level1 = [
    [1, 0, 0, 0, 0, 1],
    [-1, -1, 0, 0, -1, -1],
    [0, 0, 2, 3, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [-1, -1, 2, 3, -1, -1],
    [4, 0, 0, 0, 0, 4],
  ]
  level2 = [
    [-1, 1, 0, 1, 0],
    [2, -1, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, -1, 2],
    [0, 3, 0, 3, -1],
  ]
  level3 = [
    [1, -1, 0, 0, 0, 2, 3],
    [0, 4, 0, 5, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 6, 0, 6, 0],
    [0, 0, 0, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 4, 0],
    [0, 0, 0, 0, 1, -1, 5],
  ]
  level4 = [
    [1, 2, 0, 0, 4],
    [0, 3, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 2, 0],
    [0, 0, 0, 3, 4],
  ]
  level5 = [
    [1, 2, 3, 4, 5, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 6, 0, 0],
    [0, 0, 3, 0, 7, 0, 5],
    [0, 0, 4, 0, 0, 0, 8],
    [0, 0, 0, 0, 7, 0, 0],
    [1, 0, 2, 6, 0, 0, 8],
  ]
  level6 = [
    [1, 2, 0, 3, 4, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 0, 0],
    [0, 0, 0, 0, 3, 0],
    [1, 0, 0, 0, 0, 0],
    [0, 0, 2, 5, 0, 4],
  ]
  level7 = [
    [-1, -1, 0, 1, -1, -1],
    [0, 2, 0, 0, 0, 0],
    [0, 0, 3, 0, 3, 1],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 4],
    [-1, -1, 4, 0, -1, -1],
  ]
  level8 = [
    [1, 2, 0, -1, 0, 0, 3],
    [0, -1, 0, 0, 0, -1, 5],
    [0, 4, 0, 0, 0, 3, 0],
    [1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 6, 2, 0, 0],
    [0, -1, 0, 0, 0, -1, 5],
    [0, 0, 4, -1, 0, 0, 6],
  ]
  level9 = [
    [0, 0, 1, 2, 3],
    [4, 0, 0, 0, 0],
    [5, 0, 0, 0, 0],
    [0, 4, 0, 2, 0],
    [5, 1, 0, 3, 0],
  ]
  level9 = [
    [0, 0, 1, 2, 3],
    [4, 0, 0, 0, 0],
    [5, 0, 0, 0, 0],
    [0, 4, 0, 2, 0],
    [5, 1, 0, 3, 0],
  ]
  level10 = [
    [1, 2, 0, 2, 0, 0],
    [0, 0, 0, 3, 0, 0],
    [0, 0, 0, 0, 0, 3],
    [1, 4, 0, 0, 0, 0],
    [5, 0, 0, 0, 5, 0],
    [0, 0, 6, 0, 6, 4],
  ]
  level11 = [
    [1, 2, 0, -1, 3, 0],
    [0, 4, 0, 5, 6, 0],
    [0, 0, 0, 0, 0, 3],
    [0, 4, 0, 5, 0, 6],
    [0, 1, 0, 0, 0, 0],
    [0, 0, -1, 2, 0, 0],
  ]
  level12 = [
    [-1, -1, 1, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0],
    [0, 3, 4, 0, 5, 0, 0],
    [0, 0, 0, 0, 6, 0, 0],
    [0, 0, 0, 0, 4, 0, 5],
    [0, 3, 0, 1, 0, 0, 6],
    [0, 2, 0, 0, 0, -1, -1],
  ]
  level13 = [
    [1, 2, 0, 0, 2],
    [0, 3, 4, 0, 0],
    [0, 0, 0, 0, 4],
    [0, 0, 3, 0, 0],
    [1, 0, 0, 0, 0],
  ]
  level14 = [
    [1, 0, 2, 3, 0, 3],
    [-1, 0, 0, 0, 0, -1],
    [0, 0, 0, 4, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [-1, 1, 0, 0, 4, -1],
    [2, 0, 0, 5, 0, 5],
  ]
  level15 = [
    [1, 0, 0, 0, 0, 1],
    [-1, 0, 0, 0, 0, -1],
    [2, 0, 0, 0, 0, 2],
    [3, 0, 0, 3, 0, 4],
    [-1, 0, 0, 0, 0, -1],
    [4, 0, 5, 0, 0, 5],
  ]
  level16 = [
    [1, 2, 0, 3, 0, 0, 0],
    [0, 0, 0, 4, 0, 4, 0],
    [0, 0, 0, 5, 0, 0, 0],
    [0, 0, 0, 6, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 0],
    [1, 0, 0, 0, 7, 0, 0],
    [2, 0, 7, 6, 0, 0, 5],
  ]
  level17 = [
    [1, 2, 0, 0, 2],
    [0, 0, 0, 0, 0],
    [0, 3, 4, 0, 0],
    [0, 0, 0, 0, 4],
    [1, 0, 0, 0, 3],
  ]
  level18 = [
    [1, 2, 0, 0, 0, 3],
    [0, 4, 5, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [1, 0, 5, 0, 0, 6],
    [4, 0, 6, 2, 3, 0],
    [0, 0, 0, 0, 0, 0],
  ]
  level19 = [
    [1, 2, 0, 0, 0, 3],
    [0, 0, 4, 0, 0, 5],
    [1, 0, 6, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 4, 0, 2, 3, 0],
    [6, 0, 0, 5, 0, 0],
  ]
  level20 = [
    [1, 0, 2, 0, 0, 0, 0],
    [-1, 0, 0, 0, 0, 3, 0],
    [1, 0, 4, 0, 0, 5, 2],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 6, 0, 5, 0],
    [0, 0, 0, 0, 0, 0, -1],
    [4, 0, 0, 0, 6, 0, 3],
  ]
  level21 = [
    [1, 2, 3, 4, 5],
    [0, 0, 0, 0, 0],
    [0, 0, 3, 0, 0],
    [1, 0, 0, 0, 0],
    [2, 0, 4, 5, 0],
  ]
  level22 = [
    [1, 2, 0, 3, 0, 4],
    [0, 5, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 5, 0, 4, 0, 0],
    [0, 1, 2, 6, 0, 6],
  ]
  level23 = [
    [1, 2, 0, 0, 3],
    [0, 4, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 2, 0],
    [0, 0, 0, 4, 3],
  ]
  level24 = [
    [-1, 1, 2, 0, 2],
    [0, 0, 3, 0, 0],
    [0, 4, 0, 4, 0],
    [0, 0, 1, 0, 0],
    [5, 0, 5, 3, -1],
  ]
  level25 = [
    [1, 2, 3, 0, 3, 2],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 5, 0, 0, 4],
    [6, 0, 0, 1, 0, 0],
    [0, 0, 5, 0, 0, 0],
    [6, 0, 4, 0, 0, 0],
  ]
  level26 = [
    [1, 2, 0, 0, 0, 0],
    [0, 0, -1, 0, 0, 0],
    [0, 0, 3, 0, 4, 0],
    [0, 1, 0, 0, 0, 2],
    [0, 0, 0, -1, 0, 4],
    [0, 0, 3, 5, 0, 5],
  ]
  level27 = [
    [-1, 1, 0, 2, 0, 0, -1],
    [0, 3, 0, 4, 0, 0, 2],
    [0, 0, 0, 5, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 0, 6, 0],
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 3, 0, 4, 0, 6],

  ]







}
export { LevelMap }