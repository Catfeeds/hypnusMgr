/**
 * 支付模块
 */
define('pay/1.0/pay', [ '$' ], function(require, exports, module) {

	/**
	 * 提交到指定路径
	 */
	function submit(action, param, method, charset, target) {
		target = target || "_self";
		
		var payFormId = 'payForm';
		$("#" + payFormId).remove();
		
		$('body').append('<form id="' + payFormId + '" action="'+action+'" method="'+method+'" style="display:none;" target="'+target+'"></form>');
		var payForm = $("#" + payFormId);
		
		if(charset){
			payForm.attr("accept-charset", charset);
			
			if(document.charset){// IE的表单编码依赖于页面编码
				var docCharset = document.charset;
				document.charset = charset;
			}
		}
		
		for(var key in param){
			payForm.append('<input type="hidden" name="'+key+'" value="'+param[key]+'" />');
		}
		
		payForm.submit();
		payForm.remove();
		
		if(charset && document.charset){ // 还原页面编码
			document.charset = docCharset;
		}
	}

	var Pay = {

		/**
		 * 支付宝Web支付
		 * 
		 * @param param
		 *            参数，示例：
		 * 
		 * <pre>
		 * {
		 *  businessType : 'abc', //业务类型（支付事件处理器bean名称）
		 *  其他业务参数...
		 * }
		 * </pre>
		 * @param target 支付页面显示目标位置，默认为当前窗口，可选值参考form的target属性
		 */
		aliWebPay : function(param, target) {
			$.post(path + '/pay/aliWebPay/getFullPayParam', param, function(response){
				if(response && response.type == 'success'){
					var fullParam = response.result;
					submit('https://mapi.alipay.com/gateway.do', fullParam, 'GET', 'utf-8', target);
				}
			});
		},
	
		/**
		 * 京东网关支付
		 * 
		 * @param param
		 *            参数，示例：
		 * 
		 * <pre>
		 * {
		 *  businessType : 'abc', //业务类型（支付事件处理器bean名称）
		 *  其他业务参数...
		 * }
		 * </pre>
		 * @param url 自定义获取支付参数接口地址，空则使用默认地址
		 * @param target 支付页面显示目标位置，默认为当前窗口，可选值参考form的target属性
		 * @param callback 支付订单回调接口
		 */
		jdGatewayPay : function(param, url, target, callback) {
			url = url || path + '/pay/jdGatewayPay/getFullPayParam';
			$.post(url, param, function(response){
				if(response && response.type == 'success'){
					var fullParam = response.result;
					submit('https://tmapi.jdpay.com/PayGate', fullParam, 'POST', 'gbk', target);
					
					if(callback){
						// 支付订单
						var payOrder = {};
						payOrder.orderNo = fullParam.v_oid;
						callback(payOrder);
					}
				}
			});
		}

	};

	module.exports = Pay;
});