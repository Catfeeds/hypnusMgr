<%--
  User: yxc
  Date: 2015/6/29
--%>

<%@page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<!DOCTYPE >
<html >
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>经销商管理</title>
    <%@include file="/common/headRefModule.jsp" %>

    <link rel="stylesheet" type="text/css" href="${path}/resources/safeMgr/css/ziyuanDetail_ctr.css" />
	<link rel="stylesheet" type="text/css" href="${path}/resources/safeMgr/css/addziyuan_style.css" />
    <link type="text/css" rel="stylesheet" href="${path}/resources/css/addnew.css"/>
    <link type="text/css" rel="stylesheet" href="${path}/resources/safeMgr/css/shijianchanpin.css"/>

	<script type="text/javascript" src="${path}/resources/admin/js/user/addEdit.js"></script>
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
	                                    <th>经销商名称:</th>
	                                    <td>
	                                        <input id="name" name="name" value="${entity.name}" class="proInput" type="text" style="width:241px;height:38px"
	                                          data-rule-required="true" data-msg-required="经销商名称不能为空"/>
	                                        <font class="redstar">*</font>
	                                    </td>

										<th>联系人名称:</th>
										<td>
											<input id="name" name="name" value="${entity.name}" class="proInput" type="text" style="width:241px;height:38px"
												   data-rule-required="true" data-msg-required="经销商名称不能为空"/>
											<font class="redstar">*</font>
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

	                                <tr>
	                                	<th>内部邮箱:</th>
	                                    <td>
	                                        <input id="inEmail" name="inEmail" value="${entity.inEmail}" class="proInput" style="width:241px;height:38px"/>
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
