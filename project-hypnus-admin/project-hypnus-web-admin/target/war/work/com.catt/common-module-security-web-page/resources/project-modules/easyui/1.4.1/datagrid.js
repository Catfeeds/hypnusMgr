/**
 * <pre>
 * Description:easyui 的表格插件 jquery.datagrid.js
 * Author：Zhang zhongtao
 * Date：2014-11-05 11:51
 * </pre>
 */
define('{projectModuleBase}/easyui/1.4.1/datagrid', [ '$',
        'easyui/1.4.1/plugins/jquery.parser',
        'easyui/1.4.1/plugins/jquery.panel',
        'easyui/1.4.1/plugins/jquery.pagination',
		'easyui/1.4.1/plugins/jquery.resizable',
		'easyui/1.4.1/plugins/jquery.linkbutton',
		'easyui/1.4.1/plugins/jquery.datagrid',
		'easyui/1.4.1/locale/easyui-lang-zh_CN',
        'easyui/1.4.1/themes/{easyUItheme}/easyui.css',
        'easyui/1.4.1/themes/icon.css',
        'easyui/1.4.1/themes/{easyUItheme}/datagrid.css',
        'easyui/1.4.1/themes/{easyUItheme}/linkbutton.css',
        'easyui/1.4.1/themes/{easyUItheme}/pagination.css'
        ], function(require,
		exports, module) {

        var defalutSettings = {
                defaultLayout : [ 'first', 'prev', 'links', 'next', 'last', 'sep' ]
        };

        /**
         * datagrid常用方法
         * getSelected 常用,返回当前选中的行或如果没有选中的行则返回null $("#tableModule").datagrid("getSelected")
         * getSelections 不常用, 用法：$("#tableModule").datagrid("getSelections")
         * getChecked 常用,在复选框呗选中的时候返回所有行 $("#tableModule").datagrid("getChecked")
         * 标题
         * */
        //重写datagrid默认值对象
        $.extend($.fn.datagrid.defaults, {
                //idField : '', //必须要有此属性以及对应的字段，对应字段的值必须保证唯一
                //treeField : '',
                checkbox: true,
                singleSelect: true, //如果为true，则只允许选择一行
                height: 500,
                nowrap: true,
                checkOnSelect: false, //当用户仅在点击该复选框的时候才会呗选中或取消
                selectOnCheck: false, //选择行将不选中复选框
                fitColumns: true, //真正的自动展开/收缩列的大小，以适应网格的宽度，防止水平滚动 如果为true,列表属性采用百分比
                loadMsg: "数据加载中...",
                frozenColumns: [[
                        {field: 'ck', checkbox: true}   //冻结改列
                ]],
                //rowStyler:function(index,row){
                //        return 'background-color:none';
                //},
                onLoadSuccess: function () {
                        //默认选中第一行记录
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