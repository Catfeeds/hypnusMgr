<%@page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8" %>
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>用户管理</title>
    <%@include file="/common/headRefModule.jsp" %>
    <link rel="stylesheet" type="text/css" href="${path}/resources/safeMgr/css/shijianchanpin.css"/>
    <link rel="stylesheet" href="${path}/resources/safeMgr/css/public.css" type="text/css"/>
    <link rel="stylesheet" href="${path}/resources/safeMgr/css/user.css" type="text/css"/>
    <link rel="stylesheet" type="text/css" href="${path}/resources/ztreeSafe/zTreeStyle/zTreeStyle.css">
    <script type="text/javascript" src="${path}/resources/ztreeSafe/jquery.ztree.all-3.5.js"></script>
    <script type="text/javascript" src="${path}/resources/safeMgr/staff/index.js"></script>
    <script src="${path}/resources/safeMgr/js/sonjs02.js" type="text/javascript"></script>
    <script>
        var action = "${action}";
        var type = "${type}";
        var roleId = "${roleId}";
        var view = "${view}";
        var staffIds = "${staffIds}";
        var limit = "${limit}";
    </script>
    <style>
        div.searchFormMain a.xuanze {
            height: 20px;
            line-height: 20px;
            margin-top: 0px;
            float: right;
            font-family: '微软雅黑';
            font-size: 12px;
            letter-spacing: 1px;
            color: #FFF;
            padding: 0px 8px;
            margin-right: 0px;
            background: #CCC;
            cursor: pointer;
            display: block;
            position: absolute;
            top: 0px;
            right: 0px;
        }

        div.searchFormMain a.xuanze:hover {
            background: #78D7DC;
        }
    </style>
</head>
<body style="padding:10px;">
<%--<c:if test="${'check' ne param['action']}">
    <div class="position_now">
        <a class="jumpback">用户管理</a>
    </div>
</c:if>--%>

<c:if test="${param.sign == null}">
    <div class="position_now">您当前的位置 : <a>&nbsp;系统管理&nbsp;>&nbsp;</a><a>用户管理</a></div>
</c:if>
<div class="mainbox" >
    <div class="mainboxleft" style="height: 90%">
        <div class="boxtop">
            <span class="boxtit">模块管理</span>
        </div>
        <c:if test="${'check' ne param['action']}">
            <div class="boxbtn">
                <span class="btn_a" onclick="EventHandler.addDept()">新增</span>
                <span class="btn_a" onclick="EventHandler.modifyDept()">修改</span>
                <span class="btn_b" onclick="EventHandler.delDept()">删除</span>
            </div>
        </c:if>

        <div class="ztreebox" id="ztreebox">
            <ul id="tree" class="ztree" style="width:217px;height: 90%; overflow:auto;"></ul>
        </div>
        <div style="display: none" class="mainboxleft_bottom">
            <div class="boxtop">
                <span class="boxtit">详细信息</span>
            </div>
            <input type="hidden" id="deptId" value="">
            <table class="information">
                <tr>
                    <th width="46%" align="right">部门名称：</th>
                    <td width="54%" id="deptName"></td>
                </tr>
                <tr>
                    <th width="46%" align="right">部门类型：</th>
                    <td width="54%" id="deptType"></td>
                </tr>
                <tr>
                    <th width="46%" align="right">部门编码：</th>
                    <td width="54%" id="deptCode"></td>
                </tr>
                <tr>
                    <th width="46%" align="right">部门级别：</th>
                    <td width="54%" id="deptLevel"></td>
                </tr>
            </table>
        </div>
    </div>
    <div id="rightDiv" style="width: auto">
        <div class="boxtop">
            <span class="boxtit">用户查询</span>
            <div class="boxtop_right">
                <div class="search_part">

                </div>
            </div>
        </div>
        <div class="objBoxCont">
            <div class="searchFormMain" style="margin-bottom: 0px;">
                <div class="searchBar" style="position: relative; z-index: 3;">
                    <span class="spanName">账号：</span>
                    <div class="mohusearch"
                         style="float: left; margin-left: 3px; margin-top: 3px;">
                        <input type="text" id="account" class="searchSimpleInputb xw_searchInput" style="width: 120px"/>
                    </div>
                    <span class="spanName">姓名：</span>
                    <div class="mohusearch"
                         style="float: left; margin-left: 3px; margin-top: 3px;">
                        <input type="text" id="name" class="searchSimpleInputb xw_searchInput" style="width: 120px"/>
                    </div>
                    <ul class="toolBarList" style="margin-left:5px">
                        <li><a href="javascript:void(0)" id="search">查询</a></li>
                        <li><a href="javascript:void(0)" id="reload">重置</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="titleBar">
            <ul class="toolBarList" style="margin-left:5px;">
                <c:if test="${'check' ne param['action']}">
                    <li><a href="javascript:void(0)" id="unlock">解&nbsp;&nbsp;锁</a></li>
                    <li><a href="javascript:void(0)" id="add">新&nbsp;&nbsp;增</a></li>
                    <li><a href="javascript:void(0)" id="modify">修改</a></li>
                    <li><a href="javascript:void(0)" id="delete">删&nbsp;&nbsp;除</a></li>
                </c:if>
                <c:if test="${'check' eq param['action']}">
                    <li><a href="javascript:void(0)" id="back" onclick="EventHandler.checkBack();"> 确认</a></li>
                </c:if>
            </ul>
        </div>
        <div class="objBoxContBBody" style="background:#fff; padding:0px 0px 0;">
            <div id="staffMain" class="datalistMain" style="height:610px; padding:0; overflow:hidden;">
                <table id="tableModule" iconCls="icon-save" pagination="true" rownumbers="true"
                       style="width:100%;height:600px">
                </table>
            </div>
        </div>
    </div>
</div>
</body>
</html>
