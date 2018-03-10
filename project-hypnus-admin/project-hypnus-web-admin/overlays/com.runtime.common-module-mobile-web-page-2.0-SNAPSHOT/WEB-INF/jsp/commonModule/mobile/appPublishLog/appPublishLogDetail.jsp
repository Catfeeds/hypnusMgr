<%--
  User: weirongfeng
  Date: 2017-08-22
  Time: 11:44:34
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/common/headModule.jsp" %>
    <%@include file="/mobile/basicSet.jsp" %>
    <title>APP版本详情</title>
    <script type="text/javascript"
            src="${path}/resources/commonModule/mobile/appPublishLog/js/appPublishLogDetail.js"></script>
    <style>
        .control-label {
            color: #000;
            font-family: "微软雅黑";
            font-size: 14px;
            font-weight: normal;
            text-align: right;
            padding-top: 7px;
            margin-bottom: 0;
        }
    </style>
</head>

<body class="${systemBgClass} ${systemSkin}">

<section class="content-header">
    <!-- 面包屑 -->
    <ol class="breadcrumb">
        <li><a><i class="fa fa-home"></i>首页</a></li>
        <li><a href="${path}/admin/commonmodule/mobile/loadingpageset/view/appPublishLogList">APP版本管理</a></li>
        <li class="active">APP版本详情</li>
    </ol>
    <!-- /.面包屑 -->
</section>

<section class="content">
    <!-- 基本信息 -->
    <div class="box box-solid">
        <div class="box-body">
            <div class="container-fluid">
                <div class="row">
                    <label class="control-label col-md-4" style="height: 30px">类型：</label>
                    <div class="col-md-8">
                        <c:if test="${entity.platform == 1}">
                            <p class="form-control-static">iOS</p>
                        </c:if>
                        <c:if test="${entity.platform == 2}">
                            <p class="form-control-static">Android</p>
                        </c:if>
                    </div>
                </div>

                <div class="row">
                    <label class="control-label col-md-4 area">版本号：</label>
                    <div class="col-md-8 area">
                        <p class="form-control-static">${entity.version}</p>
                    </div>
                </div>
                <div class="row">
                    <label class="control-label col-md-4 area">版本描述：</label>
                    <div class="col-md-8 area">
                        <p class="form-control-static">${entity.versionDesc}</p>
                    </div>
                </div>

                <div class="row">
                    <label class="control-label col-md-4 area">是否强制升级：</label>
                    <div class="col-md-8 area">
                        <c:if test="${entity.forceUpdate == 1}">
                            <p class="form-control-static">是</p>
                        </c:if>
                        <c:if test="${entity.forceUpdate == 2}">
                            <p class="form-control-static">否</p>
                        </c:if>
                    </div>
                </div>

                <div class="row">
                    <label class="control-label col-md-4 area">详情链接：</label>
                    <div class="col-md-8 area">
                        <p class="form-control-static">${entity.detailUrl}</p>
                    </div>
                </div>
                <c:if test="${entity.platform == 2}">
                    <div class="row">
                        <label class="control-label col-md-4 area">上传APK：</label>
                        <div class="col-md-8 area">
                            <p class="form-control-static">${fileName}</p>
                        </div>
                    </div>
                </c:if>

            </div>
        </div>
    </div>
    <!-- /.基本信息 -->
</section>

</body>
</html>
