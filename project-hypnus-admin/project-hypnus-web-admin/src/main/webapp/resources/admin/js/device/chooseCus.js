
seajs.use(['$', 'template', 'msgBox', 'util', 'pageBar', 'jquery.json'],
    function ($, template, msgBox, util, pageBar) {
        /**
         * 初始化处理器
         */
        var InitHandler = function () {
            return {
                /** 初始化入口 */
                init: function () {
                    this.initPage();
                    this.initEvent();
                    this.initData();
                },


                /** 初始化界面  */
                initPage: function () {
                    var params = {}; //搜索条件
                    $('#pageBar').pageBar({
                        onSelectPage: function (page, pageSize) {
                            params.pageNo = page;
                            params.pageSize = pageSize;
                            EventHandler.search(params);
                        }
                    });
                },
                /** 初始化事件 */
                initEvent: function () {
                    //动态绑定click(动态生成的html)
                    $("#dataList").on('click', '.xw_tick', templateList.check);

                    //查询
                    $('#searchBtn').click(EventHandler.search);
                    //重置
                    $('#resetBtn').click(EventHandler.resetBtn);
                    //选择
                    $('#selectCus').click(EventHandler.selectCus);
                    //返回
                    $('#returnBack').click(EventHandler.returnBack);
                },
                /** 初始化数据  */
                initData : function(){
                    // 初始化数据列表
                    EventHandler.search();
                }
            }
        }();

        /**
         * 事件处理器
         */
        var EventHandler = function () {
            return {
                //返回
                returnBack : function(){
                    msgBox.exWindow.close();
                },
                //重置
                resetBtn : function(){
                    $("#cusTel").val("");
                },
                //查询
                search : function(params){
                    $(".xw_tickAll").removeClass("tickOn");

                    if(typeof(params)=="undefined" || params.type == "click"){
                        params = {pageNo : 1, pageSize : 10};
                    }
                    var cusTel = $("#cusTel").val();
                    params.phone = cusTel;
                    DataHandler.search(params, function (backData) {
                        var html = template('template_dataList', backData.content);
                        $('#dataList').html(html);

                        var page = params.pageNo;
                        var pageSize = params.pageSize;
                        $('#pageBar').pageBar({
                            total: backData.total,
                            pageNumber: page,
                            pageSize: pageSize
                        });
                        setParenHei();
                    });
                },
                //选择客户
                selectCus : function(){
                    var checked = templateList.getChecked("dataList", "tr");
                    if (checked.length < 1) {
                        msgBox.tips("请勾选一个用户");
                        return;
                    }
                    if(checked.length>1){
                        msgBox.tips("该设备只能绑定以用户");
                        return;
                    }
                    var userId = checked[0].id;
                    var deviceId = $("#deviceId").val();
                    if((deviceId==null||deviceId=='')||userId==''){
                        msgBox.tips("操作异常,请刷新后重试");
                    }
                    $.post(path + "/admin/deviceMgr/bindUser", {"deviceId":deviceId,"userId":userId}, function(backData) {
                        if (backData.type == 'success') {
                            msgBox.tips("绑定成功");
                            msgBox.exWindow.close(backData.type);
                        }else{
                            msgBox.tips(backData.content);
                        }
                    });

                }
            }
        }();


        /**
         * 数据处理器
         */
        var DataHandler = function () {
            return {
                /**
                 * 查询
                 */
                search: function (param, callback) {
                    $.post(path + '/admin/userMgr/searchCus', param, function (backData) {
                        callback(backData);
                    });
                }
            }
        }();

        $(function () {
            InitHandler.init();
        })
    }
);
