import { Point } from './tools.js';

const COLOR = {
  red: 'rgba(199,0,57,1)',
  green: 'rgba(127,227,20,1)',
  blue: 'rgba(10,130,201,1)',
  orange: 'rgba(255,144,0,1)',
  yellow: 'rgba(248,255,46,1)',
  darkblue: 'rgba(43,8,160,1)',
  lightblue: 'rgba(115,255,201,1)',
  violet: 'rgba(199,21,133,1)',
}

class BtnPos {

  Couple(x1, y1, x2, y2, key) {
    let Couple = {
      Point1: Point(x1, y1),
      Point2: Point(x2, y2),
      Key: key,
    };
    return Couple;
  }

  //传入Level后的num获取相应的数组
  getLevel(level) {
    return eval('this.level' + level);
  }

  level1 = [
    this.Couple(0, 0, 0, 5, COLOR.red),
    this.Couple(2, 2, 4, 2, COLOR.orange),
    this.Couple(2, 3, 4, 3, COLOR.yellow),
    this.Couple(5, 0, 5, 5, COLOR.green),
  ]

  level2 = [
    this.Couple(0, 1, 0, 3, COLOR.green),
    this.Couple(1, 0, 3, 4, COLOR.red),
    this.Couple(4, 1, 4, 3, COLOR.orange),
  ]
  level3 = [
    this.Couple(0, 0, 6, 4, COLOR.red),
    this.Couple(0, 5, 4, 3, COLOR.green),
    this.Couple(0, 6, 1, 4, COLOR.blue),
    this.Couple(1, 1, 5, 5, COLOR.orange),
    this.Couple(1, 3, 6, 6, COLOR.yellow),
    this.Couple(3, 3, 3, 5, COLOR.lightblue),
  ]

  level4 = [
    this.Couple(0, 0, 2, 1, COLOR.red),
    this.Couple(0, 1, 3, 3, COLOR.orange),
    this.Couple(0, 4, 4, 4, COLOR.yellow),
    this.Couple(1, 1, 4, 3, COLOR.green),
  ]
  level5 = [
    this.Couple(0, 0, 6, 0, COLOR.red),
    this.Couple(0, 1, 6, 2, COLOR.orange),
    this.Couple(0, 2, 3, 2, COLOR.green),
    this.Couple(0, 3, 4, 2, COLOR.yellow),
    this.Couple(0, 4, 3, 6, COLOR.blue),
    this.Couple(2, 4, 6, 3, COLOR.lightblue),
    this.Couple(3, 4, 5, 4, COLOR.darkblue),
    this.Couple(4, 6, 6, 6, COLOR.violet),
  ]
  level6 = [
    this.Couple(0, 0, 4, 0, COLOR.red),
    this.Couple(0, 1, 5, 2, COLOR.orange),
    this.Couple(0, 3, 3, 4, COLOR.green),
    this.Couple(0, 4, 5, 5, COLOR.lightblue),
    this.Couple(2, 3, 5, 3, COLOR.yellow),
  ]
  level7 = [
    this.Couple(0, 3, 2, 5, COLOR.green),
    this.Couple(1, 1, 4, 2, COLOR.red),
    this.Couple(2, 2, 2, 4, COLOR.orange),
    this.Couple(4, 5, 5, 2, COLOR.yellow),
  ]
  level8 = [
    this.Couple(0, 0, 3, 0, COLOR.red),
    this.Couple(0, 1, 4, 4, COLOR.green),
    this.Couple(0, 6, 2, 5, COLOR.lightblue),
    this.Couple(1, 6, 5, 6, COLOR.blue),
    this.Couple(2, 1, 6, 2, COLOR.orange),
    this.Couple(4, 3, 6, 6, COLOR.yellow),
  ]
  level9 = [
    this.Couple(0, 2, 4, 1, COLOR.green),
    this.Couple(0, 3, 3, 3, COLOR.yellow),
    this.Couple(1, 0, 3, 1, COLOR.red),
    this.Couple(0, 4, 4, 3, COLOR.lightblue),
    this.Couple(2, 0, 4, 0, COLOR.orange),
  ]
  level10 = [
    this.Couple(0, 0, 3, 0, COLOR.red),
    this.Couple(0, 1, 0, 3, COLOR.green),
    this.Couple(1, 3, 2, 5, COLOR.blue),
    this.Couple(3, 1, 5, 5, COLOR.yellow),
    this.Couple(4, 0, 4, 4, COLOR.orange),
    this.Couple(5, 2, 5, 4, COLOR.lightblue),
  ]
  level11 = [
    this.Couple(0, 0, 4, 1, COLOR.red),
    this.Couple(0, 1, 5, 3, COLOR.orange),
    this.Couple(0, 4, 2, 5, COLOR.lightblue),
    this.Couple(1, 1, 3, 1, COLOR.green),
    this.Couple(1, 3, 3, 3, COLOR.yellow),
    this.Couple(1, 4, 3, 5, COLOR.blue),
  ]
  level12 = [
    this.Couple(0, 2, 5, 3, COLOR.green),
    this.Couple(1, 2, 6, 1, COLOR.red),
    this.Couple(2, 1, 5, 1, COLOR.orange),
    this.Couple(2, 2, 4, 4, COLOR.yellow),
    this.Couple(2, 4, 4, 6, COLOR.lightblue),
    this.Couple(3, 4, 5, 6, COLOR.blue),
  ]
  level13 = [
    this.Couple(0, 0, 4, 0, COLOR.red),
    this.Couple(0, 1, 0, 4, COLOR.orange),
    this.Couple(1, 1, 3, 2, COLOR.green),
    this.Couple(1, 2, 2, 4, COLOR.yellow),
  ]
  level14 = [
    this.Couple(0, 0, 4, 1, COLOR.red),
    this.Couple(0, 2, 5, 0, COLOR.orange),
    this.Couple(0, 3, 0, 5, COLOR.green),
    this.Couple(2, 3, 4, 4, COLOR.yellow),
    this.Couple(5, 3, 5, 5, COLOR.lightblue),
  ]
  level15 = [
    this.Couple(0, 0, 0, 5, COLOR.red),
    this.Couple(2, 0, 2, 5, COLOR.orange),
    this.Couple(3, 0, 3, 3, COLOR.green),
    this.Couple(3, 5, 5, 0, COLOR.yellow),
    this.Couple(5, 2, 5, 5, COLOR.lightblue),
  ]
  level16 = [
    this.Couple(0, 0, 5, 0, COLOR.red),
    this.Couple(0, 1, 6, 0, COLOR.orange),
    this.Couple(0, 3, 4, 4, COLOR.green),
    this.Couple(1, 3, 1, 5, COLOR.lightblue),
    this.Couple(2, 3, 6, 6, COLOR.blue),
    this.Couple(3, 3, 6, 3, COLOR.darkblue),
    this.Couple(5, 4, 6, 2, COLOR.yellow),
  ]
  level17 = [
    this.Couple(0, 0, 4, 0, COLOR.red),
    this.Couple(0, 1, 0, 4, COLOR.orange),
    this.Couple(2, 1, 4, 4, COLOR.green),
    this.Couple(2, 2, 3, 4, COLOR.yellow),
  ]
  level18 = [
    this.Couple(0, 0, 3, 0, COLOR.red),
    this.Couple(0, 1, 4, 3, COLOR.green),
    this.Couple(0, 5, 4, 4, COLOR.blue),
    this.Couple(1, 1, 4, 0, COLOR.orange),
    this.Couple(4, 2, 3, 5, COLOR.lightblue),
    this.Couple(1, 2, 3, 2, COLOR.yellow),
  ]
  level19 = [
    this.Couple(0, 0, 2, 0, COLOR.red),
    this.Couple(0, 1, 4, 3, COLOR.yellow),
    this.Couple(0, 5, 4, 4, COLOR.blue),
    this.Couple(1, 2, 4, 1, COLOR.orange),
    this.Couple(1, 5, 5, 3, COLOR.lightblue),
    this.Couple(2, 2, 5, 0, COLOR.green),
  ]
  level20 = [
    this.Couple(0, 0, 2, 0, COLOR.red),
    this.Couple(0, 2, 2, 6, COLOR.green),
    this.Couple(1, 5, 6, 6, COLOR.lightblue),
    this.Couple(2, 2, 6, 0, COLOR.orange),
    this.Couple(2, 5, 4, 5, COLOR.blue),
    this.Couple(4, 3, 6, 4, COLOR.yellow),
  ]
  level21 = [
    this.Couple(0, 0, 3, 0, COLOR.red),
    this.Couple(0, 1, 4, 0, COLOR.orange),
    this.Couple(0, 2, 2, 2, COLOR.green),
    this.Couple(0, 3, 4, 2, COLOR.yellow),
    this.Couple(0, 4, 4, 3, COLOR.lightblue),
  ]
  level22 = [
    this.Couple(0, 0, 5, 1, COLOR.red),
    this.Couple(0, 1, 5, 2, COLOR.orange),
    this.Couple(0, 3, 2, 4, COLOR.yellow),
    this.Couple(0, 5, 4, 3, COLOR.lightblue),
    this.Couple(5, 3, 5, 5, COLOR.blue),
    this.Couple(1, 1, 4, 1, COLOR.green),
  ]
  level23 = [
    this.Couple(0, 0, 2, 1, COLOR.red),
    this.Couple(0, 1, 3, 3, COLOR.orange),
    this.Couple(0, 4, 4, 4, COLOR.yellow),
    this.Couple(1, 1, 4, 3, COLOR.green),
  ]
  level24 = [
    this.Couple(0, 1, 3, 2, COLOR.red),
    this.Couple(0, 2, 0, 4, COLOR.yellow),
    this.Couple(1, 2, 4, 3, COLOR.lightblue),
    this.Couple(2, 1, 2, 3, COLOR.green),
    this.Couple(4, 0, 4, 2, COLOR.orange),
  ]
  level25 = [
    this.Couple(0, 0, 3, 3, COLOR.red),
    this.Couple(0, 1, 0, 5, COLOR.green),
    this.Couple(0, 2, 0, 4, COLOR.yellow),
    this.Couple(2, 2, 4, 2, COLOR.lightblue),
    this.Couple(2, 5, 5, 2, COLOR.blue),
    this.Couple(3, 0, 5, 0, COLOR.orange),
  ]
  level26 = [
    this.Couple(0, 0, 3, 1, COLOR.red),
    this.Couple(0, 1, 3, 5, COLOR.green),
    this.Couple(2, 2, 5, 2, COLOR.orange),
    this.Couple(2, 4, 4, 5, COLOR.yellow),
    this.Couple(5, 3, 5, 5, COLOR.lightblue),
  ]
  level27 = [
    this.Couple(0, 1, 5, 2, COLOR.orange),
    this.Couple(0, 3, 1, 6, COLOR.yellow),
    this.Couple(1, 1, 6, 2, COLOR.red),
    this.Couple(1, 3, 6, 4, COLOR.lightblue),
    this.Couple(2, 3, 4, 3, COLOR.green),
    this.Couple(4, 5, 6, 6, COLOR.blue),

  ]


}
export { BtnPos }