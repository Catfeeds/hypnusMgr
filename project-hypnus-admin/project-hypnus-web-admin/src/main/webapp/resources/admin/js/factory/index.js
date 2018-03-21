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
                        debugger
                        EventHandler.search();
                    });

                    $('#reset').click(function () {
                        EventHandler.reset();
                    });
                    
                    $("#addFactory").click(function () {
                        EventHandler.addFactory();
                    });

                    $("#dataList").on("click",".editFactory",function () {
                        var dataId = $(this).parent().attr("data-id");
                        EventHandler.editFactory(dataId);
                    });
                    $("#dataList").on("click",".deleteFactory",function () {
                        var dataId = $(this).parent().attr("data-id");
                        EventHandler.deleteFactory(dataId);
                    });

                    $("#dataList").on("click",".editPwd",function () {
                        var dataId = $(this).parent().attr("data-id");
                        EventHandler.editPwd(dataId);
                    });
                    //动态绑定click(动态生成的html)
                    $("#dataList").on('click', '.xw_tick', templateList.check);
                    $(".xw_tickAll").click(templateList.checkAll);

                    // tab标签
                  /*  $(".xw_select").click(function () {
                        $(".xw_select").removeClass("selectTabs_on");
                        $(this).addClass("selectTabs_on");
                        var data = $(this).attr("data-value");
                        $("#status").val(data);
                        EventHandler.search();
                    });*/

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
                    $("#factoryMobile").val("");
                },
                addFactory:function () {
                    msgBox.exWindow.open({
                        title: '新增经销商',
                        url: path + '/admin/factoryMgr/add.html',
                        width: '1000px',
                        height: '600px',
                        close: function (result) {
                            if (result) {
                                EventHandler.search();
                            }
                        }
                    });
                },
                editFactory:function (dataId) {
                    msgBox.exWindow.open({
                        title: '修改信息',
                        url: path + "/admin/factoryMgr/edit.html?id=" + dataId,
                        width: '1000px',
                        height: '600px',
                        close: function (result) {
                            if (result) {
                                EventHandler.search();
                            }
                        }
                    });
                },
                deleteFactory:function(dataId){
                    var flag = window.confirm("您确定要删除该经销商吗？");
                    if(flag){
                        $.ajax({
                            type:"delete",
                            url:path+"/admin/factoryMgr/delete?id="+dataId,
                            success:function(){
                                EventHandler.search();
                            },
                            error:function(){
                                EventHandler.search();
                            }
                        })
                    }else{
                        alert(dataId);
                    }
                },
                //审核
                editPwd:function (dataId) {
                    msgBox.exWindow.open({
                        title: '修改密码',
                        url: path + "/admin/factoryMgr/editPwd.html?id=" + dataId,
                        width: '600px',
                        height: '325px',
                        close: function (result) {
                            if (result) {
                                EventHandler.search();
                            }
                        }
                    });
                },

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
                    $.post(path + '/admin/factoryMgr/getPage', param, function (backData) {
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
