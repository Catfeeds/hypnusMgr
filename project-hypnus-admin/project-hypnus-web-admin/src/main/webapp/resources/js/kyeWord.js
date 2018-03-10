// JavaScript Document



//$(document).ready(function(){
//	
//	$(window).bind("resize",resizebind);
//});

//审核管理
function openDialog_shenhe() {
	var addOrEditDiv = {
			width:350,
			height:210,
			zIndex: 9000,
			draggable:true, //拖动
			resizable:true, //改变大小
			modal: true, //后台页面可编辑
			closed: false, //是否关闭？
			minimizable: false,//最小化按钮
			maximizable: false,//最大化按钮
			closable: true, //关闭按钮
			collapsible: true, //收缩按钮 
			title:"审核",
			url:"6_2_2退货审核弹窗.html",
			id:"addEdit"
	};
	window.top.showJqueryWindow(addOrEditDiv);//showJqueryWindow方在js/common.js中	
}
//退款
function openDialog_tuikuan() {
	var addOrEditDiv = {
			width:350,
			height:205,
			zIndex: 9000,
			draggable:true, //拖动
			resizable:true, //改变大小
			modal: true, //后台页面可编辑
			closed: false, //是否关闭？
			minimizable: false,//最小化按钮
			maximizable: false,//最大化按钮
			closable: true, //关闭按钮
			collapsible: true, //收缩按钮 
			title:"退款",
			url:"6_2_3退款弹窗.html",
			id:"addEdit"
	};
	window.top.showJqueryWindow(addOrEditDiv);//showJqueryWindow方在js/common.js中
}
//收到退货
function openDialog_received() {
	var addOrEditDiv = {
			width:350,
			height:220,
			zIndex: 9000,
			draggable:true, //拖动
			resizable:true, //改变大小
			modal: true, //后台页面可编辑
			closed: false, //是否关闭？
			minimizable: false,//最小化按钮
			maximizable: false,//最大化按钮
			closable: true, //关闭按钮
			collapsible: true, //收缩按钮 
			title:"收到退货",
			url:"6_2_3收到退货弹窗.html",
			id:"addEdit"
	};
	window.top.showJqueryWindow(addOrEditDiv);//showJqueryWindow方在js/common.js中
}
//新增商品规格
function openDialog_newGuige() {
	var addOrEditDiv = {
			width:350,
			height:160,
			zIndex: 9000,
			draggable:true, //拖动
			resizable:true, //改变大小
			modal: true, //后台页面可编辑
			closed: false, //是否关闭？
			minimizable: false,//最小化按钮
			maximizable: false,//最大化按钮
			closable: true, //关闭按钮
			collapsible: true, //收缩按钮 
			title:"新增商品规格",
			url:"13_1_1新增商品规格弹窗.html",
			id:"addEdit"
	};
	window.top.showJqueryWindow(addOrEditDiv);//showJqueryWindow方在js/common.js中
	
}
//添加规格明细
function openDialog_addEachGuige() {
	var addOrEditDiv = {
			width:350,
			height:160,
			zIndex: 9000,
			draggable:true, //拖动
			resizable:true, //改变大小
			modal: true, //后台页面可编辑
			closed: false, //是否关闭？
			minimizable: false,//最小化按钮
			maximizable: false,//最大化按钮
			closable: true, //关闭按钮
			collapsible: true, //收缩按钮 
			title:"添加规格明细",
			url:"13_1_2添加规格明细弹窗.html",
			id:"addEdit"
	};
	window.top.showJqueryWindow(addOrEditDiv);//showJqueryWindow方在js/common.js中
	
}
//添加参数
function openDialog_addCanshu() {
	var addOrEditDiv = {
			width:350,
			height:210,
			zIndex: 9000,
			draggable:true, //拖动
			resizable:true, //改变大小
			modal: true, //后台页面可编辑
			closed: false, //是否关闭？
			minimizable: false,//最小化按钮
			maximizable: false,//最大化按钮
			closable: true, //关闭按钮
			collapsible: true, //收缩按钮 
			title:"添加参数",
			url:"13_1_3添加参数弹窗.html",
			id:"addEdit"
	};
	window.top.showJqueryWindow(addOrEditDiv);//showJqueryWindow方在js/common.js中
	
}
//新增商品分类
function openDialog_newFenlei() {
	var addOrEditDiv = {
			width:350,
			height:160,
			zIndex: 9000,
			draggable:true, //拖动
			resizable:true, //改变大小
			modal: true, //后台页面可编辑
			closed: false, //是否关闭？
			minimizable: false,//最小化按钮
			maximizable: false,//最大化按钮
			closable: true, //关闭按钮
			collapsible: true, //收缩按钮 
			title:"新增商品分类",
			url:"13_1_4新增商品分类.html",
			id:"addEdit"
	};
	window.top.showJqueryWindow(addOrEditDiv);//showJqueryWindow方在js/common.js中
	
}
//订单发货
function openDialog_fahuo() {
	var addOrEditDiv = {
			width:400,
			height:210,
			zIndex: 9000,
			draggable:true, //拖动
			resizable:true, //改变大小
			modal: true, //后台页面可编辑
			closed: false, //是否关闭？
			minimizable: false,//最小化按钮
			maximizable: false,//最大化按钮
			closable: true, //关闭按钮
			collapsible: true, //收缩按钮 
			title:"发货",
			url:"6_1_2订单发货弹窗.html",
			id:"addEdit"
	};
	window.top.showJqueryWindow(addOrEditDiv);//showJqueryWindow方在js/common.js中
	
}
//回复管理
function openDialog_huifu() {
	var addOrEditDiv = {
			width:600,
			height:220,
			zIndex: 9000,
			draggable:true, //拖动
			resizable:true, //改变大小
			modal: true, //后台页面可编辑
			closed: false, //是否关闭？
			minimizable: false,//最小化按钮
			maximizable: false,//最大化按钮
			closable: true, //关闭按钮
			collapsible: true, //收缩按钮 
			title:"回复管理",
			url:"6_1_1_1回复管理.html",
			id:"addEdit"
	};
	window.top.showJqueryWindow(addOrEditDiv);//showJqueryWindow方在js/common.js中
	
}
//群发消息
function openDialog_qunfa() {
	var addOrEditDiv = {
			width:650,
			height:520,
			zIndex: 9000,
			draggable:true, //拖动
			resizable:true, //改变大小
			modal: true, //后台页面可编辑
			closed: false, //是否关闭？
			minimizable: false,//最小化按钮
			maximizable: false,//最大化按钮
			closable: true, //关闭按钮
			collapsible: true, //收缩按钮 
			title:"新建群发",
			url:"7_5_1新建群发.html",
			id:"addEdit"
	};
	window.top.showJqueryWindow(addOrEditDiv);//showJqueryWindow方在js/common.js中
	
}
//新建群发
function openDialog_qunfa() {
	var addOrEditDiv = {
			width:650,
			height:520,
			zIndex: 9000,
			draggable:true, //拖动
			resizable:true, //改变大小
			modal: true, //后台页面可编辑
			closed: false, //是否关闭？
			minimizable: false,//最小化按钮
			maximizable: false,//最大化按钮
			closable: true, //关闭按钮
			collapsible: true, //收缩按钮 
			title:"新建群发",
			url:"7_6_1新建群发.html",
			id:"addEdit"
	};
	window.top.showJqueryWindow(addOrEditDiv);//showJqueryWindow方在js/common.js中
}
//新建群发
function openDialog_xiaoxileixing() {
	var addOrEditDiv = {
			width:650,
			height:520,
			zIndex: 9000,
			draggable:true, //拖动
			resizable:true, //改变大小
			modal: true, //后台页面可编辑
			closed: false, //是否关闭？
			minimizable: false,//最小化按钮
			maximizable: false,//最大化按钮
			closable: true, //关闭按钮
			collapsible: true, //收缩按钮 
			title:"选择消息类型",
			url:"7_6_2消息类型.html",
			id:"addEdit"
	};
	window.top.showJqueryWindow(addOrEditDiv);//showJqueryWindow方在js/common.js中
	
}
//选择商品
function openDialog_shangpin() {
	var addOrEditDiv = {
			width:850,
			height:480,
			zIndex: 9000,
			draggable:true, //拖动
			resizable:true, //改变大小
			modal: true, //后台页面可编辑
			closed: false, //是否关闭？
			minimizable: false,//最小化按钮
			maximizable: false,//最大化按钮
			closable: true, //关闭按钮
			collapsible: true, //收缩按钮 
			title:"选择商品",
			url:"2_3_1选择商品弹窗.html",
			id:"addEdit"
	};
	window.top.showJqueryWindow(addOrEditDiv);//showJqueryWindow方在js/common.js中
}
//选择商品（开店套餐）
function openDialog_taocan() {
	var addOrEditDiv = {
			width:850,
			height:480,
			zIndex: 9000,
			draggable:true, //拖动
			resizable:true, //改变大小
			modal: true, //后台页面可编辑
			closed: false, //是否关闭？
			minimizable: false,//最小化按钮
			maximizable: false,//最大化按钮
			closable: true, //关闭按钮
			collapsible: true, //收缩按钮 
			title:"选择商品",
			url:"2_4_1选择商品弹窗（开店套餐）.html",
			id:"addEdit"
	};
	window.top.showJqueryWindow(addOrEditDiv);//showJqueryWindow方在js/common.js中
}
//补货（开店套餐）
function openDialog_bu() {
	var addOrEditDiv = {
			width:500,
			height:600,
			zIndex: 9000,
			draggable:true, //拖动
			resizable:true, //改变大小
			modal: true, //后台页面可编辑
			closed: false, //是否关闭？
			minimizable: false,//最小化按钮
			maximizable: false,//最大化按钮
			closable: true, //关闭按钮
			collapsible: true, //收缩按钮 
			title:"请输入商品的补货数量",
			url:"2_4_3补货.html",
			id:"addEdit"
	};
	window.top.showJqueryWindow(addOrEditDiv);//showJqueryWindow方在js/common.js中
}
//排序（商品发布）
function openDialog_paixu() {
	var addOrEditDiv = {
			width:500,
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
			title:"请输入商品的补货数量",
			url:"2_3_3商品排序弹窗.html",
			id:"addEdit"
	};
	window.top.showJqueryWindow(addOrEditDiv);//showJqueryWindow方在js/common.js中
}
//选择商品（特卖新增）
function openDialog_tmshangpin() {
	var addOrEditDiv = {
			width:850,
			height:480,
			zIndex: 9000,
			draggable:true, //拖动
			resizable:true, //改变大小
			modal: true, //后台页面可编辑
			closed: false, //是否关闭？
			minimizable: false,//最小化按钮
			maximizable: false,//最大化按钮
			closable: true, //关闭按钮
			collapsible: true, //收缩按钮 
			title:"选择活动商品",
			url:"3_1_1特卖选择商品弹窗.html",
			id:"addEdit"
	};
	window.top.showJqueryWindow(addOrEditDiv);//showJqueryWindow方在js/common.js中
}
//选择商品（拼团新增）
function openDialog_ptshangpin() {
	var addOrEditDiv = {
			width:850,
			height:480,
			zIndex: 9000,
			draggable:true, //拖动
			resizable:true, //改变大小
			modal: true, //后台页面可编辑
			closed: false, //是否关闭？
			minimizable: false,//最小化按钮
			maximizable: false,//最大化按钮
			closable: true, //关闭按钮
			collapsible: true, //收缩按钮 
			title:"选择拼团商品",
			url:"4_1_1拼团选择商品弹窗.html",
			id:"addEdit"
	};
	window.top.showJqueryWindow(addOrEditDiv);//showJqueryWindow方在js/common.js中
}
//选择商品（文案新增）
function openDialog_washangpin() {
	var addOrEditDiv = {
			width:850,
			height:480,
			zIndex: 9000,
			draggable:true, //拖动
			resizable:true, //改变大小
			modal: true, //后台页面可编辑
			closed: false, //是否关闭？
			minimizable: false,//最小化按钮
			maximizable: false,//最大化按钮
			closable: true, //关闭按钮
			collapsible: true, //收缩按钮 
			title:"选择商品",
			url:"2_2_3选择商品弹窗（文案）.html",
			id:"addEdit"
	};
	window.top.showJqueryWindow(addOrEditDiv);//showJqueryWindow方在js/common.js中
}
//选择代金券
function openDialog_coupon() {
	var addOrEditDiv = {
			width:850,
			height:570,
			zIndex: 9000,
			draggable:true, //拖动
			resizable:true, //改变大小
			modal: true, //后台页面可编辑
			closed: false, //是否关闭？
			minimizable: false,//最小化按钮
			maximizable: false,//最大化按钮
			closable: true, //关闭按钮
			collapsible: true, //收缩按钮 
			title:"选择代金券",
			url:"8_1_2选择代金券弹窗.html",
			id:"addEdit"
	};
	window.top.showJqueryWindow(addOrEditDiv);//showJqueryWindow方在js/common.js中
}
//选择发送用户
function openDialog_send() {
	var addOrEditDiv = {
			width:950,
			height:570,
			zIndex: 9000,
			draggable:true, //拖动
			resizable:true, //改变大小
			modal: true, //后台页面可编辑
			closed: false, //是否关闭？
			minimizable: false,//最小化按钮
			maximizable: false,//最大化按钮
			closable: true, //关闭按钮
			collapsible: true, //收缩按钮 
			title:"选择发送用户",
			url:"7_1_2_1选择发送用户弹窗.html",
			id:"addEdit"
	};
	window.top.showJqueryWindow(addOrEditDiv);//showJqueryWindow方在js/common.js中
}
//分配主管
function openDialog_fenpeizhuguan() {
	var addOrEditDiv = {
			width:650,
			height:570,
			zIndex: 9000,
			draggable:true, //拖动
			resizable:true, //改变大小
			modal: true, //后台页面可编辑
			closed: false, //是否关闭？
			minimizable: false,//最小化按钮
			maximizable: false,//最大化按钮
			closable: true, //关闭按钮
			collapsible: true, //收缩按钮 
			title:"分配主管",
			url:"10_1_1_1分配主管.html",
			id:"addEdit"
	};
	window.top.showJqueryWindow(addOrEditDiv);//showJqueryWindow方在js/common.js中
}
//解释概念
function openDialog_whatis() {
	var addOrEditDiv = {
			width:500,
			height:300,
			zIndex: 9000,
			draggable:true, //拖动
			resizable:true, //改变大小
			modal: true, //后台页面可编辑
			closed: false, //是否关闭？
			minimizable: false,//最小化按钮
			maximizable: false,//最大化按钮
			closable: true, //关闭按钮
			collapsible: true, //收缩按钮 
			title:"什么是xxxx?",
			url:"8_1_3文字说明弹窗.html",
			id:"addEdit"
	};
	window.top.showJqueryWindow(addOrEditDiv);//showJqueryWindow方在js/common.js中
}
//确定选拔为主管吗？
function openDialog_really() {
	var addOrEditDiv = {
			width:850,
			height:600,
			zIndex: 9000,
			draggable:true, //拖动
			resizable:true, //改变大小
			modal: true, //后台页面可编辑
			closed: false, //是否关闭？
			minimizable: false,//最小化按钮
			maximizable: false,//最大化按钮
			closable: true, //关闭按钮
			collapsible: true, //收缩按钮 
			title:"提示",
			url:"10_1_1_2确定选拔为主管吗弹窗.html",
			id:"addEdit"
	};
	window.top.showJqueryWindow(addOrEditDiv);//showJqueryWindow方在js/common.js中
}
//选择商品分类
function openDialog_pickType() {
	var addOrEditDiv = {
			width:850,
			height:525,
			zIndex: 9000,
			draggable:true, //拖动
			resizable:true, //改变大小
			modal: true, //后台页面可编辑
			closed: false, //是否关闭？
			minimizable: false,//最小化按钮
			maximizable: false,//最大化按钮
			closable: true, //关闭按钮
			collapsible: true, //收缩按钮 
			title:"选择商品分类",
			url:"2_1_2_1选择商品分类.html",
			id:"addEdit"
	};
	window.top.showJqueryWindow(addOrEditDiv);//showJqueryWindow方在js/common.js中
}