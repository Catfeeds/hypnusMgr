/**
 * 定位模块
 */
define('location/1.0/location', [ 'baiduMapConvertor/1.0/baiduMapConvertor',
		'msgBox' ], function(require, exports, module) {
	// 加载百度坐标转换器模块
	require('baiduMapConvertor/1.0/baiduMapConvertor');
	// 消息提示框模块
	var MsgBox = require('msgBox');

	var Location = {

		/**
		 * 获取当前位置的GPS坐标
		 * 
		 * @param callback
		 *            回调方法，有两个参数(code, point)，<br>
		 *            code为执行结果编号，成功为1，失败为0；<br>
		 *            point为GPS坐标，{lng:'经度', lat:'纬度'}
		 */
		getCurrentLocationAsGpsPoint : function(callback) {
			var tempCallbackName = "tempGpsCallback"
					+ Math.round(Math.random() * 10000);
			window[tempCallbackName] = function(gpsPoint) {
				delete window[tempCallbackName];

				// TODO 获取失败处理

				callback && callback(1, {
					lng : gpsPoint.longitude,
					lat : gpsPoint.latitude,
					address: gpsPoint.address
				});
			};

			window.ctGps.GetGPS(tempCallbackName, "", 3, 3);
		},

		/**
		 * 获取当前位置的百度坐标
		 * 
		 * @param callback
		 *            回调方法，有两个参数(code, point)，<br>
		 *            code为执行结果编号，成功为1，失败为0；<br>
		 *            point为百度坐标，{lng:'经度', lat:'纬度'}
		 */
		getCurrentLocationAsBaiduPoint : function(callback) {
			var Location = this;
			Location.getCurrentLocationAsGpsPoint(function(code, gpsPoint) {
				if (code == 1) {
					Location.convertGpsPointToBaiduPoint(gpsPoint, callback);
				} else {
					callback && callback(code, gpsPoint);
				}
			});
		},

		/**
		 * 转换GPS坐标为百度坐标
		 * 
		 * @param gpsPoint
		 *            GPS坐标，{lng:'经度', lat:'纬度'}
		 * @param callback
		 *            回调方法，有两个参数(code, point)，<br>
		 *            code为执行结果编号，成功为1，失败为0；<br>
		 *            point为百度坐标，{lng:'经度', lat:'纬度'}
		 */
		convertGpsPointToBaiduPoint : function(gpsPoint, callback) {
			// 真实经纬度转成百度坐标
			BMap.Convertor.translate(gpsPoint, 0, function(baiduPoint) {
				if (baiduPoint && !baiduPoint.lng && !baiduPoint.lat) {
					MsgBox.tips("转换百度地图坐标失败");
					callback && callback(0, baiduPoint);
					return;
				}

				callback && callback(1, baiduPoint);
			});
		}

	};

	module.exports = Location;
});