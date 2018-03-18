// JavaScript Document

$(document).ready(function(){
	
	setSize();
	
	/*---自动登陆---*/
	$(".autodenglu").click(function(){
		$(".zidong").toggle();
		$(".buzidong").toggle();
	});
	
	$(window).bind("resize",setSize);
});


function setSize(){
	/*var winHei = $(window).height() - $("div.topheader").outerHeight() - $("div.bottom").outerHeight();
	var padding = (winHei - $("div.mainmid").outerHeight())/2;
	$("div.xw_mainbox").css({"padding-top":padding,"padding-bottom":padding});*/
	
	var winHei = ($(window).height() - 1000)/2;
	$("div.xw_loginMain").animate({top:winHei});
	
}
