seajs.use(['msgBox', 'loadingTip', 'cookie', 'jquery.json'], function (msgBox, loadingTip) {
    /** 禁止上传的文件类型 */
    var disable_exts = {
        'bat': 1,
        'sh': 1,
        'exe' : 1
    };

    //var param = {
    //    scene : "",
    //    //maxUpSize : 1024*1024*5, //最大5MB
    //    limitType : "image"
    //};

    /*定义允许上传的文件扩展名*/
    var extMap = {
        image : "gif,jpg,jpeg,png,bmp",
        flash : "swf,flv",
        media : "swf,flv,mp3,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb,mp4,mov",
        file : "doc,docx,xls,xlsx,ppt,htm,html,txt,zip,rar,gz,bz2"
    };

    /** 是否已选择文件 */
    var hasFile = false;
    /** 文件选择绑定事件处理 */
    $('#uploadfile').change(function () {
        var filename = $(this).val().replace(/(.*\\)*([^.]+)/ig,"$2");
        if (filename) {
            var typename = filename.indexOf('.') != -1 ? filename.replace(/(.*\.)*([^.]+)/ig,"$2") : '';
            var fileExt = typename.toLowerCase(); //文件后缀名

            if (!disable_exts[fileExt]) {
                if(param.limitType != ""){
                    var limitType = param.limitType;
                    var allowType = eval("extMap." + limitType);
                    if(allowType.indexOf(fileExt) != -1){
                        //存在
                    }else{
                        msgBox.tips('所选文件不支持，只允许' + allowType + "格式");
                        return;
                    }
                }
                $('.notFile').hide();
                $('.hasFile').show();
                $('.filename').html(filename);
                hasFile = true;
            }else{
                msgBox.tips('所选文件不支持，请重新选择');
            }


        }
    });
    /** 上传按钮事件处理 */
    $('#btnupload').click(function () {
        if (!hasFile) {
            msgBox.tips('请先选择文件');
            return ;
        }
        // 设置回调函数
        window['UploadCallBack'] = UploadCallBack;
        $('input[name="token"]').val($.cookie('token'));
        $('#uploadform').submit();
        loadingTip.show()
    });
    // 取消按钮
    $('#btncancel').click(function () {
        msgBox.exWindow.close(false);
    });

    /**
     * 上传成功后的回调处理
     * @param responseData 返回处理结果，成功则返回文件信息
     * {
     *     content : 处理结果描述
     *     type    : 处理结果类型
     *     result  : 成功时返回文件信息
     *               (link-文件链接，需拼接项目config.properties中的file.service.address
     *                preview-文件预览图，文件的base64码，图片文件返回缩略图，其他文件返回文件图标
     *                name-文件名)
     * }
     */
    function UploadCallBack (responseData) {
        loadingTip.hide();
        var data = typeof responseData == 'string' ? $.evalJSON(responseData) : responseData;
        msgBox.tips(data.content, 1, function () {
            if (data.type == 'success') {
                msgBox.exWindow.close(data);
            }
        });
    }
});