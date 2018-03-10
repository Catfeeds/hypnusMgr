<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <%@include file="/common/headModule.jsp" %>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>订单详情</title>
<link type="text/css" rel="stylesheet" href="${path}/resources/css/common.css" />
<link type="text/css" rel="stylesheet"  href="${path}/resources/css/activitiesDetail.css"/>
<link type="text/css" rel="stylesheet"  href="${path}/resources/css/activities_list.css"/>
<link type="text/css" href="${path}/resources/css/addActivities.css" rel="stylesheet" />
<script src="${path}/resources/js/common_ctr.js" type="text/javascript"></script>
<script type="text/javascript" src="${path}/resources/js/kyeWord.js" ></script>
    <script src="${path}/resources/admin/js/customerMgr/cusCertification/detail.js" type="text/javascript"></script>
</head>

<body>
<div class="wrapper">
    <div class="positionNow">
    <a>主页 &gt; </a><a >身份信息审核</a> &gt; <a style="color:#ff4d4d;">详情</a></div>
    
     <div class="userDetail">
   	   <h1 class="tittle">
           <span class="btnRed" style="margin-left:6px;" id="auditCus">审核</span>
       	   身份信息
       </h1>
        <div class="activityMsn">
            <input id="id" value="${id}" type="hidden" />
            <input id="status" value="${status}" type="hidden" />
            <table class="activityMsnTable">
                <tr>
                    <td>店主昵称：</td>
                    <th>${nickname}</th>
                    <td>真实姓名：</td>
                    <th>${name}</th>
                </tr>
                <tr>
                    <td>手机号码：</td>
                    <th>${mobile}</th>
                    <td>身份证号：</td>
                    <th>${idCard}</th>
                </tr>
                <tr>
                    <td>提交时间：</td>
                    <th>${createDate}</th>
                    <td>审核状态：</td>
                    <th>
                        <c:if test="${status == 1}">
                            <span class="bgGrey">${statusName}</span>
                        </c:if>
                        <c:if test="${status == 2}">
                            <span class="bgBlue">${statusName}</span>
                        </c:if>
                        <c:if test="${status == 3}">
                            <span class="bgRed">${statusName}</span>
                        </c:if>
                    </th>
                </tr>
                <tr>
                    <td>审核意见：</td>
                    <th>${auditDesc}</th>
                </tr>
            </table>
        </div>
     </div>
     <div class="userDetail">
   	   <h1 class="tittle">身份证附件</h1>
        <div class="activityMsn">
            <table class="activityMsnTable">
                <tr>
                    <td width="200">身份证正面：</td>
                    <th><img src="${holdphotoPath}" class="idphoto" /></th>
                </tr>
                <tr>
                    <td>身份证反面：</td>
                    <th><img src="${cardpositivePath}" class="idphoto" /></th>
                </tr>
                <tr>
                    <td>手持身份证照片：</td>
                    <th><img src="${cardinversePath}" class="idphoto" /></th>
                </tr>
            </table>
        </div>
     </div>
</div>
</body>
</html>
