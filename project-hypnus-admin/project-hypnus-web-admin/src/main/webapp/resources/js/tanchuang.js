/**************************************************定义系统全局对象和方法**************************************************/
/**显示与隐藏等待框*/
WaitBar=function(){
	var bCreate = false;
	var initDiv = 'if(false == bCreate){document.body.appendChild(pDiv);bCreate = true;}';
	var pDiv=document.createElement("DIV"); 
	pDiv.className = 'bar_div';
	pDiv.innerHTML ='<div class=bar_icons></div>';
	pDiv.innerHTML+='<div class=bar_font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请稍等...</div>';
	//进度与下载
	pDiv.style.width="230px";
	pDiv.style.zIndex=100001;
	var pgDiv=document.createElement("DIV");
	pDiv.appendChild(pgDiv);
	var pgA=document.createElement("A");
	var pgUrl=document.createElement("span");
	pgDiv.appendChild(pgA);
	pgDiv.appendChild(pgUrl);
	
	//WaitBar个数，show()自增，hide()自减。个数为0时隐藏WaitBar
	var waitBarCount = 0;//if(flg!=2){waitBarCount++;} if(flg!=2){waitBarCount--;}if(waitBarCount > 0){return;}
	
	return{
	    waitBarCount : 0,
		show:function(flg){ 
		  if(window.parent){
		  	  try{
	  		  	window.parent.WaitBar.hide(2);
			  }catch(e){
			  }
		  	}//如果当前窗体是jquery div所开窗，先将父窗体的隐藏，避免初始化时，看到两个加载条
		  eval(initDiv);pDiv.style.display = 'block';if(flg){WaitBar.showModal();}
		},//显示等待框
		hide:function(flg){
		   eval(initDiv);
		   if(flg==2){
		      pDiv.style.display = 'none';WaitBar.hideModal();
		   }else{ 
		      setTimeout(function(){pDiv.style.display = 'none';},500);WaitBar.hideModal();
		   }},//隐藏等待框
		hideProgress:function(){pgDiv.style.display = 'none';pDiv.style.background = 'transparent';},//隐藏进度
		setProgress:function(progress,url){//设置进度与下载a标签
			pDiv.style.display = 'block';//为避免中途因其它后台操作，而导致等待条被隐藏
			pgA.innerHTML='&nbsp;&nbsp;进度：<font color="green">'+progress+'%</font>&nbsp;';
			pgDiv.style.display = 'block';
			if(url){
				pgUrl.innerHTML='，请<a href="'+url+'" onclick="WaitBar.hideProgress();WaitBar.hide();"><font style="font-weight: bold;color:red">点击这里</font></a>下载文件';
			}else if(progress=="99"){
				pgUrl.innerHTML='，文件打包中...';
			}
		},
		setMsg:function(progress){//设置进度与下载a标签
			pDiv.style.display = 'block';//为避免中途因其它后台操作，而导致等待条被隐藏
			pgDiv.innerHTML=progress;
			pDiv.style.background = 'white';
			with(pgDiv.style){display = 'block';background = 'white';paddingLeft='10px';}
			/*with(document.getElementById("EXPORT_MODAL_DIV").style){
			  display="block";
			  width=document.body.clientWidth;
			  height=document.body.clientHeight;
			}*/
			WaitBar.showModal();
		},
		showModal:function(){//设置遮罩
			 var div=document.getElementById("EXPORT_MODAL_DIV");
			 if(!div){
			 	div=document.createElement("div");
			 	div.id="EXPORT_MODAL_DIV";
			 	document.body.appendChild(div);
				with(div.style){
				 	width=document.body.clientWidth;
				    height=document.body.clientHeight;
				    position="absolute";left="0px";top="0px";zIndex=100000;
				    backgroundColor="black";filter="alpha(opacity="+1+");";
				    opacity=0.01; 
				 }   
			}
			div.style.display="block";
		},
		hideModal:function(){//隐藏遮罩
			if(document.getElementById("EXPORT_MODAL_DIV")){
				document.getElementById("EXPORT_MODAL_DIV").style.display="none";
			}
		},
		isExporting:function(){
			return (pDiv.style.display == 'block'&&pgDiv.style.display == 'block'&&pgDiv.innerText.indexOf("100%")<0);
		}		
	}
}();

/**字符串转变成json对象*/
function decode(str) {try{return (typeof(str)!="string")?str:(str.trim()=='')?'':eval('('+str+')');}catch(e){return str;}}

/**给String注册一个清空首尾字符的方法*/
String.prototype.trim = function() {return this.replace(/^\s+/g,"").replace(/\s+$/g,"");} 

/*让firefox支持outerHTML*/
if(typeof HTMLElement !== "undefined" && !("outerHTML" in HTMLElement.prototype)) { 
	HTMLElement.prototype.__defineSetter__("outerHTML",function(str){ 
	var fragment = document.createDocumentFragment(); 
	var div = document.createElement("div"); 
	div.innerHTML = str; 
	for(var i=0, n = div.childNodes.length; i<n; i++){ 
	fragment.appendChild(div.childNodes[i]); 
	} 
	this.parentNode.replaceChild(fragment, this); 
	}); 
	// 
	HTMLElement.prototype.__defineGetter__("outerHTML",function(){ 
	var tag = this.tagName; 
	var attributes = this.attributes; 
	var attr = []; 
	//for(var name in attributes){//遍历原型链上成员 
	for(var i=0,n = attributes.length; i<n; i++){//n指定的属性个数 
	if(attributes[i].specified){ 
	attr.push(attributes[i].name + '="' + attributes[i].value + '"'); 
	} 
	} 
	return ((!!this.innerHTML) ? 
	'<' + tag + ' ' + attr.join(' ')+'>'+this.innerHTML+'</'+tag+'>' : 
	'<' + tag + ' ' +attr.join(' ')+'/>'); 
	}); 
} 

/**为保证去掉ext.js以前的程序可用，模拟ext的decode方法*/
try{if(!Ext.util.JSON.decode)var Ext={util:{JSON:{decode:function(str){return decode(str);}}}};
}catch(e){var Ext={util:{JSON:{decode:function(str){return decode(str);}}}};}

/** 重置IE窗口高度*/
function setSize(){
	var h =GetIEVersion();
	var hei=(parseInt(tav.offsetHeight)+h) + "px";
	var w=(parseInt(tav.offsetWidth)+h) + "px";
	window.dialogHeight=hei+"px";
}

/** 获取ie版本 然后返回要调整的高度,窗口调整大小用*/
function GetIEVersion(){
	var ua = navigator.userAgent.toLowerCase();
   	var s= ua.match(/msie ([\d.]+)/)[1]
    var hei=0;
    if(s=='6.0'){
    	hei=55
    }
	return hei;
}

/** 替换全部*/
String.prototype.replaceAll  = function(s1,s2){return this.replace(new RegExp(s1,"gm"),s2);}  

var AllWINDOW=[];
window.document.onkeydown =  onKeyDown;

/**
*传入一个url得到加入时间戳的URL
*url加上时间戳,为了解决外网访问时同一url时,session混淆的问题(特别是有代理的情况下)
*/
function getNewUrl(url){
	url+=((url.indexOf("?")>0?"&urlPKIGuid=":"?urlPKIGuid="))+(new Date().getTime());
	return url;
}

/*
** 函数: SystemWindow
** 输入: url,width,height
** 输出: handle
** 描述: 开窗
*/
function SystemWindow(url,width,height,name,resizable)
{	
	var msg=checkSessionAlive();
    if(msg!="1"){openMinLoginWin(function(){SystemWindow(url,width,height,name,resizable)});return;}
        
	var left, top;
	if(IsEmpty(width))width=screen.width;//如果没给宽度，则以屏幕宽度
	if(IsEmpty(height))height=screen.height;//如果没给高度，则以屏幕高度
	if(IsEmpty(resizable)){resizable="yes";}//如果没给是否重置大小，则默认可以
	left = parseInt((screen.width - width)*0.5);
	top  = parseInt((screen.height - height)*0.5);
	var newWindown= window.open(getNewUrl(url), "_blank", "top="+top+",left="+left+",width="+width+",height="+height+",location=no,scrollbars = no,resizable="+resizable);
	
	//给新窗口命名
	if(name)newWindown.name=name;
	//当前窗口保存子窗口
	AllWINDOW.push(newWindown);
	//保存所有子窗口
	var parent=window;
	while(true){
	    try{
		  if(parent.opener.AllWINDOW){parent.opener.AllWINDOW.push(newWindown);}
		  parent=parent.opener;
		}catch(e){
			break;
		}
	}	
	//返回当前窗口
	return newWindown;
}

//打开一个新窗口,如果不指定宽高,则会全屏打开,完全可用SystemWindow代替，所以不建议使用，之所以保留是为了兼容已有系统
function WindowOpen(url,width,height,name){
    var msg=checkSessionAlive();
    if(msg!="1"){openMinLoginWin(function(){WindowOpen(url,width,height,name)});return;}
    var left, top,width,height;
    width=width||window.screen.availWidth;
    height=height||window.screen.availHeight;
    left = (window.screen.availWidth-width)/2;
    top  = (window.screen.availHeight-height)/2;
    var newWindown = window.open(getNewUrl(url), "_blank", "top="+top+",left="+left+",width="+width+",height="+height+",location=no,resizable=yes,scrollbars=yes");
	newWindown.resizeTo(screen.availWidth,screen.availHeight); 
	//给新窗口命名
	if(name)newWindown.name=name;
	//当前窗口保存子窗口
	AllWINDOW.push(newWindown);
	//保存所有子窗口
	var parent=window;
	while(parent.opener){
		if(parent.opener.AllWINDOW){parent.opener.AllWINDOW.push(newWindown);}
		parent=parent.opener;
	}		
	//返回当前窗口
	return newWindown;
}

//resize为no，表示不能最大化,,完全可用SystemWindow代替，所以不建议使用，之所以保留是为了兼容已有系统
function WindowOpenDetail(url,width,height,name,resize){
    var msg=checkSessionAlive();
    if(msg!="1"){openMinLoginWin(function(){WindowOpenDetail(url,width,height,name,resize)});return;}
    var left, top,width,height;
    width=width||window.screen.availWidth;
    height=height||window.screen.availHeight;
    left = (window.screen.availWidth-width)/2;
    top  = (window.screen.availHeight-height)/2;
    var newWindown = window.open(getNewUrl(url), "_blank", "top="+top+",left="+left+",width="+width+",height="+height+",location=no,resizable="+resize+",scrollbars=yes");
	//newWindown.resizeTo(screen.availWidth,screen.availHeight); 
	//给新窗口命名
	if(name)newWindown.name=name;
	//当前窗口保存子窗口
	AllWINDOW.push(newWindown);
	//保存所有子窗口
	var parent=window;
	while(parent.opener){
		if(parent.opener.AllWINDOW){parent.opener.AllWINDOW.push(newWindown);}
		parent=parent.opener;
	}		
	//返回当前窗口
	return newWindown;
}

/**
*关闭所有子窗口
*返回关掉窗口的数量
*/
function SystemCloseWin(){
	var cnt=0;
	for(var i=AllWINDOW.length-1;i>=0;i--){
		if(!IsEmpty(AllWINDOW[i])&&!AllWINDOW[i].closed){
			AllWINDOW[i].close();
			cnt++;
		}
	}
	return cnt;
}

/**
窗体关闭方法,关window窗，和juquery窗
closeFlag:见代码中解释，用于通用表单内部
beforeCloseFun:关窗前事件方法，返回值为false的话，将不继续关窗动作
*/
function SysCloseJqueryWin(closeFlag,beforeCloseFun){
    if(beforeCloseFun&&typeof(beforeCloseFun)=="function"){
    	var boo=beforeCloseFun(closeFlag);
    	if(!boo)return;
    }
	if(closeFlag+""=="1"||closeFlag+""=="2"){//通用表单作为属性详情，新增界面时,要求被嵌的页面所在iframe只能直接嵌入在east布局块中
		try{
			if(window.frameElement&&window.parent.$(".easyui-layout").html()&&window.parent.$(".easyui-layout").layout('panel','east')){
				window.parent.$(".easyui-layout").layout('collapse','east');
				document.body.style.display="none";
				return;
			}
		}catch(e){}
	}
	if(closeFlag+""=="3"){//通用表单作为属性修改界面时
		//if(window.initUpdatePage)window.initUpdatePage();
		window.location.href=window.location.href.replace("update","singleLine");
		return;
	}
	if(window.frameElement){//当前窗体所在的iframe
		if(window.parent.$(window.frameElement.parentNode.parentNode).hasClass("window")){//作为jquery弹窗window时
			try{
				window.parent.$(window.frameElement.parentNode).window("close");//假如能在父窗体关
			}catch(e){
				try{getTopWin(window).$(window.frameElement.parentNode).window("close");}catch(e){}//否则从顶级窗体关
			}
		}else{//普通的iframe内嵌
			getTopWin(window).SystemCloseWin();
			if(!getTopWin(window).closed)getTopWin(window).close();
		}
	}else{
	    //当前窗体不是被iframe嵌入
		SystemCloseWin();
		if(!window.closed)window.close();
	}
}

/*
** 函数: SystemModalDialog
** url,width,height,resizable
** dailogArgs:传给子窗体的参数，在子窗体中通过window.dialogArguments获得到
** 输出: handle
** 描述: 弹出模式窗口
*/
function SystemModalDialog(url,width,height,dailogArgs,resizable)
{
	if(IsEmpty(width))width=screen.width;//如果没给宽度，则以屏幕宽度
	if(IsEmpty(height))height=screen.height;//如果没给高度，则以屏幕高度
	if(IsEmpty(resizable))resizable='yes';
    var msg=checkSessionAlive();
    if(msg!="1"){openMinLoginWin(function(){SystemModalDialog(url,width,height,dailogArgs,resizable)});return;}
	return window.showModalDialog(getNewUrl(url), dailogArgs, "dialogWidth:" + width + "px;dialogHeight:" + height + "px;help:no;minimize:no;maximize:"+resizable+";resizable:"+resizable+";scroll:no;status:no");
}

/**
*ajax检查session是否过期,0表示已经过期
*同步机制，运行完些方法才能运行后边代码
*前提是相关页面要引入jquery js
*/
function checkSessionAlive(){
	 var msg="0"
	 var pathname=getPathName();
	 var path=getFullPath();
       //IT支撑用以下方式才行，统一成下边方式
       msg = $.ajax({
            url: path + "/safeMgr/login!checkSession.action",
            type: 'post',
            async: false      //ajax同步
        }).responseText;
     return msg;
}

/**
*开迷你登录窗
*前提是相关页面要引入jquery js
*/
function openMinLoginWin(fn){
	var obj=getTopWin(window)==null?window:getTopWin(window);
	var pathname=getPathName();
	var path=getFullPath();
	var temp=getTopWin(window).document.getElementsByTagName("frameset");
	if(temp&&temp.length>0){//如果obj是一个frameset框架页面
		obj.location=path+'/login1.jsp?isFrameSet=1';
	}else{//obj是个普通页面
		var options={
			title:"会话过期,请重新登录",width:340,	height:230,
			modal:true,resizable:false,collapsible:false,
	 		minimizable:false,maximizable:false,closable:false
	 		,baseWin:obj,url:path+'/minlogin1.jsp',id:"login_Win"
		};
		//固定的回调函数myAppFunction:即在自己的窗口里定义一个此名称的函数，当迷你登录窗关闭时，就会调用此函数
		options.onClose=function(){
			if(window.myAppFunction){window.myAppFunction();}
			if(fn)fn.call(this);
		}
		options.checkLogin=false;
		showJqueryWindow(options);
	}
}

/*
Jquery window开窗,所开窗体永远居中
参数:
obj是一个json对象，应该包含jquery window需要的基础参数(参考 jquery window API),
obj对象加上以下特殊属性，将做特殊处理
	id:指定id的html容器转化为jquery window，如果指定id的容器不存在，则创建一个新的div，此属性必须有
	baseWin:基础窗体对象，在指定窗体的基础上开窗，不给此参数，默认在当前窗体打开，否则在指定窗体上打开
	url:如果有url，则会在指定id的对象内，加入一个iframe，iframe的src就是此url
	refresh:是否需要强制刷新，默认刷新 update by Zhanweibin 2012-03-07
*/
function showJqueryWindow(obj){
	obj.minimizable=false;//都无最小化按钮，因为最小化就跟关闭窗口一样
	obj.baseWin=(obj.baseWin)?obj.baseWin:window; //
	
	/**以下是通用场景所需的特殊两句*/
	var windowTop=getTopWin(obj.baseWin);
    if(obj.baseWin==windowTop){windowTop.basewin=this.window;}
	
	if(IsEmpty(obj.refresh))obj.refresh=true;
	
	var div=obj.baseWin.$("#"+obj.id);
	if(div.length>0)div=div[0];else div=null;
	if(!div){//创建DIV
		div=obj.baseWin.document.createElement("div");
		div.id=obj.id;
		obj.baseWin.document.body.appendChild(div);
	}
	var waitbarFlag=false;
	if(obj.url){//创建iframe
		var iframe=obj.baseWin.$("#"+obj.id+">iframe");
		if(!(obj.refresh==false&&iframe[0]&&$(iframe[0]).attr("src"))){//弹大窗口登录页面时，会出现此场景
			if(iframe[0]){
				$(iframe).hide();
				$(iframe[0]).remove();
			}
			obj.baseWin.WaitBar.show(2);
			var html='<iframe scrolling="no" frameborder="0"  src="'+obj.url+'" style="width:100%;height:100%;overflow:hidden;border:0px;"></iframe>';
			$(div).append(html);
			waitbarFlag=true;
		}else waitbarFlag=false;
	}
	//计算开窗宽度与高度
	var o = commonUtil.computerWH(obj.width, obj.height,obj.baseWin);
	obj.width=o.w; obj.height=o.h;
	//设置居中
	obj.left=($(obj.baseWin).width()-obj.width)*0.5;
	obj.top=($(obj.baseWin).height()-obj.height)*0.5;
	
	obj.top = obj.top<0? $(obj.baseWin).scrollTop():(obj.top+$(obj.baseWin).scrollTop());
	
	obj.collapsible=false;
	obj.baseWin.$(div).window(obj);
	if(waitbarFlag){
		obj.baseWin.$("#"+obj.id+">iframe").bind("load",function(){obj.baseWin.WaitBar.hide(2);})
		var theOpenedWin = obj.baseWin.document.getElementById(obj.id).getElementsByTagName("iframe")[0];//obj.baseWin.$("#"+obj.id+">iframe").contents();
		if(theOpenedWin){theOpenedWin=theOpenedWin.contentWindow;if(theOpenedWin)theOpenedWin.jqOpener = window;}
	}
}

/**
*消息提示窗统一入口
*此方法中第一个变量flg，用于做全局控制，true控制是用浏览器自带消息窗，false用jquery消息窗
*参数说明:
*message可以是一消息字符串，这种情况下，只会用alert()方式提示
*message也可以是对象，包含以下属性:
*   title，消息窗标题,默认值"提示"
*   icon，消息窗提示图示类型,可用的值是： error、question、info、warning，默认值是"info"
*   ok，确定按钮的文本,默认是"确定"
*   cancel，取消按钮的文本,默认是"取消"
*	opts:对象参数，设置提示框的width,如opts:{width:400} 如果设置大于可视窗体的宽度，则设置为"auto";不传则设置为300
*(以上属性仅对jquery弹窗有效)
*   msg，提示内容，内容中如果要抽换行，请用"\n"
*   type，消息框类型：1或'alert',2或'confirm',3或prompt，默认是1（alert）
*   fn，回调函数，对于alert，会直接调用；对于confirm,会给fn入参true（确定）或false（取消）；对于prompt，会给fn入参所填写的文本串
*   fnCancel，如果是confirm消息框,点取消按钮时的回调函数
*/
function simpleAlert(message){
     if(!message)return;
     var flg=true;
     if(typeof(simpleAlert_flg)!="undefined"&&simpleAlert_flg!=null)flg=simpleAlert_flg;//某页面里若有simpleAlert_flg属性，可针对所在页面单独控制
     var options={};
     if(typeof(message)=="object"){
     	options=message;
     	options.title=options.title?options.title:"提示";
     	options.icon=options.icon?options.icon:"info";
     	options.msg =flg?options.msg:'<div style="margin:10 0 0 65;font-faimly:宋体;font-size:12px;text-align:left;">'+options.msg.replace(/\n/g,"<br>")+'</div>';
     	//判断是否设定了width
		if(IsEmpty(options.opts)){options.opts={};options.opts.width=300;}
     	if(!IsEmpty(options.opts) && options.opts.width > $(window).width()){options.opts.width="auto";}
     }else if(typeof(message)=="string"){
        options.title="提示";
        options.icon="info";
     	options.msg =flg?message:'<div style="margin:10 0 0 65;font-faimly:宋体;font-size:12px;text-align:left;">'+message.replace(/\n/g,"<br>")+'</div>';
     }
     //如果confirm,但没注册取消按钮方法，则给一个空方法,
    if(!options.fnCancel&&(options.type=="confirm"||"2"==options.type+"")){options.fnCancel=function(){}}
    
    if(flg){//浏览器默认提示窗
        options.msg=options.msg.replace(/<br>/g,"\n");
    	if(options.type&&(options.type=="confirm"||"2"==options.type+"")){
    		var boo=window.confirm(options.msg);
    		if(options.fn){if(boo)options.fn(boo);else options.fnCancel(boo);}
	    }else if(options.type&&(options.type=="prompt"||"3"==options.type+"")){
	        var txt=window.prompt(options.msg);
	        if(options.fn){options.fn(txt);}
	    }else{
	    	window.alert(options.msg);
    		if(options.fn){options.fn();}
	   	}
    }else{//jquery提示窗
        options.msg=options.msg.replace(/\n/g,"<br>").replace(/\r/g,"<br>");
	    $.messager.defaults.ok=options.ok?options.ok:'确定';
	    $.messager.defaults.cancel=options.cancel?options.cancel:"取消";
	    if(options.type&&(options.type=="confirm"||"2"==options.type+""))
	    	$.messager.confirm(options.title, options.msg, function(r){if(r)options.fn(r);else options.fnCancel(r);}, options.opts);
	    else if(options.type&&(options.type=="prompt"||"3"==options.type+""))
	    	$.messager.prompt(options.title, options.msg, function(r){options.fn(r);}, options.opts);
	    else
	   		$.messager.alert(options.title,options.msg,options.icon,options.fn, options.opts);
	   	//按钮注册键盘事件
	   	var btns = $(".messager-button .l-btn");
	   	if (btns.length != 0) {
	   		btns.eq(0).focus();
	   		window.messagerBtnIndex = 0;
	   		btns.bind('keydown', function(event){
	   			if (event.keyCode == '37' && window.messagerBtnIndex - 1 >= 0) {
	   				window.messagerBtnIndex--;
	   				btns.eq(window.messagerBtnIndex).focus();
	   			} else if (event.keyCode == '39' && window.messagerBtnIndex + 1 < btns.length) {
	   				window.messagerBtnIndex++;
	   				btns.eq(window.messagerBtnIndex).focus();
	   			}
	   			return true;
	   		});
	   	}
   	}
}

/*
** 函数: SystemIsEmpty
** 输入: str
** 输出: bool
** 描述: 验证字符串是否为空
*/
function SystemIsEmpty(str)
{
	var regExp = /^\s*$/;
	if (str == null) return true;
	if (regExp.test(str)) return true;
	return false;
}

/*
**如果对象未定义，或者为空，或者是空字符串，返回真，否则返回假
*/
function IsEmpty(obj){
	if(typeof(obj)=="undefined"||obj==null||(typeof(obj)!="object"&&(obj+"").replace(/ /g,"")=="")){//||obj.length==0
		return true;
	}
	return false;
}

/*
** 函数: SystemTrim
** 输入: str
** 输出: string
** 描述: 去除字符串首尾空格
*/
function SystemTrim(str)
{
	var regExp = /(^\s*)|(\s*$)/;
	return str.replace(regExp,"");
}

/**
**获取浏览器类型与版本
**/
function GetBrowserType(){
	var browserType = "";
	navigator.appName 
	var ua = navigator.userAgent.toLowerCase();
	if (window.ActiveXObject)
	    browserType ="IE "+ ua.match(/msie ([\d.]+)/)[1]
	else if (document.getBoxObjectFor)
	    browserType ="FIREFOX "+ ua.match(/firefox\/([\d.]+)/)[1]
	else if (window.MessageEvent && !document.getBoxObjectFor)
		browserType ="FIREFOX "+ ua.match(/mozilla\/([\d.]+)/)[1]
	else if (window.MessageEvent && !document.getBoxObjectFor)
	    browserType ="CHROME "+ ua.match(/chrome\/([\d.]+)/)[1]
	else if (window.opera)
	    browserType ="OPERA "+ ua.match(/opera.([\d.]+)/)[1]
	else if (window.openDatabase)
	    browserType ="SAFARI "+ ua.match(/version\/([\d.]+)/)[1];
	return browserType;
}

/**
**算出一个对象的绝对位置
**/ 
function position(obj){
	var left = 0;
	var top = 0;
	while (obj != document.body) {
		left += obj.offsetLeft;
		top += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return {x:left,y:top};
}

/**
**form转换json,仅限于简单表单转换
**/
function form2Json(formId)
{
	var form = document.getElementById(formId);
	var count = form.elements.length;
	var json = {};
	for(var i = 0;i < count;i++){
		var ele = form.elements[i];
		if(ele == null) continue;
		var tagName = ele.tagName;
		var name = ele.name;
		if(name == null || name == '') continue;
		var value = ele.value;
		eval("json."+name+"='"+value+"'");	
	}
	return json;
}

/*
** 函数: SystemCancelEvent
** 输入: void
** 输出: bool
** 描述: 返回假
*/
function SystemCancelEvent()
{
	return false;
}

/*
兼容浏览器获取event对象
author:tanjianwen
*/
function getEvent(){
	if (typeof event == "undefined") {//firefox
		return getCallerEvent(getEvent);
	} else {//IE
		return event;
	}
}

function getCallerEvent(obj) {
	for (var i = 0;i < obj.caller.arguments.length;i++) {
		if (obj.caller.arguments[i] == Event) 
			continue;
		return obj.caller.arguments[i];
	}
	return getCallerEvent(obj.caller);
}

/*
**当组合键CTRL+N时
*/
function SystemKillPopupWin()
{
	var evt = getEvent();
	if (evt.ctrlKey && evt.keyCode == 78) evt.returnValue = SystemCancelEvent();
}
//温哲力添加，当元素为readonly时，按backspace会跳转到前一个页面，这函数把他屏蔽掉
function keyDown(){
	var evt = getEvent();
	var target = evt.srcElement ? evt.srcElement : evt.target;
	if(evt.keyCode==8 && target.readOnly==true){//backspace的KEYCODE的值是8，通过监听可以控制。
		evt.returnValue= false;
	}
}

function onKeyDown(){
	SystemKillPopupWin();
	keyDown();
}

function ToExcel()
{
	var sPostContent = ContainId.innerHTML;
	var sTmp  = ContainId.innerHTML;
	var reg1 = /<a (.*)>(.*)<\/a>/gi;
	var reg2 = /width="(.*)"/gi;
	var reg4 = /<img (.*?)src=\\?\"(.*?)\"(.*?)>/gi;
	var reg5 = /(\<script.*\>)(.[^\[]*?)(\<\/script\>)/ig;
	sPostContent=sPostContent.replace(reg4,"<img $1 src=$2 $3>");
	sPostContent=sPostContent.replace(reg5, "");
	sPostContent = sPostContent.replace(reg1, "$2");
	sPostContent = sPostContent.replace(reg2, "width=$1");
	ContainId.innerHTML = sPostContent;
	try{
		var oXL = new ActiveXObject("Excel.Application");
		var oWB = oXL.Workbooks.Add();
		var oSheet = oWB.ActiveSheet; 
		var sel=document.body.createTextRange();
		sel.moveToElementText(ContainId);
		sel.select();
		sel.execCommand("Copy");
		oSheet.Paste();
		oXL.Visible = true;
	}catch(e){}
	ContainId.innerHTML = sTmp;
}
     
function ToWord()
{
	var sPostContent = ContainId.innerHTML;
	var sTmp  = ContainId.innerHTML;
	var reg1 = /<a (.*)>(.*)<\/a>/gi;
	var reg2 = /width="(.*)"/gi;
	var reg4 = /<img (.*?)src=\\?\"(.*?)\"(.*?)>/gi;
	var reg5 = /(\<script.*\>)(.[^\[]*?)(\<\/script\>)/ig;
	sPostContent=sPostContent.replace(reg4,"<img $1 src=$2 $3>");
	sPostContent=sPostContent.replace(reg5, "");
	sPostContent = sPostContent.replace(reg1, "$2");
	sPostContent = sPostContent.replace(reg2, "width=$1");
	ContainId.innerHTML = sPostContent;
	try{
		var oWD = new ActiveXObject("Word.Application");
		var oDC = oWD.Documents.Add("",0,1);
		var oRange =oDC.Range(0,1);
		var sel = document.body.createTextRange();
		sel.moveToElementText(ContainId);
		sel.select();
		sel.execCommand("Copy");
		oRange.Paste();
		oWD.Application.Visible = true;
	}catch(e){}
	ContainId.innerHTML = sTmp;
}

(function($){
    $.toJSON=function(o){
        if(typeof(JSON)=='object'&&JSON.stringify)return JSON.stringify(o);
        var type=typeof(o);
        if(o===null)return"null";
        if(type=="undefined")return undefined;
        if(type=="number"||type=="boolean")return o+"";
        if(type=="string")return $.quoteString(o);
        if(type=='object'){
            if(typeof o.toJSON=="function")return $.toJSON(o.toJSON());
            if(o.constructor===Date){
                var month=o.getUTCMonth()+1;
                if(month<10)month='0'+month;
                var day=o.getUTCDate();
                if(day<10)day='0'+day;
                var year=o.getUTCFullYear();
                var hours=o.getUTCHours();
                if(hours<10)hours='0'+hours;
                var minutes=o.getUTCMinutes();
                if(minutes<10)minutes='0'+minutes;
                var seconds=o.getUTCSeconds();
                if(seconds<10)seconds='0'+seconds;
                var milli=o.getUTCMilliseconds();
                if(milli<100)milli='0'+milli;
                if(milli<10)milli='0'+milli;
                return'"'+year+'-'+month+'-'+day+'T'+hours+':'+minutes+':'+seconds+'.'+milli+'Z"';
            }
            //if(o.constructor===Array){
            if(o.constructor.toString().indexOf("Array")>0){
                var ret=[];
                for(var i=0;i<o.length;i++)
                    ret.push($.toJSON(o[i])||"null");
                return"["+ret.join(",")+"]";
            }
            var pairs=[];
            for(var k in o){
                var name;
                var type=typeof k;
                if(type=="number")name='"'+k+'"';
                else if(type=="string")name=$.quoteString(k);
                else continue;
                if(typeof o[k]=="function")continue;
                var val=$.toJSON(o[k]);
                pairs.push(name+":"+val);
            }
            return"{"+pairs.join(", ")+"}";
        }
    };
    $.evalJSON=function(src){
        if(typeof(JSON)=='object'&&JSON.parse)return JSON.parse(src);
        return eval("("+src+")");
    };
    $.secureEvalJSON=function(src){
        if(typeof(JSON)=='object'&&JSON.parse)return JSON.parse(src);
        var filtered=src;
        filtered=filtered.replace(/\\["\\\/bfnrtu]/g,'@');
        filtered=filtered.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']');
        filtered=filtered.replace(/(?:^|:|,)(?:\s*\[)+/g,'');
        if(/^[\],:{}\s]*$/.test(filtered))return eval("("+src+")");
        else throw new SyntaxError("Error parsing JSON, source is not valid.");
    };
    $.quoteString=function(string){
        if(string.match(_escapeable)){
            return'"'+string.replace(_escapeable,function(a){
                var c=_meta[a];
                if(typeof c==='string')return c;
                c=a.charCodeAt();
                return'\\u00'+Math.floor(c/16).toString(16)+(c%16).toString(16);})+'"';
        }
        return'"'+string+'"';
    };
    var _escapeable=/["\\\x00-\x1f\x7f-\x9f]/g;
    var _meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};
})(jQuery);

/**
**导出
**URL : 导出时获取数据路径
**headConfig : 表头配置格式[{name:'',text:'',width:''},{...}]
**queryForm : 查询表单ID
**contextPath : contextpath
**/
function exportList(url,headConfig,queryForm,contextPath)
{	
	var form = {};
	if(typeof(queryForm) === 'string')
		form = form2Json(queryForm);
	else if(typeof(queryForm) === 'object')
		form = queryForm;
	else return;

	form.pageNo = 1;
	form.limit = 1000;
	var data = [];
	var returnHtml = "";
	if(!confirm("提示：一次最多只能导出1000条记录，继续请按“确定”。"))return;
	AjaxRequest.doRequest(null, url,form, function(backData){
		backData = backData.replace(/<p>/gi,'');
		backData = backData.replace(/<\\\/p>/gi,'');
		backData = backData.replace(/<br \/>/gi,'');
		data = Ext.util.JSON.decode(backData);
		transEnum(data);
		var tableHtml = "<table border=1 style=\"font-size:14px\"><tr style=\"font-weight:600;height:25px\">";
		for(var i = 0;i < headConfig.length;i++){
			config = headConfig[i];
			var text = config.text;
			var width = config.width;
			tableHtml += "<td width='"+width+"' style='background-color:#0099FF;'>";
			tableHtml += text;
			tableHtml += "</td>";
		}
		tableHtml += "</tr>";
		for(var i = 0;i < data.length;i++){
			var row = "<tr>";
			for(var j = 0;j < headConfig.length;j++){
				row += "<td>";
				var name = headConfig[j].name;
				var content = eval("data[i]."+name);
				if(content=="null"||content==null)content="";
				row += "&nbsp;"+content;
				row += "</td>";
			}
			row += "</tr>";
			tableHtml += row;
		}
		tableHtml += "</table>";
		document.getElementById('sContent').value = tableHtml;
		document.getElementById('excelform').submit();
	});
	return returnHtml;
}

//翻译枚举值
function transEnum(jsonData){
	for(var i = 0; i < jsonData.length; i++){
		traverseTree(jsonData[i]);	
	}
}

//递归遍历权限树
function traverseTree(tree) { 
	transValue(tree,'logType','iLogType');
	transValue(tree,'rightAppFor','iAppFor');
    var children = tree.children;   
    if (children != null) {   
        for(var n = 0; n < children.length; n++){
        	traverseTree(children[n]);
        }
    }  
}  

function transValue(tree,name,id)
{
	EnumRequest.getEnum(name, function(data){
	 		if(data == null) return;
		for(var j = 0; j < data.length; j++){
			if(data[j].id == tree[id]){
				tree[id] = data[j].text;
				break;
			}
		}
	});
}

//判断是不是有特殊字符
function isInvalidChar(str){
	var aInvalidChar = ["<", ">","'","\""];
	var aInvalidChar_SIZE = aInvalidChar.length;
	
	var len = str.length;
	var isHas = false;
	for(var i = 0 ; i < aInvalidChar_SIZE ; i ++)
	{
		for(var t = 0 ; t < len ; t ++)
		{
			var sechar = str.charAt(t);
			if(sechar == aInvalidChar[i])
			{
				isHas = true;
				break;
			}
		}
	}
	return isHas;
}

/**
统一获取删除或修改行入口
author:gaotao 2011-12-19
原则:1、得删除行，只以勾选的行为准;2、得修改行，如果有勾选多行，不能修改;如果有勾选单行，以勾选单行为准；如果没有勾选任何行，以行选为准。
入参:obj是个对象型入参,包含属性:
    listType:列表类型,1或"htc"：htc列表；2或"flex"：flex列表；3或"jquery":jquery列表(默认)；
    optType:操作类型，1或"delete"、获取要删除的行，2或"update"、获取要修改的行(默认)
    listId：列表ID或对象，flex列表则接传对象，那就是列表对象。(此属性必须有)
    keyCol：主键列名
    fn:回调函数
返回值：
    如果有传入keyCol属性,则返回ID字符串，多个用","号连接；
    如果未传入keyCol属性：删除操作，返回行json数组对象；修改操作，返回行json对象；
    如果修改时，有勾选多行，返回"notOnly"；
    没有要删除或修改的行，返回null；
*/
function getDelOrUpdItems(obj){
	try{
		var listObj=null;
		var tempItems=null;
		var item=null;
		var returnValue=null;
		if(obj.optType==1||obj.optType=="delete"){//获取删除行 
			if(obj.listType==1||obj.listType=="htc"){
				listObj=(typeof(obj.listId)=="string")?document.getElementById(obj.listId):obj.listId;
				if(listObj)tempItems=listObj.checkedItems;
			}else if(obj.listType==2||obj.listType=="flex"){
				listObj=obj.listId;
				if(listObj)tempItems=listObj.checkedItems();
			}else{
				listObj=(typeof(obj.listId)=="string")?$('#'+obj.listId):obj.listId;
				if(listObj)tempItems=$(listObj).datagrid("getSelections");
			}
		}else{//获取要修改行
			if(obj.listType==1||obj.listType=="htc"){
				listObj=(typeof(obj.listId)=="string")?document.getElementById(obj.listId):obj.listId;
				if(listObj){tempItems=listObj.checkedItems;item=listObj.selectedItem;}
			}else if(obj.listType==2||obj.listType=="flex"){
				listObj=obj.listId;
				if(listObj){tempItems=listObj.checkedItems();item=listObj.getSelectedItem();}
			}else{
				listObj=(typeof(obj.listId)=="string")?$('#'+obj.listId):obj.listId;
				if(listObj){tempItems=$(listObj).datagrid("getSelections");item=$(listObj).datagrid("getSelected");}
			}
			if(tempItems){
				if(tempItems.length>1){//如果有勾选多行
					tempItems=null;returnValue="notOnly";
				}else if(tempItems.length==0&&item){//没有勾选行，但有行选，则以行选为准
					tempItems.push(item);
				}
			}
		}
		//返回id串，还是对象数组
		if(tempItems&&tempItems.length>0){
			if(obj.keyCol){//返回id串
				returnValue="";
				for(var i=0;i<tempItems.length;i++){
					if(returnValue.length>0)returnValue+=",";
					returnValue+=eval("tempItems["+i+"]."+obj.keyCol);
				}
			}else{//返回对象数组
				if(obj.optType==2||obj.optType=="update"){returnValue=tempItems[0];}
				else returnValue=tempItems;
			}
		}		
		//如果有回调函数
		if(obj.fn){obj.fn.call(this,returnValue);}
		return returnValue;
	}catch(e){
		simpleAlert("取修改行或删除行出错,请查看js/common.js里的getItemRecords方法!");
		return null;
	}
}

//系统锁定 tanjianwen
function system_Lock() {
	var firstWin = getFirstWindow(window);
	var myWins = [getTopWin(window)];
	//如果当前系统有open窗，则要放开下边语句
	if(firstWin.AllWINDOW)for(var i=0;i<firstWin.AllWINDOW.length;i++){myWins.push(firstWin.AllWINDOW[i]);}
	for (var i = 0;i < myWins.length; i++) {
		var w = myWins[i];
		showJqueryWindow({id:'systemLockDiv', baseWin:w, url:path + '/systemLock.jsp', 
					  title: '系统锁定', minimizable: false, maximizable: false, resizable: false,
					  closable: false, collapsible: false, width: 380, height: 150, modal: true,
					  onOpen: function(){
					  	if ($("#systemLockDiv iframe")[0])$("#systemLockDiv iframe")[0].src = path + '/systemLock.jsp';
					  }
					  });
	}
}

//获取最先操作的窗口
function getFirstWindow(win){
	if (!IsEmpty(getTopWin(window).opener)) {
		getFirstWindow(getTopWin(window).opener);
	} else {
		return getTopWin(window);
	}
}

/**获取最顶层窗口
*win:window对象
*不传参时自动取当前window对象
*/
function getTopWin(win){
	if(win==null)win=window;
	var name = getPathName(win);
	if(name==getPathName(win.parent)){
		if(win.parent!=window.top){return getTopWin(win.parent);}
		else{return win.parent;}
	}else{
		return win;
	}
}

function getSystemTop(){
	return getTopWin();
}

/**获取父窗口
*win:window对象
*不传参时自动取当前window对象
*/
function getParentWin(win){
	if(win==null)win=window;
	var name = getPathName(win);
	if(name==getPathName(win.parent))return win.parent;
	else return win;
}

/**获取页面所在应用名称
*win:window对象
*不传参时自动取当前window对象
*/
function getPathName(win){
	if(win==null)win=window;
	//commonJS.jsp中定义了全局变量
	if(win.CONTEXT_PATH_NAME!=null){
	   return (win.CONTEXT_PATH_NAME=="") ? "/" : win.CONTEXT_PATH_NAME;
	}else {//非本项目
		var contextPath = win.document.location.pathname; 
	  	var index =contextPath.substr(1).indexOf("/"); 
	  	contextPath = contextPath.substr(0,index+1); 
	  	delete index; 
	  	return contextPath; 
	}
}

/**获取页面所在应用的根路径
*win:window对象
*不传参时自动取当前window对象
*/
function getFullPath(win){
	if(win==null)win=window;
	var pathName = getPathName(win);
	var fullPath = win.location.protocol+"//"+win.location.host+"/"+pathName.replace("/","");
	return fullPath;
}

function getTreegridItems(tree){
	var items = new Array();
	for ( var i = 0; i < tree.length; i++) {
		pushTreegridItems(items,tree[i]);
	}
	return items;
}

function pushTreegridItems(items,tree){
	items.push(tree);
	var childs = tree.children;
	if(childs!=null){
		for ( var i = 0; i < childs.length; i++) {
			pushTreegridItems(items,childs[i]);
		}
	}
}


/** 
*获取当前元素的宽度，如果元素的父节点是隐藏的则先显示，获取到宽度后再重新隐藏父节点。
*tangyj 2013-3-23
*/
function getElementWidth(element){
	var hiddenNodes = [];//定义数组，保存隐藏的节点。用来获取到元素宽度后，重新隐藏
	
	/**
	*递归父节点，从根节点往下逐层显示节点
	*/
	function  dispalyElement(element){
		var $ele = $(element);
		if( !element || $ele.is("body") ){//判断当前节点是否可见或是body节点直接返回
			return;
		}else{//遍历到body节点，并找出所有display为none的节点，然后从根节点逐个设置
			dispalyElement($ele[0].parentNode);
			//判断当前节点是否设置成display为none,如果设置了则显示
			if($ele.css("display") == 'none'){
				$ele.show();	
				//alert($ele[0].tagName+"-"+$ele.css("display"));
				hiddenNodes.push(element);
			}
		}
	}
	
	if($(element).width() == 0 && false == $(element).is(":visible")){
		dispalyElement(element);
	}
	var elementWidth =element.offsetWidth;//获取元素宽度
	//获取元素宽度之后，需要还原节点隐藏属性
	for(var i =0;i<hiddenNodes.length;i++){
		$(hiddenNodes[i]).hide();
	}
	return elementWidth;
}


/**************************************************定义commonUtil对象、属性**************************************************/
var commonUtil = {};
//在此定义的变量相当于java的成员变量，用于commonUtil方法和方法内的方法调用
commonUtil.jqSel_optArray  = []; 
commonUtil.jqSel_id = 1;//自增ID
commonUtil.jqSel_mouseLeave = true;

commonUtil.digit_arr = [];
commonUtil.digit_id = 1;

commonUtil.detail_dataArray = [];

commonUtil.enter_id = 1;
commonUtil.objParamArray = [];

commonUtil.hintOptions = [];//保存输入框提示信息的数组
commonUtil.hintId = 1;
commonUtil.hintColor = "#9c9a97";

commonUtil.prompt_id = 1;//提示框ID区分标识(一个页面可能多个提示框)
commonUtil.prompt_fullData;
commonUtil.prompt_currentDataIndex = 0;

/**************************************************定义commonUtil的公共方法**************************************************/
//在些定义的方法相当于java对象的私有方法，但是js中无法定义对象的私有方法，所以就提升到对象的公有方法。
//该方法会被commonUtil的jqFileUpload_submit、initFileUpload方法访问，
 //清空附件
//isToLocal,isSaveToDB有赋默认值。如果innerCall为false，则为点击清空按钮触发，需要调用清空后的事件
commonUtil.jqFileUpload_cleanFile = function(eId, sTableName, isToLocal, isSaveToDB, innerCall)
{
	var pathname = getPathName();
	var fastDFS_path = getFullPath();
	var tableName = IsEmpty(sTableName)?"default":sTableName;
	AjaxRequest.doRequest('',
  			fastDFS_path+'/fastDfs/singleFileUpload!cleanFile.action',//上传调用的Action,即是上传提交的页面url
	    {fileid:$("#fileid_"+eId).val(), isToLocal:isToLocal},
	    function(backData) {
	    	if ((backData == 1 || backData == "1") && (isSaveToDB == 1 || isSaveToDB == "1")) {
	    		AjaxRequest.doRequest('', fastDFS_path + '/fastDfs/fastDfs!deleteUploadByFileId.action',{fileid : $("#newFileName_"+eId).val()}, function(backData) {
					if (backData == '1' || backData == 1) {
						var afterClean = $(window).data("afterClean_"+eId);
						if(!innerCall){
							$("#"+eId).val('');
							if(!IsEmpty(afterClean)){
								afterClean.call(this);
							}
						}
					}
				});
	    	}else if(backData == 1 || backData == "1"){
	    		var afterClean = $(window).data("afterClean_"+eId);
				if(!innerCall){
					$("#"+eId).val('');
					if(!IsEmpty(afterClean)){
						afterClean.call(this);
					}
				}
	    	}
	    }
    ,false);
};

/***************************JquerySelect**************************/
/*
初始化jquery下拉框
参数对象的属性如下:
eId:需要初始化的文本框id,
desc: 提示信息(不填或为空则默认是"全部")
clickFn: 点击选择时执行的方法
changeFn: 值改变时执行的方法
*/
commonUtil.initJquerySelect = function(option)
{
	var text = document.getElementById(option.eId);
	if (IsEmpty(text)) return;
	
	try{
		var tableNode = text.parentNode.parentNode.parentNode.parentNode;
		if(tableNode && $(tableNode).attr("class") == "JQSelect"){
			return;//生成结束后，增加JQSelect到class时触发，直接返回
		}
	}catch(e){
	}
	if($(text).attr("class")==""){
		$(text).addClass("JQSelect");//增加JQSelect到class，便于选择器获取
	}
	var div = document.createElement("span");
	var table = document.createElement("table");
	$(table).addClass("JQSelect").attr("cellpadding", "0").attr("cellspacing", "0");
	
	var tbody = document.createElement("tbody");
	var tr = document.createElement("tr");
	var td_1 = document.createElement("td");
	var obj = text.cloneNode(true);//重新生成一个文本框
	//tangyj 2013-04-27
	//将原来input框的width值设置到oldWidth属性上，用于在窗口改变时实时计算宽度
	$(obj).attr("oldWidth",$(text).css("width"));
	
	$(div).css({"display":$(obj).css("display")});
	if(option.clickFn){
		$(obj).bind("click", option.clickFn);
	}
	if (!IsEmpty(option.changeFn)){
		$(obj).bind("change", option.changeFn);
	}
	$(obj).addClass("txt").css("width",getElementWidth(text) - 18)
	$(tr).append($(td_1).append(obj));
	
	var td_2=document.createElement("td");
	var span = document.createElement("span");
	span.className = "btn";
	$(span).css("width", 18).html("&nbsp;&nbsp;&nbsp;&nbsp;");//对span绑定事件原input框的值
	if ($(obj).attr("disabled") == false) {
		if ($(obj).attr("disabled") == true) return;
		if(option.clickFn){
			$(span).bind("click", option.clickFn);
		}else{
			$(span).bind("click", function(){obj.click();});//点击按钮时相当于点击了文本框，用于自动初始化界面的弹出框
		}
		$(span).bind("click", function(){obj.focus()});
	}
	$(document.body).append($(div).append($(table).append($(tbody).append($(tr).append($(td_2).append(span))))));
	
	var desc = "全部";
	if (!IsEmpty(option.desc)) desc = option.desc;
	$(obj).attr("desc", desc);
	if ($(obj).val() == "") {
		$(obj).val(desc);
	}
	text.parentNode.replaceChild(div,text);//将原文框替成当前的span
};

/*显示下拉框,传入参数对象属性如下:
		{vId:存储实际值的对象的ID,
		 dataSrc:[true|false]是否外部嵌入页面,默认false,
		 url:针对dataSrc为true,这里填外部嵌入页的url,如果是false代表远程获取数据源的url,
		 data:本地数据源,和url二选一,
		 div:dataSrc为true时,嵌入页中包含grid的div的id
		 dataColumns: 针对dataSrc为false,这里填入下拉表格的列配置,
		 textColumn: 列表文本值列ID,
		 idColumn:列表标识值列ID,
		 isTree: [true|false] 是否树对象,默认false,
		 checkParent: 当isTree为true时,设置子节点勾选,父节点都勾选,默认为false
		 checkChildren: 当isTree为true时,设置父节点勾选或取消,子节点也全部勾选或取消,默认为false
		 isJsInit: 是否为js初始化的下拉列表,默认为false
		 desc:提示信息,
		 width:下拉列表宽,
		 height:下拉列表高}
*/
commonUtil.showJquerySelectList = function(option)
{
/*******************************内部方法开始************************************/
	//var jqSel_optArray = [];
	//var jqSel_id = 1;//自增ID
	//初始化下拉框
	function jqSel_init(option){
		if (option.dataSrc == false) {//嵌入DIV
			if (IsEmpty(option.dId)) {//尚未创建DIV
				$(option.obj).bind("blur", function(){jqSel_hiddenSelectList(option);});
				var div = jqSel_createDiv(option);
				var table = jqSel_createTb(option);
				div.appendChild(table);
				document.body.appendChild(div);
				jqSel_buildDataGrid(option);
				jqSel_loadData(option);
				commonUtil.jqSel_id++;
			} else {//已存在DIV和下拉列表等对象,显示即可
				jqSel_loadData(option);
				$('#'+option.dId).show();
			}
		} else {//嵌入外部页
			if (IsEmpty(option.dId)) {//尚未创建DIV
				$(option.obj).bind("blur", function(){jqSel_hiddenSelectList(option);});
				var div = jqSel_createDiv(option);
				div.style.width = option.width;
				div.style.height = option.height;
				var iFrame = jqSel_createIFrame(option);
				div.appendChild(iFrame);
				document.body.appendChild(div);
				commonUtil.jqSel_id++;
			} else {//已存在DIV和下拉列表等对象,显示即可
				$('#'+option.dId).show();
				jqSel_initValue(option);
			}
			jqSel_getContent(option);
		}
	}
	function jqSel_createDiv(option){
		var div = document.createElement("div");//创建包含下拉的DIV
		div.id = "JQSelect_div_"+option.vId.replace(".","_");
		//判断是否重复创建div tangyj 2013-03-23
		var idIndex = 1;
		while(true){
			if($("#"+div.id).size() == 0){
				break;
			}
			div.id += "_"+idIndex;
		}
		//end
		div.className = "JQSelect_div";
		$(div).bind("mouseenter", jqSel_enter).bind("mouseleave", jqSel_leave);
		option.dId = div.id;
		$(div).css("zIndex", "99999");
		return div;
	}
	//创建table用来装载jquery的datagrid
	function jqSel_createTb(option){
		var table = document.createElement("table");
		table.id = "JQSelect_tb_"+option.vId.replace(".","_");
		//判断是否重复创建table tangyj 2013-03-23
		var idIndex = 1;
		while(true){
			if($("#"+table.id).size() == 0){
				break;
			}
			table.id += "_"+idIndex;
		}
		//end
		option.tId = table.id;
		return table;
	}
	//创建一个新iframe
	function jqSel_createIFrame(option){
		var iframe = document.createElement("iframe");
		iframe.id = "JQSelect_frm_"+option.vId.replace(".","_");
		//判断是否重复创建table tangyj 2013-03-23
		var idIndex = 1;
		while(true){
			if($("#"+iframe.id).size() == 0){
				break;
			}
			iframe.id += "_"+idIndex;
		}
		//end
		iframe.className = "JQSelect_iframe";
		iframe.src = option.url + (option.url.indexOf("?") >= 0 ? "&" : "?") +"loadSuccessCall="+option.loadSuccessCall;
		iframe.width = "100%";
		iframe.height = "100%";
		option.fId = iframe.id;
		return iframe;
	}
	//生成datagrid
	function jqSel_buildDataGrid(option){
		var selCol = [{field:'ck',checkbox:true}];
		if (!option.isMultiSelect){selCol = []}
		if (!option.isTree) {
			$('#'+option.tId).datagrid({
				columns:[option.dataColumns],
				frozenColumns:[selCol],//冻结列，且此列为复选框
				nowrap:true,
				fitColumns: true, width: option.width,height: option.height,
				rownumbers:false,
				showHeader:(option.showHeader&&(option.showHeader+"")!="false")?true:false,//不显示下拉列表的表头
				onDblClickRow:function(row,rowData){
					$("#"+option.dId).hide();
				}
			});
		} else {
			$('#'+option.tId).treegrid({
				columns:[option.dataColumns],
				frozenColumns:[selCol],//冻结列，且此列为复选框
				nowrap:true,
				fitColumns: true, width: option.width,height: option.height,
				idField:option.idColumn,
				treeField:option.textColumn,
				onBeforeExpand:function(row) {
					jqSel_loadNodeData(option, row);
				},
				rownumbers:false,singleSelect:false,
				showHeader:(option.showHeader&&(option.showHeader+"")!="false")?true:false,//不显示下拉列表的表头
				checkParent:option.checkParent,//add by zwb 2012-08-28
				checkChildren:option.checkChildren,//add by zwb 2012-08-28
				onDblClickRow:function(rowData){
					$("#"+option.dId).hide();
				}
			});
		}
	}
	function jqSel_selectData(option){
		var grid = option.isTree?"treegrid":"datagrid";
		var selRows = eval("$('#'+option.tId)."+grid+"('getSelections')");
		var id = "", text = "";
		for (var i = 0;i < selRows.length;i++) {
			if (id.length > 0) {id += ",";text += ",";}
			id += eval('selRows[i].'+option.idColumn);
			text += eval('selRows[i].'+option.textColumn);
		}
		$(document.getElementById(option.vId)).val(id);
		if (text == "") text = IsEmpty($(option.obj).attr("desc")) ? "全部" : $(option.obj).attr("desc");
		$(option.obj).val(text).focus();//.change();
	}
	function jqSel_loadNodeData(option, row) {
		if (IsEmpty(option.loadNodeUrl)) return;
		var childItems = $('#'+option.tId).treegrid("getChildren",eval("row."+option.idColumn));
	   	if(childItems == null)return;
	   	if(childItems != null && childItems.length>0){
	   		return;
	   	}
		var param = {};
		if (IsEmpty(option.loadNodeParam)) {
			param = option.loadNodeParam;
		}
		param.iParentId = eval("row."+option.idColumn);
		AjaxRequest.doRequest(null,option.loadNodeUrl,param,function(backData){
			var jsonData = decode(backData);
			//判断是否有子节点
			jqSel_setDataChildNodes(jsonData);
			jqSel_changeJson(jsonData);
			$('#'+option.tId).treegrid("collapse", eval("row."+option.idColumn));
			$('#'+option.tId).treegrid("append", {parent:eval("row."+option.idColumn),data:jsonData});
			$('#'+option.tId).treegrid("expand", eval("row."+option.idColumn));
			jqSel_initValue(option);
			jqSel_bindSelectEvent(option);
		});
	}
	function jqSel_setDataChildNodes(jsonData) {
		for(var i = 0; i < jsonData.length; i++){
			jqSel_doSetChildNodes(jsonData[i]);	
		}
	}
	//递归遍历权限树,判断是否有子节点
	function jqSel_doSetChildNodes(node) {
 		var children = node.children;   
    	if (children != null) {   
        	for(var n = 0; n < children.length; n++){
        		jqSel_doSetChildNodes(children[n]);
        	}
    	} 
		if(node.childCount && !node.children)node.children = [];
	}
	function jqSel_changeJson(json){
		for(var j =0 ;j<json.length; j++){
			if(json[j].children!=null){
				changeJson(json[j].children);
				if(json[j].iParentId!= null){
					json[j].state='closed';
				}
			}
			if(json[j].iDeptType==3){
				json[j].iconCls="team_bumen";
			}else{
				json[j].iconCls="fengpei2";				
			}
		}
	}
	//var jqSel_mouseLeave = true;
	//光标进入下拉框
	function jqSel_enter(){
		commonUtil.jqSel_mouseLeave = false;
	}
	//光标离开下拉框
	function jqSel_leave(){
		commonUtil.jqSel_mouseLeave = true;
	}
	//隐藏下拉框
	function jqSel_hiddenSelectList(option){
		if (!commonUtil.jqSel_mouseLeave) {
			return;
		}
		$('#'+option.dId).hide();
		
		if(option.isJsInit)return;//如果是js初始化的，则不执行后面的逻辑
		//有复选框的情况，文本框的值改变时触发change事件
		if(option.isMultiSelect && option.initValue != $(option.obj).val()){
			$(option.obj).change();
		}
	}
	//加载数据
	function jqSel_loadData(option){
		var grid = option.isTree ? "treegrid" : "datagrid";
		if (IsEmpty(option.data)) {
			AjaxRequest.doRequest('', option.url, option.urlParams, function(backData){
				var jsonData = Ext.util.JSON.decode(backData);
				if (option.isTree == true && option.loadNodeUrl && option.loadNodeParam) {
					jqSel_setDataChildNodes(jsonData);
					jqSel_changeJson(jsonData);
				}
				eval("$('#'+option.tId)."+grid+"('loadData', jsonData)");
				jqSel_initValue(option);
				jqSel_bindSelectEvent(option);
			});
		} else {
			if (option.isTree == true && option.loadNodeUrl && option.loadNodeParam) {
				jqSel_setDataChildNodes(option.data);
				jqSel_changeJson(option.data);
			}
			eval("$('#'+option.tId)."+grid+"('loadData', option.data)");
			//处理列表checkbox偏移的问题
			if (option.isTree) {
				if(GetBrowserType().indexOf("IE") >= 0)
					$('#'+option.dId+' .datagrid-view1 .datagrid-cell-check').css("width", "").css("height", "").css("padding-top","6px");
				else
					$('#'+option.dId+' .datagrid-view1 .datagrid-cell-check').css("width", "").css("height", "").css("padding-top","7px");
			}else{
				if(GetBrowserType().indexOf("IE") >= 0)
					$('#'+option.dId+' .datagrid-view1 .datagrid-cell-check').css("width", "").css("height", "").css("padding-top","2px");
				else
					$('#'+option.dId+' .datagrid-view1 .datagrid-cell-check').css("width", "").css("height", "").css("padding-top","5px");
			}
			jqSel_initValue(option);
			jqSel_bindSelectEvent(option);
		}
	}
	//绑定事件
	function jqSel_bindSelectEvent(option) {
		//针对treegrid不能触发onSelect事件,主动添加checkbox的事件
		if(option.isMultiSelect!=false){//if a by gt
			$(document.getElementById(option.dId)).find(":checkbox").each(function(){
				$(this).bind("click", function(){jqSel_selectData(option);});
			});
		}else{
		//点击行单选数据
			$("#"+option.dId+" .datagrid-view2 .datagrid-body tr").each(function(){
				$(this).bind("click", function(event){
					event.stopPropagation();
					var selId = $(this).find("td[field="+option.idColumn+"] div").eq(0).html();
					var selText = $(this).find("td[field="+option.textColumn+"] div "+(option.isTree?".tree-title":"")).eq(0).html();
					$(document.getElementById(option.vId)).val(selId);
					
					if(option.initValue != selText){//下拉框的值改变时才触发change事件
						if(option.isJsInit)//使用js初始化
							$(option.obj).val(selText).focus();
						else
							$(option.obj).val(selText).focus().change();
					}
					$("#"+option.dId).hide();
				});
			});
		}
		return;
		$(document.getElementById(option.dId)).find("div").bind("click", function(){
			event.stopPropagation();
			return false;
		});
	}
	//显示已选数据
	function jqSel_initValue(option){
		option.initValue = $(option.obj).val();//记录下拉框的初始值 add by zwb
		var value = $(document.getElementById(option.vId)).val();
		var vals = value.split(',');
		//取消选中所有行 //$('#'+option.tId).datagrid('unselectAll');
		if (option.isMultiSelect) {
			$('#'+option.dId+' .datagrid-view1 .datagrid-body-inner :checkbox').each(function(){
				this.checked = false;
			});
		} else {
			$('#'+option.dId+' .datagrid-view2 tr').removeClass("datagrid-row-selected");
		}
		for (var j = 0;j < vals.length;j++) {
			var id = vals[j];
			$('#'+option.dId+' .datagrid-view2 tr').each(function(){
				//找到id值相同的行,拿到行索引对checkbox选中
				if ($(this).children('td[field='+option.idColumn+']').children('.datagrid-cell').html() == id) {
					var rowIndex = $(this).attr('datagrid-row-index');
					var nodeId = $(this).attr('node-id');
					if (option.isMultiSelect) {
						if (option.isTree)
							$('#'+option.dId+' .datagrid-view1 tr[node-id='+nodeId+'] :checkbox')[0].checked = true;
						else
							$('#'+option.dId+' .datagrid-view1 tr[datagrid-row-index='+rowIndex+'] :checkbox')[0].checked = true;
					}
					else {
						$('#'+option.dId+' .datagrid-view2 tr[datagrid-row-index='+rowIndex+']').eq(0).addClass("datagrid-row-selected")
					};
				}
			});
		}
	}
	//下拉框定位
	function jqSel_showPosition(option) {
		var e = option.obj;
		var div = document.getElementById(option.dId);
		var left = $(e).offset().left;
		var top = $(e).offset().top;
		if (left + $(div).outerWidth() <= $(document.body).outerWidth()) {
			div.style.left = left;
		} else {
			div.style.left = left + $(e).outerWidth() + 15 - $(div).outerWidth();
		}
		if (top + $(e).outerHeight() + option.height <= $(document.body).outerHeight()) {
			div.style.top = top + $(e).outerHeight();
		} else {//如果页面下方控件不足
			div.style.top = top - option.height;
		}
	}
	function jqSel_getContent(option){
		$('#'+option.fId).bind("load", function(){//frame页面加载完成时
			window.jqSel_option = option;
			commonUtil.jqSel_wait();
		});
	}
	//保存配置
	function jqSel_saveOption(option){
		var isFind = false;
		for (var i = 0;i < commonUtil.jqSel_optArray.length;i++) {
			if (commonUtil.jqSel_optArray[i].obj.id != option.obj.id) continue;
			for (var idx in option) {
				if (typeof commonUtil.jqSel_optArray[i][idx] == "undefined") continue;
				commonUtil.jqSel_optArray[i][idx] = option[idx];
			}
			isFind = true;
			return commonUtil.jqSel_optArray[i];
		}
		if (!isFind) {
			commonUtil.jqSel_optArray.push(option);
			return option;
		}
	}
/*******************************内部方法结束************************************/
	/*obj是文本框*/
	var evt = GetBrowserType().indexOf("IE") >= 0 ? event : commonUtil.showJquerySelectList.caller.arguments[0];
	var target = IsEmpty(evt.srcElement) ? evt.target : evt.srcElement;
	option.obj = target.nodeName=="SPAN"?$(target).parent().parent().find(":text")[0]:target;
	option.isTree = !IsEmpty(option.isTree) && option.isTree;
	//add by zhanweibin 2012-08-27
	option.checkParent = !IsEmpty(option.checkParent) ? option.checkParent : false;
	option.checkChildren = !IsEmpty(option.checkChildren) ? option.checkChildren : false;
	option.isJsInit = !IsEmpty(option.isJsInit) ? option.isJsInit : false;
	//add end
	option.isMultiSelect = IsEmpty(option.isMultiSelect) ? true : option.isMultiSelect;
	//option.selectParent = IsEmpty(option.selectParent) ? true : option.selectParent; 
	option.width = IsEmpty(option.width) ? $(option.obj).width() + 19 : option.width;
	option.height = IsEmpty(option.height) ? 132 : option.height;
	option = jqSel_saveOption(option);
	//if ($('#'+option.dId).css("display") == "block") {return;}
	jqSel_init(option);
	jqSel_showPosition(option);
	$("#"+option.dId).find("div").bind('click', function(){
		$(option.obj).focus();
	});
};

//用于下拉外嵌页时外嵌页加载数据延迟处理
/*
 * update by zhanweibin 2012-08-27
 * 原有的实现方式是通过页面标签来获取勾选、行选的数据
 * 修改为通过easyui API来获取，对象参数中需要传入gridId属性（列表的id属性）
 */
commonUtil.jqSel_wait = function()
{
/*******************************内部方法开始************************************/
	//add by zhanweibin 2012-08-27
	//嵌入页面datagrid单击行事件
	function jqSel_clickDatagridRow(rowIndex, rowData, option){
		//单击行选赋值
		$(document.getElementById(option.vId)).val(rowData[option.idColumn]);
		$(option.obj).val(rowData[option.textColumn]).focus();
		jqSel_clickCommon(option);
	}
	//嵌入页面datagrid双击行事件
	function jqSel_dblClickDatagridRow(rowIndex, rowData, option){
		jqSel_dblClickCommon(option);
	}
	//嵌入页面treegrid单击行事件
	function jqSel_clickTreegridRow(row, option){
		//单击行选赋值
		$(document.getElementById(option.vId)).val(row[option.idColumn]);
		$(option.obj).val(row[option.textColumn]).focus();
		jqSel_clickCommon(option);
	}
	//嵌入页面treegrid双击行事件
	function jqSel_dblClickTreegridRow(row, option){
		jqSel_dblClickCommon(option);
	}
	//单击行事件做的公共处理
	function jqSel_clickCommon(option){
		//下拉框的值发生改变时触发change事件
		if(option.initValue != $(option.obj).val()){
			$(option.obj).change();
		}
		$("#"+option.dId).hide();
	}
	//双击行事件做的公共处理
	function jqSel_dblClickCommon(option){
		$("#"+option.dId).hide();//双击行隐藏div
	}
	
	//为checkbox绑定事件 tangyj 2013-05-24
	function jqSel_bindCheckboxEvt(option){
		var div = $($('#'+option.fId)[0].contentWindow.document);
			var cbxs = div.find(":checkbox");
			//复选框添加事件
			for (var i = 0;i < cbxs.length;i++) {
				//if ($(cbxs[i]).parent().attr("className") == "datagrid-header-check") continue;//排除头部checkbox
				$(cbxs[i]).unbind('change');//先清掉之前的事件。避免绑多次事件
				$(cbxs[i]).bind("change", function(){
					$(window).data("jqSel_option", option);
					setTimeout('commonUtil.jqSel_changeEvt()', 100);
				});
			}
	}
	//add end
/*******************************内部方法结束************************************/
	var option = window.jqSel_option;
	option.initValue = $(option.obj).val();
	var isTree = option.isTree ? option.isTree : false;
	var initOption = null;//列表初始对象参数
	var extendOption = null;//列表事件对象参数
	
	//避免点击列表后，target失去焦点
	$("#"+option.fId)[0].contentWindow.$("#"+option.gridId).parent().bind('click', function(){
		$(option.obj).focus();
	});
	//option.div属性屏蔽后，直接去找iframe中的grid div元素
	if ($("#"+option.fId)[0].contentWindow.$(".datagrid-view2 .datagrid-body tr").length != 0){
		//存在复选框则屏蔽单击行事件
		if(option.isMultiSelect){
			if(isTree){//treegrid设置checkParent,checkChildren属性,onDblClickRow事件
				initOption = $("#"+option.fId)[0].contentWindow.$("#"+option.gridId).treegrid("options");
				extendOption = {
					checkParent : option.checkParent, checkChildren : option.checkChildren,
					onClickRow : function(){},
					onDblClickRow : function(row){jqSel_dblClickTreegridRow(row, option);}
				};
			}else{//datagrid设置onDblClickRow事件
				initOption = $("#"+option.fId)[0].contentWindow.$("#"+option.gridId).datagrid("options");
				extendOption = {
					onClickRow : function(){},
					onDblClickRow : function(rowIndex, rowData){jqSel_dblClickDatagridRow(rowIndex, rowData, option);}
				};
			}
			$.extend(initOption, extendOption);
			//tangyj 2012-5-8 在onLoadSuccess事件中添加对可选框勾选的监听
			jqSel_bindCheckboxEvt(option);//页面加载时绑定一次
			initOption.onLoadSuccess = function(row,data){
				jqSel_bindCheckboxEvt(option);//展开节点时需要把子节点绑定
			 }
			return;
		}else{
			//行事件
			if(isTree){//treegrid
				initOption = $("#"+option.fId)[0].contentWindow.$("#"+option.gridId).treegrid("options");
				extendOption = {
					onClickRow : function(row){jqSel_clickTreegridRow(row, option);},
					onDblClickRow : function(row){jqSel_dblClickTreegridRow(row, option);}
				};
				
			}else{//datagrid
				initOption = $("#"+option.fId)[0].contentWindow.$("#"+option.gridId).datagrid("options");
				extendOption = {
					onClickRow : function(rowIndex, rowData){jqSel_clickDatagridRow(rowIndex, rowData, option);},
					onDblClickRow : function(rowIndex, rowData){jqSel_dblClickDatagridRow(rowIndex, rowData, option);}
				};
			}
			$.extend(initOption, extendOption);
		}
	}
	window.setTimeout("commonUtil.jqSel_wait()", 100);
};

commonUtil.jqSel_changeEvt = function() 
{
	option = $(window).data("jqSel_option");
	var isTree = option.isTree ? option.isTree : false;
	var selections = "";
	var id = "",text = "";
	if(isTree){//treegrid
		selections = $("#"+option.fId)[0].contentWindow.$("#"+option.gridId).treegrid("getSelections");
	}else{//datagrid
		selections = $("#"+option.fId)[0].contentWindow.$("#"+option.gridId).datagrid("getSelections");
	}
	if(selections.length > 0){
		for(var i=0; i<selections.length; i++){
			if (id.length > 0) {id += ","; text += ",";}
			id += selections[i][option.idColumn];
			text += selections[i][option.textColumn];
		}
		$(document.getElementById(option.vId)).val(id);
		if (text == "") text = IsEmpty($(option.obj).attr("desc")) ? "全部" : $(option.obj).attr("desc");
		$(option.obj).val(text).focus();
		$(option.obj)[0].focus();
	}else{
		//清空id和text值
		$(document.getElementById(option.vId)).val("");
		text = IsEmpty($(option.obj).attr("desc")) ? "全部" : $(option.obj).attr("desc");
		$(option.obj).val(text).focus();
		$(option.obj)[0].focus();
	}
};
/***************************JquerySelect结束**************************/

/***************************popupWindow******************************/
/**
 * 初始化弹窗文本框
 * update by zhanweibin 2013-1-7
 * 传入参数分为两种形式：字符串型，对象型
 * 	字符串型：
 * 	  popObj: 存放text值的标签id(必须)
 *    clickFnObj: 点击弹窗按钮的响应事件(必须)
 * 	  valIdsObj：存放id值的标签id
 *    cleanFnObj: 清空后执行的方法
 * 	对象型 {textId: xxx, clickFn: xxx, valIds: xxx, cleanFn: xxx}
 */
commonUtil.initPopupWindow = function(popObj, clickFnObj, valIdsObj, cleanFnObj) 
{
	var textId = null;
	var clickFn = null;
	var valIds = null;
	var cleanFn = null;
	
	if(arguments.length == 1 && typeof(textId) == "object"){//以对象形式传入参数
		textId = popObj.textId;
		clickFn = popObj.clickFn;
		valIds = popObj.valIds;
		cleanFn = popObj.cleanFn;
	}else if(arguments.length > 1){//以字符串形式传入参数
		textId = popObj;
		clickFn = clickFnObj;
		valIds = valIdsObj;
		cleanFn = cleanFnObj;
	}
	var text = document.getElementById(textId);
	if (IsEmpty(text)) return;
	try{
		var tableNode = text.parentNode.parentNode.parentNode.parentNode;
		if(tableNode && $(tableNode).attr("class") == "PopupWindow"){
			return;//生成结束后，增加PopupWindow到class时触发，直接返回
		}
	}catch(e){
	}
	if($(text).attr("class")==""){
		$(text).addClass("PopupWindow");//增加PopupWindow到class，便于选择器获取
	}
	var obj = text.cloneNode(true);//重新生成一个文本框
	
	//tangyj 2013-04-27
	//将原来input框的width值设置到oldWidth属性上，用于在窗口改变时实时计算宽度
	$(obj).attr("oldWidth",$(text).css("width"));
	
	if ($(text).attr("class") == "txt") {
		$(text).removeClass("txt").css("width", getElementWidth(text) + 16);
		$("#"+textId+"_span")[0].parentNode.replaceChild(text,$("#"+textId+"_span")[0]);
	}
	//$(text).parent().parent().css("display","none");
	var div = document.createElement("span");
	div.id = textId+"_span";
	var table = document.createElement("table");
	$(table).addClass("PopupWindow").attr("cellpadding", "0").attr("cellspacing", "0");
	$(div).css({"display":$(obj).css("display")});
	var tbody = document.createElement("tbody");
	var tr_1 = document.createElement("tr");
	var td_11 = document.createElement("td");
	$(td_11).attr("rowspan", "2");
	$(obj).addClass("txt").css("width", getElementWidth(text) - 16);
	if(this.className == 'PopupWindow') {
		$(obj).attr("onclick", "");//如果是弹窗文本框,去掉原始事件
	}
	td_11.appendChild(obj);
	
	//弹窗按钮
	var td_12 = document.createElement("td");
	var openWinSpan=document.createElement("span");
	$(openWinSpan).html("&nbsp;&nbsp;&nbsp;&nbsp;").addClass("openWinBtn").attr("title","开窗选");//对span绑定事件原input框的值
	td_12.appendChild(openWinSpan);
	$(tr_1).append(td_11).append(td_12);
	
	//清空按钮
	var tr_2 = document.createElement("tr");
	var td_22 = document.createElement("td");
	var cleanSpan=document.createElement("span");
	$(cleanSpan).html("&nbsp;&nbsp;&nbsp;&nbsp;").addClass("cleanBtn").attr("title","清空");//对span绑定事件原input框的值
	
	var thisObj = this;
	if ($(obj).attr("disabled") == false) {
		$(openWinSpan).bind("click", function(){
			if ($(obj).attr("disabled") == true) return;
			clickFn();
		});//对span绑定事件原input框的值
		$(cleanSpan).bind("click", function(){
			if ($(obj).attr("disabled") == true) return;
			$(obj).val("");
			if(valIds) {
				var ids = valIds.split(",");
				for (var i = 0;i < ids.length;i++) {
					//$("#"+ids[i]).val("");
					document.getElementById(ids[i]).value = "";
				}
			}
			if(cleanFn && typeof(cleanFn) == "function")cleanFn();
		});
	}
	$(td_22).append(cleanSpan);
	$(tr_2).append(td_22);
	$(tbody).append(tr_1).append(tr_2);
	$(table).append(tbody);
	$(div).append(table);
	
	text.parentNode.replaceChild(div,text);//将原文框替成当前的span
	if ($(div).next().html() == "*")
	$(div).next().css("line-height", "2");
};
/***************************popupWindow结束**************************/

/***************************fileUpload*****************************/
/*
update by zhanweibin 2012-09-11

eId:指定要生成单文件上传的input标签id
iTableId:模块中对应的主键。参数类型可以是string,object,function
		 string类型，直接传入主键id
		 object类型，tId属性为表单元素的id,如{tId:'eleId'},可以通过某个表单元素为主键赋值
		 function类型，自定义函数，返回主键id
sTableName:模块名称（对应的表名），服务端根据这个存放到不同目录和入库
isToLocal:0-文件上传至fastDFS文件系统服务器；1-文件上传至本地应用服务器。不设置将以config.properties中的为准
isSaveToDB:是否存储到数据库。0-否，1-是，默认为是
directory:临时目录名称。在系统指定的目录中新建一个子目录
limitReg:文件后缀限制。格式为*.xxx,多个限制以","号分隔
displayName:文件上传成功后在文本框中显示的信息。枚举值为fileId,localFileName,serverFileName,serverFileDir,默认为文件路径
afterUpload:上传按钮回调函数
afterClean:清空按钮回调函数
*/
commonUtil.initFileUpload = function(options) 
{
	var iTableId = IsEmpty(options.iTableId)?"":options.iTableId;
	var sTableName = IsEmpty(options.sTableName)?"":options.sTableName;
	var isToLocal = IsEmpty(options.isToLocal)?"":options.isToLocal;
	var isSaveToDB = IsEmpty(options.isSaveToDB)?"1":options.isSaveToDB;
	var directory = IsEmpty(options.directory)?"":options.directory;
	directory = encodeURIComponent(directory); //编码，\为转义符
	var limitReg = IsEmpty(options.limitReg)?"":options.limitReg;
	var displayName = IsEmpty(options.displayName)?"serverFileDir":options.displayName;
	var iDeptId = IsEmpty(options.iDeptId)?"":options.iDeptId;
	if(!IsEmpty(options.iTableId)){
		$(window).data("fileUploadTableId_"+options.eId, options.iTableId);//将模块主键缓存起来
	}
	
	var text = document.getElementById(options.eId);
	if (IsEmpty(text)) return;
	
	var obj = text.cloneNode(true);//重新生成一个文本框
	
	//tangyj 2013-04-27
	//将原来input框的width值设置到oldWidth属性上，用于在窗口改变时实时计算宽度
	$(obj).attr("oldWidth",$(text).css("width"));
	
	if ($(text).attr("class") == "txt") {
		$(text).removeClass("txt").css("width", getElementWidth(text) + 17);
		$("#"+options.eId+"_span")[0].parentNode.replaceChild(text,$("#"+options.eId+"_span")[0]);
	}
	var div = document.createElement("span");
	div.id = options.eId+"_span";
	var table = document.createElement("table");
	$(table).addClass("fileUpload").attr("cellpadding", "0").attr("cellspacing", "0");
	$(div).css({"display":$(obj).css("display")});
	var tbody = document.createElement("tbody");
	var tr_1 = document.createElement("tr");
	var td_11 = document.createElement("td");
	$(td_11).attr("rowspan", "2");
	$(obj).addClass("txt").css("width", getElementWidth(text) - 17).attr("readonly", "readonly");
	if(this.className == 'fileUpload') {
		$(obj).attr("onclick", "");//如果是弹窗文本框,去掉原始事件
	}
	td_11.appendChild(obj);
	
	//上传按钮
	var td_12 = document.createElement("td");
	var openWinSpan=document.createElement("span");
	$(openWinSpan).html("&nbsp;&nbsp;&nbsp;&nbsp;").addClass("openWinBtn").attr("title","上传文件");//对span绑定事件原input框的值
	td_12.appendChild(openWinSpan);
	$(tr_1).append(td_11).append(td_12);
	
	//清空文件按钮
	var tr_2 = document.createElement("tr");
	var td_22 = document.createElement("td");
	var cleanSpan=document.createElement("span");
	$(cleanSpan).html("&nbsp;&nbsp;&nbsp;&nbsp;").addClass("cleanBtn").attr("title","清空");//对span绑定事件原input框的值
	$(openWinSpan).bind("click", function(){
		if($(obj).attr("disabled") == true){
			$("#upload_"+options.eId).attr("disabled", "true");
		}
	});//对span绑定事件原input框的值
	$(cleanSpan).bind("click", function(){
		if ($(obj).attr("disabled") == true) return;
		if(IsEmpty($(obj).val())) return;//文本框没有文件，不触发清空事件
	    commonUtil.jqFileUpload_cleanFile(options.eId, sTableName, isToLocal, isSaveToDB, false);
	});
	
	$(td_22).append(cleanSpan);
	$(tr_2).append(td_22);
	$(tbody).append(tr_1).append(tr_2);
	$(table).append(tbody);
	$(div).append(table);
	text.parentNode.replaceChild(div,text);//将原文框替成当前的span
	var html = [];
	html.push("<div id='jqFileUploadDiv_"+options.eId+"' class='jqFileUploadDiv'>");
	html.push("<input type='hidden' id='iFileId_"+options.eId+"' />");//数据库中文件的标识值
	html.push("<input type='hidden' id='fileid_"+options.eId+"' />");//文件在服务端的物理位置
	html.push("<input type='hidden' id='newFileName_"+options.eId+"' />");//文件在服务端的文件名
	html.push("<input type='file' class='uploadFile' id='upload_"+options.eId+"' name='upload' ");
	html.push(" onchange='commonUtil.jqFileUpload_submit(\""+options.eId+"\",\""+sTableName+"\",\""+isToLocal+"\",\""+isSaveToDB+"\",\""+directory+"\",\""+limitReg+"\",\""+displayName+"\",\""+iDeptId+"\")' /></div>");
	//$(document.body).append(html.join(""));
	$(openWinSpan).append(html.join(""));
	if (!IsEmpty(options.afterUpload)) {
		$(window).data("afterUpload_"+options.eId,options.afterUpload);//将上传回调函数缓存起来
	}
	if (!IsEmpty(options.afterClean)) {
		$(window).data("afterClean_"+options.eId,options.afterClean);//将清空回调函数缓存起来
	}
	//eval("window.afterUpload_"+options.eId+" = options.afterUpload");
	//$("#jqFileUploadDiv_"+options.eId)[0].style.top = $(openWinSpan).offset().top - 2;
	//$("#jqFileUploadDiv_"+options.eId)[0].style.left = $(openWinSpan).offset().left - 7;
};

//单文件上传控件选择完文件后提交到服务端
commonUtil.jqFileUpload_submit = function (eId,sTableName,isToLocal,isSaveToDB,directory,limitReg,displayName,iDeptId,afterUpload) 
{
/*******************************内部方法开始************************************/
	//author:zhanweibin 2012-09-13
	//校验上传文件后缀名
	function jqFileUpload_validFile(eId, limitReg){
		//limitReg为空，则没有后缀限制，返回true
		if(IsEmpty(limitReg))return true;
		var flg=false;
		var fileName = document.getElementById("upload_"+eId).value;
		//后缀转为小写做比较
		var suffix = fileName.substr(fileName.lastIndexOf(".")).toLowerCase();
		if(limitReg.toLowerCase().indexOf(suffix) >= 0){
			flg= true;
		}else{
			flg= false;
		}
		return flg;
	}
/*******************************内部方法结束************************************/
	//判断文件后缀
	var flag = jqFileUpload_validFile(eId, limitReg);
	//alert(flag);
	if(!flag){
	    simpleAlert({msg:"您好，此处限制只能上传以下格式样文件:<br>" + limitReg, opts:{width:340}});
	    return;
	}
	
	var tableIdObj = $(window).data("fileUploadTableId_"+eId);//模块中对应的主键参数
	var type = typeof(tableIdObj);//string,object,function
	var iTableId = "";
	if(type == "string"){
		iTableId = tableIdObj;
	}else if(type == "object"){
		iTableId = document.getElementById(tableIdObj.tId).value;
	}else if(type == "function"){
		iTableId = tableIdObj.call(this);
	}
	//---------------------------------------------//
	//上传文件前，如果已经存在上传的文件，则需要先删除
	if(!IsEmpty($.trim($("#"+eId).val()))){
		commonUtil.jqFileUpload_cleanFile(eId, sTableName, isToLocal, isSaveToDB, true);
	}
	//---------------------------------------------//
	var pathname = getPathName();
	var fastDFS_path = getFullPath();
	//var tableName = IsEmpty(sTableName)?"":sTableName;
	var tableName = IsEmpty(sTableName)?"default":sTableName;
	var uploadUrl = fastDFS_path+'/fastDfs/singleFileUpload!upload.action?sTableName='+tableName+'&realFileName='+encodeURI(encodeURI(document.getElementById("upload_"+eId).value));
	if(!IsEmpty(isToLocal))uploadUrl+="&isToLocal="+isToLocal;
	if(!IsEmpty(directory))uploadUrl+="&directory="+decodeURIComponent(directory);
	$.ajaxFileUpload({
	 	url:uploadUrl,//上传调用的Action,即是上传提交的页面url
	    secureuri:false,
	    fileElementId:"upload_"+eId,//与页面处理代码中file相对应的ID值
	       dataType: 'text',
	       success: function (data, status){
	       	var jsonData = decode(data);
	       	if(jsonData.totalBytes==0){
	       		simpleAlert("文件无效，所上传文件是空文件！");return;
	       	}
	       	//文件上传成功后设置文本框显示的内容
	       	var display = jsonData.oldFileName;
	       	if(displayName == "localFileName"){
	       		display = jsonData.oldFileName; $("#"+eId).val(display);
	       	}else if(displayName == "serverFileName"){
	       		display = jsonData.newFileName; $("#"+eId).val(display);
	       	}else if(displayName == "serverFileDir"){
	       		display = jsonData.fileid; $("#"+eId).val(display);
	       	}else if(displayName == "fileId" && (isSaveToDB != 1 || isSaveToDB != "1")){
	       		//如果设为保存主键ID，但是没有入库操作，则保存本地文件名
	       		display = jsonData.oldFileName; $("#"+eId).val(display);
	       	}
	       	$("#fileid_"+eId).val(jsonData.fileid);
	       	$("#newFileName_"+eId).val(jsonData.newFileName);
	       	//保存上传文件信息到数据库
			var params = {
				fileId : jsonData.fileid,
				tableId : iTableId,
				tableName : sTableName,
				newFileName : jsonData.newFileName,
				oldFileName : jsonData.oldFileName,
				fileSize : jsonData.totalBytes,
				iDeptId : -1
			}
			if(isSaveToDB==1 || isSaveToDB == "1"){//存储到数据库
				AjaxRequest.doRequest(null, fastDFS_path + "/fastDfs/fastDfs!addUpload.action", params, function (backData) {
					params.fId = backData;
					if(displayName == "fileId")$("#"+eId).val(backData);//文本框的值设为主键ID
					var afterUpload = $(window).data("afterUpload_"+eId);
					if (!IsEmpty(afterUpload)) {
						afterUpload.call(this, params);
					}
				});
			}else{
				var afterUpload = $(window).data("afterUpload_"+eId);
				if (!IsEmpty(afterUpload)) {
					afterUpload.call(this, params);
				}
			}
	     }
	 });
};

commonUtil.jqFileUpload_getSingleFileObj = function(iTablePKId, sTableName, cSvrFilePath)
{//获取附件对象
	var jsonData = null;
	AjaxRequest.doRequest(null, path+'/fastDfs/fastDfs!getUploadList.action',
			{iTablePKId:iTablePKId, sTableName:sTableName, cSvrFilePath:cSvrFilePath, pageNo:1, limit:3000},function(backData){
		jsonData = decode(backData);
		if(jsonData[0]){
			jsonData = jsonData[0]; 
		}
	}, false);
	return jsonData;
};
/***************************fileUpload结束**************************/

/***************************digit数值框*****************************/
/*
option是一个js对象,
对象中包含以下属性:
eId : 指定要变成数值框的元素id
limit : 数值框增加减少的步长
dataType : 
max : 允许最大数值
min : 允许最小数值
*/
commonUtil.initDigit = function(option)
{
/*******************************内部方法开始************************************/
	/*
	author:tanjianwen
	2012-1-9
	数值框只允许输入数字
	此工具类依赖jquery
	*/
	//var digit_arr = [];
	//var digit_id = 1;
	//是否功能键
	function digit_isFunKey(code) {   
	  //  8 --> Backspace   
	  // 35 --> End   
	  // 36 --> Home   
	  // 37 --> Left Arrow   
	  // 39 --> Right Arrow   
	  // 46 --> Delete   
	  // 112~123 --> F1~F12   
	  var funKeys = [8, 37, 39, 46];   
	  for(var i = 0; i < funKeys.length; i++) {   
	    if(funKeys[i] == code) {   
	      return true;   
	    }   
	  }   
	  return false;   
	}
	//记录每个数值框在计时器时段中的值(在非IE浏览器中使用)
	function digit_setValue(digit){
		var isHave = false;
		for (var i = 0;i < commonUtil.digit_arr.length;i++) {
			if (commonUtil.digit_arr[i].id == $(digit).attr("digitId")) {
				commonUtil.digit_arr[i].value = $(digit).val();
				isHave = true;
			}
		}
		if (!isHave) {
			commonUtil.digit_arr.push({id:$(digit).attr("digitId"), value:$(digit).val()});
		}
	}
	//获取每个数值框在计时器时段中的值(在非IE浏览器中使用)
	function digit_getValue(id){
		for (var i = 0;i < commonUtil.digit_arr.length;i++) {
			if (commonUtil.digit_arr[i].id == id) {
				return commonUtil.digit_arr[i].value;
			}
		}
		return "";
	}
	function digit_check(e) {
		  var target = e.srcElement || e.target;  
		  var input=$(target); 
		  e.stopPropagation();
		  var k = e.keyCode == 0 ? e.charCode : e.keyCode;
		  if (digit_isFunKey(k) && String.fromCharCode(k) != '.') {
		  	return true;
		  }
		  var c = String.fromCharCode(k);
		  var boo=c == '-'&&((!IsEmpty(input.attr("min"))&& parseFloat(input.attr("min"))<0));
		  if(target.value.length == '' && boo) {
		    return true;
		  }
		  if(c >= '0' && c <= '9') {
		  	if(document.selection && document.selection.createRange().text){//有选中文本时
				document.selection.clear();	
			}
			var num = parseFloat(target.value + c);
			if ((!IsEmpty($(target).attr("maxLength")) && $(target).attr("maxLength") != -1 && num >= Math.pow(10,$(target).attr("maxLength"))) ||
			   (!IsEmpty($(target).attr("max")) && num > parseFloat($(target).attr("max"))) ||
		       (!IsEmpty($(target).attr("min")) && num < parseFloat($(target).attr("min")))) {
			       //当输入的数字小于最小值或最大值时，则设置成默认值 tangyj 2013-03-23
			       if((!IsEmpty($(target).attr("min")) && num < parseFloat($(target).attr("min")))){
			       		$(target).val($(target).attr("min"));
			       }
			       if((!IsEmpty($(target).attr("max")) && num > parseFloat($(target).attr("max")))){
			       		$(target).val($(target).attr("max"));
			       }
			       //end
				   return false;
		    }
		    
		  } else if (c == '.' && target.value.indexOf('.') < 0) {
		  	 if (!IsEmpty($(target).attr("dataType")) && $(target).attr("dataType") == "digit") {
		  	 	return false;//如果参数设置了只能是整数,不能输入"."
		  	 }
		  	return true;
		  } else if (boo) {
		  	return true;
		  } else{
		  	return false;
		  }
		  return true;
		}
		function digit_keyup(e){
			var target = e.srcElement || e.target;
			var input = $(target);
			//if (input.val() == "+" || input.val() == "-") return;
			//tangyj 2013-5-7 替换成下面的实现方式
			if(input.val() == "-" && ((!IsEmpty(input.attr("min"))&& parseFloat(input.attr("min"))<0))) return;
			if(input.val() == "+" && ((!IsEmpty(input.attr("max"))&& parseFloat(input.attr("max"))>0))) return;
			
			var num = input.val() == "" || isNaN(input.val()) ? isNaN(parseFloat(input.val())) ? "" : parseFloat(input.val()) : input.val();
			if (!IsEmpty(input.attr("maxLength")) && $(target).attr("maxLength") != -1 && parseFloat(num) >= Math.pow(10,input.attr("maxLength"))) {
				num = Math.pow(10,input.attr("maxLength")) - 1;
			}
			num=max_min(input,num);
			if (!IsEmpty(input.attr("decimals")) && input.val().split(".").length > 1 &&
		  			  input.val().split(".")[1].length > input.attr("decimals")){
		  		num = parseFloat(input.val()).toFixed(input.attr("decimals"));
		  		input.val(num);
		  	}
			if (isNaN(input.val())) {
				input.val(num);
			} else if (input.val() != num.toString()) {
				input.val(num);
			}
			
		}
		function digit_up(obj){
			var input = $(obj).parent().prev().children(":text")[0];
			input = $(input);
			if (input.val() == "") input.val(0);
			var num = parseFloat((parseFloat(input.val()) + parseFloat(input.attr("limit"))).toFixed(2));
			if (!IsEmpty(input.attr("maxLength")) && input.attr("maxLength") != -1 && parseFloat(num) >= Math.pow(10,input.attr("maxLength"))) {
				num = Math.pow(10,input.attr("maxLength")) - 1;
			}
			num=max_min(input,num);
			input.val(num);
		}
		function digit_down(obj){
			var input = $(obj).parent().parent().prev().find(":text")[0];
			input = $(input);
			if (input.val() == "") input.val(0);
			var num = parseFloat((parseFloat(input.val()) - parseFloat(input.attr("limit"))).toFixed(2));
			num=max_min(input,num);
			input.val(num);
		}
		function digit_handle(){
			$(".Digit .txt").each(function(){
				if (IsEmpty($(this).attr("digitId"))) {
					$(this).attr("digitId", "digit"+(commonUtil.digit_id++).toString());
				}
				if (digit_getValue($(this).attr("digitId")) != $(this).val()) {//如果时间段的值不等于当前的值,进行keyup验证
					digit_keyup({target:this});
				}
				digit_setValue(this);
			});
		}
		function max_min(input,num){
		   if (!IsEmpty(input.attr("max")) && parseFloat(num) > parseFloat(input.attr("max"))) {
				num = input.attr("max");
			}
			if (!IsEmpty(input.attr("min")) && parseFloat(num) < parseFloat(input.attr("min"))) {
				num = input.attr("min");
			}
			return num;
		}
		
/*******************************内部方法结束************************************/
	if (option.eId == undefined || option.eId == null)return;
	$(input).val("");
	var input = document.getElementById(option.eId);
	if ($(input).attr("class") == "txt") return;
	try{
		var tableNode = input.parentNode.parentNode.parentNode.parentNode;
		if(tableNode && $(tableNode).attr("class") == "Digit"){
			return;//生成结束后，增加Digit到class时触发，直接返回
		}
	}catch(e){
	}
	if($(input).attr("class")==""){
		$(input).addClass("Digit");//增加Digit到class，便于选择器获取
	}
	var jqInput = $(input);
	if (!IsEmpty(option.limit))
		jqInput.attr("limit", option.limit);
	else
		jqInput.attr("limit", 1);
	if (!IsEmpty(option.max))
		jqInput.attr("max", option.max);
	if (!IsEmpty(option.min))
		jqInput.attr("min", option.min);
	if (!IsEmpty(option.dataType)) {
		jqInput.attr("dataType", option.dataType);}
	if (!IsEmpty(option.decimals))
		jqInput.attr("decimals", option.decimals);
	
	var span = document.createElement("span");
	var table = document.createElement("table");//创建一个div来包含文本框和span按钮
	$(table).addClass("Digit").attr("cellpadding", "0").attr("cellspacing", "0");
	var tbody = document.createElement("tbody");
	
	var tr_1 = document.createElement("tr");
	var td_11 = document.createElement("td");
	$(td_11).attr("rowspan", "2");
	var obj=input.cloneNode(true);//重新生成一个inp,放在span内
	
	//tangyj 2013-04-27
	//将原来input框的width值设置到oldWidth属性上，用于在窗口改变时实时计算宽度
	$(obj).attr("oldWidth",$(input).css("width"));
	
	$(span).css({"display":$(obj).css("display")});
	$(obj).addClass("txt").css("width", getElementWidth(input) - 16)
						  //tangyj 2013-5-7 注释下面几个事件监听，不然除IE浏览器外其它浏览器无法粘贴。数值验证采用定时检测的方式
						  .keypress(function(event){event.stopPropagation();return digit_check(event);})
						  .keyup(function(event){event.stopPropagation();digit_keyup(event);});
						  //.bind("paste", function(){digit_check(event);});
	if (GetBrowserType().indexOf("IE") >= 0){//IE浏览器
		//屏蔽该句，设置成定时检测的方式，不然不能对选中的数字进行修改 tangyj 2013-03-23
		$(obj).bind("propertychange", function(){digit_keyup({target:this});});
		//$(obj).bind("propertychange", function(){digit_handle()});
		//window.setInterval(digit_handle, 50);
	}else {//其他浏览器
		//window.setInterval(digit_handle, 50);
	}
	$(td_11).append(obj);
	
	var td_12 = document.createElement("td");
	var upSpan=document.createElement("span");
	$(upSpan).addClass("upBtn").attr("title","上调").html("&nbsp;&nbsp;&nbsp;&nbsp;");//对span绑定事件原input框的值
	td_12.appendChild(upSpan);
	$(td_12).append(upSpan);
	$(tr_1).append(td_11).append(td_12);
	
	var tr_2 = document.createElement("tr");
	var td_22 = document.createElement("td");
	var downSpan=document.createElement("span");
	$(downSpan).addClass("downBtn").attr("title","下调").html("&nbsp;&nbsp;&nbsp;&nbsp;");//对span绑定事件原input框的值
	if ($(obj).attr("disabled") == false) {
		$(upSpan).bind("click", function(){
			if ($(obj).attr("disabled") == true) return;
			digit_up(this);
			$(obj).change();//add by gt
		});//对span绑定事件原input框的值
		$(downSpan).bind("click", function(){
			if ($(obj).attr("disabled") == true) return;
			digit_down(this);
			$(obj).change();//add by gt
		});
	}
	$(td_22).append(downSpan);
	$(tr_2).append(td_22);
	$(tbody).append(tr_1).append(tr_2);
	$(table).append(tbody);
	$(span).append(table);
	input.parentNode.replaceChild(span,input);//将原文框替成当前的span
	if ($(span).next().html() == "*")
	$(span).next().css("line-height", "2");
};
/***************************digit结束******************************/

/***************************menuButton jquery导航******************/
commonUtil.initMenuButton = function(option)
{
/*******************************内部方法开始************************************/
	//构造jquery导航的结构
	function menu_buildMenu(option){
		var rootDiv = menu_createDiv({iRight:option.vId, style:option.dStyle});
		menu_addChild({parentDiv:rootDiv, children:option.json, firstChildLevel:true});
		document.body.appendChild(rootDiv);
	}
	function menu_buildA(option){
		for (var i = 0;i < option.json.length;i++){
			var aJson = option.json[i];
			var a = document.createElement("a");
			a.id = aJson.iRight;
			a.innerHTML = aJson.sRightName;
			$(a).attr("iconCls", aJson.sIcon);
			if (typeof aJson.sURL != "undefined" && aJson.sURL != ""){$(a).attr("href", aJson.sURL);}
			if (typeof aJson.clickEvent != "undefined" && aJson.clickEvent != null) {
				$(a).bind("click", aJson.clickEvent);
			}
			$(a).addClass("easyui-menubutton").attr("menu","#"+aJson.menu);
			$(document.getElementById(option.eId)).append(a);
		}
	}
	//创建div
	function menu_createDiv(opt){
		var div = document.createElement("div");
		if (IsEmpty(opt))
			return div;
		if (!IsEmpty(opt.isSeq) && opt.isSeq){//如果是分隔符
			$(div).addClass("menu-sep");
			return div;
		}
		if (!IsEmpty(opt.iRight))//如果有id
			$(div).attr("id", opt.iRight);
		if (!IsEmpty(opt.sRightName))//如果有节点名
			$(div).html(opt.sRightName);
		if (!IsEmpty(opt.sIcon))//如果有图标
			$(div).attr("iconCls", opt.sIcon);
		if (!IsEmpty(opt.clickEvent))//如果有点击事件
			$(div).bind("click", opt.clickEvent);
		if (!IsEmpty(opt.style))//如果有样式
			$(div).attr("style", opt.style);
		if (!IsEmpty(opt.sURL) && opt.sURL != "")//如果有链接
			$(div).html("<a href='"+opt.sURL+"' style='display:-moz-inline-box;display:inline-block;width:100%;height:100%'>"+opt.sRightName+"</a>");
		else if (!IsEmpty(opt.sRightName))
			$(div).html(opt.sRightName);
		return div;
	}
	//添加子节点
	function menu_addChild(option){
		if (!IsEmpty(option.firstChildLevel) && option.firstChildLevel){
			for (var i = 0;i < option.children.length;i++) {
				var item = option.children[i];
				if (!IsEmpty(item.isSeq) && item.isSeq) {//如果是分隔符
					option.parentDiv.appendChild(menu_createDiv({isSeq:true}));
					continue;
				}
				if (!IsEmpty(item.children) && item.children.items.length > 0) {//有子节点
					var pDiv = menu_createDiv();
					var span = document.createElement("span");
					span.innerHTML = item.sRightName;
					pDiv.appendChild(span);
					menu_addChild({parentDiv:pDiv, children:item.children});
					option.parentDiv.appendChild(pDiv);
					continue;
				}
				//普通节点
				option.parentDiv.appendChild(menu_createDiv(item));
			}
		} else {
			var div = menu_createDiv({style:option.children.style});
			for (var i = 0;i < option.children.items.length;i++) {
				var item = option.children.items[i];
				if (!IsEmpty(item.isSeq) && item.isSeq) {//如果是分隔符
					div.appendChild(menu_createDiv({isSeq:true}));
					continue;
				}
				if (!IsEmpty(item.children) && item.children.items.length > 0) {//有子节点
					var pDiv = menu_createDiv();
					var span = document.createElement("span");
					span.innerHTML = item.sRightName;
					pdiv.appendChild(span);
					menu_addChild({parentDiv:pDiv, children:item.children});
					div.appendChild(pDiv);
					continue;
				}
				div.appendChild(menu_createDiv(item));
			}
			option.parentDiv.appendChild(div);
		}
	}
/*******************************内部方法结束************************************/
	if (IsEmpty(option)) return;
	menu_buildA(option);
	for (var i = 0;i < option.json.length;i++) {
		var aJson = option.json[i];
		var aOption = {aId:aJson.iRight, vId:aJson.menu, dStyle:aJson.dStyle, json:aJson.children};
		menu_buildMenu(aOption);
		$('#'+aJson.iRight).menubutton({});
	}
};
/***************************menuButtonjquery导航结束**************/

/***************************moreValue数值框*****************************/
/*
option是一个js对象,
对象中包含以下属性:
mId : 指定要设置数值的input框的元素id
setValue : 要传入的数值
*/
commonUtil.setMoreValue = function(option)
{
	if (IsEmpty(option)) return;
	$('#'+option.mId).val(option.setValue);
};

/*
option是一个js对象,
对象中包含以下属性:
mId : 指定要更换的input框的元素id
*/
commonUtil.changeMoreValue = function(option)
{
	function openMoreValueDialog(eventOption){
			var obj=eventOption.mId;
	        var baseWin=window.top?window.top:window;
	        /*add by qiaoqide*/
	        var desc = "";
	        var isAPI = false;
	        if(window.getAPIData){ //在BaseTempalte.ftl中才会有此方法
	           var apiData = getAPIData(eventOption.apiId);
	           desc = apiData.desc?apiData.desc:"";
	           isAPI = apiData.isAPI;
	        }
	        
	        if(!baseWin.document.getElementById("event_edit")){
				var apiArea = "";
				var h = "100%";
				if(isAPI){ //如果是设计器事件编辑弹窗，则会多出api代码样例说明部分
				   apiArea = "<textarea style='width:100%;height:30%;border-left:0px;border-top:2px solid #C4E6E6;background:#EEEEEE;padding-left:10px;padding-top:5px;' id='api_area' readonly='readonly'></textarea>";
				   h = "70%";
				}
				var html="<div id='event_edit' style='overflow:hidden'><div id='event_layout' fit='true'>"+
		        "<div region='center' style='border:0;overflow:hidden;' ><textarea style='width:100%;height:"+h+";border:0px' id='event_edit_area'></textarea>"+apiArea+"</div>"+
		        "<div region='south' style='height:40px;border:0'>"+
				"<table width='100%' height='100%' class='formbasic'><tr>"+
				"<td  style='text-align:center;border:0px;'><ul class='btn_hover'>"+
				"<li onClick='window.event_edit_conform=1;$(\"#event_edit\").window(\"close\")'><a href='javascript:void(0)'><span><div class='ok'>确定</div></span></a></li>"+
				"<li onClick='$(\"#event_edit\").window(\"close\")'><a href='javascript:void(0)'><span><div class='no'>取消</div></span></a></li>"+
				"</ul></td></tr></table></div></div></div>";
	            baseWin.$("body").append(html);
	        }
	        var divOption = {
	            baseWin:baseWin,
				title:eventOption.dialogTitle,
				id:"event_edit",
				width: eventOption.dialogWidth,
				height:eventOption.dialogHeight,
				zIndex: 9000,
				draggable: true, //拖动
				resizable: true, //改变大小
				modal: true, //后台页面可编辑
				closed: false, //是否关闭？
				minimizable: false,//最小化按钮
				maximizable: true,//最大化按钮
				closable: true, //关闭按钮
				collapsible: false, //收缩按钮 
				nowrap: false,
				onClose:function(){
				    if(baseWin.event_edit_conform)
					   obj.value=baseWin.$("#event_edit_area").val();
					baseWin.$("#event_edit_area").val("");
					baseWin.event_edit_conform=0;
				}
			}
	        showJqueryWindow(divOption);
	        baseWin.$("#event_edit_area").val(obj.value?obj.value:(eventOption.defaultEdit));//obj.id+":function(){}"
	        baseWin.$("#event_layout").layout({});
	        if(isAPI){
	           baseWin.$("#api_area").val(desc.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,''));
	        }
	}

	//if (IsEmpty(option)){alert('亲~没有这个ID哦~');};
	var checkInputId = (typeof(option.mId)=="string")?$('#'+option.mId):$(option.mId);
	if(checkInputId.length>0){
		checkInputId.each(function() {
			var thisinput = this.cloneNode();
			var clickFunc = $(this).attr("onclick");//得开窗按钮点击事件
			var thisId = thisinput.id ? thisinput.id : '';
			var thisName = thisinput.name?thisinput.name : '';
			var thisValue = this.value?this.value:'';
			var atexteare = document.createElement('textarea');
			
			//tangyj 2013-04-27
			//将原来input框的width值设置到oldWidth属性上，用于在窗口改变时实时计算宽度
			$(atexteare).attr("oldWidth",$(this).css("width"));
			
			//将输入框本身长度设置成100%
			//atexteare.style.width = "100%";
			//复制属性
			atexteare.id = thisId;
			atexteare.name = thisValue;
			atexteare.value = this.value;
			$(atexteare).css("overflow",'hidden');
			$(atexteare).attr("dialogTitle",$(this).attr("dialogTitle"));
			$(atexteare).attr("dialogWidth",$(this).attr("dialogWidth"));
			$(atexteare).attr("dialogHeight",$(this).attr("dialogHeight"));
			$(atexteare).attr("defaultEdit",$(this).attr("defaultEdit"));
			$(atexteare).attr("apiId",$(this).attr("name"));
			
			var adiv = document.createElement('span');
			//获取文本框的样式中width属性，并设置到span，默认为100%
			if(IsEmpty($(thisinput).css("width"))){
				$(atexteare).css("width",105);
			}else{
				$(atexteare).css("width",getElementWidth(this)-15);
			}
			var atag = document.createElement('a');
			atag.onclick = clickFunc;
			
			var keepTextEvent = IsEmpty($(thisinput).attr("keepTextEvent")) ? false : $(thisinput).attr("keepTextEvent");
			if(option.keepTextEvent){//优先取初始化参数的值
				keepTextEvent = option.keepTextEvent;
			}
			if(keepTextEvent){
				atexteare.onclick = clickFunc;
			}
			
			//为按钮绑定事件
			$(atag).bind("click",function(){
				var eventOption = {};
				eventOption.mId = atexteare;
				
				eventOption.dialogTitle = IsEmpty($(atexteare).attr("dialogTitle")) ? "编辑窗口" : $(atexteare).attr("dialogTitle");
				if(option.dialogTitle){//优先取初始化参数的值
					eventOption.dialogTitle = option.dialogTitle;
				}
				eventOption.dialogWidth = parseInt(IsEmpty($(atexteare).attr("dialogWidth")) ? "450" : $(atexteare).attr("dialogWidth")) ;
				if(option.dialogWidth){//优先取初始化参数的值
					eventOption.dialogWidth = parseInt(option.dialogWidth);
				}
				eventOption.dialogHeight = parseInt(IsEmpty($(atexteare).attr("dialogHeight")) ? "350" : $(atexteare).attr("dialogHeight")) ;
				if(option.dialogHeight){//优先取初始化参数的值
					eventOption.dialogHeight = parseInt(option.dialogHeight);
				}
				eventOption.defaultEdit = IsEmpty($(atexteare).attr("defaultEdit"))?"" : $(atexteare).attr("defaultEdit") ;
				if(option.defaultEdit){//优先取初始化参数的值
					eventOption.defaultEdit = option.defaultEdit;
				}
				if($(atexteare).attr("apiId")){
				   eventOption.apiId = $(atexteare).attr("apiId");
				}
				openMoreValueDialog(eventOption);
			});
			
			//adiv.className = 'moreVal';
			//adiv.style.height = '20px';
			var table = document.createElement('table');
			$(table).addClass("moreVal").attr("cellpadding", "0").attr("cellspacing", "0");
			
			//将span下的table的width设置成100%
			//table.width="100%";
			var tbody = document.createElement("tbody");
			var tr_1 = document.createElement('tr');
			var td_11 = document.createElement('td');
			$(atexteare).addClass("moreVal txt");
			$(td_11).append(atexteare);
			var td_12 = document.createElement('td');
			$(td_12).append(atag);
			//将图片容器设置固定长度
			//td_12.width="13px";
			$(tr_1).append(td_11).append(td_12);
			$(tbody).append($(table).append(tr_1));
			
			adiv.appendChild(table);
			//adiv.appendChild(atag);
			this.parentNode.replaceChild(adiv,this);
			$(adiv).css({"display":$(thisinput).css("display")});
		});
	 }
};
/***************************moreValue数值框结束**************/

/***************************蒙板*********************************/
/*
蒙板,传入参数是对象,option对象包含以下属性:
mId:蒙板div的id(可以在页面中没有,工具会帮你根据id创建)
container:蒙板容器对象(指定蒙板覆盖的范围所需要)
*/
commonUtil.showMask = function(option)
{
/*******************************内部方法开始************************************/
	  //屏蔽输入，显示蒙板
	  function mask_show(option) {
	  	var mask = document.getElementById(option.mId);
	  	mask.style.width = option.container.clientWidth;
	  	mask.style.height = option.container.clientHeight;
	  	mask.style.display = "block";
	  }
/*******************************内部方法结束************************************/
	var mask = document.getElementById(option.mId);
	if (IsEmpty(mask)) {
		mask = document.createElement("div");
		mask.id = option.mId;
		document.body.appendChild(mask);
	}
	mask.className = "Mask";
	mask_show(option);
};

commonUtil.hideMask = function(id)
{
	document.getElementById(id).style.display = "none";
};
/***************************蒙板结束*****************************/

/***************************通用详情*****************************/
commonUtil.showDetail = function() 
{
	//删除详情页面中不必显示的元素
	function detail_cleanSomeThing() {
		//把'保存'和'取消'按钮删除
		$("table").each(function(){
			if ($(this).find(".btn_hover")[0] != undefined) {
				//$(this).remove();
			} else {
				if (this.className == 'formbasic') {
					//$(this).height("100%");
				}
			}
		});
	}
	
	detail_cleanSomeThing();
	$(".formbasic").css("height","auto");
	$("div").each(function(){
		if(this.region != null && this.region == 'center'){
			$(this).css("overflow", "auto");
			$(this).addClass("defaultColor");
		}
	});
	var inputs = $(':input');
	for (var i = 0;i < inputs.length;i++) {
		var input = inputs[i];
		//隐藏域不处理
		if (input.type == "hidden") {
			continue;
		}
		var parent = $(input).parent();
		//htc下拉框的处理
		/*if (input.parentElement.className == "PickList") {
			   parent = parent.parent();
		}*/
		//自定义的下拉框及开窗取框，需要往上找到th对象
		var th=input.parentElement;
		while(th.nodeName!="TH"){th=th.parentElement;parent = $(th);}
		
		//获取input的值
		var value = $(input).val();//.replace(/[\n,\r]/g,"<br>");//对换行处理
		if(value) {
			value=value.replace(/[\<]/g, "&lt;");
			value=value.replace(/[\>]/g, "&gt;");
			value=value.replace(/[\n,\r]/g,"<br>");
		}
		if (input.type == "select-one") {//如果是select标签，要获取对应的文本值
			for (var j = 0;j < input.options.length;j++) {
				if (input.options[j].value == value) {
					value = input.options[j].innerHTML;
					break;
				}
			}
		}
		//把值填入td中
		parent.css("font-weight", "normal");
		parent.html(value);
	}
};

//初始化详情页面
/*
*/
commonUtil.initDetail = function(data) 
{
/*******************************内部方法开始************************************/
	function detail_createTable(){
		var table = document.createElement("table");
		$(table).attr("width","100%")//.attr("height","100%")
				.attr("cellpadding","0").attr("cellspacing","0")
				.attr("border","0").addClass("formbasic").css("height","auto");
		return table;
	}
	function detail_createTR(){
		return document.createElement("tr");
	}
	function detail_createTD(column){
		//column.text = IsEmpty(column.text) ? "" : column.text.replace(/[\n\r]/g,"<br>&nbsp;&nbsp;"); 
		var td;
		if (IsEmpty(column.isKey) || !column.isKey){
			td = document.createElement("th");
		} else { 
			td = document.createElement("td");
		}
		$(td).css("vertical-align", "middle");
		if (!IsEmpty(column.width))
			$(td).attr("width", column.width);
		if (!IsEmpty(column.height)){//$(td).attr("height", column.height);
			}
		if (!IsEmpty(column.colspan))
			$(td).attr("colspan", column.colspan);
		if (!IsEmpty(column.rowspan))
			$(td).attr("rowspan", column.rowspan);
		if (!IsEmpty(column.isKey) && column.isKey) {
			//$(td).html(column.text+"&nbsp;");
			$(td).html(((column.text+"").replace(/ /g,"")=="null"?"&nbsp;":column.text.replace(/ /g,"&nbsp;&nbsp;").replace(/\r/g,"<br>").replace(/\n/g,"<br>")));
		} else {
			$(td).css("font-weight", "normal");
			$(td).html("&nbsp;&nbsp;"+(column.text+"").replace(/ /g,"")=="null"?"&nbsp;":column.text);
		}
		return td;
	}
/*******************************内部方法结束************************************/
	$(document.body).addClass("easyui-layout").addClass("defaultColor");
	var div = document.createElement("div");
	var tb = detail_createTable();
	//$(tb).css("table-layout", "fixed");
	var tbody = document.createElement("tbody");
	for (var i = 0;i < data.length;i++) {
		var tr = detail_createTR();
		$(tr).css("vertical-align", "middle");
		for (var j = 0;j < data[i].length;j++) {
			var column = data[i][j];
			tr.appendChild(detail_createTD(column));
		}
		tbody.appendChild(tr);
	}
	tb.appendChild(tbody);
	div.appendChild(tb);
	document.body.appendChild(div);
	$("div").css("overflow", "auto").css("width","100%").css("height","100%");
};

commonUtil.setDetailData = function(key, data)
{
	//var detail_dataArray = [];
	var isHave = false;
	for (var i = 0;i < commonUtil.detail_dataArray.length;i++) {
		if (commonUtil.detail_dataArray[i].key == key){
			commonUtil.detail_dataArray[i] = {key: key, data: data};
			isHave = true;
		}
	}
	if (!isHave) {
		commonUtil.detail_dataArray.push({key: key, data: data});
	}
};

commonUtil.getDetailData = function(key)
{
	for (var i = 0;i <commonUtil.detail_dataArray.length;i++) {
		if (commonUtil.detail_dataArray[i].key == key){
			return commonUtil.detail_dataArray[i].data;
		}
	}
	return null;
};
/***************************通用详情结束*************************/

/***************************元素自适应大小**********************/
//option参数对象包括：
//eId:被自适应元素id
//eType:被自适应元素类型,1或"htc"：htc列表；2或"flex"：flex列表,3或jquery:jquery列表
//rId:参照容器id(装载被自适应元素的容器)
//width:宽度调整值
//height:高度调整值
commonUtil.setWH = function(option)
{
	if (option == null && option == undefined){
		return;
	}
	var element = document.getElementById(option.eId);//获取被自适应元素对象
	var container = document.getElementById(option.rId);//获取容器
	var width = IsEmpty(option.width) ? 0 : option.width;//宽度调整值
	var height = IsEmpty(option.height) ? 0 : option.height;//高度调整值
	
	container = IsEmpty(container) ? document.body : container;
	var eWidth = width == 'fixed' ? $(element).outerWidth() : $(container).outerWidth() + width;
	var eHeight = height == 'fixed' ? $(element).outerHeight() : $(container).outerHeight() + height;
	if (eWidth < 0 || eHeight < 0) {
		//simpleAlert('元素经过调整值后,高度和宽度不能为负数!');
		return;
	}
	if (option.eType == '1' || option.eType == 'htc') {
		element.setWidth(eWidth);
		element.setHeight(eHeight);
	} else if (option.eType == '2' || option.eType == 'flex') {
		element.width = eWidth;
		element.height = eHeight;
	} else if (option.eType == '3' || option.eType == 'jquery') {
		try {
			$(element).datagrid("resize", {height:eHeight,width:eWidth});
		} catch (err) {
			$(element).treegrid("resize", {height:eHeight,width:eWidth});
		}
	} else {
		$(element).width(eWidth);
		$(element).height(eHeight);
	}
};
/***************************元素自适应大小结束**********************/

/***************************输入提示框***************************/
/*option参数:
  eId:元素ID
 vId:存放标识(id)隐藏域的id
 url:远程获取数据的链接
 data:本地数据对象(和url二选一)
 dataColumns:提示框表格列配置
 selectColumn:指定匹配列
 selectColumn:标识字段名
 width:提示框宽度
 height:提示框高度
*/
commonUtil.initPrompt = function(option)
{
	//var prompt_id = 1;//提示框ID区分标识(一个页面可能多个提示框)
/*******************************内部方法开始************************************/
	//onKeyup事件执行方法
	function prompt_onKeyupFn(option){
		if ($(document.getElementById(option.eId)).val() == "") {
			prompt_hiddenPrompt(option);return;
		}
		var div = document.getElementById(option.dId);
		var table = document.getElementById(option.tId);
		$(div).show();
		if (IsEmpty(table)) {
			//创建table对象并添加到div中
			var table = prompt_createTable(option);
			div.appendChild(table);
			//生成datagrid
			$('#'+option.tId).datagrid({columns:[option.dataColumns],nowrap:true,
					fitColumns: true, width: option.width,height: option.height,
					rownumbers:false, singleSelect:true, 
					onClickRow: function(rowIndex, rowData){
						commonUtil.prompt_currentDataIndex = rowIndex;
						prompt_selectData(option, null);
						prompt_hiddenPrompt(option);
					}});
		}
		prompt_filterData(option);//设置数据过滤
		prompt_initData(option);//初始化数据到datagrid中
		prompt_showPosition(option);//提示框定位
	}
	//创建table
	function prompt_createTable(option) {
		var div = document.getElementById(option.dId);
		var table = document.createElement("table");
		table.id = option.tId;
		option.width = IsEmpty(option.width) ? $(document.getElementById(option.eId)).width() + 19 : option.width;
		option.height = IsEmpty(option.height) ? 150 : option.height;
		div.style.offsetWidth = option.width;
		div.style.offsetHeight = option.height;
		table.style.offsetWidth = option.width;
		table.style.offsetHeight = option.height;
		return table;
	}
	//初始化数据
	//var prompt_fullData;
	function prompt_initData(option){
		if (IsEmpty(option.data)) {
			AjaxRequest.doRequest('', option.url, option.urlParams, function(backData){
				var jsonData = Ext.util.JSON.decode(backData);
				$('#'+option.tId).datagrid("loadData", jsonData);
				commonUtil.prompt_fullData = jsonData;
				prompt_selectFirstData(option);
			});
		} else {
			$('#'+option.tId).datagrid("loadData", option.data);
			commonUtil.prompt_fullData = option.data;
			prompt_selectFirstData(option);
		}
	}
	//选中第一行数据
	function prompt_selectFirstData(option){
		$('#'+option.tId).datagrid("selectRow", 0);
		commonUtil.prompt_currentDataIndex = 0;
	}
	//过滤数据,获取文本输入值,截取输入值最后一个,号后面的值,做模糊匹配,列表显示匹配结果
	function prompt_filterData(option){
		var e = document.getElementById(option.eId);
		var value = e.value.indexOf(",") < 0 ? e.value : e.value.split(',')[e.value.split(',').length - 1];
		$('#'+option.tId).datagrid({loadFilter: function(data){
			var filterData = [];
			for (var i = 0;i < data.length;i++) {
				if (eval("data[i]."+option.selectColumn+".indexOf(value) >= 0 ")) {
					filterData.push(data[i]);
				}
			}
			return {total:filterData.length, rows:filterData};
		}});
	}
	//提示框定位
	function prompt_showPosition(option) {
		var e = document.getElementById(option.eId);
		var div = document.getElementById(option.dId);
		var left = 0;
		var top = 0;
		var obj = e;
		while (obj != document.body) {
			left += obj.offsetLeft;
			top += obj.offsetTop;
			obj = obj.offsetParent;
		}
		if (top + e.offsetHeight + option.height <= document.body.offsetHeight) {
			div.style.top = top + e.offsetHeight;
			div.style.left = left;
		} else {//如果页面下方控件不足
			div.style.top = top - option.height;
			div.style.left = left;
		}
	}
	//上下选择数据
	//var prompt_currentDataIndex = 0;
	function prompt_selectData(option, keyCode){
		if (IsEmpty(document.getElementById(option.tId)))return;
		if (keyCode == 38) {//上
			commonUtil.prompt_currentDataIndex = commonUtil.prompt_currentDataIndex - 1 >= 0 ? commonUtil.prompt_currentDataIndex - 1 : commonUtil.prompt_currentDataIndex;
		} else if(keyCode == 40) {//下
			var maxIndex = $('#'+option.tId).datagrid("getRows", null).length - 1;
			commonUtil.prompt_currentDataIndex = commonUtil.prompt_currentDataIndex + 1 <= maxIndex ? commonUtil.prompt_currentDataIndex + 1 : maxIndex;
		}
		$('#'+option.tId).datagrid("selectRow", commonUtil.prompt_currentDataIndex);
		prompt_enterConfirm(option);
	}
	//回车确定选择
	function prompt_enterConfirm(option){//cEmployeeName
		var row = $('#'+option.tId).datagrid("getSelected",null);
		if (row == null) return;
		var value = $(document.getElementById(option.eId)).val();
		var index = value.lastIndexOf(",");
		var str = "";
		if (index >= 0) {
			str = value.substr(0, index + 1);
		}
		if (eval('value.indexOf(row.'+option.selectColumn+')') >= 0) {
			return;//已经存在的不赋值
		}
		$(document.getElementById(option.eId)).val(eval('str += row.'+option.selectColumn));
		prompt_setValue(option);
	}
	//显示提示框
	function prompt_showPrompt(option){
		$('#'+option.dId).show();
	}
	//隐藏提示框
	function prompt_hiddenPrompt(option) {
		$('#'+option.dId).hide();
	}
	//id标识赋值
	function prompt_setValue(option){
		if (commonUtil.prompt_fullData == null) return;
		var iVal = "";
		var sVal = $(document.getElementById(option.eId)).val();
		if (sVal == "") {
			$(document.getElementById(option.vId)).val("");
			return;
		}
		for (var i = 0;i < sVal.split(',').length;i++) {
			var val = sVal.split(',')[i];
			var id = "";
			for (var j = 0;j < commonUtil.prompt_fullData.length;j++) {
				if (eval('commonUtil.prompt_fullData[j].'+option.selectColumn+' != val')) continue;
				id = eval('commonUtil.prompt_fullData[j].'+option.selectColumnId);
			}
			if (iVal.length > 0) iVal += ",";
			iVal += id;
		}
		$(document.getElementById(option.vId)).val(iVal);
	}
/*******************************内部方法结束************************************/
	//创建提示div框,并将divId和option参数存入objArray数组
	var div = document.createElement("div");
	div.id = "prompt_"+commonUtil.prompt_id;
	div.className = "prompt_Div";
	option.dId = div.id;
	option.tId = "promptTb_"+commonUtil.prompt_id;
	document.body.appendChild(div);
	//获取元素并添加onkeyup事件,事件执行方法传入option参数
	var e = document.getElementById(option.eId);
	$(e).keyup(function(event){
		switch(event.keyCode){
			case 38:
			case 40: prompt_showPrompt(option);prompt_selectData(option, event.keyCode);break;//上下选择数据
			case 13: prompt_enterConfirm(option);prompt_hiddenPrompt(option);break;//回车确定选择
			default: prompt_onKeyupFn(option);prompt_setValue(option);break;
		}
	});
	commonUtil.prompt_id++;
};
/***************************输入提示框结束************************/

/***************************Enter快捷键*************************/
/*
eId：设置快捷键的元素
fn: 快捷键执行的方法
*/
commonUtil.setFastKey = function(option)
{
	//var enter_id = 1;
	var e = document.getElementById(option.eId);
	//防止表单中只有一个input对象而提交表单
	var input = document.createElement("input");
	input.id = "enter_Input"+commonUtil.enter_id.toString();commonUtil.enter_id++;
	input.style.display = "none";
	e.appendChild(input);
	$(e).bind("keydown", function(event){
		var evt = getEvent();
		if (event.keyCode == 13) {//回车
			window.setFastKeyOption = option;
			setTimeout("setFastKeyOption.fn()",100);
		}
	});
};
/***************************Enter快捷键结束*********************/

/***************************行数据转纵向显示*****************************/
commonUtil.singleRowToView = function(obj)
{//入口方法
/*******************************内部方法开始************************************/
	//方法中传入的obj参数
	//var objParamArray = [];
	function setLayoutParam(obj){
		var isHave = false;
		for (var i = 0;i < commonUtil.objParamArray.length;i++) {
			if (commonUtil.objParamArray[i].listId == obj.listId) {
				commonUtil.objParamArray[i] = obj;
				isHave = true;
			}
		}
		if (!isHave) {
			commonUtil.objParamArray.push(obj);
		}
	}
	/*
		原则：以行选为准
		入参：obj为对象型入参，包含属性
			 listType:列表类型，1或"htc"：htc列表；2或"flex"：flex列表；3或"jquery":jquery列表(默认)；
			 listId:列表ID或对象，flex列表则接收对象，那就是列表对象；
			 column:列属性信息，jquery和flex列表为对象数组，htc列表通过遍历获取列信息；

			 以上属性必须有
			 baseWin:基础窗体对象，在指定窗体的基础上开窗，不给此参数，默认在前窗体打开，否则在指定窗体上打开
			 winW:生成窗体的宽度，默认值为450
			 winH:生成窗体的高度，默认值为310
			 fn:传入的方法，用于自定义表格；入参为封装好的json对象
		返回值：返回封装好的json数组对象
	*/
	function getDataListItem(obj){//获取数据
		var listObj = null;
		var tempItem = null;
		var item = null;//行选数据
		var returnValue = null;
		
		if(obj.listType == 1 || obj.listType == "htc"){
			listObj = (typeof(obj.listId)=="string") ? document.getElementById(obj.listId) : obj.listId;
			if(listObj){tempItem = listObj.checkedItems;item = listObj.selectedItem;}
		}else if(obj.listType == 2 || obj.listType == "flex"){
			listObj = obj.listId;
			if(listObj){tempItem = listObj.checkedItems();item = listObj.getSelectedItem();}
		}else{
			listObj = (typeof(obj.listId)=="string") ? $('#'+obj.listId) : obj.listId;
			if(listObj){tempItem = $(listObj).datagrid("getSelections");item = $(listObj).datagrid("getSelected");}
		}
		
		if(item){
			//封装数据，格式为{field:xxx, title:yyy, text:zzz}
			var fld = "";//列头field属性
			var title = "";//列头title属性
			var text = "";//选中行文本值
			if(obj.listType == 1 || obj.listType == "htc"){
				var jsons = "[";
				var objs = "{";
				//从htc控件得可视列:字段名，字段描述，文本值
				var i=0;var j=0;
				for(var p in item){	//遍历对象属性
					if(typeof (item[p]) != "function"){
						if(i<3){i++;continue;}
						if(listObj.getDisplayText(j)== undefined){continue;}
						if(item[p]==undefined){item[p]="";}
						if(j > 0){objs+=",{";}
						fld = p;
						title = listObj.getDisplayText(j);
						text = item[p];
						text = text.replace(/\\/g, "\\\\");//将"\"替换为"\\"
						objs += "field:\""+fld+"\", title:\""+(title?title.replace(/\n/g,"<br>").replace(/\r/,"<br>").replace(/ /g,"&nbsp;&nbsp;"):"")+"\", text:\""+text+"\"}";
						j++;
					}
				}
				jsons += objs + "]";
				returnValue = jsons;
			}else if(obj.listType == 2 || obj.listType == "flex"){
				var jsons = "[";
				var objs = "{";
				for(var i=0; i<obj.column.length; i++){
					if(obj.column[i].visible == "false")
						continue;
					if(i>0)objs += ",{";
					fld = obj.column[i].dataField;
					title = obj.column[i].headerText;
					text = eval('(' + "item."+fld + ')');//text
					if(text == null)text="";
					text = text.replace(/\\/g, "\\\\");//将"\"替换为"\\"
					objs += "field:\""+fld+"\", title:\""+title+"\", text:\""+text+"\"}";
				}
				jsons += objs + "]";
				returnValue = jsons;
			}else{
				var jsons = "[";
				var objs = "{";
				for(var i=0; i<obj.column.length; i++){
					for(var j=0; j<obj.column[i].length; j++){
						if(obj.column[i][j].hidden == 'true')//不封装隐藏域的数据
							continue;
						if(j>0)objs += ",{";
						
						fld = obj.column[i][j].field;
						title = obj.column[i][j].title;
						text = eval('(' + "item."+fld + ')');//text
						if(text == null)text="";
						text = text.replace(/\\/g, "\\\\");//将"\"替换为"\\"
						objs += "field:\""+fld+"\", title:\""+title+"\", text:\""+text+"\"}";
					}
				}
				jsons += objs + "]";
				returnValue = jsons;
			}
		}
		return returnValue;
	}
	
	/*
		构建纵向表格
		obj:对象型参数，属性参见getDataListItem方法
		jsons属性:封装好的json数组对象
	*/
	function setVerticalTbl(obj){
		
		var jsons = decode(obj.jsons);
		if (typeof(obj.fn) == "function"){obj.fn.call(this, jsons);return;}//如果有回调函数
		var divHtml	= "";
		var tabHtml = "";
		
		obj.baseWin = (obj.baseWin) ? obj.baseWin:window;
		var div = obj.baseWin.$("#"+obj.listId+"_singleRow");
		if(div.length>0)div=div[0];else div=null;
		if(!div){//创建div
			
			var divHtml	= "<div region='center' class='defaultColor' style='border:0'>" +
						  "<table id='singleRowTbl' width='100%' class='formbasic'>";
						
			for(var i=0; i<jsons.length; i++){
				tabHtml += "<tr><td width='30%'>" + jsons[i].title + "</td><th width='70%'>" + jsons[i].text + "</th></tr>";
			}
			divHtml += tabHtml + "</table></div>";
			//按钮区域
			divHtml += "<div region='south' style='height:35px;border:0px;' class='defaultColor'><div id='singleRow_btns'></div></div>";
			
			div = obj.baseWin.document.createElement("div");
			div.id = obj.listId+"_singleRow";
			div.className = "easyui-layout";
			div.style.overflow = "hidden";
			div.innerHTML = divHtml;
			obj.baseWin.document.body.appendChild(div);
			
			var buttons =[
				{
					btnId: 'pre', btnPicName: 'arrow-up-top.gif', btnName: '上一行', btnFun: function(){
						commonUtil.preRow(commonUtil.getLayoutParam(obj.listId));
					}
				},
				{
				 	btnId: 'next', btnPicName: 'arrow-down-bottom.gif', btnName: '下一行', btnFun: function(){
				 		commonUtil.nextRow(commonUtil.getLayoutParam(obj.listId));
				 	}
				}
			];
			var btnJson = {eId: 'singleRow_btns', btnAlign: 'center', btnOptions: buttons};
			commonUtil.initButtonDiv(btnJson);
			$("#singleRow_btns").css("margin-top", "5px");
			
			$(div).window({
				title: "纵向详情", 
				width: obj.winW ? parseInt(obj.winW) : 450,   
				height: obj.winH ? parseInt(obj.winH) : 310,   
				modal: false,
				collapsible: false,
				minimizable: false,
				maximizable: false,
				resizable: false,
				onClose: function(){
					$(div).remove();
				}
			});
			
		}else{//更新内容
			for(var i=0; i<jsons.length; i++){
				tabHtml += "<tr><td width='30%'>" + jsons[i].title + "</td><th width='70%'>" + jsons[i].text + "</th></tr>";
			}
			$('#singleRowTbl').html(tabHtml);
		}
	}
/*******************************内部方法结束************************************/
	setLayoutParam(obj);
	var returnVal = getDataListItem(obj);
	//将封装好的json数组对象赋给obj的jsons属性
	obj.jsons = returnVal;
	setVerticalTbl(obj);
};

/*
	上一行
	obj:对象型参数，属性参见getDataListItem方法
*/
commonUtil.preRow = function(obj)
{
	var listObj = null;
	if(obj.listType == 1 || obj.listType == "htc"){
		listObj = (typeof(obj.listId)=="string") ? document.getElementById(obj.listId) : obj.listId;
		if(listObj){
			var items = listObj.items;//选元素
			var item = listObj.selectedItem;//选中行
			var rowId = "";//从0开始
			
			for(var i=0; i<items.length; i++){//获取行号
				if(items[i].iEmployeeId == item.iEmployeeId){rowId = i;break;}
			}
			
			if(rowId == 0){return;}//simpleAlert("已为首行");
			for(var i=0; i<items.length; i++){
				items[i].setChecked(false);
			}
			items[rowId-1].setChecked(true);
			items[rowId-1].setSelected();
			
			commonUtil.singleRowToView(obj);
		}
	}else if(obj.listType == 2 || obj.listType == "flex"){
		listObj = obj.listId;
		if(listObj){
			var sItem = listObj.getSelectedItem();//选中行
			var items = listObj.items();//所有行对象
			
			var rowId = sItem.rowId - 1;
			if(rowId == 0){return;}//simpleAlert("已为首行");
			
			listObj.setSelected(items[rowId - 1]);
			
			commonUtil.singleRowToView(obj);
		}
	}else{
		listObj = (typeof(obj.listId)=="string") ? $("#"+obj.listId) : obj.listId;
		if(listObj){
			var row = listObj.datagrid("getSelected");
			if(row){
				//获取行号
				var index = listObj.datagrid("getRowIndex", row);
				if(index == 0){return;}//simpleAlert("已为首行");
				//取消选中
				listObj.datagrid("unselectRow", index);
				//选中新行
				listObj.datagrid("selectRow", index-1);
				
				commonUtil.singleRowToView(obj);
			}
		}
	}
};

commonUtil.getLayoutParam = function(listId)
{
	for (var i = 0;i < commonUtil.objParamArray.length;i++) {
		if (commonUtil.objParamArray[i].listId == listId) {
			return commonUtil.objParamArray[i];
		}
	}
	return null;
};

/*
	下一行
	obj:对象型参数，属性参见getDataListItem方法
*/
commonUtil.nextRow = function(obj)
{
	var listObj = null;
	if(obj.listType == 1 || obj.listType == "htc"){
		listObj = (typeof(obj.listId)=="string") ? document.getElementById(obj.listId) : obj.listId;
		if(listObj){
			var items = listObj.items;//选元素
			var item = listObj.selectedItem;//选中行
			
			var rowId = "";//从0开始
			for(var i=0; i<items.length; i++){
				if(items[i].iEmployeeId == item.iEmployeeId){
					rowId = i;
					break;		
				}
			}
		
			if(rowId == listObj.items.length - 1){return;}//simpleAlert("已为尾行");
			for(var i=0; i<items.length; i++){
				items[i].setChecked(false);
			}
			items[rowId+1].setChecked(true);
			items[rowId+1].setSelected();
			
			commonUtil.singleRowToView(obj);
		}
	}else if(obj.listType == 2 || obj.listType == "flex"){
		listObj = obj.listId;
		if(listObj){
			var sItem = listObj.getSelectedItem();//选中行
			var items = listObj.items();//所有行对象
			listObj.setUnChecked(items[sItem.rowId-1],"check");
			
			var rowId = sItem.rowId;//行号
			if(rowId == items.length){return;}//simpleAlert("已为尾行");
			var index = rowId;
			listObj.setSelected(items[index]);
			
			commonUtil.singleRowToView(obj);
		}
	}else{
		listObj = (typeof(obj.listId)=="string") ? $("#"+obj.listId) : obj.listId;
		if(listObj){
			var row = listObj.datagrid("getSelected");
			if(row){
				//获取行号
				var index = listObj.datagrid("getRowIndex", row);
				var rows = listObj.datagrid("getRows");
				if(index == rows.length-1){return;}//simpleAlert("已为尾行");
				//取消选中
				listObj.datagrid("unselectRow", index);
				//选中新行
				listObj.datagrid("selectRow", index+1);
				
				commonUtil.singleRowToView(obj);
			}
		}
	}
};
/***************************行数据转纵向显示结束*************************/

/***************************输入框提示信息****************************/
commonUtil.showDefaultMsg = function(obj)
{
	//var hintOptions = [];//保存输入框提示信息的数组
	//var hintId = 1;
	//var hintColor = "#9c9a97";
	function initHint(input, _msg){
		if (input.type != "text" && input.type != "textarea") return;
		if (_msg != undefined && _msg != null) {
			input.setAttribute("showDefault", "true");
			input.setAttribute("msg", _msg);
			//input.attributes['showDefault'].nodeValue = "true";
			//input.attributes['msg'].nodeValue = _msg;
		}
		if (input.attributes['showDefault'] == undefined || input.attributes['showDefault'] == null || input.attributes['showDefault'].nodeValue != "true") return;
		var msg = input.attributes['msg'].nodeValue == undefined ? "" : input.attributes['msg'].nodeValue;
		//登记提示信息并存入信息数组
		var option = new Object();
		option.id = input.id;
		if (option.id == null || option.id == "") {
			option.id = "hint"+commonUtil.hintId.toString();commonUtil.hintId++;
		}
		input.hintId = option.id;
		option.oldColor = input.style.color;
		option.msg = msg;
		option.currentValue = input.value;
		commonUtil.hintOptions.push(option);
		//如果文本为空,赋提示值(取msg属性的值),并设置文本框的样式为提示信息样式
		input.value = msg;
		input.style.color = commonUtil.hintColor;
		if (GetBrowserType().indexOf("IE") >= 0){
			input.attachEvent("onfocus", function(event){focus(event);});
			input.attachEvent("onblur", function(event){blur(event);});
		} else {
			input.addEventListener('focus', function(event){focus(event);}, false);
			input.addEventListener('blur', function(event){blur(event);}, false);
		}
	}
	function focus(event){//清空文本提示,设置文本框样式为输入样式
		var input = event.srcElement ? event.srcElement : event.target;
		var option = getHintOption(input.hintId);
		if (input.value != option.msg) return;
		input.value = "";input.value = "";
		input.style.color = option.oldColor;
	}
	function blur(event){//如果文本框值为空,则显示提示信息
		var input = event.srcElement ? event.srcElement : event.target;
		showHint(input);
	}
	//当文本框为空时,文本框样式设置为提示信息样式,并显示提示信息
	function showHint(input){
		if (input.value != "") return;
		var option = getHintOption(input.hintId);
		input.style.color = commonUtil.hintColor;
		input.value = option.msg;
	}
	function setHintOption(option){
		var isHave = false;
		for (var i = 0;i < commonUtil.hintOptions.length;i++) {
			if (commonUtil.hintOptions[i].id == option.id) {
				commonUtil.hintOptions[i] = option;
				isHave = true;
			}
		}
		if (!isHave) {
			commonUtil.hintOptions.push(option);
		}
	}
	function getHintOption(id){
		for (var i = 0;i < commonUtil.hintOptions.length;i++) {
			if (commonUtil.hintOptions[i].id == id) {
				return commonUtil.hintOptions[i];
			}
		}
		return null;
	}
	function initHints(obj){
		var eids = obj.eids.split("##");
		var msgs = obj.msgs.split("##");
		for (var i = 0;i < eids.length;i++) {
			initHint(document.getElementById(eids[i]), msgs[i]);
		}
	}
/*******************************内部方法结束************************************/
	if (obj == undefined || obj == null) {//第一种,加载页面上showDefault=true的文本框
		var inputs = document.getElementsByTagName("input");
		var areas = document.getElementsByTagName("textarea");
		for (var i = 0;i < inputs.length;i++)
			initHint(inputs[i]);
		for (var i = 0;i < areas.length;i++){
			initHint(areas[i]);
		}
	} else if (obj.eids != undefined && obj.msgs != undefined) {//第二种,给指定id的文本框加载
		initHints(obj);
	} else if (obj.url != undefined && obj.url != null) {//第三种,从后台得到指定数据
		AjaxRequest.doRequest(null,obj.url,obj.options,function(backData){
			var jsonData = eval('('+backData+')');
			if (obj.filterFn != undefined && typeof obj.filterFn == "function")//如果有过滤方法
				jsonData = obj.filterFn.call(this, jsonData);
			initHints(jsonData);
			if (obj.callBackFn != undefined && obj.callBackFn != null && typeof obj.callBackFn == "function")
				obj.callBackFn.call(this, jsonData);
		});
	}
};
/***************************输入框提示信息结束*************************/

/***************************计算开窗宽度与高度开始*************************/
//开窗的宽高大于可视窗体的宽高，将根据可视窗体的宽高做设置
//用于适应不同分辨率
commonUtil.computerWH = function(width, height,winObj)
{
	if(!winObj)winObj=window;
	var screenW=winObj.$("body").width();//document.body.clientWidth;
	var screenH=winObj.$("body").height();//document.body.clientHeight;
	
	if(!width)width=screenW;
	if(!height)height=screenH;
	
	if(width<=1)screenW=screenW*width;
	if(height<=1)screenH=screenH*height;
	
	if(width>1 && width<screenW)screenW=width;
	else if(width>1 && width>screenW)screenW=screenW-40;
	if(height>1 && height<screenH)screenH=height;
	else if(height>1 && height>screenH)screenH=screenH-20;

	return {w:screenW,h:screenH};
};
/***************************计算开窗宽度与高度结束*************************/

/**
自定义部件的显示与隐藏方法
eid:部件ID
boo:true显示，false隐藏
**/
commonUtil.setDisplay = function(eid,boo)
{
	var obj=(typeof(eid)=="string")?$("#"+eid):$(eid);
	obj.closest("span").css({"display":(boo?"inline":"none")});
};

/**
自定义部件的禁用的方法
eid:部件ID
flg:true禁用部件，false取消禁用
boo:有传值代表平台自定义组件
**/
commonUtil.setDisabled = function(eid,flg,boo)
{
	var obj=(typeof(eid)=="string")?$("#"+eid):$(eid);
	obj.attr("disabled",flg);
	if(flg){ //当设置禁用状态将部件背景变灰
	  obj.css("background-color","#EEEEEE");
	  obj.css("border","#999 1px solid");
	}else{
	  obj.css("background-color","");
	}
};

/**
自定义页面按钮块控件
auth:tangyj
date:2013-01-23
eId:按钮块标签id
btnAlign：按钮排列方式(居中:center、居左:left、居右:right)
btnOptions:按钮属性（btnId:按钮ID、btnName:按钮名称、btnPicName:按钮图片名称、btnFun:按钮单击事件函数、btnIsHidden:是否隐藏）
**/
commonUtil.initButtonDiv = function(option)
{
	 var path=getFullPath();
	var oldDiv = document.getElementById(option.eId);
	if (IsEmpty(oldDiv)) return;	
	
	var btnAlign = IsEmpty(option.btnAlign) ? "center" : option.btnAlign ;
	var btnAreaWidth = IsEmpty(option.btnAreaWidth) ? "100%" : option.btnAreaWidth ;
	
	//var newDiv = oldDiv.cloneNode();
	var newDiv = document.createElement("span");
	newDiv.id=oldDiv.id;
	$(newDiv).attr("style", "text-align: "+btnAlign+";width:"+btnAreaWidth+";margin-top:0px;");
	var table = document.createElement("table");
	$(table).attr("algin", btnAlign+";");
	$(table).attr("style", "background:none;border:0px;");
	var tr = document.createElement("tr");
	var td = document.createElement("td");
	$(td).attr("style", "background:none;border:0px;height:20px;");
	var ul = document.createElement("ul");
	$(ul).attr("class", "btn_hover");
	$(ul).css("width", "auto");
	
	var li,a,span,div1;
	for(var i = 0; i<option.btnOptions.length; i++){
		var btnOption = option.btnOptions[i];
		
		li = document.createElement("li");
		$(li).css("width","auto");
		li.id=btnOption.btnId;
		if(btnOption.btnFun){
			$(li).bind("click", btnOption.btnFun);
		}
		a = document.createElement("a");
		$(a).attr("href", "#");
		if(btnOption.btnIsHidden && 'none' == btnOption.btnIsHidden){
			$(a).css("display", 'none');
		}
		span = document.createElement("span");
		div1 = document.createElement("div");
		$(div1).attr("style", "background:url("+path+"/images/core/"+btnOption.btnPicName+") no-repeat 0 center;padding-left:20px");
		
		$(ul).append($(li).append($(a).append($(span).append($(div1).append(btnOption.btnName)))));
	}
	$(newDiv).append($(table).append($(tr).append($(td).append($(ul)))));
	
	oldDiv.parentNode.replaceChild(newDiv,oldDiv);//将原文框替成当前的span
};

/**
自定义页面分隔栏控件
auth:qiaoqide
date:2013-05-21
eId:整个分隔栏标签id
items:按钮属性(title:分隔栏标题、id:装载到分隔栏对象id/返回jquery对象的函数体、tools:[{btnId:'按钮id', btnPicName:'按钮图标', btnName:'按钮名称',btnFun:'按钮单击函数'}])
**/
commonUtil.createSeparatorbar = function(obj)
{
      var jsonData = obj.items;
      if(!jsonData)return;
      var table = document.createElement("table");
      $(table).attr("style", "border: 0px;width:100%;padding:0px;");
      $(table).attr("cellspacing","0");
      for(var i = 0;i<jsonData.length;i++){
         /**创建分隔栏 start**/
         var tr = document.createElement("tr");
         var td = document.createElement("td");
         $(td).attr("class", "formbasic");
         $(td).attr("style", "height:30px;");
         var div = document.createElement("div");
         $(div).attr("style", "float:left;padding-left: 3px;");
         
         var img = document.createElement("img");
         $(img).attr("src", path+"/images/core/ico_nohave2.gif");
         $(img).attr("trId",i);
         $(img).attr("id","img_"+i);
         $(img).bind("click", function(){changeTable(this);});
         
         var a = document.createElement("a");
         $(a).html("&nbsp;&nbsp;"+jsonData[i].title);
         $(a).attr("href","javascript:void(0)");
         $(a).attr("trId",i);
         $(a).bind("click", function(){changeTable(this);});
         $(div).append($(img));
         $(div).append($(a));
         $(td).append($(div));

         var buttonDiv = document.createElement("div");
         $(buttonDiv).attr("id","buttonDiv_"+i);
         $(buttonDiv).attr("style","float:right;padding-right: 15px;");
         $(td).append($(buttonDiv));
         
         $(table).append($(tr).append($(td)));
         /**创建分隔栏 end**/
         
         /**创建装载内容区域 start**/
         var contentTr = document.createElement("tr");
         $(contentTr).attr("id","contentTr_"+i);
         var contentTd = document.createElement("td");
         $(contentTd).attr("style", "padding:0px;");
         var contentObj = null;//向内容区域追加对象
         if(typeof(jsonData[i].id)=="string"){
             contentObj = $("#"+jsonData[i].id);//dom对象
         }else{
             contentObj = jsonData[i].id;//jquery对象
         }
         $(contentTd).append(contentObj);
         $(contentTr).append($(contentTd));
         $(table).append($(contentTr));
         /**创建装载内容区域 end**/
      }
      $("#"+obj.eId).append($(table));
      createButtons(jsonData);
      
      //创建分隔栏上的按钮
	  function createButtons(jsonData){
	      for(var i = 0;i<jsonData.length;i++){
	          if(jsonData[i].tools){
			      var btnJson = {eId:"buttonDiv_"+i, btnAlign : "right", btnOptions : jsonData[i].tools};
				  commonUtil.initButtonDiv(btnJson);
			  }
		  }
	  }
	  
	  //隐藏或显示分隔栏内容区域
	  function changeTable(id){
	       var index = "";
	       if(typeof(id)=="string"){
	          index = id;
	       }else{
	          index = id.trId;
	       }
	       if($("#contentTr_"+index).is(":hidden")) {
	          $("#contentTr_"+index).show();
	          $("#img_"+index).attr("src",path+"/images/core/ico_nohave2.gif");
	       }else{
	          $("#contentTr_"+index).hide();
	          $("#img_"+index).attr("src",path+"/images/core/ico_have2.gif");
	       }
	   }
};

/**************************************************页面初始时自动初始commonUtil控件**************************************************/
/*
author:tanjianwen
2011-12-29
将文本框模拟成下拉框,置于框后的样式图片，不被内容挤走
此工具类依赖jquery
*/
//window.document.onreadystatechange
if (typeof jQuery != "undefined")
{
$(window).bind("load",function(){
		var lis=$(".JQSelect").each(function(){
			if (this.tagName != 'TABLE') {
				var option = {eId : $(this).attr("id"),
										desc : IsEmpty($(this).attr("desc")) ? "全部" : $(this).attr("desc")};
				commonUtil.initJquerySelect(option); 
			}
		});
		
		var lis=$(".Digit").each(function(){
			if (this.tagName != 'TABLE') {
				var option = {eId : $(this).attr("id"),limit : $(this).attr("limit"),max : $(this).attr("max"),min : $(this).attr("min"),dataType : $(this).attr("dataType"),decimals : $(this).attr("decimals")};
				commonUtil.initDigit(option); 
			}
		});
		
		var lis=$(".PopupWindow").each(function(){
			if ((this.className.indexOf("PickList") >= 0 && this.tagName != 'SPAN') || 
				(this.className.indexOf("PopupWindow") >= 0 && this.tagName != 'TABLE')) {
				var evt=$(this).attr("onclick");//得开窗按钮点击事件
				var cleanEvt=$(this).attr("onclean");//清空事件
				if (!IsEmpty(cleanEvt)) {
					try{
						eval("cleanEvt = function(){ "+cleanEvt+"}");
					}catch(ee){
					}
				}
				var valIds=$(this).attr("valIds");
				commonUtil.initPopupWindow($(this).attr("id"), evt, valIds, cleanEvt);
			}
		});
		
		var lis=$(".fileUpload").each(function(){
			if ((this.className.indexOf("fileUpload") >= 0 && this.tagName != 'TABLE')) {
				var uploadEvt = $(this).attr("afterUpload");//上传回调
				var cleanEvt = $(this).attr("afterClean");//清空回调
				var afterUpload;
				if (!IsEmpty(uploadEvt)) {
					try{
						eval("afterUpload = "+uploadEvt);
					}catch(ee){
						alert(ee);
					}
				}
				var afterClean;
				if (!IsEmpty(cleanEvt)) {
					try{
						eval("afterClean = "+cleanEvt);
					}catch(ee){}
				}
				var iTableId = IsEmpty($(this).attr("iTableId"))?"":$(this).attr("iTableId");
				if(!IsEmpty(iTableId)){
					iTableId = decode(iTableId);
				}
				var sTableName = IsEmpty($(this).attr("sTableName"))?"":$(this).attr("sTableName");
				var isToLocal = IsEmpty($(this).attr("isToLocal"))?"":$(this).attr("isToLocal");
				var isSaveToDB = IsEmpty($(this).attr("isSaveToDB"))?"1":$(this).attr("isSaveToDB");
				var directory = IsEmpty($(this).attr("directory"))?"":$(this).attr("directory");
				var limitReg = IsEmpty($(this).attr("limitReg"))?"":$(this).attr("limitReg");
				var displayName = IsEmpty($(this).attr("displayName"))?"serverFileDir":$(this).attr("displayName");
				var iDeptId = IsEmpty($(this).attr("iDeptId"))?"":$(this).attr("iDeptId");
				var option = {eId : $(this).attr("id") , iTableId : iTableId, sTableName : sTableName,isToLocal : isToLocal,isSaveToDB : isSaveToDB,
										directory : directory,limitReg : limitReg,displayName : displayName,iDeptId : iDeptId,afterUpload : afterUpload,afterClean : afterClean};
										
				commonUtil.initFileUpload(option);
			}
		});
		
		var lis=$(".moreValue").each(function(){
			if ((this.className.indexOf("moreValue") >= 0 && this.tagName == 'TEXTAREA')) {
				var option  = {mId : this};
				commonUtil.changeMoreValue(option);
			}
		});
});

//tangyj 2013-04-27
//窗口调整大小时自动适应
$(window).bind("resize",function(){
	function changeObjWidth(obj,cssName,imgWidth){
		var $inputObj = $(obj);
		var reg = new RegExp("^\\s*(\\d+)(%)\\s*$");
		if(!$inputObj.attr("oldWidth")){
			return;
		}
		var r = $inputObj.attr("oldWidth").match(reg);
		if (r == null) {
			return;
		}
		//获取控件外部容器的长度
		var $outObj = $inputObj.parents("table."+cssName).parent().parent();
		while($outObj.length>0 
			//&& ($outObj.css("width") == "auto" 
			&& $outObj.attr("isBorderSpan") == "1"){//"isBorderSpan"用于判断是否为通用表单设计器部件边框span
			$outObj = $outObj.parent();
		}
		
		var outObj = $outObj.get(0);
		//获取边框的左右间距
		var paddingLeftWidth = 0 ;
		var paddingRightWidth = 0;
		var regPaddingWidth = new RegExp("^\\s*(\\d+)(px)?\\s*$");
		if($(outObj).css("padding-left")){
			var r_paddingLeft = $(outObj).css("padding-left").match(regPaddingWidth);
			if(r_paddingLeft != null){
				paddingLeftWidth = parseInt(r_paddingLeft[1]);
			}
		}
		if($(outObj).css("padding-right")){
			var r_paddingRight = $(outObj).css("padding-right").match(regPaddingWidth);
			if(r_paddingRight != null){
				paddingRightWidth = parseInt(r_paddingRight[1]);
			}
		}
		//取宽度前先设置为0
		$inputObj.css("width",0);
		
		var outObjWidth = outObj.offsetWidth;
		//根据外部容器的宽度和控件宽度（百分比）计算长度
		var inputOjbWidth =((outObjWidth ) * r[1] / 100.00) - imgWidth - (paddingLeftWidth + paddingRightWidth);
		$inputObj.css("width",inputOjbWidth);
	}
	
	function autoWidth(){
		$("input.JQSelect").each(function(){
			changeObjWidth(this,"JQSelect",18);
		});
	
		$("input.Digit").each(function(){
			changeObjWidth(this,"Digit",16);
		});
		
		$("input.PopupWindow").each(function(){
			changeObjWidth(this,"PopupWindow",16);
		});
		
		$("input.fileUpload").each(function(){
			changeObjWidth(this,"fileUpload",17);
		});
		
		$("textarea.moreVal").each(function(){
			changeObjWidth(this,"moreVal",15);
		});
	}
	window.setTimeout(autoWidth,500);
	
});


}

/**
	根据tab页权限显示tab页
	tabsArr:tab页对象数组
	tabs:tab容器div对象
	rightNo:当前tab页的rightNo
	tab:当前tab页对象
*/
function tabsRights(tabsArr,tabs,rightNo,tab){
	function rightByUrl(){
		var fullPath = getFullPath()+"/";
		var path = getPathName();
		var param = {
			sUrl:window.location.href.replace(fullPath,"")
		};
		AjaxRequest.doRequest(null,path + "/safeMgr/login!getLimitTabByUrl.action",param,function(backData){
			tabsRights.urlList = decode(backData);
			//rList对象为所有当前用户没有权限的tab页
		},false);
	}
	
	function rightByNo(){
		var fullPath = getFullPath()+"/";
		var path = getPathName();
		if(!IsEmpty(window.staffTabRightList)){
			tabsRights.rnList = decode(window.staffTabRightList);
		}else{
			AjaxRequest.doRequest(null,path + "/safeMgr/login!getTabRight.action",null,function(backData){
				window.staffTabRightList = backData;
				tabsRights.rnList = decode(backData);
			},false);
		}	
	}
	
	function checkUrl(tabsArr,tabs,tabTitle,tab){
		if(tabsRights.urlList[tabs[0].id+tabTitle] 
			||tabsRights.urlList[tabTitle]){
			closeTab(tabsArr,tab);
		}else if("undefined" == typeof tabsRights.firstPop){
			selTab(tabsArr);
		}
	}
	function checkNo(tabsArr,tabs,rightNo,tab){
		if(rightNo && !tabsRights.rnList[rightNo]){
			closeTab(tabsArr,tab);
		}else if("undefined" == typeof tabsRights.firstPop){
			selTab(tabsArr);
		}
	}
	function closeTab(tabsArr,tab){
		var wt = tabsArr[tabsArr.length-1].panel("options").tab;
		wt.hide();
		wt.show=function(){};
		wt.hide=function(){};
		$(tab).css("display","none");
		tabsArr[tabsArr.length-1].panel("options").closed = true;
	}
	function selTab(tabsArr){
		tabsArr[tabsArr.length-1].panel("options").closed = false;
		tabsRights.firstPop = tabsArr.length-1;
	}
	var tabTitle = tabsArr[tabsArr.length-1].panel("options").title;
	if("undefined" != typeof tabsRights.urlList){
		checkUrl(tabsArr,tabs,tabTitle,tab);
	}else if("undefined" != typeof tabsRights.rnList){
		checkNo(tabsArr,tabs,rightNo,tab);
	}else{
		var uURL;
		if("undefined" != typeof useURLRight){
			uURL = useURLRight;
		} 
		if(!uURL || uURL == 0){//权限读取方式1：根据rigthNo匹配
			rightByNo();
			checkNo(tabsArr,tabs,rightNo,tab);
		}else{//权限读取方式2：根据URL和tab标题、甚至tabs的id进行匹配
			rightByUrl();
			checkUrl(tabsArr,tabs,tabTitle,tab);
		}
	}
	
}

/** 覆写easyUI的tab页初始化切面方法为tabsRights*/
$.fn.extend({pushTabs:function(tabsArr,tabs,rightNo,tab){
		tabsRights(tabsArr,tabs,rightNo,tab);
}});
