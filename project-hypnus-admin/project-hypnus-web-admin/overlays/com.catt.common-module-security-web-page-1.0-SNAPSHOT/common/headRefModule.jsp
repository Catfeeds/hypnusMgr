<!--PC公共头部:使用模块js进行加载处理-->
<%@ page language="java" pageEncoding="utf-8"%>
<%@ page isELIgnored="false" %>
<%@ include file="jstlLib.jsp" %>
<meta http-equiv="expires" content="0"/>
<meta http-equiv="Pragma" content="no-cache"/>
<meta http-equiv="Cache-Control" content="no-cache"/>
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="renderer" content="webkit">
<meta name="author" content="catt"/>
<meta name="copyright" content="catt"/>
<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
<%--<link rel="stylesheet" type="text/css" href="${path}/resources/safeMgr/css/adminAtm.css" />--%>
<script type="text/javascript" src="${path}/resources/js/jquery-1.11.1.min.js"></script>
<script type="text/javascript">
    var path = '${path}';
</script>

<script type="text/javascript" src="${path}/resources/sea-modules/seajs/sea.js"></script>
<script type="text/javascript" src="${path}/resources/sea-modules/seajs/seajs-preload.js"></script>
<script type="text/javascript" src="${path}/resources/project-modules/seajs/init.js"></script>

<!--和普乐项目私有-->
<!--日历控件引入-->
<script type="text/javascript" src="${path}/resources/sea-modules/My97DatePicker/4.8/WdatePicker.js"></script>

<!--直接引入easyui全量样式和js-->
<%--<link rel="stylesheet" type="text/css" href="${path}/resources/sea-modules/easyui/1.4.1/themes/bootstrap/easyui.css" />--%>
<!--直接引入catt-easyui全量样式和js-->
<%--<link rel="stylesheet" type="text/css" href="${path}/resources/skincatt/skin/blueGreen/easyui.css" />--%>
<script type="text/javascript" src="${path}/resources/js/jquery.easyui.min.js"></script>
<!--和普乐项目私有-->

