/**
 * Created by haydn on 2015/7/30.
 */
define('{projectModuleBase}/easyui/config/1.0/config', ['$', 'util', 'msgBox'], function(require, exports, module) {
//重写datagrid默认值对象
	$.extend($.fn.datagrid.defaults, {
		//idField : '', //必须要有此属性以及对应的字段，对应字段的值必须保证唯一
		//treeField : '',
		checkbox: true,
		singleSelect: true,
		height: 800,
		nowrap: true,
		checkOnSelect: false,
		selectOnCheck: false,
		fitColumns: true, //真正的自动展开/收缩列的大小，以适应网格的宽度，防止水平滚动 如果为true,列表属性采用百分比
		loadMsg: "数据加载中...",
		frozenColumns: [[
			{field: 'ck', checkbox: true}   //冻结改列
		]],
		onLoadSuccess: function () {
			if ($(this).datagrid('getRows').length > 0) {
				$(this).datagrid('unselectAll');
				$(this).datagrid('clearSelections');
				$(this).datagrid('selectRow', 0);
			}
		}
	});

	$.extend($.fn.datagrid.methods, {
		editCell: function (jq, param) {
			return jq.each(function () {
				var opts = $(this).datagrid('options');
				var fields = $(this).datagrid('getColumnFields', true).concat($(this).datagrid('getColumnFields'));
				for (var i = 0; i < fields.length; i++) {
					var col = $(this).datagrid('getColumnOption', fields[i]);
					col.editor1 = col.editor;
					if (fields[i] != param.field) {
						col.editor = null;
					}
				}
				$(this).datagrid('beginEdit', param.index);
				for (var i = 0; i < fields.length; i++) {
					var col = $(this).datagrid('getColumnOption', fields[i]);
					col.editor = col.editor1;
				}
			});
		}
	});


//重写pagination默认值对象
	$.extend($.fn.pagination.defaults, {
		pageSize: 30,	//每页显示的记录条数，不设置默认为10
		pageNumber: 1,	//当前页，默认1
		showPageList: false,//是否显示选择记录数下拉框 ,默认true
		onChangePageSize: function (limit) {
		},
		beforePageText: '第',//页数文本框前显示的汉字
		afterPageText: '页    共 {pages} 页',
		displayMsg: '当前显示第 {from} - {to} 条记录   共 {total} 条记录',
		onSelectPage: function (pageNo, limit) {//点击上、下一页时，触发事件

		},
		showRefresh: false//不显示刷新按钮，默认true
	});

});