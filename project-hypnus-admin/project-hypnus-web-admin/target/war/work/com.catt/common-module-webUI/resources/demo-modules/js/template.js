var jsonData= {
    list : [
        {
            id:1,
            name : "张三",
            idNum : 33333333465748,
            email : "333@qq.com",
            tel : 38888888
        },
        {
            id:2,
            name : "李四",
            idNum : 44444444444444,
            email : "444@qq.com",
            tel : 48888888
        },
        {
            id:3,
            name : "王武",
            idNum : 555555555555555,
            email : "555@qq.com",
            tel : 58888888
        }
    ]
};
seajs.use(['$', 'template'], function($, template){
    $(document).ready(function(){
        $('#showTemplate').on('click', function(){
            var html = template('template1', jsonData);
            $('#show').html(html);
        });
        $('#show').on('click', '.hang', function(){
            var id= $(this).attr('data-value-id');
            window.location.href = "./detail.html?id=" + id ;
        });
    });

})