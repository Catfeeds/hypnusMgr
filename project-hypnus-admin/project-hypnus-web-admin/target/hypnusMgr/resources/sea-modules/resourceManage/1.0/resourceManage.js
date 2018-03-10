/**
 * 资源管理
 */
define('resourceManage/1.0/resourceManage', ['$', 'layer/1.8.5/layer'], function (require, exports, module) {
    var layer = require('layer/1.8.5/layer');
    /**
     * 资源管理类
     */
    var resourceManage = {
        /**
         * 打开资源管理界面
         * @param option 参数
         * @param callbackFn 回调处理
         */
		openManage : function (option, callbackFn) {
            var $width = function (o) {
                if (o && o.width) {
                    return o.width;
                }
                //var width = window.screen.availWidth * 0.6;
                var width = 820; //默认宽度
                return width;
            }(option);
            var $height = function (o) {
                if (o && o.height) {
                    return o.height;
                }
                return window.screen.availHeight * 0.8;
            }(option);
            var $url = path + '/resourceManage/toMaterialMgr.html?filetype=' + option.filetype;
		    $.layer({
		        type: 2,
		        title: [
		            '资源管理',
		            'background:#2B2E37; height:40px; color:#fff; border:none;' //自定义标题样式
		        ],
		        border:[10],
		        area: [$width, $height],
		        iframe: {src: $url},
		        btns: 2,
		        btn: ['确定', '取消'],
		        yes: function(index){
		        	if (callbackFn) {
                        seajs.use(['jquery.json'], function () {
                            var jsonData = $.evalJSON(layer.getChildFrame('#result', index).val());
                            var resultData = jsonData instanceof Array ? jsonData : [jsonData];
                            if (resultData.length < 1) {
                                layer.msg('未选择任何文件', 1);
                                return false;
                            }
                            layer.close(index);
                            callbackFn(resultData);
                        });
		        	}
                    else {
                        layer.close(index);
                    }
		        }
		    });
		},

        /**
         * 打开上传界面
         */
        openUpload : function (option, callbackFn) {
            var $aspectScale = function (o) {
                if (o && o.wscale && o.hscale) {
                    return [o.wscale, o.hscale];
                }
                return ['', ''];
            }(option);
            var $type = function (o) {
                if (o && o.filetype) {
                    return o.filetype;
                }
                return 1;
            }(option);
            var $group = function (o) {
                if (o && o.groupId) {
                    return o.groupId;
                }
                return 0;
            }(option);
            var $width = function (o) {
                if (o && o.width) {
                    return o.width;
                }
                //var width = window.screen.availWidth * 0.6;
                var width = 820; //默认宽度
                return width;
            }(option);
            var $height = function (o) {
                if (o && o.height) {
                    return o.height;
                }
                return window.screen.availHeight * 0.8;
            }(option);
            var $url = path + '/resourceManage/toMaterialUpload.html?' +
                'type=' + $type + '&group=' + $group +
                '&wscale=' + $aspectScale[0] + '&hscale=' + $aspectScale[1];
            $.layer({
                type: 2,
                title: [
                    '上传附件',
                    'background:#2B2E37; height:40px; color:#fff; border:none;' //自定义标题样式
                ],
                border:[10],
                area: [$width, $height],
                iframe: {src: $url},
                btns: 2,
                btn: ['确定', '取消'],
                yes: function(index){
                    if (callbackFn) {
                        seajs.use(['jquery.json'], function () {
                            var jsonData = $.evalJSON(layer.getChildFrame('#result', index).val());
                            var resultData = jsonData instanceof Array ? jsonData : [jsonData];
                            if (resultData.length < 1) {
                                layer.msg('未选择任何文件', 1);
                                return false;
                            }
                            layer.close(index);
                            callbackFn(resultData);
                        });
                    }
                    else {
                        layer.close(index);
                    }
                }
            });
        }
    };
    module.exports = resourceManage;
});