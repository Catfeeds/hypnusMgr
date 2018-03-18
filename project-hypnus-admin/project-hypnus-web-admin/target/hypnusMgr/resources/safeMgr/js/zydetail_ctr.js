// JavaScript Document
$(document).ready(function(){
	
	//setpageSize();
	
	$("ul.xw_DataListTabUl li").click(function(){
		$("ul.xw_DataListTabUl li").removeClass("ListTabOn");
		$(this).addClass("ListTabOn");
		var index = $("ul.xw_DataListTabUl").find('li').index(this);
		
		$("div.xw_tabMain").find("div.xw_tabMainBody").slideUp();
		$("div.xw_tabMain").find("div.xw_tabMainBody").eq(index).slideDown();
		
		//setParenHei();
	});
	
	
	//$(window).bind("resize",resizebind);
});


/*--------浏览器窗口重置事----------*/
function resizebind(){
	setpageSize();
	
}
/*--------浏览器窗口重置事-END---------*/


/**
 * 页面自适应大小
 */
function setpageSize() {
	
	var winWid = $(window).width();
	var winHei = $(window).height();
	if (document.documentElement.clientHeight < document.documentElement.offsetHeight) {
		winWid = winWid - 20;
	}
	
	setParenHei();
	
}


/*更改父窗口高度*/
function setParenHei(){
	setTimeout(function(){
		var theHei = document.body.scrollHeight;
		try{parent.window.setpageIframe(theHei);}catch(e){}
	},500);
}


