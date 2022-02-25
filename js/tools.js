/**生成一个Point
  * 
  * @param {number} x x坐标
  * @param {number} y y坐标
  */
export function Point(x, y) {
  let Point = {
    PosX: x,
    PosY: y,
  }
  return Point;
}

/**生成一对按钮btnPoint
 * 
 * @param {object} Point1 选中按钮Btn1矩阵坐标
 * @param {object} Point2 同色按钮Btn2矩阵坐标
 * @param {object} pos1 Btn1位置坐标
 * @param {object} pos2 Btn2位置坐标
 * @param {*} key 颜色
 */
export function btnPoint(Point1, Point2, pos1, pos2, key) {
  let nowPoint = {
    btnPos1: Point1,
    btnPos2: Point2,
    pos1,
    pos2,
    key,
  }
  return nowPoint;
}

/**计算Dots的位置
 * 
 * @param {number} width Canvas宽
 * @param {number} height Canvas高
 * @param {number} side 最短边
 * @param {array} mapLen 关卡矩阵
 */
export function countDotsPos(width, height, side, mapLen, TOPBAR) {
  let unit = side / (mapLen * 2);
  let top = (height - side) * 0.5;
  let left = (width - side) * 0.5;
  let dotsPos = [];

  for (let i = 0; i < mapLen; i++) {
    dotsPos[i] = [];
    for (let j = 0; j < mapLen; j++) {
      dotsPos[i][j] = Point(unit * (j * 2 + 1) + left, unit * (i * 2 + 1) + TOPBAR + top);
    }
  }

  return dotsPos;
}

/**计算点到触点的距离
 * 
 * @param {object} pos 点
 * @param {object} touch 触点
 */
export function getDir(pos, touch) {
  let diffX = Math.abs(pos.PosX - touch.PosX);
  let diffY = Math.abs(pos.PosY - touch.PosY);
  return Math.pow(diffX * diffX + diffY * diffY, 0.5);
}

/**
 * 设置cookie(添加或更改)
 * @param {number} key 键
 * @param {number} value 值
 */
export function setCookie(key, value) {
  document.cookie = key + '=' + escape(value);
}

/**
 * 查找并返回键对应的值
 * @param {string} key 键
 */
export function cookieHasKey(key) {
  let cookie = document.cookie;
  let cookieArr = cookie.split('; ');
  for (let i = 0, len = cookieArr.length; i < len; i++) {
    let arr = cookieArr[i].split('=');
    if (arr[0] == key) {
      return unescape(arr[1]);
    }
  }
  return null;
}

export function isPC() {
  let userAgentInfo = navigator.userAgent;
  let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];

  for (let i = 0, len = Agents.length; i < len; i++) {
    if (userAgentInfo.indexOf(Agents[i]) > 0) {
      return false;
    }
  }
  return true;
}
