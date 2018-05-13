/**
 * Created by yeqing on 2018-03-30 18:06:20.
 */
var _msgBox = {};
var _util = {};
var _conpareDate = {};
seajs.use(['$', 'template', 'msgBox', 'easyuiDatagrid', 'easyuiPagination',
    'validate', 'select', 'util', 'jquery.json'], function ($, template, msgBox, easyuiDatagrid,
                                                            easyuiPagination, validate, select, util) {
    _msgBox = msgBox;
    _util = util;

    /** 初始化处理器 */
    var InitHandler = (function () {
        return {
            init: function () {
                this.initPage();
                this.initEvent();
                this.initForm();
                this.loadEnum();
            },
            //加载查询框的枚举值
            loadEnum: function () {
                var gender = [{value: 1, name: "女性"}, {value: 2, name: "男性"}]
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
            getEnumList: function (param, callback) {
                $.post(path + '/pub/enumMgr/findEnumListBusi', param, function (backData) {
                    callback(backData);
                });
            },
            initForm: function () {
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
            initPage: function () {
                EventHandler.getCusOrderDetail();
            },
            initEvent: function () {
                //保存
                $('#btnSubmit').click(EventHandler.save);
                //取消
                $('#btnCancel').click(function () {
                    window.location.href = path + '/admin/deviceMgr/index.html';
                });
            }
        };
    })();


    /**
     * 事件处理器
     */
    var EventHandler = function () {
        return {
            save: function () {
                if ($("#saveForm").valid()) {
                    var param = _util.FormUtil.getFormJson('#saveForm');
                    param = compare(param, _conpareDate);
                    if(Object.keys(param).length <= 1)
                        _msgBox.tips("亲！没有参数需要修改哦！");
                    else
                    {
                        $.postJSON(path + "/admin/deviceMgr/updateShadowDevice", param,  function (backData) {
                            _msgBox.tips("参数设置操作成功");
                            if (backData.type == 'success') {
                                window.location.href = path + '/admin/deviceMgr/index.html';
                            }
                        });

                    /*    $.post(path + "/admin/deviceMgr/updateShadowDevice", param, function (backData) {
                            _msgBox.tips("参数设置操作成功");
                            if (backData.type == 'success') {
                                window.location.href = path + '/admin/deviceMgr/index.html';
                            }
                        });*/
                    }

                }
            },
            getCusOrderDetail: function () {
                DataHandler.getShadowDevice({
                    deviceId: $('#id').val()
                }, function (shadowDevice) {
                    if (shadowDevice) {
                        modeSelectHandler(shadowDevice.cure_mode);
                        $('#deviceID').val(shadowDevice.deviceID);
                        $('#cpap_p').val(shadowDevice.cpap_p);
                        $('#bpap_in_p').val(shadowDevice.bpap_in_p);
                        $('#bpap_ex_p').val(shadowDevice.bpap_ex_p);
                        $('#apap_max_p').val(shadowDevice.apap_max_p);
                        $('#apap_min_p').val(shadowDevice.apap_min_p);
                        $('#autos_max_p').val(shadowDevice.autos_max_p);
                        $('#autos_min_p').val(shadowDevice.autos_min_p);
                        $('#st_ex_p').val(shadowDevice.st_ex_p);
                        $('#st_in_p').val(shadowDevice.st_in_p);
                        $('#start_pressure').val(shadowDevice.start_pressure);
                        $('#machine').val(shadowDevice.machine);
                        $('#cure_mode').val(shadowDevice.cure_mode);
                        $('#data_version').val(shadowDevice.data_version);
                        $('#cur_state').val(shadowDevice.cur_state);
                        $('#t_in_p').val(shadowDevice.t_in_p);
                        $('#t_ex_p').val(shadowDevice.t_ex_p);
                        $('#cure_delay').val(shadowDevice.cure_delay);
                        $('#breath_rate').val(shadowDevice.breath_rate);
                        $('#boostslope').val(shadowDevice.boostslope);
                        $('#buckslope').val(shadowDevice.buckslope);
                        $('#breath_ratio').val(shadowDevice.breath_ratio);
                        $('#mask').val(shadowDevice.mask);
                        $('#humidify_level').val(shadowDevice.humidify_level);
                        $('#intelligent_start').val(shadowDevice.intelligent_start);
                        $('#intelligent_stop').val(shadowDevice.intelligent_stop);
                        _conpareDate = _util.FormUtil.getFormJson('#saveForm');
                        setParenHei();
                    }
                });
            },
        }
    }();

    /**
     * 数据处理器
     */
    var DataHandler = function () {
        return {
            checkAccount: function (param, callback) {
                $.post(path + '/safeMgr/staffMgr/checkAccount', param, function (backData) {
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

    /** 页面入口 */
    $(function () {
        InitHandler.init();
    });
});


function goIndex(backData) {
    _msgBox.exWindow.close(backData);
    //location.href = path + "/safeMgr/staff/index";
}

function modeSelectHandler(value) {
    $(".CPAP, .S, .Auto-S, .APAP, .T, .ST").hide();
    $("#cure_mode").val(value);
    if(value == 0) {
        $(".CPAP").show();
    } else if(value == 1){
        $(".APAP").show();
    } else if(value == 2){
        $(".S").show();
    } else if(value == 3){
        $(".Auto-S").show();
    } else if (value == 4){
        $(".T").show();
    } else if (value == 5){
        $(".ST").show();
    }
}

function compare(obj1,obj2) {
    for (var x in obj1) {
        if(obj2.hasOwnProperty(x)){
            if(obj1[x] != obj2[x] || x == "deviceID"){
                //啥也不干
            }
            else{
                delete obj1[x];  //删除属性
            }
        }else{
            continue;
        }
    }
    return obj1;
}

$.postJSON = function(url, data, callback) {
    return jQuery.ajax({
        'type' : 'POST',
        'url' : url,
        'contentType' : 'application/json',
        'data' : JSON.stringify(data),
        'dataType' : 'json',
        'success' : callback
    });
};

function checkPressure(type){
    var max,min;
    mode = $("#cure_mode").val();
    if(mode == 1) {
        max = $("#apap_max_p");
        min = $("#apap_min_p");
    }else  if(mode == 2){
        max = $("#bpap_in_p");
        min = $("#bpap_ex_p");
    }else if(mode == 3){
        max = $("#autos_min_p");
        min = $("#autos_max_p");
    }else if(mode == 4){
        max = $("#t_in_p");
        min = $("#t_ex_p");
    }else if(mode == 5){
        max = $("#st_in_p");
        min = $("#st_ex_p");
    }else {
        return
    }
    var startPress = $("#start_pressure");
    if(type ==1) {
        if(max.val()<min.val())
            min.val(max.val());
        if(startPress.val()> max.val())
            startPress.val(max.val());
    }else if(type == 2 ){
        if(max.val()< min.val())
            max.val(min.val());
        if(startPress.val()> min.val())
            startPress.val(min.val());
    }else if(type == 3){
        if(startPress.val()> min.val()){
            _msgBox.tips("亲,起始压力要小于等于"+min.find("option:selected").text());
            startPress.val(min.val());
        }

    }
}
