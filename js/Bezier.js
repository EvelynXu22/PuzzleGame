import * as tools from './tools.js';

class BezierLine {
  constructor(start, end, middle) {
    this.start = start;
    this.end = end;
    this.middle = middle;
    this.getMiddlePoint();
  }

  getMiddlePoint() {
    // 平方贝塞尔曲线的点
    // this.middle = tools.Point(
    //   400, 400
    //   // (this.start.PosX + this.end.PosX) / 2 - (this.start.PosY - this.end.PosY) * 0.4,
    //   // (this.start.PosY + this.end.PosY) / 2 - (this.end.PosX - this.start.PosX) * 0.4,
    // );
    // 直接计算好多项式，留后用
    const ax = this.start.PosX - 2 * this.middle.PosX + this.end.PosX;
    const ay = this.start.PosY - 2 * this.middle.PosY + this.end.PosY;
    const bx = 2 * this.middle.PosX - 2 * this.start.PosX;
    const by = 2 * this.middle.PosY - 2 * this.start.PosY;
    this.A = 4 * (ax * ax + ay * ay);
    this.B = 4 * (ax * bx + ay * by);
    this.C = bx * bx + by * by;
  }

  calculateBezierPointForQuadratic(t) {
    const temp = 1 - t;
    return tools.Point(
      temp * temp * this.start.PosX + 2 * t * temp * this.middle.PosX + t * t * this.end.PosX,
      temp * temp * this.start.PosY + 2 * t * temp * this.middle.PosY + t * t * this.end.PosY
    );
  }

  getLength(t) {

    const temp1 = Math.sqrt(this.C + t * (this.B + this.A * t));

    const temp2 = (2 * this.A * t * temp1 + this.B * (temp1 - Math.sqrt(this.C)));

    const temp3 = Math.log(this.B + 2 * Math.sqrt(this.A) * Math.sqrt(this.C));

    const temp4 = Math.log(this.B + 2 * this.A * t + 2 * Math.sqrt(this.A) * temp1);

    const temp5 = 2 * Math.sqrt(this.A) * temp2;

    const temp6 = (this.B * this.B - 4 * this.A * this.C) * (temp3 - temp4);

    return (temp5 + temp6) / (8 * Math.pow(this.A, 1.5));

  }
  invertL(t, l) {

    let t1 = t, t2;

    do {
      t2 = t1 - (this.getLength(t1) - l) / this.s(t1);

      if (Math.abs(t1 - t2) < 0.000001) {
        break;
      }
      t1 = t2;

    } while (true);

    return t2;
  }

  s(t) {
    return Math.sqrt(this.A * t * t + this.B * t + this.C);
  }


}
export { BezierLine };