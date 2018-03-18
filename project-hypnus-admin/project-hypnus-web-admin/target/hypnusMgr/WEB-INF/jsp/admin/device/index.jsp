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
    <script src="${path}/resources/admin/js/device/index.js" type="text/javascript"></script>
</head>
<body>
	<div class="wrapper">
    	<div class="positionNow">主页 &gt; <a>设备列表</a></div>
        <div class="searchBar">
       	    <div class="searchBox">
            	<span class="searchName">设备序列号：</span>
            	<input class="searchInputText" id="snId" type="text" style="width:130px;" />
            </div>
            <div class="searchBox" >
            	<span class="searchName">用户手机号：</span>
            	<input class="searchInputText" id="userMobile" type="text" style="width:130px;" />
            </div>
            <div class="searchBox">
                <span class="searchName">经销商手机号：</span>
                <input class="searchInputText" id="factoryMobile" type="text" style="width:130px;" />
            </div>
            <span class="btnGrey" style="margin-left:5px;" id="reset">重置</span>
            <span class="btnRed" id="search">查询</span>
        </div>

        <div class="userDetail">
            <table class="datalistTable xw_shenfen">
                <tr>
                    <th width="40px"><div class="tickAll xw_tickAll"></div></th>
                    <th>设备序列号</th>
                    <th>设备型号</th>
                    <th>绑定用户手机</th>
                    <th>绑定经销商名称</th>
                    <th>绑定经销商手机</th>
                    <th>出厂日期</th>
                    <th>操作</th>
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
        <tr ondblclick="window.location.href = path +'/admin/deviceMgr/detail?id={{$value.i_id}}'" title="双击查看详情">
            <td><span class="tick xw_tick"></span></td>
            <td>{{$value.sn_id}}</td>
            <td>{{$value.model}}</td>
            <td>{{$value.userPhone}}</td>
            <td>{{$value.name}}</td>
            <td>{{$value.phone}}</td>
            <td>{{$value.productDate}}</td>
            <td>
                <span
                    class="{{if $value.status == 1}}bgGrey{{/if}}{{if $value.status == 2}}bgBlue{{/if}}{{if $value.status == 3}}bgRed{{/if}}">
                {{$value.statusName}}
                </span>
            </td>
            <input type="hidden" name="id" value="{{$value.i_id}}" param="param">
            <input type="hidden" name="deviceId" value="{{$value.device_id}}" param="param">
        </tr>
        {{/each}}
    </script>
</body>
</html>
