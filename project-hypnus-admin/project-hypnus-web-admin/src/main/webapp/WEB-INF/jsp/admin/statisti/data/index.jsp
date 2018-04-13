<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <%@include file="/common/headModule.jsp" %>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>详细图形</title>
    <link type="text/css" rel="stylesheet" href="${path}/resources/css/public.css"/>
    <link type="text/css" href="${path}/resources/css/common.css" rel="stylesheet"/>
    <link rel="stylesheet" type="text/css" href="${path}/resources/css/index.css"/>
    <link type="text/css" href="${path}/resources/css/indexchild.css" rel="stylesheet"/>
    <link type="text/css" href="${path}/resources/css/timeChange.css" rel="stylesheet"/>
    <link type="text/css" href="${path}/resources/css/indexChildv2.css" rel="stylesheet"/>

    <script type="text/javascript" src="${path}/resources/js/echarts.min.js"></script>
    <script src="${path}/resources/admin/js/statisti/data/index.js" type="text/javascript"></script>

    <style type="text/css">
        .really {
            background: #fff;
            padding: 20px;
            color: #333;
            letter-spacing: 2px;
            font-size: 13px;
        }
    </style>
</head>

<body>

<div class="wrapper2Data">
    <div class="positionNow">主页 &gt; <a>详细图形</a></div>
    <div class="searchBar">
        <div class="searchBox">
            <span class="searchName">统计周期：</span>
            <div class="calendar_datechange xw_calendar_datechange">
                <span class="calendar_day timeOn" id="day">日</span>
                <span class="calendar_week" id="week">周</span>
                <%--<span class="calendar_month">年</span>--%>
            </div>
        </div>

        <input type="hidden" id="createDateDayHidden" value="${createDateDay}"/>
        <input type="hidden" id="endDateDayHidden" value="${endDateDay}"/>

        <input type="hidden" id="deviceId" value="${fn:escapeXml(param.deviceId)}"/>
        <input type="hidden" id="startTime" value="${fn:escapeXml(param.startTime)}"/>
    </div>

    <div class="topTabBar">
        <ul class="topTab xw_topTab">
            <li class="on xw_setPie" id="staticLi">统计图形</li>
            <li class="xw_setPie" id="numLi">详细图形</li>
        </ul>
    </div>
    <div class="xw_showcontent" style="background:#fff;" id="staticDiv">
        <div class="chartsDiv" id="container_dingdan"></div>
    </div>
    <div class="xw_showcontent" style="background:#fff;" id="aiDiv">
        <div class="chartsAiDiv" id="container_ai"></div>
    </div>
    <div class="xw_showcontent" style="background:#fff;" id="csaDiv">
        <div class="chartsAiDiv" id="container_csa"></div>
    </div>
    <div class="xw_showcontent" style="background:#fff;" id="csrDiv">
        <div class="chartsAiDiv" id="container_csr"></div>
    </div>
    <div class="xw_showcontent" style="background:#fff;" id="pbDiv">
        <div class="chartsAiDiv" id="container_pb"></div>
    </div>
    <div class="xw_showcontent" style="background:#fff;">
        <div class="bottomDiv" id="container_static"></div>
    </div>
</div>
</body>
</html>
