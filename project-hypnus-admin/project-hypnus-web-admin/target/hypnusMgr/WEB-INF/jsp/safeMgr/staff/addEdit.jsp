<%--
  User: yxc
  Date: 2015/6/29
--%>

<%@page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html >
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>用户管理</title>
    <%@include file="/common/headRefModule.jsp" %>

    <link rel="stylesheet" type="text/css" href="${path}/resources/safeMgr/css/ziyuanDetail_ctr.css" />
	<link rel="stylesheet" type="text/css" href="${path}/resources/safeMgr/css/addziyuan_style.css" />
    <link type="text/css" rel="stylesheet" href="${path}/resources/css/addnew.css"/>
    <link type="text/css" rel="stylesheet" href="${path}/resources/safeMgr/css/shijianchanpin.css"/>

	<script type="text/javascript" src="${path}/resources/safeMgr/staff/addEdit.js"></script>
  <!--End-->
</head>
<!--日历控件引入-->
<script type="text/javascript" src="${path}/resources/sea-modules/My97DatePicker/4.8/WdatePicker.js"></script>
<!--日历控件引入 END-->
<body>
<div class="jiekouxiangqing">
        <div class="pageMain" style="min-height: 0px; height:auto;">
            <div class="objBoxContB" style=" margin-bottom:0px;">        
            	<form id="signupForm" method="post">     
                    <div class="addFormCont" style="padding-top:0px;">
                   		<input id="id" type="hidden" name="id" value="${entity.id}"/>
                    	<div class="addFormContHead">
		                    <h1 class="addFormConthText"><font>1</font>填写基本信息</h1>
		                </div>
	                    <div class="addFormContBody">
	                        <table class="addFormTable">
	                                <tr>
	                                    <th>姓名:</th>
	                                    <td>
	                                        <input id="name" name="name" value="${entity.name}" class="proInput" type="text" style="width:241px;height:38px"
	                                          data-rule-required="true" data-msg-required="姓名不能为空"/>
	                                        <font class="redstar">*</font>
	                                    </td>

	                                    <th>所属部门：</th>
			                             <td>
                                                <div class="mohusearch" style=" float:left;width:245px;">
                                                    <input type="text" class="searchSimpleInputb xw_searchInput" id="deptName" name="deptName" name="deptName" readonly value="${deptName}"/>
                                                    <a class="xuanze" style="margin:0px;" onclick="EventHandler.getDept();">选  择</a>
                                                </div>
			                               <font class="redstar">*</font>
			                               <input type="text" data-rule-required="true" data-msg-required="所属部门不能为空" style="display: none"  name="deptId" id="deptId" value="${deptId}"/>
			                             	
			                            </td>
	                                </tr>
	                                <tr>
	                                	<th>账号:</th>
	                                    <td>
	                                        <input ${entity.id != null ? 'readonly' : ''} id="account" name="account" value="${entity.account}" class="proInput" style="width:241px;height:38px"
	                                        data-rule-required="true" data-msg-required="账号不能为空"/>
	                                        <font class="redstar">*</font>
	                                    </td>
	                                    <th>性别:</th>
	                                    <td>
	                                        <input id="gender" name="gender" value="${entity.gender == null ? 0 : entity.gender}" class="proInput" style="width:210px;"/>
	                                    </td>
	                                </tr>
	                                <tr>

										<th>出生日期:</th>
                	                   <td>
                	                   <div class="mohusearch" style="float: left; margin-left: 3px; margin-top: 3px;width: 230px">
                	                   		<input style="width: 220px" id="birth" name="birth" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd', maxDate:'new Date()'})" value="${birth}" class="searchSimpleInputb xw_searchInput timeInput" value="" type="text" onClick="WdatePicker()">
                            			</div>
                                       </td>
	                                    <th>移动号码:</th>
	                                    <td>
	                                        <input id="mobile" name="mobile" value="${entity.mobile}" class="proInput" style="width:241px;height:38px"/>
	                                    </td>
	                                </tr>
	                                 <%--<tr>--%>
	                                    <%--<th>固定电话:</th>--%>
	                                    <%--<td>--%>
	                                        <%--<input id="phone" name="phone" value="${entity.phone}" class="proInput" style="width:241px;height:38px"/>--%>
	                                    <%--</td>--%>
	                                    <%--<th>传真电话:</th>--%>
	                                    <%--<td>--%>
	                                   	 	<%--<input id="fax" name="fax" value="${entity.fax}" class="proInput" style="width:241px;height:38px"/>--%>
	                                    <%--</td>--%>
	                                <%--</tr>--%>
	                                <tr>
	                                	<th>内部邮箱:</th>
	                                    <td>
	                                        <input id="inEmail" name="inEmail" value="${entity.inEmail}" class="proInput" style="width:241px;height:38px"/>
	                                    </td>
	                                    <th style="display: none">外部邮箱:</th>
	                                    <td style="display: none">
	                                        <input id="outEmail" name="outEmail" value="${entity.outEmail}" class="proInput" style="width:241px;height:38px"/>
	                                    </td>
	                                </tr>
	                               
	                                <tr>
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
