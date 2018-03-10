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
    <script type="text/javascript" src="${path}/resources/admin/js/login.js"></script>
</head>

<body>
<div class="navigation">
    <div class="in_navigation">
        <config:Config key="admin_login_link" defaultValue="<span class='phoneNumber'>热线电话<span class='textOrange'>400-123-123</span></span><span class='followUs'>关注我们</span>"/>
    </div>
</div>
<div class="login">
    <form id="loginForm">
        <div class="zhongbu">
            <div class="denglu">
                <h1 class="huanyin">您好，欢迎登录</h1>
                <input type="hidden" name="modulus" value="${modulus}"/>
                <input type="hidden" name="exponent" value="${exponent}"/>
                <input type="hidden" name="captchaId" value="${captchaId}"/>
                <input type="hidden" name="rememberMe" value="false"/>
                <input type="hidden" id="enPassword" name="enPassword" value=""/>

                <input id="username" name="username" type="text" placeholder="请输入您的账号" class="kuang01"/>
                <input id="password" name="password" type="password" placeholder="请输入您的密码" class="kuang02"/>

                <% if (Boolean.parseBoolean(ConfigUtils.config.getProperty("isCaptcha"))) { %>
                <input id="captcha" name="captcha" type="text" placeholder="请输入验证码" class="kuang03"/>
                <img id="captchaImage" style="width: 90px;height: 40px;"
                     title="<%=I18Util.getMessage("common.captcha.imageTitle")%>"/>
                <%}%>
                <div class="liubai">
                    <a class="loginbtn" id="login">登录</a>
                </div>
            </div>
        </div>
    </form>
    <div class="copyRight" style="margin-top:145px;"><config:Config key="admin_login_copyright" defaultValue="Copyright ©2018 和普乐 版权所有"/> </div>
</div>
</body>
</html>
