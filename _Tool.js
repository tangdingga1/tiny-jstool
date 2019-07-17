(function(environment) {
    // test for run environment
    if (!environment.document || environment._Tool) {
        throw new Error('you can\'t use _Tool beacuse you run it on node or _Tool alreay exits');
    }

    /** Variable list
     * @variable {object} _ToolProtype _Tool原型
     */
    var _ToolProtype = Object.create(null);
    var voidFunction = function() {};
    
    // @todo 想一个拆分模块的方法
    function _Tool() {
        this._use = function() {

        };
    }

    // define _Tool prototype
    _Tool.prototype = _ToolProtype;

    _ToolProtype.testType = {
        // basic type
        isString: function(target) { return typeof target === 'string'; },
        isNumber: function(target) { return typeof target === 'number'; },
        isBool: function(target) { return typeof target === 'boolean'; },
        isUndefined: function(target) { return typeof target === 'undefined'; },
        isNaN: function(target) { return typeof (target === 'number') && (target !== target); },
        isNull: function(target) { return typeof (target === 'object') && (target + 1) === 1; },
        // object type
        isFunction: function(target) { return typeof target === 'function'; },
        isArray: function(target) { return Object.prototype.toString.call(target) === '[object Array]'; },
        isObject: function(target) { return Object.prototype.toString.call(target) === '[object Object]'; }
    };

    /** lifeCycleDecorator
     * @param {function} handler 需要进行生命周期装饰的函数，最后一个参数将被添加为生命周期之间互相传递的数值
     * @param {object|function} lifeConfig 生命周期函数设置 如果为obejct { before, after, error }，均传递function， 如果为function，表示回调，第一个参数为err
     * @param {any} that 函数执行需要绑定的作用域，不传递默认为window
     * 
      */
    _ToolProtype.lifeCycleDecorator = function(handler, lifeConfig, that) {
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
        return function() {
            // before
            passValueObject.before = onHandlerBefore();
            var arrArguments = Array.prototype.slice.call(arguments);
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



    // useful simple tools
    /**
     * @param {string|number} copyText - 需要复制的内容
     * @param {function} callBack - 回调函数，如果出现错误，第一个为参数存在
      */
    _ToolProtype.copy = function (copyText, callBack) {
        var type = typeof copyText;
        if (!document.execCommand) {
            callBack({err : 'you should update your browser'});
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



    // init tools
    environment._Tool = new _Tool();
    return environment._Tool;

})(window || global);