/**
 *<pre>
 * Description: PC端模块化必须使用的js文件
 * Author：Zhang zhongtao
 * Date：2014-11-01 13:55
 *</pre>
 */
define('common/pc/2.0/base', ['$', 'cookie/1.4.1/cookie', 'msgBox', 'loadingTip/2.0/pc/loadingTip'], function (require, exports, module) {
    //提示组件
    var msgBox = require('msgBox');
    var loadingTip = require('loadingTip/2.0/pc/loadingTip');
    var cookie = require('cookie/1.4.1/cookie');
    var isTipBoxInTop = true;
    if (typeof window['loadingTip'] === 'undefined') {
        window['loadingTip'] = loadingTip;
    }

    function getWindow() {
        if (top == window || !isTipBoxInTop) {
            return window;
        } else {
            return top;
        }
    }

    function getMsgBox() {
        if (getWindow().msgBox) {
            return getWindow().msgBox;
        }

        return msgBox;
    }

    function getLoadingTip() {
        if (getWindow().loadingTip) {
            return getWindow().loadingTip;
        }

        return loadingTip;
    }

    if (typeof($cfg) == 'undefined') {
        window.$cfg = {eCont: {}};
    }

    if (typeof($pdp) == 'undefined') {
        window.$pdp = {};
    }
    if (typeof($FF) == 'undefined') {
        window.$FF = {};
    }

    //region 扩展jquery的请求方式，添加delete，put 请求，避免restful协议使用
    $.each(["delete", "put"], function (i, method) {
        $[method] = function (url, data, callback, type) {
            // shift arguments if data argument was omitted
            if ($.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }

            return $.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    });
    //endregion

    //region 发送请求弹出加载提示
    var loadingTimeout = null;
    $(document).ajaxStart(function () {
        clearTimeout(loadingTimeout);
        loadingTimeout = setTimeout(function () {
            getLoadingTip().show();
        }, 3000);
    });

    $(document).ajaxStop(function () {
        clearTimeout(loadingTimeout);
        getLoadingTip().hide();
    });

    //endregion

    //region 登陆超时、令牌失效处理
    $(window).ajaxComplete(function (event, request, settings) {
        var loginStatus = request.getResponseHeader("loginStatus");
        var tokenStatus = request.getResponseHeader("tokenStatus");

        if (request.status == 401) {
            getMsgBox().tips("登录超时或资源未授权，2秒后自动跳转到登陆页面");
            window.setTimeout(function () {
                var target = null;
                if (top == window) {
                    target = window;
                } else {
                    target = top;
                }

                target.location.reload(true);

            }, 2000);
        } else if (request.status == 412) {
            var token = $.cookie("token");
            if (token != null) {
                $.extend(settings, {
                    global: false, headers: {token: token}
                });
                $.ajax(settings);
            }
        }
    });

    // 令牌
    $(document).ajaxSend(function (event, request, settings) {
        if (!settings.crossDomain && settings.type != null && settings.type.toLowerCase() == "post") {
            var token = $.cookie("token");
            if (token != null) {
                request.setRequestHeader("token", token);
            }
        }
    });

    //endregion

    //region 失败错误处理
    $(document).ajaxError(function (event, xhr, options, exc) {
        if (xhr.status == 0) {
            try {
                getLoadingTip().hide();
                console.log('Ajax请求未发送：' + options.url);
            } catch (e) {
            }
        } else {
            getMsgBox().tips('操作失败!', 1.5);
        }
    });

    /**
     * 超出范围的长整形转换为字符串
     * @param obj
     */
    function longNumberHandler(obj) {
        if (!obj) {
            return;
        }

        for (var o in obj) {
            if (obj[o] instanceof Object) {
                // longNumberHandler(obj[o]);
            } else {
                if (obj[o] && $.isNumeric(obj[o])) {
                    //超出范围的长整形转换为字符串
                    if (obj[o] > 9007199254740992 && obj[o] % 1 === 0) {
                        obj[o] = obj[o].toFixed(0);
                    }
                }
            }
        }
    }

    // 针对调用成功，但服务器返回的结果中包含失败操作的处理(message.type == error)
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        var oldSuccessFn = options.success;
        options.success = function (data) {
            // longNumberHandler(data);
            //request.getResponseHeader("exception");
            if (data && data['type'] && data.type == 'error') {

                var errorMsg = data.content ? data.content : '请求失败!';

                $(window.top).triggerHandler('ajaxError', data);

                getMsgBox().tips(errorMsg, 1.5);
            } else {
                try {
                    //捕捉业务类异常
                    oldSuccessFn(data);
                } catch (error) {
                    //console.log('', error);
                }
            }
        }
    });

    // 针对服务器返回的数据进行转义，避免xss漏洞
    $.ajaxSetup({
        dataFilter: function (data, type) {
            var $id = '___xssVal';
            var $xssVal = $('#' + $id);

            if (!$xssVal.length) {
                $('body').append('<label id="' + $id + '" style="display: none;"></label>');
                $xssVal = $('#' + $id);
            }

            //超长整数转为字符串
            data = data.replace(/("[a-zA-Z0-9_]+")(\s?:\s?)([0-9]{15,})/g, function(word){
                var temp = word.replace(/\s+/gi, '');

                var kvs = temp.split(':');

                if (kvs.length >= 2 && kvs[1]) {
                    var numVal = kvs[1];
                    //超出范围的长整形转换为字符串
                    if ((numVal * 1) >= 9007199254740992 && numVal % 1 === 0) {
                        return kvs[0] + ' : ' + '"' + numVal + '"';
                    }
                }

                return word;
            });

            $xssVal.text('').text(data);

            return $xssVal.html();
        }
    });
    //endregion
});