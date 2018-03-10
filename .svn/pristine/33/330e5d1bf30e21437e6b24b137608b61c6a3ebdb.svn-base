/**
 * <pre>
 * Description:easyui 的分页插件 jquery.pagination.js
 * Author：Zhang zhongtao
 * Date：2014-11-05 11:51
 * </pre>
 */
define('{projectModuleBase}/easyui/1.4.1/pagination', [ '$', 'easyui/1.4.1/plugins/jquery.parser',
		'easyui/1.4.1/linkbutton',
		'easyui/1.4.1/plugins/jquery.pagination',
		'easyui/1.4.1/locale/easyui-lang-zh_CN',
		'easyui/1.4.1/themes/{easyUItheme}/pagination.css' ], function(require,
		exports, module) {

	var defalutSettings = {
		defaultLayout : [ 'first', 'prev', 'links', 'next', 'last', 'sep' ]
	};



	//重写pagination默认值对象
	$.extend($.fn.pagination.defaults, {
		pageSize: 50,	//每页显示的记录条数，不设置默认为10
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

	module.exports = defalutSettings;
});