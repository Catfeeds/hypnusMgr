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
    <link type="text/css" rel="stylesheet" href="${path}/resources/css/common.css"/>
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
        <a>主页 &gt; </a><a href="${path}/admin/deviceMgr/index.html">设备列表</a> &gt; <a style="color:#ff4d4d;">设备参数</a>
    </div>

    <div class="userDetail">
        <input type="hidden" name="id" id="id" value="${fn:escapeXml(param.id)}"/>
        <h1 class="tittle">
            <span class="btnBlue" id="printBill">设置设备参数</span>
            设备信息
        </h1>
        <div class="activityMsn">
            <table class="activityMsnTable">
                <tr>
                    <td>设备型号：</td>
                    <th id="orderCode"></th>
                    <td>系统版本：</td>
                    <th colspan="1" id="createDate"></th>
                </tr>
                <tr>
                    <td>使用时间：</td>
                    <th id="orderCode"></th>
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
    <div class="userDetail">
        <h1 class="tittle">
            治疗压力
        </h1>
        <div class="activityMsn">
            <table class="activityMsnTable">
                <tr>
                    <td>平均吸气压力：</td>
                    <th id="orderCode"></th>
                    <td>90%吸气压力：</td>
                    <th id="createDate"></th>
                </tr>
                <tr>
                    <td>平均呼气压力：</td>
                    <th></th>
                    <td>90%呼气压力：</td>
                    <th id="orderType"></th>
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
                    <th id="orderCode"></th>
                    <td>使用>=4小时天数：</td>
                    <th id="createDate"></th>
                </tr>
                <tr>
                    <td>未使用天数：</td>
                    <th></th>
                    <td>总是用时间：</td>
                    <th id="orderType"></th>
                </tr>
                <tr>
                    <td>总天数：</td>
                    <th id="orderCode"></th>
                    <td>使用>=4小时天数：</td>
                    <th id="createDate"></th>
                </tr>
                <tr>
                    <td>使用<4小时天数：</td>
                    <th></th>
                    <td>平均每天使用时长：</td>
                    <th id="orderType"></th>
                </tr>
                <tr>
                    <td>使用>=4小时天数百分比：</td>
                    <th></th>
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
                    <th id="orderCode"></th>
                    <td>90%潮气量：</td>
                    <th id="createDate"></th>
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
                    <th id="orderCode"></th>
                    <td>90%分钟通气量：</td>
                    <th id="createDate"></th>
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
                    <th id="orderCode"></th>
                    <td>90%呼气频率：</td>
                    <th id="createDate"></th>
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
                    <th id="orderCode"></th>
                    <td>90%呼吸比：</td>
                    <th id="createDate"></th>
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
                    <th id="orderCode"></th>
                    <td>90%漏气量：</td>
                    <th id="createDate"></th>
                </tr>
            </table>
        </div>
    </div>
</div>
</body>
</html>