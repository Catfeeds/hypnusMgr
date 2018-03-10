/**
 * Created by haydn on 2015/7/6.
 */
/**
 * 页面入口
 */
var zTreeObj = null;
var _msgBox = {};
var _util = {};
var deptIdsTemp = [];
var deptNamesTemp = [];

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
seajs.use(['$', 'msgBox', 'select', 'util', 'jquery.json'], function ($, msgBox, select, util) {
    _msgBox = msgBox;
    _util = util;

    $(function () {
        InitHandler.init();
    })
});

/**
 * 初始化处理器
 */
var InitHandler = function () {
    return {
        init: function () {
            if (deptIds) {
                //deptIdsTemp = deptIds.split(",");
                EventHandler.getDeptNames();
            }
            this.initEvent();
            this.initPage();
        },
        initPage: function () {
            EventHandler.getListData();

        },
        initEvent: function () {
            $("a[name='btnAdd']").click(EventHandler.addData);
            //删除列表数据
            $('#btnDelete').click(EventHandler.deleteData);
            $('#btnUpdate').click(EventHandler.editData);
        },
        initForm: function () {

        }
    }
}();

/**
 * 事件处理器
 */
var EventHandler = function () {
    return {
        getListData: function () {
            var param = {};
            param.staffId = staffId;
            if (limit) {
                param.limit = limit;
            }
            var setting = {
                view: {
                    selectedMulti: false //设置是否允许同时选中多个节点
                },
                async: {
                    autoParam: ["id"],
                    contentType: "application/json",
                    enable: true,
                    type: "get",
                    otherParam: param,
                    url: path + "/safeMgr/deptMgr/asyncTreeList"
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
                        $("#nodeId").val(treeNode.id);
                    },
                    onAsyncSuccess: function () {
                        var ids = deptIds.split(",");
                        for (var i = 0; i < ids.length; i++) {
                            var node = zTreeObj.getNodeByParam("id", ids[i]);
                            if (node) {
                                if (deptIds) {
                                    deptIdsTemp.remove(node.id);
                                    deptNamesTemp.remove(node.name);
                                }
                                node.checked = true;
                                zTreeObj.updateNode(node);
                            }
                        }
                    }
                },
                view: {}
            };
            if (check == "more") {
                setting.check = {
                    enable: true,
                    chkStyle: "checkbox",
                    chkboxType: {"Y": "", "N": ""}
                }
            }
            zTreeObj = $.fn.zTree.init($("#tree"), setting);
            $("#tree").css("height", $(window).height() - 90);
            if (deptIds) {
                var ids = deptIds.split(",");
                for (var i = 0; i < ids.length; i++) {
                    var node = zTreeObj.getNodeByParam("id", ids[i]);
                    if (node) {
                        node.checked = true;
                        zTreeObj.updateNode(node);
                    }
                }
            }
        },
        //勾选返回
        checkBack: function () {
            var nodes = zTreeObj.getSelectedNodes();
            if (check == "more") {
                nodes = zTreeObj.getCheckedNodes();
            }
            if (nodes.length == 0 && deptIds && deptIdsTemp.length == 0) {
                _msgBox.warn("请勾选要返回的数据");
                return;
            }
            if (check == "more") {
                var arr = [];
                var j = 0;
                for (var i = 0; i < nodes.length; i++) {
                    var item = nodes[i];
                    if (item.id != -1) {
                        arr[j] = {id: item.id, name: item.name};
                        j++;
                    }
                }
                if (deptIdsTemp) {
                    var tempArr = [];
                    for (var i = 0; i < deptIdsTemp.length; i++) {
                        arr[j] = {id: deptIdsTemp[i], name: deptNamesTemp[i]};
                        j++;
                    }
                }
                _msgBox.exWindow.close($.toJSON(arr));
            } else {
                var item = nodes[0];
                if (item.name == '行政部门树') {
                    _msgBox.warn("不能选择行政部门树，请重新勾选要返回的数据");
                    return;
                }
                _msgBox.exWindow.close($.toJSON({id: item.id, name: item.name}));
            }
        },
        getDeptNames: function () {
            DataHandler.ajax(path + "/safeMgr/deptMgr/getDeptNames", {deptIds: deptIds}, function (data) {
                var depts = data.result;
                for (var i = 0; i < depts.length; i++) {
                    deptIdsTemp[i] = depts[i].id;
                    deptNamesTemp[i] = depts[i].name;
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
        ajax: function (url, param, callback) {
            $.post(url, param, function (backData) {
                callback(backData);
            });
        }
    };
}();
