/**
 * Created by yxc on 2015-10-12 16:03:20.
 */
var _msgBox = {};
var reNext = false,reClick = false;
var _util = {};
seajs.use([ '$', 'template', 'msgBox', 'easyuiDatagrid', 'easyuiPagination',
	'validate', 'select', 'util', 'jquery.json'], function($, template, msgBox, easyuiDatagrid,
								  easyuiPagination, validate, select, util) {
	_msgBox = msgBox;
	_util = util;

	/** 页面入口 */
	$(function() {
		InitHandler.init();
	});
});

/** 初始化处理器 */
var InitHandler = (function() {
	return {
		init : function() {
			this.initEvent();
			this.initForm();
		},
		initForm : function(){
		},
		initEvent : function() {
		    //监听倒计时
            monitor($("#getCodeBtn"));

            $("#goToLogin").bind("click",EventHandler.goLogin);
            //获取验证码
			$("#getCodeBtn").click(function () {
                var reg = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
			    var phone = $("#phone");
			    if(phone.val()==null||phone.val().trim()==""||!reg.test(phone.val())){
                    _msgBox.tips("请输入正确的手机号码");
                    phone.focus();
                    return ;
                }
                countDown($(this),150,EventHandler.getCode);
            });

			//下一步
			$("#nextBtn").click(function(){
			    console.log("aaa")
			    if(!reNext){
                    var phone = $("#phone");
                    var authCode = $("#authCode");
                    if(phone.val() == null || phone.val().trim()==""){
                        _msgBox.tips("请输入手机号码");
                        phone.focus();
                        return;
                    }
                    if (authCode.val() == null || authCode.val().trim() == "") {
                        _msgBox.tips("请输入您接收到的短信验证码");
                        authCode.focus();
                        return;
                    }
                    reNext = true;
                    EventHandler.validationFnc(phone.val(),authCode.val());
                }
            });

			//注册
            $("#register").click(function(){
                if(!reClick){
                    reClick = true;
                    var pwdHtml = $("#password");
                    var phone = $("#finalPhone").val();
                    var confirmPwdHtml = $("#confirmPwd");
                    var reg = /^(?=.{6,14}$)[0-9a-zA-Z@!+-?]+$/;
                    if(!reg.test(pwdHtml.val())){
                        _msgBox.tips("密码必须在6-14位且不能含有非法字符");
                        pwdHtml.focus();
                        return;
                    }
                    if(confirmPwdHtml.val()!=pwdHtml.val()){
                        _msgBox.tips("两次输入的密码不一致");
                        confirmPwdHtml.focus();
                        return;
                    }
                    EventHandler.register(phone,pwdHtml.val());
                }
            });

		}
	};
})();


/**
 * 事件处理器
 */
var EventHandler = function(){
	return {
       getCode:function(){
           var phone = $("#phone").val();
           $.post(path + "/dmz/authCode/get", {"phone":phone}, function(backData) {
               if (backData.type == 'success') {
                   _msgBox.tips("发送成功,请注意查收");
               }else{
                   _msgBox.tips(backData.content);
                   return;
               }
           });
       },
       validationFnc:function(phone,authCode){
           $.ajax({
               type:"post",
               data:{"phone":phone,"authCode":authCode},
               url:path+"/dmz/authCode/validation",
               success:function(){
                   $("#firstStep").addClass("none");
                   $("#secondStep").removeClass("none");
                   $(".huanyin").text("2.设置密码");
                   $("#finalPhone").val(phone);
               },
               error:function(backData){
                   _msgBox.tips(backData.content);
               },
               complete:function () {
                   reNext=false;
               }
           })
       },
        register:function(phone,password){
            $.ajax({
                type:"post",
                data:{"phone":phone,"password":password},
                url:path + "/dmz/user/register",
                success:function(){
                    _msgBox.tips("注册成功,2秒后跳转至登陆页");
                    setTimeout(function () {
                        window.location.href=path+"/login";
                    },2000);
                },
                error:function(backData){
                    _msgBox.tips(backData.content);
                },
                complete:function () {
                    reClick=false;
                }
            });
        },
        goLogin:function(){
            window.location.href=path+"/login";
        }
	}
}();


function goIndex(backData){
    _msgBox.exWindow.close(backData);
}