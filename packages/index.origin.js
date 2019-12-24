function _tool(environment) {
  // test for run environment
  if (environment._Tool) {
    throw new Error('you can\'t use _Tool beacuse  _Tool alreay exits');
  }

  /** Variable list
   * @variable {object} _ToolProtype _Tool原型
   * @variable {function} voidFunction 空函数 用于置空占位
   */
  var _ToolProtype = Object.create(null);
  var voidFunction = function () { };

  function _Tool() { }

  // common
  _ToolProtype.testType = {
    // basic type
    isString: function (target) { return typeof target === 'string'; },
    isNumber: function (target) { return typeof target === 'number'; },
    isBool: function (target) { return typeof target === 'boolean'; },
    isUndefined: function (target) { return typeof target === 'undefined'; },
    isNaN: function (target) { return typeof (target === 'number') && (target !== target); },
    isNull: function (target) { return typeof (target === 'object') && (target + 1) === 1; },
    // object type
    isFunction: function (target) { return typeof target === 'function'; },
    isArray: function (target) { return Object.prototype.toString.call(target) === '[object Array]'; },
    isObject: function (target) { return Object.prototype.toString.call(target) === '[object Object]'; }
  };

  // define _Tool prototype
  _Tool.prototype = _ToolProtype;

  /** lifeCycleDecorator
   * @param {function} handler 需要进行生命周期装饰的函数，最后一个参数将被添加为生命周期之间互相传递的数值
   * @param {object|function} lifeConfig 生命周期函数设置 如果为obejct { before, after, error }，均传递function， 如果为function，表示回调，第一个参数为err
   * @param {any} that 函数执行需要绑定的作用域，不传递默认为window
    */
  _ToolProtype.lifeCycleDecorator = function (handler, lifeConfig, that) {
    var isFunction = this.testType.isFunction;
    if (!isFunction(handler)) {
      throw new Error('you should pass function on first argument');
    }
    var isObject = this.testType.isObject;
    // placeholder function
    var onHandlerBefore = voidFunction;
    var onHandlerAfter = voidFunction;
    var onError = voidFunction;
    var error = null;
    // 传递的参数,用于传递保存生命周期函数返回值
    var passValueObject = {
      before: null,
      after: null,
      error: null,
      handler: null,
    };
    // 生命周期总是最后参数的最后一项
    if (!lifeConfig) {
      throw new Error('you should pass function or object on second argument');
    }
    // 如果最后一个参数为函数，那就是直接传入一个callback的errorFirst模式
    if (isFunction(lifeConfig)) {
      onHandlerAfter = lifeConfig;
      // 如果是配置的object，那么拆分对应的配置参数
    } else if (isObject(lifeConfig)) {
      lifeConfig.before && (onHandlerBefore = lifeConfig.before);
      lifeConfig.after && (onHandlerAfter = lifeConfig.after);
      lifeConfig.error && (onError = lifeConfig.error);
    }
    return function () {
      // before
      passValueObject.before = onHandlerBefore();
      var arrArguments = Array.from(arguments);
      // handler
      try {
        passValueObject.handler = handler.apply(that || environment, arrArguments.concat(passValueObject));
      } catch (e) {
        error = e;
        passValueObject.error = onError(error, passValueObject);
      } finally {
        onHandlerAfter(error, passValueObject);
      }
    };
  };

  // module extends
  // 自带的模块接收字符串
  _ToolProtype.extends = function () {
    var extendPrototype = {};
    var testType = this.testType;
    Array.from(arguments).map(function (module) {
      // 自定义拓展对象
      var extendObject = {};
      if (testType.isObject(module)) {
        extendObject = module;
        // 是否是自带的模块
      } else if (testType.isFunction(_ToolProtype.defaultModules[module])) {
        extendObject = _ToolProtype.defaultModules[module]() || {};
      }
      extendPrototype = Object.assign(extendPrototype, extendObject);
    });
    // 更新 environment 上面 _Tool的protype
    var extendedPrototype = Object.assign(extendPrototype, _ToolProtype);
    Object.freeze(extendedPrototype);
    Object.setPrototypeOf(environment._Tool, extendedPrototype);
  };

  // default modules
  _ToolProtype.defaultModules = {
    dom: dom,
    polyfill: polyfill,
  };

  // dom module
  function dom() {
    if (!environment.document) {
      throw new Error('document not exits, dom module needs document');
    }
    var _ToolDom = {};
    /**
     * copyToClipBoard 复制内容到剪贴板
     * @param {string|number} copyText - 需要复制的内容
     * @param {function} callBack - 回调函数，如果出现错误，第一个为参数存在
     */
    _ToolDom.copyToClipBoard = function (copyText, callBack) {
      var type = typeof copyText;
      if (!document.execCommand) {
        callBack({ err: 'you should update your browser' });
      }
      // type test
      if (type !== 'number' || type !== 'string') {
        copyText += '';
      }
      var input = document.createElement('input');
      document.body.appendChild(input);
      input.setAttribute('value', copyText);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      callBack(null);
    };
    return _ToolDom;
  }

  /**
   * polyfill module
   * objectAssign
   * arrayArrayFrom
  */
  function polyfill() {
    function arrayArrayFrom() {
      Array.from = function (target) {
        return Array.prototype.slice.call(target);
      };
    }
    function objectAssign() {
      var returnObject = {};
      Array.from(arguments).forEach(function (objects) {
        if (_ToolProtype.testType.isObject(objects)) {
          for (var keys in objects) {
            returnObject[keys] = objects[keys];
          }
        } else {
          throw new TypeError('argument is not object');
        }
      });
      return returnObject;
    }
    // run polyfill
    Array.from || arrayArrayFrom();
    Object.assign || objectAssign();
    return {};
  }

  // init tools
  environment._Tool = new _Tool();
  environment._tool && delete environment._tool;
  Object.freeze(environment._tool.prototype);
  return environment._Tool;
}

// for commonJS and es6 module
(function (global, _tool) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = _tool(global);
  } else {
    _tool(global);
  }
})(typeof window !== 'undefined' ? window : this || {}, _tool);
