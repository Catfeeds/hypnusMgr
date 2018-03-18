// JavaScript Document
//首页导航选中状态
$(document).ready(function(){
	//导航
	$(".xw_dropMenu").eq(0).find("li").eq(0).addClass("on");
	$(".xw_menuDrop").click(function(){
		$(this).parents(".menuEach").siblings(".menuEach").find(".dropMenu").slideUp(200);
		$(".menuEach").removeClass("on");
		$(this).parents(".menuEach").find(".dropMenu").slideDown(200);
		$(this).parents(".menuEach").addClass("on");
		$(this).parents(".drop").find(".dropMenu li").eq(0).click();
	})
	//搜索栏-更多搜索条件
	$(".xw_moreBtn").click(function(){
		setParenHei();//重设浏览器高度
		if($(this).text()=="展开更多搜索条件∨"){
			$(this).text("收起更多搜索条件∧")
			$(this).parents(".options").siblings(".xw_moreOptions").slideDown(200);
		}
		else if($(this).text()=="收起更多搜索条件∧"){
			$(this).text("展开更多搜索条件∨");
			$(this).parents(".options").siblings(".xw_moreOptions").slideUp(200);
		}
	})
	//鹤位-产品类型
	$(".xw_heweiPchoose li").click(function(){
		$(this).addClass("on");
		$(this).siblings(".xw_heweiPchoose li").removeClass("on");
	})
	//下拉菜单
	$("input.xw_input").click(function(){

		$(this).parents("div.xw_searchBox").find("ul.xw_choice").slideDown();

	});
	$("div.xw_searchBox").mouseleave(function(){
		$("ul.xw_choice").slideUp();
	})
	$(".xw_choice li").click(function(){
		var changetext = $(this).text();
		$(this).parents("div.xw_searchBox").find(".xw_input").val(changetext);
		$("ul.xw_choice").slideUp(100);
	})
	//勾选
	$("div.xw_tick").click(function(){
		$(this).toggleClass("tickOn");
	})
	//全选
	$(".xw_tickAll").click(function(){
		if($(".xw_tickAll").hasClass("tickOn")){
			$(this).removeClass("tickOn");
			$(".xw_tick").removeClass("tickOn");
		}
		else{
			$(this).addClass("tickOn");
			$(".xw_tick").addClass("tickOn");
		}
	})
	//多选
	$(".xw_duoxuan li").click(function(e) {
		$(this).toggleClass("on");
	});
	//发票类型tab
	$("ul.xw_piao li").click(function(){
		$(this).parents("ul.xw_piao").find("li").removeClass("liOn");
		$(this).addClass("liOn");

	});
	//油价管理&油品配置tab
	$(".xw_tabBtn").click(function(){
		setParenHei();
		var index = $(this).index();
		$(".xw_tabBtn").removeClass("tabOn");
		$(this).addClass("tabOn");
		$(".xw_showContent").hide();
		$(".xw_showContent").eq(index).show();
	})
	//数据统计tab
	$(".xw_tabBtn02").click(function(){
		var index = $(this).index();
		$(".xw_tabBtn02").removeClass("tabOn");
		$(this).addClass("tabOn");
		$(".xw_showContent").hide();
		$(".xw_showContent").eq(index).show();
		scrollbar();
	})
	$(".xw_fenlei li").click(function(){
		$(this).parents(".xw_fenlei").find("li").removeClass("fenleiSelected");
		$(this).addClass("fenleiSelected");
	})
	$(".xw_qingchu").click(function(){
		$(".fenlei li").removeClass("fenleiSelected");
	})
	//单选按钮组
	$(".xw_yesornoTick").click(function(){
		$(this).parents("li").parents(".xw_y_or_n").find("li").removeClass("on");
		$(this).parents("li").addClass("on");
		if($(".xw_zhuan").hasClass("on")){
			$(".xw_inputUrl").show(200);
		}
		else{
			$(".xw_inputUrl").hide(200);
		}
	})
	//优惠类型选择
	$(".xw_ruleTick").click(function(){
		$(".xw_ruleTick").removeClass("tickOn");
		$(".xw_ruleTit").removeClass("on");
		$(this).addClass("tickOn");
		$(this).parents(".ruleTitle").find(".xw_ruleTit").addClass("on");
	})
	//库存调整历史按钮
	$(".xw_tzlsBtn").click(function() {
		$(".xw_kucunList").fadeIn();
		$(".xw_kucunHistory").show();
	});
	$(".xw_kcBtn").click(function() {
		$(".xw_kucunHistory").hide();
		$(".xw_kucunList").show();
	});
	//输入框状态
	$(".xw_textArea").focus(function(){
		$(this).parents(".textAreaBox").addClass("on");
	})
	$(".xw_textArea").blur(function(){
		$(this).parents(".textAreaBox").removeClass("on");
	})
	//开售&停售开关
	$(".xw_tingshou").click(function(){
		$(".xw_switch").animate({left:"50px"},200);
		$(".xw_switch").addClass("off");
		$(".xw_kaishou").removeClass("on");
		$(this).addClass("on");
		$(".xw_statusBox").addClass("off");
		$(".xw_statusBox .saleStatus").text("暂停销售");
	})
	$(".xw_kaishou").click(function(){
		$(".xw_switch").animate({left:"2px"},200);
		$(".xw_switch").removeClass("off");
		$(".xw_tingshou").removeClass("on");
		$(this).addClass("on");
		$(".xw_statusBox").removeClass("off");
		$(".xw_statusBox .saleStatus").text("销售中");
	})
	/*选择政策类型-累计数量时显示时间input*/
	$(".xw_leijiLi").click(function(){
		$(".xw_leijiInput").show();
		setParenHei();
	})
	$(".xw_elseLi").click(function(){
		$(".xw_leijiInput").hide();
		setParenHei();
	})
	/*提示未分配计划销售量*/
	$(".xw_hint").mouseenter(function(){
		$(this).siblings(".xw_yet").fadeIn(200);
		$(this).css("border","#ffa468 solid 1px");
	})
	$(".xw_hint").mouseleave(function(){
		$(this).siblings(".xw_yet").hide();
		$(this).css("border","#ececec solid 1px");
	})
	/*设为常用车辆*/
	$(".xw_changyong").click(function(){
		$(this).toggleClass("changyonged");
	});
	//类型选择
	$("div.xw_type").click(function(){
		$(this).parents("div.typeDiv").find("div.xw_type").removeClass("typed");
		$(this).addClass("typed");
	});
	/*继续添加车辆*/
	$(".xw_addBar").click(function(){
		$(this).parents(".xw_transportType").find(".xw_transportMsn").show();
		setParenHei();
	});
	$(".xw_delete").click(function(){
		$(".xw_transportMsn").hide();
		setParenHei();
	});

	//添加和收起下拉列表
	$(".xw_xiala").click(function(){
		$(this).parents(".fenleiBox").find(".xialalist").slideDown();
	});

	$(".xialalist a").click(function(){
		var t = $(this).text();
		$(this).parents(".xialalist").siblings(".xw_xiala").val(t);

	});
	$(".fenleiBox").mouseleave(function(){
		$(".xialalist").slideUp();
	});

	$(".xialalist a").click(function(){
		$(this).parents(".fenleiBox").find(".xialalist").slideUp();
	});
	$(".xw_addDiscount").click(function() {
		$(".xw_listBox").slideDown(200);
	});
	$(".xw_addBox").mouseleave(function() {
		$(".xw_listBox").slideUp(200);
	});
	$(".xw_listBtn").click(function() {
		$(".xw_listBox").slideUp(200);
	});
});
/*弹窗的关闭事件*/
function closeWindow(){
	$("#addEdit").window("close")
}
/*操作反馈出现+3秒后自动关闭*/
/*操作成功*/
function feedback(){
	$(".xw_hintText").text("操作成功！");
	$(".xw_hintBar").slideDown();
	$(".xw_hintBar").removeClass("green red");
	$(".xw_hintBar").addClass("green");
	setTimeout(function () {
		$(".xw_hintBar").fadeOut();
	}, 3000);
}
/*操作失败*/
function feedback_fail(){
	$(".xw_hintText").text("操作失败！请重试。");
	$(".xw_hintBar").slideDown();
	$(".xw_hintBar").removeClass("green red");
	$(".xw_hintBar").addClass("red");
	setTimeout(function () {
		$(".xw_hintBar").fadeOut();
	}, 3000);
}
/*手动关闭操作反馈*/
function close_feedback(){
	$(".xw_hintBar").fadeOut();
}