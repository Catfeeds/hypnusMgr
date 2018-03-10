// JavaScript Document
$(document).ready(function(){
	
	//展开收起更多查询条件
	$(".xw_moresearch_down").click(function(){
		$(".moresearch").slideDown();
		$(this).hide();
		$(".xw_moresearch_up").show();
	});
	
	$(".xw_moresearch_up").click(function(){
		$(".moresearch").slideUp();
		$(".xw_moresearch_down").show();
		$(this).hide();
	});
	
	//列表选择加背景色
	$(".tylelist").click(function(){
		$(".tylelist").removeClass("tylelist_on");
		$(this).addClass("tylelist_on");
	});
	
	
	
	
	/*------选中效事件-------*/
	$("a.checkbox").click(function(){
		$(this).toggleClass("checked");
	});
	$("a.xw_checkbox").click(function(){
		$(this).toggleClass("checked");
	});
	
	$("a.xw_allcheck").click(function(){
		var isopen = parseInt($(this).attr('rel'));
		if(isopen == 0){
			$(this).addClass("checked");
			$("a.checkbox").addClass("checked");
			$(this).attr("rel",1)
		}else{
			$(this).removeClass("checked");
			$("a.checkbox").removeClass("checked");
			$(this).attr("rel",0)
		}
		
	});
	
	
});

