import * as tools from './tools.js';

//按键y坐标间隔浮动最大值
const MAX_GAPY = 60;

//按键x坐标间隔
let gapX = 130;

//按键y坐标间隔
let gapY = MAX_GAPY;

//间隔每次浮动大小
let unit = MAX_GAPY / 4;

//上一个按键坐标位置
//初始化为第一个坐标位置
let lastLevelPos = tools.Point(0, document.documentElement.clientHeight / 3 * 2);

//关卡唯一标记
let num = 1;

export const ARROWPOS = []

const JANUARY2020 = [
  Level('1st', true, true),
  Level('2nd'),
  Level('3rd'),
  Level('4th'),
  Level('5th'),
  Level('6th'),
  Level('7th'),
  Level('8th'),
  Level('9th'),
  Level('10th'),
  Level('11th'),
  Level('12th'),
  Level('13th'),
  Level('14th'),
  Level('15th'),
  Level('16th'),
];
const FEBRUARY2020 = [
  Level('1st', true),
  Level('2nd'),
  Level('3rd'),
  Level('4th'),
  Level('5th'),
  Level('6th'),
  Level('7th'),
  Level('8th'),
  Level('9th'),
  Level('10th'),
  Level('11th'),
  Level('12th'),
  Level('13th'),
  Level('14th'),
  Level('15th'),
  Level('16th'),
];
const MATH2020 = [
  Level('1st', true),
  Level('2nd'),
  Level('3rd'),
  Level('4th'),
  Level('5th'),
  Level('6th'),
  Level('7th'),
  Level('8th'),
  Level('9th'),
  Level('10th'),
  Level('11th'),
  Level('12th'),
  Level('13th'),
  Level('14th'),
  Level('15th'),
  Level('16th'),
];
const APRIL2020 = [
  Level('1st', true),
  Level('2nd'),
  Level('3rd'),
  Level('4th'),
  Level('5th'),
  Level('6th'),
  Level('7th'),
  Level('8th'),
  Level('9th'),
  Level('10th'),
  Level('11th'),
  Level('12th'),
  Level('13th'),
  Level('14th'),
  Level('15th'),
  Level('16th'),
];
const MAY2020 = [
  Level('1st', true),
  Level('2nd'),
  Level('3rd'),
  Level('4th'),
  Level('5th'),
  Level('6th'),
  Level('7th'),
  Level('8th'),
  Level('9th'),
  Level('10th'),
  Level('11th'),
  Level('12th'),
  Level('13th'),
  Level('14th'),
  Level('15th'),
  Level('16th'),
];
const JUNE2020 = [
  Level('1st', true),
  Level('2nd'),
  Level('3rd'),
  Level('4th'),
  Level('5th'),
  Level('6th'),
  Level('7th'),
  Level('8th'),
  Level('9th'),
  Level('10th'),
  Level('11th'),
  Level('12th'),
  Level('13th'),
  Level('14th'),
  Level('15th'),
  Level('16th'),
];

export const ALL_MAP = [
  JANUARY2020,
  FEBRUARY2020,
  MATH2020,
  APRIL2020,
  MAY2020,
  JUNE2020
];

export const MAP_NAME = [
  'JANUARY2020',
  'FEBRUARY2020',
  'MATH2020',
  'APRIL2020',
  'MAY2020',
  'JUNE2020'
]


/**
 * 新增关卡
 * @param {string} map 关卡地图名
 * @param {string} level 关卡名
 * @param {number} status 关卡状态 1==>完成 -1==>未完成
 * @param {bool} unlock 是否解锁 true ==>已解锁 false==》未解锁
 */
function Level(level, isNewMap = false, unlock = false) {
  //let levelNum = parseInt(level);
  if (gapY == MAX_GAPY) {
    unit = -unit;
  }
  else if (gapY == -MAX_GAPY) {
    unit = -unit;
  }
  gapY += unit;
  if (isNewMap == true) {
    ARROWPOS.push(tools.Point(lastLevelPos.PosX + 170, document.documentElement.clientHeight / 2));
    ARROWPOS.push(tools.Point(lastLevelPos.PosX + 360, document.documentElement.clientHeight / 2));
    lastLevelPos.PosX += 370;
  }
  return createLevel(level, tools.Point(lastLevelPos.PosX = lastLevelPos.PosX + gapX, lastLevelPos.PosY = lastLevelPos.PosY + gapY), unlock);
}

function createLevel(level, pos, unlock) {
  let newlevel = {
    level,
    pos,
    status: -1,
    unlock,
    num,
  }
  //每次标记自动增加
  num++;
  return newlevel;
}


