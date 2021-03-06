/**
 * Created by runtime on 2016/10/17.
 */

seajs.use(['$', 'template','msgBox'], function ($, template,msgBox) {

    $(function () {
        initData();
        initEvent();
    });
    
    function initEvent() {
        $(document).on('click', '.sidebar-menu > li:not(.treeview)', function () {
            var $this = $(this);
            $('.sidebar-menu').find('li').not(this).removeClass('active');
            $this.addClass('active');
            $('li.treeview > ul.treeview-menu').removeClass('menu-open').hide();
        });
        $(document).on('click', '.treeview-menu li', function (e) {
            $('.treeview-menu li').not(this).removeClass('active');
            $(this).addClass('active');
            e.stopPropagation();
        });

        $(document).on('click','#editUser',function(e){
            e.stopPropagation();
            $.post(path+'/admin/userMgr/check',null,function(data){
                if(data.type="success"){
                    var sysUserId = data.content;
                    if(sysUserId=="-1"){
                        window.location.reload(true);
                    }else{
                        msgBox.exWindow.open({
                            title: '修改信息',
                            url: path + "/admin/userMgr/edit.html?id=" + sysUserId,
                            width: '1000px',
                            height: '600px',
                            close: function (result) {
                                if (result) {
                                    msgBox.exWindow.close(result);
                                }
                            }
                        });
                    }
                }else{
                    window.location.reload(true);
                }
            })
        })
    }
    
    function initData() {
        $.get(path + '/admin/menus.json', null, function (data) {
            var resultData = data.rightList;
            if (resultData) {
                $('.sidebar-menu').html(template('menuTemplate', data));
                if (resultData[0].children.length > 0) {
                    $("#contentFrame").attr("src", path + resultData[0].children[0].url);
                } else {
                    $("#contentFrame").attr("src", path + resultData[0].url);
                }
            }
        });
    }
});
//一下两个方法都是重定义高度， 不同页面引用js不同可能调用方法不一样所以定义两个

//设置iframe高度1
function setIframHei(height) {
    $("#contentFrame").height(height);
}

//设置iframe高度2
//function setpageIframe(height) {
//    $("#contentFrame").height(height);
//}
