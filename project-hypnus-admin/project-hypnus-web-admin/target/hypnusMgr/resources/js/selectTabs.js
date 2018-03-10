// JavaScript Document


$(document).ready(function(e) {
    
	//tabs选择下拉
	$(".xw_select").click(function(){
		var index = $(".xw_select").index(this);
		$(".xw_select").removeClass("selectTabs_on");
		$(this).addClass("selectTabs_on");
		$(".selectContents").hide();
		$(".selectContents").eq(index).show();
		
		})
});