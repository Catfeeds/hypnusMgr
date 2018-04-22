<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <%@include file="/common/headModule.jsp" %>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>设备详情</title>
    <link type="text/css" href="${path}/resources/css/common.css" rel="stylesheet"/>
    <link type="text/css" href="${path}/resources/css/user_list.css" rel="stylesheet"/>
    <script src="${path}/resources/js/common_ctr.js" type="text/javascript"></script>
    <script src="${path}/resources/js/member.js" type="text/javascript"></script>
    <script src="${path}/resources/admin/common/temDataGrid.js"></script>
    <link type="text/css" href="${path}/resources/safeMgr/css/manage.css" rel="stylesheet"/>
    <link type="text/css" href="${path}/resources/safeMgr/css/commonstyle.css" rel="stylesheet"/>
    <link type="text/css" href="${path}/resources/safeMgr/css/public.css" rel="stylesheet"/>
    <script src="${path}/resources/safeMgr/js/sonjs02.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" href="${path}/resources/safeMgr/css/ziyuanDetail_ctr.css"/>
    <link rel="stylesheet" type="text/css" href="${path}/resources/safeMgr/css/addziyuan_style.css"/>
    <link type="text/css" rel="stylesheet" href="${path}/resources/css/addnew.css"/>
    <link type="text/css" rel="stylesheet" href="${path}/resources/safeMgr/css/shijianchanpin.css"/>
    <script type="text/javascript" src="${path}/resources/admin/js/device/deviceShadowEdit.js"></script>
</head>
<body>
<div class="wrapper">
    <div class="positionNow">主页 &gt; <a>设备列表</a>&gt;<a>设备参数设置</a></div>
    <div class="searchBar">
        <div class="searchBox">
            <span class="searchName" style="top: 50%;">默认工作模式：</span>
            <select class="workModeselectList">
                <option value="1">CPAP</option>
                <option value="2">BRAP-S</option>
                <option value="3">AutoBRAP-S</option>
                <option value="4">BRAP-T</option>
                <option value="5">BRAP-ST</option>
            </select>
        </div>
        <div class="searchBox">
            <span class="searchName">型号：</span>
            <input class="searchInputText" id="model" type="text" style="width:130px;"/>
        </div>
        <div class="searchBox">
            <span class="searchName">系统版本：</span>
            <input class="searchInputText" id="systemVersion" type="text" style="width:130px;"/>
        </div>
    </div>

    <div class="pageMain" style="min-height: 0px; height:auto;">
        <div class="objBoxContB" style=" margin-bottom:0px;">
            <form id="saveForm" method="post">
                <div class="addFormCont" style="padding-top:0px;">
                    <input id="id" type="hidden" name="id" value="${fn:escapeXml(param.deviceId)}"/>
                    <div class="addFormContHead">
                        <h1 class="addFormConthText">参数设置</h1>
                    </div>
                    <div class="addFormContBody">
                        <table class="addFormTable">
                            <tr>
                                <th>吸气压力</th>
                                <td>
                                    <input id="t_in_p" name="t_in_p"  class="proInput" type="number"
                                           style="width:241px;height:10px"/>
                                    <input id="deviceID" name="deviceID"  type="hidden"
                                           style="width:241px;height:10px"/>
                                </td>

                                <th>湿化水平</th>
                                <td>
                                    <select class="workModeselectList" style="width:260px;height:20px">
                                        <option value="0">关闭</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="4">5</option>
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <th>呼气压力</th>
                                <td>
                                    <input id="t_ex_p" name="t_ex_p"  class="proInput" type="number"
                                           style="width:241px;height:10px"/>
                                </td>

                                <th>加温管</th>
                                <td>
                                    <input id="connector11" name="connector"  class="proInput"
                                           type="number" style="width:241px;height:10px"/>
                                </td>
                            </tr>

                            <tr>
                                <th>起始压力</th>
                                <td>
                                    <input id="start_pressure" name="start_pressure"  class="proInput" type="number"
                                           style="width:241px;height:10px"/>
                                </td>

                                <th>智能启停</th>
                                <td>
                                    <select class="workModeselectList" style="width:260px;height:20px">
                                        <option value="0">关闭</option>
                                        <option value="1">开启</option>
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <th>延迟时间</th>
                                <td>
                                    <input id="cure_delay" name="cure_delay"  class="proInput" type="number"
                                           style="width:241px;height:10px"/>
                                </td>

                                <th>面罩类型</th>
                                <td>
                                    <select class="workModeselectList" style="width:260px;height:20px">
                                        <option value="0">鼻罩</option>
                                        <option value="1">全面罩</option>
                                        <option value="1">鼻枕</option>
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <th>呼吸频率</th>
                                <td>
                                    <input id="breath_rate" name="breath_rate"  class="proInput" type="number"
                                           style="width:241px;height:10px"/>
                                </td>

                                <th>管道类型</th>
                                <td>
                                    <select class="workModeselectList" style="width:260px;height:20px">
                                        <option value="0">22cm</option>
                                        <option value="1">15cm</option>
                                        <option value="1">加温管</option>
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <th>呼吸比I:E 1：</th>
                                <td>
                                    <input id="breath_ratio" name="breath_ratio"  class="proInput" type="number"
                                           style="width:241px;height:10px"/>
                                </td>

                            </tr>

                            <tr>
                                <th>上升斜坡</th>
                                <td>
                                    <select class="workModeselectList" style="width:260px;height:20px">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </td>

                            </tr>

                            <tr>
                                <th>下降斜坡</th>
                                <td>
                                    <select class="workModeselectList" style="width:260px;height:20px">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
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


    <%-- 该部分注释在网页中不会被显示

    <div class="usercenterMain xw_showContent">
        <div class="userInfo">
            <div class="inputLine">
                <span class="inputTitle">吸气压力</span><input type="number" name="fname" /><span class="text358" id="name"></span><span class="inputTitle">湿化水平</span><span class="text358" id="sex"></span></div>
            <div class="inputLine">
                <span class="inputTitle">呼气压力</span><span class="text358"  id="mobile"></span><span class="inputTitle">加温管</span><span class="text358" id="inEmail"></span></div>
            <div class="inputLine">
                <span class="inputTitle">起始压力</span><span class="text358" id="account1"></span><span class="inputTitle">智能启停</span><span class="text358" id="roleNames1"></span></div>
            <div class="inputLine">
                <span class="inputTitle">延迟时间</span><span class="text358" id="account2"></span><span class="inputTitle">面罩类型</span><span class="text358" id="roleNames2"></span></div>
            <div class="inputLine">
                <span class="inputTitle">呼吸频率</span><span class="text358" id="account3"></span><span class="inputTitle">管道类型</span><span class="text358" id="roleNames3"></span></div>
            <div class="inputLine">
                <span class="inputTitle">呼吸比I:E   1：</span><span class="text358" id="account4"></span></div>
            <div class="inputLine">
                <span class="inputTitle">上升斜坡</span>
                <select class="workModeselectList">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>
            <div class="inputLine">
                <span class="inputTitle">下降斜坡</span>
                <select class="workModeselectList">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>

            <div class="titleBar">
                <ul  style="margin-left:5px;">
                    <li><input type="submit" value="保存" /></li>
                    <span class="btnBlue" style="margin-left: 5px" id="addFactory">保存aaa</span>
                    <li><a href="javascript:void(0)" id="delRight">取&nbsp;&nbsp;消</a></li>
                </ul>
            </div>


        </div>
    </div>

--%>


</body>
</html>
