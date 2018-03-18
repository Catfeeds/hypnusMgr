<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <%@include file="/common/headRefModule.jsp" %>
    <title>修改密码</title>
    <link type="text/css" href="${path}/resources/safeMgr/css/common.css" rel="stylesheet"/>
    <link type="text/css" href="${path}/resources/safeMgr/css/usercenter.css" rel="stylesheet"/>

    <script src="${path}/resources/admin/js/sysMgr/userCenter/modifyPassword.js" type="text/javascript"></script>

</head>
<body>
<div class="usercenterBox" style="margin-top:0px; min-height:330px; background:#f9f9f9;">
    <form id="form">
        <div class="inputSection">
            <span class="inputLine">
                <h2>输入原密码：</h2>
                <input class="inputXL" type="password" id="oldPassword" name="oldPassword"/>
                <div class="check"></div>
            </span>
            <span class="inputLine">
                <h2>输入新密码：</h2>
                <input class="inputXL" type="password" id="newPassword" name="newPassword"/>
                <div class="check"></div>
            </span>
            <span class="inputLine">
                <h2>再次输入新密码：</h2>
                <input class="inputXL" type="password" id="new2Password" name="new2Password"/>
                <div class="check"></div>
             </span>
        </div>
        <div class="btnOrange_next xw_submitBtn" id="submit">提&nbsp;&nbsp;&nbsp;&nbsp;交</div>
    </form>
</div>
</body>
</html>
