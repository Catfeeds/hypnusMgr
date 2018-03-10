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
			this.initEvent();
			this.initForm();
			this.loadEnum();
		},
		//加载查询框的枚举值
		loadEnum : function(){
            var isEnabled = [{value:0, name: "否"},{value:1, name: "是"}]
            var type = [{value:1, name: "菜单"}]
            $('#isEnabled').select({valueField: 'value', textField: 'name', data: isEnabled});
            $('#type').select({valueField: 'value', textField: 'name', data: type});
	        //var aData = [];
	        //aData.push({tabName:"t_Hr_Right",colName:"iType"});
	        //var param = {};
	        //param.whsEnum = $.toJSON(aData);
	        //param.type = 2;
	        //this.getEnumList(param, function(backData){
	        //    var data = backData.result;
	        //    var type = data['t_Hr_Right-iType'].sEnumMapping;
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
            if($("#signupForm").valid()){
                var param = _util.FormUtil.getFormJson('#signupForm');
                var isEnabled =  $("#isEnabled").val();
                if(isEnabled =='1'){
                    param.isEnabled=true;
                }else if((isEnabled =='0')){
                    param.isEnabled=false;
                }
                var action = param.id != "" ? "/safeMgr/rightMgr/update" : "/safeMgr/rightMgr/save" ;
                $.post(path + action, param, function(backData) {
                    _msgBox.tips("操作成功");
                    if (backData.type == 'success') {
                        goIndex();
                    }
                });
            }
		}
	}
}();

/**
 * 数据处理器
 */
var DataHandler = function(){
    return {
    };
}();

function goIndex(){
    _msgBox.exWindow.close();
    //location.href = path + "/safeMgr/staff/index";
}