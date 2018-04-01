<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@include file="/common/headModule.jsp" %>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>设备使用记录</title>
<link type="text/css" href="${path}/resources/css/common.css" rel="stylesheet" />
<link type="text/css" href="${path}/resources/css/user_list.css" rel="stylesheet" />
<script src="${path}/resources/js/common_ctr.js" type="text/javascript"></script>
<script src="${path}/resources/js/member.js" type="text/javascript"></script>
    <script src="${path}/resources/admin/common/temDataGrid.js"></script>
    <script src="${path}/resources/admin/js/usetime/index.js" type="text/javascript"></script>
</head>
<body>
	<div class="wrapper">
    	<div class="positionNow">主页 &gt; <a>设备列表</a> &gt;<a>设备使用记录</a></div>
        <div class="searchBar">
       	    <div class="searchBox">
            	<span class="searchName">设备序列号：</span>
            	<input class="searchInputText" id="snId" type="text" style="width:130px;" />
                <input type="hidden" name="deviceId" id="deviceId" value="${fn:escapeXml(param.deviceId)}"/>
            </div>
            <span class="btnGrey" style="margin-left:5px;" id="reset">重置</span>
            <span class="btnRed" id="search">查询</span>
        </div>

        <div class="userDetail" style="min-height:400px">
            <table class="datalistTable">
                <tr>
                    <th width="40px"><div class=""></div></th>
                    <th>设备标识</th>
                    <th>开始时间</th>
                    <th>结束时间</th>
                    <th>模式</th>
                </tr>
                <tbody id="dataList"></tbody>
            </table>
        </div>
        <!--页码-->
        <div class="pageBar" id="pageBar"></div>
        <!-------->
    </div>


    <script type="text/html" id="template_dataList">
        {{each}}
        <tr onclick="window.location.href = path +'/admin/statisti/data/index.html?startTime={{$value.starttime}}'" title="双击查看详情">
            <td><span class="tick xw_tick"></span></td>
            <td>{{$value.deviceId}}</td>
            <td>{{$value.starttime}}</td>
            <td>{{$value.endTime}}</td>
            <td>{{$value.mode}}</td>
            <%--<td>--%>
            <%--{{if $value.mode == 1}}--%>
            <%--<span class="bgRed">未绑定</span>--%>
            <%--{{else}}--%>
            <%--<span class="bgBlue">已绑定</span>--%>
            <%--{{/if}}--%>
            <%--</td>--%>
        </tr>
        {{/each}}
    </script>
</body>
</html>
