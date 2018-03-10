define('admin/commonModule/mobile/appPublishLog/appPublishLogDetail', ['$'], function (require, exports, module) {
    var $ = require('$');

    function AppPublishLogDetail() {
    }

    /**
     * 初始化
     */
    AppPublishLogDetail.prototype.init = function () {
        var self = this;

    };

    module.exports = new AppPublishLogDetail();

});
seajs.use(['$', 'admin/commonModule/mobile/appPublishLog/appPublishLogDetail'], function ($, appPublishLogDetail) {
    $(function () {
        appPublishLogDetail.init();
    });
});