/**
 * 分页列表常用基本事件
 * Created by runtime on 2015/11/19.
 *
 */

var templateList = function (options) {
    var defaults = {

        //单个勾选。
        check: function () {
            var $this = $(this);
            $this.toggleClass("tickOn");
        },

        //只能单选
        checkOnlyOne:function(){
            var $this = $(this);
            if ($this.hasClass("tickOn")) {
                $(".xw_tick").removeClass("tickOn");
                $this.removeClass("tickOn");
            } else {
                $(".xw_tick").removeClass("tickOn");
                $this.addClass("tickOn");
            }
        },

        //勾选当前页中的所有行。
        checkAll: function () {
            //全选
            var $this = $(this);
            if ($this.hasClass("tickOn")) {
                $this.removeClass("tickOn");
                $(".xw_tick").removeClass("tickOn");
            } else {
                $this.addClass("tickOn");
                $(".xw_tick").addClass("tickOn");
            }
        },

        //返回第一个被选中的行或如果没有选中的行则返回null。
        getSelected: function (rowTag) {
            var param = {};
            var $trItem = $("td").offsetParent();
            //alert($trItem.length);
            //每一行对应的参数组件集合
            var jsonParams = $trItem.find('[param="param"]');
            jsonParams.each(function (i) {
                //参数组件
                var $this = $((this));

                var itemValue = $this.val(); //input格式
                if (!itemValue || itemValue == '') {
                    itemValue = $this.text(); //td、span、div等格式
                }
                var itemName = $this.attr('name');

                param[itemName] = itemValue;
            });
            return param;
        },

        //在复选框选中的时候返回所有行。
        getChecked: function (listId, rowTag) {
            var aData = [];
            //列表中的行集合
            var trList = $("#" + listId).find('.tickOn').parents(rowTag);
            for (var i = 0; i < trList.length; i++) {
                var param = {};
                //每一个行
                var trItem = $(trList[i]);
                //每一行对应的参数组件集合
                var jsonParams = trItem.find('[param="param"]');
                jsonParams.each(function (i) {
                    //参数组件
                    var $this = $((this));

                    var itemValue = $this.val(); //input格式
                    if (!itemValue || itemValue == '') {
                        itemValue = $this.text(); //td、span、div等格式
                    }
                    var itemName = $this.attr('name');

                    param[itemName] = itemValue;
                });

                aData.push(param);
            }

            return aData;

        },

        //加载本地数据，旧的行将被移除。
        loadData: function (data) {


        },

        //返回加载完毕后的数据。
        getData: function (listId, rowTag) {
            var aData = [];
            //列表中的行集合
            var trList = $("#" + listId).find(rowTag);

            for (var i = 0; i < trList.length; i++) {
                var param = {};
                //每一个行
                var trItem = $(trList[i]);

                //每一行对应的参数组件集合
                var jsonParams = trItem.find('[param="param"]');
                jsonParams.each(function (i) {
                    //参数组件
                    var $this = $((this));

                    var itemValue = $this.val(); //input格式
                    if (!itemValue || itemValue == '') {
                        itemValue = $this.text(); //td、span、div等格式
                    }
                    var itemName = $this.attr('name');
                    param[itemName] = itemValue;
                });

                aData.push(param);
            }

            return aData;
        },

        repeat2array : function(aJudgeData, aExistData, primaryKey){
            var tempData = [];
            if(aJudgeData.length > 0 && aExistData.length > 0){
                for(var i in aJudgeData){
                    var isExist = false;
                    for(var j in aExistData){
                        var judgeParam = aJudgeData[i];
                        var existParam = aExistData[j];
                        var judgeVal = eval("judgeParam." + primaryKey);
                        var existVal = eval("existParam." + primaryKey);
                        if(judgeVal.indexOf(existVal) != -1 && judgeVal.length == existVal.length){
                            //存在
                            isExist = true;
                        }
                    }
                    if(isExist == false){
                        tempData.push(aJudgeData[i]);
                    }
                }
            }else{
                return aJudgeData;
            }

            return tempData;
        },

        //移除选中行
        deleteRow: function () {

        },
        pager: function (params) {

        }
    };

    $.extend({}, defaults, options || {});

    return defaults;

}();

var imgUtil = function () {
    return {
        /**
         * 根据图片显示区域大小自适应不拉伸图片
         * <img width="480" height="200" imgSrc="url地址"/> img需要定义3个属性值
         * */
        autoSize: function () {
            var imgs = $('img');
            imgs.each(function () {
                var img = $(this);
                $("body").height($(window).height());
                var image = new Image();
                image.src = img.attr('imgSrc');
                image.onload = function () {
                    //获取调整后的图片大小
                    var imgWidth = image.width;
                    var imgHeight = image.height;
                    var maxWidth = img.attr('width'); //显示区域宽度
                    var maxHeight = img.attr('height'); //显示区域高度

                    var size = {};
                    if (imgWidth <= maxWidth && imgHeight <= maxHeight) {
                        size.width = imgWidth;
                        size.height = imgHeight;
                    } else {
                        var scaleWidth = maxWidth / imgWidth;
                        var scaleHeight = maxHeight / imgHeight;

                        var scale = scaleWidth < scaleHeight ? scaleWidth : scaleHeight;
                        size.width = Math.floor(imgWidth * scale);
                        size.height = Math.floor(imgHeight * scale);
                    }

                    image.width = size.width;
                    image.height = size.height;
                    var left = Math.floor(($(window).width() - size.width) / 2);
                    var top = Math.floor(($(window).height() - size.height) / 2);
                    img.css({
                        left: left,
                        top: top
                    });
                    img.append(image);
                };
            });
        },
        defaultErrorImg: function (selector, imgPath) {
            $(selector).bind('error', function () {
                //错误修改标记
                if ($(this).data('isModify')) {
                    return;
                }
                $(this).data('isModify', true).attr('src', imgPath);
            });
        }
    };
}();


//$.fn.customTable = function (options) {
//    options = options || {};
//    return $.extend({}, $.fn.customTable.defaults, options);
//};
//
//// methods
//$.fn.customTable.methods = {
//    //options: function (jq) {
//    //    return $.data(jq[0], "pagination").options;
//    //}
//};
//$.fn.customTable.defaults = {
//    aa : "aa",
//    //单个勾选。
//    check : function(){
//        var $this = $(this);
//        $this.toggleClass("tickOn");
//    },
//
//    //勾选当前页中的所有行。
//    checkAll : function(){
//        //全选
//        var $this = $(this);
//        if($this.hasClass("tickOn")){
//            $this.removeClass("tickOn");
//            $(".xw_tick").removeClass("tickOn");
//        }else{
//            $this.addClass("tickOn");
//            $(".xw_tick").addClass("tickOn");
//        }
//    },
//
//    //在复选框选中的时候返回所有行。
//    getChecked : function(listId, rowTag){
//
//        var aData = new Array();
//        //列表中的行集合
//        var trList = $("#" + listId).find(rowTag + " .tickOn");
//
//        for (var i = 0; i < trList.length; i++) {
//            var param = {};
//            //每一个行
//            var trItem = $(trList[i]);
//
//            //每一行对应的参数组件集合
//            var jsonParams = trItem.find('[param="param"]');
//            jsonParams.each(function(i){
//                //参数组件
//                var $this = $((this));
//
//                var itemValue = $this.val(); //input格式
//                if (!itemValue || itemValue == '') {
//                    itemValue = $this.text(); //td、span、div等格式
//                }
//                var itemName = $this.attr('name');
//
//                param[itemName] = itemValue;
//            });
//
//            aData.push(param);
//        }
//
//        return aData;
//
//    },
//
//    //加载本地数据，旧的行将被移除。
//    loadData : function(data){
//
//
//    },
//
//    //返回加载完毕后的数据。
//    getData : function(listId,  rowTag){
//        var aData = new Array();
//        //列表中的行集合
//        var trList = $("#" + listId).find(rowTag);
//
//        for (var i = 0; i < trList.length; i++) {
//            var param = {};
//            //每一个行
//            var trItem = $(trList[i]);
//
//            //每一行对应的参数组件集合
//            var jsonParams = trItem.find('[param="param"]');
//            jsonParams.each(function(i){
//                //参数组件
//                var $this = $((this));
//
//                var itemValue = $this.val(); //input格式
//                if (!itemValue || itemValue == '') {
//                    itemValue = $this.text(); //td、span、div等格式
//                }
//                var itemName = $this.attr('name');
//                param[itemName] = itemValue;
//            });
//
//            aData.push(param);
//        }
//
//        return aData;
//    },
//
//    //移除选中行
//    deleteRow : function(){
//
//    },
//    pager : function(params){
//
//    }
//};


var templatePage = function (options) {
    //用法
    var defaults = {

        pageNo: 1,
        pageSize: 5,
        onSelectPage: function (page, pageSize) {
            //var options = $('#pageBar').pageBar('options'); //也可获取
            //params.pageNo = page;
            //params.limit = pageSize;
            //EventHandler.initCusInfoList(params);
        }
    };
    //if(defaults.pagination == true){
    //    $('#pageBar').pageBar({
    //        onSelectPage : function(page, pageSize) {
    //            //var options = $('#pageBar').pageBar('options');
    //            params.pageNo = page;
    //            params.limit = pageSize;
    //            defaults.pager(params);
    //        }
    //    });
    //}
    $.extend(defaults, options || {});
    return defaults;
}();


//使用方式
//templatePage({
//    pagination : true,
//    pager : function(params){
//    DataHandler.getStaffMgrList(params, function(result) {
//        var backData = decode(result);
//        $('#staffList').html('');
//        var html = template('staffTemplate', {content : backData});
//        $('#staffList').append(html);
//    })
//}});


/**
 * 单选框
 *
 * @author 陈致远
 * @date 2016/06/16
 */
var radio = function () {
    var tickClass = "ticked";

    return {
        /**
         * 点击单选框
         *  1. 改变被点击单选框样式： 如果已选中，则改为未选中；如果未选中，则改为已选中
         *  2. 同组（同name）的其他单选框改为未选中状态
         *
         * @param name 用于标示同一组单选框
         * @param value 被点击单选框的值
         */
        clickRadio: function (r) {
            var $this = $(r);
            var name = $this.attr("name");
            var value = $this.attr("value");

            var aRadio = $("[name = '" + name + "'][type = 'tempRadio'][value != '" + value + "']");

            $this.toggleClass(tickClass);
            aRadio.removeClass(tickClass);
        },

        /**
         * 获取指定单选框组中被选中的项
         * @param  name 标识同组单选框
         */
        getChecked: function (name) {
            var aRadio = $("[name = '" + name + "'][type = 'tempRadio']");
            var result = -1;

            aRadio.each(function (index) {
                var $radio = $(aRadio[index]);

                var radioValue = $radio.attr("value");

                if (radio.isChecked($radio)) {
                    result = radioValue;
                    return;
                }

            });

            return result;
        },

        /**
         * 判断单选框是否为选中状态
         * @param radio Jquery对象
         *
         * return：
         *       class包含ticked：true
         *       否则：false
         */
        isChecked: function (radio) {
            return radio.hasClass(tickClass);
        },

        /**
         * 设置单选框选中状态
         * @param name 单选框组标识
         * @param value 被选中单选框值
         */
        setChecked: function (name, value) {
            var aRadio = $("[name = '" + name + "'][type = 'tempRadio']");

            aRadio.each(function (index) {
                var $radio = $(aRadio[index]);

                var radioValue = $radio.attr("value");

                if (radioValue == value) {
                    $this.addClass(tickClass);
                }

            });
        }
    }
}();


//$("#allCheck").bind("click", initList.checkAll);
//
//$("#search").bind("click", templateList);

