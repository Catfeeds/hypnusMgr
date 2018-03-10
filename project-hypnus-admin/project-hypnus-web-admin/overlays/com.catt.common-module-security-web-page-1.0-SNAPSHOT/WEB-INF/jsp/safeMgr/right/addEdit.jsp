<%--
  User: yxc
  Date: 2015/6/29
--%>

<%@page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html >
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>权限管理</title>
    <%@include file="/common/headRefModule.jsp" %>

    <link rel="stylesheet" type="text/css" href="${path}/resources/safeMgr/css/ziyuanDetail_ctr.css" />
	<link rel="stylesheet" type="text/css" href="${path}/resources/safeMgr/css/addziyuan_style.css" />
    <link type="text/css" rel="stylesheet" href="${path}/resources/css/addnew.css"/>
    <link type="text/css" rel="stylesheet" href="${path}/resources/safeMgr/css/shijianchanpin.css"/>

	<script type="text/javascript" src="${path}/resources/safeMgr/right/addEdit.js"></script>
  <!--End-->
</head>
<body>
<div class="jiekouxiangqing">
        <div>
            <div class="objBoxContB" style=" margin-bottom:0px;">        
            	<form id="signupForm" method="post">     
                    <div class="addFormCont" style="padding-top:0px;">
                        <input type="hidden" id="id" name="id" value="${right.id}"/>
                        <input type="hidden" id="parentId" name="parentId" value="${parentId}"/>
                        <input type="hidden" id="app" name="app" value="${right.app}"/>
	                    <div class="addFormContBody">
	                        <table class="addFormTable">
	                                <tr>
	                                    <th>权限名称:</th>
	                                    <td>
	                                        <input id="name" name="name" value="${right.name}" class="proInput" type="text" style="width:241px;height:38px"
	                                          data-rule-required="true" data-msg-required="权限名称不能为空"/>
	                                        <font class="redstar">*</font>
	                                    </td>
                                        <th>权限类型:</th>
                                        <td>
                                            <input id="type" name="type" value="${right.type == null ? 1 : right.type}" class="proInput" style="width:210px;"/>
                                        </td>
	                                </tr>
	                                <tr>
	                                	<th>权限地址:</th>
	                                    <td>
                                            <input id="url" name="url" value="${right.url}" class="proInput" type="text" style="width:241px;height:38px"
                                                   data-rule-required="true" data-msg-required="权限地址不能为空"/>
	                                        <font class="redstar">*</font>
	                                    </td>
                                        <th>序号:</th>
                                        <td>
                                            <input id="seq" name="seq" value="${right.seq}" class="proInput" type="text" style="width:241px;height:38px"/>
                                        </td>
	                                </tr>
	                                <tr>
                                        <th>权限描述:</th>
                                        <td>
                                            <input id="remark" name="remark" value="${right.remark}" class="proInput" type="text" style="width:241px;height:38px"/>
                                        </td>
                                        <th style="display:none;">是否激活:</th>
                                        <td style="display:none;">
                                            <input id="isEnabled" name="isEnabled" value="${entity.isEnabled == null ? 1 : entity.isEnabled}" class="proInput" style="width:210px;"/>
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
                    <ul class="toolBarList" style="margin-left:5px; padding-right: 40%;">
                        <li><a href="javascript:void(0)" id="btnSubmit">保&nbsp;&nbsp;存</a></li>
                        <li><a href="javascript:void(0)" id="btnCancel">取&nbsp;&nbsp;消</a></li>
                    </ul>
                </div>
            </div>
      </div>
</div>
</body>
</html>
