<%--
  Created by IntelliJ IDEA.
  User: Admin
  Date: 2017/1/6
  Time: 14:21
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <%@include file="/common/headModule2.jsp" %>
    <title>缓存管理</title>
</head>
<script>
    seajs.use(['$', 'template', 'msgBox', 'dataGridHelp'],
            function ($, template, msgBox, dataGridHelp) {

                /** 页面入口 */
                $(function () {
                    var $dataTb = $("#dataTb");
                    $dataTb.dataGridHelp({
                        multSelectBtns: [
                            {btn: $("#btnFlush"), fn: function(){
                                var datas = $dataTb.dataGridHelp("getSelected");
                                var cacheNames = [];
                                for(var i = 0; i < datas.length; i++){
                                    var id = datas[i].id;
                                    $("#yes_"+id).addClass("hidden");
                                    $("#loading_"+id).removeClass("hidden");
                                    cacheNames[i] = id;
                                }
                                var params = {cacheNames: cacheNames.join(',')};
                                $.post(path + '/admin/cache/flush2', params, function (backData) {
                                    var i = 0;
                                    var time = setInterval(function(){
                                        if(i < datas.length){
                                            var id = datas[i].id;
                                            $("#yes_"+id).removeClass("hidden");
                                            $("#loading_"+id).addClass("hidden");
                                            i++;
                                        }else{
                                            msgBox.tips('操作成功');
                                            clearInterval(time);
                                        }
                                    }, 200)
                                });
                            }}
                        ]
                    });
                    var content = [
                        {id: 'menus', name: '菜单缓存'},
                        {id: 'menus2', name: '菜单缓存'},
                        {id: 'enumCache', name: '枚举缓存'},
                        {id: 'authorization', name: 'authorization'},
                        {id: 'propertiesListCache', name: 'propertiesListCache'},
                        {id: 'homeTodoCount', name: 'homeTodoCount'},
                        {id: 'pubSetupCache', name: '公共配置缓存'},
                        {id: 'weChat_PublicAccountCache', name: '微信缓存配置'},
                        {id: 'weChat_PageAuthCache', name: '微信缓存配置'},
                        {id: 'weChat_ApiTicketCache', name: '微信票据缓存'}
                    ];
                    var html = template('template_dataList', content);
                    $('#dataList').html(html);
                    $("#total").html(content.length);
                    $dataTb.dataGridHelp("renderList", content);

                    $("#dataList").on("click", ".clearBtn", function(){
                        var id = $(this).attr("data-value-id");
                        var params = {cacheName: id};
                        $("#yes_"+id).addClass("hidden");
                        $("#loading_"+id).removeClass("hidden");
                        $.post(path + '/admin/cache/flush', params, function (backData) {
                            $("#yes_"+id).removeClass("hidden");
                            $("#loading_"+id).addClass("hidden");
                            msgBox.tips('操作成功');
                        });
                    })
                });
            }
    )
</script>
<body class="skin-track bg-gray-light">
<section class="content-header">
    <!-- 面包屑 -->
    <ol class="breadcrumb" style="right: auto">
        <li><a href="#" id="linkHome"><i class="fa fa-home"></i>主页</a></li>
        <li class="active">缓存管理</li>
    </ol>
    <!-- /.面包屑 -->
</section>

<section class="content">
    <div class="box box-solid">
        <div class="box-header with-border">
            <h1 class="box-title"><span class="box-title-split"></span>共有
                <span id="total" class="lblCount">0</span>条缓存
            </h1>
            <div class="box-tools pull-right">
                <button type="button" class="btn btn-sm bg-write" id="btnFlush" data-toggle="tooltip"
                        title="请勾选数据">清除缓存</button>
            </div>
        </div>
        <div class="box-body no-padding" style="min-height:500px">
            <table class="table table-striped table-hover table-bordered" id="dataTb">
                <thead>
                <tr style="${tabletrColor}">
                    <th style="width: 30px" > </th>
                    <th style="width: 50px">
                        <input type="checkbox" check-all="true" class="minimal-red check">
                    </th>
                    <th style="width: 30%">缓存名称</th>
                    <th style="width: 50%">缓存说明</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody id="dataList">

                </tbody>

            </table>
        </div>
        <div class="box-footer">
            <div id="pageBar"></div>
        </div>
    </div>
</section>
</body>
<script type="text/html" id="template_dataList">
    {{each}}
    <tr>
        <td style="${tabletrColor}">{{$index+1}}</td>
        <td>
            <label class="form-control-static">
                <input type="checkbox" check-all="false" class="minimal-red check">
            </label>
        </td>
        <td><p class="form-control-static text-blue">{{$value.id}}</p></td>
        <td><p class="form-control-static">{{$value.name}}</p></td>
        <td><button class="btn btn-sm bg-write clearBtn" data-value-id="{{$value.id}}">清除缓存</button>
            <img src="${path}/resources/ztree/zTreeStyle/img/loading.gif" id="loading_{{$value.id}}" class="hidden">
            <img src="${path}/resources/skin/default/images/tree_dnd_yes.png" id="yes_{{$value.id}}" class="hidden"></td>
    </tr>
    {{/each}}
</script>
</html>
