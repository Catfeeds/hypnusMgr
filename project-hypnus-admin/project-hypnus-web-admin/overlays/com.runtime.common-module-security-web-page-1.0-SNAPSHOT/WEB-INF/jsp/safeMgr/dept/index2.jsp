<%--
  Created by IntelliJ IDEA.
  User: Chen ZhiYuan
  Date: 2015/6/123
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<!DOCTYPE html >
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>部门管理</title>
    <%@include file="/common/headRefModule.jsp" %>


    <link rel="stylesheet" type="text/css" href="${path}/resources/safeMgr/css/shijianchanpin.css" />
    <link rel="stylesheet" href="${path}/resources/safeMgr/css/public.css" type="text/css"  />
    <link rel="stylesheet" href="${path}/resources/safeMgr/css/user.css" type="text/css"  />
<script type="text/javascript" src="${path}/resources/safeMgr/js/pagecommon_ctr.js"></script>
<link rel="stylesheet" type="text/css" href="${path}/resources/ztreeSafe/zTreeStyle/zTreeStyle.css">
<script type="text/javascript" src="${path}/resources/ztreeSafe/jquery.ztree.all-3.5.js"></script>
<script type="text/javascript" src="${path}/resources/safeMgr/dept/index2.js"></script>
<script>
	var action = "${action}";
    var staffId = "${staffId}";
    var level = "${level}";
    var check = "${check}";
    var deptIds = "${deptIds}";
</script>
</head>

<body>

<div class="pageMain" style="min-height: 100px;">
	  <div class="leftMain" style="display:${'menu' eq param['action']?'none':'block'};">
		<c:if test="${'check' ne param['action']}">
		<div class="addressBar">
		  <a class="jumpback" >部门管理</a>
		  <a class="goback" onclick="history.go(-1);">返回上一层</a>
		</div>
		</c:if>
		<div class="objBoxContB" style=" margin-bottom:0px;">
		  <div class="objBoxContBBody" style="background:#fff; padding:0px 0px 0;">

			<div class="titleBar">
			  <ul class="toolBarList" style="margin-left:5px;">
				<c:choose>
					<c:when test="${action == 'check'}">
						 <li><a id="btnOK" onclick="EventHandler.checkBack();">确认</a></li>
					</c:when>
				</c:choose>
			  </ul>
			</div>
		  </div>
		</div>
	  </div>
	<div class="addressBar" style="display:${'menu' eq param['action']?'block':'none'};" style="padding: 0px;margin: 0px;">
		<a class="leader" onclick="backtoIndex();">组织目录</a>
	</div>
	<ul id="tree" class="ztree" style="width:450px; overflow:auto;"></ul>
</div>
</body>
</html>

