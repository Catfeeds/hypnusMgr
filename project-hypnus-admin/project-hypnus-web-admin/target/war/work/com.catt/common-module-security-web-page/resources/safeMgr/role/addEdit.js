/**
 * Created by yxc on 2015-10-12 16:03:20.
 */
var _msgBox = {};
var _util = {};
seajs.use([ '$', 'msgBox', 'util', 'jquery.json'], function($, msgBox, util) {
    _msgBox = msgBox;
    _util = util;

    /** 页面入口 */
    $(function() {
        InitHandler.init();
    });
});

/** 初始化处理器 */
var InitHandler = (function() {
    return {
        init : function() {
            this.initEvent();
        },
        initEvent : function() {
            //保存
            $('#btnSubmit').click(EventHandler.save);
            //取消
            $('#btnCancel').click(function() {
                _msgBox.exWindow.close();
            });
        }
    };
})();


/**
 * 事件处理器
 */
var EventHandler = function(){
    return {
        save : function(){
            //请求路径
            var param = _util.FormUtil.getFormJson('#signupForm');
            var action = "/safeMgr/roleMgr/save";
            if(param.id != ""){
                action = "/safeMgr/roleMgr/update";
            }
            $.post(path + action, param, function(backData) {
                _msgBox.tips(backData.content, 1, function () {
                    if (backData.type == 'success') {
                        var type = 'success'; //返回成功
                        _msgBox.exWindow.close(type);
                    }
                });
            });
        }
    }
}();