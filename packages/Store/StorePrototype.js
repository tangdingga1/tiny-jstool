import { STORE_DATA_CORE, LISTENER } from './StoreDataCore';
import { transKeyListByKey } from './utils';

// prototype 暴露给外部使用者接口一定要进行类型入参检测
const STORE_PROTOTYPE = Object.create(null);

/**
 * @param {String} key 需要存储的key值
 * @param {Any} value 需要存储的value值
 * @return void;
 */
function STORE_PROTOTYPE_SET(key, value) {
  const DESCRIPTOR = {
    get: function() {
      return STORE_DATA_CORE[key];
    },
    set: function(newValue) {
      STORE_DATA_CORE[key] = newValue;
      LISTENER.dispatchToListener(key, value);
    },
  };
  Object.defineProperty(this, key, DESCRIPTOR);
  this[key] = value;
}
/**
 * watch 监听每次值设置
 * @param {String | String[]} key 需要监听的key
 * @param {Function} watchHandler 触发的方法
 * @param {Any} bindTarget 目标
*/
function STORE_PROTOTYPE_WATCH(key, watchHandler, bindTarget) {
  transKeyListByKey(key)
    .forEach(keyName => {
      LISTENER.addListener(keyName, watchHandler.bind(bindTarget));
    });
}

// @todo warp typeError catcher
STORE_PROTOTYPE.set = STORE_PROTOTYPE_SET;
STORE_PROTOTYPE.watch = STORE_PROTOTYPE_WATCH;

Object.freeze(STORE_PROTOTYPE);

export default STORE_PROTOTYPE;
