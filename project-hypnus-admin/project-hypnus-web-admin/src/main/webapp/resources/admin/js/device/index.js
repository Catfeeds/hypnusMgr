seajs.use(['$', 'template', 'msgBox', 'util', 'pageBar', 'jquery.json'],
    function ($, template, msgBox, util, pageBar) {
        /**
         * 初始化处理器
         */
        var InitHandler = function () {
            return {
                /** 初始化入口 */
                init: function () {
                    this.initPage();
                    this.initEvent();
                    // 初始化数据列表
                    EventHandler.search();
                },


                /** 初始化界面  */
                initPage: function () {
                    var params = {}; //搜索条件
                    $('#pageBar').pageBar({
                        onSelectPage: function (page, pageSize) {
                            params.pageNo = page;
                            params.pageSize = pageSize;
                            EventHandler.search(params);
                        }
                    });
                },
                /** 初始化事件 */
                initEvent: function () {
                    $('#search').click(function () {
                        EventHandler.search();
                    });

                    $('#reset').click(function () {
                        EventHandler.reset();
                    });

                    $("#bindUser").click(function () {
                        EventHandler.bindUser();
                    });
                    $("#bindFactory").click(function () {
                        EventHandler.bindFactory();
                    });
                    $("#unbindUser").click(function () {
                        EventHandler.unbindUser();
                    });
                    $("#unbindFactory").click(function () {
                        EventHandler.unbindFactory();
                    });
                    $("#paramSet").click(function () {
                        EventHandler.paramSet();
                    });

                    //动态绑定click(动态生成的html)
                    $("#dataList").on('click', '.xw_tick', templateList.check);

                }
            }
        }();

        /**
         * 事件处理器
         */
        var EventHandler = function () {
            return {
                // 查询
                search: function (params) {
                    $(".xw_tickAll").removeClass("tickOn");

                    if (typeof(params) == "undefined") {
                        params = {pageNo: 1, pageSize: 15};
                    }
                    params.snId = $("#snId").val();
                    params.userMobile = $("#userMobile").val();
                    params.factoryMobile = $("#factoryMobile").val();

                    DataHandler.search(params, function (backData) {
                        var html = template('template_dataList', backData.content);
                        $('#dataList').html(html);

                        var page = params.pageNo;
                        var pageSize = params.pageSize;

                        $('#pageBar').pageBar({
                            total: backData.total,
                            pageNumber: page,
                            pageSize: pageSize
                        });
                        setParenHei();
                    });
                },
                //重置
                reset: function () {
                    $("#snId").val("");
                    $("#userMobile").val("");
                    $("#factoryMobile").val("");
                },

                bindUser: function () {
                    var checked = templateList.getChecked("dataList", "tr");
                    if (checked.length != 1 || checked[0].userId != "") {
                        msgBox.tips("请选择一台还未绑定用户的设备");
                        return;
                    }
                    msgBox.exWindow.open({
                        title: '选择绑定用户',
                        url: path + "/admin/deviceMgr/selectUserPage/" + checked[0].deviceId,
                        width: '1000px',
                        height: '400px',
                        close: function (result) {
                            if (result) {
                                EventHandler.search();
                            }
                        }
                    });
                },
                bindFactory: function () {
                    var checked = templateList.getChecked("dataList", "tr");
                    if (checked.length != 1 || checked[0].factoryId != "") {
                        msgBox.tips("请选择一台还未绑定经销商的设备");
                        return;
                    }
                    ;
                    msgBox.exWindow.open({
                        title: '选择绑定经销商',
                        url: path + "/admin/deviceMgr/selectFactoryPage/" + checked[0].deviceId,
                        width: '1000px',
                        height: '400px',
                        close: function (result) {
                            if (result) {
                                EventHandler.search();
                            }
                        }
                    });
                },
                unbindUser: function () {
                    var checked = templateList.getChecked("dataList", "tr");
                    if (checked.length != 1 || checked[0].userId == "") {
                        msgBox.tips("请选择一台已经绑定了用户的设备进行操作");
                        return;
                    }
                    msgBox.confirm({
                        title: '提示',
                        msg: '您确定要解除该设备绑定的用户吗？',
                        callback: function (btnType) {
                            if (btnType == 'ok') {
                                $.ajax({
                                    type: "post",
                                    url: path + "/admin/deviceMgr/unbindUser",
                                    data: {"deviceId": checked[0].deviceId},
                                    success: function () {
                                        EventHandler.search();
                                    },
                                    error: function () {
                                        msgBox.tips("操作失败");
                                    }
                                })
                            }
                        }
                    });
                },
                paramSet: function () {
                    var checked = templateList.getChecked("dataList", "tr");
                    if (checked.length != 1 || checked[0].deviceId == "") {
                        msgBox.tips("请选择一台设备");
                        return;
                    }
                    window.location.href = path + '/admin/deviceMgr/paramSet.html?deviceId=' + checked[0].deviceId;
                },
                //审核
                auditCus: function () {
                    var checked = templateList.getChecked("dataList", "tr");
                    if (checked.length <= 0) {
                        msgBox.tips("请选择需要审核的用户");
                        return;
                    } else if (checked.length > 1) {
                        msgBox.tips("一次只能审核一位用户");
                        return;
                    }
                    if (checked[0].status != 1) {
                        msgBox.tips("只能审核待审核状态的用户");
                        return;
                    }
                    msgBox.exWindow.open({
                        title: '审核',
                        url: path + "/admin/cusCertification/auditPage/" + checked[0].id,
                        width: '600px',
                        height: '325px',
                        close: function (result) {
                            if (result) {
                                EventHandler.search();
                            }
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
                 * 获取数据列表
                 */
                search: function (param, callback) {
                    $.post(path + '/admin/deviceMgr/getPageDevice', param, function (backData) {
                        callback(backData);
                    });
                },
            }
        }();

        $(function () {
            InitHandler.init();
        })
    }
);
