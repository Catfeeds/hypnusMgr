// JavaScript Document
$(document).ready(function(e) {
	setParenHei();
	$(window).bind("resize",setParenHei);
	
	
	//加载更多
	$(".xw_morecontentBar").click(function(){
		setParenHei();//重设浏览器高度
		})
});
/*更改父窗口高度*/
function setParenHei(){
	setTimeout(function(){
		var theHei = document.body.scrollHeight;
		try{ parent.window.setpageIframe(theHei); }catch(e){}
	},500);
}
function picFun() {
	//勾选
	$(".xw_tickpic").click(function(){
			$(this).toggleClass("pictickOn");
		})
	//全选
    $(".xw_tickAllpic").click(function(){
		if($(".xw_tickAllpic").hasClass("pictickOn")){
			$(this).removeClass("pictickOn");
			$(".xw_tickpic").removeClass("pictickOn");
		}
		else{
			$(this).addClass("pictickOn");
			$(".xw_tickpic").addClass("pictickOn");
		}
	})
		
}