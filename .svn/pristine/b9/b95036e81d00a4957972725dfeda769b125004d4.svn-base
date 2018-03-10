// JavaScript Document

// HLR图表
$(function(){
	var myChart = echarts.init(document.getElementById('HLRChart')); 
        
	var option = {
    //title : {
//        text: '某地区蒸发量和降水量',
//        subtext: '纯属虚构'
//    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['开机率']
    },
    
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : ['1','2','3','4','5','6','7','8','9']
			
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'开机率',
            type:'bar',
            data:[13.0, 14.9, 17.0, 23.2, 25.6, 76.7, 56.6, 32.6, 20.0],//
             markPoint : {
                data : [
                    {name : '年最高', value : 6, xAxis: 5, yAxis: 170, symbolSize:17},
                ]
            },
        },
        
    ]
};
	
	// 为echarts对象加载数据
	myChart.setOption(option); 
	
})

// VLR图表
$(function(){
	var myChart = echarts.init(document.getElementById('VLRChart')); 
    var option = {
    tooltip : {
        trigger: 'axis'
    },
    calculable : true,
    legend: {
        data:['开机用户','A接口话务量']
    },
    xAxis : [
        {
            type : 'category',
            data : ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15']
        }
    ],
    yAxis : [
        {
            type : 'value',
            name : '万户',
            //axisLabel : {
//                formatter: '{value} ml'
//            }
        },
        {
            type : 'value',
            name : '万EBR',
            //axisLabel : {
//                formatter: '{value} °C'
//            }
        }
    ],
    series : [
        {
            name:'开机用户',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3, 32.6, 20.0, 6.4, 3.3]
        },
        {
            name:'A接口话务量',
            type:'line',
            yAxisIndex: 1,
            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2, 23.0, 16.5, 12.0, 6.2]
        }
    ]
};
                        

	
	// 为echarts对象加载数据
	myChart.setOption(option); 
	
	
})

// 移动短信图表
$(function(){
	var myChart = echarts.init(document.getElementById('yidongChart')); 
    var labelTop = {
    normal : {
        label : {
            show : true,
            position : 'center',
            formatter : '{b}',
            textStyle: {
                baseline : 'bottom'
            }
        },
        labelLine : {
            show : false
        }
    }
};
var labelFromatter = {
    normal : {
        label : {
            formatter : function (a,b,c){return 100 - c + '%'},
            textStyle: {
                baseline : 'top'
            }
        }
    },
}
var labelBottom = {
    normal : {
        color: '#ccc',
        label : {
            show : true,
            position : 'center'
        },
        labelLine : {
            show : false
        }
    },
    emphasis: {
        color: 'rgba(0,0,0,0)'
    }
};
var radius = [40, 50];
option = {
    legend: {
        x : 'center',
        y : '10',
        data:[
            '新客户短信','老客户短信'
        ]
    },
	
    series : [
        {
            type : 'pie',
            center : ['30%', '50%'],
            radius : radius,
            x: '0%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'other', value:46, itemStyle : labelBottom},
                {name:'新客户短信', value:54,itemStyle : labelTop}
            ]
        },
        {
            type : 'pie',
            center : ['70%', '50%'],
            radius : radius,
            x:'20%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'other', value:56, itemStyle : labelBottom},
                {name:'老客户短信', value:44,itemStyle : labelTop}
            ]
        },
    ]
};
                    
   
                    
                        

	
	// 为echarts对象加载数据
	myChart.setOption(option); 
	
	
})

// 移动用户数图表
$(function(){
	var myChart = echarts.init(document.getElementById('duanxinChart')); 
    var option = {
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['意向','预购','成交']
    },
  
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['周一','周二','周三','周四','周五','周六','周日']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'成交',
            type:'line',
            smooth:true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data:[10, 12, 21, 54, 260, 830, 710]
        },
        {
            name:'预购',
            type:'line',
            smooth:true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data:[30, 182, 434, 791, 390, 30, 10]
        },
        {
            name:'意向',
            type:'line',
            smooth:true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data:[1320, 1132, 601, 234, 120, 90, 20]
        }
    ]
};
                    
   
                    
                        

	
	// 为echarts对象加载数据
	myChart.setOption(option); 
	
	
})