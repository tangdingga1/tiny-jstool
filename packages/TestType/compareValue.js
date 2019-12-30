import { isNaN, isBasicType, isFunction } from './isType';

// 两者是否都是NaN
function isBothNaN(target, compareTarget) {
  if (isNaN(target)) {
    return isNaN(compareTarget);
  }
  return false;
}

/**
 * 比较值是否一致，概念直接相当于===，但是NaN应该是一致值
 * @param {*} target 比较对象
 * @param {*} compareTarget 用来比较比较对象的对象
 * @return {Boolean} isValueSame
 */
function isValueSame(target, compareTarget) {
  // NaN and NaN should be same
  if (isBothNaN(target, compareTarget)) {
    return true;
  }
  return target === compareTarget;
}

/**
 * 比较值是否相等
 * @example
 * Object, key和value相等即为相等: `{ value: 1 }` 应该和 `{ value: 1 }` 相等
 * Array, 每一项相等即为相等: `[1, { a: 1 }]` 应该和 `[1, { a: 1 }]` 相等
 * Function, 比较的是是否为同一个Function, 而不是函数体进行比较
 * @param {*} target 比较对象
 * @param {*} compareTarget 用来比较比较对象的对象
 * @return {Boolean} isValueEqual
 */
function isValueEqual(target, compareTarget) {
  if (isBasicType(target) || isFunction(target)) {
    return isValueSame(target, compareTarget);
  }
  let result = false;
  try {
    result = JSON.stringify(target) === JSON.stringify(compareTarget);
  } catch (error) {
    throw new TypeError('this function not support this data type');
  }
  return result;
}


function compareListByHandler(...args) {
  let isSameFalg = true;
  let testList = Array.from(args);
  // 最后一项统一为handler
  const handler = testList.pop();
  while(testList.length > 1 && isSameFalg) {
    isSameFalg = handler(testList[0], testList[1]);
    if (isSameFalg) {
      testList.shift();
    }
  }
  return isSameFalg;
}

export function isSame(...args) {
  return compareListByHandler(...args, isValueSame);
}

export function isEqual(...args) {
  return compareListByHandler(...args, isValueEqual);
}
