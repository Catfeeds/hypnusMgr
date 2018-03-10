seajs.use(['$', 'adminSystem', 'template', 'msgBox', 'util', 'pageBar', 'dataGridHelp', 'jquery.json'],
    function ($, adminSystem, template, msgBox, util, pageBar, dataGridHelp) {
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
                        multSelectBtns: [
                            {btn: $("#btnDelete"), fn: EventHandler.btnDelete}
                        ],
                        singleSelectBtns: [
                            {
                                btn: $("#btnEdit"), fn: function () {
                                EventHandler.addEdit(2);
                            }, btn: $("#btnAddAccount"), fn: function () {
                                EventHandler.addAccount();
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

                    //新增事件
                    $('#btnAdd').click(function () {
                        EventHandler.addEdit(1);
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
                        params = {pageNo: 1, pageSize: 30};
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

                /**
                 * 删除
                 */
                btnDelete: function () {
                    //获取勾选的数据
                    var aId = [];
                    var data = $dataTb.dataGridHelp("getSelected");
                    $.each(data, function (i, item) {
                        aId.push(item.id);
                    });
                    msgBox.confirm({
                        title: '提示',
                        msg: '确认删除所选厂家?',
                        callback: function (btnType) {
                            if (btnType == 'ok') {
                                DataHandler.btnDelete({ids: aId.join(',')}, function (backData) {
                                    if (backData.type == 'success') {
                                        msgBox.tips("操作成功");
                                        //刷新列表
                                        EventHandler.search({pageNo: 1, pageSize: 30});
                                    } else {
                                        msgBox.tips(backData.content);
                                    }
                                });
                            }
                        }
                    });
                },
                /**
                 * 修改
                 */
                addEdit: function (type) {
                    var id = "";
                    if (type == 2) {
                        //获取勾选的数据
                        var data = $dataTb.dataGridHelp("getSelected")[0];
                        id = data.id;
                    }

                    msgBox.exWindow.open({
                        title: '新增厂家',
                        width: '25%',
                        height: '180px',
                        url: path + "/admin/basiconfig/factory/addEdit.html?id=" + id,
                        close: function (data) {
                            if (data) {
                                EventHandler.search();
                            }
                        }
                    });


                },

                addAccount:function(){
                        //获取勾选的数据
                        var data = $dataTb.dataGridHelp("getSelected")[0];
                        var id = data.id;

                     msgBox.exWindow.open({
                        title: '新增用户',
                        width: '70%',
                        height: '60%',
                        url: path + "/admin/staffMgr/addEdit?id=" +id,
                        close: function (data) {
                            //if (data == "success") {
                            //    EventHandler.s();
                            //}
                        }
                    });
                }
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
                /**
                 * 删除
                 * @param params
                 * @param callback
                 */
                btnDelete: function (params, callback) {
                    $.post(path + '/admin/basiconfig/factory/delete', params, function (backData) {
                        callback(backData);
                    });
                }
            };
        })();

        /** 页面入口 */
        $(function () {
            InitHandler.init();
        });
    });
