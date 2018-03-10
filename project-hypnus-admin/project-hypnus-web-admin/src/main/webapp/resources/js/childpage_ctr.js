// JavaScript Document
$(document).ready(function(){
	
	setcenterSize();
	changeIframUrl();
	
	//头部人员信息下拉
	$("div.xw_userdra").hover(function(){
		$(this).find("div.xw_usermsgMenu").slideDown();
	},function(){
		$(this).find("div.xw_usermsgMenu").slideUp();
	});
	
	
	//返回顶部
	$("#toTopDiv").click(function(){
		$('body,html').animate({scrollTop:0},1000);
		$(this).fadeOut();
        return false;
	});
	
	$(window).bind("resize",resizebind);
});


/*----------浏览器重置事件--------*/
function resizebind(){
	setcenterSize();
}


//初始化页面宽高
function setcenterSize(){
	var winWid = $(window).width();
	var winHei = $(window).height();
	
	var rightWidth = winWid - $("div.xw_leftMain").outerWidth();
	//$("div.xw_rightMain").css({width:rightWidth});
	
	var bodyHeight = winHei - $("div.header").outerHeight() - $("div.menuBar").outerHeight() - $("div.footer").outerHeight();
	//$("#pageIframe").css({width:rightWidth,height:bodyHeight});
	$("#pageIframe, #listBox").height(bodyHeight);
	   
}
function setcenterSizeb(){
	var winWid = $(window).width();
	var winHei = $(window).height();
	
	var bodyHei = winHei - $("div.head").outerHeight();
	var rightWid = winWid - $("div.leftMain").outerWidth();
	
	//$("#indexIframe").css({ width:rightWid});
}

//new 对比左侧菜单高度和iframe所显示的子页面的高度，取较高者值。
function setpageIframe(heiNum){
	var pagehei = heiNum;
	var leftmuneHei = $("div.xw_leftMain").outerHeight();
	if(heiNum>=leftmuneHei){
		pagehei = heiNum;
	}else{
		pagehei = leftmuneHei;
	}
	$("#pageIframe").css({height:pagehei});
	//$("div.xw_leftMain").css({height:pagehei});
	//setParenHei();
}


//给各子页面调用设置这个主体页面宽高的事件
function setpageIframe(heiNum){
	$("#pageIframe").css({height:heiNum});
	$("div.xw_leftMain").css({height:heiNum});
	setParenHei();
}


//弹窗的关闭事件
function closeWindow(){
	$("#addEdit").window("close")
}

//更换iframe页面
function WindowOpenNew(changeUrl){
	$("#pageIframe").attr('src',changeUrl);
}



//底部滚动事件
function toTopHide(){ 
  document.documentElement.scrollTop+document.body.scrollTop > 70 ? $("#toTopDiv").fadeIn() : $("#toTopDiv").fadeOut(); 
} 
window.onscroll=toTopHide;

//初始化右侧页面
var stertPage = '1_2子页框架.html';
function changeIframUrl(){
	var menuJsonData = eval($("#menuId",window.parent.document).val());
	var openNum = parseInt($("#menuId",window.parent.document).attr("rel"));
	if(menuJsonData){
		insetMenu(menuJsonData,openNum);
		$("#pageIframe").attr('src',stertPage);
	}else{
		$("#ifram").attr('src','1_2子页框架.html');
	}
	
}


/*-------------------------------菜单封装--------------------------*/

function insetMenu(datajson,openMenu){
	var menuHtml = '';
	for(var i = 0;i<datajson.length;i++){
		var menuType = datajson[i].clickType;
		if(menuType == 2){
			menuHtml += '<div class="menuUlBox">';
			menuHtml += '<div class="menuUlBoxHead '+ datajson[i].icoClassName +'" clickType="'+ datajson[i].clickType +'"><h1>'+ datajson[i].MenuName +'</h1><a>'+ datajson[i].newNumber +'</a></div>';
			
			menuHtml += '<ul class="menuBtListUl">';
			var menuChlid = datajson[i].child;
			for(var j = 0;j<menuChlid.length;j++){
				var tagNum = menuChlid[j].newNumber;
				tagNum?tagNum = '<a>['+ menuChlid[j].newNumber +']</a>' : tagNum = ' ';
				menuHtml += '<li hrefvalue="'+ menuChlid[j].hrefvalue +'" pageType="'+ menuChlid[j].pageType +'">'+ menuChlid[j].MenuName + tagNum +'</li>';
			}
			menuHtml += '</ul>';
			
			menuHtml += '</div>';
		}else if(menuType == 3){
			menuHtml += '<div class="menuUlBox noArrow">';
			menuHtml += '<div class="menuUlBoxHead '+ datajson[i].icoClassName +'" clickType="'+ datajson[i].clickType +'" hrefvalue="'+ datajson[i].hrefvalue +'" pageType="'+ datajson[i].pageType +'"><h1>'+ datajson[i].MenuName +'</h1><a>'+ datajson[i].newNumber +'</a></div>';
			menuHtml += '</div>';
		}
	}
	$("#listBox").html(menuHtml);
	menuLiFun();
	
	stertPage = datajson[openMenu].hrefvalue;
	initMenuFun(openMenu);
}

function initMenuFun(indexN){
	//初始化第一个菜单为选中
	$("#listBox").find("div.menuUlBox").eq(indexN).find("div.menuUlBoxHead").addClass("menuUlBoxHeadOn");
	$("#listBox").find("div.menuUlBox").eq(indexN).find("div.menuUlBoxHead").find('h1').addClass("up");
	$("#listBox").find("div.menuUlBox").eq(indexN).find("ul.menuBtListUl").slideDown('fast');
}

function menuLiFun(){
	
	//左侧菜单点击事件
	$("div.menuUlBoxHead").click(function(){
		var clickTyp = parseInt($(this).attr('clickType'));
		if(clickTyp == 0){
			
		}else if(clickTyp == 1){
			
		}else if(clickTyp == 2){//有子级菜单，先展开子级菜单
			$("ul.menuBtListUl").slideUp('fast');
			$(this).parents("div.menuUlBox").find("ul.menuBtListUl").slideDown('fast');
			
			$("div.menuUlBoxHead").removeClass("menuUlBoxHeadOn");
			$("div.menuUlBoxHead").find('h1').removeClass("up");
			$(this).addClass("menuUlBoxHeadOn");
			$(this).find('h1').addClass("up");
		}else if(clickTyp == 3){//只有一级菜单，直接打开时
			$("ul.menuBtListUl").slideUp('fast');
			$("div.menuUlBoxHead").find('h1').removeClass("up");
			
			$("div.menuUlBoxHead").removeClass("menuUlBoxHeadOn");
			$(this).addClass("menuUlBoxHeadOn");
			$(this).find('h1').addClass("up");
			
			var jumpValu = $(this).attr('hrefvalue');
			
			$("#pageIframe").attr('src',jumpValu);
		}
		
	});
	//子级菜单点击事件
	$("ul.menuBtListUl li").click(function(){
		var pageTyp = $(this).attr('pageType');
		$("#pageType").val(pageTyp)
		
		$("ul.menuBtListUl li").removeClass("lived");
		$(this).addClass("lived");
		var jumpValu = $(this).attr('hrefvalue');
		$("#pageIframe").attr('src',jumpValu);
		
	});
}

function getParentpageType(){
	var pageTypeVal = $("#pageType").val();
	return pageTypeVal;
}
/*-------------------------------菜单封装-END-------------------------*/
