define('admin/commonModule/mobile/loadingPage/addEditloadingPage', ['$', 'msgBox', 'adminSystem', 'attachment', 'validate', 'uploader'], function (require, exports, module) {
    var $ = require('$');
    var msgBox = require('msgBox');
    var validate = require('validate');
    var adminSystem = require('adminSystem');
    var attachment = require('attachment');
    var Uploader = require('uploader');
    var resource = {};

    function AddEditloadingPage() {
    }

    /**
     * 初始化
     */
    AddEditloadingPage.prototype.init = function () {
        var self = this;
        self.form = $('#form');

        self.bindEvent();
        self.formValidate();
        self.initPicsUploader();
    };

    /**
     * 事件绑定
     */
    AddEditloadingPage.prototype.bindEvent = function () {
        var self = this;

        $('#startDate').datepicker({
            format: "yyyy-mm-dd"
        });

        $('#endDate').datepicker({
            format: "yyyy-mm-dd"
        });

        self.form.submit(function () {
            if (self.form.valid()) {
                var startDate = $('#startDate').val();
                var endDate = $('#endDate').val();
                if (endDate < startDate) {
                    msgBox.tips("开始时间超过结束时间");
                    return false;
                }

                var params = self.form.serializeArray();

                $.post(path + '/admin/commonmodule/mobile/loadingpageset/checkDateRight', params, function (data) {

                    if (data.type == 'warn') {
                        msgBox.warn("请校验所选时间段，与其它启动页时间段冲突");
                        return false;
                    }

                    if ($("#showPic").attr("initData") == "true" || self.picId) { //如果编辑
                        params.push({name: 'loadingPageId', value: self.picId});
                    } else {
                        msgBox.warn('请上传启动页图片');
                        return false;
                    }

                    var endDateTempDic = params[2];
                    if (endDateTempDic.name == "endDate") {
                        endDateTempDic.value = endDateTempDic.value + " 23:59:59";
                    }
                    $.post(path + '/admin/commonmodule/mobile/loadingpageset/addEdit', params, function (data) {
                        msgBox.tips(data.content);
                        if (data.type == 'success') {
                            window.history.back();
                        }
                    });
                });
            }
        });
        $('#btnCancle').click(function () {
            window.history.back();
        });
    };

    /**
     * 表单验证规范
     */
    AddEditloadingPage.prototype.formValidate = function () {
        var self = this;
        self.form.validate({
            //忽略某些元素不验证
            ignore: ".ignore",
            //如果这个参数为true，那么表单不会提交，只进行检查，调试时十分方便
            debug: true,
            //messages：自定义的提示信息，key:value 的形式，key 是要验证的元素，value 可以是字符串或函数。
            messages: {},
            // 用什么标签标记错误，默认是 label，可以改成 em。
            errorElement: 'span',
            //	指定错误提示的 css 类名，可以自定义错误提示的样式。
            errorClass: 'help-block',
            //自定义规则，key:value 的形式，key 是要验证的元素，value 可以是字符串或对象。
            rules: {},
            //更改错误信息显示的位置s
            errorPlacement: function (error, element) {
                // error.insertAfter(element);
            },
            highlight: function (element) {
                $(element).parent().addClass('has-error');
            },
            invalidHandler: function (event, validator) {
                $('#btnSave').button('reset');
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
    };

    /**
     * 初始化相关图片上传组件
     */
    AddEditloadingPage.prototype.initPicsUploader = function () {
        var self = this;
        // 创建文件上传组件
        self.picsUploader = new Uploader({
            server: path + '/attachment/fileUpload.json', //上传服务地址
            pickerSelector: '#addPic', //选择文件按钮选择器
            multiplePick: false, //默认：false，是否支持多选
            autoUpload: true, //默认：false，是否选择后自动上传
            formData: {
                isDB: 1 // 上传文件时保存数据到附件表
            }, //默认：{}，上传附带其他表单参数
            fileFieldId: 'files', //默认：file，文件域名称
            fileSingleSizeLimit: undefined, //默认：undefined，单文件大小限制
            // 文件加入队列事件
            onFileQueued: function (file) {
                layer.load();
            },
            onValidateError: function (errorType, errorMsg) {
                msgBox.warn("图片校验失败");
            }, //文件校验不通过事件
            onFileUploadError: function (file, errorCode) {
                msgBox.warn("图片上传失败");
            }, //文件上传出错事件
            onFileUploadSuccess: function (file, response) {
                if (response.type == 'success') {
                    var attachment = response.result[0];
                    resource[attachment.fileId] = attachment;
                    self.picId = attachment.attachmentId;
                    $('#showPic').attr('src', attachment.url);
                }
            },//文件上传成功事件
            //所有文件上传结束事件
            onUploadFinished: function () {
                layer.closeAll('loading');
            }
        });
    };

    module.exports = new AddEditloadingPage();
});
seajs.use(['$', 'admin/commonModule/mobile/loadingPage/addEditloadingPage'], function ($, addEditloadingPage) {
    $(function () {
        addEditloadingPage.init();
    });
});

