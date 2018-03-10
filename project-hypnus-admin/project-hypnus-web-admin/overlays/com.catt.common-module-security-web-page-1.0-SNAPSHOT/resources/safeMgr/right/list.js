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
	         $("#modify").bind("click",EventHandler.modify);
	         $("#delete").bind("click",EventHandler.del);
		},
		//初始化表格
		initDatagrid : function(){
		   var temp = $("#singleSelect").val() == 'true';
		   $('#tableModule').treegrid({
			    url : path + "/safeMgr/rightMgr/treeList/-1",
			    height : action == "check"  ? "400" : $(window).height()-130, // 1：弹窗 2：管理列表自适应
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
						$(this).treegrid('options').url = path + "/safeMgr/rightMgr/treeList/" + row.id +"?type="+type;
					}else{
						$(this).treegrid('options').url = path + "/safeMgr/rightMgr/treeList/-1";
                 }
				},
				onCheck : action == 'check' ? function(note, checked){
					if(onCheckState){
						while(note != null){
							  note = $('#tableModule').treegrid('getParent', note.id);
							  if(note != null)
								  $('#tableModule').treegrid('select', note.id);
						  } 
						onCheckState = true;
					}
				} : function(){},
				onUncheck : action == 'check' ? function(note, checked){
					if(onUncheckState){
						onUncheckState = false;
						var notes = $('#tableModule').treegrid('getChildren', note.id);
						console.info(note.id);
						  if(notes != null){
							  var selNotes = $('#tableModule').treegrid('getSelections');
							  console.info(selNotes);
							  for(var i = 0; i < notes.length; i++){
								  if(containNote(selNotes, notes[i])){
									  $('#tableModule').treegrid('unselect', notes[i].id);
									  var notes2 = $('#tableModule').treegrid('getChildren', notes[i].id);
									  if(notes2 != null){
										  for(var j = 0; j < notes2.length; j++){
											  if(containNote(selNotes, notes2[j])){
												$('#tableModule').treegrid('unselect', notes2[j].id);
											  }
										  }
									  }
								  }
								 
							  }
						  }
						  onUncheckState = true;
					}
				} : function(){},
				singleSelect : action == 'check' ? false : true,
				pageable : false,
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
                            } else if(row.type == 3){
								return "数据控制";
							}else if(row.type == 4){
								return "公共菜单";
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
		},
		//重载
		reload : function(){
			$("#name").val('');
		},
		//新增
		add : function(type){
			var selectRows =$("#tableModule").datagrid("getSelections");
			if(selectRows.length != 1){
				_msgBox.tips('请先选择节点数据再新增!');
			}else{
				_msgBox.exWindow.open({
		              title: '新增权限',
		              width: '900px',
		              height : '350px',
		              url: path+"/safeMgr/rightMgr/addEdit?id="+selectRows[0].id + "&type=" + type,
		              close: function (data) {
		            	  if(type == -1){
                              if($('#tableModule').treegrid('getChildren', selectRows[0].id).length == 0){
                                  $('#tableModule').treegrid('reload');
                              }else
                                  $('#tableModule').treegrid('reload', selectRows[0].id);
		            	  }else{
		            		  var node = $('#tableModule').treegrid('getParent', selectRows[0].id); 
		            		  if(node == null){
		            			  $('#tableModule').treegrid('reload'); 
		            		  }else
		            			  $('#tableModule').treegrid('reload', node.id); 
		            	  }
		              }
		          });
			}
		},
		//修改
	    modify : function(){
			var selectRows =$("#tableModule").treegrid("getSelections");
			if(selectRows.length != 1){
				_msgBox.tips('请选择需要修改的数据!');
			}else{
				_msgBox.exWindow.open({
		              title: '修改权限',
		              width: '900px',
		              height : '350px',
		              url: path+"/safeMgr/rightMgr/addEdit?id="+selectRows[0].id,
		              close: function (data) {
		            	  var node = $('#tableModule').treegrid('getParent', selectRows[0].id); 
	            		  if(node == null){
	            			  $('#tableModule').treegrid('reload'); 
	            		  }else
	            			  $('#tableModule').treegrid('reload', node.id); 
		              }
		          });
			}
	    },
	    //删除
	    del : function(){
	    	var selectRows =$("#tableModule").treegrid("getChecked");
			if(selectRows.length != 1){
				_msgBox.tips('请选择一条需要删除的数据!');
			}else{
				_msgBox.confirm({
					title : '提示',
					msg : '确认删除?',
					callback : function(btnType) {
						if (btnType == 'ok') {
							var param = {id : selectRows[0].id};
							$.post(path+"/safeMgr/rightMgr/delete/", param, function(data){
								var result = data.result;
                            	if(result == 1 || result == '1'){
                            		_msgBox.tips(data.content);
									 $("#tableModule").treegrid("uncheckAll");
                            		 $('#tableModule').treegrid('reload'); 
                            	}else if(result == 0 || result == '0'){
                            		_msgBox.warn(data.content);
                            	}
							});
						}
					}
				})
			}
	    },
//		//加载表格数据 
//		loadList : function(){
//			var param = {};
//			var $dg = $('#tableModule');
//			var opts = $dg.datagrid('options');
//			param.nickName = $('#nickName').val();
//			param.fileName = $('#fileName').val();
//			param.pageSize = opts.pageSize;
//			param.pageNo = opts.pageNumber;
//			DataHandler.loadList(param, function(backData){
//				var data = backData.result;
//				var total = data.total;
//				$dg.datagrid('loadData',{"total" : total,"rows" : data.content});
//			});
//		},
		//勾选返回
		checkBack : function(){
			var selectRows = $("#tableModule").treegrid("getChecked");
			if(selectRows.length == 0){
				_msgBox.warn("请勾选要返回的数据");
				return;
			}
			var ids ="";
			for (var i = 0, l = selectRows.length; i < l; i++) {
				ids += selectRows[i].id ;
				if(i<l-1){
					ids += ",";
				}
	        }
			var param = {ids : ids};
			_msgBox.exWindow.close($.toJSON(param));
		}
  }
}();

/**
 * 数据处理器
 */
var DataHandler = function(){
  return {
    /**
     * 获取枚举信息
     */
    getEnumList : function(param, callback){
      $.post(path + '/pub/enumMgr/findEnumListBusi', param, function(backData) {
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
