// JavaScript Document

	
$(document).ready(function(){
	
	//选择类别
	$("div.xw_activitiestypeb").click(function(){
		$(this).parent("td.xw_xuanzeb").find("div.xw_activitiestypeb").removeClass("activitiestyped")
		$(this).addClass("activitiestyped");
		$(this).parents("td.xw_xuanzeb").find("div.xw_activitiestypeb").find("span.xw_tickedb").removeClass("ticked");
		$(this).find("span.xw_tickedb").addClass("ticked");
	})
});
