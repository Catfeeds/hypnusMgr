seajs.use(['$', 'msgBox', 'util', 'base64', 'rsa', 'jquery.json'],
    function ($, msgBox, util, base64, rsa) {

        /**
         * 初始化处理器
         */
        var InitHandler = function () {
            return {
                /** 初始化入口 */
                init: function () {
                    this.initPage();
                    this.initEvent();
                },


                /** 初始化界面  */
                initPage: function () {

                },
                /** 初始化事件 */
                initEvent: function () {
                    $('#submit').click(function () {
                        var param = util.FormUtil.getFormJson('#form');
                        if (!param.oldPassword) {
                            msgBox.warn("原密码不能为空");
                            $('#oldPassword').focus();
                            return;
                        }

                        if (!param.newPassword) {
                            msgBox.warn("新密码不能为空");
                            $('#newPassword').focus();
                            return;
                        }

                        if (!param.new2Password) {
                            msgBox.warn("新密码不能为空");
                            $('#new2Password').focus();
                            return;
                        }

                        if (param.newPassword != param.new2Password) {
                            msgBox.warn("两次密码输入不一致");
                            return;
                        }

                        /**
                         * 加密传输密码数据
                         */
                        DataHandler.getRasKey(function (backData) {
                            var modulus = backData.result.modulus;
                            var exponent = backData.result.exponent;
                            var rsaKey = new rsa.RSAKey();
                            rsaKey.setPublic(base64.b64tohex(modulus), base64.b64tohex(exponent));
                            param.oldPassword = base64.hex2b64(rsaKey.encrypt(param.oldPassword));
                            param.newPassword = base64.hex2b64(rsaKey.encrypt(param.newPassword));

                            DataHandler.modifyPassword(param, function (data) {
                                msgBox.tips(data.content, 1, function () {
                                    if (data.type == "success") {
                                        msgBox.exWindow.close($.toJSON(data));
                                    }
                                });

                            });
                        });
                    });
                }
            }
        }();

        /**
         * 事件处理器
         */
        var EventHandler = function () {
            return {}
        }();


        /**
         * 数据处理器
         */
        var DataHandler = function () {
            return {
                /**
                 * 获取RAS加密数据
                 * @param param
                 * @param callback
                 */
                getRasKey: function (callback) {
                    $.post(path + '/systemMgr/pub/common/getRasKey', null, function (backData) {
                        callback(backData);
                    });
                },
                /**
                 * 修改密码
                 * @param param
                 * @param callback
                 */
                modifyPassword: function (param, callback) {
                    $.post(path + '/admin/economyMgr/modifyPassword', param, function (backData) {
                        callback(backData);
                    });
                }

            }
        }();

        $(function () {
            InitHandler.init();
        })
    });
