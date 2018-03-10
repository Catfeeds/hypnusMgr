seajs.use(['$', 'uEeditor'], function($, UE) {
    var ue;
    $('#button1').on('click', function(){
        alert(ue.getContent());
    })
    $('#button2').on('click', function(){
        alert(ue.getContentTxt());
    })
    ue = UE.getEditor('container',{
        initialFrameWidth:1200,
        initialFrameHeight:300,
//        serverUrl: path + "/resources/project-modules/ueditor/1.4.3/jsp/controller.jsp",
        toolbars: [
            [
                'undo', //撤销
                'redo', //重做
                'bold', //加粗
                'fontfamily', //字体
                'fontsize', //字号
                'italic', //斜体
                'underline', //下划线
                'strikethrough', //删除线
                'subscript', //下标
                'fontborder', //字符边框
                'superscript', //上标
                'horizontal', //分隔线
                'formatmatch', //格式刷
                'forecolor', //字体颜色
                'backcolor', //背景色
                'pasteplain', //纯文本粘贴模式
                'removeformat', //清除格式
                'cleardoc'] ,//清空文档
            [
                'time', //时间
                'date', //日期
                'link', //超链接
                'unlink', //取消链接
                'paragraph', //段落格式
                'indent', //首行缩进
                'lineheight', //行间距
                'justifyleft', //居左对齐
                'justifyright', //居右对齐
                'justifycenter', //居中对齐
                'justifyjustify', //两端对齐
                'insertcode', //代码语言
                'spechars', //特殊字符
                'searchreplace', //查询替换
                'rowspacingtop', //段前距
                'rowspacingbottom' //段后距
            ],
            [
                'fullscreen', //全屏
                'snapscreen', //截图
                'simpleupload', //单图上传
                'insertimage', //多图上传
                'imagenone', //默认
                'imageleft', //左浮动
                'imageright', //右浮动
                'attachment', //附件
                'imagecenter', //居中
                'wordimage', //图片转存
                'edittip ', //编辑提示
                'customstyle', //自定义标题
                'autotypeset', //自动排版
                'touppercase', //字母大写
                'tolowercase', //字母小写
                'background', //背景
                'template', //模板
                'drafts'// 从草稿箱加载
            ]
        ]
    });

});