(function(environment) {
    if (!environment.document || environment._Tool) {
        throw new Error("you can't use _Tool beacuse you run it on node or _Tool alreay exits");
    }
    // @todo 想一个拆分模块的方法
    function _Tool() {
        this._use = function(moduleArr) {

        }
    }
    /**
     * @param {string|number} copyText - 需要复制的内容
     * @param {function} callBack - 回调函数，如果出现错误，第一个为参数存在
      */
    _Tool.prototype.copy = function (copyText, callBack) {
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
    }
    // init tools
    environment._Tool = new _Tool();

})(window || global);