class Bfs {
  dx = [0, 1, 0, -1];
  dy = [1, 0, -1, 0];

  //正向记录层数
  dis1 = [];
  //逆向记录层数
  dis2 = [];
  //记录是不是在最短路上
  mark = [];

  //先进先出队列
  que = [];

  drawMap = [];
  levelMap = [];
  startPoint = {};

  road = [];
  road2 = [];
  breakPoints = [];

  minroad = 0;
  n = 0;
  countTrue = 0;

  Point(x, y) {
    let point = {
      x,
      y
    }
    return point;
  }

  constructor() {
  }

  //广度优先
  bfs(dis, startx, starty, endx, endy) {

    for (let i = 0; i < this.n; i++) {
      dis[i] = [];
      this.mark[i] = [];
      for (let j = 0; j < this.n; j++) {
        dis[i][j] = -1;
        this.mark[i][j] = false;
      }
    }

    this.que.push(this.Point(startx, starty));
    dis[startx][starty] = 0;

    while (this.que.length != 0) {
      let cur = this.que[0];

      this.que.shift();
      for (let i = 0; i < 4; i++) {

        let nxt = this.Point(cur.x + this.dx[i], cur.y + this.dy[i]);

        if (nxt.x >= 0 && nxt.x < this.n && nxt.y >= 0 && nxt.y < this.n) {

          if ((this.levelMap[nxt.x][nxt.y] == 0
            && this.drawMap[nxt.x][nxt.y] != this.levelMap[this.startPoint.x][this.startPoint.y])
            || (nxt.x == endx && nxt.y == endy)) {
            if (dis[nxt.x][nxt.y] == -1) {
              if (nxt.x == endx && nxt.y == endy) {
                this.minroad = dis[cur.x][cur.y] + 1;
                this.que = [];
                return;
              }
              else {
                this.que.push(nxt);
                dis[nxt.x][nxt.y] = dis[cur.x][cur.y] + 1;
              }
            }
          }
          else {
            continue;
          }
        }

      }

    }
  }

  //输出路径坐标road
  Print(x, y, road) {

    road.push(this.Point(x, y));
    for (let i = 0; i < 4; i++) {
      let nx = x + this.dx[i];
      let ny = y + this.dy[i];

      if (nx < 0 || nx >= this.n || ny < 0 || ny >= this.n || this.drawMap[nx][ny] == '-1') {
        continue;
      }

      if (this.dis1[nx][ny] < this.dis1[x][y]) continue;

      if (this.mark[nx][ny]) {
        this.countTrue++;
        this.Print(nx, ny, road);
        break;
      }

    }

  }

  /**找最短路径
   * 
   * @param {number} startx 开始x坐标
   * @param {number} starty 开始y坐标
   * @param {number} endx 结束x坐标
   * @param {number} endy 结束y坐标
   * @param {array} drawMap 当前绘制矩阵
   * @param {array} levelMap 关卡矩阵
   * @param {object} btn1 当前激活按钮
   */
  findRoad(road, startx, starty, endx, endy, drawMap, levelMap, btn1) {
    this.n = drawMap.length;
    this.drawMap = drawMap;
    this.levelMap = levelMap;
    this.countTrue = 0;
    this.breakPoints = [];
    this.startPoint = this.Point(btn1.PosX, btn1.PosY);

    this.bfs(this.dis1, startx, starty, endx, endy);
    this.bfs(this.dis2, endx, endy, startx, starty);

    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        if (this.dis1[i][j] == -1 || this.dis2[i][j] == -1) {
          continue;
        }
        if (this.dis1[i][j] + this.dis2[i][j] == this.minroad) {
          this.mark[i][j] = true;
        }
      }
    }

    //前一次有路径则去掉上一次结尾
    if (road.length > 0) {
      road.pop();
    }

    this.Print(startx, starty, road);

    //存在长度大于1的最短路径 或 仅移动当前位置的上下左右为空或同色
    if (this.countTrue != 0 ||
      ((Math.abs(startx - endx) + Math.abs(starty - endy) == 1) &&
        (this.drawMap[endx][endy] == levelMap[this.startPoint.x][this.startPoint.y] || this.levelMap[endx][endy] == 0))) {
      road.push(this.Point(endx, endy));
    }
    this.checkBreakpoint(road);
    // return road;

  }

  checkBreakpoint(road) {

    //检测是否会形成断点
    for (let i = 1, len = road.length; i < len; i++) {
      //当前点位已有路径，且不是同色路径
      if (this.drawMap[road[i].x][road[i].y] != this.levelMap[road[i].x][road[i].y]
        && this.drawMap[road[i].x][road[i].y] != this.levelMap[this.startPoint.x][this.startPoint.y]) {

        let breakpoint = {
          Pos: this.Point(road[i].x, road[i].y),
          key: this.drawMap[road[i].x][road[i].y],
        }

        this.breakPoints.push(breakpoint);
      }
    }
  }

  rollbackRoad(road, endPoint, drawMap, levelMap, roads) {
    //road==>this.road
    let tempRoad = [];
    for (let i = 0, len = road.length; i < len; i++) {
      tempRoad[i] = road[i];
    }

    //每次弹出一个检测是否到回退点
    for (let i = 0, len = road.length; i < len; i++) {
      let head = tempRoad[tempRoad.length - 1];
      //找到回退点
      if (head.x == endPoint.PosX && head.y == endPoint.PosY) {

        for (let i = 1, difflen = road.length - tempRoad.length; i < difflen + 1; i++) {
          drawMap[road[road.length - i].x][road[road.length - i].y] =
            levelMap[road[road.length - i].x][road[road.length - i].y]
        }


        road.length = 0;
        for (let j = 0, templen = tempRoad.length; j < templen; j++) {
          road[j] = tempRoad[j];
        }

        break;
      }
      tempRoad.pop();
    }

    if (roads != null) {
      for (let i = 0, len = roads.length; i < len; i++) {
        if (roads[i].road[0].x == road[0].x && roads[i].road[0].y == road[0].y) {
          roads.splice(i, 1);
          break;
        }
      }
    }
  }


  breakRoad(roads, levelMap, drawMap) {
    let tempRoad = [];

    for (let i = 0, roadslen = roads.length; i < roadslen; i++) {
      let road = roads[i];
      for (let j = 0, pointslen = this.breakPoints.length; j < pointslen; j++) {
        let breakpoint = this.breakPoints[j];
        if (levelMap[road.nowPoint.btnPos1.PosX][road.nowPoint.btnPos1.PosY] == breakpoint.key) {

          let roadPath = road.road;
          for (let k = 0, pathlen = roadPath.length; k < pathlen; k++) {
            tempRoad[k] = roadPath[k];
          }

          //每次弹出一个检测是否到回退点
          for (let m = 0, pathlen = roadPath.length; m < pathlen; m++) {
            let head = tempRoad[tempRoad.length - 1];
            tempRoad.pop();
            //找到回退点
            if (head.x == breakpoint.Pos.x && head.y == breakpoint.Pos.y) {

              //同步drawMap
              for (let n = 1, difflen = roadPath.length - tempRoad.length; n < difflen + 1; n++) {
                drawMap[roadPath[roadPath.length - n].x][roadPath[roadPath.length - n].y] =
                  levelMap[roadPath[roadPath.length - n].x][roadPath[roadPath.length - n].y]
              }

              //找到回退成功更改roads中的路径
              roadPath.length = 0;
              for (let l = 0, templen = tempRoad.length; l < templen; l++) {
                roadPath[l] = tempRoad[l];
              }
              road.linked = true;
              break;
            }
          }
        }
      }
    }
  }

}




export { Bfs }