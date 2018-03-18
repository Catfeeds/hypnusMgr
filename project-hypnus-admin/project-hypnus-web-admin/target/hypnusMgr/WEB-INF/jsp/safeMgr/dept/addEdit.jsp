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
	<script type="text/javascript" src="${path}/resources/safeMgr/js/zydetail_ctr.js"></script>
	<script type="text/javascript" src="${path}/resources/safeMgr/js/pagecommon_ctr.js"></script>
	
	<script type="text/javascript" src="${path}/resources/safeMgr/js/EasyUtil.js"></script>
	<script type="text/javascript" src="${path}/resources/safeMgr/dept/addEdit.js"></script>

  <!--End-->
</head>

<body>
<div class="jiekouxiangqing">
            <div class="objBoxContB" style=" margin-bottom:0px;">
            	<form id="signupForm" method="post" action="${path }/safeMgr/deptMgr/save">
                    <div class="addFormCont" style="padding-top:0px;">
                   		<input id="id" type="hidden" name="id" value="${entity.id}"/>
                   		<input id="pId" type="hidden" name="pId" value="${pId}"/>
                    	<input id="domainId" type="hidden" name="domainId" value="${entity.domain.id}"/>
	                    <div class="addFormContBody">
	                        <table class="addFormTable">
	                                <tr>
	                                    <th>部门名称:</th>
	                                    <td>
	                                        <input id="name" name="name" value="${entity.name}" class="proInput" type="text" style="width:241px;height:38px"
	                                          data-rule-required="true" data-msg-required="分类名称不能为空"/>
	                                        <font class="redstar">*</font>
	                                    </td>

	                                </tr>
	                                <tr style="display: none">
	                                	<th>部门编码:</th>
	                                    <td>
	                                        <input id="code" name="code" value="${entity.code}" class="proInput" style="width:241px;height:38px"/>
	                                    </td>
	                                </tr>
	                                <tr style="display: none">
	                                	<th>部门类型:</th>
	                                    <td>
	                                        <input id="type" name="type" value="${entity.type}" class="proInput" style="width:210px;"/>
	                                    </td>
	                                </tr>
	                                <tr style="display: none">
	                                 	<th>部门简称:</th>
	                                    <td>
                                            <input id="shortName" name="shortName" value="${entity.shortName}" class="proInput" style="width:241px;height:38px"/>
	                                    </td>
	                                </tr>
	                                 <tr>
	                                	<th>部门序号:</th>
	                                    <td>
	                                        <input id="seq" name="seq" value="${entity.seq}" class="proInput" style="width:241px;height:38px"/>
	                                    </td>
	                                </tr>
	                                <tr style="display: none">
	                                	<th>备注:</th>
	                                    <td>
	                                        <textarea class="textareaStyle"
                                              style="width:90%; height:80px;" id="remark" name="remark"
                                              data-rule-maxlength="500" data-msg-maxlength="备注不超过500个字节">${entity.remark}</textarea>
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
					<ul class="toolBarList" style="margin-left:5px; padding-right: 38%;">
						<li><a href="javascript:void(0)" id="btnSubmit">保&nbsp;&nbsp;存</a></li>
						<li><a href="javascript:void(0)" id="btnCancel">取&nbsp;&nbsp;消</a></li>
					</ul>
				</div>
            </div>
      </div>
</body>
</html>
