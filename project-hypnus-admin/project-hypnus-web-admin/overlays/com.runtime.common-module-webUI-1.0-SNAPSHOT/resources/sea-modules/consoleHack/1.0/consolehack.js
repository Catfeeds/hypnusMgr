/**
 * 解决在不兼容consoel的浏览器，避免console报错
 * Created by runtime on 2016/4/22.
 */
define('consoleHack/1.0/consolehack', ['$'], function (require, exports, module) {
    if (!window.console) {
        window.console = {};
    }

    var console = window.console;

    var funcs = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml',
        'error', 'exception', 'group', 'groupCollapsed', 'groupEnd',
        'info', 'log', 'markTimeline', 'profile', 'profileEnd',
        'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];

    for (var i = 0, l = funcs.length; i < l; i++) {
        var func = funcs[i];
        if (!console[func]) {
            console[func] = function () {
            };
        }
    }

    if (!console.memory){
        console.memory = {};
    }
});