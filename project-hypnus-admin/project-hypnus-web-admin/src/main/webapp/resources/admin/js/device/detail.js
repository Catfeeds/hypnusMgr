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
                        EventHandler.getStatisticsDataWorkParam();
                        EventHandler.getStatisticsDataFromOSS();
                        EventHandler.getUseData();
                    }
                },
                /** 初始化事件绑定 */
                initEvent: function () {
                    $("#printBill").click(function () {
                        EventHandler.printBill();
                    });
                    //统计柱状图
                    $("#staticLi").click(function () {
                        EventHandler.detailData(1);
                    });
                    //详细图形
                    $("#numLi").click(function () {
                        EventHandler.detailData(2);
                    });
                    $("#searchBtn").click(function () {
                        EventHandler.getStatisticsDataWorkParam();
                        EventHandler.getStatisticsDataFromOSS();
                        EventHandler.getUseData();
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
                            $('#averageUseTime').html(testUseTime.breathRatio + "小时");
                            $('#moreThan4HoursPercent').html(testUseTime.breathRatio + "%");
                        }
                    });
                },

                //获取潮气量，分钟通气量，呼吸频率，呼吸比
                getStatisticsDataFromOSS: function () {
                    DataHandler.getStatisticsDataFromOSS({
                        deviceId: $('#id').val()
                    }, function (ossDataMap) {
                        if (ossDataMap) {

                            $('#fiftyPercentTV').html(ossDataMap.fiftyPercentTV);
                            $('#ninetyPercentTV').html(ossDataMap.ninetyPercentTV);

                            $('#fiftyPercentMV').html(ossDataMap.fiftyPercentMV + "  L/min");
                            $('#ninetyPercentMV').html(ossDataMap.ninetyPercentMV + "  L/min");

                            $('#fiftyPercentBR').html(ossDataMap.fiftyPercentBR);
                            $('#ninetyPercentBR').html(ossDataMap.ninetyPercentBR);

                            $('#fiftyPercentBP').html(ossDataMap.fiftyPercentBP);
                            $('#ninetyPercentBP').html(ossDataMap.ninetyPercentBP);

                        }
                    });
                },

                getUseData: function () {
                    DataHandler.getUseData({
                        deviceId: $('#id').val(),
                        startTime: $('#createDateDay').val(),
                        endTime: $('#endDateDay').val()
                    }, function (device) {
                        if (device) {
                            $('#averagePresure1').html(device.averagePresure1);
                            $('#pecentPresure1').html(device.pecentPresure1);
                            $('#averagePresure2').html(device.averagePresure2);
                            $('#pecentPresure2').html(device.pecentPresure2);

                            $('#averageMvPos').html(device.averageMvPos);
                            $('#pecentMvPos').html(device.pecentMvPos);
                            setParenHei();
                        }
                    });
                },

                //设置设备参数 统计图形
                detailData: function (type) {
                    var deviceId = $('#id').val();
                    var createDateDay = $('#createDateDay').val();
                    var endDateDay = $('#endDateDay').val();
                    window.location.href = path + '/admin/statisti/data/index.html?deviceId=' + deviceId +
                        '&type=' + type + '&createDateDay=' + createDateDay + '&endDateDay=' + endDateDay;
                },

            };
        })();
        /** 数据处理器 */
        var DataHandler = (function () {
            return {
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

                /**
                 * 获取统计数据-潮气量，分钟通气量，呼吸频率，呼吸比，呼吸事件，漏气信息
                 * @param params
                 * @param callback
                 */
                getStatisticsDataFromOSS: function (params, callback) {
                    $.post(path + '/admin/deviceMgr/getStatisticsDataFromOSS', params, function (backData) {
                        callback(backData);
                    });
                },
                /**
                 * 获取设备参数
                 * @param params
                 * @param callback
                 */
                getUseData: function (params, callback) {
                    $.post(path + '/admin/deviceMgr/getUseData', params, function (backData) {
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