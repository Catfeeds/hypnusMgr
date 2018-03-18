var obj;
seajs.use(['$', 'jquery.json'], function($){
    $().ready(function(){
        $('#jsonToObj').on('click', function(){
            var str =  $('#jsonInput').val();
             obj = $.evalJSON(str);
            console && console.log && console.log(obj);
            console && console.info && console.info(obj);

        });
        $('#objToJson').on('click', function(){
            var json = $.toJSON(obj);
            $('#jsonOutput').val(json);
            console && console.log && console.log(json);
            console && console.info && console.info(json);
        });
    })
})