// JavaScript Document

$(function () {
	Highcharts.setOptions({
        colors: ['#3cabd8', '#d4d6d6']
    });
    // Create the chart
    $('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '2015年3月份部门微课总数统计'
        },
        subtitle: {
            text: '点击条形图可看详细数据'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: '活跃用户数量'
            }

        },
		credits: {
			enabled: false
		},
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },

        series: [{
            name: "Brands",
            colorByPoint: true,
            data: [{
                name: "乘务",
                y: 4755,
                drilldown: "1"
            }, {
                name: "语言",
                y: 4883,
                drilldown: "2"
            }, {
                name: "领导力",
                y: 3999,
                drilldown: "3"
            }, {
                name: "机务",
                y: 3996,
                drilldown: "4"
            }, {
                name: "地服",
                y: 4345,
                drilldown: "5"
            }, {
                name: "营销",
                y: 5657,
                drilldown: "6"
			}, {
                name: "安保",
                y: 5996,
                drilldown: "7"
            }, {
                name: "货运",
                y: 6338,
                drilldown: "8"
			}, {
                name: "安全",
                y: 7588,
                drilldown: "9"
			 }, {
                name: "信息",
                y: 7889,
                drilldown: "10"
			 }]
        }],
        drilldown: {
            series: [{
                name: "Microsoft Internet Explorer",
                id: "Microsoft Internet Explorer",
                data: [
                    [
                        "v11.0",
                        24.13
                    ],
                    [
                        "v8.0",
                        17.2
                    ],
                    [
                        "v9.0",
                        8.11
                    ],
                    [
                        "v10.0",
                        5.33
                    ],
                    [
                        "v6.0",
                        1.06
                    ],
                    [
                        "v7.0",
                        0.5
                    ]
                ]
            }, {
                name: "Chrome",
                id: "Chrome",
                data: [
                    [
                        "v40.0",
                        5
                    ],
                    [
                        "v41.0",
                        4.32
                    ],
                    [
                        "v42.0",
                        3.68
                    ],
                    [
                        "v39.0",
                        2.96
                    ],
                    [
                        "v36.0",
                        2.53
                    ],
                    [
                        "v43.0",
                        1.45
                    ],
                    [
                        "v31.0",
                        1.24
                    ],
                    [
                        "v35.0",
                        0.85
                    ],
                    [
                        "v38.0",
                        0.6
                    ],
                    [
                        "v32.0",
                        0.55
                    ],
                    [
                        "v37.0",
                        0.38
                    ],
                    [
                        "v33.0",
                        0.19
                    ],
                    [
                        "v34.0",
                        0.14
                    ],
                    [
                        "v30.0",
                        0.14
                    ]
                ]
            }, {
                name: "Firefox",
                id: "Firefox",
                data: [
                    [
                        "v35",
                        2.76
                    ],
                    [
                        "v36",
                        2.32
                    ],
                    [
                        "v37",
                        2.31
                    ],
                    [
                        "v34",
                        1.27
                    ],
                    [
                        "v38",
                        1.02
                    ],
                    [
                        "v31",
                        0.33
                    ],
                    [
                        "v33",
                        0.22
                    ],
                    [
                        "v32",
                        0.15
                    ]
                ]
            }, {
                name: "Safari",
                id: "Safari",
                data: [
                    [
                        "v8.0",
                        2.56
                    ],
                    [
                        "v7.1",
                        0.77
                    ],
                    [
                        "v5.1",
                        0.42
                    ],
                    [
                        "v5.0",
                        0.3
                    ],
                    [
                        "v6.1",
                        0.29
                    ],
                    [
                        "v7.0",
                        0.26
                    ],
                    [
                        "v6.2",
                        0.17
                    ]
                ]
            }, {
                name: "Opera",
                id: "Opera",
                data: [
                    [
                        "v12.x",
                        0.34
                    ],
                    [
                        "v28",
                        0.24
                    ],
                    [
                        "v27",
                        0.17
                    ],
                    [
                        "v29",
                        0.16
                    ]
                ]
            }]
        }
    });
});

$(function () {
	Highcharts.setOptions({
        colors: ['#3cabd8', '#d4d6d6']
    });
    // Create the chart
    $('#weikechart02').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '2015年地服部月微课总数'
        },
        subtitle: {
            text: '点击条形图可看详细数据'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: '活跃用户数量'
            }

        },
		credits: {
			enabled: false
		},
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },

        series: [{
            name: "Brands",
            colorByPoint: true,
            data: [{
                name: "2015-01",
                y: 4755,
                drilldown: "1"
            }, {
                name: "2015-02",
                y: 4883,
                drilldown: "2"
            }, {
                name: "2015-03",
                y: 3999,
                drilldown: "3"
            }, {
                name: "2015-04",
                y: 3996,
                drilldown: "4"
            }, {
                name: "2015-05",
                y: 4345,
                drilldown: "5"
            }, {
                name: "2015-06",
                y: 5657,
                drilldown: "6"
			}, {
                name: "2015-07",
                y: 5996,
                drilldown: "7"
            }, {
                name: "2015-08",
                y: 6338,
                drilldown: "8"
			}, {
                name: "2015-09",
                y: 7588,
                drilldown: "9"
			 }, {
                name: "2015-10",
                y: 7889,
                drilldown: "10"
			 },{
                name: "2015-11",
                y: 7588,
                drilldown: "9"
			 }, {
                name: "2015-12",
                y: 7889,
                drilldown: "10"
			 }]
        }],
        drilldown: {
            series: [{
                name: "Microsoft Internet Explorer",
                id: "Microsoft Internet Explorer",
                data: [
                    [
                        "v11.0",
                        24.13
                    ],
                    [
                        "v8.0",
                        17.2
                    ],
                    [
                        "v9.0",
                        8.11
                    ],
                    [
                        "v10.0",
                        5.33
                    ],
                    [
                        "v6.0",
                        1.06
                    ],
                    [
                        "v7.0",
                        0.5
                    ]
                ]
            }, {
                name: "Chrome",
                id: "Chrome",
                data: [
                    [
                        "v40.0",
                        5
                    ],
                    [
                        "v41.0",
                        4.32
                    ],
                    [
                        "v42.0",
                        3.68
                    ],
                    [
                        "v39.0",
                        2.96
                    ],
                    [
                        "v36.0",
                        2.53
                    ],
                    [
                        "v43.0",
                        1.45
                    ],
                    [
                        "v31.0",
                        1.24
                    ],
                    [
                        "v35.0",
                        0.85
                    ],
                    [
                        "v38.0",
                        0.6
                    ],
                    [
                        "v32.0",
                        0.55
                    ],
                    [
                        "v37.0",
                        0.38
                    ],
                    [
                        "v33.0",
                        0.19
                    ],
                    [
                        "v34.0",
                        0.14
                    ],
                    [
                        "v30.0",
                        0.14
                    ]
                ]
            }, {
                name: "Firefox",
                id: "Firefox",
                data: [
                    [
                        "v35",
                        2.76
                    ],
                    [
                        "v36",
                        2.32
                    ],
                    [
                        "v37",
                        2.31
                    ],
                    [
                        "v34",
                        1.27
                    ],
                    [
                        "v38",
                        1.02
                    ],
                    [
                        "v31",
                        0.33
                    ],
                    [
                        "v33",
                        0.22
                    ],
                    [
                        "v32",
                        0.15
                    ]
                ]
            }, {
                name: "Safari",
                id: "Safari",
                data: [
                    [
                        "v8.0",
                        2.56
                    ],
                    [
                        "v7.1",
                        0.77
                    ],
                    [
                        "v5.1",
                        0.42
                    ],
                    [
                        "v5.0",
                        0.3
                    ],
                    [
                        "v6.1",
                        0.29
                    ],
                    [
                        "v7.0",
                        0.26
                    ],
                    [
                        "v6.2",
                        0.17
                    ]
                ]
            }, {
                name: "Opera",
                id: "Opera",
                data: [
                    [
                        "v12.x",
                        0.34
                    ],
                    [
                        "v28",
                        0.24
                    ],
                    [
                        "v27",
                        0.17
                    ],
                    [
                        "v29",
                        0.16
                    ]
                ]
            }]
        }
    });
});
