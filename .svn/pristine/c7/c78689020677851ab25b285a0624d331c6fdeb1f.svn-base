// JavaScript Document

$(document).ready(function(){
	
	
	$("div.xw_activitiestype03").click(function(){
		
		$("div.xw_huifu01").show();
		$("div.xw_huifu02").hide();
		
	});
	$("div.xw_activitiestype04").click(function(){
		
		$("div.xw_huifu02").show();
		$("div.xw_huifu01").hide();
		
	});
	
});

//支付成功
function openDialog_cash() {
	var addOrEditDiv = {
			width:400,
			height:290,
			zIndex: 9000,
			draggable:true, //拖动
			resizable:true, //改变大小
			modal: true, //后台页面可编辑
			closed: false, //是否关闭？
			minimizable: false,//最小化按钮
			maximizable: false,//最大化按钮
			closable: true, //关闭按钮
			collapsible: true, //收缩按钮 
			title:"提交成功",
			url:"7-2现金支付成功.html",
			id:"addEdit"
	};
	window.top.showJqueryWindow(addOrEditDiv);//showJqueryWindow方在js/common.js中
	
}