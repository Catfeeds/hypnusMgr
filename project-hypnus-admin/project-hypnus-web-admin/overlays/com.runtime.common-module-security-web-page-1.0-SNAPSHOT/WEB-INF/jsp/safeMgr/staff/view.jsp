<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>详情</title>
  <%@include file="/common/head.jsp" %>
  <link rel="stylesheet" type="text/css" href="${path}/resources/admin/css/ziyuanDetail_ctr.css" />
  <script type="text/javascript" src="${path}/resources/admin/js/zydetail_ctr.js"></script>
  <script type="text/javascript" src="${path}/resources/safeMgr/staff/view.js"></script>
</head>

<body>
  	<div class="xinzeng">
       
        <div class="" style="min-height: 200px">

		    <div class="objBoxContB" style=" margin-bottom:0px;">
		      <div class="objBoxContBHead">
		        <h1 class="objBoxContBhText">个人信息</h1>
		      </div>
		
		      <div class="objBoxContBBody" style="background:#fff; padding:0px 0px ;">
		        <table class="sgDetailTable">
		          <tr>
		            <th>姓名:</th><td>${entity.name}</td>
		            <th>账号:</th><td>${entity.account}</td>
		          </tr>
		          <tr>
		            <th>性别:</th><td>${entity.genderName}</td>
		            <th>出生日期:</th><td>${entity.birth}</td>
		          </tr>
		           <tr>
		            <th>移动号码:</th><td>${entity.mobile}</td>
		            <th>固定电话:</th><td>${entity.phone}</td>
		          </tr>
		           <tr>
		            <th>传真电话:</th><td>${entity.fax}</td>
		          </tr>
		           <tr>
		            <th>工作地址:</th><td>${entity.workAddress}</td>
		          </tr>
		          <tr>
		          	<th>内部邮箱:</th><td>${entity.inEmail}</td>
		            <th>外部邮箱:</th><td>${entity.outEmail}</td>
		          </tr>
		        </table>
		      </div>
		    </div>
		  </div>
		         <div class="comfirBar">
                <ul class="ctrolToolbarUl ctrolToolbarUlB" style="float:none;">
                	<li><a id="changPerson" style="display: none">修改个人信息</a></li>
                    <li><a id="changPassword">修改密码</a></li>
                </ul>
		    </div>
    </div>

</body>
</html>
