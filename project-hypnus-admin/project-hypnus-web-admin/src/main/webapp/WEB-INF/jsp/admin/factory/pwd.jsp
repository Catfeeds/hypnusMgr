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

	<script type="text/javascript" src="${path}/resources/admin/js/factory/pwd.js"></script>
  <!--End-->
</head>
<!--日历控件引入-->
<script type="text/javascript" src="${path}/resources/sea-modules/My97DatePicker/4.8/WdatePicker.js"></script>
<!--日历控件引入 END-->
<body>
<div class="jiekouxiangqing">
        <div class="pageMain" style="min-height: 0px; height:auto;">
            <div class="objBoxContB" style=" margin-bottom:0px;">        
            	<form id="saveForm" method="post">
                    <div class="addFormCont" style="padding-top:0px;">
                   		<input id="id" type="hidden" name="id" value="${id}"/>
                    	<div class="addFormContHead">
		                    <h1 class="addFormConthText"><font>1</font>修改密码</h1>
		                </div>
	                    <div class="addFormContBody">
							<table class="addFormTable">
								<tr>
									<th>新密码:</th>
									<td>
										<input id="password" name="password"  class="proInput" type="password" style="width:241px;height:38px"
											   data-rule-required="true" data-msg-required="新密码不能为空"/>
										<font class="redstar">*</font>
									</td>
								</tr>

								<tr>
									<th>确认密码:</th>
									<td>
										<input id="confirmPwd" name="confirmPwd"  class="proInput" style="width:241px;height:38px" data-msg-required="确认密码不能为空"/>
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
