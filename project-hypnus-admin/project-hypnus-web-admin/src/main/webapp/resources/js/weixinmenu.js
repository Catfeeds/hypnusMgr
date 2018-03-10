// JavaScript Document


$(document).ready(function(e) {

	//一级菜单选择
	$("div.xw_menuTypeDiv").click(function(){
		$(this).parents("div.menuType").find("div.xw_menuTypeDiv").removeClass("menuTyped");
		$(this).addClass("menuTyped");
		
		var yijitypeNum = $(this).parents("div.menuType").find('div.xw_menuTypeDiv').index(this);
		$(this).parents("div.menuType").parents("div.operation").find("div.xw_editType").hide();
		$(this).parents("div.menuType").parents("div.operation").find("div.xw_editType").eq(yijitypeNum).show();

	});
	
	//一级直接回复类型选择
	$("div.xw_huifuTypeDiv").click(function(){
		$(this).parents("div.xw_editType").find("div.xw_huifuTypeDiv").removeClass("huifuTypeDived");
		$(this).addClass("huifuTypeDived");
		
		var yijihuifuNum = $(this).parents("div.menuType").find('div.xw_huifuTypeDiv').index(this);
		$(this).parents("div.menuType").parents("div.huifu").find("div.xw_huifuContent").hide();
		$(this).parents("div.menuType").parents("div.huifu").find("div.xw_huifuContent").eq(yijihuifuNum).show();

	});
	
	//二级菜单出现隐藏
	$("div.addSecond").click(function(){
		$(this).parents("div.menu").find("div.menuDiv").find("ul.xw_subMenu").show();
	});
	$("div.addSecondOut").click(function(){
		$(this).parents("div.menu").find("div.menuDiv").find("ul.xw_subMenu").hide();
	});
	
	//二级菜单编辑
	$("ul.xw_subMenu li").click(function(){
		$(this).parents("div.xw_menuDiv").parents("div.menu").find("div.xw_secondMenu").show();
	});
	
	//二级菜单选择
	$("div.xw_menuTypeDiv02").click(function(){
		$(this).parents("div.xw_menuType02").find("div.xw_menuTypeDiv02").removeClass("menuTyped");
		$(this).addClass("menuTyped");
		
		var erjiTypeNum = $(this).parents("div.xw_menuType02").find('div.xw_menuTypeDiv02').index(this);
		$(this).parents("div.xw_menuType02").parents("div.xw_secondMenu").find("div.xw_editType02").hide();
		$(this).parents("div.xw_menuType02").parents("div.xw_secondMenu").find("div.xw_editType02").eq(erjiTypeNum).show();
			
	});
	
	//二级直接回复类型选择
	$("div.xw_huifuTypeDiv02").click(function(){
		$(this).parents("div.xw_editType02").find("div.xw_huifuTypeDiv02").removeClass("huifuTypeDived");
		$(this).addClass("huifuTypeDived");
		
		var erjihuifuNum = $(this).parents("div.xw_editType02").find('div.xw_huifuTypeDiv02').index(this);
		$(this).parents("div.menuType").parents("div.xw_huifu").find("div.xw_huifuContent02").hide();
		$(this).parents("div.menuType").parents("div.xw_huifu").find("div.xw_huifuContent02").eq(erjihuifuNum).show();

	});
	
	
});


//素材选择
function openDialog_sucai() {
	var addOrEditDiv = {
			width:660,
			height:410,
			zIndex: 9000,
			draggable:true, //拖动
			resizable:true, //改变大小
			modal: true, //后台页面可编辑
			closed: false, //是否关闭？
			minimizable: false,//最小化按钮
			maximizable: false,//最大化按钮
			closable: true, //关闭按钮
			collapsible: true, //收缩按钮 
			title:"素材选择",
			url:"15-1素材选择.html",
			id:"addEdit"
	};
	window.top.showJqueryWindow(addOrEditDiv);//showJqueryWindow方在js/common.js中
	
}
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