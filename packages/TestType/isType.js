/**
 * is类function均符合：
 * @param {*} target 需要检测类型的值
 * @return {Boolean} 是否符合类型
 */

// basic type
export function isString(target) {
  return typeof target === 'string';
}

export function isNumber(target) {
  return typeof target === 'number';
}

export function isBool(target) {
  return typeof target === 'boolean';
}

export function isUndefined(target) {
  return typeof target === 'undefined';
}

export function isNaN(target) {
  return (typeof target === 'number') && (target !== target);
}

export function isNull(target) {
  return (typeof target === 'object') && !target;
}

// object type
export function isFunction(target) {
  return typeof target === 'function';
}

export function isArray(target) {
  return Object.prototype.toString.call(target) === '[object Array]';
}

export function isObject(target) {
  return Object.prototype.toString.call(target) === '[object Object]';
}

/**
 * objectType 变量保存的为栈引用地址，非实际值
 * @example
 * Object/Array/Function
 */
export function isObjectType(target) {
  if (typeof target === 'object') {
    return !!target;
  } else if (typeof target === 'function') {
    return true;
  }
  return false;
}

/**
 * basicType: 变量保存的非栈引用地址
 * @example
 * number/boolean/string/null/undefined
 */
export function isBasicType(target) {
  return !isObjectType(target);
}
