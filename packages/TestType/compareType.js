import {
  isObjectType,
  isFunction,
  isArray,
  isObject,
  isString,
  isNumber,
  isBool,
  isUndefined,
  isNull,
} from './isType';
import { TYPE_NAME_MAP } from './constant';


/**
 * @private getObjectType & getBasicType
 * @param {*} target 需要取得类型的对象
 * @return {String} typeName
 */

function getObjectType(target) {
  switch (true) {
    case isFunction(target):
      return TYPE_NAME_MAP.FunctionName;
    case isArray(target):
      return TYPE_NAME_MAP.ArrayName;
    case isObject(target):
    default:
      return TYPE_NAME_MAP.ObjectName;
  }
}

function getBasicType(target) {
  switch (true) {
    case isString(target):
      return TYPE_NAME_MAP.StringName;
    case isNumber(target):
      return TYPE_NAME_MAP.NumberName;
    case isBool(target):
      return TYPE_NAME_MAP.BooleanName;
    case isUndefined(target):
      return TYPE_NAME_MAP.UndefinedName;
    case isNull(target):
    default:
      return TYPE_NAME_MAP.NullName;
  }
}

/**
 * @param {*} target 需要取得类型的对象
 * @return {String} typeName
 */
export function getType(target) {
  if (isObjectType(target)) {
    return getObjectType(target);
  }
  return getBasicType(target);
}

/**
 * @param {String[]} types
 * @param {Any[]} targets
 * @return {Boolean} isMatchType
 */
export function isMatchTypes(types, targets) {
  let targetsList = targets.slice();
  // 用undefined 补齐 targetsList
  if (targetsList.length < types.length) {
    targetsList = targetsList
      .concat(
        new Array(types.length - targetsList.length).fill(undefined)
      );
  }
  return targetsList.every((target, index) => {
    if (types[index] === TYPE_NAME_MAP.AnyType) {
      return true;
    }
    return getType(target) === types[index];
  });
}

/**
 * @param {String[]} types
 * @param {*} target
 * @return {Boolean} isMatchType
 */
export function isOneOfTypes(types, target) {
  if (types.includes(TYPE_NAME_MAP.AnyType)) {
    return true;
  }
  return types.includes(getType(target));
}
