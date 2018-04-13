// 用户注册时间维度统计
var dateDimension = "DAY";
seajs.use(['$', 'msgBox', 'util', 'jquery.json'], function ($, msgBox, util) {
    var time; // 横坐标，时间跨度
    var staticData = new Array(); // 详细数据
    var graphics = {}; // 详细数据

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
                    } else if ("week" == $(this).attr("id")) {
                        $("#dayDiv").hide();
                        $("#MonthDiv").show();
                        dateDimension = "WEEK";
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
                        $("#staticDiv").show();
                        $("#aiDiv").hide();
                        $("#csrDiv").hide();
                        $("#csaDiv").hide();
                        $("#pbDiv").hide();
                        EventHandler.writerData4Chart(staticData, '');
                    } else if ($("#staticLi").hasClass("on")) {
                        $("#staticDiv").hide();
                        $("#aiDiv").show();
                        $("#csrDiv").show();
                        $("#csaDiv").show();
                        $("#pbDiv").show();
                        EventHandler.writeOtherData4Chart(graphics, '');
                    }
                });

            },

            initData: function () {
            }
        };
    })();

    /** 事件处理器 */
    var EventHandler = (function () {
        return {
            // 详细图形数据
            initAmountMoudle: function () {
                // 接口入参
                var params = {};
                params.dateDimension = dateDimension;
                params.deviceId = $("#deviceId").val();
                params.startTime = $("#startTime").val();
                DataHandler.getStaticData(params, function (result) {
                    time = new Array(); // 横坐标，时间跨度
                    graphics = result;
                    if ($("#staticLi").hasClass("on")) {
                        $("#staticDiv").hide();
                        $("#aiDiv").show();
                        $("#csrDiv").show();
                        $("#csaDiv").show();
                        $("#pbDiv").show();
                        EventHandler.writeOtherData4Chart(graphics, '详细数据');
                    }
                });
                DataHandler.getOrderAmountStat(params, function (result) {
                    time = new Array(); // 横坐标，时间跨度
                    staticData = new Array(); // 订单数量
                    staticData = result.pressure;
                });
            },
            // 报表
            writerData4Chart: function (data, title) {
                // 初始化报表
                var chart = echarts.init($("#container_dingdan")[0]);
                if (data.length == 0) {
                    return;
                }

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
                //br
                var yData5 = data.map(function (item) {
                    return item[5];
                });
                //bi
                var yData6 = data.map(function (item) {
                    return item[6];
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
                            xAxisIndex: [0, 1, 2, 3, 4, 5],
                        },
                        {
                            type: 'inside',
                            realtime: false,
                            start: 30,
                            end: 70,
                            xAxisIndex: [0, 1, 2, 3, 4, 5]
                        },
                        {
                            type: 'inside',
                            realtime: false,
                            start: 30,
                            end: 70,
                            xAxisIndex: [0, 1, 2, 3, 4, 5]
                        },
                        {
                            type: 'inside',
                            realtime: false,
                            start: 30,
                            end: 70,
                            xAxisIndex: [0, 1, 2, 3, 4, 5]
                        },
                        {
                            type: 'inside',
                            realtime: false,
                            start: 30,
                            end: 70,
                            xAxisIndex: [0, 1, 2, 3, 4, 5]
                        },
                        {
                            type: 'inside',
                            realtime: false,
                            start: 30,
                            end: 70,
                            xAxisIndex: [0, 1, 2, 3, 4, 5]
                        }
                    ],
                    grid: [{
                        left: 100,
                        right: 100,
                        top: '5%',
                        height: '10%'
                    }, {
                        left: 100,
                        right: 100,
                        top: '22%',
                        height: '10%'
                    }, {
                        left: 100,
                        right: 100,
                        top: '39%',
                        height: '10%'
                    }, {
                        left: 100,
                        right: 100,
                        top: '54%',
                        height: '10%'
                    }, {
                        left: 100,
                        right: 100,
                        top: '70%',
                        height: '10%'
                    }, {
                        left: 100,
                        right: 100,
                        top: '86%',
                        height: '10%'
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
                        },
                        {
                            gridIndex: 4,
                            type: 'category',
                            boundaryGap: false,
                            axisLine: {onZero: true},
                            data: xData,
                            position: 'bottom'
                        },
                        {
                            gridIndex: 5,
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
                        },
                        {
                            gridIndex: 4,
                            name: 'Respiration Rate(Breaths/min)',
                            type: 'value',
                            inverse: false
                        },
                        {
                            gridIndex: 5,
                            name: 'Minute Ventilation (L/min)',
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
                        },
                        {
                            name: 'Tidal Volume',
                            type: 'line',
                            xAxisIndex: 4,
                            yAxisIndex: 4,
                            symbolSize: 8,
                            hoverAnimation: false,
                            data: yData5
                        },
                        {
                            name: 'Tidal Volume',
                            type: 'line',
                            xAxisIndex: 5,
                            yAxisIndex: 5,
                            symbolSize: 8,
                            hoverAnimation: false,
                            data: yData6
                        }
                    ]
                };
                chart.setOption(option, true);
                chart.hideLoading();
            },
            writeOtherData4Chart: function (data, title) {
                EventHandler.writerStaticData4Chart(data);
                EventHandler.writerCsaData4Chart(data);
                EventHandler.writerCsrData4Chart(data);
                EventHandler.writerPbticData4Chart(data);
            },
            writerStaticData4Chart: function (data, title) {
                // 初始化报表
                var chart = echarts.init($("#container_ai")[0]);
                var apnea = data.apnea;
                var hypopnea = data.hypopnea;
                //时间轴数据
                if (apnea.dateList.length == 0) {
                    msgBox.tips("无统计数据");
                    return;
                }
                var xData = apnea.dateList;
                var yApneaData = apnea.eventList;
                var yHypopneaData = hypopnea.eventList;
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
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['AI', 'HI']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        top: '10%',
                        bottom: '10%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: xData
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: 'AI',
                            type: 'bar',
                            data: yApneaData
                        },
                        {
                            name: 'HI',
                            type: 'bar',
                            data: yHypopneaData
                        }
                    ]
                };
                chart.setOption(option, true);
                chart.hideLoading();
            },
            writerCsaData4Chart: function (data, title) {
                // 初始化报表
                var chart = echarts.init($("#container_csa")[0]);

                var csa = data.csa;
                if (csa.dateList.length == 0) {
                    msgBox.tips("无统计数据");
                    return;
                }
                //时间轴数据
                var xData = csa.dateList;

                var yCsaData = csa.eventList;

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
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['CSA']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        top: '10%',
                        bottom: '10%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: xData
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: 'CSA',
                            type: 'bar',
                            data: yCsaData
                        }
                    ]
                };
                chart.setOption(option, true);
                chart.hideLoading();
            },
            writerCsrData4Chart: function (data, title) {
                // 初始化报表
                var chart = echarts.init($("#container_csr")[0]);

                var csr = data.csr;
                if (csr.dateList.length == 0) {
                    msgBox.tips("无统计数据");
                    return;
                }
                //时间轴数据
                var xData = csr.dateList;
                var yCsrData = csr.eventList;

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
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['CSR']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        top: '10%',
                        bottom: '10%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: xData
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: 'CSR',
                            type: 'bar',
                            data: yCsrData
                        }
                    ]
                };
                chart.setOption(option, true);
                chart.hideLoading();
            },
            writerPbticData4Chart: function (data, title) {
                // 初始化报表
                var chart = echarts.init($("#container_pb")[0]);

                var pb = data.pb;
                if (pb.dateList.length == 0) {
                    msgBox.tips("无统计数据");
                    return;
                }
                //时间轴数据
                var xData = pb.dateList;
                var yPbData = pb.eventList;
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
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['PB']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        top: '10%',
                        bottom: '10%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: xData
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: 'PB',
                            type: 'bar',
                            data: yPbData
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
             * 柱状图统计
             */
            getStaticData: function (param, callback) {
                $.post(path + '/admin/statisti/data/getStaticData', param, function (backData) {
                    callback(backData);
                });
            },
            /**
             * 波形图统计
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
