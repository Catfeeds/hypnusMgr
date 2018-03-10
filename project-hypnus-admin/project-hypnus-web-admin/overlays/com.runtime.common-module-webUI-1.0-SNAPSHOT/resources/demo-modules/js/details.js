var jsonData= {
    '1' : {
        name : "张三",
        idNum : 33333333465748,
        email : "333@qq.com",
        tel : 38888888
    },
    '2' : {
        name : "李四",
        idNum : 44444444444444,
        email : "444@qq.com",
        tel : 48888888
    },
    '3' : {
        name: "王武",
        idNum: 555555555555555,
        email: "555@qq.com",
        tel: 58888888
    }
};
seajs.use(['$', 'template', 'util'], function($, template, util){
    $(document).ready(function(){
        var id = util.Request.getUrlParam('id');
        var html = template('template1', {value:jsonData[id]});
        $('#show').html(html);
    });
})