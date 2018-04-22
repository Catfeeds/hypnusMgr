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
    <%@include file="/common/headModule.jsp" %>
    <title>设备参数</title>
    <link type="text/css" rel="stylesheet" href="${path}/resources/css/public.css"/>
    <link type="text/css" rel="stylesheet" href="${path}/resources/css/common.css"/>
    <link type="text/css" href="${path}/resources/css/timeChange.css" rel="stylesheet"/>
    <link type="text/css" rel="stylesheet" href="${path}/resources/css/activitiesDetail.css"/>
    <link type="text/css" rel="stylesheet" href="${path}/resources/css/activities_list.css"/>
    <link type="text/css" href="${path}/resources/css/addActivities.css" rel="stylesheet"/>

    <script src="${path}/resources/js/common_ctr.js" type="text/javascript"></script>
    <script src="${path}/resources/js/member.js" type="text/javascript"></script>
    <script src="${path}/resources/admin/js/device/detail.js" type="text/javascript"></script>

</head>

<body>
<div class="wrapper">
    <div class="positionNow">
        <a>主页 &gt; </a><a>设备列表</a> &gt; <a style="color:#ff4d4d;">统计数据</a>
    </div>
    <div class="searchBar">
        <input type="hidden" id="createDateDayHidden" value="${createDateDay}"/>
        <input type="hidden" id="endDateDayHidden" value="${endDateDay}"/>
        <div class="searchitem" id="dayDiv">
            <span>统计时间</span>
            <input class="zjInput" type="text" style="width:140px;" id="createDateDay" value="${createDateDay}"
                   onclick="WdatePicker({dateFmt:'yyyy-MM-dd', maxDate:'#F{$dp.$D(\'endDateDay\')||\'%y-%M-%d\'}', minDate:'#F{$dp.$D(\'endDateDay\', {d:-30})}'})"
                   style="width: 180px;"/>
            <span class="formText" style="margin:8px 5px 0; float:none;">~</span>
            <input class="zjInput" type="text" style="width:140px;" id="endDateDay" value="${endDateDay}"
                   onclick="WdatePicker({dateFmt:'yyyy-MM-dd', maxDate:'#F{$dp.$D(\'createDateDay\', {d:+30})||\'%y-%M-%d\'}', minDate:'#F{$dp.$D(\'createDateDay\')}'})"/>
        </div>
        <div class="searchitem" id="MonthDiv" style="display: none">
            <span>统计时间</span>
            <input class="zjInput" type="text" style="width:140px;" id="createDateMonth" value="${createDateMonth}"
                   onclick="WdatePicker({dateFmt:'yyyy-MM', maxDate:'#F{$dp.$D(\'endDateMonth\')||\'%y-%M\'}', minDate:'#F{$dp.$D(\'endDateMonth\', {M:-12})}'})"
                   style="width: 180px;"/>
            <span class="formText" style="margin:8px 5px 0; float:none;">~</span>
            <input class="zjInput" type="text" style="width:140px;" id="endDateMonth" value="${endDateMonth}"
                   onclick="WdatePicker({dateFmt:'yyyy-MM', maxDate:'#F{$dp.$D(\'createDateMonth\', {M:+12})||\'%y-%M\'}', minDate:'#F{$dp.$D(\'createDateMonth\')}'})"/>
        </div>


        <input type="hidden" id="deviceId" value="${fn:escapeXml(param.deviceId)}"/>
        <input type="hidden" id="startTime" value="${fn:escapeXml(param.startTime)}"/>
        <%--<span class="btnBlue" style="margin-left:5px;" id="printBill">统计图形</span>--%>
        <span class="btnRed" id="searchBtn">统计</span>
    </div>

    <div class="topTabBar">
        <ul class="topTab xw_topTab">
            <li class="on xw_setPie" id="staticData">统计数据</li>
            <li class="xw_setPie" id="staticLi">统计图形</li>
            <li class="xw_setPie" id="numLi">详细图形</li>
        </ul>
    </div>

    <div class="userDetail">
        <input type="hidden" name="id" id="id" value="${fn:escapeXml(param.deviceId)}"/>
        <h1 class="tittle">
            设备信息
        </h1>
        <div class="activityMsn">
            <table class="activityMsnTable">
                <tr>
                    <td>设备型号：</td>
                    <th id="model"></th>
                    <td>系统版本：</td>
                    <th colspan="1" id="data_version"></th>
                </tr>
                <tr>
                    <td>使用时间：</td>
                    <th id="useTime"></th>
                </tr>
            </table>
        </div>
    </div>
    <div class="userDetail">
        <h1 class="tittle">
            工作参数
        </h1>
        <div class="activityMsn">
            <table class="activityMsnTable">
                <tr>
                    <td>工作模式：</td>
                    <th id="cure_model"></th>
                </tr>
                <tr>
                    <td>吸气压力：</td>
                    <th id="presure1"></th>
                    <td>呼气压力：</td>
                    <th id="presure2"></th>
                </tr>
                <tr>
                    <td>起始压力：</td>
                    <th id="startPressure"></th>
                    <td>延迟时间：</td>
                    <th id="cureDelay"></th>
                </tr>
                <tr>
                    <td>呼吸频率：</td>
                    <th id="breathRate"></th>
                    <td>上升斜坡：</td>
                    <th id="boostslope"></th>
                </tr>
                <tr>
                    <td>下降斜坡：</td>
                    <th id="buckslope"></th>
                    <td>呼吸比：</td>
                    <th id="breathRatio"></th>
                </tr>
            </table>
        </div>
    </div>
    <div class="userDetail">
        <h1 class="tittle">
            治疗压力
        </h1>
        <div class="activityMsn">
            <table class="activityMsnTable">
                <tr>
                    <td>平均吸气压力：</td>
                    <th id="averagePresure1"></th>
                    <td>90%吸气压力：</td>
                    <th id="pecentPresure1"></th>
                </tr>
                <tr>
                    <td>平均呼气压力：</td>
                    <th id="averagePresure2"></th>
                    <td>90%呼气压力：</td>
                    <th id="pecentPresure2"></th>
                </tr>
            </table>
        </div>
    </div>
    <div class="userDetail">
        <h1 class="tittle">
            使用信息
        </h1>
        <div class="activityMsn">
            <table class="activityMsnTable">
                <tr>
                    <td>总天数：</td>
                    <th id="totalDays"></th>
                    <td>使用>=4小时天数：</td>
                    <th id="moreThan4HoursDays"></th>
                </tr>
                <tr>
                    <td>未使用天数：</td>
                    <th id="noUseDays"></th>
                    <td>总使用时间：</td>
                    <th id="totalTimes"></th>
                </tr>

                <tr>
                    <td>使用<4小时天数：</td>
                    <th id="lessThan4HoursDays"></th>
                    <td>平均每天使用时长：</td>
                    <th id="averageUseTime"></th>
                </tr>
                <tr>
                    <td>使用>=4小时天数百分比：</td>
                    <th id="moreThan4HoursPercent"></th>
                </tr>
            </table>
        </div>
    </div>
    <div class="userDetail">
        <h1 class="tittle">
            潮气量
        </h1>
        <div class="activityMsn">
            <table class="activityMsnTable">
                <tr>
                    <td>50%潮气量：</td>
                    <th id="fiftyPercentTV"></th>
                    <td>90%潮气量：</td>
                    <th id="ninetyPercentTV"></th>
                </tr>
            </table>
        </div>
    </div>
    <div class="userDetail">
        <h1 class="tittle">
            分钟通气量
        </h1>
        <div class="activityMsn">
            <table class="activityMsnTable">
                <tr>
                    <td>50%分钟通气量：</td>
                    <th id="fiftyPercentMV"></th>
                    <td>90%分钟通气量：</td>
                    <th id="ninetyPercentMV"></th>
                </tr>
            </table>
        </div>
    </div>
    <div class="userDetail">
        <h1 class="tittle">
            呼气频率
        </h1>
        <div class="activityMsn">
            <table class="activityMsnTable">
                <tr>
                    <td>50%呼气频率：</td>
                    <th id="fiftyPercentBR"></th>
                    <td>90%呼气频率：</td>
                    <th id="ninetyPercentBR"></th>
                </tr>
            </table>
        </div>
    </div>
    <div class="userDetail">
        <h1 class="tittle">
            呼吸比I:E
        </h1>
        <div class="activityMsn">
            <table class="activityMsnTable">
                <tr>
                    <td>50%呼吸比：</td>
                    <th id="fiftyPercentBP"></th>
                    <td>90%呼吸比：</td>
                    <th id="ninetyPercentBP"></th>
                </tr>
            </table>
        </div>
    </div>
    <div class="userDetail">
        <h1 class="tittle">
            呼吸事件(次/小时)
        </h1>
        <div class="activityMsn">
            <table class="activityMsnTable">
                <tr>
                    <td>AHI：</td>
                    <th id="orderCode"></th>
                    <td>AI：</td>
                    <th id="createDate"></th>
                </tr>
                <tr>
                    <td>HI：</td>
                    <th id="orderCode"></th>
                    <td>Snore：</td>
                    <th id="createDate"></th>
                </tr>
                <tr>
                    <td>CSA：</td>
                    <th id="orderCode"></th>
                    <td>CSR：</td>
                    <th id="createDate"></th>
                </tr>
                <tr>
                    <td>PB：</td>
                    <th id="orderCode"></th>
                </tr>
            </table>
        </div>
    </div>
    <div class="userDetail">
        <h1 class="tittle">
            漏气信息
        </h1>
        <div class="activityMsn">
            <table class="activityMsnTable">
                <tr>
                    <td>50%漏气量：</td>
                    <th id="averageMvPos"></th>
                    <td>90%漏气量：</td>
                    <th id="pecentMvPos"></th>
                </tr>
            </table>
        </div>
    </div>
</div>
</body>
</html>
