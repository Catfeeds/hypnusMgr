<%--
  User: yxc
  Date: 2015/6/29
--%>

<%@page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html >
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>部门管理</title>
    <%@include file="/common/headRefModule.jsp" %>

    <link rel="stylesheet" type="text/css" href="${path}/resources/safeMgr/css/ziyuanDetail_ctr.css" />
	<link rel="stylesheet" type="text/css" href="${path}/resources/safeMgr/css/addziyuan_style.css" />
    <link type="text/css" rel="stylesheet" href="${path}/resources/css/addnew.css"/>
	<link type="text/css" rel="stylesheet" href="${path}/resources/safeMgr/css/shijianchanpin.css"/>
	<script type="text/javascript" src="${path}/resources/admin/js/jquery-1.7.1.js"></script>
	<script type="text/javascript" src="${path}/resources/safeMgr/role/addEdit.js"></script>
  <!--End-->
</head>

<body>
<div class="jiekouxiangqing">
        <div>
            <div class="objBoxContB" style=" margin-bottom:0px;">        
            	<form id="signupForm">
                    <div class="addFormCont" style="padding-top:0px;">
                        <input type="hidden" id="id" name="id" value="${role.id}"/>
                        <input type="hidden" value="${parentId}" id="parentId" name="parentId">
	                    <div class="addFormContBody">
	                        <table class="addFormTable">
	                                <tr>
	                                    <th>角色名称:</th>
	                                    <td>
	                                        <input id="name" name="name" value="${role.name}" class="proInput" type="text" style="width:241px;height:38px"
	                                          data-rule-required="true" data-msg-required="角色名称不能为空"/>
	                                        <font class="redstar">*</font>
	                                    </td>
	
	                                </tr>
	                                <tr>
	                                	<th>备注:</th>
	                                    <td>
	                                        <textarea class="textareaStyle"
                                              style="width:241px; height:80px;" id="remark" name="remark">${role.remark}</textarea>
	                                    </td>
	                                </tr>
	                            </table>
	                    </div>
                </div>
             	</form>
                <%--<div align="center" style="padding: 20px">--%>
                    <%--<button id="btnSubmit" class="btnSend">保&nbsp;&nbsp;&nbsp;&nbsp;存</button>--%>
                    <%--<button id="btnCancel" class="btnSend">取&nbsp;&nbsp;&nbsp;&nbsp;消</button>--%>
                <%--</div>--%>
				<div class="titleBar">
					<ul class="toolBarList" style="margin-left:5px; padding-right: 32%;">
						<li><a href="javascript:void(0)" id="btnSubmit">保&nbsp;&nbsp;存</a></li>
						<li><a href="javascript:void(0)" id="btnCancel">取&nbsp;&nbsp;消</a></li>
					</ul>
				</div>
            </div>
      </div>
</body>
</html>
