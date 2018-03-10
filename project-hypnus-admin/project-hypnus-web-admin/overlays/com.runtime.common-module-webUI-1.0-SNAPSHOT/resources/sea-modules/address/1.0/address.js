/**
 * Description:获取地址信息接口
 * Controller PATH
 * com.catt.common.module.security.web.controller.admin.AddressController.java
 * date: 2015-11-26 10:41
 * author: Liang zhanpeng
 */
define('address/1.0/address', ['$'], function (require, exports, module) {

    /** 数据缓存 */
    var cache = {};

    var address = {
        /**
         * 查询所有省
         * @param callbackFn
         */
        findProvince: function (callbackFn) {
            $.get(path + '/address/province', null, function (responseResult) {
                typeof callbackFn === 'function' && callbackFn(responseResult);
            });
        },

        /**
         * 根据省份地址编码查询城市
         * @param provinceCode  省级地址编码
         * @param callbackFn
         */
        findCity: function (provinceCode, callbackFn) {
            $.get(path + '/address/city/' + provinceCode, null, function (responseResult) {
                typeof callbackFn === 'function' && callbackFn(responseResult);
            });
        },

        /**
         * 根据城市地址编码查询县、区
         * @param cityCode  市级地址编码
         * @param callbackFn
         */
        findCounty: function (cityCode, callbackFn) {
            $.get(path + '/address/county/' + cityCode, null, function (responseResult) {
                typeof callbackFn === 'function' && callbackFn(responseResult);
            });
        }
    };

    module.exports = address;
});