var treeSetting;//分类树配置
var zTreeObj = null;
var cateId; //当前选中的分类ID
var specIndex; //当前选中的规格下标
seajs.use(['$', 'template', 'msgBox', 'util', 'jquery.json', 'pageBar'],
    function ($, template, msgBox, util, pageBar) {
        /** 初始化处理器 */
        var InitHandler = (function () {
            return {
                /** 初始化入口 */
                init: function () {
                    this.initPage();
                    this.initEvent();
                    this.initData();
                },

                /** 初始化界面 */
                initPage: function () {
                    //初始化 商品分类 树
                    treeSetting = {
                        check: {
                            //enable: true,
                            //chkboxType: { "Y": "s", "N": "ps" }
                        },
                        view: {
                            selectedMulti: false,
                            showIcon: true
                        },
                        edit: {
                            enable: true,
                            showRemoveBtn: false,
                            showRenameBtn: false
                        },
                        data: {
                            keep: {
                                parent: true,
                                leaf: true
                            },
                            simpleData: {
                                enable: true
                            }
                        }
                    };
                    EventHandler.getCateTree();
                    zTreeObj = $.fn.zTree.init($("#tree"), treeSetting);
                },

                /** 初始化事件绑定 */
                initEvent: function () {
                    $('#btnSubmit').click(function(){
                        EventHandler.checkBack();
                    });
                    $('#btnClose').click(function(){
                       msgBox.exWindow.close();
                    })
                },

                /** 初始化数据加载 */
                initData: function () {
                }
            };
        })();

        /** 事件处理器 */
        var EventHandler = (function () {
            return {
                //加载分类树
                loadTree : function(backData){
                    var zNodes02 = [
                        //{id: -1, pId: 0, name: "商品列表", open: true}
                    ];
                    $.each(backData, function (i, item) {
                        zNodes02.push({
                            id: item.id,
                            pId: item.parentId,
                            name: item.name,
                            //icon: path + "/resources/images/" + (item.status == 1 ? "normal.png" : "overdue.png"),
                            open: false
                        });
                    });
                    $.fn.zTree.init($("#tree"), treeSetting, zNodes02);
                    EventHandler.reset(1);
                },
                //获取分类树
                getCateTree : function(){
                    DataHandler.getCates(null, function (backData) {
                        EventHandler.loadTree(backData);
                    });
                },


                //列表数据重置
                reset: function (type) {
                    if(type == 1){ //点击树形分类
                        $("#specList").html("");
                        $("#specDetailList").html("");
                        $("#paramList").html("");
                    }else if(type == 2){ //点击规格
                        $("#specDetailList").html("");
                    }
                    var a;
                    specIndex = a;
                },


                //勾选返回
                checkBack: function () {
                    var nodes = zTreeObj.getSelectedNodes();
                    if(nodes && nodes.length>0){
                        var item = nodes[0];
                        msgBox.exWindow.close($.toJSON({id: item.id, name: item.name}));
                    }

                },
            };
        })();

        /** 数据处理器 */
        var DataHandler = (function () {
            return {
                /**
                 * 获取类型列表
                 */
                getCates: function (param, callback) {
                    $.post(path + '/admin/basicConfig/productCate/getAllCate', param, function (backData) {
                        callback(backData);
                    });
                },

            };
        })();

        /** 页面入口 */
        $(function () {
            InitHandler.init();
        });

    });

/**
 *删除数组指定下标或指定对象
 */
Array.prototype.remove=function(obj){
    for(var i =0;i <this.length;i++){
        var temp = this[i];
        if(!isNaN(obj)){
            temp=i;
        }
        if(temp == obj){
            for(var j = i;j <this.length;j++){
                this[j]=this[j+1];
            }
            this.length = this.length-1;
        }
    }
}