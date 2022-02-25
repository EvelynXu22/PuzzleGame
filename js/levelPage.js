import * as draw from './draw.js';
import { isPC } from './tools.js';

class LevelPage {

  constructor(map, height, level, levelNum, status, nowMap) {

    this.level = level;
    this.status = status;
    this.nowMap = nowMap;

    this.levelPage = map.querySelector('.level-page');
    this.levelPageDiv = this.levelPage.firstElementChild;
    this.title = this.levelPageDiv.firstElementChild;
    this.start = this.levelPageDiv.lastElementChild;
    this.levelDiv = this.levelPageDiv.querySelector('.level>div');

    this.canvas = this.levelDiv.firstElementChild;
    this.canvasContext = this.canvas.getContext("2d");

    this.levelPage.style.top = 0 + '%';
    this.main(height, levelNum);
  }

  /**
   * 根据当前窗口调整页面大小
   * @param {number} height 当前视窗高度
   */
  resizelevelPage(height) {

    this.levelPageDiv.style.height = 400 + 'px';
    if (parseInt(this.levelPageDiv.style.height) > height) {
      this.levelPageDiv.style.height = height - 20 + 'px';
    }
    let divHeight = parseInt(this.levelPageDiv.style.height);
    this.levelPageDiv.style.width = divHeight / 1.2 + 'px';

    this.title.style.fontSize = divHeight * 0.1 + 'px';
    this.start.style.fontSize = divHeight * 0.1 + 'px';

    let levelWidth = divHeight * 0.4 + 'px';
    this.levelDiv.style.width = levelWidth;
    this.levelDiv.style.height = levelWidth;
    this.canvas.height = divHeight / 1.7;

    this.displayLevel(this.status);
  }

  bindListener(levelNum) {

    //PC端
    if (isPC()) {
      this.levelPage.addEventListener('click', (event) => {
        let className = event.target.className;
        switch (className) {
          case 'level-page flex-center':
            this.levelPage.style.top = 100 + '%';
            break;
          case 'start flex-center':
            location.href = 'index.html?=' + this.level + '/' + levelNum;
            break;
        }

      });
    }
    //非PC端
    else {
      this.levelPage.addEventListener('touchstart', (event) => {
        let className = event.target.className;
        switch (className) {
          case 'level-page flex-center':
            this.levelPage.style.top = 100 + '%';
            break;
          case 'start flex-center':
            location.href = 'index.html?=' + this.level + '/' + levelNum;
            break;
        }
      });
    }
  }

  displayLevel(status) {
    let num = parseInt(this.level);

    let [canvasWidth, canvasHeight] = [this.canvas.width, this.canvas.height];
    if (status == 1) {
      draw.drawStar(canvasWidth / 2, canvasHeight * 0.18, canvasHeight * 0.16, this.canvasContext);
    }

    this.title.firstChild.nodeValue = this.nowMap;

    //level为number+string形式
    if (typeof (num) == "number" && !isNaN(num)) {
      draw.printText(num, canvasWidth / 2, canvasHeight / 1.8, canvasHeight / 3, this.canvasContext);
      let textWidth = this.canvasContext.measureText(num).width / 2;
      draw.printText(
        this.level.substring(num.toString().length, this.level.length),
        canvasWidth / 2 + textWidth + 15,
        canvasHeight / 2.4,
        canvasHeight / 6,
        this.canvasContext
      );
    }

    //level为string形式
    else {
      draw.printText(this.level, canvasWidth / 2, canvasHeight / 1.8, canvasHeight / 2.5, this.canvasContext);
    }
  }


  main(height, levelNum) {
    this.resizelevelPage(height);
    this.bindListener(levelNum);
    this.displayLevel(this.status);

  }


}

export { LevelPage };