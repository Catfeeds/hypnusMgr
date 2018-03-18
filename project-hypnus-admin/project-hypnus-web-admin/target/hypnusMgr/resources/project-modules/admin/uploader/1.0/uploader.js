/**
 * 上传模块
 */
define('{projectModuleBase}/admin/uploader/1.0/uploader',
    ['$', 'baiduUploader', '{projectModuleBase}/admin/uploader/1.0/uploader.css'], function (require, exports, module) {
        var $ = require('$');
        require('baiduUploader');

        /**
         * 初始化百度上传器对象
         * @param uploader
         * @param option
         */
        function setUploadOption(uploader, option) {
            uploader.baiduUploader = WebUploader.create({
                // 上传服务地址
                server: option.server,
                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: {
                    id: option.pickerSelector,
                    multiple: option.multiplePick || false
                },
                // [可选] [默认值：false] 设置为 true 后，不需要手动调用上传，有文件选择即开始上传。
                auto: option.autoUpload,

                // 文件类型过滤
                accept: option.accept,
                fileVal: option.fileFieldId,
                formData: option.formData,
                method: option.method,
                // [可选] [默认值：undefined] 验证文件总数量, 超出则不允许加入队列。
                fileNumLimit: option.fileNumLimit,
                // [可选] [默认值：undefined] 验证文件总大小是否超出限制, 超出则不允许加入队列。
                fileSingleSizeLimit: option.fileSingleSizeLimit,
                // [可选] [默认值：undefined] 验证文件总大小是否超出限制, 超出则不允许加入队列。
                fileSizeLimit: option.fileSizeLimit,
                // [可选] [默认值：false] 是否允许选择重复文件
                duplicate: (option.duplicate === false ? false : true),
                // [可选] [默认值：false] 是否要分片处理大文件上传。
                chunked: false,
                // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
                resize: false,
                compress: false
            });

            // 当文件被加入队列以后触发。
            uploader.baiduUploader.onFileQueued = option.onFileQueued;
            // 当文件被移除队列后触发。
            uploader.baiduUploader.onFileDequeued = option.onFileDequeued;
            uploader.baiduUploader.onReset = option.onReset;
            uploader.baiduUploader.onUploadError = option.onFileUploadError;
            uploader.baiduUploader.onUploadSuccess = function (file, response) {
                //超长整数转为字符串
                var newRaw = response._raw.replace(/("[a-zA-Z0-9_]+")(\s?:\s?)([0-9]{15,})/g, function (word) {
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

                var newRes = $.parseJSON(newRaw);
                option.onFileUploadSuccess && option.onFileUploadSuccess(file, newRes);
            };
            uploader.baiduUploader.onError = function (errorType) {
                var errorMsg = "文件无法加入上传队列";
                if (errorType == 'Q_EXCEED_NUM_LIMIT') {
                    errorMsg = "队列中文件数量达到上限";
                } else if (errorType == 'Q_EXCEED_SIZE_LIMIT') {
                    errorMsg = "队列中文件总大小达到上限";
                } else if (errorType == 'Q_TYPE_DENIED') {
                    errorMsg = "所选文件的类型不符合要求";
                } else if (errorType == 'F_DUPLICATE') {
                    errorMsg = "重复文件";
                }

                option.onValidateError && option.onValidateError(errorType, errorMsg);
            };
            uploader.baiduUploader.onUploadFinished = option.onUploadFinished;

            /*
             * on还可以用来添加一个特殊事件all, 这样所有的事件触发都会响应到。
             * 同时此类callback中的arguments有一个不同处， 就是第一个参数为type，记录当前是什么事件在触发。
             * 此类callback的优先级比较低，会在正常callback执行完后触发。
             */
            uploader.baiduUploader.on('all', function (type, arg1, arg2) {
                // console.log('上传all事件【type='+type+', arg1='+arg1+', arg2='+arg2+'】');
            });
        }

        /**
         * 创建上传器对象
         * @param option
         *  {
         *      server: '', // 上传服务地址
         *      pickerSelector: '', // 选择文件按钮选择器
         *      multiplePick: false, // 默认：false，是否支持多选
         *      autoUpload: false, // 默认：false，是否选择后自动上传
         *      formData: {}, // 默认：{}，上传附带其他表单参数
         *      fileFieldId: 'file', // 默认：file，文件域名称
         *      method: 'POST', // 默认：POST，上传方法类型
         *      accept: { // 默认：undefined，上传文件类型
         *          title : 'Images', // 文字描述
         *          extensions : 'jpg,jpeg,bmp,png', // 允许的文件后缀，不带点，多个用逗号分割
         *          mimeTypes : 'image/*' // 多个用逗号分割
         *      },
         *      fileNumLimit: undefined, // 默认：undefined，队列文件总数量限制
         *      fileSingleSizeLimit: undefined, // 默认：undefined，单文件大小限制
         *      fileSizeLimit: undefined, // 默认：undefined，队列文件总大小限制
         *      duplicate: true, // 默认：true，是否允许选择重复文件
         *      onFileQueued: function(file) {}, // 文件加入队列事件
         *      onFileDequeued: function(file) {}, // 文件被移除队列事件,执行removeFile方法才触发
         *      onReset: function() {}, // 队列重置事件,执行reset方法才触发
         *      onFileUploadError: function(file, errorCode) {}, // 文件上传出错事件
         *      onFileUploadSuccess: function(file, response) {}, // 文件上传成功事件
         *      onValidateError: function(errorType, errorMsg) {}, // 文件校验不通过事件
         *      onUploadFinished: function() {} // 所有文件上传结束事件
         *  }
         * @constructor
         */
        function Uploader(option) {
            this.option = option;
            setUploadOption(this, option);
        }

        /**
         * 重置文件队列
         */
        Uploader.prototype.reset = function () {
            this.baiduUploader.reset();
        };

        /**
         * 移除队列中指定文件
         * @param fileId 文件对象id
         */
        Uploader.prototype.removeFile = function (fileId) {
            this.baiduUploader.removeFile(fileId, true);
        };

        /**
         * 生成缩略图
         * @param file 文件对象
         * @param callback 结果回调
         * @param width 宽度
         * @param height 高度
         */
        Uploader.prototype.makeThumb = function (file, callback, width, height) {
            this.baiduUploader.makeThumb(file, callback, width, height);
        };

        /**
         * 执行上传队列中的文件
         */
        Uploader.prototype.upload = function () {
            this.baiduUploader.upload();
        };

        module.exports = Uploader;
    });