$(document).ready(function(){
	apepndListYing02(listjsonYing02);
	
	$(window).bind("resize",pageSize02);
});	
function pageSize02(){
	apepndListYing02(listjsonYing02);
}


var listjsonYing02 = [
    {text1:"视频1",url1:"images/videosample.jpg"},
	{text1:"视频2",url1:"images/videosample.jpg"}
]



var panel02 = null;
function apepndListYing02(ListtjsonYing02) {
	//总图片数量
	//var count = Listtjson.length;

	//初始化所有图片
	var itemContent = [];

	for (var i = 0; i < ListtjsonYing02.length; i++) {
		itemContent.push(
				'<div class="jd_box"><img class="pic1"  src="'+listjsonYing02[i].url1+'" /><div class="'+ListtjsonYing02[i].class1+'" /><div class="imgtick xw_tickpic"></div><div class="eachtit">'+ ListtjsonYing02[i].text1 +'</div></div>'
		);
		
	}
	
	var canshowNum = ($("div.imgDiv").outerWidth() - 86)/230;
	canshowNum = Math.floor(canshowNum);
	//初始化面板对象
	panel02 = new BasePanel('#panea02', {
		/**面板可视范围内显示的元素个数，如果展开后，
		 * 则是disItem = disItem * expanRow*/
		disItem:canshowNum,
		/**显示面板宽度*/
		/**面板里需要承载的html内容*/
		contentHtml: itemContent,
		/**是否显示展开按钮*/
		isExpan: false,
		/**是否自动展开*/
		isAutoExpan: false,
		/**展开后显示的行数*/
		expanRows: 1,
		/**箭头位置：top：顶部；middle：中间*/
		arrowAlign: 'middle',
		/**面板移动完成后事件*/
		onmoveend: function (pageNo) {

		}
	});
	
	picFun();
}
