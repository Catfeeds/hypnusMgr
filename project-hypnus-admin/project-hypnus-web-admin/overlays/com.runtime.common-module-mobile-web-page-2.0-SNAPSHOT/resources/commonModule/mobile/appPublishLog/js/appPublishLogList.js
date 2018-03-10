/**
 * App发布历史管理
 * Created by weirongfeng on 2017-08-22 09:36:00.
 */
define('admin/commonModule/mobile/appPublicLog/appPublicLogList', ['$', 'msgBox', 'adminSystem', 'jquery.json', 'util', 'template', 'pageBar', 'dataGridHelp'], function (require, exports, module) {
    var $ = require('$');
    var msgBox = require('msgBox');
    var adminSystem = require('adminSystem');
    var pageBar = require('pageBar');
    var template = require('template');
    var dataGridHelp = require('dataGridHelp');

    function AppPublicLogList() {
    }

    /**
     * 初始化
     */
    AppPublicLogList.prototype.init = function () {

        var self = this;
        //列表
        self.tableContainer = $('#tableContainer');
        self.tableList = $('#tableList');
        self.lblCount = $('#lblCount');

        self.initPage();
        self.loadData();
    };

    /**
     * 初始化界面
     */
    AppPublicLogList.prototype.initPage = function () {
        var self = this;

        //列表上的按钮操作处理
        self.tableContainer.dataGridHelp({
            //列表多选按钮
            multSelectBtns: [
                {
                    //删除按钮点击事件
                    btn: $("#btnDel"),
                    fn: function (event) {
                        msgBox.confirm({
                            title: '提示', msg: '确认删除此数据?', callback: function (btnType) {
                                if (btnType != msgBox.ButtonType.OK) {
                                    return;
                                }

                                var datas = self.tableContainer.dataGridHelp("getSelected");
                                var ids = [];
                                for (var i = 0; i < datas.length; i++) {
                                    ids.push(datas[i].id);
                                }

                                $.post(path + '/admin/commonmodule/mobile/apppublishLog/delete', {'ids': ids.join(',')}, function (message) {
                                    msgBox.tips(message.content, 2, function () {
                                        if (message.type == 'success') {
                                            self.loadData();
                                        }
                                    });
                                });

                            }
                        });
                    }
                }

            ],
            //列表单选按钮
            singleSelectBtns: [
                {
                    btn: $("#btnModify"),
                    fn: function (event) {
                        var data = self.tableContainer.dataGridHelp("getSelected");
                        window.location.href = path + "/admin/commonmodule/mobile/apppublishLog/view/addEditAppPublishLog?id=" + data[0].id;
                    }
                }
            ]
        });

        self.pageBar = $('.pageBar').pageBar({
            pageNumber: 1,
            pageSize: 10,
            total: 0,
            onSelectPage: function () {
                self.loadData();
            }
        });
    };

    /**
     * 事件绑定
     */
    AppPublicLogList.prototype.bindEvent = function () {
        $('.code').click(function (e) {
            var idVal = this.attributes.itemId.value;
            var url = path + '/admin/commonmodule/mobile/apppublishLog/getQRCode?id='+ idVal +'&height=500&width=500';
            viewImage([url], url, false);
            e.stopPropagation();
        });
    };

    /**
     * 加载数据
     * @param $form
     */
    AppPublicLogList.prototype.loadData = function () {
        var self = this;

        var params = {};
        var options = self.pageBar.pageBar('options');
        params.pageNo=options.pageNumber || 1;
        params.pageSize=options.pageSize;

        $.post(path + '/admin/commonmodule/mobile/apppublishLog/getList', params, function (data) {
            //显示列表数量
            self.lblCount.html(data.total);
            var html = template('templateList', data);
            if (html) {
                self.tableList.empty().append(html);
                self.bindEvent();
                self.tableContainer.dataGridHelp('renderList', data.content);
            } else {
                html = template('templateNoData', null);
                self.tableList.empty().append(html);
            }
            //设置分页条信息
            self.pageBar.pageBar({
                total: data.total,
                pageNumber: data.pageNo,
                pageSize: data.pageSize
            });
            $(window).triggerHandler('resize');
        });
    };

    module.exports = new AppPublicLogList();
});
seajs.use(['$', 'admin/commonModule/mobile/appPublicLog/appPublicLogList'], function ($, appPublicLogList) {
    $(function () {
        $(window).triggerHandler('resize');
        appPublicLogList.init();
    });
});