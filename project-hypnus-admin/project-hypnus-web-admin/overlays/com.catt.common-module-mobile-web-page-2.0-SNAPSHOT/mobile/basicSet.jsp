<c:if test="${empty systemBgClass}">
    <c:set var="systemBgClass" value="bg-gray-light"/>
</c:if>

<c:if test="${empty systemSkin}">
    <c:set var="systemSkin" value="skin-charge-light"/>
</c:if>

<c:if test="${empty tabletrColor}">
    <c:set var="tabletrColor" value="background-color:#f5f5f5;color:#0059a8"/>
</c:if>

<c:if test="${empty tableStyle}">
    <c:set var="tableStyle" value="table table-striped table-hover table-bordered"/>
</c:if>

<c:if test="${empty tableClass}">
    <c:set var="tableClass" value="table table-bordered table-hover table-condensed  "/>
</c:if>

<c:if test="${empty btnCharge}">
    <c:set var="btnCharge" value="btn btn-sm bg-charge-primary"/>
</c:if>

<c:if test="${btnDefault == null }">
    <c:set var="btnDefault" value="btn btn-sm bg-charge-default"/>
</c:if>

<c:if test="${fontColor == null }">
    <c:set var="fontColor" value="color-charge-primary"/>
</c:if>

<script type="text/javascript">
    /**
     * 保存按下坐标，主要用于解决选择文本触发click事件问题<br>
     * 用法：在点击的元素标签加上
     * <pre>
     *     onmousedown="window.saveDownPosition(this, event);"
     * </pre>
     * @param element 目标元素
     * @param event 事件对象
     */
    if (!window.saveDownPosition) {
        window.saveDownPosition = function (element, event) {
            var $element = $(element);
            $element.attr("downPositionX", event.screenX);
            $element.attr("downPositionY", event.screenY);
        };
    }

    /**
     * 判断点击位置是否移动，主要用于解决选择文本触发click事件问题<br>
     * 用法：在click方法开头执行
     * <pre>
     *     if(window.positionIsMove(this, event)){ return; }
     * </pre>
     * @param element 目标元素
     * @param event 事件对象
     * @returns {boolean}
     */
    if (!window.positionIsMove) {
        window.positionIsMove = function (element, event) {
            var $element = $(element);
            if (event.screenX == $element.attr("downPositionX") && event.screenY == $element.attr("downPositionY")) {
                return false;
            }

            return true;
        };
    }

    /**
     * 查看图片
     *
     * @param imageUrls 图片地址数组
     * @param currentImageUrl 当前图片地址
     * @param validateImageExt 是否校验图片扩展名，默认为false
     */
    if (!window.viewImage) {
        window.viewImage = function (imageUrls, currentImageUrl, validateImageExt) {
            top.seajs.use(['viewer'], function (viewer) {
                viewer.viewImage(imageUrls, currentImageUrl, validateImageExt);
            });
        };
    }


</script>