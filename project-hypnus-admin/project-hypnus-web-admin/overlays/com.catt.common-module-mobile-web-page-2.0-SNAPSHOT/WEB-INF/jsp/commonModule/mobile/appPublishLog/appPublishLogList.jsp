<%--
  Created by IntelliJ IDEA.
  User: weirongfeng
  Date: 2017年08月22日
  Time: 09:34:29
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" pageEncoding="utf-8" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/common/headModule2.jsp" %>
    <%@include file="/mobile/basicSet.jsp" %>
    <title>APP版本管理</title>
    <script type="text/javascript"
            src="${path}/resources/commonModule/mobile/appPublishLog/js/appPublishLogList.js"></script>
</head>
<body class="${systemBgClass} ${systemSkin}">
<section class="content-header">
    <!-- 面包屑 -->
    <ol class="breadcrumb">
        <li><a><i class="fa fa-home"></i>首页</a></li>
        <li class="active">APP版本管理</li>
    </ol>
    <!-- /.面包屑 -->
</section>
<section class="content">
    <!-- 列表 -->
    <div class="box box-solid">
        <div class="box-header with-border">
            <%--<h4 class="box-title titleText">&nbsp;客户列表</h4>--%>
            <h1 class="box-title">
                共有
                <font id="lblCount" class="${fontColor}"
                      style="font-size: 18px;padding: 0 5px;">0</font>
                条记录
            </h1>
            <div class="box-tools pull-right">
                <a type="button" id="btnAdd" class="${btnCharge}"
                   href="${path}/admin/commonmodule/mobile/apppublishLog/view/addEditAppPublishLog">
                    &nbsp;新&nbsp;&nbsp;增&nbsp;
                </a>
                <button type="button" id="btnModify" class=" ${btnCharge}">
                    &nbsp;修&nbsp;&nbsp;改&nbsp;
                </button>
                <button type="button" id="btnDel" class="${btnDefault}">
                    &nbsp;删&nbsp;&nbsp;除&nbsp;
                </button>
            </div>
            <%--</div>--%>
        </div>

        <div class="box-body no-padding table-responsive">
            <table class="${tableStyle}" id="tableContainer">
                <thead>
                <tr>
                    <th style="width: 10px">
                        <input type="checkbox" check-all="true" class="minimal-red check">
                    </th>
                    <th>类型</th>
                    <th>版本号</th>
                    <th>二维码</th>
                    <th>发布时间</th>
                </tr>
                </thead>
                <tbody id="tableList">

                </tbody>
            </table>
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
    <tr onmousedown="window.saveDownPosition(this, event);"
        onclick="if(window.positionIsMove(this, event)){ return; } window.location.href = '${path}/admin/appPublishLog/view/appPublishLogDetail?id={{item.id}}'"
        title="单击查看详情" style="cursor:pointer">
        <td>
            <label>
                <input type="checkbox" check-all="false" class="minimal-red check">
            </label>
        </td>
        {{if item.platform==1}}
        <td>IOS</td>
        {{/if}}
        {{if item.platform==2}}
        <td>Android</td>
        {{/if}}
        <td>{{item.version}}</td>
        <%--二维码--%>
        <td style="text-align:center;" class="code" itemId="{{item.id}}">
                <img src="${path}/resources/commonModule/mobile/appPublishLog/images/code16.png"
                     style="cursor: pointer;">
        </td>
        <td>{{item.createDate}}</td>
    </tr>
    {{/each}}
</script>

<script id="templateNoData" type="text/html">
    <tr>
        <td colspan="10" style="text-align: center"> 暂无数据</td>
    </tr>
</script>
</body>
</html>
