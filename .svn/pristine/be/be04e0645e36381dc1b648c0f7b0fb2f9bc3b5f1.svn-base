/**
 * 系统信息模块
 */
define('{projectModuleBase}/admin/system/1.0/system', ['$', 'util', 'msgBox'], function(require, exports, module) {
    var util = require('util');                // 工具类
    var msgBox = require('msgBox');             // 提示窗控件
    var system = function () {
        /** 数据缓存 */
        var cache = {};
        /**
         * 公用Ajax请求方法
         * @param param 请求参数
         * @param url 请求地址
         * @param callbackFn 回调函数
         */
        var commonAjaxRequest = function (param, url, callbackFn) {
            util.ObjectUtil.convertNullToUndefined(param);
            util.ObjectUtil.convertMethodToUndefined(param);
            $.post(url, param, function (responseData) {
                util.ObjectUtil.convertNullToUndefined(responseData);
                typeof callbackFn === 'function' && callbackFn(responseData);
            });
        };
        /**
         * 保存用户信息到缓存中
         * @param staffInfo 用户信息
         */
        var saveStaffInfoToCache = function(staffInfo) {
            cache.staffInfo = staffInfo;
        };
        /**
         * 从缓存中获取用户信息
         */
        var getStaffInfoFromCache = function() {
            return cache.staffInfo;
        };
        /**
         * 获取用户信息接口
         * @param callbackFn 回调函数
         */
        var getStaffInfoFormInterface = function(callbackFn){
            var url = path + '/admin/staffInfo';
            commonAjaxRequest(null, url, function (data) {
                saveStaffInfoToCache(staffInfo);
                callbackFn && callbackFn(staffInfo);
            });
        };
        /**
         * 获取枚举数据接口
         * @param param 参数
         * @param callbackFn 回调函数
         */
        var getEnumListInterface = function(param, callbackFn){
            var url = path + '/pub/enumMgr/findEnumListBusi';
            commonAjaxRequest(param, url, function (data) {
                if (data.type=='success') {
                    callbackFn && callbackFn(data.result);
                }
            });
        };
        return {
            /**
             * 读取人员信息进行操作
             * @param callbackFn 回调函数，回调反参（
             *      staffInfo : {
             *          staffId         人员标识
             *          staffName       人员名称
             *          staffAccount    人员账号
             *          deptId          部门标识
             *          deptName        部门名称
             *      }
             * ）
             * @param readCache  读取缓存，默认为true
             */
            getStaffInfo : function(callbackFn, readCache) {
                var debugModel = false;
                if (debugModel) {
                    callbackFn && callbackFn({
                        staffId         : 1,
                        staffName       : '丁一',
                        staffAccount    : 'admin',
                        deptId          : 6,
                        deptName        : '大庆井队'
                    });
                } else {
                    var isReadCache = typeof readCache != 'undefined' ? readCache : true;
                    var staffInfo = getStaffInfoFromCache();
                    if (!staffInfo || !isReadCache) {
                        getStaffInfoFormInterface(callbackFn);
                    } else {
                        callbackFn && callbackFn(staffInfo);
                    }
                }
            },

            /**
             * 查询系统枚举
             * @param obj 枚举获取参数
             *     {tabName : 表名, colName : 列名}
             *     或
             *     [{tabName : 表名, colName : 列名}, {tabName : 表名, colName : 列名}
             *            ...]
             * @param callbackFn 回调函数，入参：{
             *         表名-列名 : {
             *             sEnumTblName 表名
             *             sEnumColName 列名
             *             sEnumCNName  枚举中文名
             *             sEnumMapping 枚举内容
             *             当type = 1或不传时 返回对象
             *             { value : name, value : name, ...}
             *             当type = 2时 返回数组
             *             [ {value,name}, {value,name}, ...]
             *         }
             *     }
             * @param type 返回值类型 1-对象，2-数组
             */
            getEnumList : function (obj, type, callbackFn) {
                seajs.use(['jquery.json/2.5.1/jquery.json'], function () {
                    var param = {
                        whsEnum : $.toJSON(obj),
                        type : type
                    };
                    getEnumListInterface(param, callbackFn);
                });
            },
            accuracy:function(value){
            	var unit = 10000.0;
            	if(typeof(value)=='number'){
            		return (value/unit).toFixed(4)*1;
            	}else{
            		return 0;
            	}
            }
        }
    }();
    module.exports = system;
});