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
            var gender = [{value:1, name: "女性"},{value:2, name: "男性"}]
            $('#gender').select({valueField: 'value', textField: 'name', data: gender});
	        //var aData = [];
	        //aData.push({tabName:"T_HR_STAFF",colName:"ISEX"});
	        //var param = {};
	        //param.whsEnum = $.toJSON(aData);
	        //param.type = 2;
	        //this.getEnumList(param, function(backData){
	        //    var data = backData.result;
	        //    var gender = data['T_HR_STAFF-ISEX'].sEnumMapping;
	        //    $('#gender').select({valueField: 'value', textField: 'name', data: gender});
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
                var mobile = param.phone;
                var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
                if (mobile != '' && !reg.test(mobile)){
                    _msgBox.tips("移动号码格式不对");
                    $("#phone").focus();
                    return;
                }
                var inEmail = param.email;
                reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                if (inEmail != '' && !reg.test(inEmail)){
                    _msgBox.tips("内部邮箱格式不对");
                    $("#email").focus();
                    return;
                }

                $.post(path + "/admin/factoryMgr/save", param, function(backData) {
                    _msgBox.tips("操作成功");
                    if (backData.type == 'success') {
                        goIndex(backData.type);
                    }
                });
            }
		},
	}
}();

/**
 * 数据处理器
 */
var DataHandler = function(){
    return {
    	checkAccount : function(param, callback){
            $.post(path + '/safeMgr/staffMgr/checkAccount', param, function(backData) {
                callback(backData);
            });
        }
    };
}();

function goIndex(backData){
    _msgBox.exWindow.close(backData);
    //location.href = path + "/safeMgr/staff/index";
}