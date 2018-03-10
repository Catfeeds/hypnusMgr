// JavaScript Document
$(document).ready(function(e) {
	//勾选
	$(".xw_tick").click(function(){
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
	});
	
	/*//选择类别
	$("div.xw_activitiestype").click(function(){
		$("div.xw_activitiestype").removeClass("activitiestyped")
		$(this).addClass("activitiestyped");
		$("span.xw_ticked").removeClass("ticked");
		$(this).find("span.xw_ticked").addClass("ticked");
	})*/
	//单选按钮组
	$(".xw_activitiestype").click(function(){
		$(this).siblings(".xw_activitiestype").removeClass("on")
		$(this).addClass("on");
		var tickText = $(this).attr("rel");
		if(tickText == 2){
			$(this).parents(".xw_eachLine").siblings(".xw_showOption").slideUp(200);
			}else if(tickText == 3){
				$(this).parents(".xw_eachLine").siblings(".xw_showOption").slideDown(200);
				}else if(tickText == 4){
					$(this).parents(".xw_eachLine").parents("div.bonusBox").find(".xw_show4").show(200);
					$(this).parents(".xw_eachLine").parents("div.bonusBox").find(".xw_show5").hide(200);
					}else if(tickText == 5){
						$(this).parents(".xw_eachLine").parents("div.bonusBox").find(".xw_show5").show(200);
						$(this).parents(".xw_eachLine").parents("div.bonusBox").find(".xw_show4").hide(200);
						}
		var bonusType = $(this).attr("bonustype");
		if(bonusType == "type1"){
			$(".xw_bonusBox1").show();
			$(".xw_bonusBox2").hide();
			}else if(bonusType == "type2"){
				$(".xw_bonusBox2").show();
				$(".xw_bonusBox1").hide();
				}
	})
	//展开更多查询条件
	$(".xw_moreOptions").click(function(){
		var myText = $(this).text();
		if(myText == "展开更多↓"){
			$(".xw_hideBar").slideDown(200);
			$(this).text("收起↑");
			}
			else if(myText == "收起↑"){
			$(".xw_hideBar").slideUp(200);
			$(this).text("展开更多↓");
			}
		})
	//销售奖励-梯度编辑
	/*删除*/
	$(".xw_deleRange").click(function(){
		$(this).parents(".topDevide").parents(".xw_range").hide(200);
	})
	/*添加*/
	$(".xw_addRange").click(function(){
		$(this).siblings(".xw_rangeHide").show(200);
	})
	//多选选择类别
	$(".xw_optionUl li").click(function(){
			$(this).toggleClass("on");
		})
	//选择类别后有所隐藏出现
	$("div.xw_activitiesDown").click(function(){
		var index = $("div.xw_activitiesDown").index(this);
		$(this).parent("td.xw_xuanze").find("div.xw_activitiesDown").removeClass("activitiestyped")
		$(this).addClass("activitiestyped");
		if(index==0){
			$(".hideContent").slideDown();
			
		}
		else{
			$(".hideContent").slideUp();
		}
		$(".hideContent").eq(index).slideDown();
		$(this).parents("td.xw_xuanze").find("div.xw_activitiesDown").find("span.xw_ticked").removeClass("ticked");
		$(this).find("span.xw_ticked").addClass("ticked");
	})
	
	//展开收起更多查询条件
	$("a.moresearchForm").click(function(){
		$(this).toggleClass("up");
		$(this).parents("div.searchDiv").find("div.xw_kMainContentbody").slideToggle('fast');
		setParenHei();
	});
	
	//下拉输入查询框事件
	$("div.mohusearch").hover(function(){
		$(this).find("div.xw_searchDoult").slideDown('fast');
		
		$(".jieguolist li").click(function(){
			var changetext = $(this).text();
			$(this).parents("div.mohusearch").find(".xw_searchInput").val(changetext);
			});
	},function(){
		$(this).find("div.xw_searchDoult").slideUp();
	});

	$("div.xw_moreDrop").hover(function(){
		$(this).find("div.xw_searchDoult").slideDown('fast');
		
		$(".jieguolist li").click(function(){
			var changetext = $(this).text();
			$(this).parents("div.xw_moreDrop").find(".xw_searchInput").val(changetext);
			});
	},function(){
		$(this).find("div.xw_searchDoult").slideUp();
	});
	
	//异步的下拉输入查询框事件
	$(".xw_YBsearchDivInput").click(function(){
		$(this).parents(".xw_YBsearchDiv").find("ul.xw_YBsearchList").slideDown('fast');
	});
	$(".xw_YBsearchDiv").mouseleave(function(){
		$(this).find("ul.xw_YBsearchList").slideUp('fast');
	});
	$("ul.xw_YBsearchList li").click(function(){
		var textVal = $(this).text();
		$(this).parents(".xw_YBsearchDiv").find(".xw_YBsearchDivInput").val(textVal);
	});
	
	
	//详情的下拉输入查询框事件
	$("div.xw_circlemohusearch").hover(function(){
		$(this).find("div.xw_draDownToChose").slideDown('fast');
	},function(){
		$(this).find("div.xw_draDownToChose").slideUp();
	});
	
	//展开收起列表
	$(".acc-openbar-btn").click(function(){
		$(this).toggleClass("up");
		$(this).parents("div.xw_leftDataListBody").find(".xw_slidDiv").slideToggle();
		setParenHei();
	});
	//列表单双行分割
	$("table.datalistTable tbody tr:even").addClass("even");
	
	//商品规格选择
	$(".xw_guigeDiv").click(function(){
		$(this).toggleClass("on");
	});
	//商品规格管理列表选中效果
	$(".xw_brand").click(function(){
		$(this).parents("tr").siblings("tr").removeClass("on");
		$(this).parents("tr").addClass("on");
		})
	//详情页面顶部Tab
	$(".xw_topTab li").click(function(){
		$(".xw_topTab li").removeClass("on");
		$(this).addClass("on");
		var tindex = $(".xw_topTab li").index(this);
		$(".xw_showcontent").hide();
		$(".xw_showcontent").eq(tindex).show();
		setParenHei();
	});
	setParenH();
});
function setParenH(){
	setTimeout(function(){
		var theHei = document.body.scrollHeight;
		try{parent.window.setpageIframe(theHei);}catch(e){ }
	},500);
}
