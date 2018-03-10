// JavaScript Document
$(document).ready(function(){
	
	
	//setpageSize();
	
	setParenHei();
	
	//跳转详情
	$("table.huiyuanList tr td:nth-child(n+2)").click(function(){
		window.location.href='1_1_1会员详情.html';
	});$("table.chanpinList tr td:nth-child(n+2)").click(function(){
		window.location.href='2_1_1商品详情.html';
	});
	$("table.fabuList tr td:nth-child(n+2)").click(function(){
		window.location.href='2_3_2商品发布详情.html';
	});
	$("table.taocanList tr td:nth-child(n+2)").click(function(){
		window.location.href='2_4_2开店套餐详情.html';
	});
	$("table.xw_menbership tr td:nth-child(n+2)").click(function(){
		window.location.href='10_3_1会员详情.html';
	});
	$("table.xw_zhuguan tr td:nth-child(n+2)").click(function(){
		window.location.href='10_2_1主管详情.html';
	});
	$("table.xw_dianzhu tr td:nth-child(n+2)").click(function(){
		window.location.href='10_1_1店主详情.html';
	});
	$("table.tixianList tr td").click(function(){
		window.location.href='9_1_1提现详情.html';
	});
	$(".xw_temaiLink").click(function(){
		window.location.href='3_1_2特卖详情.html';
	});
	$(".xw_tichengMonth tr td").click(function(){
		window.location.href='12_5_1月份提成.html';
	});
	$(".xw_tichengMonth tr td").mouseenter(function(){
		$(this).attr("title","点击可查看该月份提成明细");
	});
	$(".xw_wenanList tr td").click(function(){
		window.location.href='2_2_1商品文案详情.html';
	});
	$(".xw_IDlist tr td").click(function(){
		window.location.href='10_4_1账户详情.html';
	});
	$(".xw_ptLink").click(function(){
		window.location.href='4_1_2拼团详情.html';
	});
	$(".xw_tmeachList tr td").click(function(){
		window.location.href='3_1_3特卖商品详情.html';
	});
	$("table.chanpinshenheList tr td:nth-child(n+2)").click(function(){
		window.location.href='3_2_2产品审核详情.html';
	});
	
	$("table.zixunList tr td:nth-child(n+2)").click(function(){
		window.location.href='5_1_1课程详情.html';
	});
	
	$("table.zixunshenheList tr td:nth-child(n+2)").click(function(){
		window.location.href='4_2_2资讯审核详情.html';
	});
	
	$("table.dingdanList tr td:nth-child(n+2)").click(function(){
		window.location.href='6_1_1订单详情.html';
	});
	$("table.tuihuoList tr td:nth-child(n+2)").click(function(){
		window.location.href='6_2_1退货详情.html';
	});
	//跳转详情
	$("table.feifazifuList tr td:nth-child(n+2)").click(function(){
		window.location.href='8_7_2查看非法字符.html';
	});
	$("table.huiyuanxiaofeiList tr td:nth-child(n+2)").click(function(){
		window.location.href='9_2_1会员消费详情.html';
	});
	$("table.qiyeList tr td:nth-child(n+2)").click(function(){
		window.location.href='10_1_1企业详情.html';
	});
	$("table.qunfaList tr td:nth-child(n+2)").click(function(){
		window.location.href='7_6_3群发详情.html';
	});
	$(window).bind("resize",resizebind);
	$(".xw_brand").css("cursor","pointer");
});



/*----------浏览器重置事件--------*/
function resizebind(){
	//setpageSize();
}
/**
 * 页面自适应大小
 */
function setpageSize() {
	
	var winWid = $(window).width();
	var winHei = $(window).height();
	setParenHei();
	
}

//获取当前页高高度
function setParenHei(){
	setTimeout(function(){
		var theHei = document.body.scrollHeight;
		try{parent.window.setIframHei(theHei);}catch(e){};
	},500);
	
}

