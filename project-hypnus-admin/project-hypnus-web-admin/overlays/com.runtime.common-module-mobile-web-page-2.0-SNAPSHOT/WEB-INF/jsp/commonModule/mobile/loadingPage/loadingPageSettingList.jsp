<%--
  Created by IntelliJ IDEA.
  User: weirongfeng
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
    <title>版面设置</title>
    <script type="text/javascript"
            src="${path}/resources/commonModule/mobile/loadingPage/js/loadingPageSettingList.js"></script>
</head>
<body class="${systemBgClass} ${systemSkin}">
<section class="content-header">
    <!-- 面包屑 -->
    <ol class="breadcrumb">
        <li><a><i class="fa fa-home"></i>首页</a></li>
        <li class="active">版面设置</li>
    </ol>
    <!-- /.面包屑 -->
</section>
<section class="content">
    <!-- 列表 -->
    <div class="box box-solid">
        <div class="box-header with-border">
            <h1 class="box-title">
                共有
                <font id="lblCount" class="color-charge-primary"
                      style="font-size: 18px;padding: 0 5px;">0</font>
                条记录
            </h1>
            <div class="box-tools pull-right">
                <a type="button" id="btnAdd" class="${btnCharge}"
                   href="${path}/admin/commonmodule/mobile/loadingpageset/view/addEditloadingPage">
                    &nbsp;新&nbsp;&nbsp;增&nbsp;
                </a>
                <button type="button" id="btnModify" class="${btnCharge}">
                    &nbsp;修&nbsp;&nbsp;改&nbsp;
                </button>
                <button type="button" id="btnDel" class="${btnDefault}">
                    &nbsp;删&nbsp;&nbsp;除&nbsp;
                </button>
            </div>
        </div>
        <div class="box-body no-padding table-responsive">
            <div id="tableContainer" style="background: #f7f7f7">
            </div>
        </div>

        <div class="box-footer">
            <div class="pageBar"></div>
        </div>
    </div>
    <!-- /.列表 -->
</section>
<!-- 模板 -->
<script id="templateList" type="text/html">
    {{each content as item idx}}
        <div style="width: 33%;display: inline-block;">
            <div style="margin: 10px 10px 10px 0px;background: #fff;padding: 10px;">
                <div style="overflow: hidden;margin-bottom: 10px;">
                    <input type="checkbox" check-all="false" class="minimal-red check">
                    <font style="font-size: 14px;color: #646464;margin-left: 8px;margin-top: 8px;">{{item.createDate}} 发布</font>
                </div>
                <div>
                    <div style="position: relative;text-align: center">
                        <img height="305px" width="185px" style="border: 0px;margin: 0;" src="{{item.loadingPage}}">
                    </div>
                    <div style="overflow: hidden;">
                        <div style="border-bottom: 1px solid #e5e5e5;position: relative;font-size: 14px;color: #646464;line-height: 32px;padding-left: 22px;letter-spacing: 1px;">
                            <img style="width: 18px;height: 18px;position: absolute;left: 0;top: 8px;" src="${path}/resources/commonModule/mobile/loadingPage/images/huodong_ic_time.png">
                            {{item.startDate.substring(0,10)}}至{{item.endDate.substring(0,10)}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {{/each}}
</script>

<script id="templateNoData" type="text/html">

    <div style="text-align: center;height: 40px;line-height: 40px;"> 暂无数据</div>

</script>
</body>
</html>
