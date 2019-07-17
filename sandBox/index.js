var _Tool = window._Tool;
var consoleSomeThing = function (text, passValue) {
    console.log(text);
    throw new Error('1231');
};
var config = {
    before: function () {
        console.log('before console');
        return 111;
    },
    after: function () {
        console.log('after console');
    },
    error: function (err) {
        console.log('errpr');
    }
};
_Tool.lifeCycleDecorator(consoleSomeThing, function(err) {
    console.log(err);
})(1111);