/**
 * JS - Input只允许数字输入
 * Created by Sebarswee on 2016/8/25.
 */
define('numeral/1.0/numeral', ['$'], function (require) {
    var $ = require('$');

    $.fn.numeral = function(min, max, type) {
        $(this).css("ime-mode", "disabled");
        this.bind("keypress", function(e) {
            var code = (e.keyCode ? e.keyCode : e.which);  //兼容火狐 IE
            if ('undefined' != typeof(document.body.style.maxHeight) && (e.keyCode == 0x8)) {   //火狐下不能使用退格键
                return;
            }
            if (type == 'int') {
                return code >= 48 && code<= 57;
            } else {
                return code >= 46 && code<= 57;
            }
        });

        this.bind("blur", function() {
            if (this.value.lastIndexOf(".") == (this.value.length - 1)) {
                this.value = this.value.substr(0, this.value.length - 1);
            } else if (isNaN(this.value)) {
                this.value = "";
            }
        });
        this.bind("paste", function() {
            var s = clipboardData.getData('text');
            if (!/\D/.test(s)) {}
            this.value = s.replace(/^0*/, '');
            return false;
        });
        this.bind("dragenter", function() {
            return false;
        });
        this.bind("keyup", function() {
            this.value = this.value.replace(/[^\d.]/g,""); //先把非数字的都替换掉，除了数字和.
            this.value = this.value.replace(/^\./g,"");//必须保证第一个为数字而不是.
            if (~~min < 1) {
                this.value = this.value.replace(/^0+/, '0');
            } else {
                this.value = this.value.replace(/^0*/, '');
            }
            this.value = this.value.replace(/\.{2,}/g,"."); //保证只有出现一个.而没有多个.
            //保证.只出现一次，而不能出现两次以上
            this.value = this.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
            if (max != null && max != undefined && max != "") {
                if (~~(this.value) >= ~~max) {
                    this.value = max;
                }
            }
        });
    };
});