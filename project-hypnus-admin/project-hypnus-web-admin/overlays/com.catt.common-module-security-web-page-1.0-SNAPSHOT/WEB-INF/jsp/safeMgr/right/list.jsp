<%--
  Created by IntelliJ IDEA.
  User: Chen ZhiYuan
  Date: 2015/6/123
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>

<!DOCTYPE html >
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>权限管理</title>
    <%@include file="/common/headRefModule.jsp" %>

    <link rel="stylesheet" type="text/css" href="${path}/resources/safeMgr/css/shijianchanpin.css"/>
    <link rel="stylesheet" href="${path}/resources/safeMgr/css/public.css" type="text/css"/>
    <link rel="stylesheet" href="${path}/resources/safeMgr/css/user.css" type="text/css"/>
    <link rel="stylesheet" type="text/css" href="${path}/resources/ztreeSafe/zTreeStyle/zTreeStyle.css">
    <script type="text/javascript" src="${path}/resources/ztreeSafe/jquery.ztree.all-3.5.js"></script>
    <script type="text/javascript" src="${path}/resources/safeMgr/js/pagecommon_ctr.js"></script>


    <script type="text/javascript" src="${path}/resources/safeMgr/js/EasyUtil.js"></script>
    <script>
        var action = "${param.action}";

    </script>
    <script type="text/javascript" src="${path}/resources/safeMgr/right/list.js"></script>
    <script type="text/javascript" src="${path}/resources/js/jquery.easyui.min.js"></script>
</head>

<body>
<div class="pageMain" style="min-height: 100px;">
    <input id="type" type="hidden" value="${type}">
    <div class="leftMain">
        <c:if test="${'check' ne param['action']}">
            <div class="position_now">您当前的位置 : <a>&nbsp;系统管理&nbsp;></a><a>&nbsp;权限管理&nbsp;</a></div>
        </c:if>
        <div class="objBoxContB" style=" margin-bottom:0px; padding: 10px 0 10px 0;">
            <div class="objBoxContBBody" style="background:#fff; padding:0px 0px 0;">
                <!-- 隐藏于：用于外部js文件中判断是否单选 -->
                <input type="hidden" id="singleSelect" value="${singleSelect }"/>

                <div class="titleBar">
                    <ul class="toolBarList" style="margin-left:5px;">
                        <c:if test="${'check' eq param['action']}">
                            <li><a onclick="EventHandler.checkBack()">确认</a></li>
                        </c:if>
                        <c:if test="${'check' ne param['action']}">
                            <li><a onclick="EventHandler.add(-1)">新增子级节点</a></li>
                            <li><a onclick="EventHandler.add(0)">新增同级节点</a></li>
                            <li><a id="modify">修&nbsp;&nbsp;改</a></li>
                            <li><a id="delete">删&nbsp;&nbsp;除</a></li>
                        </c:if>
                    </ul>
                </div>

                <div class="datalistMain" style=" padding:0; overflow:hidden;">
                    <table id="tableModule" iconCls="icon-save" pagination="false" rownumbers="true"
                           style="width:100%;"></table>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>

