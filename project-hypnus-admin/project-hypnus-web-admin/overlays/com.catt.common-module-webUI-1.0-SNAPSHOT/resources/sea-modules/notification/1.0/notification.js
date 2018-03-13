/**
 * H5的桌面提醒
 * Created by runtime on 2016/4/21.
 */
define('notification/1.0/notification', ['$'], function (require, exports, module) {
    //提醒组件的版本
    var versionType = {
        oldV: 'oldV',
        newV: 'newV'
    };

    //提醒组件缓存块
    var notificationCache = {};

    function createNot(opt, version) {

        opt.id = opt.id ? opt.id : new Date().getTime() + '_' + Math.floor(Math.random() * 10000000);
        var notification = null;

        if (version == versionType.newV) {
            notification = new Notification(opt.title, {
                "icon": opt.iconUrl,
                "body": opt.content,
                tag:opt.id
            });

            notification.onshow = function (_this) {
                opt.onShow && opt.onShow(opt, _this);
            };
        } else {
            notification =
                window.webkitNotifications.createNotification(opt.iconUrl, opt.title, opt.content);
            notification.replaceId = opt.id;
            notification.display = function (_this) {
                opt.onShow && opt.onShow(opt, _this);
            }
        }

        notification.icon = opt.iconUrl;
        notification.body = opt.content;
        notification.title = opt.title;
        opt.id = opt.id ? opt.id : new Date().getUTCMilliseconds() + Math.random();
        notification.version = version;
        notification.options = opt;

        notification.onclick = function (_this) {
            opt.onClick && opt.onClick(opt, _this);
        };
        notification.onerror = function (_this) {
            delete notificationCache[opt.id];
            opt.onError && opt.onError(opt, _this);
        };
        notification.onclose = function (_this) {
            delete notificationCache[opt.id];
            opt.onClose && opt.onClose(opt, _this);
        };

        notificationCache[opt.id] = notification;

        return notification;
    }

    var notificationUtil = {
        /**
         * 打开提醒
         * @param options
         * {
         *   id:'提醒对象的ID，如果已经存在，则修改已经存在的提醒框',
         *   title:'标题',
         *   content:'提醒内容',
         *   iconUrl:'提醒的图标',
         *   onClick:'点击消息的回调函数',
         *   onShow:'消息显示的时候回调函数',
         *   onError:'消息未获取到授权或浏览器不支持此消息组件时的回调函数',
         *   onClose:'关闭消息时的回调函数'
         * }
         */
        show: function (options) {
            var opt = $.extend({title: '消息', iconUrl: null}, options);

            //chrome老版本
            if (window.webkitNotifications) {
                if (window.webkitNotifications.checkPermission() == 0) {

                    var isExist = notificationCache[opt.id||''];

                    var tempObject = createNot(opt, versionType.oldV);

                    if(!isExist) {
                        tempObject.show();
                    }

                } else {
                    notifiObj.requestPermission();
                }
            } else if ("Notification" in window) { //H5版本
                // 判断是否有权限
                if (Notification.permission === "granted") {
                    createNot(opt, versionType.newV);
                } else if (Notification.permission !== 'denied') { //如果没权限，则请求权限
                    Notification.requestPermission(function (permission) {
                        if (!('permission' in Notification)) {
                            Notification.permission = permission;
                        }
                        //如果接受请求
                        if (permission === "granted") {
                            createNot(opt, versionType.newV);
                        }
                    });
                }
            }else {
                console.warn("当前浏览器不支持[notification]特性");
            }
        },
        close: function (id) {
            notificationCache[id] && notificationCache[id].close();
        }
    };

    module.exports = notificationUtil;
});