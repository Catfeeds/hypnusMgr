define('ueditor/1.4.3/editor', ['$', 'ueditor/1.4.3/ueditor.config', 'ueditor/1.4.3/ueditor.all.min'], function (require, exports, module) {
    //注意修改ueditor.config.js中的配置
    seajs.use('ueditor/1.4.3/ueditor.parse.min');
    module.exports = UE;
});