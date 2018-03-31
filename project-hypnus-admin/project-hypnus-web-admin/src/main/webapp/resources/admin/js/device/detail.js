seajs.use(['$', 'adminSystem', 'template', 'msgBox', 'util', 'pageBar', 'jquery.json'],
    function ($, adminSystem, template, msgBox, util, pageBar) {
        /** 初始化处理器 */
        var InitHandler = (function () {
            return {
                /** 初始化入口 */
                init: function () {
                    this.initPage();
                    this.initEvent();
                    this.initData();
                },
                /** 初始化界面 */
                initPage: function () {
                    var id = $('#id').val();
                    if (id) {
                        EventHandler.getCusOrderDetail();
                    }
                },
                /** 初始化事件绑定 */
                initEvent: function () {

                    $("#deliverGoods").click(function () {
                        var orderStatus = $('#orderStatus').val();
                        var id = $('#id').val();
                        if (orderStatus == "2") {
                            msgBox.exWindow.open({
                                title: '发货',
                                url: path + "/admin/orderMgr/cusOrder/delivery.html?id=" + id,
                                width: '400px',
                                height: '210px',
                                close: function (result) {
                                    if (result) {
                                        EventHandler.getCusOrderDetail();
                                    }
                                }
                            });
                        } else {
                            msgBox.tips("该订单未支付或者已发货");
                            return;
                        }


                    });
                    $("#printBill").click(function () {
                        EventHandler.printBill();
                    });

                },
                /** 初始化数据加载 */
                initData: function () {
                }
            };
        })();
        /** 事件处理器 */
        var EventHandler = (function () {
            return {

                //获取订单信息详情
                getCusOrderDetail: function () {
                    DataHandler.getCusOrderDetail({
                        id: $('#id').val()
                    }, function (cusOrderDetail) {
                        if (cusOrderDetail) {
                            $('#orderCode').html(cusOrderDetail.orderCode);
                            $('#createDate').html(cusOrderDetail.createDate);
                            $('#orderStatusName').html(cusOrderDetail.orderStatusName);
                            $('#orderStatus').val(cusOrderDetail.orderStatus);

                            $('#cusName').html(cusOrderDetail.cusName);
                            $('#cusMobile').html(cusOrderDetail.cusMobile);
                            $('#shopkeeperName').html(cusOrderDetail.shopkeeperName);
                            $('#shopkeeperMobile').html(cusOrderDetail.shopkeeperMobile);
                            $('#productAmount').html("￥" + cusOrderDetail.productAmount);
                            $('#couponMoney').html("￥" + (cusOrderDetail.couponMoney == "" ? "0" : cusOrderDetail.couponMoney));
                            $('#logisticsCost').html("￥" + cusOrderDetail.logisticsCost);
                            if (cusOrderDetail.orderType == 2) {
                                $('#orderType').html("代理订单");
                            } else {
                                $('#orderType').html("普通订单");
                            }
                            if (cusOrderDetail.payTypeName) {
                                $('#payTypeName').html(cusOrderDetail.payTypeName);
                                $('#totalPayAmount').html("￥" + cusOrderDetail.payMoney);
                            } else if (cusOrderDetail.rechargeMoney) {
                                $('#payTypeName').html("余额支付");
                                $('#totalPayAmount').html("￥" + cusOrderDetail.rechargeMoney);
                            } else {
                                $('#payTypeName').html("--");
                                $('#totalPayAmount').html("￥" + 0);
                            }
                            $('#payTime').html(cusOrderDetail.payTime);
                            $('#recipientName').html(cusOrderDetail.recipientName);
                            $('#recipientTel').html(cusOrderDetail.recipientTel);
                            $('#recipientAddress').html(cusOrderDetail.provinceName + cusOrderDetail.cityName +
                                cusOrderDetail.regionName + cusOrderDetail.recipientAddress);


                            if (cusOrderDetail.status) {
                                $('#status').html(cusOrderDetail.statusName);
                                $('#logisticsTypeName').html(cusOrderDetail.logisticsTypeName);
                                var htmlVal = cusOrderDetail.logisticsCode;
                                if(cusOrderDetail.logisticsCode && cusOrderDetail.logisticsType) {
                                    $('#logisticsCode').click(function () {
                                        msgBox.exWindow.open({
                                            title: '物流信息',
                                            url: path +"/admin/orderMgr/cusOrder/express/view/detail/"+cusOrderDetail.logisticsType +"/"+cusOrderDetail.logisticsCode,
                                            width: '500px',
                                            height: '600px'
                                        });
                                    });
                                    //跳转到微信页面进行物流查看
                                    htmlVal = "<a href='#'>"+cusOrderDetail.logisticsCode+"</a>"
                                }
                                $('#logisticsCode').html(htmlVal);
                            } else {
                                $('#status').html("未发货");
                            }

                            var productList = cusOrderDetail.productList;
                            if (productList.length > 0) {
                                var totalSalesPrice = 0;
                                var totalProfit = 0;
                                var num = 0;
                                for (var o in productList) {
                                    totalSalesPrice = parseFloat(totalSalesPrice) + parseFloat(productList[o].totalSalesAmount);
                                    totalProfit = parseFloat(totalProfit) + parseFloat(productList[o].profit);
                                    num = parseInt(num) + parseInt(productList[0].num);

                                    var specJson = productList[o].specJson;
                                    specJson = specJson.replace(/\"/g, "");
                                    specJson = specJson.replace(/{/g, "").replace(/}/g, "");
                                    productList[o].specJson = specJson;
                                }
                                $('#num').html(num);
                                $('#totalSalesPriceum').html(totalSalesPrice);
                                $('#totalProfit').html(totalProfit);


                                var html = template('listTemp', productList);
                                $('#list').html(html);
                            }

                            setParenHei();
                        }
                    });
                },
                //打印物流小票
                printBill: function () {
                    var orderStatus = $('#orderStatus').val();
                    var id = $('#id').val();
                        if (orderStatus == "3") {
                            msgBox.exWindow.open({
                                title: '打印小票',
                                url: path + "/admin/orderMgr/cusOrder/printBill.html?id=" + id,
                                width: '340px',
                                height: '700px',
                                close: function (result) {
                                    if (result) {
                                        EventHandler.search();
                                    }
                                }
                            });
                        } else {
                            msgBox.tips("该订单未发货或者已收货");
                            return;
                        }
                },

            };
        })();
        /** 数据处理器 */
        var DataHandler = (function () {
            return {
                /**
                 * 获取订单信息详情
                 * @param params
                 * @param callback
                 */
                getCusOrderDetail: function (params, callback) {
                    $.post(path + '/admin/orderMgr/cusOrder/getCusOrderDetail', params, function (backData) {
                        callback(backData);
                    });
                },
            };
        })();

        /** 页面入口 */
        $(function () {
            InitHandler.init();
        });
    });