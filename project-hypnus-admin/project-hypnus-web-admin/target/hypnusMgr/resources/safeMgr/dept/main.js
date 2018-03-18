/**
 * Created by haydn on 2015/7/6.
 */
/**
 * 页面入口
 */

var _msgBox = {};
var _util = {};
seajs.use(['$', 'msgBox',  'util',  'jquery.json'], function($, msgBox,  util ) {
	_msgBox = msgBox;
	_util = util;

	$(function(){
		InitHandler.init();


	})
});

/**
 * 初始化处理器
 */
var InitHandler = function() {
	return {
		init : function(){
			this.initEvent();
			this.initToolbar();
			this.initPageList();
		},

		//初始化绑定事件
		initEvent : function(){
			$('#tt').tabs({
				border : false,
				isDrag : false,
				onSelect : function(title){
					setData();
					//setWH();
				}
			});
			//setWH();
			//hideTable();
		},

		//初始化工具栏
		initToolbar : function(){

		},

		//初始化列表
		initPageList : function(){

		}
	}
}();

/**
 * 事件处理器
 */
var EventHandler = function(){
	return {

	}
}();


