/**
 * Created by Sebarswee on 2015/6/29.
 */
define('{projectModuleBase}/webuploader/0.1.5/baiduUploader', ['$', '{projectModuleBase}/webuploader/0.1.5/webuploader.css', '{projectModuleBase}/webuploader/0.1.5/webuploader'], function (require, exports, module) {
        require('{projectModuleBase}/webuploader/0.1.5/webuploader');
        module.exports = {
            create : function (options) {
                return WebUploader.create($.extend({
                    swf : 'Uploader.swf'
                }, options));
            }
        };
    }
);