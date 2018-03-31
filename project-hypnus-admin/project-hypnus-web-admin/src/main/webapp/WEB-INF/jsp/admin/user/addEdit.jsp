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

	<style>
		#editpwd{
			float: left;
			margin: 12px 5px;
			height: 26px;
			line-height: 26px;
			padding: 0 10px;
			background: #3CABD8;
			border-bottom: 2px solid #309FCC;
			cursor: pointer;
			border-radius: 3px;
		}
		#editpwd a{
			height: 26px;
			line-height: 26px;
			color: #fff;
			font-family: '微软雅黑';
			text-align: center;
			letter-spacing: 1px;
		}
	</style>
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
            	<form id="saveForm" method="post">
                    <div class="addFormCont" style="padding-top:0px;">
                   		<input id="id" type="hidden" name="id" value="${info.id}"/>
                    	<div class="addFormContHead">
		                    <h1 class="addFormConthText"><font>1</font>填写基本信息</h1>
		                </div>
	                    <div class="addFormContBody">
							<table class="addFormTable">
								<tr>
									<th>用户手机:</th>
									<td>
										<input id="phone" name="phone" value="${info.phone}" class="proInput" type="text" style="width:241px;height:38px"
											   data-rule-required="true" data-msg-required="用户手机不能为空" readonly/>
										<font class="redstar">*</font>
										<span id="editPwd"><a>修改密码</a></span>
									</td>
								</tr>
								<tr>
									<th>邮箱:</th>
									<td>
										<input id="email" name="email" value="${info.email}" class="proInput" style="width:241px;height:38px"/>
									</td>
								</tr>
								<tr>
									<th>出生日期:</th>
									<td>
										<div class="mohusearch" style="float: left; margin-left: 3px; margin-top: 3px;width: 230px">
											<input style="width: 220px" id="birthday" name="birthday" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd', maxDate:'new Date()'})" value="<fmt:formatDate value="${info.birthday}" pattern="yyyy-MM-dd"/>" class="searchSimpleInputb xw_searchInput timeInput" value="" type="text" onClick="WdatePicker()">
										</div>
									</td>
								</tr>
								<tr>
									<th>身高:</th>
									<td>
										<input id="height" name="height" value="${info.height}" class="proInput" style="width:241px;height:38px"/><span style="margin: 20px 5px;float:left;">cm</span>
									</td>
								</tr>
								<tr>
									<th>体重:</th>
									<td>
										<input id="weight" name="weight" value="${info.weight}" class="proInput" style="width:241px;height:38px"/><span style="margin: 20px 5px;float:left;">kg</span>
									</td>
								</tr>


								<tr>
									<th>联系地址:</th>
									<td>
	                                        <textarea class="textareaStyle"
													  style="width:90%; height:80px;" id="address" name="address"
													  data-rule-maxlength="500" data-msg-maxlength="联系地址不超过500个字节">${info.address}</textarea>
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
