<!--PC公共头部:使用模块js进行加载处理-->
<%@ page language="java" pageEncoding="utf-8"%>
<%@ page isELIgnored="false" %>
<%@ include file="jstlLib.jsp" %>
<meta name="renderer" content="webkit">
<meta name="author" content="catt">
<meta name="copyright" content="catt">
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<!--当前系统使用的皮肤-->
<%--<c:set var="systemSkin" value="skin-blue-light"/>--%>
<%--<c:set var="systemSkin" value="skin-red-light"/>--%>
<c:set var="systemSkin" value="skin-hypnus"/>
<%--<c:set var="systemSkin" value="skin-black-light"/>--%>
<%--<c:set var="systemSkin" value="skin-cars"/>--%>
<%--<c:set var="systemSkin" value="skin-blue"/>--%>
<c:set var="systemBgClass" value="bg-gray-light"/>
<link rel="stylesheet" href="${path}/resources/AdminLTE/bootstrap/css/bootstrap.min.css">
<!-- Font Awesome -->
<link rel="stylesheet" href="${path}/resources/AdminLTE/font-awesome/4.6.3/css/font-awesome.min.css">
<!-- Ionicons -->
<link rel="stylesheet" href="${path}/resources/AdminLTE/ionicons/2.0.1/css/ionicons.min.css">
<!-- bootstrap datepicker -->
<link rel="stylesheet" href="${path}/resources/AdminLTE/plugins/datepicker/datepicker3.css">
<link rel="stylesheet" href="${path}/resources/AdminLTE/plugins/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker.min.css" media="screen">
<link rel="stylesheet" href="${path}/resources/AdminLTE/plugins/iCheck/all.css">
<link rel="stylesheet" href="${path}/resources/AdminLTE/plugins/iCheck/square/orange.css">
<link rel="stylesheet" href="${path}/resources/AdminLTE/plugins/select2/select2.min.css">
<%--<link rel="stylesheet" href="${path}/resources/AdminLTE/dist/css/AdminLTE.min.css">--%>
<link rel="stylesheet" href="${path}/resources/AdminLTE/dist/css/EXT_AdminLTE.min.css">
<!--项目自定义样式-->
<%--<link rel="stylesheet" href="${path}/resources/AdminLTE/dist/css/skins/_all-skins.css">--%>
<%--<link rel="stylesheet" href="${path}/resources/AdminLTE/dist/css/skins/skin-cars.css">--%>
<link rel="stylesheet" href="${path}/resources/AdminLTE/dist/css/skins/${systemSkin}.css">
<%--<link rel="stylesheet" href="${path}/resources/AdminLTE/dist/css/skins/skin-aaa.css">--%>
<%--<link rel="stylesheet" href="${path}/resources/AdminLTE/dist/css/skins/skin-blue-light.css">--%>
<link rel="stylesheet" href="${path}/resources/css/application.css">
<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->
<script type="text/javascript" src="${path}/resources/sea-modules/seajs/sea.js"></script>
<script src="${path}/resources/sea-modules/jquery/2.0.3/jquery.js"></script>
<script type="text/javascript" src="${path}/resources/sea-modules/seajs/seajs-preload.js"></script>
<script type="text/javascript" src="${path}/resources/project-modules/seajs/init.js"></script>
<script src="${path}/resources/AdminLTE/bootstrap/js/bootstrap.min.js"></script>
<script src="${path}/resources/AdminLTE/dist/js/app.min.js"></script>
<!-- bootstrap datepicker -->
<script src="${path}/resources/AdminLTE/plugins/iCheck/icheck.min.js"></script>
<script src="${path}/resources/AdminLTE/plugins/datepicker/bootstrap-datepicker.js"></script>
<script src="${path}/resources/AdminLTE/plugins/datepicker/locales/bootstrap-datepicker.zh-CN.js"></script>
<script src="${path}/resources/AdminLTE/plugins/select2/select2.full.min.js"></script>
<script src="${path}/resources/AdminLTE/plugins/select2/i18n/zh-CN.js"></script>
<script src="${path}/resources/AdminLTE/plugins/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker.min.js" charset="UTF-8"></script>
<script src="${path}/resources/AdminLTE/plugins/bootstrap-datetimepicker-master/js/locales/bootstrap-datetimepicker.zh-CN.js" charset="UTF-8"></script>
<c:set var="btnCharge" value="btn btn-sm bg-maroon"/>
<c:set var="btnDefault" value="btn btn-sm bg-gray"/>
<script type="text/javascript">
    var path = '${path}';
    var basePath = '${basePath}';
    // 文件基础路径
    var fileBasePath = path + "/attachment/file";

    seajs.use(['$'], function($) {
        $(document).ready(function () {

            $('#linkHome').click(function () {
                top.window.location.reload(true);
            });

            $('[autofocus="autofocus"]').focus();
            $.fn.select2.defaults.set("language", "zh-CN");
            $.fn.datepicker.defaults.language = 'zh-CN';
            $.fn.datetimepicker.defaults.language = 'zh-CN';

            if (top['Pace']) {
                $(document).ajaxStart(function () {
                    top['Pace'].restart();
                });
            }
            if (window != top && top.autoSizeFrame) {
                $(window).on('resize', function () {
                    top.autoSizeFrame();
                });
            }
        });
    });
</script>


