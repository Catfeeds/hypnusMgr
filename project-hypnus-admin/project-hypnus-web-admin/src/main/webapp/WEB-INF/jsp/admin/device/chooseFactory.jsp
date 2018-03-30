<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <%@include file="/common/headModule.jsp" %>
<title>选择经销商</title>
<link type="text/css" rel="stylesheet" href="${path}/resources/css/common.css" />
<script type="text/javascript" src="${path}/resources/js/common_ctr.js" ></script>
<script src="${path}/resources/admin/common/temDataGrid.js"></script>

<script src="${path}/resources/admin/js/device/chooseFactory.js"></script>
</head>
<body>
	<div class="wrapper">
        <div class="searchDiv" style="margin:0;">
            <div class="searchBar" style="margin:0;height: 45px;">
                <input id="deviceId" value="${deviceId}" type="hidden"/>
            	<div class="searchBox">
                    <span class="searchName">手机号：</span>
                    <input id="cusTel" class="searchInputText" name="input" type="text" style="width:130px;" />
                </div>
            	<span class="btnGrey" style="margin-left:5px;" id="resetBtn">重置</span>
                <span class="btnRed" id="searchBtn">查询</span>
            </div>
            <div class="popBtDiv">
                <ul>
                    <li><a class="btnGrey" style=" margin-left:10px;" id="returnBack">返&nbsp;&nbsp;回</a></li>
                    <li><a class="btnRed" id="selectCus">选&nbsp;&nbsp;择</a></li>
                </ul>
            </div>
        </div>
        
        <div class="userDetail" style="border:1px solid #e6e6e6;">
            	<table class="datalistTable tuihuoList">
                            <thead>
                                <th width="40"><div class="tickAll xw_tickAll"></div></th>
                                <th>经销商名称</th>
                                <th>手机号</th>
                                <th>联系人名称</th>
                                <th>邮箱</th>
                            </thead>
                            <tbody id="dataList">
                            </tbody>
                        </table>
            <!--页码-->
                <div class="pageBar" id="pageBar">
            <!-------->
            
         </div>

	</div> 
</body>
<script type="text/html" id="template_dataList">
    {{each}}
        <tr>
            <input name="id" param="param" value="{{$value.i_id}}" type="hidden" />
            <td><span class="tick xw_tick"></span></td>
            <td>{{$value.name}}</td>
            <td>{{$value.phone}}</td>
            <td>{{$value.connector}}</td>
            <td>{{$value.email}}</td>
        </tr>
    {{/each}}
</script>
</html>
