define('admin/commonModule/mobile/appPublishLog/addEditAppPublishLog', ['$', 'adminSystem','loadingTip', 'msgBox', 'validate', 'uploader'], function (require, exports, module) {
    var $ = require('$');
    var adminSystem = require('adminSystem');
    var msgBox = require('msgBox');
    var validate = require('validate');
    var Uploader = require('uploader');
    var loadingTip = require('loadingTip');

    function AddEditAppPublishLog() {
    }

    AddEditAppPublishLog.prototype.init = function () {
        var self = this;


        self.platform = $("input[name='platform']:checked").val();
        self.forceUpdate = $("input[name='forceUpdate']:checked").val();

        //编辑不选择文件 如果是编辑 true  触发文件选择 | 新增 false
        self.editAndNoUploadFile = false;
        var idVal = $("#id").val();
        if (idVal > 0) {
            self.editAndNoUploadFile = true;
        }
        self.form = $('#form');
        self.form.validate({
            ignore: ".ignore",
            debug: true,
            messages: {},
            errorElement: 'span',
            errorClass: 'help-block',
            rules: {},
            errorPlacement: function (error, element) {
                // error.insertAfter(element);
            },
            highlight: function (element) {
                $(element).parent().addClass('has-error');
            },
            invalidHandler: function (event, validator) {
                for (v in validator.errorMap) {
                    var $form = $(event.currentTarget);
                    var $element = $form.find('[name="' + v + '"]');

                    var msg = $element.attr('data-rule-error-msg') || validator.errorMap[v];

                    if (msg) {
                        msgBox.warn(msg);
                    }

                    $element.focus();

                    break;
                }
            }, unhighlight: function (element) {
                $(element).parent().removeClass('has-error');
            }
        });
        self.uploadFileArr = [];
        self.bindEvent();
    };

    AddEditAppPublishLog.prototype.bindEvent = function () {
        var self = this;

        self.form.submit(function () {
            if (self.form.valid()) {
                if (self.platform == "2") {
                    if ($("#fileName").val() == "") {
                        msgBox.warn("请上传APK");
                        return false;
                    }
                    //编辑 如果用户不选择文件 不用上传文件
                    if (self.editAndNoUploadFile) {
                        var param = self.form.serializeArray();
                        $.post(path + '/admin/commonmodule/mobile/apppublishLog/addEdit', param, function (data) {
                            msgBox.tips(data.content);
                            if (data.type == 'success') {
                                window.history.back();
                            }
                        });
                        return;
                    }
                    loadingTip.show()
                    self.apkUploader.upload();
                } else {
                    var param = self.form.serializeArray();
                    $.post(path + '/admin/commonmodule/mobile/apppublishLog/addEdit', param, function (data) {
                        msgBox.tips(data.content);
                        if (data.type == 'success') {
                            window.history.back();
                        }
                    });
                }
            }
            return false;
        });

        self.upLoadSuccessFun = function (file, response) {
            if (response.type == 'success') {
                loadingTip.hide();
                var param = self.form.serializeArray();
                // 营业执照扫描照
                var attachment = response.result[0];
                var appPackagePath = attachment.attachmentId;
                param.push({name: 'appPackagePath', value: appPackagePath});

                $.post(path + '/admin/commonmodule/mobile/apppublishLog/addEdit', param, function (data) {
                    msgBox.tips(data.content);
                    if (data.type == 'success') {
                        window.history.back();
                    }
                });
                $(window).triggerHandler('resize');
            }
        };

        self.firstCall = true;
        if (self.platform == "1") {
            $("#uploadRow").hide();
        } else {
            self.initPicsUploader();
            self.firstCall = false;
        }
        $(".radio").change(function () {
            var platVal = $("input[name='platform']:checked").val();
            if (platVal != self.platform) {
                if (platVal == "1") { //iOS
                    $("#uploadRow").hide();
                } else { //Android
                    if (self.firstCall) {
                        self.initPicsUploader();
                        self.firstCall = false;
                    }
                    $("#uploadRow").show();
                }
                self.platform = platVal;
            }
            self.forceUpdate = $("input[name='forceUpdate']:checked").val();
        });
    };

    /**
     * 初始化上传组件
     */
    AddEditAppPublishLog.prototype.initPicsUploader = function () {

        var self = this;

        // 创建文件上传组件
        self.apkUploader = new Uploader({
            server: path + '/attachment/fileUpload.json', //上传服务地址
            pickerSelector: '#apkPicker', //选择文件按钮选择器
            multiplePick: false, //默认：false，是否支持多选
            autoUpload: false, //默认：false，是否选择后自动上传
            formData: {
                isDB: 1 // 上传文件时保存数据到附件表
            }, //默认：{}，上传附带其他表单参数
            fileFieldId: 'files', //默认：file，文件域名称
            accept: {//只允许apk文件
                title: 'Applications',
                extensions: 'apk',
                mimeTypes: 'application/vnd.Android.package-archive'
            },
            fileSingleSizeLimit: undefined, //默认：undefined，单文件大小限制
            onValidateError: function (errorType, errorMsg) {
                msgBox.warn(errorMsg);
            }, //文件校验不通过事件
            onFileUploadError: function (file, errorCode) {
                msgBox.warn(file.name+' 文件上传失败');
            }, //文件上传出错事件
            onFileUploadSuccess: self.upLoadSuccessFun, //文件上传成功事件
            onFileQueued: function (file) { //选择文件 加入队列

                self.editAndNoUploadFile = false;
                if (self.uploadFileArr.length > 0) {
                    var oilFile = self.uploadFileArr.shift();
                    self.apkUploader.removeFile(oilFile.id);
                }
                $("#fileName").val(file.name);
                self.uploadFileArr.push(file);
            }
        });
    };

    module.exports = new AddEditAppPublishLog();
});
seajs.use(['$', 'admin/commonModule/mobile/appPublishLog/addEditAppPublishLog'], function ($, addEditAppPublishLog) {
    $(function () {
        addEditAppPublishLog.init();
    });
});