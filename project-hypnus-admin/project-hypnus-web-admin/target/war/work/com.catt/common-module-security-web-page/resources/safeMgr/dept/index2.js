/**
 * Created by haydn on 2015/7/6.
 */
/**
 * 页面入口
 */
var zTreeObj = null;
var _msgBox = {};
var _util = {};
seajs.use(['$', 'msgBox', 'easyuiDatagrid', 'easyuiPanel', 'select', 'util', 'jquery.json'], function($, msgBox, easyuiDatagrid, easyuiPanel ,select, util) {
	_msgBox = msgBox;
	_util = util;

	$(function(){
		InitHandler.init();
	})
});

/**
 * 初始化处理器
 */
var InitHandler = function() {
	return {
		init : function(){
			this.initEvent();
			this.initPage();
		},
		initPage : function(){
			EventHandler.getListData();

		},
		initEvent : function(){
			$("a[name='btnAdd']").click(EventHandler.addData);
			//删除列表数据
			$('#btnDelete').click(EventHandler.deleteData);
			$('#btnUpdate').click(EventHandler.editData);
		},
		initForm : function(){

		}
	}
}();

/**
 * 事件处理器
 */
var EventHandler = function(){
	return {
		getListData : function(){
			var param = {};
            param.staffId = staffId;
            param.level = level;
			DataHandler.getListData(param, function(backData){
				var	setting = {
						view: {
							selectedMulti: false //设置是否允许同时选中多个节点
						},
						data : {
							simpleData : {
								enable : true,
								idKey : "id",
								pIdKey : "pId",
								rootPId : "-1"
							}
						},
						callback : {

						},
						view : {

						}
					};
                if(check == "more") {
                    setting.check = {
                        enable: true,
                        chkStyle: "checkbox",
                        chkboxType: {"Y": "", "N": ""}
                    }
                }
				zTreeObj = $.fn.zTree.init($("#tree"), setting, backData.result.rows);
                $("#tree").css("height", $(window).height()-90);
				zTreeObj.expandAll(true);
                if(deptIds){
                    var ids = deptIds.split(",");
                    for(var i = 0; i < ids.length; i++){
                        var node = zTreeObj.getNodeByParam("id",ids[i]);
                        if(node){
                            node.checked = true;
                            zTreeObj.updateNode(node);
                        }
                    }

                }
			});
		},
		addData : function(){
			var nodes = zTreeObj.getSelectedNodes();
			var type = $(this).attr("type");
			if(nodes.length > 0){
				var item = nodes[0];
				if(type == "child"){
					pId = item.id;
				}else{
					pId = item.pId;
				}
				_msgBox.exWindow.open({
					title: '新增',
					width: "800px",
					height : "500px",
					url: path + "/safeMgr/deptMgr/addEdit?pId=" + pId,
					close: function (type) {
						if(type == "success"){
							//刷新列表
							EventHandler.getListData();
						}
					}
				});
			}else if(type == "child"){
				_msgBox.tips("请选中需要新增子节点的父节点");
			}
		},
		editData : function(){
			var nodes = zTreeObj.getSelectedNodes();
			var param = {};
			if(nodes.length == 1){
				var item = nodes[0];
				param.id = item.id;
				_msgBox.exWindow.open({
					title: '修改',
					width: "800px",
					height : "500px",
					url: path + "/safeMgr/deptMgr/addEdit?id=" + param.id,
					close: function (type) {
						if(type == "success"){
							//刷新列表
							EventHandler.getListData();
						}
					}
				});
			}else{
				_msgBox.tips("请选择一条需要修改的数据");
			}
		},
		deleteData : function(){
			var nodes = zTreeObj.getSelectedNodes();
			if(nodes.length == 1){
				var item = nodes[0];
				var ids = item.id;
				_msgBox.confirm({
					title : '提示',
					msg : '确认删除?',
					callback : function(btnType) {
						if (btnType == 'ok') {
							var param = {};
							param.ids = ids;
							DataHandler.deleteData(param, function(backData){
								_msgBox.tips(backData.content, 1, function () {
									var result = data.result;
	                            	if(result == 1){
	                            		_msgBox.tips(data.content);
	                            		EventHandler.getListData();
	                            	}else if(result == 0){
	                            		_msgBox.warn(data.content);
	                            	}
								});
							});
						}
					}
				})
			}else{
				_msgBox.tips("请选择一条需要删除的数据");
			}
		},
		//勾选返回
		checkBack : function(){
            var nodes = zTreeObj.getSelectedNodes();
            if(check == "more"){
                nodes = zTreeObj.getCheckedNodes();
            }
			if(nodes.length == 0){
				_msgBox.warn("请勾选要返回的数据");
				return;
			}
            if(check == "more") {
                var arr = [];
                var j = 0;
                for(var i = 0; i < nodes.length; i++){
                    var item = nodes[i];
                    if(item.id != -1){
                        arr[j] = {id : item.id, name : item.name};
                        j++;
                    }
                }
                _msgBox.exWindow.close($.toJSON(arr));
            }else{
                var item = nodes[0];
                if(item.id == -1){
                    _msgBox.warn("不能选择根节点，请重新勾选要返回的数据");
                    return;
                }
                _msgBox.exWindow.close($.toJSON({id : item.id, name : item.name}));
            }
		}
	}
}();

/**
 * 数据处理器
 */
var DataHandler = function(){
	return {
		getListData : function(param, callback){
            var url = '/safeMgr/deptMgr/list';
			$.post(path + url, param, function(backData) {
				callback(backData);
			});
		},
		deleteData : function(param, callback){
			$.post(path + "/safeMgr/deptMgr/delete", param, function(backData) {
				callback(backData);
			});
		}
	};
}();
