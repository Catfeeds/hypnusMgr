<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@include file="/common/headModule.jsp" %>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>会员管理</title>
<link type="text/css" href="${path}/resources/css/common.css" rel="stylesheet" />
<link type="text/css" href="${path}/resources/css/user_list.css" rel="stylesheet" />
<script src="${path}/resources/js/common_ctr.js" type="text/javascript"></script>
<script src="${path}/resources/js/member.js" type="text/javascript"></script>
    <script src="${path}/resources/admin/common/temDataGrid.js"></script>
    <script src="${path}/resources/admin/js/customerMgr/cusCertification/index.js" type="text/javascript"></script>
</head>
<body>
	<div class="wrapper">
    	<div class="positionNow">主页 &gt; <a>身份信息审核</a></div>
        <div class="searchBar">
       	    <div class="searchBox">
            	<span class="searchName">用户昵称：</span>
            	<input class="searchInputText" id="name" type="text" style="width:130px;" />
            </div>
            <div class="searchBox" style="display:none;">
            	<span class="searchName">手机号：</span>
            	<input class="searchInputText" id="mobile" type="text" style="width:130px;" />
            </div>
            <span class="btnGrey" style="margin-left:5px;" id="reset">重置</span>
            <span class="btnRed" id="search">查询</span>
        </div>
        <div class="resultBar">
            <div class="selectBox">
                <div class="selectTabs">
                    <input id="status" type="hidden"/>
                    <h1 class="xw_select selectTabs_on">全部</h1>
                    <h1 class="xw_select" data-value="3">待修改</h1>
                    <h1 class="xw_select" data-value="1">待审核</h1>
                    <h1 class="xw_select" data-value="2">已认证</h1>
                </div>
            </div>
            <span class="btnRed" style="margin-left:6px;" id="auditCus">审核</span>
      </div>
        <div class="userDetail">
            <table class="datalistTable xw_shenfen">
                <tr>
                    <th width="40px"><div class="tickAll xw_tickAll"></div></th>
                    <th>用户昵称</th>
                    <th>手机号码</th>
                    <th>真实姓名</th>
                    <th>身份证号</th>
                    <th>提交时间</th>
                    <th>状态</th>
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
        <tr ondblclick="window.location.href = path +'/admin/cusCertification/detail?certificationId={{$value.id}}'" title="双击查看详情">
            <td><span class="tick xw_tick"></span></td>
            <td>{{$value.nickname}}</td>
            <td>{{$value.mobile}}</td>
            <td>{{$value.name}}</td>
            <td>{{$value.idCard}}</td>
            <td>{{$value.createDate}}</td>
            <td>
                <span
                    class="{{if $value.status == 1}}bgGrey{{/if}}{{if $value.status == 2}}bgBlue{{/if}}{{if $value.status == 3}}bgRed{{/if}}">
                {{$value.statusName}}
                </span>
            </td>
            <input type="hidden" name="id" value="{{$value.id}}" param="param">
            <input type="hidden" name="status" value="{{$value.status}}" param="param">
        </tr>
        {{/each}}
    </script>
</body>
</html>
