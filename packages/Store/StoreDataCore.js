import TestType from '../TestType';
import { LISTENER_TYPE } from './constant';

const { WATCH_TYPE, CHANGE_TYPE } = LISTENER_TYPE;

// 存储数据
export const STORE_DATA_CORE = Object.create(null);

// @type LISTENER_PROTOTYPE { ListenerName: ListenerHandler[] }
/**
 * @type LISTENER_PROTOTYPE
 * @type LISTENER_PROTOTYPE[WATCH_TYPE] = watchListenerHandler
 * @type LISTENER_PROTOTYPE[CHANGE_TYPE] = changeListenerHandler
 */
const LISTENER_PROTOTYPE = Object.create(null);

/**
 * @private
 * @param {String} name ListenerName
 * @param {Function} handler ListenerHandler
 * @param {String} type listener type：watch or onChange
 */
LISTENER_PROTOTYPE.initializeVoidListener = function(name, handler, type) {
  this[name] = {
    [WATCH_TYPE]: [],
    [CHANGE_TYPE]: [],
  };
  this[name][type].push(handler);
};

/**
 * @private
 * @param {String} name ListenerName
 * @return {Boolean} hasListener
 */
LISTENER_PROTOTYPE.hasListener = function(name) {
  return !!this[name];
};

/**
 * @param {String} name ListenerName
 * @param {Function} handler ListenerHandler
 * @param {String} type listener type：watch or onChange
 */
LISTENER_PROTOTYPE.addListener = function(name, handler, type) {
  this.hasListener(name) ?
    this[name][type].push(handler)
    :
    this.initializeVoidListener(name, handler, type);
};

/**
 * @param {String} name ListenerName
 * @param {*} value
 * @param {*} preValue
 */
LISTENER_PROTOTYPE.dispatchToListener = function(name, value, preValue) {
  if (this.hasListener(name)) {
    this[name][WATCH_TYPE].forEach(handler => handler({ key: name, value, preValue }));
    if (!TestType.isEqual(value, preValue)) {
      this[name][CHANGE_TYPE].forEach(handler => handler({ key: name, value, preValue }));
    }
  }
};

/**
 * @param {String} name ListenerName
 * @param {Function} removeHandler ListenerHandler
 * @param {String} type listener type：watch or onChange
 */
LISTENER_PROTOTYPE.removeListener = function(name, removeHandler, type) {
  if (this[name][type]) {
    const removeHandlerIdx = this[name][type].indexOf(removeHandler);
    if (removeHandlerIdx > -1) {
      this[name][type].splice(removeHandlerIdx, 1);
    }
  }
};

LISTENER_PROTOTYPE.clear = function(name) {
  delete this[name];
};

export const LISTENER = Object.create(LISTENER_PROTOTYPE);
