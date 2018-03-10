<%@ page language="java" pageEncoding="utf-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <%@include file="/common/headRefModule.jsp" %>
    <title>系统管理</title>
    <link type="text/css" href="${path}/resources/safeMgr/css/common.css" rel="stylesheet"/>
    <link type="text/css" href="${path}/resources/safeMgr/css/dropMenu.css" rel="stylesheet"/>
    <link type="text/css" href="${path}/resources/safeMgr/css/manage.css" rel="stylesheet"/>
    <link rel="stylesheet" href="${path}/resources/safeMgr/css/user.css" type="text/css"/>
    <script src="${path}/resources/safeMgr/js/common.js" type="text/javascript"></script>
    <script src="${path}/resources/safeMgr/js/sonjs.js" type="text/javascript"></script>
    <script>
        function setpageIframe(height) {
            $("#sonframe").height(height);
            setParenHei();
        }
    </script>
</head>
<body style="min-height: 900px">
<div class="position_now">您当前的位置 : <a>系统管理</a></div>
<div class="wrapper">
    <div class="usercenterBox">
        <div class="usercenterTop">
            <ul class="topTit">
                <li class="xw_tabBtn tabOn" onclick="window.open('${path}/admin/economyMgr/userCenter.html?sign=1', 'sonframe')">个人中心</li>
                <li class="xw_tabBtn" onclick="window.open('${path}/safeMgr/staffMgr/index?sign=1', 'sonframe')">员工账号</li>
                <li class="xw_tabBtn" onclick="window.open('${path}/safeMgr/roleMgr/tree?sign=1', 'sonframe')">角色管理</li>
            </ul>
        </div>
        <iframe class="sonframe" frameborder="0" id="sonframe" name="sonframe" src="${path}/admin/economyMgr/userCenter.html?sign=1"></iframe>
    </div>
</div>
</body>
</html>