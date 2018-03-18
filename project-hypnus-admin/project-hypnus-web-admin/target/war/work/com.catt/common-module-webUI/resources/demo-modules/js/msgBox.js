seajs.use(['$', 'msgBox'], function($, msgBox){
    $(document).ready(function(){
        $('#testOpen').on('click', function(){

            var url = "./../msgBox/edit.html";
            var name = $('#name').val();
            var idNum = $('#idNum').val();
//            url = url + "?name=" + name + "&idNum=" + idNum
            msgBox.exWindow.open({
                width : "600px",
                height : "300px",
                url : url,
                close : function(result){
                    if(result){
                        alert("这里显示从刚刚弹出页面返回来的数据：\n"
                            + "name:" + result.name + "\n" + "idNum:" + result.idNum);
                    }
                }
            });
        });
        $('#testTips').on('click', function(){
            msgBox.tips("测试tips");

        });
        $('#testWarn').on('click', function(){
            msgBox.warn("正在测试warn", 1, function(){});
        });
        $('#testAlert').on('click', function(){
            msgBox.alert({
                title : 'alert测试',// 可选
             	msg : 'alert测试内容',// 必须
//                showCloseBtn:true,//按钮左上
                callback : function() {
                }// 这是回调函数，可选
            });
        });
        $('#testConfirm').on('click', function() {
            msgBox.confirm({
                title: '提示',
                msg: '请点击按钮',
                callback: function (btnType) {
                    if (btnType == 'ok') {
                        alert("刚刚点击了确定按钮");
                    }
                    if (btnType == 'cancel') {
                        alert("刚刚点击了取消按钮");
                    }
                }
            });
        });
    });

});