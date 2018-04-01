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
    <script src="${path}/resources/js/common_ctr.js" type="text/javascript"></script>
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

<div class="wrapper">
    <div class="positionNow">主页 &gt; <a>详细图形</a></div>
    <%--<div class="searchBar">--%>
        <%--<div class="searchBox">--%>
            <%--<span class="searchName">统计周期：</span>--%>
            <%--<div class="calendar_datechange xw_calendar_datechange">--%>
                <%--<span class="calendar_day timeOn" id="day">日</span>--%>
                <%--<span class="calendar_week" id="month">月</span>--%>
                <%--&lt;%&ndash;<span class="calendar_month">年</span>&ndash;%&gt;--%>
            <%--</div>--%>
        <%--</div>--%>

        <%--<input type="hidden" id="createDateDayHidden" value="${createDateDay}"/>--%>
        <%--<input type="hidden" id="endDateDayHidden" value="${endDateDay}"/>--%>

        <%--<div class="searchitem" id="dayDiv">--%>
            <%--<span>统计时间</span>--%>
            <%--<input class="zjInput" type="text" style="width:140px;" id="createDateDay" value="${createDateDay}"--%>
                   <%--onclick="WdatePicker({dateFmt:'yyyy-MM-dd', maxDate:'#F{$dp.$D(\'endDateDay\')||\'%y-%M-%d\'}', minDate:'#F{$dp.$D(\'endDateDay\', {d:-30})}'})"--%>
                   <%--style="width: 180px;"/>--%>
            <%--<span class="formText" style="margin:8px 5px 0; float:none;">~</span>--%>
            <%--<input class="zjInput" type="text" style="width:140px;" id="endDateDay" value="${endDateDay}"--%>
                   <%--onclick="WdatePicker({dateFmt:'yyyy-MM-dd', maxDate:'#F{$dp.$D(\'createDateDay\', {d:+30})||\'%y-%M-%d\'}', minDate:'#F{$dp.$D(\'createDateDay\')}'})"/>--%>
        <%--</div>--%>

        <%--<div class="searchitem" id="MonthDiv" style="display: none">--%>
            <%--<span>统计时间</span>--%>
            <%--<input class="zjInput" type="text" style="width:140px;" id="createDateMonth" value="${createDateMonth}"--%>
                   <%--onclick="WdatePicker({dateFmt:'yyyy-MM', maxDate:'#F{$dp.$D(\'endDateMonth\')||\'%y-%M\'}', minDate:'#F{$dp.$D(\'endDateMonth\', {M:-12})}'})"--%>
                   <%--style="width: 180px;"/>--%>
            <%--<span class="formText" style="margin:8px 5px 0; float:none;">~</span>--%>
            <%--<input class="zjInput" type="text" style="width:140px;" id="endDateMonth" value="${endDateMonth}"--%>
                   <%--onclick="WdatePicker({dateFmt:'yyyy-MM', maxDate:'#F{$dp.$D(\'createDateMonth\', {M:+12})||\'%y-%M\'}', minDate:'#F{$dp.$D(\'createDateMonth\')}'})"/>--%>
        <%--</div>--%>

        <%--<input type="hidden" id="deviceId" value="${fn:escapeXml(param.deviceId)}"/>--%>
        <%--<input type="hidden" id="startTime" value="${fn:escapeXml(param.startTime)}"/>--%>
        <%--<span class="btnGrey" style="margin-left:5px;" id="resetBtn">重置</span>--%>
        <%--<span class="btnRed" id="searchBtn">查询</span>--%>
    <%--</div>--%>

    <div class="topTabBar">
        <ul class="topTab xw_topTab">
            <input type="hidden" id="deviceId" value="${fn:escapeXml(param.deviceId)}"/>
            <input type="hidden" id="startTime" value="${fn:escapeXml(param.startTime)}"/>
            <li class="on xw_setPie" id="numLi">详细图形</li>
            <li class="xw_setPie">统计图形</li>
        </ul>
    </div>
    <div class="xw_showcontent" style="background:#fff;">
        <div class="chartsDiv" id="container_dingdan"></div>
    </div>
</div>
</body>
</html>
