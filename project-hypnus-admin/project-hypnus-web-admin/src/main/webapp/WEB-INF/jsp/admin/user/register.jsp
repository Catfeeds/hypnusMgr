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
    <script type="text/javascript" src="${path}/resources/admin/js/user/getCode.js"></script>
    <style type="text/css">
        .denglu {
            width: 40%;
        }
        .denglu #getCodeBtn{
            float: right;
        }
        .denglu .firstStep > div{
            margin-top: 20px;
        }
        .denglu .secondStep > div{
            margin-top: 10px;
        }
        .denglu #getCodeBtn span{
            display: block;
            margin-top: 5px;
            height: 30px;
            line-height: 30px;
            border-radius: 3px;
            color: #FFF;
            text-align: center;
            background: #fdc202;
            border: 1px solid #fdc202;
            cursor: pointer;
        }
        .denglu .btn{
            display: block;
            width: 270px;
            height: 40px;
            line-height: 40px;
            border-radius: 3px;
            margin: 10px 20px 10px 30px;
            padding-bottom: 1px;
            color: #FFF;
            text-align: center;
            letter-spacing: 4px;
            cursor: pointer;
        }
        .denglu .nextBtn{
            background: #0ab4e4;
            border: 1px solid #0ab4e4;
        }
        .denglu .registerBtn{
            background: #ff4d4d;
            border: 1px solid #dd2963;
        }
        .none{
            display: none !important;
        }

    </style>


</head>

<body>
<div class="navigation">
    <div class="in_navigation">
        <config:Config key="admin_login_link" defaultValue="<span class='phoneNumber'>热线电话<span class='textOrange'>400-123-123</span></span><span class='followUs' id='goToLogin'> 去登陆</span>"/>
    </div>
</div>
<div class="login">
        <div class="zhongbu">
            <div class="denglu">
                    <h1 class="huanyin">1.验证手机</h1>
                <div id="firstStep" class="firstStep">
                    <div class="phoneDiv">
                        <input id="phone" name="phone" type="text" placeholder="请输入您的手机号码" class="kuang04"/>
                    </div>
                    <div class="authCodeDiv">
                        <input id="authCode" name="authCode" type="text" placeholder="请输入手机验证码" class="kuang02"/>
                        <div id="getCodeBtn" data-rel="register">
                            <span>获取验证码</span>
                        </div>
                    </div>
                    <div class="liubai">
                        <a class="btn nextBtn" id="nextBtn">下一步</a>
                        <%--<a class="btn registerBtn none" id="register">注册</a>--%>
                    </div>
                </div>
                <div id="secondStep" class="secondStep none">
                    <div>
                        <input id="finalPhone" value="" class="kuang04" type="hidden" readonly/>
                    </div>
                    <div>
                        <input id="password" name="password" type="password" placeholder="请输入您的密码" class="kuang02"/>
                    </div>
                    <div>
                        <input id="confirmPwd" name="confirmPwd" type="password" placeholder="请确认您的密码" class="kuang02"/>
                    </div>
                    <div>
                        <input id="deviceId" name="deviceId" type="text" placeholder="请输入您的设备号" class="kuang02"/>
                    </div>
                    <div class="liubai">
                        <a class="btn registerBtn" id="register">注册</a>
                    </div>
                </div>



                <%--<input id="confirmPwd" name="confirmPwd" type="text" placeholder="请确认您的密码" class="kuang02"/>
                <input id="authCode" name="authCode" type="text" placeholder="请输入验证码" class="kuang02"/>--%>



            </div>
        </div>
    <div class="copyRight" style="margin-top:145px;"><config:Config key="admin_login_copyright" defaultValue="Copyright ©2018 和普乐 版权所有"/> </div>
</div>
</body>
</html>
