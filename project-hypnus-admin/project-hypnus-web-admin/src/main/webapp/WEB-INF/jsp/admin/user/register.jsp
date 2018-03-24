<%@ taglib prefix="config" uri="http://www.cooldingsoft.com" %>
<%@ page import="com.catt.common.util.ConfigUtils" %>
<%@ page language="java" pageEncoding="utf-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <%@include file="/common/headModule.jsp" %>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>欢迎登录-<config:Config key="platform_name" defaultValue="和普乐"/>管理平台</title>
   <link type="text/css" href="${path}/resources/css/common.css" rel="stylesheet"/>
    <link rel="stylesheet" href="${path}/resources/css/aliyun.css" type="text/css"/>


    <!--日历控件引入-->
    <script type="text/javascript" src="${path}/resources/sea-modules/My97DatePicker/4.8/WdatePicker.js"></script>
    <!--日历控件引入 END-->
       <script type="text/javascript" src="${path}/resources/admin/js/user/register.js"></script>


</head>

<body>
<div class="navigation">
    <div class="in_navigation">
        <config:Config key="admin_login_link" defaultValue="<span class='phoneNumber'>热线电话<span class='textOrange'>400-123-123</span></span><span class='followUs'> 去登陆</span>"/>
    </div>
</div>
<div class="login">
    <form id="saveForm">
        <div class="zhongbu">
            <div class="denglu">

                <input id="phone" name="phone" type="password" placeholder="请输入您的手机号码" class="kuang02"/>
                <input id="password" name="password" type="password" placeholder="请输入您的密码" class="kuang02"/>
                <input id="confirmPwd" name="confirmPwd" type="text" placeholder="请确认您的密码" class="kuang02"/>
                <input id="authCode" name="authCode" type="text" placeholder="请输入验证码" class="kuang02"/>


                <div class="liubai">
                    <a class="loginbtn" id="register">注册</a>
                </div>
            </div>
        </div>
    </form>
    <div class="copyRight" style="margin-top:145px;"><config:Config key="admin_login_copyright" defaultValue="Copyright ©2018 和普乐 版权所有"/> </div>
</div>
</body>
</html>
