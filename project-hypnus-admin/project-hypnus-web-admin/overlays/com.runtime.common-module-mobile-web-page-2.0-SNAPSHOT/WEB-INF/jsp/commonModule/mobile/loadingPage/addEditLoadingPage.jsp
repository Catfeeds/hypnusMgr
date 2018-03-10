<%--
  Created by IntelliJ IDEA.
  User: zhouminghxiang
  Date: 2017-07-21
  Time: 11:44:57
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/common/headModule2.jsp" %>
    <%@include file="/mobile/basicSet.jsp" %>
    <c:choose>
        <c:when test="${data.id == null || data.id==''}">
            <title>新增启动页</title>
        </c:when>
        <c:otherwise>
            <title>修改启动页</title>
        </c:otherwise>
    </c:choose>

    <script type="text/javascript" src="${path}/resources/commonModule/mobile/loadingPage/js/addEditLoadingPage.js"></script>
</head>
<body class="${systemBgClass} ${systemSkin}">

<section class="content-header">
    <!-- 面包屑 -->
    <ol class="breadcrumb">
        <li><a><i class="fa fa-home"></i>首页</a></li>
        <li><a href="${path}/admin/commonmodule/mobile/loadingpageset/view/loadingPageSettingList">版面设置</a></li>
        <c:choose>
            <c:when test="${data.id == null || data.id==''}">
                <li class="active">新增启动页</li>
            </c:when>
            <c:otherwise>
                <li class="active">修改启动页</li>
            </c:otherwise>
        </c:choose>
    </ol>
    <!-- /.面包屑 -->
</section>

<section class="content">
    <form id="form" onsubmit="return false;">
        <input type="hidden" name="id" id="id" value="${data.id}">
        <!-- 基本信息 -->
        <div class="box box-solid">
            <div class="box-header with-border">
                <div class="box-title">
                    <span class="box-title-split"></span>
                    <c:choose>
                        <c:when test="${data.id == null || data.id==''}">
                            新增启动页
                        </c:when>
                        <c:otherwise>
                            修改启动页
                        </c:otherwise>
                    </c:choose>
                </div>
                <div class="box-tools pull-right">
                    <button type="button" class="btn btn-box-tool" data-widget="collapse">
                        <i class="fa fa-minus"></i>
                    </button>
                </div>
            </div>
            <div class="box-body form-horizontal">
                <div class="container-fluid">
                    <div class="row">
                        <div class="form-group col-sm-12">
                            <label for="startDate" class="control-label col-sm-2">
                                <font color="red">*</font>
                                开始时间:
                            </label>
                            <div class="col-sm-4">
                                <input type="text" class="form-control"
                                       data-rule-required="true" value="${fn:substring(data.startDate,0,10)}"
                                       id="startDate" name="startDate"/>
                            </div>
                            <label for="endDate" class="control-label col-sm-2">
                                <font color="red">*</font>
                                结束时间:
                            </label>
                            <div class="col-sm-4">
                                <input type="text" class="form-control"
                                       data-rule-required="true" value="${fn:substring(data.endDate,0,10)}"
                                       id="endDate" name="endDate"/>
                            </div>
                        </div>
                        <div class="form-group col-sm-12 col-xs-12 ">
                            <label class="control-label col-sm-2 col-xs-12">
                                <font color="red">*</font>
                                上传图片:
                            </label>
                            <div class="col-sm-10 col-xs-12">
                                <div id="addPic" style="float:left;border-radius: 5px;border: 1px solid #70e9c1;;width: 185px;overflow: hidden;padding: 0;text-align: center">
                                    <c:choose>
                                        <c:when test="${data.id == null || data.id==''}">
                                            <img height="305px" width="185px" id="showPic"
                                                 src="${path}/resources/commonModule/mobile/loadingPage/images/pageBg.png">
                                        </c:when>
                                        <c:otherwise>
                                            <img height="305px" width="185px" id="showPic" initData="true"
                                                 src="${data.loadingPage}">
                                        </c:otherwise>
                                    </c:choose>
                                </div>
                                <p class="control-label"
                                   style="text-align:left;float:left;margin-left: 10px;margin-top: 60px;">
                                    图片上传的格式为jpg或png；<br>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.基本信息 -->

        <!-- 操作按钮 -->
        <div class="box box-solid">
            <div class="box-footer text-right">
                <button type="submit" id="btnSave" class="${btnCharge}" data-loading-text="Loading...">
                    &nbsp;&nbsp;保&nbsp;&nbsp;存&nbsp;&nbsp;</button>
                <button type="button" id="btnCancle" class="${btnDefault}">&nbsp;&nbsp;取&nbsp;&nbsp;消&nbsp;&nbsp;</button>
            </div>
        </div>
        <!-- /.操作按钮 -->
    </form>
</section>

</body>
</html>
<style type="text/css">
    .webuploader-pick {
        border-radius: 3px;
        cursor: pointer;
        display: inline-block;
        overflow: visible;
        position: relative;
        text-align: center;
    }
</style>
