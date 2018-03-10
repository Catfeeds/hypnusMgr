seajs.use(['$', 'msgBox', 'util', 'jquery.json'],
    function ($, msgBox, util) {
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
                    EventHandler.findPersonInfo();
                },
                /** 初始化事件 */
                initEvent: function () {
                    //修改密码
                    $('#modifyPassword').click(function () {
                        msgBox.exWindow.open({
                            title: '修改密码',
                            width: '550px',
                            height: '400px',
                            url: path + "/admin/economyMgr/toModifyPassword.html",
                            close: function (data) {
                                if ($.parseJSON(data).type == "success") {
                                    msgBox.tips("修改密码成功，请重新登录", 2, function(){
                                        window.location.href = path + "/logout";
                                    })
                                }
                            }
                        });
                    });
                }
            }
        }();

        /**
         * 事件处理器
         */
        var EventHandler = function () {
            return {
                /**获取个人信息*/
                findPersonInfo: function () {
                    DataHandler.findPersonInfo(function (backData) {
                        $('#name').html(backData.name);
                        if(backData.sex == "1"){
                            $('#sex').html("女");
                        }else if(backData.sex == "2"){
                            $('#sex').html("男");
                        }
                        $('#mobile').html(backData.phone);
                        $('#inEmail').html(backData.inEmail);
                        $('#account').html(backData.loginAccount);
                        $('#roleNames').html(backData.roleNames);
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
                 * 获取登陆用户信息
                 * @param callback
                 */
                findPersonInfo: function (callback) {
                    $.post(path + '/admin/economyMgr/findPersonInfo', null, function (backData) {
                        callback(backData);
                    });
                }

            }
        }();

        $(function () {
            InitHandler.init();
        })
    });
