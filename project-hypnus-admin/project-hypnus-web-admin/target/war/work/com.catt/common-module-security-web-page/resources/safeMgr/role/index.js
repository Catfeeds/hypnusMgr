var _msgBox = {};
var _util = {};
var onCheckState = true;
var onUncheckState = true;
/**
 * 页面入口
 */
seajs.use(['$', 'msgBox', 'template', 'easyuiDatagrid', 'select', 'util', 'jquery.json'],
	function($, msgBox, template, easyuiDatagrid, select, util) {
	  _msgBox = msgBox;
      _util = util;
	  $(function(){
	    InitHandler.init();
	  });
	});

/**
 * 初始化处理器
 */
var InitHandler = function() {
    return {
      init : function(){
          EventHandler.init();
      }
    };
  }();
/**
 * 事件处理器
 */
var EventHandler = function(){
	return {
		//绑定按钮事件
		init : function(){
			 EventHandler.initDatagrid();
			 $("#reload").bind("click",EventHandler.reload);
	         $("#search").bind("click",EventHandler.loadList);
	         $("#addStaff").bind("click",EventHandler.addStaff);
	         $("#modify").bind("click",EventHandler.modify);
	         $("#delRole").bind("click",EventHandler.delRole);
	         $("#addRight").bind("click",EventHandler.addRight);
	         $("#delRight").bind("click",EventHandler.delRight);
	         EventHandler.getListData();
             $('#tableModule').datagrid('loadData',{"total" : 0, "rows" : []});
		},
		//初始化表格
		initDatagrid : function(){
			$('#tableRight').treegrid({
			    url : path + "/safeMgr/rightMgr/treeList/-1" + "?roleId=" + $("#roleId").val(),
			    height : "300", // 1：弹窗 2：管理列表自适应
			    idField:'id',//必须要有此属性以及对应的字段，对应字段的值必须保证唯一
	    	    treeField:'name',
	    	    method: 'post',
				selectOnCheck: false,
				checkOnSelect: false,
	    	    pageSize : 50,
	    	    loadFilter: function(data){
	    	    	if(data.result.total){
	    	    		var param = {};
	    	    		param.total = data.result.total;
	    	    		param.rows = data.result.content;

	    	    		return param;
	    	    	}else{
	    	    		return data.result.content;
	    	    	}
	    		},
	    		onBeforeLoad : function(row){
					if(row){
						$(this).treegrid('options').url = path + "/safeMgr/rightMgr/treeList/" + row.id + "?roleId=" + $("#roleId").val();
					}else{
						$(this).treegrid('options').url = path + "/safeMgr/rightMgr/treeList/-1" + "?roleId=" + $("#roleId").val();
                 }
				},
				//onCheck : function(note, checked){
				//	if(onCheckState){
				//		while(note != null){
				//			  note = $('#tableRight').treegrid('getParent', note.id);
				//			  if(note != null)
				//				  $('#tableRight').treegrid('select', note.id);
				//		  }
				//		onCheckState = true;
				//	}
				//},
				onUncheck : function(note, checked){
					if(onUncheckState){
						onUncheckState = false;
						var notes = $('#tableRight').treegrid('getChildren', note.id);
						  if(notes != null){
							  var selNotes = $('#tableRight').treegrid('getChecked');
							  for(var i = 0; i < notes.length; i++){
								  if(containNote(selNotes, notes[i])){
									  $('#tableRight').treegrid('unselect', notes[i].id);
									  var notes2 = $('#tableRight').treegrid('getChildren', notes[i].id);
									  if(notes2 != null){
										  for(var j = 0; j < notes2.length; j++){
											  if(containNote(selNotes, notes2[j])){
												$('#tableRight').treegrid('unselect', notes2[j].id);
											  }
										  }
									  }
								  }

							  }
						  }
						  onUncheckState = true;
					}
				},
				singleSelect : false,
				pageable : true,
                loadMsg:false,
				columns:[[
                    //{field:'ck',checkbox:true},
                    {field:'name',title:'权限名称',align:'left',halign:'center',width:"15%"},
                    {field:'permission',title:'授权标识',align:'left',halign:'center',width:"15%"},
                    {field:'url',title:'权限地址',align:'left',halign:'center',width:"25%"},
                    {field:'seq',title:'同级序号',align:'center',width:"10%"},
                    {field:'typeName',title:'权限类型',align:'center',width:"10%",
                        formatter: function(value,row,index){
                            if (row.type == 1){
                                return "菜单";
                            } else if(row.type == 2){
                                return "按钮";
                            }
                        }
                    },
                    //{field:'typeName',title:'权限类型',align:'center',width:100,
                    {field:'enabled',title:'是否激活',align:'center',width:70,hidden:true},
                    {field:'remark',title:'权限描述',align:'left',halign:'center',width:"20%"},
                    {field:'parent',title:'父权限标识',hidden:true},
                    {field:'path',title:'权限路径',hidden:true},
                    {field:'id',title:'id',hidden:true}
				  ]]
			});

	        var $dg = $('#tableModule');
	        var options = {
	          pageSize : 10, //只能是10的倍数
	          //singleSelect: true,
//	          onDblClickRow : action == "check" ? false : function(){
//	            var item = $dg.datagrid('getSelected');
//	            //打开详情页面
//	            location.href = path+"/admin/staff/view/"+item.id;
//	          },
              loadMsg:false,
	          columns : [[
                  //{field: 'ck', checkbox: true},
                  {field: 'account', title: '账号', width: "10%", align: 'center'},
                  {field: 'name', title: '姓名', width: "10%", align: 'center'},
                  {
                      field: 'sex', title: '性别', width: "10%", align: 'center',
                      formatter: function (value) {
                          if (0 == value) {
                              return '未知的性别';
                          } else if (1 == value) {
                              return '女性';
                          } else if (2 == value) {
                              return '男性';
                          } else if (3 == value) {
                              return '未说明的性别';
                          }
                      }
                  },
                  {field: 'deptName', title: '所属部门', width: "25%", align: 'center'},
                  {field: 'mobile', title: '手机号码', width: 100, align: 'center'},
                  {field: 'isLocked', title: '账号状态', width: "10%", align: 'center',
                      formatter: function (value) {
                          if (value) {
                              return '锁定';
                          } else {
                              return '可用';
                          }
                      }},
                  //{field: 'inEmail', title: '内部邮箱', width: 250, align: 'left', halign: 'center'},
                  //{field: 'outEmail', title: '外部邮箱', width: 250, align: 'left', halign: 'center'},
                  {field: 'id', title: 'id', hidden: true}
              ]]
	        };
	        $dg.datagrid(options);
	        $dg.datagrid('getPager').pagination({
                beforePageText: '第',//页数文本框前显示的汉字
                afterPageText: '页    共 {pages} 页',
                displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',
	          onSelectPage : function(pPageIndex, pPageSize) {
	            var gridOpts = $('#tableModule').datagrid('options');
	            gridOpts.pageNumber = pPageIndex;
	            gridOpts.pageSize = pPageSize;
	            EventHandler.loadListStaff();
	          }
	        });
		},
		//重载
		reload : function(){
		},
		//新增用户角色
		addStaff : function(){
			_msgBox.exWindow.open({
                title: '选择用户',
                width: '90%',
                height : '80%',
                url: path + "/safeMgr/staffMgr/index?action=check",
                close: function (data) {
                    if (data) {
                        var param = $.parseJSON(data);
                        var nodes = zTreeObj.getSelectedNodes();
                        var selItem = nodes[0];
                        param.roleId = selItem.id;
                        $.post(path + "/safeMgr/staffMgr/addRoleStaff", param, function (data) {
                            _msgBox.tips("操作成功");
                            EventHandler.loadListStaff(selItem.id);
                        });
                    }
                }
            });
		},
		//删除用户角色
		delStaff : function(){
			var selectRows =$("#tableModule").datagrid("getChecked");
			if(selectRows.length == 0){
				_msgBox.tips('请选择需要删除的数据!');
			}else{
				_msgBox.confirm({
					title : '提示',
					msg : '确认删除?',
					callback : function(btnType) {
						if (btnType == 'ok') {
							var param = {};
				        	var nodes = zTreeObj.getSelectedNodes();
                            var ids ="";
                            for (var i = 0, l = selectRows.length; i < l; i++) {
                                ids += selectRows[i].id ;
                                if(i<l-1){
                                    ids += ",";
                                }
                            }
                            param.staffIds = ids;
							var selItem = nodes[0];
				        	param.roleId = selItem.id;
				        	$.post(path+"/safeMgr/staffMgr/delRoleStaff", param, function(data){
				        		_msgBox.tips("操作成功");
				        		EventHandler.loadListStaff(selItem.id);
							});
						}
					}
				})

			}
		},
		//修改
	    modify : function(){
			var selectRows =$("#tableModule").datagrid("getChecked");
			if(selectRows.length != 1){
				_msgBox.tips('请选择需要修改的数据!');
			}else{
				var url = path+"/safeMgr/staffMgr/addEdit?id="+selectRows[0].id;
				if(action == ""){
					location.href = url;
				}else{
					window.open(url);
				}
			}
	    },
	    //删除
	    del : function(){
	    	var selectRows =$("#tableModule").datagrid("getChecked");
			if(selectRows.length == 0){
				_msgBox.tips('请选择需要删除的数据!');
			}else{
				_msgBox.confirm({
					title : '提示',
					msg : '确认删除?',
					callback : function(btnType) {
						if (btnType == 'ok') {
							var ids ="";
							for (var i = 0, l = selectRows.length; i < l; i++) {
								ids += selectRows[i].id ;
								if(i<l-1){
									ids += ",";
								}
					        }
							var param = {ids : ids};
							$.post(path+"/safeMgr/staffMgr/delete", param, function(data){
								var result = data.result;
                            	if(result == 1){
                            		_msgBox.tips(data.content);
                            		EventHandler.loadList();
                            	}else if(result == 0){
                            		_msgBox.warn(data.content);
                            	}
							});
						}
					}
				})
			}
	    },
		//加载表格数据
	    loadListRight : function(roleId){
			$('#tableRight').treegrid('reload');
		},
		//加载表格数据
		loadListStaff : function(roleId){
			var param = {};
			var $dg = $('#tableModule');
			var opts = $dg.datagrid('options');
            if(!roleId){
                param.roleId = $("#roleId").val();
            }else{
                param.roleId = roleId;
            }
            param.name = $('#staffName').val();
            param.account = $('#account').val();
			param.pageSize = opts.pageSize;
			param.pageNo = opts.pageNumber;
			DataHandler.loadListStaff(param, function(backData){
				var result = backData.result;
				var total = result.total;
				$dg.datagrid('loadData',{"total" : total, "rows" : result.content});
			});
		},
        getListData: function () {
            var param = {};
            var roleUrl = path + "/safeMgr/roleMgr/asyncTreeList";
            var setting = {
                async: {
                    autoParam: ["id"],
                    //contentType: "application/json",
                    enable: true,
                    type: "get",
                    otherParam: param,
                    url: roleUrl,
                    dataFilter: function(treeId, parentNode, responseData) {
                            return responseData.result;
                        }
                },
                data: {
                    keep: {
                        parent: true,
                        leaf: true
                    },
                    simpleData: {
                        enable: true,
                        idKey: "id",
                        pIdKey: "pId",
                        rootPId: "-1"
                    }
                },
                callback: {
                    onClick: function (event, treeId, treeNode) {
                        $("#name").html(treeNode.name);
                        $("#remark").html(treeNode.remark);
                        $("#roleId").val(treeNode.id);
                        EventHandler.loadListStaff(treeNode.id);
                        EventHandler.loadListRight(treeNode.id);
                    },
                    onAsyncSuccess:function (){
                        var firstAsyncSuccessFlag = 0;
                        if (firstAsyncSuccessFlag == 0) {
                            var zTree = $.fn.zTree.getZTreeObj("tree");
                            //调用默认展开第一个结点
                            var selectedNode = zTree.getSelectedNodes();
                            var nodes = zTree.getNodes();
                            zTree.expandNode(nodes[0], true);

                            var childNodes = zTree.transformToArray(nodes[0]);
                            zTree.expandNode(childNodes[1], true);
                            var childNodes1 = zTree.transformToArray(childNodes[1]);
                            //zTree.checkNode(childNodes1[1], true, true,true);
                            zTree.selectNode(childNodes1[0]); //选中第一个父节点下面第一个子节点
                            zTree.expandNode(childNodes1[0], true);
                            zTree.setting.callback.onClick(null, zTree.setting.treeId, childNodes1[0]);//点击第一个父节点下面第一个子节点
                            var childNodes2 = zTree.transformToArray(childNodes1[1]);
                            zTree.checkNode(childNodes2[1], true, true);
                            firstAsyncSuccessFlag = 1;

                        }
                    }
                },

            };
            zTreeObj = $.fn.zTree.init($("#tree"), setting);
            $("#tree").css("height", $(window).height()-190);
        },
		/**
         * 新增
         */
        addRole : function(){
        	var nodes = zTreeObj.getSelectedNodes();
			if(nodes.length == 1){
				var selItem = nodes[0];
	            var parentId = selItem.id;
	            var flag = 0;
	            _msgBox.exWindow.open({
	                title: '新增角色',
	                width: '500px',
	                height : '300px',
	                url: path + "/safeMgr/roleMgr/add?parentId=" + parentId+"&flag="+flag,
	                close: function (data) {
	                    if(data == "success"){
	                    	EventHandler.getListData();
	                    }
	                }
	            });
			}else{
				_msgBox.tips("请选中需要新增子节点的父节点");
			}
        },

        modifyRole : function(){
        	var nodes = zTreeObj.getSelectedNodes();
			var item = nodes[0];
			if(item.id == -1){
            	_msgBox.warn("根节点不能修改");
                return;
            }
			if(nodes.length == 1){
				var selItem = nodes[0];
	            var id = selItem.id;
	            var flag = 0;
	            _msgBox.exWindow.open({
	                title: '修改角色',
	                width: '500px',
	                height : '300px',
	                url: path + "/safeMgr/roleMgr/edit?parentId=" + id+"&flag="+flag,
	                close: function (data) {
	                    if(data == "success"){
	                    	EventHandler.getListData();
	                    }
	                }
	            });
			}else{
				_msgBox.tips("请选中需要修改的节点");
                return;
            }
        },
        /**
         * 删除选中的数据
         */
        delRole : function(){
        	var nodes = zTreeObj.getSelectedNodes();
			if(nodes.length != 1){
                _msgBox.warn("请选择要删除的数据且只能选择一个");
                return;
            }
			var item = nodes[0];
			if(item.id == -1){
            	_msgBox.warn("根节点不能删除");
                return;
            }
            _msgBox.confirm({
            	title : '提示',
				msg : '确认删除?',
                callback : function(btnType){
                    if(btnType == "ok"){
                        var param = {};
                        param.id = item.id;
                        DataHandler.ajax(path + "/safeMgr/roleMgr/delete", param, function(backData){
                            if(backData.result == 0){
								_msgBox.tips("操作成功");
                                EventHandler.getListData();
                            }else if(backData.result == 1){
                                _msgBox.warn("请先删除完角色下的权限后再删除角色");
                            }else if(backData.result == 2){
                                _msgBox.warn("请先删除完角色下的用户后再删除角色");
                            }
                        });

                    }
                }
            });
        },
      //新增角色权限
		addRight : function(){
			if($("#roleId").val() == -1){
				_msgBox.tips('请先选择角色再新增权限!');
			}else{
				_msgBox.exWindow.open({
		              title: '新增角色权限',
		              width: '80%',
		              height : '60%',
		              url: path+"/safeMgr/rightMgr/tree?action=check",
		              close: function (data) {
                          if(data){
		            	      var param = $.parseJSON(data);
		            	      param.roleId = $("#roleId").val();
                              DataHandler.ajax(path + "/safeMgr/roleMgr/addRoleRight", param, function(backData){
							         _msgBox.tips("操作成功");
							         $('#tableRight').treegrid('reload');
                              });
                          }
		              }
		          });
			}
		},
		// 删除角色权限
		delRight : function() {
			var selectRows = $("#tableRight").treegrid("getChecked");
			if (selectRows.length == 0) {
				_msgBox.warn("请选择要删除的数据");
				return;
			}
			_msgBox.confirm({
				title : '提示',
				msg : '确认删除?',
				callback : function(btnType) {
					if (btnType == 'ok') {
						var ids = "";
						for (var i = 0, l = selectRows.length; i < l; i++) {
							ids += selectRows[i].id;
							if (i < l - 1) {
								ids += ",";
							}
						}
						var param = {};
						param.roleId = $("#roleId").val();
						param.ids = ids;
						DataHandler.ajax(path + "/safeMgr/roleMgr/delRoleRight", param, function(backData) {
							_msgBox.tips("操作成功");
							$('#tableRight').treegrid('reload');
						});
					}
				}
			})

		}
  }
}();

/**
 * 数据处理器
 */
var DataHandler = function(){
  return {
    /**
     * 权限管理
     */
	  loadListRight : function (param, callback){
      $.post(path + '/safeMgr/roleMgr/roleRightTree', param, function(backData) {
        callback(backData);
      });
    },
    /**
     * 用户管理
     */
	  loadListStaff : function (param, callback){
      $.post(path + '/safeMgr/staffMgr/list', param, function(backData) {
        callback(backData);
      });
    },
    /**
     * 获取枚举信息
     */
    getEnumList : function(param, callback){
      $.post(path + '/pub/enumMgr/findEnumListBusi', param, function(backData) {
        callback(backData);
      });
    },
    /**
     * 组织目录
     */
    getListData : function(param, callback){
		$.post(path + '/safeMgr/roleMgr/treeList', param, function(backData) {
			callback(backData);
		});
	},
	ajax : function(url, param, callback){
		$.post(url, param, function(backData) {
			callback(backData);
		});
	}
  };
}();


function containNote(notes, note){
	for(var i = 0; i < notes.length; i++){
		if(notes[i].id == note.id)
			return true;
	}
	return false;
}
