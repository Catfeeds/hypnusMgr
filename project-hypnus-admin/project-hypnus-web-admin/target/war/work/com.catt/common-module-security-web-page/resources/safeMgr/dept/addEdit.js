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
			this.loadEnum();
		},
		//加载查询框的枚举值
		loadEnum : function(){
	        //var aData = [];
	        //aData.push({tabName:"T_HR_DEPARTMENT",colName:"IDEPTTYPE"});
	        //var param = {};
	        //param.whsEnum = $.toJSON(aData);
	        //param.type = 2;
	        //this.getEnumList(param, function(backData){
	        //    var data = backData.result;
	        //    var type = data['T_HR_DEPARTMENT-IDEPTTYPE'].sEnumMapping;
	        //    $('#type').select({valueField: 'value', textField: 'name', data: type});
	        //});
		},
		/**
	     * 获取枚举信息
	     */
	    getEnumList : function(param, callback){
	      $.post(path + '/pub/enumMgr/findEnumListBusi', param, function(backData) {
	        callback(backData);
	      });
	    },
		initForm : function(){
			//绑定表单验证
			$("#signupForm").validate({
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
				_msgBox.exWindow.close();
			});
			$('#checkType').click(EventHandler.checkType);
		}
	};
})();


/**
 * 事件处理器
 */
var EventHandler = function(){
	return {
		save : function(){
			if($("#signupForm").valid()){
				//请求路径
				var param = _util.FormUtil.getFormJson('#signupForm');
				$.post(path + "/safeMgr/deptMgr/save", param, function(backData) {
					_msgBox.tips(backData.content, 1, function () {
						if (backData.type == 'success') {
							var type = 'success'; //返回成功
							_msgBox.exWindow.close(type);
						}
					});
				});
			}
		}
	}
}();