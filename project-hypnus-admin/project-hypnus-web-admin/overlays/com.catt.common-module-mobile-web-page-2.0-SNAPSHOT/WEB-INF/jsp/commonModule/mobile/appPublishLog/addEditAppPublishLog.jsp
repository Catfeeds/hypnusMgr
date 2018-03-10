<%--
  User: weirongfeng
  Date: 2017-08-22
  Time: 10:30:58
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/common/headModule2.jsp" %>
    <%@include file="/mobile/basicSet.jsp" %>
    <title><c:if test="${entity.id == null}">新增APP版本</c:if>
        <c:if test="${entity.id != null}">编辑企APP版本</c:if></title>
    <script type="text/javascript"
            src="${path}/resources/commonModule/mobile/appPublishLog/js/addEditAppPublishLog.js"></script>
</head>

<body class="${systemBgClass} ${systemSkin}">

<section class="content-header">
    <!-- 面包屑 -->
    <ol class="breadcrumb">
        <li><a><i class="fa fa-home"></i>首页</a></li>
        <li><a href="${path}/admin/commonmodule/mobile/apppublishLog/view/appPublishLogList">APP版本管理</a></li>
        <li class="active"><c:if test="${entity.id == null}">新增APP版本</c:if>
            <c:if test="${entity.id != null}">编辑企APP版本</c:if></li>
    </ol>
    <!-- /.面包屑 -->
</section>

<section class="content">
    <form id="form" class="form-horizontal" onsubmit="return false;">
        <input type="hidden" id="id" name="id" value="${entity.id}"/>
        <div class="box box-solid">
            <div class="box-body">
                <div class="box-body form-horizontal">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="form-group col-md-12 col-xs-12">
                                <label class="control-label col-md-2">平台类型：</label>
                                <div class="col-md-4">
                                    <div class="radio">
                                        <c:if test="${entity.platform == null || entity.platform == 2}">
                                            <label>
                                                <input type="radio" name="platform" value="2" checked>
                                                &nbsp;&nbsp;Android&nbsp;&nbsp;
                                            </label>
                                            <label>
                                                <input type="radio" name="platform" value="1">
                                                &nbsp;&nbsp;iOS&nbsp;&nbsp;
                                            </label>
                                        </c:if>
                                        <c:if test="${entity.platform == 1}">
                                            <label>
                                                <input type="radio" name="platform" value="2">
                                                &nbsp;&nbsp;Android&nbsp;&nbsp;
                                            </label>
                                            <label>
                                                <input type="radio" name="platform" value="1" checked>
                                                &nbsp;&nbsp;iOS&nbsp;&nbsp;
                                            </label>
                                        </c:if>
                                    </div>
                                </div>
                                <label for="version" class="control-label col-md-2">版本号：</label>
                                <div class="col-md-4">
                                    <input type="text" class="form-control" id="version" name="version"
                                           value="${entity.version}" maxlength="20" data-rule-required="true">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-12 col-xs-12">
                                <label for="versionDesc" class="control-label col-md-2">版本描述：</label>
                                <div class="col-md-10">
                                    <textarea class="form-control" id="versionDesc" name="versionDesc"
                                              maxlength="150" data-rule-required="true">${entity.versionDesc}</textarea>
                                    (限150字)
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-12 col-xs-12">
                                <label class="control-label col-md-2">是否强制升级：</label>
                                <div class="col-md-4">
                                    <div class="radio">
                                        <c:if test="${entity.forceUpdate == null || entity.forceUpdate == 2}">
                                            <label>
                                                <input type="radio" name="forceUpdate" value="1">
                                                &nbsp;&nbsp;是&nbsp;&nbsp;
                                            </label>
                                            <label>
                                                <input type="radio" name="forceUpdate" value="2" checked>
                                                &nbsp;&nbsp;否&nbsp;&nbsp;
                                            </label>
                                        </c:if>
                                        <c:if test="${entity.forceUpdate == 1}">
                                            <label>
                                                <input type="radio" name="forceUpdate" id="forceUpdate1" value="1" checked>
                                                &nbsp;&nbsp;是&nbsp;&nbsp;
                                            </label>
                                            <label>
                                                <input type="radio" name="forceUpdate" id="forceUpdate2" value="2">
                                                &nbsp;&nbsp;否&nbsp;&nbsp;
                                            </label>
                                        </c:if>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-md-12 col-xs-12">
                                <label for="detailUrl" class="control-label col-md-2">详情链接：</label>
                                <div class="col-md-10">
                                    <input type="text" class="form-control" id="detailUrl" name="detailUrl"
                                           value="${entity.detailUrl}" data-rule-required="true">
                                </div>
                            </div>
                        </div>

                        <div class="row" id="uploadRow">
                            <div class="form-group col-md-12 col-xs-12">
                                <label for="fileName" class="control-label col-md-2">上传APK：</label>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" id="fileName" value="${fileName}" readonly>
                                </div>
                                <div id="apkPicker" style="text-align: left;">
                                    <button type="button" id="upload" class="${btnCharge}"
                                            width="90" height="34">
                                        &nbsp;选&nbsp;&nbsp;择&nbsp;</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 操作按钮 -->
                <div class="box box-solid">
                    <div class="box-body">
                        <p class="pull-right">
                            <button type="submit" id="companySave" class="${btnCharge}">
                                &nbsp;保&nbsp;&nbsp;存&nbsp;</button>
                            <a href="#" onclick="javascript:window.history.back();"
                               class="${btnDefault}">&nbsp;取&nbsp;&nbsp;消&nbsp;</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>


    </form>
</section>

</body>
</html>
