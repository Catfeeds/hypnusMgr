/**
 * 扩展jquery.passwordStrength插件，用于密码强度验证
 * 添加了回调函数，返回密码强度分数及密码强度等级
 */
define('passwordStrength/1.0.0/passwordStrength',
    ['$'], function (require, exports, module) {
        module.exports = (function($){
            $.fn.passwordStrength = function(options){
                return this.each(function(){
                    var that = this;that.opts = {};
                    that.opts = $.extend({}, $.fn.passwordStrength.defaults, options);

                    that.div = $(that.opts.targetDiv);
                    that.defaultClass = that.div.attr('class');

                    that.percents = (that.opts.classes.length) ? 100 / that.opts.classes.length : 100;
                    v = $(this).keyup(function(){
                        if( typeof el == "undefined" )
                            this.el = $(this);
                        var s = getPasswordStrength (this.value);
                        var p = this.percents;
                        var t = Math.floor( s / p );
                        if( 100 <= s ) t = this.opts.classes.length - 1;
                        this.div.removeAttr('class').addClass( this.defaultClass ).addClass( this.opts.classes[ t ]);
                        this.opts.callbackFn && this.opts.callbackFn(s, t);
                    })
                });
                //获取密码强度
                function getPasswordStrength(H){
                    var D=(H.length);
                    if(D>4){
                        D=4
                    }
                    var F=H.replace(/[0-9]/g,"");
                    var G=(H.length-F.length);
                    if(G>2){G=2}
                    var B=H.replace(/[A-Z]/g,"");
                    var I=(H.length-B.length);
                    if(I>2){I=2}
                    var S=H.replace(/[a-z]/g,"");
                    var T=(H.length-S.length);
                    if(T>2){T=2}
                    var A=H.replace(/\W/g,"");
                    var C=(H.length-A.length);
                    if(C>2){C=2}
                    var E=((D*10)-20)+(G*10)+(I*10)+(T*10)+(C*15);
                    if(E<0){E=0}
                    if(E>100){E=100}
                    return E
                }
            };
            $.fn.passwordStrength.defaults = {
                classes : Array('is10','is20','is30','is40','is50','is60','is70','is80','is90','is100'),
                targetDiv : '#passwordStrengthDiv',
                cache : {},
                callbackFn : null // 回调函数
            };
            $.passwordStrength = {};
            $.passwordStrength.getRandomPassword = function(size){
                var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                var size = size || 8;
                var i = 1;
                var ret = ""
                while ( i <= size ) {
                    $max = chars.length-1;
                    $num = Math.floor(Math.random()*$max);
                    $temp = chars.substr($num, 1);
                    ret += $temp;
                    i++;
                }
                return ret;
            };
        })(jQuery);
    }
);