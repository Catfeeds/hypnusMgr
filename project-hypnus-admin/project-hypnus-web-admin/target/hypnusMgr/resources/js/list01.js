// JavaScript Document


//微课管理列表
$(document).ready(function(e) {
$('#tree01').treegrid({
		url: 'js/treegrid_data1.json',
		method: 'get',
		rownumbers:false,
		idField: 'id',
		treeField: 'name',
		singleSelect:false,
		checkOnSelect:true,
		selectOnCheck:true,
		fit:true,
		columns:[[
			{
				field: 'op11', title: '<input id=\"detailcheckbox\" type=\"checkbox\"  >', width: 12,
				formatter: function (value, rec, rowIndex) {
					return "<input type=\"checkbox\"  name=\"PD\" value=\"" + rec.MAL_ID + "\" >";
				}
			},
			{title:'商品名称',field:'name'}
		]]
	});
	
	///*---数字加减事件---*/
//	$(".xw_jiahao").click(function(){
//		var nowNymber = parseInt($(this).siblings("span.xw_spanNum").text());
//		nowNymber = nowNymber + 1;
//		$(this).siblings("span.xw_spanNum").text(nowNymber);
//	});
	
	//$(".xw_jianhao").click(function(){
//		var nowNymber = parseInt($(this).siblings("span.xw_spanNum").text());		
//		if(nowNymber > 1){
//		nowNymber = nowNymber - 1;
//		$(this).siblings("span.xw_spanNum").text(nowNymber);}
//	});
	
	////显示隐藏切换
//	$(".xw_font").click(function(){
//		
//		var $this = $(this);
//		if($this.hasClass("font_blue")){
//			$this.html("隐藏");
//			$this.addClass("font_grey").removeClass("font_blue");
//		}else{
//			$this.html("显示");
//			$this.addClass("font_blue").removeClass("font_grey");
//		}
//		
//	});
	
	/*---数字加减---*/
	function formatRank (value) {
		var s = "";
		s += '<div class="shuliang xw_shuliang"><a class="jianhao xw_jianhao"></a>';
		s += '<span class="spanNum xw_spanNum">1</span><a class="jiahao xw_jiahao"></a></div>';
		return s;
	}
	
	/*---显示隐藏---*/
	function formatDisplay (value) {
		var a = "";
		a += '<font class="font_blue xw_font">显示</font>';
		return a;
	}
	
});