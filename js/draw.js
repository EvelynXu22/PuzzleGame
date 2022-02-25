const RADIUS = 35;
const ORANGE = 'rgba(255,144,0,1)';
const WHITE = '#fff';
const GRAY = '#8E8E8E';
const LIGHTYELLOW = '#FFFBE0';
const BLACK = '#000';

import { Point } from './tools.js';

/**
 * 清除Canvas
 * @param {number} width Canvas宽
 * @param {number} height Canvas长
 */
export function clearCanvas(width, height, context) {
  context.clearRect(0, 0, width, height);
}

/**
 * 绘制渐变背景
 */
export function drawBackground(context, width, height) {
  let linearGradient = context.createLinearGradient(0, 0, 0, height);
  linearGradient.addColorStop(0.0, "#191A23");
  linearGradient.addColorStop(0.5, "#294F72");
  linearGradient.addColorStop(0.8, '#4382B8');
  linearGradient.addColorStop(1.0, '#72ABCF');
  context.fillStyle = linearGradient;
  context.fillRect(0, 0, width, height);

}

/**
* 绘制关卡网格
* @param {array} map 矩阵
* @param {number} len 长度
*/
export function drawGrid(dotsPos, map, dotsRadius, lineWidth, context, width, height) {
  clearCanvas(width, height, context);
  let point, nextPoint, underPoint;
  context.beginPath()
  context.lineWidth = lineWidth;
  context.strokeStyle = WHITE;
  for (let i = 0, len = map.length; i < len; i++) {
    for (let j = 0; j < len; j++) {
      point = map[i][j];
      if (point != -1) {
        this.drawCircle(dotsPos[i][j].PosX, dotsPos[i][j].PosY, dotsRadius, 'fill', WHITE, context);
        if (j < len - 1) {
          nextPoint = map[i][j + 1];
          if (nextPoint != -1) {
            context.moveTo(dotsPos[i][j].PosX, dotsPos[i][j].PosY);
            context.lineTo(dotsPos[i][j + 1].PosX, dotsPos[i][j + 1].PosY)
            context.stroke();
          }
        }
        if (i < len - 1) {
          underPoint = map[i + 1][j];
          if (underPoint != -1) {
            context.moveTo(dotsPos[i][j].PosX, dotsPos[i][j].PosY);
            context.lineTo(dotsPos[i + 1][j].PosX, dotsPos[i + 1][j].PosY)
            context.stroke();
          }
        }
      }
    }
  }
}

/** 
* 绘制圆形
* @param {number} x x坐标
* @param {number} y y坐标
* @param {number} radius 半径
* @param {string} type 绘制方法
* @param {string} color 绘制颜色
*/
export function drawCircle(x, y, radius, type, color, context) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  switch (type) {
    case 'fill':
      if (color !== null) {
        context.fillStyle = color;
      }
      context.fill();
      break;
    case 'stroke':
      if (color !== null) {
        context.strokeStyle = color;
      }
      context.stroke();
      break;
    default:
      throw new Error('Wrong type');
  }

}

/**
 * 绘制矩形
 * @param {number} x x坐标
 * @param {number} y y坐标
 * @param {number} width 宽
 * @param {number} height 长
 * @param {string} color 颜色
 * @param {*} context 绘制Context
 */
export function drawFillRect(x, y, width, height, color, context) {
  context.beginPath();
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}

/**
 * 绘制一个按钮
 * @param {array} pos 坐标
 * @param {number} R 按钮半径
 * @param {颜色键} key string
 */
export function drawSingleBtn(pos, R, key, linked, context) {
  if (linked) {
    this.drawCircle(pos.PosX, pos.PosY, R + 2, 'fill', WHITE, context);
  }
  else {
    this.drawCircle(pos.PosX, pos.PosY, R + 3.5, 'fill', WHITE, context);
  }
  this.drawCircle(pos.PosX, pos.PosY, R, 'fill', key, context);
}

/**
 * 绘制所有按钮
 * @param {array} btnPos 按钮位置
 * @param {array} dotsPos 地图点位置
 * @param {number} buttonRadius 按钮半径
 */
export function drawBtns(btnPos, dotsPos, buttonRadius, roads, context) {
  if (roads.length == 0) {
    for (let i = 0, len = btnPos.length; i < len; i++) {
      let { Point1, Point2, Key } = btnPos[i];
      let [pos1, pos2] = [dotsPos[Point1.PosX][Point1.PosY], dotsPos[Point2.PosX][Point2.PosY]];

      this.drawSingleBtn(pos1, buttonRadius, Key, true, context)
      this.drawSingleBtn(pos2, buttonRadius, Key, true, context)
    }
  }
  else {

    for (let i = 0, len = btnPos.length; i < len; i++) {
      let b_isDraw = false;
      let { Point1, Point2, Key } = btnPos[i];
      let [pos1, pos2] = [dotsPos[Point1.PosX][Point1.PosY], dotsPos[Point2.PosX][Point2.PosY]];

      for (let i = 0, len = roads.length; i < len; i++) {
        let road = roads[i];
        if (road.nowPoint.btnPos1.PosX == Point1.PosX && road.nowPoint.btnPos1.PosY == Point1.PosY ||
          road.nowPoint.btnPos1.PosX == Point2.PosX && road.nowPoint.btnPos1.PosY == Point2.PosY) {
          this.drawSingleBtn(pos1, buttonRadius, Key, road.linked, context);
          this.drawSingleBtn(pos2, buttonRadius, Key, road.linked, context);
          b_isDraw = true;
          break;
        }
      }
      if (!b_isDraw) {
        this.drawSingleBtn(pos1, buttonRadius, Key, true, context);
        this.drawSingleBtn(pos2, buttonRadius, Key, true, context);
      }
    }
  }
}

/**
 * 绘制一条路径
 * @param {array} road 绘制路径
 * @param {array} nowPoint 激活按钮
 * @param {array} dotsPos 点坐标矩阵
 * @param {number} roadWidth 路径宽度
 * @param {array} drawMap 绘制矩阵(同步)
 */
export function drawRoad(road, nowPoint, linked, dotsPos, roadWidth, buttonRadius, drawMap, context) {

  let [endx, endy] = [road[road.length - 1].x, road[road.length - 1].y];
  let key = nowPoint.key;
  let point, nextPoint;
  let end = dotsPos[endx][endy];
  let [startPoint, endPoint] = [nowPoint.btnPos1, nowPoint.btnPos2];
  let [btn1Pos, btn2Pos] = [dotsPos[startPoint.PosX][startPoint.PosY], dotsPos[endPoint.PosX][endPoint.PosY]];

  context.beginPath()

  //路径两头和拐角样式
  context.lineCap = "round";
  context.lineJoin = "round";

  let whiteLineWidth = 0;
  //白色底
  if (linked) {
    whiteLineWidth = roadWidth + 2;
  }
  else {
    whiteLineWidth = roadWidth + 5;
  }
  context.lineWidth = whiteLineWidth;
  context.strokeStyle = '#fff';

  if (road.length > 0) {
    for (let i = 0, len = road.length; i < len; i++) {

      point = dotsPos[road[i].x][road[i].y];
      if (i == road.length - 1) {
        nextPoint = dotsPos[endx][endy];
        drawMap[endx][endy] = drawMap[startPoint.PosX][startPoint.PosY];
      }
      else {
        nextPoint = dotsPos[road[i + 1].x][road[i + 1].y];
        drawMap[road[i + 1].x][road[i + 1].y] = drawMap[startPoint.PosX][startPoint.PosY];
      }

      //画白色底
      context.moveTo(point.PosX, point.PosY);
      context.lineTo(nextPoint.PosX, nextPoint.PosY);
      context.stroke();

      //画对应颜色线
      context.lineWidth = roadWidth;
      context.strokeStyle = key;
      context.moveTo(point.PosX, point.PosY);
      context.lineTo(nextPoint.PosX, nextPoint.PosY);
      context.stroke();

    }

    context.lineWidth = whiteLineWidth;
    context.strokeStyle = WHITE;
    context.moveTo(nextPoint.PosX, nextPoint.PosY);
    context.lineTo(end.PosX, end.PosY);
    context.stroke();

    context.lineWidth = roadWidth;
    context.strokeStyle = key;
    context.moveTo(nextPoint.PosX, nextPoint.PosY);
    context.lineTo(end.PosX, end.PosY);
    context.stroke();
  }

  //按钮重新画圆盖住路径
  this.drawCircle(btn1Pos.PosX, btn1Pos.PosY, buttonRadius, 'fill', key, context);
  this.drawCircle(btn2Pos.PosX, btn2Pos.PosY, buttonRadius, 'fill', key, context);

}

/**
 * 绘制所有路径
 * @param {array} lines 所有路径
 * @param {array} dotsPos 点位置矩阵
 * @param {number} roadWidth 路径宽度
 * @param {array} drawMap 绘制矩阵
 */
export function drawRoads(roads, dotsPos, roadWidth, buttonRadius, drawMap, context) {

  for (let i = 0, len = roads.length; i < len; i++) {
    let road = roads[i];
    this.drawRoad(road.road, road.nowPoint, road.linked, dotsPos, roadWidth, buttonRadius, drawMap, context);
  }
}

/**
 * 绘制进度条
 * @param {number} lineLength 线宽
 * @param {number} TOPBAR 顶部距离
 * @param {number} percent 完成百分比
 * @param {object} context canvas
 * @param {number} width canvas宽度
 * @param {number} height canvas高度
 */
export function drawProgressBar(lineLength, TOPBAR, percent, context, width, height) {
  //刷新
  clearCanvas(width, height, context);

  //有效进度条长度
  let usefulLength = lineLength - 2 * RADIUS;
  let lineEnd = TOPBAR + usefulLength * percent;

  //百分比不能小于0
  if (percent < 0) {
    percent = 0;
  }

  //百分比数字保持居中 计算x坐标
  context.font = "15px Verdana";
  let txtPercetn = (percent * 100 + 0).toFixed(0) + '%';
  let topSpace = RADIUS - context.measureText(txtPercetn).width / 2;

  context.beginPath()
  context.lineWidth = 3;
  context.strokeStyle = "rgba(255,255,255,1)";

  context.moveTo(TOPBAR, TOPBAR);
  context.lineTo(lineEnd, TOPBAR)
  context.stroke();

  context.beginPath()
  context.arc(lineEnd + RADIUS, TOPBAR, RADIUS, (1 - percent) * Math.PI, (1 + percent) * Math.PI);
  context.stroke();

  this.drawCircle(lineEnd + RADIUS * (1 + Math.cos((1 - percent) * Math.PI)), TOPBAR + RADIUS * Math.sin((1 - percent) * Math.PI), 5, 'fill', '#fff', context);
  this.drawCircle(lineEnd + RADIUS * (1 + Math.cos((1 - percent) * Math.PI)), TOPBAR - RADIUS * Math.sin((1 - percent) * Math.PI), 5, 'fill', '#fff', context);


  context.fillStyle = "rgba(255,255,255,1)";
  context.fillText(txtPercetn, lineEnd + topSpace, TOPBAR - 3);
  context.fillText('Lines', lineEnd + RADIUS * 0.4, TOPBAR + 13);

  context.beginPath()
  context.lineWidth = 3;
  context.strokeStyle = "rgba(255,255,255,0.6)";

  context.moveTo(lineEnd + RADIUS * 2, TOPBAR);
  context.lineTo(TOPBAR + lineLength, TOPBAR)
  context.stroke();
}

export function drawLine(points, lineWidth, color, context) {
  let pointPos = points[0].pos;

  context.beginPath();
  context.lineCap = "round";
  context.lineWidth = lineWidth;
  context.strokeStyle = color;

  context.moveTo(pointPos.PosX, pointPos.PosY);
  for (let i = 1, len = points.length; i < len; i++) {
    pointPos = points[i].pos;
    context.lineTo(pointPos.PosX, pointPos.PosY);
  }
  context.stroke();
}

export function printText(text, x, y, width, context) {
  context.fillStyle = "#000";
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.font = width + 'px Trebuchet MS';
  context.fillText(text, x, y);
}



export function drawLock(x, y, r, context) {
  drawCircle(x, y - r / 3, r / 2.7, 'fill', GRAY, context);
  drawCircle(x, y - r / 3, r / 4.5, 'fill', LIGHTYELLOW, context);

  drawCircle(x, y + r / 5, r / 1.8, 'fill', LIGHTYELLOW, context);
  drawCircle(x, y + r / 5, r / 2, 'fill', GRAY, context);

  drawCircle(x, y + r / 5, r / 10, 'fill', LIGHTYELLOW, context);
  drawFillRect(x - r / 25, y + r / 6.2, r / 12.5, r / 4, LIGHTYELLOW, context);
}

export function drawStar(x, y, R, context) {
  let points = [];
  let r = R / 2;

  //从第二个点开始
  points.push(Point(x - r * Math.sin(36 * Math.PI / 180), y - r * Math.cos(36 * Math.PI / 180)));
  points.push(Point(x - R * Math.sin(72 * Math.PI / 180), y - R * Math.cos(72 * Math.PI / 180)));

  points.push(Point(x - r * Math.sin(72 * Math.PI / 180), y + r * Math.cos(72 * Math.PI / 180)));
  points.push(Point(x - R * Math.sin(36 * Math.PI / 180), y + R * Math.cos(36 * Math.PI / 180)));

  points.push(Point(x, y + r));
  points.push(Point(x + R * Math.sin(36 * Math.PI / 180), y + R * Math.cos(36 * Math.PI / 180)));

  points.push(Point(x + r * Math.sin(72 * Math.PI / 180), y + r * Math.cos(72 * Math.PI / 180)));
  points.push(Point(x + R * Math.sin(72 * Math.PI / 180), y - R * Math.cos(72 * Math.PI / 180)));

  points.push(Point(x + r * Math.sin(36 * Math.PI / 180), y - r * Math.cos(36 * Math.PI / 180)));

  context.beginPath();

  //开始点位
  context.moveTo(x, y - R);
  for (let i = 0, len = points.length; i < len; i++) {
    context.lineTo(points[i].PosX, points[i].PosY);
  }
  context.closePath();

  let linearGradient = context.createLinearGradient(points[0].PosX, points[0].PosY, points[5].PosX, points[5].PosY);
  linearGradient.addColorStop(0.0, "#F6E0C5");
  linearGradient.addColorStop(0.5, "#E09452");
  context.fillStyle = linearGradient;
  context.lineWidth = R / 8;
  context.strokeStyle = "rgba(50,50,50,0.28)";

  context.stroke();
  context.fill();
}

export function drawArrow(x, y, r, direction, context) {
  context.beginPath();
  context.lineCap = "round";
  context.lineWidth = 7;
  context.strokeStyle = WHITE;

  if (direction == 'right') {
    context.moveTo(x - r / 4, y + r / 2);
    context.lineTo(x + r / 4, y);
    context.lineTo(x - r / 4, y - r / 2);
  }
  else if (direction == 'left') {
    context.moveTo(x + r / 4, y + r / 2);
    context.lineTo(x - r / 4, y);
    context.lineTo(x + r / 4, y - r / 2);
  }

  context.stroke();
  drawCircle(x, y, r, 'stroke', WHITE, context);
}

export function drawArrows(arrowPos, r, context) {
  for (let i = 0, len = arrowPos.length; i < len; i++) {
    let arrow = arrowPos[i];
    if (i == 0 || i == 1) continue;
    else if (i % 2 == 0) {
      //右箭头
      drawArrow(arrow.PosX, arrow.PosY, r, 'right', context);
    }
    else {
      //左箭头
      drawArrow(arrow.PosX, arrow.PosY, r, 'left', context);
    }
  }
}

export function drawLevel(context, allMap, levleRadius) {
  for (let i = 0, len = allMap.length; i < len; i++) {
    let levelMap = allMap[i];
    //画线
    drawLine(levelMap, 5, ORANGE, context);

    //画关卡按键
    for (let i = 0, len = levelMap.length; i < len; i++) {
      let { level, pos, status, unlock } = levelMap[i];
      //已解锁
      if (unlock == true) {

        drawCircle(pos.PosX, pos.PosY, levleRadius, 'fill', ORANGE, context);
        drawCircle(pos.PosX, pos.PosY, levleRadius - 4, 'fill', LIGHTYELLOW, context);

        printText(parseInt(level), pos.PosX, pos.PosY + 5, 40, context);
        printText(level.replace(/[^a-z]/g, ''), pos.PosX + context.measureText(parseInt(level)).width / 2 + 5, pos.PosY - 17, 20, context);
        //已通关的标记星星
        if (status == 1) {
          drawStar(pos.PosX, pos.PosY - levleRadius, 15, context);
        }
      }

      //未解锁
      else {
        drawCircle(pos.PosX, pos.PosY, levleRadius, 'fill', GRAY, context);
        drawCircle(pos.PosX, pos.PosY, levleRadius - 4, 'fill', LIGHTYELLOW, context);
        drawLock(pos.PosX, pos.PosY, levleRadius, context);
      }
    }
  }
}

export function drawSmile(context, pos, r) {
  let [x, y] = [pos.PosX, pos.PosY - 3 * r];

  //指针底
  context.beginPath();
  context.lineWidth = r / 5;
  context.strokeStyle = ORANGE;
  context.fillStyle = LIGHTYELLOW;

  context.arc(x, y, 2 * r, (3 / 4) * Math.PI, (1 / 4) * Math.PI);
  context.moveTo(x - r * Math.pow(2, 1 / 2), y + r * Math.pow(2, 1 / 2));
  context.lineTo(x, y + 3 * r - 1 / 2 * r);
  context.lineTo(x + r * Math.pow(2, 1 / 2), y + r * Math.pow(2, 1 / 2));

  context.stroke();
  context.fill();

  //橙色圆圈
  drawCircle(x, y, 3 / 2 * r, 'fill', ORANGE, context);

  //眼睛
  drawCircle(x - r / 1.7, y - r / 4, 8, 'fill', BLACK, context);
  drawCircle(x + r / 1.7, y - r / 4, 8, 'fill', BLACK, context);

  //嘴巴
  context.beginPath();
  context.strokeStyle = BLACK;
  context.lineWidth = r / 8;
  context.arc(x, y + r / 3, r / 2, 1 / 8 * Math.PI, 7 / 8 * Math.PI);
  context.stroke();
}

