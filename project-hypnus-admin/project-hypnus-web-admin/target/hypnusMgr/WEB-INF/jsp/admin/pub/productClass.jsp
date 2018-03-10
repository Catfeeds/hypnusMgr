<%--
  Created by IntelliJ IDEA.
  User: Admin
  Date: 2017/1/11
  Time: 9:31
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/common/headModule.jsp" %>
    <title>商品分类设置</title>
    <link type="text/css" href="${path}/resources/css/common.css" rel="stylesheet" />
    <link type="text/css" href="${path}/resources/css/fenlei.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="${path}/resources/css/zTreeStyle/zTreeStyle.css">
    <script src="${path}/resources/js/common_ctr.js" type="text/javascript"></script>
    <%--<script src="${path}/resources/js/member.js" type="text/javascript"></script>--%>
    <script src="${path}/resources/ztree/jquery.ztree.all-3.5.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="${path}/resources/js/kyeWord.js" ></script>
    <script type="text/javascript" src="${path}/resources/admin/js/pub/productClass.js" ></script>

</head>
<body>
<div class="wrapper" style="min-height: 450px">
    <div class="userDetail" style="border:1px solid #e6e6e6; margin-top:0px; height:400px; overflow:auto; scroll-x:hidden;">
        <div class="ztreebox">
            <ul id="tree" class="ztree">
                努力加载中...
            </ul>
        </div>
        <div class="yema"></div>
        <!-------->

    </div>
    <div class="popBtDiv">
        <ul>
            <li><a class="btnGrey" style=" margin-left:10px;" id="btnClose">返&nbsp;&nbsp;回</a></li>
            <li><a class="btnRed" id="btnSubmit">选&nbsp;&nbsp;择</a></li>
        </ul>
    </div>
</div>
</body>
</html>
