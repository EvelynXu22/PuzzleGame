import * as tools from './tools.js';
import * as draw from './draw.js';
import { LevelMap } from "./levelMap.js";
import { BtnPos } from "./buttonPos.js";
import { Bfs } from './bfs.js';
import { SuccessPage } from './successPage.js';

//按钮变化
const OUTSIDERADIUS_SIZE_DECREAMENT = 116;
const INSIDERADIUS_SIZE_DECREAMENT = 7;
const INSIDERADIUS_SIZE_INCREAMENT = 7.5;

//进度条top
const TOPBAR = 50;

class PuzzleGame {
  //#region 属性

  //关卡所有点数
  countDots = 0;

  //按钮半径
  buttonRadius = 20;

  //网格线宽
  gridWidth = 2;

  //路径线宽
  roadWidth = 10;

  //点半径
  dotsRadius = 5;

  //关卡矩阵
  levelMap = [];

  //按钮位置
  btnPos = [];

  //点位置坐标
  dotsPos = [];

  //绘制矩阵
  drawMap = [];

  //当前绘制路径
  road = [];

  //所有已绘制路径
  roads = [];

  //激活按钮
  nowPoint = null;

  //接触点（包括激活按钮）
  endPoint = null;

  //接触Dot
  dots = null;

  //当前绘制路径是否链接
  b_isLinked = true;

  //Dots闪烁定时器
  timer = null;

  //Dots闪烁半径
  dotsRadiusChange = 0;

  //Dots闪烁半径改变单位
  dotUnit = 0

  //已连接数量
  countLinked = 0;

  //上一次计算已绘制点数量
  lastCount = 0;

  //完成百分比
  percent = 0;

  //进度条更新目标百分比
  target = 0;

  //进度条更新定时器
  barTimer = null;

  //选择按钮定时器
  selectTimer = null;

  // 按钮1和2是否被选中
  b_isBtn1Selected = false;
  b_isBtn2Selected = false;

  //是否成功完成
  b_isSuccess = false;

  level = new LevelMap();
  btn = new BtnPos();
  bfs = new Bfs();

  //#endregion

  constructor(puzzlegame, levelName = '1st', levelNum = 1) {
    this.levelName = levelName;
    this.levelNum = levelNum;
    this.puzzlegame = puzzlegame;

    this.levelMap = this.level.getLevel(levelNum);
    this.btnPos = this.btn.getLevel(levelNum);

    this.bgImg = puzzlegame.querySelector('.bg-img');
    //获取canvas
    this.canvas = this.puzzlegame.querySelector('.game-canvas');
    this.bar = this.puzzlegame.querySelector('.bar');
    this.grid = this.puzzlegame.querySelector('.grid');
    this.background = this.puzzlegame.querySelector('.background');

    //获取context
    this.canvasContext = this.canvas.getContext("2d");
    this.barContext = this.bar.getContext("2d");
    this.gridContext = this.grid.getContext("2d");
    this.bgContext = this.background.getContext("2d");

    //同步drawMap和当前levelMap
    //计算当前level的Dots数量
    for (let i = 0, len = this.levelMap.length; i < len; i++) {
      this.drawMap[i] = [];
      for (let j = 0; j < this.levelMap.length; j++) {
        this.drawMap[i][j] = this.levelMap[i][j];
        if (this.levelMap[i][j] != -1) {
          this.countDots++;
        }
      }
    }

    this.getWindowSize();
    this.main();
  }

  /**
   * 获取窗口大小 调整Canvas大小
   */
  getWindowSize() {
    let temp;

    //当前窗口大小
    this.width = document.documentElement.clientWidth;
    this.height = document.documentElement.clientHeight;

    //根据当前窗口大小改变canvas和背景图
    [this.grid.width, this.grid.height] = [this.width, this.height];
    [this.bar.width, this.bar.height] = [this.width, this.height];
    [this.canvas.width, this.canvas.height] = [this.width, this.height];
    [this.background.width, this.background.height] = [this.width, this.height];
    [this.bgImg.style.width, this.bgImg.style.height] = [this.width + 'px', this.height + 'px'];

    //获取最短边
    temp = this.height * 0.8;
    this.side = this.width < temp ? this.width : temp;

    temp = this.side * 0.05;
    this.buttonRadius = temp;
    this.roadWidth = temp;

    temp = this.side * 0.014;
    this.dotsRadius = temp;
    this.dotsRadiusChange = temp;

    this.gridWidth = this.side * 0.005;
    this.dotUnit = -this.dotsRadius * 0.01;

    if (this.b_isSuccess) {
      this.successPage.resizeSuccessPage(this.height);
    }
  }

  /**
   * 刷新显示
   */
  display() {
    draw.clearCanvas(this.canvas.width, this.canvas.height, this.canvasContext);
    this.dotsPos = tools.countDotsPos(this.width, this.height, this.side, this.levelMap.length, TOPBAR);
    draw.drawBackground(this.bgContext, this.background.width, this.background.height);
    draw.drawBtns(this.btnPos, this.dotsPos, this.buttonRadius, this.roads, this.canvasContext);
    draw.drawGrid(this.dotsPos, this.levelMap, this.dotsRadius, this.gridWidth, this.gridContext, this.grid.width, this.grid.height);
    draw.drawProgressBar(this.width - TOPBAR * 2, TOPBAR, this.percent, this.barContext, this.bar.width, this.bar.height);
    if (this.roads.length != 0)
      draw.drawRoads(this.roads, this.dotsPos, this.roadWidth, this.buttonRadius, this.drawMap, this.canvasContext);
  }

  /**
   * 获取选中按钮==>nowPoint
   */
  getSeletctBtn(touch) {
    for (let i = 0, len = this.btnPos.length; i < len; i++) {

      let [point1, point2] = [this.btnPos[i].Point1, this.btnPos[i].Point2]
      let { PosX: pos1x, PosY: pos1y } = point1;
      let { PosX: pos2x, PosY: pos2y } = point2;

      let [pos1, pos2] = [this.dotsPos[pos1x][pos1y], this.dotsPos[pos2x][pos2y]]
      let [dir1, dir2] = [tools.getDir(pos1, touch), tools.getDir(pos2, touch)];

      if (dir1 < this.buttonRadius + 2) {
        this.nowPoint = tools.btnPoint(point1, point2, pos1, pos2, this.btnPos[i].Key)
        return;
      }
      else if (dir2 < this.buttonRadius + 2) {
        this.nowPoint = tools.btnPoint(point2, point1, pos2, pos1, this.btnPos[i].Key)
        return;
      }

    }
  }


  /**
   * 选中按钮放大 接触位置显示
   * @param {object} pos1 选中按钮1位置
   * @param {object} pos2 选中按钮2位置
   * @param {string} key 按钮颜色
   * @param {object} touch 接触位置 
   */
  select(pos1, pos2, key, touch) {
    let insideRadius = this.buttonRadius;
    let maxRadius = this.buttonRadius + INSIDERADIUS_SIZE_DECREAMENT;

    //获取按钮颜色 并生成相应的透明色
    let keyArr = key.split(',');
    keyArr.pop();
    keyArr.push('0.2)');
    let newColor = keyArr.join(',');

    this.b_isBtn1Selected = true;
    this.b_isBtn2Selected = true;

    this.display();
    draw.drawCircle(touch.PosX, touch.PosY, this.buttonRadius + OUTSIDERADIUS_SIZE_DECREAMENT, 'fill', newColor, this.canvasContext);


    if (this.selectTimer) {
      clearInterval(this.selectTimer);
    }

    this.selectTimer = setInterval(() => {
      insideRadius += 0.8;

      draw.drawSingleBtn(pos1, insideRadius, key, this.b_isLinked, this.canvasContext);
      draw.drawSingleBtn(pos2, insideRadius, key, this.b_isLinked, this.canvasContext);

      if (insideRadius > maxRadius) {
        clearInterval(this.selectTimer);
        this.selectTimer = null;
      }
    }, 1);

  }

  /**
   * 松开接触后按钮恢复
   */
  selectEnd() {
    let insideRadius = this.buttonRadius + INSIDERADIUS_SIZE_INCREAMENT;
    let { pos1, pos2, key } = this.nowPoint;

    //两个都需要恢复
    if (this.b_isBtn1Selected && this.b_isBtn2Selected) {
      if (this.selectTimer) {
        clearInterval(this.selectTimer);
      }
      this.selectTimer = setInterval(() => {
        this.display();
        insideRadius -= 0.8;
        draw.drawSingleBtn(pos1, insideRadius, key, this.b_isLinked, this.canvasContext);
        draw.drawSingleBtn(pos2, insideRadius, key, this.b_isLinked, this.canvasContext);

        if (insideRadius < this.buttonRadius) {
          clearInterval(this.selectTimer);
          this.selectTimer = null;
        }
      }, 1);
    }
    //按钮1
    else if (this.b_isBtn1Selected) {
      if (this.selectTimer) {
        clearInterval(this.selectTimer);
      }
      this.selectTimer = setInterval(() => {
        this.display();
        insideRadius -= 0.8;
        draw.drawSingleBtn(pos1, insideRadius, key, this.b_isLinked, this.canvasContext);

        if (insideRadius < this.buttonRadius) {
          clearInterval(this.selectTimer);
          this.selectTimer = null;
        }
      }, 1);
    }
    //按钮2
    else if (this.b_isBtn2Selected) {
      if (this.selectTimer) {
        clearInterval(this.selectTimer);
      }
      this.selectTimer = setInterval(() => {
        this.display();
        insideRadius -= 0.8;
        draw.drawSingleBtn(pos2, insideRadius, key, this.b_isLinked, this.canvasContext);

        if (insideRadius < this.buttonRadius) {
          clearInterval(this.selectTimer);
          this.selectTimer = null;
        }
      }, 1);
    }
    //无
    else {
      this.display();
    }
  }

  /**
   *  移动时检查更新按钮状态 更新接触位置显示
   * @param {object} touch 接触位置
   */
  selectmove(touch) {
    let { pos1, pos2, key } = this.nowPoint;

    //获取按钮颜色 并生成相应的透明色
    let keyArr = key.split(',');
    keyArr.pop();
    keyArr.push('0.2)');
    let newColor = keyArr.join(',');

    this.display();
    let { PosX: endx, PosY: endy } = this.endPoint;
    let { PosX: nowx, PosY: nowy } = this.nowPoint.btnPos1;

    //判断按钮1
    if (this.endPoint && endx == nowx && endy == nowy) {
      draw.drawSingleBtn(pos1, this.buttonRadius + INSIDERADIUS_SIZE_INCREAMENT - 0.2, key, this.b_isLinked, this.canvasContext);
    }
    else {
      //如果放大还未完成则直接终止
      if (this.selectTimer) {
        clearInterval(this.selectTimer);
      }
      this.b_isBtn1Selected = false;
      draw.drawSingleBtn(pos1, this.buttonRadius, key, this.b_isLinked, this.canvasContext);
    }

    //判断按钮2
    if (this.endPoint && !this.b_isLinked) {
      this.b_isBtn2Selected = false;
      draw.drawSingleBtn(pos2, this.buttonRadius, key, this.b_isLinked, this.canvasContext);
    }
    else {

      //如果放大还未完成则直接终止
      if (this.selectTimer) {
        clearInterval(this.selectTimer);
      }
      draw.drawSingleBtn(pos2, this.buttonRadius + INSIDERADIUS_SIZE_INCREAMENT - 0.2, key, this.b_isLinked, this.canvasContext);
    }

    //显示触摸位置
    draw.drawCircle(touch.PosX, touch.PosY, this.buttonRadius + OUTSIDERADIUS_SIZE_DECREAMENT, 'fill', newColor, this.canvasContext);

  }

  /**
   * 根据接触位置计算接触点==>endPoint
   * @param {object} touch 接触位置
   */
  getTouchedDots(touch) {
    let { PosX, PosY } = this.nowPoint.btnPos1;
    let gap = this.side / (this.levelMap.length * 2);

    for (let i = 0, len = this.levelMap.length; i < len; i++) {
      for (let j = 0; j < len; j++) {
        let levelmapValue = this.levelMap[i][j];

        //有Dot或当前激活按钮
        if (levelmapValue == 0 || levelmapValue == this.levelMap[PosX][PosY]) {
          let dir = tools.getDir(this.dotsPos[i][j], touch);
          if (dir < gap) {
            this.endPoint = tools.Point(i, j);
            return;
          }
        }
      }
    }
  }

  /**
   * 获取当前接触点
   */
  getDots(touch) {
    for (let i = 0, len = this.levelMap.length; i < len; i++) {
      for (let j = 0; j < len; j++) {

        //当前关卡为Dot
        if (this.levelMap[i][j] == 0) {
          let dir = tools.getDir(this.dotsPos[i][j], touch);
          if (dir < this.side / (this.levelMap.length * 2)) {
            return tools.Point(i, j);
          }
        }
      }
    }
  }


  /**
   * 选择已经有Road的Button 清空已有Road
   */
  checkRoads() {
    let [nowBtn1, nowBtn2] = [this.nowPoint.btnPos1, this.nowPoint.btnPos2];
    for (let i = 0, len = this.roads.length; i < len; i++) {
      let road = this.roads[i];
      let roadPath = road.road;
      let [roadBtn1, roadBtn2] = [road.nowPoint.btnPos1, road.nowPoint.btnPos2];

      //点激活按钮对中的其中一个
      if ((nowBtn1.PosX == roadBtn1.PosX && nowBtn1.PosY == roadBtn1.PosY) ||
        (nowBtn1.PosX == roadBtn2.PosX && nowBtn1.PosY == roadBtn2.PosY)) {

        this.roads.splice(i, 1);

        //同步drawMap
        for (let j = 0, len = roadPath.length; j < len; j++) {
          this.drawMap[roadPath[j].x][roadPath[j].y] = this.levelMap[roadPath[j].x][roadPath[j].y]
        }
        this.display();
        break;
      }
    }
  }

  /**
   * 统计已绘制点数
   */
  isFilled() {
    let count = 0;
    this.countLinked = 0;
    //计算已绘制点
    for (let i = 0, len = this.drawMap.length; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if (this.drawMap[i][j] > 0 && this.drawMap[i][j] != this.levelMap[i][j]) {
          count++;
        }
      }
    }

    //已绘制的按钮的点
    for (let i = 0, len = this.roads.length; i < len; i++) {
      let road = this.roads[i].road;
      if (road.length < 2) {
        continue;
      }
      count++;
      for (let j = 0, btnLen = this.btnPos.length; j < btnLen; j++) {

        let [startx, starty, endx, endy] = [
          road[0].x,
          road[0].y,
          road[road.length - 1].x,
          road[road.length - 1].y
        ]
        let [btn1x, btn1y, btn2x, btn2y] = [
          this.btnPos[j].Point1.PosX,
          this.btnPos[j].Point1.PosY,
          this.btnPos[j].Point2.PosX,
          this.btnPos[j].Point2.PosY
        ]

        if ((endx == btn1x && endy == btn1y) || (endx == btn2x && endy == btn2y)) {
          count++;
          this.countLinked++;
        }
      }
    }

    //正在绘制路径的点
    if (this.road.length > 1) {
      if (this.road.length == 2) {
        count++;
      }
      else {
        count++;
        for (let j = 0, btnLen = this.btnPos.length; j < btnLen; j++) {
          let [startx, starty, endx, endy] = [
            this.road[0].x,
            this.road[0].y,
            this.road[this.road.length - 1].x,
            this.road[this.road.length - 1].y
          ]
          let [btn1x, btn1y, btn2x, btn2y] = [
            this.btnPos[j].Point1.PosX,
            this.btnPos[j].Point1.PosY,
            this.btnPos[j].Point2.PosX,
            this.btnPos[j].Point2.PosY
          ]

          if ((endx == btn1x && endy == btn1y) || (endx == btn2x && endy == btn2y)) {
            count++;
            this.countLinked++;
            break;
          }
        }
      }
    }
    return count;
  }


  /**
   * 更新进度条
   * @param {number} count 已绘制点数
   */
  updateProgressBar(count) {

    //更新单位
    let unit = 0.005;

    //目标百分比
    this.target = count / this.countDots;

    //如果目标半分比小于当前百分比 更新单位向负方向
    if (this.target - this.percent < 0) {
      unit = -0.005;
    }

    //当前无定时器
    if (this.barTimer == null) {
      this.barTimer = setInterval(() => {
        this.percent += unit;
        draw.drawProgressBar(this.width - TOPBAR * 2, TOPBAR, this.percent, this.barContext, this.bar.width, this.bar.height);

        //单位正方向
        if (unit > 0) {

          //当前百分比达到目标百分比
          if (this.percent >= this.target) {

            //清除定时器
            clearInterval(this.barTimer);
            this.barTimer = null;
          }
        }
        //单位负方向
        else {

          //当前百分比达到目标百分比
          if (this.percent <= this.target) {

            //清除定时器
            clearInterval(this.barTimer);
            this.barTimer = null;
          }
        }
      }, 20);
    }
  }

  /**
   * 按下动作
   * @param {Point} touchPoint 接触点
   */
  downAction(touchPoint) {
    this.b_isLinked = true;
    //获取选择按钮
    this.getSeletctBtn(touchPoint, this.btnPos);
    if (this.nowPoint != null) {
      this.select(this.nowPoint.pos1, this.nowPoint.pos2, this.nowPoint.key, touchPoint);
      this.checkRoads();
      this.select(this.nowPoint.pos1, this.nowPoint.pos2, this.nowPoint.key, touchPoint);
    }

    //获取选择Dot
    let dot = this.getDots(touchPoint);

    if (dot != null && this.nowPoint == null) {
      for (let i = 0, len = this.roads.length; i < len; i++) {
        let road = this.roads[i];
        if (this.levelMap[road.nowPoint.btnPos1.PosX][road.nowPoint.btnPos1.PosY] == this.drawMap[dot.PosX][dot.PosY]) {
          let roadPath = road.road;
          for (let j = 0, pathlen = roadPath.length; j < pathlen; j++) {
            if (roadPath[j].x == dot.PosX && roadPath[j].y == dot.PosY) {
              this.endPoint = dot;
              this.road = roadPath;
              this.nowPoint = road.nowPoint;
              break;
            }
          }
        }
      }

      if (this.endPoint !== null) {
        //回退
        this.bfs.rollbackRoad(this.road, this.endPoint, this.drawMap, this.levelMap, this.roads);

        //绘制接触点及回退路径
        this.selectmove(touchPoint);
        draw.drawRoad(this.road, this.nowPoint, this.b_isLinked, this.dotsPos, this.roadWidth, this.buttonRadius, this.drawMap, this.canvasContext);
      }
      // }
    }

    this.checkStatue();
  }

  /**
   * 移动动作
   * @param {Point} movePoint 移动点
   */
  moveAction(movePoint) {
    if (this.nowPoint != null) {
      this.getTouchedDots(movePoint)
      this.selectmove(movePoint);

      //从按钮开始 先推按钮位置入栈
      if (this.endPoint != null) {
        if (this.road.length == 0) {
          this.road.push(this.bfs.Point(this.nowPoint.btnPos1.PosX, this.nowPoint.btnPos1.PosY));
        }

        //离开当前点
        else if (this.endPoint.PosX != this.road[this.road.length - 1].x ||
          this.endPoint.PosY != this.road[this.road.length - 1].y) {

          //颜色相同且不是当前选择按钮
          if (this.drawMap[this.endPoint.PosX][this.endPoint.PosY] == this.levelMap[this.nowPoint.btnPos1.PosX][this.nowPoint.btnPos1.PosY] &&
            (this.endPoint.PosX != this.nowPoint.btnPos2.PosX ||
              this.endPoint.PosY != this.nowPoint.btnPos2.PosY)) {

            //回退
            this.bfs.rollbackRoad(this.road, this.endPoint, this.drawMap, this.levelMap, this.roads);
            this.b_isLinked = true;

          }

          else if (this.b_isLinked) {

            this.bfs.findRoad(this.road, this.road[this.road.length - 1].x, this.road[this.road.length - 1].y, this.endPoint.PosX, this.endPoint.PosY, this.drawMap, this.levelMap, this.nowPoint.btnPos1);

            //road的最后一个点是按钮 则连接成功
            let end = this.road[this.road.length - 1];
            if (end.x == this.nowPoint.btnPos2.PosX && end.y == this.nowPoint.btnPos2.PosY) {
              this.b_isLinked = false;
            }

            //是否有断点生成
            if (this.bfs.breakPoints.length > 0) {
              this.bfs.breakRoad(this.roads, this.levelMap, this.drawMap);
            }
          }
        }

        draw.drawRoad(this.road, this.nowPoint, this.b_isLinked, this.dotsPos, this.roadWidth, this.buttonRadius, this.drawMap, this.canvasContext);
        this.checkStatue();
      }
    }
  }

  /**
   * 检查当前状态
   */
  checkStatue() {
    let count = this.isFilled();
    let self = this;

    //绘制点数改变则更新进度条
    if (this.lastCount != count) {
      this.updateProgressBar(count);
      this.lastCount = count;
    }

    //没有填满但按钮均链接 闪烁提示
    if (this.lastCount != this.countDots && this.countLinked == this.btnPos.length && !this.timer) {
      this.dotsRadiusChange = this.dotsRadius;
      this.dotUnit = -this.dotsRadius * 0.1;
      let max = this.dotsRadius * 1.3;

      this.timer = setInterval(function () {
        if (self.dotsRadiusChange <= self.dotsRadius) {
          self.dotUnit = -self.dotUnit;
        }
        else if (self.dotsRadiusChange > max) {
          self.dotUnit = -self.dotUnit;
        }
        self.dotsRadiusChange += self.dotUnit;
        draw.drawGrid(self.dotsPos, self.levelMap, self.dotsRadiusChange, self.gridWidth, self.gridContext, self.grid.width, self.grid.height);
      }, 60);
    }

    //按钮未链接 闪烁结束
    else if (this.countLinked != this.btnPos.length && this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    //填满则弹出成功页面
    else if (this.lastCount == this.countDots) {
      this.b_isSuccess = true;
      this.successPage = new SuccessPage(this.puzzlegame, this.height, this.levelName, this.levelNum);
    }
  }

  /**
   * 鼠标按下执行方法
   * @param {*} event 
   */
  mouseDown(event) {

    //获取touch坐标
    let touchPoint = tools.Point(event.clientX, event.clientY);

    //按下时动作
    this.downAction(touchPoint);

    this.canvas.addEventListener('mousemove', (event) => {
      this.mouseMove(event);
    });
  }

  /**
   * 鼠标移动执行方法
   * @param {*} event 
   */
  mouseMove(event) {
    let movePoint = tools.Point(event.clientX, event.clientY);
    this.moveAction(movePoint);
  }

  /**
   * 鼠标抬起执行方法
   */
  mouseUp() {
    if (this.nowPoint != null) {
      if (this.endPoint != null) {

        //记录当前绘制路径
        this.roads.push({
          road: this.road,
          endPoint: this.endPoint,
          nowPoint: this.nowPoint,
          linked: this.b_isLinked
        });
      }

      //按钮恢复
      this.selectEnd();

      //初始化参数
      this.endPoint = null;
      this.bfs.road.length = 0;
      this.road = [];
      this.nowPoint = null;
    }
  }

  /**
   * 触摸开始执行方法
   * @param {*} event 
   */
  touchDown(event) {
    let [touchX, touchY] = [event.touches[0].pageX, event.touches[0].pageY];
    let touchPoint = tools.Point(touchX, touchY);

    this.downAction(touchPoint);

    this.canvas.addEventListener('touchmove', (event) => {
      this.touchMove(event);
    });
  }

  /**
   * 触摸移动执行方法
   * @param {*} event 
   */
  touchMove(event) {
    let [touchX, touchY] = [event.touches[0].pageX, event.touches[0].pageY];
    let movePoint = tools.Point(touchX, touchY);
    this.moveAction(movePoint);
  }


  /**
   * 绑定事件
   */
  bindListener() {
    let self = this;

    //不是PC端
    if (!tools.isPC()) {
      this.canvas.addEventListener('touchstart', (event) => {
        console.log('touchstart')
        this.touchDown(event);
      });

      this.canvas.addEventListener('touchend', (event) => {
        this.mouseUp(event);
      });
      //#endregion
    }

    //是PC端
    else {
      this.canvas.addEventListener('mousedown', (event) => {
        console.log('mouseDown');
        this.mouseDown(event);

      });

      this.canvas.addEventListener('mouseup', () => {
        this.mouseUp();
      });

      this.canvas.addEventListener('dblclick', (event) => {
        event.preventDefault();
      })
    }

    window.addEventListener('resize', () => {
      this.getWindowSize();
      this.display();
    })

  }


  main() {
    this.display();
    this.bindListener();
  }
}

let loc = location.href;

let index = loc.indexOf('=');
let substr = loc.substring(index + 1, loc.length);
let index2 = substr.indexOf('/');
let levelName, levelNum;

if (index != -1 && index2 != -1) {
  levelName = substr.substring(0, index2);
  levelNum = substr.substring(index2 + 1, substr.length);
}

new PuzzleGame(document.getElementById('puzzle-game'), levelName, levelNum);

export { PuzzleGame };
