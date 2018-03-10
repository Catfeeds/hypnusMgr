/**
 * 启动页设置列表
 * Created by weirongfeng on 2017/6/10.
 */
define('admin/commonModule/mobile/loadingPage/loadingPageList', ['$', 'msgBox', 'adminSystem', 'jquery.json', 'util', 'template', 'pageBar', 'dataGridHelp'], function (require, exports, module) {
    var $ = require('$');
    var msgBox = require('msgBox');
    var currentForm = 'currentForm';
    var adminSystem = require('adminSystem');
    var pageBar = require('pageBar');
    var template = require('template');
    var dataGridHelp = require('dataGridHelp');

    function LoadingPageList() {
    }

    /**
     * 初始化
     */
    LoadingPageList.prototype.init = function () {

        var self = this;
        //列表
        self.tableContainer = $('#tableContainer');
        //查询表单
        self.form = $('#form');

        self.initPage();
        self.bindEvent();
        self.lblCount = $('#lblCount');

        self.loadData();
    };

    /**
     * 初始化界面
     */
    LoadingPageList.prototype.initPage = function () {
        var self = this;

        self.pageBar = $('.pageBar').pageBar({
            pageNumber: 1,
            pageSize: 6,
            total: 0,
            onSelectPage: function () {
                self.loadData();
            }
        });

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

                                $.post(path + '/admin/commonmodule/mobile/loadingpageset/delete', {'ids': ids.join(',')}, function (message) {
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
                        window.location.href = path + "/admin/commonmodule/mobile/loadingpageset/view/addEditloadingPage?id="+data[0].id;
                    }
                }
            ]
        });
    };

    /**
     * 事件绑定
     */
    LoadingPageList.prototype.bindEvent = function () {
        var self = this;

        //表单提交事件
        self.form.submit(function () {
            self.loadData();
            return false;
        });
    };

    /**
     * 加载数据
     * @param $form
     */
    LoadingPageList.prototype.loadData = function () {
        var self = this;

        var options = self.pageBar.pageBar('options');
        var params = {'pageNo':options.pageNumber || 1,
            'pageSize':options.pageSize};
        $.post(path + '/admin/commonmodule/mobile/loadingpageset/getList', params, function (data) {
            self.lblCount.html(data.total);
            var html = template('templateList', data);
            if (html) {
                self.tableContainer.empty().append(html);
                self.tableContainer.dataGridHelp('renderList', data.content);
            } else {
                html = template('templateNoData', null);
                self.tableContainer.empty().append(html);
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

    module.exports = new LoadingPageList();
});
seajs.use(['$', 'admin/commonModule/mobile/loadingPage/loadingPageList'], function ($, loadingPageList) {
    $(function () {
        $(window).triggerHandler('resize');
        loadingPageList.init();
    });
});