$(document).ready(function(){
	apepndListYing(listjsonYing);
	
	$(window).bind("resize",pageSize);
});	

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

function pageSize(){
	apepndListYing(listjsonYing);
}
var listjsonYing = [
    {text1:"图片1",url1:"images/072334sD5.jpg",class1:"cover"},
	{text1:"图片2",url1:"images/072334sD5.jpg"},
	{text1:"图片3",url1:"images/072334sD5.jpg"},
	{text1:"图片4",url1:"images/072334sD5.jpg"},
	{text1:"图片5",url1:"images/072334sD5.jpg"},
	{text1:"图片6",url1:"images/072334sD5.jpg"}
]



var panel = null;
function apepndListYing(ListtjsonYing) {
	//总图片数量
	//var count = Listtjson.length;

	//初始化所有图片
	var itemContent = [];

	for (var i = 0; i < ListtjsonYing.length; i++) {
		itemContent.push(
				'<div class="jd_box"><img class="pic1" src="'+listjsonYing[i].url1+'" /><div class="'+ListtjsonYing[i].class1+'" /><div class="imgtick xw_tickpic"></div><div class="eachtit">'+ ListtjsonYing[i].text1 +'</div></div>'
		);
		
	}
	
	var canshowNum = ($("div.imgDiv").outerWidth() - 86)/230;
	canshowNum = Math.floor(canshowNum);
	//初始化面板对象
	panel = new BasePanel('#panea', {
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
