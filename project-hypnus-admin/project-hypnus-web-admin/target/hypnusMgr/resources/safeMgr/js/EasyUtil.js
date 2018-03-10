/**
 * User: Chen ZhiYuan
 * Date: 2015-07-01
 */

function UtilJs() {
}

/**
 * treeGrid加载方法：提交查询表单参数，加载完成后清除复选框
 */
UtilJs.treeGridSearch = function () {
    var param = UtilJs.util.FormUtil.getFormJson('#searchForm');

    $('#tableModule').treegrid('reload', param);
    $('#tableModule').treegrid('clearChecked');
}

/**
 * dataGrid加载方法：提交查询表单参数，加载完成后清除复选框
 */
UtilJs.search = function (ev) {
    var param = UtilJs.util.FormUtil.getFormJson('#searchForm');
    $('#tableModule').datagrid('reload', param);
    $('#tableModule').datagrid('clearChecked');
}

/**
 * dataGrid页面：点击新增按钮时，打开新增窗口
 *
 * event:新增按钮点击事件
 * param:按钮(打开面板)属性  href | width | hegith
 * callBack： 弹出页面点击确定后的回调方法
 */
UtilJs.openAddModal = function (event, param, callBack) {
    event.preventDefault();
    //如果是直接绑定该函数，而不是调用传递参数：param为this对应的控件属性
    if (!param) {
        param = input2Json($(this));
        ;
    }

    //打开弹窗
    UtilJs.msgBox.exWindow.open({
        title: '新增',
        width: param.width,
        height: param.height,
        url: param.href,
        close: function (type) {
            if (type == "sucess") {
                if (callBack) {
                    callBack();
                } else {
                    UtilJs.search();
                }
            }
        }
    });
};

/**
 * treeGrid页面：点击新增按钮时，打开新增窗口; 不能勾选多行
 *
 * event:新增按钮点击事件
 * param:按钮(打开面板)属性  href | width | hegith | type
 * callBack： 弹出页面点击确定后的回调方法
 */
UtilJs.openTreeGridAddModal = function (event, param, callBack) {
    event.preventDefault();

    if (!param) {
        param = input2Json($(this));
        ;
        param.type = $(this).attr("type");
    }

    //pId默认为-1，如果选择某行，则以该行id为pId
    var row = $('#tableModule').datagrid('getChecked');
    var pId = -1;

    if (row.length > 1) {
        UtilJs.msgBox.tips('只能选择一行!');
    } else {
        if (row.length != 0) {
            pId = row[0].id;
        }

        //根据type和pId重新拼接param
        param.href = param.href + "/" + param.type + "/" + pId;
        //调用datagrid打开函数
        UtilJs.openAddModal(event, param, function () {
            $('#tableModule').treegrid('load');
            $('#tableModule').treegrid('clearChecked');
        });
    }
};

/**
 * dataGrid页面：点击修改按钮时，打开新修改窗口; 能切只能选择一行进行修改
 *
 * event:修改按钮点击事件
 * param:按钮(打开面板)属性  href | width | hegith
 * callBack： 弹出页面点击确定后的回调方法
 */
UtilJs.openUpdateModal = function (event, param, callBack) {
    event.preventDefault();

    if (!param) {
        param = input2Json($(this));
    }

    var row = $('#tableModule').datagrid('getChecked');

    if (row.length == 0) {
        UtilJs.msgBox.tips('请选择修改的数据!');
    } else if (row.length > 1) {
        UtilJs.msgBox.tips('只能选择一行修改!');
    } else {
        //根据id重新拼接href
        param.href = param.href + "/" + row[0].id;

        UtilJs.msgBox.exWindow.open({
            title: '修改',
            width: param.width,
            height: param.height,
            url: param.href,

            close: function (type) {
                if (type == "sucess") {
                    if (callBack) {
                        callBack();
                    } else {
                        UtilJs.search();
                    }
                }
            }
        });
    }
};

/**
 * treeGrid页面：点击修改按钮时，打开新修改窗口; 能切只能选择一行进行修改
 *
 * event:修改按钮点击事件
 * param:按钮(打开面板)属性  href | width | hegith
 * callBack： 弹出页面点击确定后的回调方法
 */
UtilJs.openTreeGridUpdateModal = function (event, param, callBack) {
    event.preventDefault();

    if (!param) {
        param = input2Json($(this));
        ;
    }

    UtilJs.openUpdateModal(event, param, function () {
        $('#tableModule').treegrid('load');//和datagrid修改弹窗的区别在这里，treegrid的加载方法不同
    });
};


/**
 * 保存或更新表单内容
 */
UtilJs.save = function (event) {
    event.preventDefault();

    //绑定表单验证
    $("#signupForm").validate({
        ignore: ".ignore",
        errorPlacement: function (error, element) {
        },
        invalidHandler: function (event, validator) {
            for (v in validator.errorMap) {
                $('#' + v).focus();
                UtilJs.msgBox.warn(validator.errorMap[v]);
                break;
            }
        }
    });

    //如果通过表单验证：提交
    if ($("#signupForm").valid()) {
        event.preventDefault();
        //请求路径
        var href = $("#signupForm").attr("action");
        var param = UtilJs.util.FormUtil.getFormJson('#signupForm');

        $.post(href, param, function (backData) {
            UtilJs.msgBox.tips(backData.content, 1, function () {
                if (backData.type == 'success') {
                    var type = 'sucess'; //返回成功
                    UtilJs.msgBox.exWindow.close(type);
                }
            });
        });
    }
}

/**
 * dataGrid页面：点击删除按钮事，删除所选记录
 *
 * event:删除按钮点击事件
 * param:按钮(打开面板)属性  href | width | hegith
 * callBack： 弹出页面点击确定后的回调方法
 */
UtilJs.batchDelete = function (event, href, callBack) {
    event.preventDefault();

    if (!href) {
        href = $(this).attr("href");
    }

    //封装将要删除数据的ID数组
    var row = $('#tableModule').datagrid('getChecked');

    if (row.length == 0) {
        UtilJs.msgBox.tips('请选择删除的数据!');
    } else {
        var ids = "";
        for (var i = 0; i < row.length; i++) {
            ids += row[i].id + ",";
        }
        ids = ids.substring(0, ids.length - 1);
        UtilJs.msgBox.confirm({
            title: '提示',
            msg: '确认删除?',
            callback: function (btnType) {
                if (btnType == 'ok') {
                    $.post(href, {ids: ids}, function (backData) {
                        UtilJs.msgBox.tips(backData.content, 1, function () {
                        	var result = backData.result;
                            if (result == 1 || result == '1') {
                                if (callBack) {
                                    callBack();
                                } else {
                                    UtilJs.search();
                                    $('#tableModule').datagrid('clearChecked');
                                }
                            }
                        });
                    });
                }
            }
        })
    }
}


/**
 * treeGrid页面：点击删除按钮事，删除所选记录
 *
 * event:删除按钮点击事件
 * param:按钮(打开面板)属性  href | width | hegith
 * callBack： 弹出页面点击确定后的回调方法
 */
UtilJs.batchTreeGridDelete = function (event, href, callBack) {
    if (!href) {
        href = $(this).attr("href");
    }

    UtilJs.batchDelete(event, href, function () {
    	$('#tableModule').treegrid('load');
        $('#tableModule').treegrid('clearChecked');
    });
}

//下拉选默认选中某项(用于回显)
function setSelect(selectName, select) {
    $("select[name=" + selectName + "] option").each(function () {
        if (this.value == select) {
            this.selected = true;
        }
    });
}

//多选框默认选中某项(用于回显)
function setCheckbox(checkboxName, menuId) {
    $("[name='" + checkboxName + "']:checkbox").each(function () {
        if (this.value == menuId) { // 比较 相等 则选择
            this.checked = true;
        }
    });
}

//控件href、height、width属性转json对象
function input2Json(inputParam) {
    var result = {};

    result.href = inputParam.attr("href");
    result.height = inputParam.attr("height");
    result.width = inputParam.attr("width");
    return result;
}
