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
                    $.post(path + '/admin/deviceMgr/getPageList', param, function (backData) {
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
