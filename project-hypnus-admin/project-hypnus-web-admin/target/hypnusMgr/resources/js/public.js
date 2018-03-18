// JavaScript Document
$(document).ready(function(e) {
    
	
	//切换tabs
	$(".xw_tab").click(function(){
		$(".xw_tab").removeClass("thon");
		$(this).addClass("thon");
		
		var index = $(".usertabs").find(".xw_tab").index(this);
		
		$(".xw_tijiao").parents(".addnewbox_edit").hide();
		$("div.addnewtabs").find("div.tab01").hide();
		$("div.addnewtabs").find("div.tab01").eq(index).show();
		
		if(index==4){
			InitTreeFun();
			
		}
	});
		
	//点击tabs
	$(".xw_edit").click(function(){
		$(".xw_edit").parents(".addnewbox").hide();
		$(this).parents(".addnewbox").siblings(".addnewbox_edit").show();
	});
	
	$(".xw_tijiao").click(function(){
		$(".xw_tijiao").parents(".addnewbox_edit").hide();
		$(this).parents(".addnewbox_edit").siblings(".addnewbox").show();
	});
		
	//展开收起更多查询条件
	$(".xw_moresearch_down").click(function(){
		$(".moresearch").slideDown();
		$(this).hide();
		$(".xw_moresearch_up").show();
	});
	
	$(".xw_moresearch_up").click(function(){
		$(".moresearch").slideUp();
		$(".xw_moresearch_down").show();
		$(this).hide();
	});
	
	//列表选中
	$(".xw_sel").click(function(){
		$(this).toggleClass("selBox_on");
	});	
		
	$(".xw_sel_all").click(function(){
		if($(".xw_sel").hasClass("selBox_on")){
			$(".xw_sel").removeClass("selBox_on");
		}else{
			$(".xw_sel").addClass("selBox_on");
		}
	});	
//	



	//添加和收起下拉搜索的列表
	$(".xw_down").click(function(){
		$(this).parents(".searchitem").find(".searchxiala").slideDown();
		});
		
	$(".searchitem").mouseleave(function(){
		$(".searchxiala").slideUp();
		});
		
	$(".searchxiala li").click(function(){
		$(this).parents(".searchitem").find(".searchxiala").slideUp();
		});
		

	//显示隐藏切换
	$(".xw_font").click(function(){
		
		var $this = $(this);
		if($this.hasClass("font_blue")){
			$this.html("隐藏");
			$this.addClass("font_grey").removeClass("font_blue");
		}else{
			$this.html("显示");
			$this.addClass("font_blue").removeClass("font_grey");
		}
		
	});
	
	//内页选中当前选项
	$(".xw_detail_sel").click(function(){
		$(this).toggleClass("textsel_on");
	});	
	
	//遮罩弹窗
	$(".wx_popwin").click(function(){
		$(".zhezhao").show();
		$(".popWin").slideDown();
	});
	
	//微问答显示隐藏
	$(".xw_wendaAdd").click(function(){
		$(".xw_wendaColumn01").hide();
		$(".xw_wendaColumn02").show();
	});	
	$(".xw_wendaAdd02").click(function(){
		$(".xw_wendaColumn02").hide();
		$(".xw_wendaColumn01").show();
	});	
	
		
});