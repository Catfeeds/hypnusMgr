<%--
  Created by IntelliJ IDEA.
  User: Admin
  Date: 2017/2/22
  Time: 17:16
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <%@include file="/common/headModule2.jsp" %>
    <title>订单详情</title>
    <link type="text/css" rel="stylesheet" href="${path}/resources/css/common.css" />
    <link type="text/css" rel="stylesheet"  href="${path}/resources/css/activitiesDetail.css"/>
    <link type="text/css" rel="stylesheet"  href="${path}/resources/css/activities_list.css"/>
    <link type="text/css" href="${path}/resources/css/addActivities.css" rel="stylesheet" />
    <script src="${path}/resources/js/common_ctr.js" type="text/javascript"></script>
    <script src="${path}/resources/js/member.js" type="text/javascript"></script>

    <script src="${path}/resources/admin/js/device/detail.js" type="text/javascript"></script>

</head>

<body>
<div class="wrapper">
    <div class="positionNow">
        <a>主页 &gt; </a><a href="${path}/admin/orderMgr/cusOrder/index.html">订单列表</a> &gt; <a  style="color:#ff4d4d;">详情</a></div>

    <div class="userDetail">
        <input type="hidden" name="id" id="id" value="${fn:escapeXml(param.id)}"/>
        <input type="hidden" name="orderStatus" id="orderStatus" value=""/>
        <h1 class="tittle">
            <span class="btnRed" id="printBill">打印</span>
            <span class="btnRed" id="deliverGoods">发货</span>
            订单信息
        </h1>
        <div class="activityMsn">
            <table class="activityMsnTable">
                <tr>
                    <td>订单编号：</td>
                    <th id="orderCode"></th>
                    <td>下单时间：</td>
                    <th id="createDate"></th>
                </tr>
                <tr>
                    <td>订单状态：</td>
                    <th><span class="bgBlue" id="orderStatusName"></span></th>
                    <td>订单类型：</td>
                    <th id="orderType"></th>
                </tr>
            </table>
        </div>
    </div>
    <div class="userDetail">
        <h1 class="tittle">用户信息</h1>
        <div class="activityMsn">
            <table class="activityMsnTable">
                <tr>
                    <td>下单用户：</td>
                    <th id="cusName"></th>
                    <td>手机号：</td>
                    <th id="cusMobile"></th>
                </tr>
            </table>
        </div>
    </div>
    <div class="userDetail">
        <h1 class="tittle">店主信息</h1>
        <div class="activityMsn">
            <table class="activityMsnTable">
                <tr>
                    <td>店主昵称：</td>
                    <th id="shopkeeperName"></th>
                    <td>手机号：</td>
                    <th id="shopkeeperMobile"></th>
                </tr>
            </table>
        </div>
    </div>
    <div class="userDetail">
        <h1 class="tittle">商品信息</h1>
        <div class="userDetail" style="padding:10px; margin-top:0px;">
            <table class="datalistTable">
                <thead>
                <tr>
                    <th>商品名称</th>
                    <th>分类</th>
                    <th>厂家名称</th>
                    <th>规格</th>
                    <th>售价（元）</th>
                    <th>原价（元）</th>
                    <th>利润（元）</th>
                    <th>数量</th>
                    <th>价格（元）</th>
                </tr>
                </thead>
                <tbody id="list">

                </tbody>
                <tr class="lastLine">
                    <td colspan="8">共<span id="num"></span>件，共<span class="textRed" id="totalSalesPriceum">0</span>元【利润共<span class="textRed" id="totalProfit">0</span>元】</td>
                </tr>
            </table>
        </div>
    </div>
    <div class="userDetail">
        <h1 class="tittle">支付信息</h1>
        <div class="activityMsn">
            <table class="activityMsnTable">
                <tr>
                    <td>商品金额：</td>
                    <th><span class="textRed" id="productAmount"></span></th>
                    <td>运费：</td>
                    <th><span class="textRed" id="logisticsCost"></span></th>
                </tr>
                <tr>
                    <td>代金券抵扣：</td>
                    <th><span class="textRed" id="couponMoney"></span></th>
                    <td>支付金额：</td>
                    <th><span class="textRed" id="totalPayAmount"></span></th>
                </tr>
                <tr>
                    <td>支付方式：</td>
                    <th id="payTypeName"></th>
                    <td>支付时间：</td>
                    <th id="payTime"></th>
                </tr>

            </table>
        </div>
    </div>
    <div class="userDetail">
        <h1 class="tittle">收货信息</h1>
        <div class="activityMsn">
            <table class="activityMsnTable">
                <tr>
                    <td>收货人：</td>
                    <th id="recipientName"></th>
                    <td>联系电话：</td>
                    <th id="recipientTel"></th>
                </tr>
                <tr>
                    <td>收货地址：</td>
                    <th colspan="3" id="recipientAddress"></th>
                </tr>
                <tr>
                    <td>发货状态：</td>
                    <th><span class="bgGrey" id="status"></span></th>
                    <td>&nbsp;</td>
                    <th>&nbsp;</th>
                </tr>
                <tr>
                    <td>物流公司：</td>
                    <th id="logisticsTypeName">--</th>
                    <td>物流单号</td>
                    <th id="logisticsCode">--</th>
                </tr>
            </table>
        </div>
    </div>
</div>
</body>
<script type="text/html" id="listTemp">
    {{each}}
    <tr>
        <td>{{$value.productName}}</td>
        <td><span class="borderRed">{{$value.cateName}}</span></td>
        <td><span >{{$value.factoryName}}</span></td>
        <td>{{$value.specJson}}</td>
        <td><span class="textRed">{{$value.salesPrice}}</span></td>
        <td><span class="textRed">{{$value.costPrice}}</span></td>
        <td><span class="textRed">{{$value.profit}}</span></td>
        <td>{{$value.num}}</td>
        <td><span class="textRed">{{$value.totalSalesAmount}}</span></td>
    </tr>
    {{/each}}
</script>
</html>
