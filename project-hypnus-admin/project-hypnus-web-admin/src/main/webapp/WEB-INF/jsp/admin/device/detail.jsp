<%--
  Created by IntelliJ IDEA.
  User: Admin
  Date: 2017/2/22
  Time: 17:16
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <%@include file="/common/headModule2.jsp" %>
    <title>设备参数</title>
    <link type="text/css" rel="stylesheet" href="${path}/resources/css/common.css" />
    <link type="text/css" rel="stylesheet"  href="${path}/resources/css/activitiesDetail.css"/>
    <link type="text/css" rel="stylesheet"  href="${path}/resources/css/activities_list.css"/>
    <link type="text/css" href="${path}/resources/css/addActivities.css" rel="stylesheet" />
    <script src="${path}/resources/js/common_ctr.js" type="text/javascript"></script>
    <script src="${path}/resources/js/member.js" type="text/javascript"></script>

    <script src="${path}/resources/admin/js/device/detail.js" type="text/javascript"></script>

</head>

<body>
<div class="wrapper">
    <div class="positionNow">
        <a>主页 &gt; </a><a href="${path}/admin/deviceMgr/index.html">设备列表</a> &gt; <a  style="color:#ff4d4d;">设备参数</a></div>

    <div class="userDetail">
        <input type="hidden" name="id" id="id" value="${fn:escapeXml(param.id)}"/>
        <input type="hidden" name="orderStatus" id="orderStatus" value=""/>
        <h1 class="tittle">
            <span class="btnRed" id="printBill">设置设备参数</span>
            工作参数
        </h1>
        <div class="activityMsn">
            <table class="activityMsnTable">
                <tr>
                    <td>工作模式：</td>
                    <th id="orderCode"></th>
                    <td>设备参数：</td>
                    <th id="createDate"></th>
                </tr>
                <tr>
                    <td>吸气压力：</td>
                    <th></th>
                    <td>呼气压力：</td>
                    <th id="orderType"></th>
                </tr>
                <tr>
                    <td>起始压力：</td>
                    <th></th>
                    <td>延迟时间：</td>
                    <th id="orderType"></th>
                </tr>
                <tr>
                    <td>呼吸频率：</td>
                    <th></th>
                    <td>上升斜坡：</td>
                    <th id="orderType"></th>
                </tr>
                <tr>
                    <td>下降斜坡：</td>
                    <th></th>
                    <td>呼吸比：</td>
                    <th id="orderType"></th>
                </tr>
            </table>
        </div>
    </div>
</div>
</body>
</html>
