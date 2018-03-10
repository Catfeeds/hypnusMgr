<%@tag description="分页条控件" pageEncoding="utf-8" %>
<%@ attribute name="id" required="true" description="控件ID(必填)，页面唯一" rtexprvalue="true" %>
<%@ attribute name="className" required="false" description="控件样式名称" rtexprvalue="true" %>

<div id="${id}" class="${className}"
     style="border:1px solid #dadbdb; border-bottom:2px solid #AEAEAE; padding:3px 0px 0px; margin:5px 0; background:#fff;"></div>

<script type="text/javascript">
    seajs.use(['$', 'pageBar'],function ($, pageBar) {
        $('#' + '${id}').pageBar();
    });
</script>
