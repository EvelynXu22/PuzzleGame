import * as draw from './draw.js';
import * as tools from './tools.js';
import * as levelMaps from "./level.js";
import { LevelPage } from "./levelPage.js";

const LEVEL_RADIUS = 50;
const ARROW_RADIUS = 80;
const ARRPW_PADDINNG = 20;
const COLOR_WHITE = '#fff';

class Map {

  translateX = 0;
  center = 'translateX(0)'

  //当前页面
  nowMap = 1;

  //章节完成比例
  finishPercent = [];

  //鼠标点击后是否移动
  b_isMouseMove = false;


  //canvasMap左右移动阈值
  leftLimit = 0;
  rightLimit = 0;

  constructor(map, finishLevel, b_isNext) {
    this.finishLevel = finishLevel;
    this.b_isNext = b_isNext;

    this.canvasMap = map.querySelector('.map-canvas');
    this.mapContext = this.canvasMap.getContext("2d");

    this.background = map.querySelector('.background');
    this.bgContext = this.background.getContext("2d");

    this.layer = map.querySelector('.layer');
    this.head = map.querySelectorAll('.head h1');
    this.headCanvas = map.querySelectorAll('.head h1 canvas');
    this.bgImg = map.querySelector('.bg-img');

    this.main();
  }

  /**
   * 从cookie获取游戏完成记录
   */
  cookieToMap() {
    let nextLevel = levelMaps.ALL_MAP[0][0];

    for (let j = 0, mapslen = levelMaps.ALL_MAP.length; j < mapslen; j++) {
      let finishCount = 0;
      let levelMap = levelMaps.ALL_MAP[j];
      for (let i = 0, maplen = levelMap.length; i < maplen; i++) {
        let nowLevel = levelMap[i];
        if (this.finishLevel != null) {

          // //当前完成关卡修改状态并记录在cookie中
          if (nowLevel.num == this.finishLevel) {

            //已完成 cookie记录为1
            tools.setCookie(nowLevel.num, 1);
            //未到当前章节的最后一关
            if (i < maplen - 1) {
              if (!tools.cookieHasKey(levelMap[i + 1].num)) {

                //激活下一关 cookie记录为-1
                tools.setCookie(levelMap[i + 1].num, -1);
              }
            }
            //到章节最后一关
            else {

              if (j < mapslen - 1) {
                if (!tools.cookieHasKey(levelMaps.ALL_MAP[j + 1][0].num.toString)) {

                  //激活下一关 cookie记录为-1
                  tools.setCookie(levelMaps.ALL_MAP[j + 1][0].num, -1);
                }
              }
              else {
                return
              }
            }

          }
        }
        //存在cookie ==> 解锁
        let value = tools.cookieHasKey(nowLevel.num.toString());
        if (value != null) {
          nowLevel.unlock = true;
          //cookie == 1 ==>已完成
          if (value == 1) {
            nowLevel.status = 1;
            finishCount++;
          }
          else {
            //只选择最靠前的激活未完成关卡
            if (nextLevel == levelMaps.ALL_MAP[0][0]) {
              nextLevel = nowLevel;
              this.nowMap = j + 1;
            }
          }
        }
      }
      //当前章节完成关卡比例
      this.finishPercent[j] = finishCount / levelMap.length;
    }
    return nextLevel;
  }

  /**
   * 显示页面
   */
  display(nextLevel) {
    this.updateHeadTransform(this.nowMap);
    draw.drawBackground(this.bgContext, this.background.width, this.background.height);
    draw.drawLevel(this.mapContext, levelMaps.ALL_MAP, LEVEL_RADIUS);
    draw.drawSmile(this.mapContext, nextLevel.pos, LEVEL_RADIUS * 0.75);
    draw.drawArrows(levelMaps.ARROWPOS, ARROW_RADIUS, this.mapContext);

    if (this.b_isNext) {
      this.levelPage = new LevelPage(map, this.height, nextLevel.level, nextLevel.num, nextLevel.status, levelMaps.MAP_NAME[this.nowMap - 1]);
    }


    this.translateX = this.width / 2 - nextLevel.pos.PosX;
    this.canvasMap.style.transform = 'translateX(' + this.translateX + 'px)';
  }

  /**
   * 获取当前浏览器窗口大小
   */
  getWindowSize() {

    //获取当前浏览器的长和宽
    this.width = document.documentElement.clientWidth;
    this.height = document.documentElement.clientHeight;

    //更新canvas的长和宽
    let lastestMap = levelMaps.ALL_MAP[levelMaps.ALL_MAP.length - 1];
    [this.canvasMap.width, this.canvasMap.height] =
      [lastestMap[lastestMap.length - 1].pos.PosX + this.width / 8, this.height];
    [this.background.width, this.background.height] = [this.width, this.height];
    [this.layer.width, this.layer.height] = [this.width, this.height];
    [this.bgImg.style.width, this.bgImg.style.height] = [this.width + 'px', this.height + 'px'];

    //更新标题移动位置
    this.translateXLeft = 'translateX(' + -this.width + 'px)';
    this.translateXRight = 'translateX(' + this.width + 'px)';

    let lastLevelMap = levelMaps.ALL_MAP[levelMaps.ALL_MAP.length - 1];
    this.rightLimit = this.width / 2 - lastLevelMap[lastLevelMap.length - 1].pos.PosX;
    this.leftLimit = this.width / 2 - levelMaps.ALL_MAP[0][0].pos.PosX;
  }


  /**
   * 移动Map
   * @param {Point} moveTouch 移动后点位
   * @param {Point} downTouch 触摸点位
   */
  moveMap(moveTouch, downTouch) {
    this.b_isMouseMove = true;
    this.translateX = this.translateX + moveTouch.PosX - downTouch.PosX;
    let lastLevelMap = levelMaps.ALL_MAP[levelMaps.ALL_MAP.length - 1];

    //左右侧平移后显示canva不少于1/3的浏览器窗口宽度
    if (this.translateX >= this.width / 3) {
      this.translateX = this.width / 3;
    }
    else if (this.translateX <= - lastLevelMap[lastLevelMap.length - 1].pos.PosX + this.width / 3) {
      this.translateX = - lastLevelMap[lastLevelMap.length - 1].pos.PosX + this.width / 3;
    }
    this.canvasMap.style.transform = 'translateX(' + this.translateX + 'px)';
    return moveTouch;
  }

  /**
   * 获取点击关卡
   * @param {Point} touch 接触点
   */
  getLevel(touch) {
    for (let i = 0, len = levelMaps.ALL_MAP.length; i < len; i++) {
      let levelMap = levelMaps.ALL_MAP[i];
      for (let i = 0, len = levelMap.length; i < len; i++) {
        if (levelMap[i].unlock == true) {
          let dir = tools.getDir(levelMap[i].pos, touch);
          if (dir <= LEVEL_RADIUS) {
            return levelMap[i];
          }
        }
      }
    }
  }

  /**
   * 调整地图显示位置
   */
  resetMap() {

    let backwardArrow = levelMaps.ARROWPOS[(this.nowMap - 1) * 2].PosX;

    //防止值溢出
    if (this.nowMap < 1) {
      this.nowMap = 1;
    }

    //最左边界
    if (this.translateX >= this.leftLimit) {
      this.translateX = this.leftLimit;
    }
    //最右边界
    else if (this.translateX < this.rightLimit) {
      this.translateX = this.rightLimit;
    }

    //后翻箭头
    else if (this.translateX >= -backwardArrow - ARROW_RADIUS - ARRPW_PADDINNG
      && this.translateX <= -backwardArrow + ARROW_RADIUS + ARRPW_PADDINNG) {
      this.translateX = -backwardArrow - ARROW_RADIUS - ARRPW_PADDINNG;
    }
    //向前翻页
    else if (this.nowMap != 1 && this.translateX > -backwardArrow + ARROW_RADIUS + ARRPW_PADDINNG) {
      this.pageUp();
    }

    //不是最后的Map
    else if (this.nowMap * 2 < levelMaps.ARROWPOS.length) {
      //前翻箭头
      if (this.translateX <= -levelMaps.ARROWPOS[this.nowMap * 2].PosX + this.width - ARROW_RADIUS - ARRPW_PADDINNG
        && this.translateX >= -levelMaps.ARROWPOS[this.nowMap * 2 + 1].PosX + this.width - ARROW_RADIUS) {
        this.translateX = -levelMaps.ARROWPOS[this.nowMap * 2].PosX + this.width - ARROW_RADIUS - ARRPW_PADDINNG;
      }
      //向后翻页
      else if (this.translateX < -levelMaps.ARROWPOS[this.nowMap * 2 + 1].PosX + this.width - ARROW_RADIUS) {
        this.pageDown();
      }
    }
    this.canvasMap.style.transform = 'translateX(' + this.translateX + 'px)';
  }

  /**
   * 响应翻页按键
   * @param {object} touch 触摸点坐标
   */
  getArrow(touch) {
    //不是最后Map
    if (this.nowMap * 2 < levelMaps.ARROWPOS.length) {
      let dir = tools.getDir(levelMaps.ARROWPOS[this.nowMap * 2], touch);
      //向后翻页
      if (dir <= ARROW_RADIUS) {
        this.pageDown();
      }
    }
    //不是第一Map
    if (this.nowMap > 1) {
      let dir = tools.getDir(levelMaps.ARROWPOS[this.nowMap * 2 - 1], touch);
      //向前翻页
      if (dir < ARROW_RADIUS) {
        this.pageUp();
      }

    }
  }

  /**
   * 向前翻页
   */
  pageUp() {
    this.nowMap--;
    this.translateX = -levelMaps.ARROWPOS[this.nowMap * 2].PosX + this.width - ARROW_RADIUS - ARRPW_PADDINNG;
    this.pageHeadTransform(false);
  }

  /**
   * 向后翻页
   */
  pageDown() {
    this.nowMap++;
    this.translateX = -levelMaps.ARROWPOS[this.nowMap * 2 - 1].PosX + ARROW_RADIUS + ARRPW_PADDINNG;
    this.pageHeadTransform(true);
  }

  /**
   * 移动标题
   * @param {bool} flag 移动方向 false==>向前 true==>向后
   */
  pageHeadTransform(flag) {
    for (let j = 0, headLen = this.head.length; j < headLen; j++) {
      if (this.head[j].classList.contains('center')) {
        this.head[j].setAttribute('class', 'is-transition');
        let [before, behind] = [j - 1 < 0 ? j + headLen - 1 : j - 1, j + 1 < headLen ? j + 1 : j - headLen + 1];
        if (flag) {
          this.head[behind].setAttribute('class', 'center is-transition');
          this.head[before].classList.remove('is-transition');
        }
        else {
          this.head[before].setAttribute('class', 'center is-transition');
          this.head[behind].classList.remove('is-transition');
        }
        this.updateHeadTransform(this.nowMap);
        break;
      }
    }
  }

  /**
   * 更新Map标题
   * @param {number} nowMap 现在所在Map索引
   */
  updateHeadTransform(nowMap) {
    let starSize = 10, fontSize = 25;
    let starY = starSize + 10, textX = starSize + 20, textY = fontSize + 5;

    for (let i = 0, mapLen = levelMaps.MAP_NAME.length; i < mapLen; i++) {
      if (i == nowMap - 1) {
        for (let j = 0, headLen = this.head.length; j < headLen; j++) {
          if (this.head[j].classList.contains('center')) {

            //获取左中右canvas需要显示内容的index
            let [jIndex1, jIndex2, jIndex3] = [j, j + 1 < headLen ? j + 1 : j - headLen + 1, j - 1 < 0 ? j + headLen - 1 : j - 1];
            let [iIndex1, iIndex2, iIndex3] = [i, i + 1, i - 1 < 0 ? i + mapLen - 1 : i - 1];

            //设置标题位置
            this.head[jIndex1].style.transform = this.center;
            this.head[jIndex2].style.transform = this.translateXRight;
            this.head[jIndex3].style.transform = this.translateXLeft;

            //更改标题
            this.head[jIndex1].firstChild.nodeValue = levelMaps.MAP_NAME[iIndex1];
            this.head[jIndex2].firstChild.nodeValue = levelMaps.MAP_NAME[iIndex2];
            this.head[jIndex3].firstChild.nodeValue = levelMaps.MAP_NAME[iIndex3];

            //获取canvas及context
            let [canvas1, canvas2, canvas3] = [
              this.headCanvas[jIndex1],
              this.headCanvas[jIndex2],
              this.headCanvas[jIndex3]
            ]
            let [context1, context2, context3] = [
              canvas1.getContext("2d"),
              canvas2.getContext("2d"),
              canvas3.getContext("2d")
            ]

            //清空canvas
            draw.clearCanvas(canvas1.width, canvas1.height, context1);
            draw.clearCanvas(canvas2.width, canvas2.height, context1);
            draw.clearCanvas(canvas3.width, canvas3.height, context1);

            //画星
            draw.drawStar(starSize, starY, starSize, context1);
            draw.drawStar(starSize, starY, starSize, context2);
            draw.drawStar(starSize, starY, starSize, context3);

            //百分比
            context1.font = fontSize + "px Verdana";
            context2.font = fontSize + "px Verdana";
            context3.font = fontSize + "px Verdana";
            context1.fillStyle = COLOR_WHITE;
            context2.fillStyle = COLOR_WHITE;
            context3.fillStyle = COLOR_WHITE;
            context1.fillText((this.finishPercent[iIndex1] * 100 + 0).toFixed(0) + '%', textX, textY);
            context2.fillText((this.finishPercent[iIndex2] * 100 + 0).toFixed(0) + '%', textX, textY);
            context3.fillText((this.finishPercent[iIndex3] * 100 + 0).toFixed(0) + '%', textX, textY);

            return;
          }
        }
      }
    }
  }


  /**
   * 绑定事件监听
   */
  bindListener() {
    let self = this;

    window.addEventListener('resize', () => {
      this.getWindowSize();
      this.display(this.cookieToMap(this.finishLevel));

      if (this.levelPage) {
        this.levelPage.resizelevelPage(this.height);
      }
    })


    //不是PC端
    if (!tools.isPC()) {
      this.layer.addEventListener('touchstart', (event) => {

        let self = this;

        //在layer上的触摸点坐标
        let downTouch = tools.Point(event.touches[0].pageX - this.translateX, event.touches[0].pageY);

        //检测是否选择关卡
        this.nowLevel = this.getLevel(downTouch);
        if (this.nowLevel != null) {
          this.levelPage = new LevelPage(map, this.height, this.nowLevel.level, this.nowLevel.num, this.nowLevel.status, levelMaps.MAP_NAME[this.nowMap - 1]);
        }

        //检测是否点击翻页箭头
        this.getArrow(downTouch);


        //添加touchmove事件
        this.layer.ontouchmove = function (event) {

          let moveTouch = tools.Point(event.touches[0].pageX - self.translateX, event.touches[0].pageY);

          //页面滑动
          downTouch = self.moveMap(moveTouch, downTouch);
        }
      });

      this.layer.addEventListener('touchend', (event) => {
        this.layer.onmousemove = null;

        //调整地图显示
        this.resetMap();

        //初始化鼠标移动状态标志
        this.b_isMouseMove = false;
      });
    }


    //是PC端
    else {
      this.layer.addEventListener('mousedown', (event) => {

        //在layer上的触摸点坐标
        let downTouch = tools.Point(event.clientX, event.clientY);

        //添加mousemove事件
        this.layer.onmousemove = function (event) {
          let moveTouch = tools.Point(event.clientX, event.clientY);

          //页面滑动
          downTouch = self.moveMap(moveTouch, downTouch);
        }
      });

      this.layer.addEventListener('mouseup', (event) => {
        this.layer.onmousemove = null;

        //鼠标点击后未移动才检测按键
        if (!this.b_isMouseMove) {
          //在canvasMap上的触摸点坐标
          let touch = tools.Point(event.clientX - this.translateX, event.clientY);
          //关卡按键
          this.nowLevel = this.getLevel(touch);
          if (this.nowLevel) {
            this.levelPage = new LevelPage(map, this.height, this.nowLevel.level, this.nowLevel.num, this.nowLevel.status, levelMaps.MAP_NAME[this.nowMap - 1]);
          }

          //翻页按键
          this.getArrow(touch);
        }

        //调整地图显示
        this.resetMap();

        //初始化鼠标移动状态标志
        this.b_isMouseMove = false;
      });

      //鼠标移出浏览器 清除mousemove事件
      this.layer.addEventListener('mouseout', (event) => {
        this.layer.onmousemove = null;
        this.resetMap();
      });
    }


  }


  main() {
    this.getWindowSize();
    this.display(this.cookieToMap(this.finishLevel));
    this.bindListener();

  }
}

let loc = location.href;
let index = loc.indexOf('=');
let substr = loc.substr(index + 1, loc.length);
let index2 = substr.indexOf('/n');
let b_isNext = false, finishLevel = null;

if (index2 != -1) {
  b_isNext = true;
  finishLevel = loc.substr(index + 1, index2);
}
else if (index != -1) {
  finishLevel = loc.substr(index + 1, loc.length);
}
new Map(document.getElementById('map'), finishLevel, b_isNext);
