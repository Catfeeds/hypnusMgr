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
                        EventHandler.getStatisticsData();
                        EventHandler.getStatisticsDataWorkParam();
                        EventHandler.getCusOrderDetail();
                        EventHandler.getUseData();
                    }
                },
                /** 初始化事件绑定 */
                initEvent: function () {
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

                //获取设备信息
                getStatisticsData: function () {
                    DataHandler.getStatisticsData({
                        deviceId: $('#id').val()
                    }, function (device) {
                        if (device) {
                            // $('#start_pressure').html(shadowDevice.start_pressure);
                            $('#model').html(device.model);
                            // $('#data_version').html("7C_V1.17");
                            $('#useTime').html("1天");
                            // $('#cure_model').html(shadowDevice.cure_model);
                            // $('#data_version').html(shadowDevice.data_version);
                            //
                            // $('#t_in_p').html(shadowDevice.t_in_p);
                            // $('#t_ex_p').html(shadowDevice.t_ex_p);
                            // $('#cure_delay').html(shadowDevice.cure_delay);
                            // $('#breath_rate').html(shadowDevice.breath_rate);
                            // $('#boostslope').html(shadowDevice.boostslope);
                            // $('#buckslope').html(shadowDevice.buckslope);
                            // $('#breath_ratio').html(shadowDevice.breath_ratio);
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
                                if (cusOrderDetail.logisticsCode && cusOrderDetail.logisticsType) {
                                    $('#logisticsCode').click(function () {
                                        msgBox.exWindow.open({
                                            title: '物流信息',
                                            url: path + "/admin/orderMgr/cusOrder/express/view/detail/" + cusOrderDetail.logisticsType + "/" + cusOrderDetail.logisticsCode,
                                            width: '500px',
                                            height: '600px'
                                        });
                                    });
                                    //跳转到微信页面进行物流查看
                                    htmlVal = "<a href='#'>" + cusOrderDetail.logisticsCode + "</a>"
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


                //获取工作参数
                getStatisticsDataWorkParam: function () {
                    DataHandler.getStatisticsDataWorkParam({
                        deviceId: $('#id').val()
                    }, function (testUseTime) {
                        if (testUseTime) {
                            $('#cure_model').html(testUseTime.mode);
                            $('#data_version').html(testUseTime.dataVersion);

                            $('#presure1').html(testUseTime.presure1);
                            $('#presure2').html(testUseTime.presure2);
                            $('#startPressure').html(testUseTime.startPresure);
                            $('#cureDelay').html(testUseTime.cureDelay);
                            $('#breathRate').html(testUseTime.breathRate);
                            $('#boostslope').html();
                            $('#buckslope').html();
                            $('#breathRatio').html(testUseTime.breathRatio);


                            //获取使用信息
                            $('#totalDays').html(testUseTime.breathRatio);
                            $('#moreThan4HoursDays').html(testUseTime.breathRatio);
                            $('#noUseDays').html(0);
                            $('#totalTimes').html(testUseTime.peroid);
                            $('#lessThan4HoursDays').html(testUseTime.breathRatio);
                            $('#averageUseTime').html(testUseTime.breathRatio+"小时");
                            $('#moreThan4HoursPercent').html(testUseTime.breathRatio+"%");
                        }
                    });
                },

                //获取详情
                // getCusOrderDetail: function () {
                //     DataHandler.getShadowDevice({
                //         deviceId: $('#id').val()
                //     }, function (device) {
                //         if (device) {
                //             // $('#start_pressure').html(shadowDevice.start_pressure);
                //             // $('#model').html(device.model);
                //             // $('#cure_model').html(shadowDevice.cure_model);
                //             // $('#data_version').html(shadowDevice.data_version);
                //             //
                //             // $('#t_in_p').html(shadowDevice.t_in_p);
                //             // $('#t_ex_p').html(shadowDevice.t_ex_p);
                //             // $('#cure_delay').html(shadowDevice.cure_delay);
                //             // $('#breath_rate').html(shadowDevice.breath_rate);
                //             // $('#boostslope').html(shadowDevice.boostslope);
                //             // $('#buckslope').html(shadowDevice.buckslope);
                //             // $('#breath_ratio').html(shadowDevice.breath_ratio);
                //             if (cusOrderDetail.orderType == 2) {
                //                 $('#orderType').html("代理订单");
                //             } else {
                //                 $('#orderType').html("普通订单");
                //             }
                //             if (cusOrderDetail.payTypeName) {
                //                 $('#payTypeName').html(cusOrderDetail.payTypeName);
                //                 $('#totalPayAmount').html("￥" + cusOrderDetail.payMoney);
                //             } else if (cusOrderDetail.rechargeMoney) {
                //                 $('#payTypeName').html("余额支付");
                //                 $('#totalPayAmount').html("￥" + cusOrderDetail.rechargeMoney);
                //             } else {
                //                 $('#payTypeName').html("--");
                //                 $('#totalPayAmount').html("￥" + 0);
                //             }
                //             $('#payTime').html(cusOrderDetail.payTime);
                //             $('#recipientName').html(cusOrderDetail.recipientName);
                //             $('#recipientTel').html(cusOrderDetail.recipientTel);
                //             $('#recipientAddress').html(cusOrderDetail.provinceName + cusOrderDetail.cityName +
                //                 cusOrderDetail.regionName + cusOrderDetail.recipientAddress);
                //
                //
                //             if (cusOrderDetail.status) {
                //                 $('#status').html(cusOrderDetail.statusName);
                //                 $('#logisticsTypeName').html(cusOrderDetail.logisticsTypeName);
                //                 var htmlVal = cusOrderDetail.logisticsCode;
                //                 if (cusOrderDetail.logisticsCode && cusOrderDetail.logisticsType) {
                //                     $('#logisticsCode').click(function () {
                //                         msgBox.exWindow.open({
                //                             title: '物流信息',
                //                             url: path + "/admin/orderMgr/cusOrder/express/view/detail/" + cusOrderDetail.logisticsType + "/" + cusOrderDetail.logisticsCode,
                //                             width: '500px',
                //                             height: '600px'
                //                         });
                //                     });
                //                     //跳转到微信页面进行物流查看
                //                     htmlVal = "<a href='#'>" + cusOrderDetail.logisticsCode + "</a>"
                //                 }
                //                 $('#logisticsCode').html(htmlVal);
                //             } else {
                //                 $('#status').html("未发货");
                //             }
                //
                //             var productList = cusOrderDetail.productList;
                //             if (productList.length > 0) {
                //                 var totalSalesPrice = 0;
                //                 var totalProfit = 0;
                //                 var num = 0;
                //                 for (var o in productList) {
                //                     totalSalesPrice = parseFloat(totalSalesPrice) + parseFloat(productList[o].totalSalesAmount);
                //                     totalProfit = parseFloat(totalProfit) + parseFloat(productList[o].profit);
                //                     num = parseInt(num) + parseInt(productList[0].num);
                //
                //                     var specJson = productList[o].specJson;
                //                     specJson = specJson.replace(/\"/g, "");
                //                     specJson = specJson.replace(/{/g, "").replace(/}/g, "");
                //                     productList[o].specJson = specJson;
                //                 }
                //                 $('#num').html(num);
                //                 $('#totalSalesPriceum').html(totalSalesPrice);
                //                 $('#totalProfit').html(totalProfit);
                //
                //
                //                 var html = template('listTemp', productList);
                //                 $('#list').html(html);
                //             }
                //
                //             setParenHei();
                //         }
                //     });
                // },
                //
                //
                // getUseData: function () {
                //     DataHandler.getUseData({
                //         deviceId: $('#id').val()
                //     }, function (device) {
                //         if (device) {
                //             $('#averagePresure1').html(shadowDevice.averagePresure1);
                //             $('#pecentPresure1').html(shadowDevice.pecentPresure1);
                //             $('#averagePresure2').html(shadowDevice.averagePresure2);
                //             $('#pecentPresure2').html(shadowDevice.pecentPresure2);
                //
                //             $('#averageMvPos').html(shadowDevice.averageMvPos);
                //             $('#pecentMvPos').html(shadowDevice.pecentMvPos);
                //
                //
                //
                //             setParenHei();
                //         }
                //     });
                // },


                //设置设备参数
                printBill: function () {
                    var deviceId = $('#id').val();
                    window.location.href = path + '/admin/statisti/data/index.html?deviceId=' + deviceId;
                },

            };
        })();
        /** 数据处理器 */
        var DataHandler = (function () {
            return {
                /**
                 * 获取统计数据-设备信息
                 * @param params
                 * @param callback
                 */
                getStatisticsData: function (params, callback) {
                    $.post(path + '/admin/deviceMgr/getStatisticsData', params, function (backData) {
                        callback(backData);
                    });
                },

                /**
                 * 获取统计数据-工作参数
                 * @param params
                 * @param callback
                 */
                getStatisticsDataWorkParam: function (params, callback) {
                    $.post(path + '/admin/deviceMgr/getStatisticsDataWorkParam', params, function (backData) {
                        callback(backData);
                    });
                },

                // /**
                //  * 获取影子设备参数
                //  * @param params
                //  * @param callback
                //  */
                // getShadowDevice: function (params, callback) {
                //     $.post(path + '/admin/deviceMgr/getShadowDevice', params, function (backData) {
                //         callback(backData);
                //     });
                // },
                //
                // /**
                //  * 获取设备参数
                //  * @param params
                //  * @param callback
                //  */
                // getUseData: function (params, callback) {
                //     $.post(path + '/admin/deviceMgr/getUseData', params, function (backData) {
                //         callback(backData);
                //     });
                // },



            };
        })();

        /** 页面入口 */
        $(function () {
            InitHandler.init();
        });
    });