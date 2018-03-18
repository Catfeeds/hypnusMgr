var _msgBox = {};
var _util = {};
/**
 * 页面入口
 */
seajs.use(['$', 'msgBox', 'template', 'easyuiDatagrid', 'select', 'util', 'jquery.json'],
	function($, msgBox, template, easyuiDatagrid, select, util) {
	  _msgBox = msgBox;
      _util = util;
	  $(function(){
	    InitHandler.init();
	  });
	});

/**
 * 初始化处理器
 */
var InitHandler = function() {
    return {
      init : function(){
          EventHandler.init();
      }
    };
  }();
/**
 * 事件处理器
 */
var EventHandler = function(){
	return {
		//绑定按钮事件
		init : function(){
			 $("#changPassword").bind("click",EventHandler.changPassword);
			 $("#changPerson").bind("click",EventHandler.changPerson);
		},
		changPassword : function(){
			_msgBox.exWindow.open({
                title: '修改',
                width: '450px',
                height : '350px',
                url: path + "/safeMgr/staff/changePassword.html",
                close: function (data) {
//                    if(data == "success"){
//                    }
                }
            });
		},
		changPerson : function(){
			_msgBox.exWindow.open({
                title: '修改',
                width: '900px',
                height : '600px',
                url: path + "/safeMgr/staff/editDetail.html",
                close: function (data) {
//                    if(data == "success"){
//                    }
                }
            });
		}
  }
}();

/**
 * 数据处理器
 */
var DataHandler = function(){
  return {
	ajax : function(url, param, callback){
		$.post(url, param, function(backData) {
			callback(backData);
		});
	}
  };
}();


