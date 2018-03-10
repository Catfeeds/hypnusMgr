/**
 * 支付模块
 */
define('attachment/1.0/attachment', [ '$', 'msgBox' ], function(require, exports, module) {
    /**
     * 弹出层组件
     */
    var msgBox = require('msgBox');
    /**
     * 附件管理控件
     */
    var attachment = {
        /**
         * 调用上传控件
         * @param callBackFn(file) 回调函数，上传成功时执行返回文件信息
         *               (file结构：
         *                link    - 文件链接，需拼接项目config.properties中的file.service.address
         *                preview - 文件预览图，文件的base64码，图片文件返回缩略图，其他文件返回文件图标
         *                name    - 文件名)
         * @param paramMap 传入参数，会拼接到链接上
         *               （目前支持参数：
         *                 createrId   - 上传人Id
         *                 createrName - 上传人名称）
         */
        uploadFile : function (callBackFn, paramMap) {
            var options = {
                url : function (url, param) {
                    if (param) {
                        var str = '';
                        for (var i in param) {
                            str += (str.length == 0 ? '' : '&') + i + '=' + param[i];
                        }
                        url += '?' + str;
                    }
                    return url;
                }(path + '/attachment/uploadFile.html', paramMap),
                title : '上传文件',
                width : '340px',
                height : '226px',
                close : function (data) {
                    if (data) {
                        callBackFn && callBackFn(data);
                    }
                }
            };
            msgBox.exWindow.open(options);
        }

    };

    module.exports = attachment;
});