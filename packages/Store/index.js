import { STORE_DATA_CORE, LISTENER } from './StoreDataCore';
import { LISTENER_TYPE } from './constant';
import { transKeyListByKey } from './utils';
import ErrorCatcher from '../ErrorCatcher';

const matchParamsType = ErrorCatcher.matchParamsType;
const { WATCH_TYPE, CHANGE_TYPE } = LISTENER_TYPE;

// prototype 暴露给外部使用者接口一定要进行类型入参检测
const STORE_PROTOTYPE = Object.create(null);

/**
 * @param {String} key 需要存储的key值
 * @param {*} value 需要存储的value值
 */
function STORE_PROTOTYPE_SET(key, value) {
  if (STORE_DATA_CORE[key] === undefined) {
    const DESCRIPTOR = {
      configurable: true,
      get: function() {
        return STORE_DATA_CORE[key];
      },
      set: function(newValue) {
        const preValue = STORE_DATA_CORE[key];
        STORE_DATA_CORE[key] = newValue;
        LISTENER.dispatchToListener(key, newValue, preValue);
      },
    };
    Object.defineProperty(this, key, DESCRIPTOR);
  }
  this[key] = value;
}

/**
 * @param {String | String[]} key 需要监听的key
 * @param {Function} handler listener handler
 * @param {String} type listener type：watch or onChange
 */
function addListener(key, handler, type) {
  transKeyListByKey(key)
    .forEach(keyName => {
      LISTENER.addListener(keyName, handler, type);
    });
}
/**
 *
 * @param {String | String[]} key 需要监听的key
 * @param {Function} removeHandler will removeListener handler
 * @param {String} type listener type：watch or onChange
 */
function removeListener(key, removeHandler, type) {
  if (LISTENER.hasListener(key)) {
    LISTENER.removeListener(key, removeHandler, type);
  }
}

/**
 * watch 监听每次值设置
 * @param {String | String[]} key 需要监听的key
 * @param {Function} watchHandler 触发的方法
*/
function STORE_PROTOTYPE_WATCH(key, watchHandler) {
  addListener(key, watchHandler, WATCH_TYPE);
}

/**
 * onChange 每次值改变触发
 * @param {String | String[]} key 需要监听的key
 * @param {Function} watchHandler 触发的方法
 */
function STORE_PROTOTYPE_ON_CHANGE(key, changeHandler) {
  addListener(key, changeHandler, CHANGE_TYPE);
}

/**
 * 移除 watch 事件
 * @param {string} key
 * @param {Function} removeHandler
 */
function STORE_PROTOTYPE_REMOVE_WATCH(key, removeHandler) {
  removeListener(key, removeHandler, WATCH_TYPE);
}


/**
 * 移除 onChange 事件
 * @param {string} key
 * @param {Function} removeHandler
 */
function STORE_PROTOTYPE_REMOVE_ON_CHANGE(key, removeHandler) {
  removeListener(key, removeHandler, CHANGE_TYPE);
}

/**
 * @param {String} key
 */
function STORE_PROTOTYPE_CLEAR(key) {
  delete this[key];
  delete STORE_DATA_CORE[key];
  if (LISTENER.hasListener(key)) {
    LISTENER.clear(key);
  }
}

// 外部暴露
const STORE = Object.create(STORE_PROTOTYPE);

STORE_PROTOTYPE.set = matchParamsType(STORE_PROTOTYPE_SET.bind(STORE), ['string', 'any']);
STORE_PROTOTYPE.watch = matchParamsType(STORE_PROTOTYPE_WATCH.bind(STORE), ['any', 'function', 'any']);
STORE_PROTOTYPE.onChange = matchParamsType(STORE_PROTOTYPE_ON_CHANGE.bind(STORE), ['any', 'function', 'any']);
STORE_PROTOTYPE.removeWatch = matchParamsType(STORE_PROTOTYPE_REMOVE_WATCH.bind(STORE), ['string', 'function']);
STORE_PROTOTYPE.removeOnChange = matchParamsType(STORE_PROTOTYPE_REMOVE_ON_CHANGE.bind(STORE), ['string', 'function']);
STORE_PROTOTYPE.clear = matchParamsType(STORE_PROTOTYPE_CLEAR.bind(STORE), ['string']);

Object.freeze(STORE_PROTOTYPE);

export default STORE;
