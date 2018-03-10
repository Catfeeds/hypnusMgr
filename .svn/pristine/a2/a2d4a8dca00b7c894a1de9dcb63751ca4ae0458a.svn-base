// 因权限不足打开登录界面时刷新整个页面
if (top != window) {
    top.window.location.href = path + "/login";
}
// JavaScript Document
$(document).ready(function (e) {
    pageSize();

    //窗口重置监听。
    $(window).bind("resize", pageSize);

});

function pageSize() {
    var loginPageSize = $(window).height();//用一个变量获取浏览器高度,然后减去中间部分高度后剩余高度除以2得到头部的高度
    var pageTop = (loginPageSize - $("div.xw_loginDiv").height()) / 2;
    $("div.xw_loginDiv").css({"padding-top": pageTop});//头部高度赋予中间部分的padding-top，完成页面高度自适应。
}

seajs.use(['$', 'msgBox', 'validate', 'base64', 'util', 'rsa', 'cookie', 'jquery.json'], function ($, msgBox, validate, base64, util, rsa) {

    var InitHandler = function () {
        return {
            init: function () {
                // 用户名输入框获取焦点
                $("#account").focus();

                // 更换验证码
                $('#captchaImage').click(function () {
                    $('#captchaImage').each(function () {
                        $(this).attr("src", path + "/guest/common/captcha?d=" + (new Date()).valueOf());
                    });
                }).click();

                $('#captchaImage').click();

                InitHandler.bindEvent();
            },
            bindEvent: function () {
                $('#login').bind('click', EventHandler.login);
                $(document).bind("keydown", function (e) {
                    // 兼容FF和IE和Opera
                    var theEvent = e || window.event;
                    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
                    if (code == 13) {
                        //回车执行查询
                        $("#login").click();
                    }
                });
            }
        }
    }();

    var EventHandler = function () {
        return {
            login: function () {
                var $form = $("#loginForm");
                $form.validate({
                    rules: {
                        username: {required: true, required4PlaceHolder: true},
                        password: {required: true, required4PlaceHolder: true},
                        captcha: {required: true, required4PlaceHolder: true}
                    },
                    messages: {
                        username: "请输入您的账号！",
                        password: "请输入您的密码！",
                        captcha: "请输入验证码！"
                    },
                    ignore: ".ignore",
                    errorPlacement: function (error, element) {
                    },
                    invalidHandler: function (event, validator) {
                        for (var i in validator.errorList) {
                            msgBox.tips(validator.errorList[i].message, 1, function () {
                                $(validator.errorList[i].element).focus();
                            });
                            return false;
                        }
                    }
                });

                if ($form.valid()) {
                    var modulus = $form.find("input[name='modulus']").val();
                    var exponent = $form.find("input[name='exponent']").val();

                    // 获取密码后加密
                    var $password = $("#password");
                    var rsaKey = new rsa.RSAKey();
                    rsaKey.setPublic(base64.b64tohex(modulus), base64.b64tohex(exponent));
                    $("#enPassword").val(base64.hex2b64(rsaKey.encrypt($password.val())));
                    $password.val('');

                    $.post(path + "/login", $form.serializeArray(), function (data) {
                        if (data.type == 'success') {
                            window.location.href = path + '/admin/index.html';
                        } else if (data.type == 'warn') {
                            msgBox.tips(data.content);
                            $form.find("input[name='exponent']").val(data.result.exponent);
                            $form.find("input[name='modulus']").val(data.result.modulus);
                            $("#captcha").val('');
                            $("#loginForm input[name='username']").focus();
                            $("#captchaImage").click();
                            $('#password').blur();
                            $('#captcha').blur();
                        }
                    });
                }
            }

        }
    }();

    $(function () {
        InitHandler.init();
    })
});



