<%@page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>用户管理</title>
    <%@include file="/common/headRefModule.jsp" %>
<link rel="stylesheet" type="text/css" href="${path}/resources/safeMgr/css/shijianchanpin.css" />
<link rel="stylesheet" href="${path}/resources/safeMgr/css/public.css" type="text/css"  />
<link rel="stylesheet" href="${path}/resources/safeMgr/css/user.css" type="text/css"  />
<link rel="stylesheet" type="text/css" href="${path}/resources/ztreeSafe/zTreeStyle/zTreeStyle.css">
<script type="text/javascript" src="${path}/resources/ztreeSafe/jquery.ztree.all-3.5.js"></script>
<script type="text/javascript" src="${path}/resources/safeMgr/role/index.js"></script>
<script type="text/javascript" src="${path}/resources/js/jquery.easyui.min.js"></script>
    <script src="${path}/resources/safeMgr/js/sonjs02.js" type="text/javascript"></script>
<script>
     var action = "${action}";
</script>
</head>
<body style="padding: 10px;">
<%--<div class="position_now">
    <a class="jumpback">角色管理</a>
</div>--%>
<c:if test="${param.sign == null}">
    <div class="position_now">您当前的位置 : <a>&nbsp;系统管理&nbsp;>&nbsp;</a><a>角色管理</a></div>
</c:if>
<div class="mainbox">
	<div class="mainboxleft">
    	<div class="boxtop">
    		<span class="boxtit">角色树</span>
        </div>
        <div class="boxbtn">
        	<span class="btn_a" onclick="EventHandler.addRole()">新增</span>
            <span class="btn_a" onclick="EventHandler.modifyRole()">修改</span>
            <span class="btn_b" onclick="EventHandler.delRole()">删除</span>

        </div>

    	<div class="ztreebox">
		        <ul id="tree" class="ztree" style="width:450px; overflow:auto;height: 600px"></ul>
        </div>
        <div class="mainboxleft_bottom">
        	<div class="boxtop">
    			<span class="boxtit">详细信息</span>
            </div>
            <input type="hidden" id="roleId" value="-1">
          <table class="information">
                <tr>
                    <th width="46%" align="right">角色名称：</th>
                     <td width="54%" id="name"></td>
                </tr>
                <tr>
                    <th width="46%" align="right">备注：</th>
                     <td width="54%" id="remark"></td>
                </tr>
            </table>
        </div>
    </div>
    <div class="mainboxright" style="height: 50%">
    	<div class="boxtop">
    		<span class="boxtit">角色权限</span>
            <div class="boxtop_right">
            	<div class="search_part">

            </div>
            </div>
        </div>
<div class="titleBar">
    <ul class="toolBarList" style="margin-left:5px;">
            <li><a href="javascript:void(0)" id="addRight">新&nbsp;&nbsp;增</a></li>
            <li><a href="javascript:void(0)" id="delRight">删&nbsp;&nbsp;除</a></li>

    </ul>
</div>
   <div class="objBoxContBBody" style="background:#fff; padding:0px 0px 0;">
     <div class="datalistMain" style="padding:0; overflow:hidden;">
      <table id="tableRight" iconCls="icon-save" pagination="false" rownumbers="true" style="width:100%;height: 50%"></table>
    </div>
   </div>
</div>
<div class="mainboxright" style="height: 50%">
    	<div class="boxtop">
    		<span class="boxtit">角色用户</span>
            <div class="boxtop_right">
            	<div class="search_part">

            </div>
            </div>
        </div>

<div class="titleBar">
    <span class="spanName">姓名：</span>
    <div class="mohusearch"
         style="float: left; margin-left: 3px; margin-top: 3px;">
        <input type="text" id="staffName"  class="searchSimpleInputb xw_searchInput" style="width: 120px"/>
    </div>
    <span class="spanName">账号：</span>
    <div class="mohusearch"
         style="float: left; margin-left: 3px; margin-top: 3px;">
        <input type="text" id="account" class="searchSimpleInputb xw_searchInput"  style="width: 120px"/>
    </div>
    <ul class="toolBarList" style="margin-left:5px;">
        <li><a href="javascript:void(0)" onclick="EventHandler.loadListStaff()">查&nbsp;&nbsp;询</a></li>
         <li><a href="javascript:void(0)" onclick="EventHandler.addStaff()">新&nbsp;&nbsp;增</a></li>
            <li><a href="javascript:void(0)" onclick="EventHandler.delStaff()">删&nbsp;&nbsp;除</a></li>
    </ul>
</div>
   <div class="objBoxContBBody" style="background:#fff; padding:0px 0px 0;">
     <div class="datalistMain" style="height:310px; padding:0; overflow:hidden;">
       <table id="tableModule" iconCls="icon-save" pagination="true" rownumbers="true" style="width:100%;height:310px">
       </table>
     </div>
   </div>
</div>
</div>
</body>
</html>
