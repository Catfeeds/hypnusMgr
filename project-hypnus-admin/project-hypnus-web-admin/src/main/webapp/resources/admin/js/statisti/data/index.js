// 用户注册时间维度统计
var dateDimension = "DAY";
seajs.use(['$', 'msgBox', 'util', 'jquery.json'], function ($, msgBox, util) {
    var time; // 横坐标，时间跨度
    var amount; // 订单金额
    var num; // 订单数量

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
                EventHandler.initAmountMoudle();
            },

            /** 初始化事件绑定 */
            initEvent: function () {
                // 时间维度选择
                $(".xw_calendar_datechange span").click(function () {
                    $(this).parents(".searchBox").find(".xw_calendar_datechange span").removeClass("timeOn");
                    $(this).addClass("timeOn");

                    // 更改时间维度查询
                    if ("day" == $(this).attr("id")) {
                        $("#dayDiv").show();
                        $("#MonthDiv").hide();
                        dateDimension = "DAY";
                        EventHandler.initAmountMoudle();
                    } else if ("month" == $(this).attr("id")) {
                        $("#dayDiv").hide();
                        $("#MonthDiv").show();
                        dateDimension = "MONTH";
                        EventHandler.initAmountMoudle();
                    }
                });

                // 统计图查询按钮
                $("#searchBtn").click(function () {
                    EventHandler.initAmountMoudle();
                });

                $("#resetBtn").click(function () {
                    EventHandler.reset();
                });

                $(".xw_setPie").click(function () {
                    $(".xw_topTab li").removeClass("on");
                    $(this).addClass("on");
                    if ($("#numLi").hasClass("on")) {
                        EventHandler.writerData4Chart(time, num, '订单总数');
                    } else {
                        // EventHandler.writerData4Chart(time, amount, '订单金额');
                    }
                });

                $("#amountInstructions").click(function () {
                    layer.open({
                        title: false,
                        content: $("#amountContent").html(),
                        area: ['710px', '260px']
                    });
                });
                $("#numInstructions").click(function () {
                    layer.open({
                        title: false,
                        content: $("#numContent").html(),
                        area: ['500px', '200px']
                    });
                });
            },

            initData: function () {
            }
        };
    })();

    /** 事件处理器 */
    var EventHandler = (function () {
        return {
            //重置
            reset: function () {
                $("#createDateDay").val($("#createDateDayHidden").val());
                $("#endDateDay").val($("#endDateDayHidden").val());
                $("#day").click();
            },
            // 订单金额统计报表
            initAmountMoudle: function () {
                // 接口入参
                var params = {};
                if (dateDimension == "DAY") {
                    if (!$("#createDateDay").val()) {
                        msgBox.tips("统计时间不能为空");
                        return;
                    }
                    if (!$("#endDateDay").val()) {
                        msgBox.tips("统计时间不能为空");
                        return;
                    }
                    params.startCreateDate = $("#createDateDay").val() + " 00:00:00";
                    params.endCreateDate = $("#endDateDay").val() + " 23:59:59";
                } else if (dateDimension == "MONTH") {
                    if (!$("#createDateMonth").val()) {
                        msgBox.tips("统计时间不能为空");
                        return;
                    }
                    if (!$("#endDateMonth").val()) {
                        msgBox.tips("统计时间不能为空");
                        return;
                    }
                    params.startCreateDate = $("#createDateMonth").val() + "-01 00:00:00";
                    params.endCreateDate = $("#endDateMonth").val();
                }
                params.dateDimension = dateDimension;

                // 初始化订单金额与订单总数
                // DataHandler.getAmountNum(params, function(backData){
                //     for(var key in backData){
                //         $("#"+key).html(backData[key]);
                //     }
                // });

                DataHandler.getOrderAmountStat(params, function (result) {
                    time = new Array(); // 横坐标，时间跨度
                    amount = new Array(); // 订单金额
                    num = new Array(); // 订单数量
                    for (var i = 0, length = result.length; i < length; i++) {
                        var item = result[i];
                        time.push(item.time);
                        amount.push(item.amount + '');
                        num.push(item.num + '');
                    }

                    if ($("#numLi").hasClass("on")) {
                        EventHandler.writerData4Chart(result.pressure, '详细数据');
                    } else {
                        // EventHandler.writerData4Chart(time, amount, '订单金额');
                    }
                });
            },
            // 报表
            writerData4Chart: function (data, title) {
                // 初始化报表
                var chart = echarts.init($("#container_dingdan")[0]);

                //时间轴数据
                var xData = data.map(function (item) {
                    return item[0];
                });
                //压力数据
                var yDataP = data.map(function (item) {
                    return item[1];
                });
                //气流数据
                var yData2 = data.map(function (item) {
                    return item[2];
                });
                //漏气
                var yData3 = data.map(function (item) {
                    return item[3];
                });
                //tv
                var yData4 = data.map(function (item) {
                    return item[4];
                });
                chart.showLoading({
                    text: "正在拼命加载中...",
                    x: "center",
                    y: "center",
                    textStyle: {
                        fontSize: 20
                    },
                    effect: "bubble"
                });
                var option = {
                    title: {
                        text: '',
                        subtext: '',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            animation: false
                        }
                    },
                    legend: {
                        data: [],
                        x: 'left'
                    },
                    toolbox: {
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    axisPointer: {
                        link: {xAxisIndex: 'all'}
                    },
                    dataZoom: [
                        {
                            show: true,
                            realtime: false,
                            start: 30,
                            end: 70,
                            xAxisIndex: [0, 1, 2, 3]
                        },
                        {
                            type: 'inside',
                            realtime: false,
                            start: 30,
                            end: 70,
                            xAxisIndex: [0, 1, 2, 3]
                        },
                        {
                            type: 'inside',
                            realtime: false,
                            start: 30,
                            end: 70,
                            xAxisIndex: [0, 1, 2, 3]
                        },
                        {
                            type: 'inside',
                            realtime: false,
                            start: 30,
                            end: 70,
                            xAxisIndex: [0, 1, 2, 3]
                        }
                    ],
                    grid: [{
                        left: 100,
                        right: 100,
                        top: '5%',
                        height: '15%'
                    }, {
                        left: 100,
                        right: 100,
                        top: '30%',
                        height: '15%'
                    }, {
                        left: 100,
                        right: 100,
                        top: '53%',
                        height: '15%'
                    }, {
                        left: 100,
                        right: 100,
                        top: '75%',
                        height: '15%'
                    }],
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            axisLine: {onZero: true},
                            data: xData,
                            position: 'bottom'
                        },
                        {
                            gridIndex: 1,
                            type: 'category',
                            boundaryGap: false,
                            axisLine: {onZero: true},
                            data: xData,
                            position: 'bottom'
                        }, {
                            gridIndex: 2,
                            type: 'category',
                            boundaryGap: false,
                            axisLine: {onZero: true},
                            data: xData,
                            position: 'bottom'
                        },
                        {
                            gridIndex: 3,
                            type: 'category',
                            boundaryGap: false,
                            axisLine: {onZero: true},
                            data: xData,
                            position: 'bottom'
                        }
                    ],
                    yAxis: [
                        {
                            name: 'Pressure(cmH2O)',
                            type: 'value',
                            max: 500
                        },
                        {
                            gridIndex: 1,
                            name: 'Flow(L/min)',
                            type: 'value',
                            inverse: false
                        }, {
                            gridIndex: 2,
                            name: 'LeakInfo(L/min)',
                            type: 'value',
                            inverse: false
                        },
                        {
                            gridIndex: 3,
                            name: 'Tidal Volume(mL)',
                            type: 'value',
                            inverse: false
                        }
                    ],
                    series: [
                        {
                            name: 'Pressure',
                            type: 'line',
                            symbolSize: 8,
                            hoverAnimation: false,
                            data: yDataP
                        },
                        {
                            name: 'Flow',
                            type: 'line',
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            symbolSize: 8,
                            hoverAnimation: false,
                            data: yData2
                        }, {
                            name: 'LeakInfo',
                            type: 'line',
                            xAxisIndex: 2,
                            yAxisIndex: 2,
                            symbolSize: 8,
                            hoverAnimation: false,
                            data: yData3
                        },
                        {
                            name: 'Tidal Volume',
                            type: 'line',
                            xAxisIndex: 3,
                            yAxisIndex: 3,
                            symbolSize: 8,
                            hoverAnimation: false,
                            data: yData4
                        }
                    ]
                };
                chart.setOption(option, true);
                chart.hideLoading();
            }

        };
    })();

    /**
     * 数据处理器
     */
    var DataHandler = function () {
        return {
            /**
             * 获取统计时间范围内的订单金额与订单数量
             */
            getAmountNum: function (param, callback) {
                $.post(path + '/admin/statisti/order/getAmountNum', param, function (backData) {
                    callback(backData);
                });
            },
            /**
             * 获取订单金额统计情况
             */
            getOrderAmountStat: function (param, callback) {
                $.post(path + '/admin/statisti/data/getDateFromOss', param, function (backData) {
                    callback(backData);
                });
            }
        }
    }();

    /** 页面入口 */
    $(function () {
        InitHandler.init();
    });
});
