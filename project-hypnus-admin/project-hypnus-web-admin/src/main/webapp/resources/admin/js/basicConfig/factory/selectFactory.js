seajs.use(['$', 'template', 'dataGridHelp', 'pageBar', 'msgBox', 'jquery.json'],
    function ($, template,  dataGridHelp, pageBar,msgBox) {
        var $dataTb = null;
        /** 初始化处理器 */
        var InitHandler = (function () {
            return {
                /** 初始化入口 */
                init: function () {
                    this.initPage();
                    this.initEvent();
                    this.initData();
                },
                /** 初始化界面 */
                initPage: function () {
                    $dataTb = $('#dataTb');


                    var params = {}; //搜索条件
                    //=========分页初始化start============
                    $('#pageBar').pageBar({
                        onSelectPage: function (page, pageSize) {
                            params.pageNo = page;
                            params.pageSize = pageSize;
                            EventHandler.search(params);
                        }
                    });

                    // 初始化数据列表
                    EventHandler.search();
                },
                /** 初始化事件绑定 */
                initEvent: function () {
                    $dataTb.dataGridHelp({
                        multSelectBtns: [],
                        singleSelectBtns: [
                            {
                                btn: $("#submit"), fn: function () {
                                $('#submit').button('loading');

                                EventHandler.saveSupplierInvoice();
                            }
                            }
                        ]
                    });

                    //查询事件
                    $('#btnSearch').click(function () {
                        // 初始化数据列表
                        EventHandler.search();
                    });

                    //重置事件
                    $('#btnClean').click(function () {
                        $('#factoryName').val('');
                    });
                    //取消事件
                    $('#btnCancel').click(function () {
                        msgBox.exWindow.close();

                    });

                    //当服务器异常时，禁用的按钮给予恢复
                    $(window.top).ajaxError(function (event, data) {
                        $('#submit').button('reset');
                    });

                },


                /** 初始化数据加载 */
                initData: function () {

                }
            };
        })();
        /** 事件处理器 */
        var EventHandler = (function () {
            return {
                search: function (params) {
                    if (typeof(params) == "undefined") {
                        params = {pageNo: 1, pageSize: 10};
                    }
                    params.factoryName = $('#factoryName').val();
                    DataHandler.getFactoryInfoByPage(params, function (backData) {
                        $('#total').html(backData.total);
                        var html = template('template_dataList', backData.content);
                        $('#dataList').html(html);
                        //重新设置数据时调用渲染列表方法
                        $dataTb.dataGridHelp("renderList", backData.content);

                        var page = params.pageNo;
                        var pageSize = params.pageSize;

                        $('#pageBar').pageBar({
                            total: backData.total,
                            pageNumber: page,
                            pageSize: pageSize
                        });

                        $(window).triggerHandler('resize');
                    });
                },
                //保存开票信息
                saveSupplierInvoice: function () {
                    $('#submit').button('reset');
                    var data = $dataTb.dataGridHelp("getSelected")[0];
                    var params = {};
                    params.factoryId = data.id;
                    params.factoryName = data.factoryName;
                    msgBox.exWindow.close($.toJSON(params));

                },

            };
        })();
        /** 数据处理器 */
        var DataHandler = (function () {
            return {
                /**
                 * 列表查询
                 * @param params
                 * @param callback
                 */
                getFactoryInfoByPage: function (params, callback) {
                    $.post(path + '/admin/basiconfig/factory/getFactoryInfoByPage', params, function (backData) {
                        callback(backData);
                    });
                },
            };
        })();
        /** 页面入口 */
        $(function () {
            InitHandler.init();
        });
    });
