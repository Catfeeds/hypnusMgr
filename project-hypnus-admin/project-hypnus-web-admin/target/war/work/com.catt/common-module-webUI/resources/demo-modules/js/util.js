seajs.use(['$', 'util'], function($, util){
    $(document).ready(function(){
        $('#getUrlParam').on('click', function(){
            var result = util.Request.getUrlParam($('#url').val());
            $('#urlParam').val(result);
        });
        $('#getFormJson').on('click', function(){
            var obj = util.FormUtil.getFormJson($('#form'));
            console && console.log && console.log(obj);
            console && console.info && console.info(obj);
        });
        $('#format').on('click', function(){
            var date = new Date($('#date').val());
            var resultDate = util.DateUtil.format(date, $('#pattern').val())
            $('#resultDate').val(resultDate);
        });
    });
});