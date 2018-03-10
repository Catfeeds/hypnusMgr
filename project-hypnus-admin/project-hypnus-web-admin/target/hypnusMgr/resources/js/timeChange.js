// JavaScript Document
$(document).ready(function(e) {
    $(".xw_calendar_datechange span").click(function(){
		$(this).parents(".searchBox").find(".xw_calendar_datechange span").removeClass("timeOn");
		$(this).addClass("timeOn");
		var index = $(".xw_calendar_datechange").find('span').index(this);
		$(".xw_calendar_box").find("div.xw_calendar").hide();
		$(".xw_calendar_box").find("div.xw_calendar").eq(index).show();
		/*if(index==1){
			appennasychart('gongkuang_container02',ChartJsonB);
		}else if(index==2){
			appennasychart('gongkuang_container03',ChartJsonC);
		}*/
		
	});
});