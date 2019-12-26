// 存储数据
export const STORE_DATA_CORE = Object.create(null);

// @type LISTENER_PROTOTYPE { ListenerName: ListenerHandler[] }
const LISTENER_PROTOTYPE = Object.create(null);

/**
 * @param {String} name ListenerName
 * @return {Boolean} hasListener
 */
LISTENER_PROTOTYPE.hasListener = function(name) {
  return !!this[name];
}

/**
 * @param {String} name ListenerName
 * @param {Function} handler ListenerHandler
 * @return void
 */
LISTENER_PROTOTYPE.addListener = function(name, handler) {
  this.hasListener(name) ?
    this[name].push(handler)
    :
    this[name] = [handler];
}

/**
 * @param {String} name ListenerName
 * @param {Any} value
 * @return void
 */
LISTENER_PROTOTYPE.dispatchToListener = function(name, value) {
  this.hasListener(name)
  &&
  this[name].forEach(handler => handler({ key: name, value }));
}

export const LISTENER = Object.create(LISTENER_PROTOTYPE);
