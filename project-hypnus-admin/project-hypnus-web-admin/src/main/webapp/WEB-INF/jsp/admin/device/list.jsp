<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@include file="/common/headModule.jsp" %>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>设备列表</title>
<link type="text/css" href="${path}/resources/css/common.css" rel="stylesheet" />
<link type="text/css" href="${path}/resources/css/user_list.css" rel="stylesheet" />
<script src="${path}/resources/js/common_ctr.js" type="text/javascript"></script>
<script src="${path}/resources/js/member.js" type="text/javascript"></script>
    <script src="${path}/resources/admin/common/temDataGrid.js"></script>
    <script src="${path}/resources/admin/js/device/list.js" type="text/javascript"></script>
</head>
<body>
	<div class="wrapper">
    	<div class="positionNow">主页 &gt; <a>设备列表</a></div>
        <div class="searchBar">
       	    <div class="searchBox">
            	<span class="searchName">设备序列号：</span>
            	<input class="searchInputText" id="snId" type="text" style="width:130px;" />
            </div>
            <span class="btnGrey" style="margin-left:5px;" id="reset">重置</span>
            <span class="btnRed" id="search">查询</span>
        </div>

        <div class="resultBar">
            <span class="btnBlue" style="margin-left:6px;" id="paramSet">设置参数</span>
           <%-- <span class="btnRed" style="margin-left:6px;" id="unbindUser">解绑用户</span>
            <span class="btnRed" style="margin-left:6px;" id="unbindFactory">解绑经销商</span>
            <span class="btnGrey" style="margin-left:6px;" id="bindUser">绑定用户</span>
            <span class="btnGrey" style="margin-left:6px;" id="bindFactory">绑定经销商</span>--%>
        </div>

        <div class="userDetail">
            <table class="datalistTable">
                <tr>
                    <th width="40px"><div class=""></div></th>
                    <th>设备序列号</th>
                    <th>设备型号</th>
                    <th>绑定用户手机</th>
                    <th>绑定经销商名称</th>
                    <th>绑定经销商手机</th>
                    <th>出厂日期</th>
                    <th>是否绑定经销商</th>
                    <th>是否绑定用户</th>
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
        <tr ondblclick="window.location.href = path +'/admin/deviceMgr/detail.html?deviceId={{$value.device_id}}'"  title="双击查看详情">
            <td><span class="tick xw_tick"></span></td>
            <td>{{$value.device_id}}</td>
            <td>{{$value.model}}</td>
            <td>{{$value.userPhone}}</td>
            <td>{{$value.name}}</td>
            <td>{{$value.phone}}</td>
            <td>{{$value.productDate}}</td>
            <td>
                {{if $value.factory_id == ''}}
                <span class="bgRed">未绑定</span>
                {{else}}
                <span class="bgBlue">已绑定</span>
                {{/if}}
            </td>
            <td>
                {{if $value.cus_id == ''}}
                <span class="bgRed">未绑定</span>
                {{else}}
                <span class="bgBlue">已绑定</span>
                {{/if}}
            </td>
            <input type="hidden" name="id" value="{{$value.i_id}}" param="param">
            <input type="hidden" name="deviceId" value="{{$value.device_id}}" param="param">
            <input type="hidden" name="factoryId" value="{{$value.factory_id}}" param="param">
            <input type="hidden" name="userId" value="{{$value.cus_id}}" param="param">
        </tr>
        {{/each}}
    </script>
</body>
</html>
