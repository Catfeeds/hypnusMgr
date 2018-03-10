// JavaScript Document

$(function () {
    $('#columnchart').highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: '统计人数'
        },
        xAxis: {
            categories: ['2015-01-01', '2015-02-01', '2015-03-01', '2015-04-01', '2015-05-01', '2015-06-01', '2015-07-01', '2015-08-01', '2015-09-01', '2015-10-01', '2015-11-01', '2015-12-01']
        },
        yAxis: {
            title: {
                text: '人数'
            }
        },
        tooltip: {
            enabled: false,
            formatter: function() {
                return '<b>'+ this.series.name +'</b><br/>'+this.x +': '+ this.y +'°C';
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: '在线',
            data: [4, 6, 9, 14, 18, 21, 25, 26, 23, 18, 13, 9]
        }, {
            name: '已完成',
            data: [3, 4, 5, 8, 11, 15, 17, 16, 14, 10, 6, 4]
        }]
    });
});
