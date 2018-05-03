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
                        EventHandler.getStatisticsDataUseInfo();
                        EventHandler.getStatisticsDataFromOSS();
                        EventHandler.getBreathEventData();
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
                        EventHandler.getStatisticsDataUseInfo();
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
                        deviceId: $('#id').val(),
                        startTime: $('#createDateDay').val(),
                        endTime: $('#endDateDay').val()
                    }, function (workParamMap) {
                        if (workParamMap) {
                            $('#model').html(workParamMap.model);
                            $('#data_version').html(workParamMap.dataVersion);
                            $('#useTime').html(workParamMap.yesterday+"~"+workParamMap.today);

                            var modestring =  new Array();
                            modestring[0] ="设置冲突";
                            modestring[1] ="CPAP";
                            modestring[2] ="APAP";
                            modestring[3] ="BPAP-S";
                            modestring[4] ="AutoBPAP-S";
                            modestring[5] ="BPAP-T";
                            modestring[6] ="BPAP-ST";

                            if(workParamMap.mode ==1)
                            {
                                $('#pressure1_name').html("治疗压力：");
                                $('#pressure2_name').hidden();
                                $('#presure2').hidden();
                            }
                            else if (workParamMap.mode ==2)
                            {
                                $('#pressure1_name').html("最大压力：");
                                $('#pressure2_name').html("最小压力：");
                            }
                            else if(workParamMap.mode ==3)
                            {
                                $('#pressure1_name').html("吸气压力：");
                                $('#pressure2_name').html("呼气压力：");
                            }
                            else if(workParamMap.mode ==4)
                            {
                                $('#pressure1_name').html("最小吸气压力：");
                                $('#pressure2_name').html("最大呼气压力：");
                            }
                            else (workParamMap.mode ==5)
                            {
                                $('#pressure1_name').html("IPAP压力：");
                                $('#pressure2_name').html("EPAP压力：");
                            }

                            if(workParamMap.mode ==0)
                            {
                                $('#cure_model').html("Conflict");
                                $('.controlmode').hide();
                            }
                            else
                            {
                                $('#cure_model').html(modestring[workParamMap.mode]);
                                $('#presure1').html(workParamMap.presure1);
                                $('#presure2').html(workParamMap.presure2);
                                $('#startPressure').html(workParamMap.startPresure);
                                $('#cureDelay').html(workParamMap.cureDelay);
                                /*$('#breathRate').html(workParamMap.breathRate);
                                $('#boostslope').html();
                                $('#buckslope').html();
                                $('#breathRatio').html(workParamMap.breathRatio);*/
                                $('.controlmode').show();
                            }

                        }
                    });
                },

                //获取使用信息
                getStatisticsDataUseInfo: function () {
                    DataHandler.getStatisticsDataUseInfo({
                        deviceId: $('#id').val(),
                        startTime: $('#createDateDay').val(),
                        endTime: $('#endDateDay').val()
                    }, function (useInfoMap) {
                        if (useInfoMap) {
                            //获取使用信息
                            $('#totalDays').html(useInfoMap.totalDays);
                            $('#moreThan4HoursDays').html(useInfoMap.moreThan4HoursDays);
                            $('#noUseDays').html(useInfoMap.noUseDays);
                            $('#totalTimes').html(useInfoMap.totalTimes+ "小时");
                            $('#lessThan4HoursDays').html(useInfoMap.lessThan4HoursDays);
                            $('#averageUseTime').html(useInfoMap.averageUseTime + "小时");
                            $('#moreThan4HoursPercent').html(useInfoMap.moreThan4HoursPercent + "%");
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

                //获取呼吸事件
                getBreathEventData: function () {
                    DataHandler.getBreathEventData({
                        deviceId: $('#id').val()
                    }, function (breathEventDataMap) {
                        if (breathEventDataMap) {

                            $('#ahi').html(breathEventDataMap.ahi);
                            $('#ai').html(breathEventDataMap.ai);

                            $('#hi').html(breathEventDataMap.hi);
                            $('#snore').html(breathEventDataMap.snore);

                            $('#csa').html(breathEventDataMap.csa);
                            $('#csr').html(breathEventDataMap.csr);

                            $('#pb').html(breathEventDataMap.pb);


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
                    $.post(path + '/admin/deviceMgr/getStatisticsDataWorkParamNew', params, function (backData) {
                        callback(backData);
                    });
                },

                /**
                 * 获取统计数据-使用信息
                 * @param params
                 * @param callback
                 */
                getStatisticsDataUseInfo: function (params, callback) {
                    $.post(path + '/admin/statisti/data/getStatisticsDataUseInfo', params, function (backData) {
                        callback(backData);
                    });
                },

                /**
                 * 获取统计数据-潮气量，分钟通气量，呼吸频率，呼吸比
                 * @param params
                 * @param callback
                 */
                getStatisticsDataFromOSS: function (params, callback) {
                    $.post(path + '/admin/deviceMgr/getStatisticsDataFromOSS', params, function (backData) {
                        callback(backData);
                    });
                },

                /**
                 * 获取统计数据-呼吸事件
                 * @param params
                 * @param callback
                 */
                getBreathEventData: function (params, callback) {
                    $.post(path + '/admin/statisti/data/getBreathEventData', params, function (backData) {
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