// JavaScript Document
$(document).ready(function(e) {
	setParenHei02();
	$(window).bind("resize",setParenHei02);
	
	
	//加载更多
	/*$(".xw_morecontentBar").click(function(){
		setParenHei();//重设浏览器高度
		})*/
});
/*更改父窗口高度*/
function setParenHei02(){
	setTimeout(function(){
		var theHei = document.body.scrollHeight;
		try{ parent.window.setpageIframe(theHei); }catch(e){}
	},500);
}