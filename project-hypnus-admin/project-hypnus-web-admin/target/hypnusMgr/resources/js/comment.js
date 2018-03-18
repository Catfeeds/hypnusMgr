// JavaScript Document

$(document).ready(function(e) {
    
	//评论点击更多回复查看
	$(".xw_huifuTip").click(function(){
		$(this).parents(".commentComtent").siblings(".huifuHide").slideToggle()
		
	});
	
	
	//屏蔽按钮切换
	$(".xw_pingbi").click(function(){
		$(this).toggleClass("pingbiBtn","pingbiBtn02");
	});
	$(".xw_pingbi").mouseover(function(){
		if($(this).hasClass("pingbiBtn")){
			$(this).siblings(".pingbiTip02").show();
			$(this).siblings(".pingbiTip01").hide();
			
		}
		else{
			$(this).siblings(".pingbiTip01").show();
			$(this).siblings(".pingbiTip02").hide();
		}
	});
	$(".xw_pingbi").mouseout(function(){
		$(".pingbiTip02").hide();
		$(".pingbiTip01").hide();
	});
});