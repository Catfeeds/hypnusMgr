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

                    $('#auditCus').click(function () {
                        EventHandler.auditCus();
                    });

                    //动态绑定click(动态生成的html)
                    $("#dataList").on('click', '.xw_tick', templateList.check);
                    $(".xw_tickAll").click(templateList.checkAll);

                    // tab标签
                    $(".xw_select").click(function () {
                        $(".xw_select").removeClass("selectTabs_on");
                        $(this).addClass("selectTabs_on");
                        var data = $(this).attr("data-value");
                        $("#status").val(data);
                        EventHandler.search();
                    });

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
                    params.name = $("#name").val();
                    params.mobile = $("#mobile").val();
                    params.status = $("#status").val();

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
                    $("#name").val("");
                    $("#mobile").val("");
                },
                //审核
                auditCus: function () {
                    var checked = templateList.getChecked("dataList", "tr");
                    if (checked.length <= 0) {
                        msgBox.tips("请选择需要审核的用户");
                        return;
                    }else if(checked.length > 1){
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
                /**
                 * 审核
                 */
                auditCus: function (param, callback) {
                    $.post(path + '/admin/cusCertification/audit', param, function (backData) {
                        callback(backData);
                    });
                }
            }
        }();

        $(function () {
            InitHandler.init();
        })
    }
);
