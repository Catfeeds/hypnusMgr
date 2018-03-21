/**
 * Created by yxc on 2015-10-12 16:03:20.
 */
var _msgBox = {};
var _util = {};
seajs.use([ '$', 'template', 'msgBox', 'easyuiDatagrid', 'easyuiPagination',
	'validate', 'select', 'util', 'jquery.json'], function($, template, msgBox, easyuiDatagrid,
								  easyuiPagination, validate, select, util) {
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
			this.initPage();
			this.initEvent();
			this.initForm();
		},

		initForm : function(){
			//绑定表单验证
			$("#saveForm").validate({
				ignore: ".ignore",
				errorPlacement: function (error, element) {
				},
				invalidHandler: function (event, validator) {
					for (v in validator.errorMap) {
						$('#' + v).focus();
						_msgBox.warn(validator.errorMap[v]);
						break;
					}
				}
			});
		},
		initPage : function() {

		},
		initEvent : function() {
			//保存
			$('#btnSubmit').click(EventHandler.save);
			//取消
			$('#btnCancel').click(function() {
                goIndex();
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
            if($("#saveForm").valid()){
                var param = _util.FormUtil.getFormJson('#saveForm');
                var password = param.password;
                if(password.trim().length<6||password.trim().length>14){
                    _msgBox.tips("密码长度请控制在6-14位");
                    $("#password").focus();
                    return;
				}
                var reg = new RegExp("[ `~@#$%^&*()=|{}':;',\\[\\].<>/~@#￥%……&*（）——|{}【】‘；：”“’。，、？！]|\n|\r|\t");
                if (password != '' && !reg.test(password)){
                    _msgBox.tips("密码格式不对");
                    $("#password").focus();
                    return;
                }
                var confirmPwd = param.confirmPwd;
                if (confirmPwd != password){
                    _msgBox.tips("两次密码不一致");
                    $("#confirmPwd").focus();
                    return;
                }

                $.post(path + "/admin/factoryMgr/pwd", param, function(backData) {
                    _msgBox.tips("操作成功");
                    if (backData.type == 'success') {
                        goIndex(backData.type);
                    }
                });
            }
		},
	}
}();

function goIndex(backData){
    _msgBox.exWindow.close(backData);
    //location.href = path + "/safeMgr/staff/index";
}