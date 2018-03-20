<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@include file="/common/headModule.jsp" %>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>经销商列表</title>
<link type="text/css" href="${path}/resources/css/common.css" rel="stylesheet" />
<link type="text/css" href="${path}/resources/css/user_list.css" rel="stylesheet" />
<script src="${path}/resources/js/common_ctr.js" type="text/javascript"></script>
<script src="${path}/resources/js/member.js" type="text/javascript"></script>
    <script src="${path}/resources/admin/common/temDataGrid.js"></script>
    <script src="${path}/resources/admin/js/factory/index.js" type="text/javascript"></script>
</head>
<body>
	<div class="wrapper">
    	<div class="positionNow">主页 &gt; <a>经销商列表</a></div>
        <div class="searchBar">
            <div class="searchBox">
                <span class="searchName">手机号：</span>
                <input class="searchInputText" id="factoryMobile" type="text" style="width:130px;" />
            </div>
            <span class="btnBlue" style="margin-left: 5px" id="addFactory">新增经销商</span>
            <span class="btnGrey" style="margin-left:5px;" id="reset">重置</span>
            <span class="btnRed" id="search">查询</span>
        </div>

        <div class="userDetail">
            <table class="datalistTable xw_shenfen">
                <tr>
                    <th width="40px"><div class="tickAll xw_tickAll"></div></th>
                    <th>经销商名称</th>
                    <th>联系人</th>
                    <th>手机号码</th>
                    <th>邮箱</th>
                    <th>联系地址</th>
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
        <tr>
            <td><span class="tick xw_tick"></span></td>
            <td>{{$value.name}}</td>
            <td>{{$value.connector}}</td>
            <td>{{$value.phone}}</td>
            <td>{{$value.email}}</td>
            <td>{{$value.ddress}}</td>
            <td style="width: 18%">
                <span class="btnRed deleteFactory" style="margin-left: 5px" data-id="{{$value.i_id}}">删除</span>
                <span class="btnBlue editFactory" data-id="{{$value.i_id}}">修改</span>
            </td>
            <input type="hidden" name="id" value="{{$value.i_id}}" param="param">
        </tr>
        {{/each}}
    </script>
</body>
</html>
