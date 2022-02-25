import * as draw from './draw.js';

class SuccessPage {
  // levelNum = 2;

  constructor(puzzlegame, height, level, levelNum) {

    this.levelNum = levelNum;
    this.level = level;

    this.successPage = puzzlegame.querySelector('.success-page');
    this.successPageDiv = this.successPage.querySelector('div');
    this.successPageLevel = this.successPage.querySelector('div .level');
    this.successPageLevelDiv = this.successPageLevel.firstElementChild;
    this.successPageLevelDivCanvas = this.successPageLevelDiv.firstElementChild;
    this.successPageTryAgain = this.successPage.querySelector('div .try-again');
    this.successPageNext = this.successPage.querySelector('div .next');
    this.successPageMap = this.successPage.querySelector('div .map');

    this.successPageLevelDivCanvasContext = this.successPageLevelDivCanvas.getContext("2d");

    // this.successPage.style.display = 'flex';
    this.successPage.style.top = 0 + '%';
    this.main(height);
  }

  /**
   * 根据当前窗口调整页面大小
   * @param {number} height 当前视窗高度
   */
  resizeSuccessPage(height) {
    this.successPageDiv.style.height = 550 + 'px';
    if (parseInt(this.successPageDiv.style.height) > height) {
      this.successPageDiv.style.height = height - 20 + 'px';
    }
    let divHeight = parseInt(this.successPageDiv.style.height);
    this.successPageDiv.style.width = divHeight / 1.5 + 'px';

    this.successPageLevelDivCanvas.height = divHeight / 2.3;

    this.successPageLevelDiv.style.borderWidth = divHeight * 0.014 + 'px';
    let levelDivWidth = divHeight * 0.3 + 'px';
    this.successPageLevelDiv.style.width = levelDivWidth;
    this.successPageLevelDiv.style.height = levelDivWidth;

    this.successPageDiv.style.fontSize = divHeight * 0.081 + 'px';
    this.successPageLevel.style.fontSize = divHeight * 0.12 + 'px';
    this.successPageTryAgain.style.fontSize = divHeight * 0.054 + 'px';
    this.successPageMap.style.fontSize = divHeight * 0.054 + 'px';
    this.successPageNext.style.fontSize = divHeight * 0.072 + 'px';

    this.displayLevel();
  }

  bindListener() {
    this.successPage.addEventListener('click', (event) => {
      let className = event.target.className;
      switch (className) {
        case 'try-again':
          location.reload();
          break;
        case 'next':
          location.href = 'map.html?=' + this.levelNum + '/n';
          break;
        case 'map':
          location.href = 'map.html?=' + this.levelNum;
          break;
      }
    });
  }

  displayLevel() {
    let num = parseInt(this.level);
    let [canvasWidth, canvasHeight] = [this.successPageLevelDivCanvas.width, this.successPageLevelDivCanvas.height];
    draw.drawStar(canvasWidth / 2, canvasHeight * 0.18, canvasHeight * 0.16, this.successPageLevelDivCanvasContext);

    //level为number+string形式
    if (typeof (num) == "number" && !isNaN(num)) {

      draw.printText(num, canvasWidth / 2, canvasHeight / 1.8, canvasHeight / 3, this.successPageLevelDivCanvasContext);
      let textWidth = this.successPageLevelDivCanvasContext.measureText(num).width / 2;
      draw.printText(
        this.level.substring(num.toString().length, this.level.length),
        canvasWidth / 2 + textWidth * 2,
        canvasHeight / 2.4,
        canvasHeight / 6,
        this.successPageLevelDivCanvasContext
      );
    }

    //level为string形式
    else {
      draw.printText(this.level, canvasWidth / 2, canvasHeight / 1.8, canvasHeight / 2.5, this.successPageLevelDivCanvasContext);
    }
  }


  main(height) {
    this.resizeSuccessPage(height);
    this.bindListener();
    this.displayLevel();

  }


}

export { SuccessPage };