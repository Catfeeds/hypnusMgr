<%@ page language="java" pageEncoding="utf-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <%@include file="/common/headRefModule.jsp" %>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>个人中心</title>
    <link type="text/css" href="${path}/resources/safeMgr/css/manage.css" rel="stylesheet"/>
    <link type="text/css" href="${path}/resources/safeMgr/css/commonstyle.css" rel="stylesheet"/>
    <link type="text/css" href="${path}/resources/safeMgr/css/public.css" rel="stylesheet"/>
    <script src="${path}/resources/safeMgr/js/sonjs02.js" type="text/javascript"></script>
    <script src="${path}/resources/admin/js/sysMgr/userCenter/index.js" type="text/javascript"></script>
</head>
<body style=" padding: 10px;">
<c:if test="${param.sign == null}">
    <div class="position_now">您当前的位置 : <a>&nbsp;系统管理&nbsp;>&nbsp;</a><a>个人中心</a></div>
</c:if>
<div class="wrapper" style="background:#fff; height: 400px; margin-top: 10px;">
    <div class="usercenterMain xw_showContent">
        <div class="userInfo">
            <div class="inputLine">
                <span class="inputTitle">员工姓名:</span><span class="text358" id="name"></span><span class="inputTitle">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:</span><span class="text358" id="sex"></span></div>
            <div class="inputLine">
                <span class="inputTitle">手机号码 :</span><span class="text358"  id="mobile"></span><span class="inputTitle">联系邮箱 :</span><span class="text358" id="inEmail"></span></div>
            <div class="inputLine">
                <span class="inputTitle">登录账号 :</span><span class="text358" id="account"></span><span class="inputTitle">角色权限 :</span><span class="text358" id="roleNames"></span></div>
            <div class="inputLine">
                <span class="inputTitle">登录密码 :</span><span class="textauto">********</span><span class="btnOrange" style="float:left;" id="modifyPassword">修改密码</span></div>
        </div>
    </div>
</div>
</body>
</html>
