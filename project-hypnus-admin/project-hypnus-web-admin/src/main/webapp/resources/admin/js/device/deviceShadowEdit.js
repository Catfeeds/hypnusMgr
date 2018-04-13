/**
 * Created by yeqing on 2018-03-30 18:06:20.
 */
var _msgBox = {};
var _util = {};
seajs.use([ '$', 'template', 'msgBox', 'easyuiDatagrid', 'easyuiPagination',
	'validate', 'select', 'util', 'jquery.json'], function($, template, msgBox, easyuiDatagrid,
								  easyuiPagination, validate, select, util) {
	_msgBox = msgBox;
	_util = util;

	/** 页面入口 */
	$(function() {
		InitHandler.init();
	});
});

/** 初始化处理器 */
var InitHandler = (function() {
	return {
		init : function() {
			this.initPage();
			this.initEvent();
			this.initForm();
			this.loadEnum();
		},
		//加载查询框的枚举值
		loadEnum : function(){
            var gender = [{value:1, name: "女性"},{value:2, name: "男性"}]
            $('#gender').select({valueField: 'value', textField: 'name', data: gender});
	        //var aData = [];
	        //aData.push({tabName:"T_HR_STAFF",colName:"ISEX"});
	        //var param = {};
	        //param.whsEnum = $.toJSON(aData);
	        //param.type = 2;
	        //this.getEnumList(param, function(backData){
	        //    var data = backData.result;
	        //    var gender = data['T_HR_STAFF-ISEX'].sEnumMapping;
	        //    $('#gender').select({valueField: 'value', textField: 'name', data: gender});
	        //});
		},
		/**
	     * 获取枚举信息
	     */
	    getEnumList : function(param, callback){
	      $.post(path + '/pub/enumMgr/findEnumListBusi', param, function(backData) {
	        callback(backData);
	      });
	    },
		initForm : function(){
			//绑定表单验证
			$("#saveForm").validate({
				ignore: ".ignore",
				errorPlacement: function (error, element) {
				},
				invalidHandler: function (event, validator) {
					for (v in validator.errorMap) {
						$('#' + v).focus();
						_msgBox.warn(validator.errorMap[v]);
						break;
					}
				}
			});
		},
		initPage : function() {
			EventHandler.getCusOrderDetail();

		},
		initEvent : function() {
			//保存
			$('#btnSubmit').click(EventHandler.save);
			//取消
			$('#btnCancel').click(function() {
                goIndex();
			});
		}
	};
})();


/**
 * 事件处理器
 */
var EventHandler = function(){
	return {
		save : function(){
            if($("#saveForm").valid()){
                var param = _util.FormUtil.getFormJson('#saveForm');

                $.post(path + "/admin/deviceMgr/deviceShadowEdit", param, function(backData) {
                    _msgBox.tips("参数设置操作成功");
                    if (backData.type == 'success') {
                        goIndex(backData.type);
                    }
                });
            }
		},
        getCusOrderDetail: function () {
            DataHandler.getShadowDevice({
                deviceId: $('#id').val()
            }, function (shadowDevice) {
                if (shadowDevice) {
                    $('#start_pressure').html(shadowDevice.start_pressure);
                    $('#machine').html(shadowDevice.machine);
                    $('#cure_model').html(shadowDevice.cure_model);
                    $('#data_version').html(shadowDevice.data_version);

                    $('#t_in_p').html(shadowDevice.t_in_p);
                    $('#t_ex_p').html(shadowDevice.t_ex_p);
                    $('#cure_delay').html(shadowDevice.cure_delay);
                    $('#breath_rate').html(shadowDevice.breath_rate);
                    $('#boostslope').html(shadowDevice.boostslope);
                    $('#buckslope').html(shadowDevice.buckslope);
                    $('#breath_ratio').html(shadowDevice.breath_ratio);
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
	}
}();

/**
 * 数据处理器
 */
var DataHandler = function(){
    return {
    	checkAccount : function(param, callback){
            $.post(path + '/safeMgr/staffMgr/checkAccount', param, function(backData) {
                callback(backData);
            });
        },
        /**
         * 获取影子设备参数
         * @param params
         * @param callback
         */
        getShadowDevice: function (params, callback) {
            $.post(path + '/admin/deviceMgr/getShadowDevice', params, function (backData) {
                callback(backData);
            });
        }
    };
}();

function goIndex(backData){
    _msgBox.exWindow.close(backData);
    //location.href = path + "/safeMgr/staff/index";
}