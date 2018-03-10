seajs.use(['$', 'adminSystem', 'template', 'validate', 'dataGridHelp', 'msgBox', 'jquery.json'],
    function ($, adminSystem, template, validate, dataGridHelp, msgBox) {

        /** 初始化处理器 */
        var InitHandler = (function () {
            return {
                /** 初始化入口 */
                init: function () {
                    this.initPage();
                    this.initEvent();
                    this.initData();
                    this.initForm();
                },
                /** 初始化界面 */
                initPage: function () {

                },
                /** 初始化事件绑定 */
                initEvent: function () {

                    //取消事件
                    $('#btnCancel').click(function () {
                        msgBox.exWindow.close();
                    });

                    //保存事件
                    $('#submit').click(function () {
                        $('#submit').button('loading');
                        EventHandler.save();
                    });

                    //当服务器异常时，禁用的按钮给予恢复
                    $(window.top).ajaxError(function (event, data) {
                        $('#submit').button('reset');
                    });


                },

                //表单验证
                initForm: function () {
                    var rules = {
                        factoryName: {required: true}
                    };

                    var messages = {
                        factoryName: {
                            required: "请输入厂家名称"
                        }
                    };
                    this.initValidate("#addForm", rules, messages);
                },
                initValidate: function (ele, rules, messages) {
                    $(ele).validate({
                        errorElement: 'span',
                        errorClass: 'help-block',
                        rules: rules,
                        messages: messages,
                        errorPlacement: function (error, element) {
                            // error.insertAfter(element);
                        },
                        highlight: function (element) {
                            $(element).parent().addClass('has-error');
                        },
                        invalidHandler: function (event, validator) {
                            $('#submit').button('reset');
                            for (v in validator.errorMap) {
                                var $form = $(event.currentTarget);
                                var $element = $form.find('[name="' + v + '"]');
                                msgBox.warn(validator.errorMap[v]);
                                $element.focus();
                                break;
                            }
                        }, unhighlight: function (element) {
                            $(element).parent().removeClass('has-error');
                        }
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
                save: function () {
                    if ($("form#addForm").valid()) {
                        var params = function (list) {
                            var map = {};
                            $.each(list, function (i, n) {
                                map[n.name] = n.value;
                            });
                            return map;
                        }($("form#addForm").serializeArray());

                        DataHandler.save(params, function (backData) {
                            $('#submit').button('reset');
                            if (backData.type == "success") {
                                msgBox.tips("操作成功", 1, function () {
                                    msgBox.exWindow.close($.toJSON(backData));
                                });
                            }else {
                                msgBox.tips(backData.content);
                            }
                        });
                    } else {
                        $('#submit').button('reset');
                    }
                },


            };
        })();
        /** 数据处理器 */
        var DataHandler = (function () {
            return {
                /**
                 * 保存
                 * @param params
                 * @param callback
                 */
                save: function (params, callback) {
                    $.post(path + '/admin/basiconfig/factory/save', params, function (backData) {
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
