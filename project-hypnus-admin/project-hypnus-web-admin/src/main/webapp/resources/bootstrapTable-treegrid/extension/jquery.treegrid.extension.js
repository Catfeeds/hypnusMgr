(function ($) {
	"use strict";
	var _options = {};

	//单独调用配置基础参数
	$.fn.treegridOption = function(options){
		_options = $.extend({}, _options, options);
	};
	//初始化树表格（加载参数、加载表头）, 或者 调用内部方法
	$.fn.treegridData = function (options, param) {
		//如果是调用方法
		if (typeof options == 'string') {
			return $.fn.treegridData.methods[options](this, param);
		}

		options = $.extend(_options, options);
		//如果是初始化组件
		options = $.extend({}, $.fn.treegridData.defaults, options || {});
		var target = $(this);
		target.addClass('table');
		if (options.striped) {
			target.addClass('table-striped');
		}
		if (options.bordered) {
			target.addClass('table-bordered');
		}
		if(options.columns){
			//构造表头
			var thr = $('<tr></tr>');
			$.each(options.columns, function (i, item) {
				if(!item.hidden){
					var th = $('<th style="padding:10px;"></th>');
					th.text(item.title);
					thr.append(th);
				}
			});
			var thead = $('<thead></thead>');
			thead.append(thr);
			target.append(thead);
		}
		return target;
	};

	$.fn.treegridData.methods = {
		getAllNodes: function (target, data) {
			return target.treegrid('getAllNodes');
		},
		//获取勾选上的数据
		getChecked: function(target){
			var checkeds = new Array;
			var trs = target.find("tr");
			for(var i = 1, size = trs.length; i < size; i++){
				if($(trs[i]).find("[name='checkBox']")[0].checked){
					checkeds.push(trs[i]);
				}
			}
			return checkeds;
		},
		//数据加载
		reloadTree: function(target){
			if(_options.url){
				$.ajax({
					type: _options.type,
					url: _options.url,
					data: _options.ajaxParams,
					dataType: "JSON",
					success: function (dataMap, textStatus, jqXHR) {
						_options = $.extend({}, $.fn.treegridData.defaults, _options || {});
						LoadDataFunction.cleanTreeData(target);
						var data = dataMap.dataList;
						var tbody = $('<tbody></tbody>');
						var rootNode = LoadDataFunction.getRootNodes(data);
						var level = 1;//层级
						$.each(rootNode, function (i, item) {
							var tr = $('<tr data-id="'+item.id+'" onmouseover="changeColor_TreeGrid(this)" onmouseout="changeColor_TreeGrid(this)" onclick="setColor_TreeGrid(this)" ' +
									'title="'+_options.setTrTitle+'" style="cursor:pointer" class="dataTr" data-level="'+level+'"></tr>');
							var nodeId = item.id;
							tr.addClass('treegrid-' + nodeId);
							$.each(_options.columns, function (index, column) {
								var td = $('<td></td>');
								if(!column.hidden){
									if(column.format){//检查是否有自定义列方法
										td.html(column.format(item[column.field], i, level, item));
									}else{
										td.html("<span name='"+column.field+"'>"+item[column.field]+"</span>");
									}
									if(column.cellDblClick) {//检查是否有单元格双击事件
										if(_options.parentCanCell){
											td.append(column.cellDblClick(item[column.field], i));
											LoadDataFunction.setEventForCellDblClick(item[column.field], i, level, td, column.format, item);
										}else{
											if(!LoadDataFunction.hasChildren(data, nodeId)){
												td.append(column.cellDblClick(item[column.field], i));
												LoadDataFunction.setEventForCellDblClick(item[column.field], i, level, td, column.format, item);
											}
										}
									}
								}else{
									//隐藏域
									td.html("<span name='"+column.field+"'>"+item[column.field]+"</span>");
									td.hide();
								}
								tr.append(td);
							});
							tr.attr("data-value", $.toJSON(item));
							tbody.append(tr);
							LoadDataFunction.getChildNodes(data, item, nodeId, tbody, level, target);
						});
						target.append(tbody);
						target.treegrid({
							expanderExpandedClass: _options.expanderExpandedClass,
							expanderCollapsedClass: _options.expanderCollapsedClass
						});

						//复选框选中
						LoadDataFunction.checkAlls(target);
						//是否全部展开
						if (!_options.expandAll) {
							target.treegrid('collapseAll');
						}
						//行双击事件
						if(_options.rowDblClick){
							if(_options.onDblClick){
								$(".dataTr").on("dblclick", function(){
									var level = $(this).attr('data-level');
									var id = $(this).attr("data-id");
									_options.onDblClick(this, level, id);//返回当前行句柄，层级，数据id
								});
							}
						}
						//单元格双击事件
						if(_options.cellDblClick){

						}
						//加载完成后触发事件
						_options.afterLoad(dataMap);
					}
				});
			}
		}
	};

	//加载树的内部方法
	var LoadDataFunction = (function(){
		var options = _options;
		var INPUT_TYPE = 1;
		var SELECT_TYPE = 2;
		return{
			/**
			 * 单元格双击事件
			 * cellDblClick: true
			 * parentCanCell: false,//父节点是否单元格双击
			 * 有单元格双击事件的，如果有format，需要加上标签将输出内容括起来，如<span>等
			 * data-type: 1-input 2-select
			 */
			//设置单元格双击事件
			setEventForCellDblClick: function(value, i, level, td, format, item){
				var dbl = td[0].childNodes[1];
				$(dbl).hide();
				td.on("dblclick", function(){
					LoadDataFunction.cellDblClick(value, td[0], dbl);
				});
				$(dbl).on("blur", function(){
					LoadDataFunction.blurDbl(value, i, level, td, dbl, format, item);
				});
			},
			//单元格双击
			cellDblClick: function(value, td, current){
				$(current).show();
				$(current).focus();
				var child = td.childNodes[0];
				$(child).hide();
			},
			//单元格失去焦点
			blurDbl: function(value, i, level, td, current, format, item){
				//data-type : 1-input 2-select
				var data_type = $(current).attr("data-type");
				var value = "";
				if(data_type == INPUT_TYPE){
					value = $(current).val();
				}else if(data_type == SELECT_TYPE){
					value = $(current).find("option:selected").val();
					value = $(current).find("option:selected").text();
				}
				$(current).hide();
				//先删除原来的标签，再在当前输入控件前重新生成显示标签
				var child = td[0].childNodes[0];
				$(child).remove();
				if(format){
					$(current).before(format(value, i, level, item));
				}else{
					$(current).before("<span>"+value+"</span>");
				}
			},
			//复选框选中,1：全选； 2：父节点选中，子节点选中
			checkAlls: function(target){
				//全选
				$(".checkAll").on("click", function(){
					var checkStates = this.checked;
					var trs = target.find("tr");
					for(var i = 1, size = trs.length; i < size; i++){
						$($(trs[i]).find("[name='checkBox']")[0]).prop("checked", checkStates);
					}
				});
				//父节点选中，子节点选中
				$(".check").on("click", function(){
					LoadDataFunction.checkChildren(target, this);
				});
			},
			//父节点选中，子节点选中
			checkChildren: function(target, current){
				var currentId = $($($(current).parent()).parent()).parent().attr("data-id");
				if(LoadDataFunction.hasChildrenNode(target, currentId)){
					//是父节点
					var checkStates = current.checked;
					var trs = target.find("tr");
					for(var i = 1, size = trs.length; i < size; i++){
						var currentParent = $(trs[i]).attr("data-parentId");
						if(currentParent == currentId){
							var childCheckBox = $(trs[i]).find("[name='checkBox']")[0]
							$(childCheckBox).prop("checked", checkStates);
							LoadDataFunction.checkChildren(target, childCheckBox);
						}
					}
				}
			},
			//是否有子节点
			hasChildrenNode: function(target, currentId){
				var trs = target.find("tr");
				//循环查询节点的父节点，如果与当前节点id一样，则当前节点有子节点
				for(var i = 0, size = trs.length; i < size; i++){
					var currentParent = $(trs[i]).attr("data-parentId");
					if(currentParent && currentParent == currentId){
						return true;
					}
				}
				return false;
			},
			//数据是否有子节点(加载完成前查询)
			hasChildren: function(data, currentId){
				//循环查询节点的父节点，如果与当前节点id一样，则当前节点有子节点
				for(var i = 0, size = data.length; i < size; i++){
					var currentParent = data[i].parentId;
					if(currentParent && currentParent == currentId){
						return true;
					}
				}
				return false;
			},
			//清空树数据
			cleanTreeData: function(target){
				var trs = target.find("tr");
				for(var i = 1, size = trs.length; i < size; i++){
					$(trs[i]).remove();
				}
			},
			//得到根节点
			getRootNodes: function (data) {
				var result = [];
				$.each(data, function (index, item) {
					if (!item[options.parentColumn]) {
						result.push(item);
					}
				});
				return result;
			},
			//递归获取子节点并且设置子节点
			getChildNodes: function (data, parentNode, parentIndex, tbody, level, target) {
				options = $.extend({}, $.fn.treegridData.defaults, options || {});
				level++;
				$.each(data, function (i, item) {
					if (item[options.parentColumn] == parentNode[options.id]) {
						var tr = $('<tr data-id="'+item.id+'" data-parentId="'+parentIndex+'" onmouseover="changeColor_TreeGrid(this)" onmouseout="changeColor_TreeGrid(this)" onclick="setColor_TreeGrid(this)" ' +
								'title="'+options.setTrTitle+'" style="cursor:pointer" class="dataTr" data-level="'+level+'"></tr>');
						var nowParentIndex = item.id;
						tr.addClass('treegrid-' + nowParentIndex);
						tr.addClass('treegrid-parent-' + parentIndex);
						$.each(options.columns, function (index, column) {
							var td = $('<td></td>');
							if(!column.hidden){
								if(column.format){//检查是否有自定义列方法
									td.html(column.format(item[column.field], i, level, item));
								}else {
									td.html("<span name='"+column.field+"'>"+item[column.field]+"</span>");
								}
								if(column.cellDblClick) {//检查是否有单元格双击事件
									if(options.parentCanCell){
										td.append(column.cellDblClick(item[column.field], i));
										LoadDataFunction.setEventForCellDblClick(item[column.field], i, level, td, column.format, item);
									}else{
										if(!LoadDataFunction.hasChildren(data, nowParentIndex)){
											td.append(column.cellDblClick(item[column.field], i));
											LoadDataFunction.setEventForCellDblClick(item[column.field], i, level, td, column.format, item);
										}
									}
								}
							}else{
								//隐藏域
								td.html("<span name='"+column.field+"'>"+item[column.field]+"</span>");
								td.hide();
							}
							tr.append(td);
						});
						tr.attr("data-value", $.toJSON(item));
						tbody.append(tr);
						LoadDataFunction.getChildNodes(data, item, nowParentIndex, tbody, level, target)
					}
				});
			}
		}
	})();

	$.fn.treegridData.defaults = {
		id: 'Id',
		parentColumn: 'ParentId',
		data: [],    //构造table的数据集合
		type: "GET", //请求数据的ajax类型
		url: null,   //请求数据的ajax的url
		ajaxParams: {}, //请求数据的ajax的data属性
		expandColumn: null,//在哪一列上面显示展开按钮
		expandAll: true,  //是否全部展开
		striped: false,   //是否各行渐变色
		bordered: false,  //是否显示边框
		columns: [],
		setTrTitle: "",
		expanderExpandedClass: 'glyphicon glyphicon-chevron-down',//展开的按钮的图标
		expanderCollapsedClass: 'glyphicon glyphicon-chevron-right'//缩起的按钮的图标

	};
})(jQuery);

//列表 鼠标经过 行 时的颜色变化
function changeColor_TreeGrid(tag){
	var $tr = $(tag);
	$tr.toggleClass("moveOver");
}
//列表 选中 行 时的颜色变化
function setColor_TreeGrid(tag){
	var $tr = $(tag);
	$("#tableModule").find("tr").removeClass("clickOn");
	$tr.toggleClass("clickOn");
}