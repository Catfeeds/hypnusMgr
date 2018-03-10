var _msgBox = {};
var _util = {};
var staffIdsTemp = [];
var staffNamesTemp = [];

Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

/**
 * 从数组中删除指定值
 * */
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

/**
 * 页面入口
 */
seajs.use(['$', 'msgBox', 'template', 'easyuiDatagrid', 'select', 'util', 'jquery.json'],
    function ($, msgBox, template, easyuiDatagrid, select, util) {
        _msgBox = msgBox;
        _util = util;
        $(function () {
            InitHandler.init();
        });
    });

/**
 * 初始化处理器
 */
var InitHandler = function () {
    return {
        init: function () {
            EventHandler.init();
        }
    };
}();
/**
 * 事件处理器
 */
var EventHandler = function () {
    return {
        //绑定按钮事件
        init: function () {
            $(window).resize(function () {
                EventHandler.initPage();
            });
            if (staffIds) {
                //staffIdsTemp = staffIds.split(",");
                EventHandler.getStaffNames();
            }
            EventHandler.initPage();
            EventHandler.initDatagrid();
            $("#reload").bind("click", EventHandler.reload);
            $("#search").bind("click", EventHandler.loadList);
            $("#add").bind("click", EventHandler.add);
            $("#unlock").bind("click", EventHandler.unlock);
            $("#modify").bind("click", EventHandler.modify);
            $("#delete").bind("click", EventHandler.del);
            EventHandler.getListData();
            $('#tableModule').datagrid('loadData', {"total": 0, "rows": []});
        },
        initPage: function () {
            //$("#ztreebox").css("height", "600px");
            if (action == "check") {
                $("#staffMain").css("height", "570px");
                $("#tableModule").css("height", "570px");
                $("#mainboxright").css("height", "570px");
                $("#ztreebox").css("height", "500px");
                $(".mainboxleft").css("height", "570px");
                //$("#staffMain").css("height", 330);
                //$("#tableModule").css("height", 330);
                //$("#mainboxright").css("height", 330);
                //$("#ztreebox").css("height", 330);
            }
        },
        //初始化表格
        initDatagrid: function () {
            var $dg = $('#tableModule');
            var options = {
                pageSize: action == "check" ? 10 : 20, //只能是10的倍数
                singleSelect: action == "check" ? false : true,
                onCheck: function (rowIndex, rowData) {
                    if (staffIdsTemp.indexOf(rowData.id) == -1) {
                        var index = staffIdsTemp.length;
                        staffIdsTemp[index] = rowData.id;
                        staffNamesTemp[index] = rowData.name;
                    }
                },
                onUncheck: function (rowIndex, rowData) {
                    if (staffIdsTemp.indexOf(rowData.id) != -1) {
                        staffIdsTemp.remove(rowData.id);
                        staffNamesTemp.remove(rowData.name);
                    }
                },
                onCheckAll: function (rows) {
                    for (var i = 0; i < rows.length; i++) {
                        var rowData = rows[i];
                        if (staffIdsTemp.indexOf(rowData.id) == -1) {
                            var index = staffIdsTemp.length;
                            staffIdsTemp[index] = rowData.id;
                            staffNamesTemp[index] = rowData.name;
                        }
                    }
                },
                onUncheckAll: function (rows) {
                    for (var i = 0; i < rows.length; i++) {
                        var rowData = rows[i];
                        if (staffIdsTemp.indexOf(rowData.id) != -1) {
                            staffIdsTemp.remove(rowData.id);
                            staffNamesTemp.remove(rowData.name);
                        }
                    }
                },
                //onDblClickRow: action == "check" ? false : function () {
                //    var item = $dg.datagrid('getSelected');
                //    //打开详情页面
                //    location.href = path + "/admin/staff/view/" + item.id;
                //},
                loadMsg: false,
                columns: [[
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
                    {
                        field: 'isLocked', title: '账号状态', width: "10%", align: 'center',
                        formatter: function (value) {
                            if (value) {
                                return '锁定';
                            } else {
                                return '可用';
                            }
                        }
                    },
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
                onSelectPage: function (pPageIndex, pPageSize) {
                    var gridOpts = $('#tableModule').datagrid('options');
                    gridOpts.pageNumber = pPageIndex;
                    gridOpts.pageSize = pPageSize;
                    EventHandler.loadList();
                }
            });
        },
        //重载
        reload: function () {
            $("#name").val('');
            $("#account").val('');
        },
        //新增
        add: function () {
            _msgBox.exWindow.open({
                title: '新增用户',
                width: '70%',
                height: '60%',
                url: path + "/safeMgr/staffMgr/addEdit?action=check&deptId=" + $("#deptId").val(),
                close: function (data) {
                    if (data == "success") {
                        EventHandler.loadList();
                    }
                }
            });
        },        //新增
        unlock: function () {
            var selectRows = $("#tableModule").datagrid("getChecked");
            if (selectRows.length == 0) {
                _msgBox.tips('请勾选需要删除的数据!');
            } else {

                var ids = "";
                for (var i = 0, l = selectRows.length; i < l; i++) {
                    ids += selectRows[i].id;
                    if (i < l - 1) {
                        ids += ",";
                    }
                }
                var param = {ids: ids};
                $.post(path + "/safeMgr/staffMgr/unlock", param, function (data) {
                    if (data.type == 'success') {
                        _msgBox.tips("操作成功");
                        EventHandler.loadList();
                    }
                });
            }
        },
        //修改
        modify: function () {
            var selectRows = $("#tableModule").datagrid("getSelections");
            if (selectRows.length != 1) {
                _msgBox.tips('请选择需要修改的数据!');
            } else {
                _msgBox.exWindow.open({
                    title: '新增用户',
                    width: '70%',
                    height: '60%',
                    url: path + "/safeMgr/staffMgr/addEdit?id=" + selectRows[0].id,
                    close: function (data) {
                        if (data == "success") {
                            EventHandler.loadList();
                        }
                    }
                });
            }
        },
        //删除
        del: function () {
            var selectRows = $("#tableModule").datagrid("getChecked");
            if (selectRows.length == 0) {
                _msgBox.tips('请勾选需要删除的数据!');
            } else {
                _msgBox.confirm({
                    title: '提示',
                    msg: '确认删除?',
                    callback: function (btnType) {
                        if (btnType == 'ok') {
                            var ids = "";
                            for (var i = 0, l = selectRows.length; i < l; i++) {
                                ids += selectRows[i].id;
                                if (i < l - 1) {
                                    ids += ",";
                                }
                            }
                            var param = {ids: ids};
                            $.post(path + "/safeMgr/staffMgr/delete", param, function (data) {
                                if (data.type == 'success') {
                                    _msgBox.tips("操作成功");
                                    EventHandler.loadList();
                                }
                            });
                        }
                    }
                })
            }
        },
        //加载表格数据
        loadList: function () {
            var param = {};
            var $dg = $('#tableModule');
            var opts = $dg.datagrid('options');
            param.deptId = $('#deptId').val();
            param.name = $('#name').val();
            param.account = $('#account').val();
            param.pageSize = opts.pageSize;
            param.pageNo = opts.pageNumber;
            DataHandler.loadList(param, function (backData) {
                var data = backData.result;
                var total = data.total;
                var rows = data.content;
                if (staffIdsTemp.length != 0) {
                    for (var i = 0; i < rows.length; i++) {
                        for (var j = i; j < staffIdsTemp.length; j++) {
                            if (rows[i].id == staffIdsTemp[j]) {
                                rows[i].checked = true;
                                break;
                            }
                        }
                    }
                }
                $dg.datagrid('loadData', {"total": total, "rows": data.content});
            });
        },
        getListData: function () {
            var param = {};
            var deptUrl = path + "/safeMgr/deptMgr/treeList";
            if (limit) {
                param.limit = limit;
                deptUrl = path + "/safeMgr/deptMgr/asyncTreeList";
            }
            var setting = {
                view: {
                    selectedMulti: false //设置是否允许同时选中多个节点
                },
                async: {
                    autoParam: ["id"],
                    //contentType: "application/json",
                    enable: true,
                    type: "get",
                    otherParam: param,
                    url: deptUrl
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
                        $("#deptName").html("");
                        $("#deptCode").html("");
                        $("#deptType").html("");
                        $("#deptLevel").html("");
                        $("#deptName").html(treeNode.name);
                        $("#deptCode").html(treeNode.code);
                        $("#deptType").html(treeNode.typeName);
                        $("#deptLevel").html(treeNode.levelName);

                        if(treeNode.id) {
                            $("#deptId").val(treeNode.id);
                        }
                        EventHandler.loadList();
                    },
                    onAsyncSuccess: function () {
                        var firstAsyncSuccessFlag = 0;
                        if (firstAsyncSuccessFlag == 0) {
                            var zTree = $.fn.zTree.getZTreeObj("tree");
                            //调用默认展开第一个结点
                            var selectedNode = zTree.getSelectedNodes();
                            var nodes = zTree.getNodes();
                            zTree.expandNode(nodes[0], true);

                            var childNodes = zTree.transformToArray(nodes[0]);
                            var id = null;
                            var childNodes1 = null;
                            if (childNodes[0].children.length > 0) {
                                zTree.expandNode(childNodes[1], true);
                                childNodes1 = zTree.transformToArray(childNodes[1]);
                                zTree.selectNode(childNodes1[0]); //选中第一个父节点下面第一个子节点
                                zTree.expandNode(childNodes1[0], true);
                                id = childNodes1[0];
                            } else {
                                zTree.expandNode(childNodes[0], true);
                                zTree.selectNode(childNodes[0]);
                                id = childNodes[0].id;
                            }

                            $("#deptId").val(id);
                            zTree.setting.callback.onClick(null, zTree.setting.treeId, id);//点击第一个父节点下面第一个子节点
                            if (childNodes[0].children.length > 0) {
                                var childNodes2 = zTree.transformToArray(childNodes1[1]);
                                zTree.checkNode(childNodes2[1], true, true);
                            } else {
                                var childNodes2 = zTree.transformToArray(childNodes[1]);
                                zTree.checkNode(childNodes2[1], true, true);

                            }


                            firstAsyncSuccessFlag = 1;

                        }
                    }
                },
                view: {}
            };
            zTreeObj = $.fn.zTree.init($("#tree"), setting);
            $("#tree").css("height", "600px");
        },
        checkBack: function () {
            if (staffIdsTemp.length == 0) {
                _msgBox.tips('请勾选要返回的数据');
            } else {
                var ids = "";
                var names = "";
                for (var i = 0; i < staffIdsTemp.length; i++) {
                    ids += staffIdsTemp[i] + ",";
                    names += staffNamesTemp[i] + "，";
                }
                ids = ids.substr(0, ids.length - 1);
                names = names.substr(0, names.length - 1);
                var param = {ids: ids, names: names};
                _msgBox.exWindow.close($.toJSON(param));
            }
        },
        /**
         * 新增
         */
        addDept: function () {
            var nodes = zTreeObj.getSelectedNodes();
            if (nodes.length == 1) {
                var selItem = nodes[0];
                var pId = selItem.id;
                _msgBox.exWindow.open({
                    title: '新增部门',
                    width: '600px',
                    height: '250px',
                    url: path + "/safeMgr/deptMgr/addEdit?pId=" + pId,
                    close: function (data) {
                        if (data == "success") {
                            if (selItem.isParent) {
                                zTreeObj.reAsyncChildNodes(selItem, "refresh");
                            } else {
                                selItem.isParent = true;
                                zTreeObj.updateNode(selItem);
                                zTreeObj.reAsyncChildNodes(selItem, "refresh");
                            }
                        }

                    }
                });
            } else {
                _msgBox.tips("请选中需要新增子节点的父节点");
            }
        },

        modifyDept: function () {
            var nodes = zTreeObj.getSelectedNodes();
            var item = nodes[0];
            if (item.id == -1) {
                _msgBox.warn("根节点不能修改");
                return;
            }
            if (nodes.length == 1) {
                var selItem = nodes[0];
                var id = selItem.id;
                var flag = 0;
                _msgBox.exWindow.open({
                    title: '修改部门',
                    width: '600px',
                    height: '250px',
                    url: path + "/safeMgr/deptMgr/addEdit?id=" + id,
                    close: function (data) {
                        if (data == "success") {
                            //EventHandler.getListData();
                            zTreeObj.reAsyncChildNodes(selItem.getParentNode(), "refresh");
                        }
                    }
                });
            } else {
                _msgBox.tips("请选中需要修改的节点");
                return;
            }
        },
        /**
         * 删除选中的数据
         */
        delDept: function () {
            var nodes = zTreeObj.getSelectedNodes();
            if (nodes.length != 1) {
                _msgBox.warn("请选择要删除的数据且只能选择一个");
                return;
            }
            var item = nodes[0];
            if (item.isParent) {
                _msgBox.warn("根节点不能删除");
                return;
            }
            _msgBox.confirm({
                title: '提示',
                msg: '确认删除?',
                callback: function (btnType) {
                    if (btnType == "ok") {
                        var isParent = true;
                        if (item.getParentNode() == null) {
                            isParent = false;
                        } else if (item.getParentNode().children.length == 1) {
                            isParent = false;
                        }
                        var param = {};
                        param.id = item.id;
                        DataHandler.ajax(path + "/safeMgr/deptMgr/delete", param, function (data) {
                            var result = data.result;
                            if (result == 1) {
                                _msgBox.tips(data.content);
                                zTreeObj.reAsyncChildNodes(item.getParentNode(), "refresh");
                                if (!isParent) {
                                    item.getParentNode().isParent = false;
                                    zTreeObj.updateNode(item.getParentNode());
                                }
                                //EventHandler.getListData();
                            } else if (result == 0) {
                                _msgBox.warn(data.content);
                            }
                        });
                    }
                }
            });
        },
        getStaffNames: function () {
            DataHandler.ajax(path + "/safeMgr/staffMgr/getStaffNames", {staffIds: staffIds}, function (data) {
                var staffs = data.result;
                for (var i = 0; i < staffs.length; i++) {
                    staffIdsTemp[i] = staffs[i].id;
                    staffNamesTemp[i] = staffs[i].name;
                }
            });
        }
    }
}();

/**
 * 数据处理器
 */
var DataHandler = function () {
    return {
        /**
         * 用户管理
         */
        loadList: function (param, callback) {
            $.post(path + '/safeMgr/staffMgr/list', param, function (backData) {
                callback(backData);
            });
        },
        /**
         * 获取枚举信息
         */
        getEnumList: function (param, callback) {
            $.post(path + '/pub/enumMgr/findEnumListBusi', param, function (backData) {
                callback(backData);
            });
        },
        /**
         * 组织目录
         */
        getListData: function (param, callback) {
            $.post(path + '/safeMgr/deptMgr/treeList', param, function (backData) {
                callback(backData);
            });
        },
        ajax: function (url, param, callback) {
            $.post(url, param, function (backData) {
                callback(backData);
            });
        }
    };
}();


