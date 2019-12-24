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
  return typeof (target === 'number') && (target !== target);
}

export function isNull(target) {
  return typeof (target === 'object') && (target + 1) === 1;
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
