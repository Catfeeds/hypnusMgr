/**
 * 图片查看器Viewer模块化
 */
define('viewer/0.5.1/viewer', ['$', 'viewer/0.5.1/dist/viewer.min.js', 'viewer/0.5.1/dist/viewer.min.css', 'util/1.0/util'],
    function (require, exports, module) {
    // 工具类
    var Util = require('util/1.0/util');
    // 当前显示图片索引
    var currentIndex;

    // viewer工具类
    var viewerUtil = {
        /**
         * 查看图片
         * @param imageUrls 图片地址数组
         * @param currentImageUrl 当前图片地址
         * @param validateImageExt 是否校验图片扩展名，默认为false
         */
        viewImage: function (imageUrls, currentImageUrl, validateImageExt) {
            if (!currentImageUrl || (validateImageExt && !Util.FileUtil.isImageFile(currentImageUrl))) {
                return;
            }

            var viewImageUrls = [];
            currentIndex = -1;

            $.each(imageUrls, function (index, item) {
                if (!validateImageExt || Util.FileUtil.isImageFile(item)) {
                    viewImageUrls.push(item);
                    if (currentIndex < 0 && item === currentImageUrl) {
                        currentIndex = viewImageUrls.length - 1;
                    }
                }
            });

            if (currentIndex < 0) {
                viewImageUrls.slice(0, 0, currentImageUrl);
                currentIndex = 0;
            }

            var $viewImageItems = null;
            var $viewImageContainer = $("#viewImageContainer");
            if ($viewImageContainer.length == 0) {
                $("body").append('<div id="viewImageContainer"></div>');
                $viewImageContainer = $("#viewImageContainer");

                $viewImageContainer.append('<ul id="viewImageItems" style="overflow: hidden;display: none;"></ul>');
                $viewImageItems = $("#viewImageItems");

                $.each(viewImageUrls, function (index, item) {
                    $viewImageItems.append('<li><img src="' + item + '"></li>');
                });

                var options = {
                    // inline: true,
                    // url: 'data-original',
                    shown:function () {
                        // 查看器显示后自动跳转到指定图片
                        $("#viewImageItems").viewer("view", currentIndex);
                    }
                };

                $viewImageItems.viewer(options);
            } else {
                $viewImageItems = $("#viewImageItems");
                // 清除旧图片
                $viewImageItems.empty();

                $.each(viewImageUrls, function (index, item) {
                    $viewImageItems.append('<li><img src="' + item + '"></li>');
                });

                $viewImageItems.viewer("update");
            }

            $viewImageItems.viewer("show");
        },

        /**
         * 取消查看图片
         */
        cancelViewImage: function () {
            var $viewImageContainer = $("#viewImageContainer");
            if ($viewImageContainer.length > 0) {
                var $viewImageItems = $("#viewImageItems");
                $viewImageItems.viewer("hide");
            }
        }
    }

    module.exports = viewerUtil;
});