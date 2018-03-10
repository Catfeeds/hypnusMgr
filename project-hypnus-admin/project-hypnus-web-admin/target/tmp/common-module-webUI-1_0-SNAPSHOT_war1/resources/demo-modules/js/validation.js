var _msgBox;
seajs.use(['$', 'validate', 'msgBox'],function($, validate, msgBox) {
    _msgBox  = msgBox;
    $(document).ready(function () {
        EventHandler.init();
    });
});

var EventHandler = function(){
    return{
        init : function(){
            EventHandler.validate();
            EventHandler.validate2();
            $('#submit').on('click', EventHandler.submit);
            $('#submit2').on('click', EventHandler.submit2);
        },

        validate : function() {
            $('#signupForm').validate({
                ignore: '.ignore',
                debug: true,
                errorPlacement: function (error, element) {
                },
                invalidHandler: function (error, validator) {
                    for (var i in validator.errorList) {
                        _msgBox.tips(validator.errorList[i].message, 1, function () {
                            $(validator.errorList[i].element).focus();
                        });
                        return false;
                    }
                }
            })
        },

        validate2 : function() {
            $('#signupForm2').validate({
                rules : {
                    name2 : {
                        required : true
                    } ,
                    idNum2 : {
                        required : true,
                        isIdCardNo : true
                    },
                    email2 : {
                        required : true,
                        email : true
                    },
                    tel2 : {
                        required : true,
                        isTel : true
                    },
                    introduce2 : {
                        required : true,
                        rangelength : [10,100]
                    }
                },
                messages : {
                    name2 : {
                        required : "请输入姓名"
                    },
                    idNum2 : {
                        required : "请输入身份证号码",
                        isIdCardNo : "身份证号码格式错误"
                    },
                    email2 : {
                        required : "请输入电子邮箱",
                        email : "电子邮箱格式错误"
                    },
                    tel2 : {
                        required : "请输入电话号码",
                        isTel : "电话号码格式错误"
                    },
                    introduce2 : {
                        required : "请输入自我介绍",
                        rangelength : "长度在10到100个字符"
                    }
                },
                debug : true,
                errorPlacement : function (error, element) {},
                invalidHandler : function (error, validator) {
                    for (var i in validator.errorList) {
                        _msgBox.tips(validator.errorList[i].message, 1, function () {
                            $(validator.errorList[i].element).focus();
                        });
                        return false;
                    }
                }
            })
        },

        submit : function(){
            $('#signupForm').submit();
        },
        submit2 : function(){
            $('#signupForm2').submit();
        }
    }
}();