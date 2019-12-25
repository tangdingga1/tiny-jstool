import { WATCH_LIST } from './constant';
import { findListenerIndex } from './utils';

// 存储数据
const STORE_DATA_CORE = Object.create(null);
// prototype
const STORE_PROTOTYPE = Object.create(null);

/**
 * @param {String} key 需要存储的key值
 * @param {Any} value 需要存储的value值
 * @return void;
 */
STORE_PROTOTYPE.set = function(key, value) {
  const DESCRIPTOR = {
    get: function() {
      return STORE_DATA_CORE[key];
    },
    set: function(newValue) {
      STORE_DATA_CORE[key] = newValue;
    }
  }
  Object.defineProperty(this, key, DESCRIPTOR);
  STORE_DATA_CORE[key] = value;
}

/**
 * watch Store setter
 * @param {String | String[]} key 需要监听的key
 *
*/
STORE_PROTOTYPE.watch = function(key, changeCallBack, bindTarget) {
  const watchList = this[WATCH_LIST];
  const listenerIndex = findListenerIndex(watchList, key);
  if (listenerIndex > -1) {
    watchList[listenerIndex].listeners.push(changeCallBack.bind(bindTarget));
  } else {
    watchList.push({
      key,
      listeners: [changeCallBack.bind(bindTarget)],
    });
  }
}

Object.freeze(STORE_PROTOTYPE);

export default STORE_PROTOTYPE;
