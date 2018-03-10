/**
 * 加载提示框模块
 */
define(
    'loadingTip/2.0/pc/loadingTip',
    ['$','layer', 'loadingTip/2.0/pc/css/loadingTip.css'],
    function (require, exports, module) {
        var layer = require('layer');
        var londingText = "加载中...";
        // 模块路径
        var modulePath = seajs.resolve('loadingTip/2.0/pc/loadingTip');
        // 模块父路径
        var moduleParentPath = modulePath.replace("loadingTip.js", "");
        // 显示计数
        var showCount = 0;

        var layerId = null;

        var LoadingTip = {
            /**
             * 加载提示框类型：top - 顶部，middle - 中间，bottom - 底部
             */
            /* private */loadingTipType : null,
            /**
             * 默认加载提示框类型
             */
            defLoadingTipType : "middle",

            /**
             * 显示加载提示框
             */
            show : function() {
                var LoadingTip = this;

                if (!LoadingTip.isShow()) {
                    if (!layerId) {
                        layerId = layer.msg('<font class="loadingText">' + londingText + '</font>', {
                            icon: 16,
                            time: -1,
                            shade: [0.1, '#fff']
                        });
                        $('.loadingText')
                            .closest('.layui-layer-msg')
                            .css({'border': '0px','background-color':'rgba(0,0,0,.6)'})
                            .find('.layui-layer-ico16').css({background:'url('+moduleParentPath+'images/loading.gif) no-repeat'});
                    }
                }else{
                    LoadingTip.hide();
                }

                showCount++;
            },

            /**
             * 隐藏加载提示框
             */
            hide : function() {
                showCount--;
                showCount = showCount < 0 ? 0 : showCount;

                if (showCount == 0) {
                    layer.close(layerId);
                    layerId = null;
                }
            },

            /**
             * 是否显示状态
             */
            isShow : function() {
                return showCount > 0;
            }
        };

        module.exports = LoadingTip;
    });