/**
 * 工具类模块
 */
define('util/1.0/util', ['$'], function (require, exports, module) {

    var Util = {
        /**
         * 字符串工具类
         */
        StringUtil: {

            /**
             *对数字或字符串截取最后两位<br>
             * <pre>
             * StringUtil.StrZeroAdd(12421); = "21"
             * StringUtil.StrZeroAdd("jqwgrqw"); = "qw"
             * </pre>
             * @param s
             * @returns {string}
             * @constructor
             */
            StrZeroAdd: function (s) {
                s = "0" + s;
                return s.substr(s.length - 2);
            },
            /**
             * 如果inStr为空，则用repStr替代
             * @param inStr
             * @param repStr
             * @returns {*}
             * @constructor
             */
            NullRepl: function (inStr, repStr) {
                return (inStr != null) ? inStr : repStr;
            },
            /**
             * 如果s为空字符串或者非字符串，则用null值代替
             * @param s
             * @returns {*}
             * @constructor
             */
            BlankRepl: function (s) {
                return (typeof(s) == "string" && s != '') ? s : null;
            },
            /**
             * 如果inStr和orgStr相等，则返回inStr,否则返回repStr
             * @param inStr
             * @param orgStr
             * @param repStr
             * @returns {*}
             * @constructor
             */
            StrRepl: function (inStr, orgStr, repStr) {
                return (inStr != orgStr) ? inStr : repStr;
            },
            /**
             * 判断变量inStr是否为空值或者未定义
             * @param inStr
             * @returns {boolean}
             * @constructor
             */
            IsNull: function (inStr) {
                return (inStr == null || inStr == "" || typeof(inStr) == "undefined") ? true : false;
            },
            /**
             * 判读字符串是否为空<br>
             *
             * <pre>
             * StringUtil.isBlank(' ') = true;
             * StringUtil.isBlank('') = true;
             * StringUtil.isBlank(' A') = false;
             * StringUtil.isBlank('AAAA') = false;
             * </pre>
             *
             * @param strVal
             */
            isBlank: function (strVal) {
                return strVal == null || this.trim(strVal).length == 0;
            },
            /**
             * 判读字符串是否不为空
             *
             * <pre>
             * StringUtil.isNotBlank(' ') = false;
             * StringUtil.isNotBlank('') = false;
             * StringUtil.isNotBlank(' A') = true;
             * StringUtil.isNotBlank('AAAA') = true;
             * </pre>
             *
             * @param strVal
             */
            isNotBlank: function (strVal) {
                return !this.isBlank(strVal);
            },

            /**
             * 去掉前后空格
             *
             * <pre>
             * StringUtil.trim(' ') = '';
             * StringUtil.trim('A B ') = 'A B';
             * StringUtil.trim('A B') = 'A B';
             * StringUtil.trim(' AB ') = 'AB';
             * </pre>
             *
             * @param strVal
             */
            trim: function (strVal) {
                if (!this.checkType(strVal))
                    return strVal;
                return (strVal || '').replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g,
                    '');
            },

            /**
             * 是否字符串类型
             *
             * @param strVal
             * @returns {Boolean}
             */
            checkType: function (strVal) {
                return typeof (strVal) == 'string';
            },

            /**
             * 对字符串判空并赋值
             *
             * @param strVal
             * @returns
             */
            toString: function (strVal) {
                return this.isNotBlank(strVal) ? strVal : "";
            },

            /**
             * 字符串截取，包含中文处理
             * @param strVal 字符串
             * @param length 截取长度
             * @param hasDot 是否添加...
             * @returns {String} 截取后新字符串
             */
            subString: function (str, length, hasDot) {
                var newLength = 0;
                var newStr = '';
                var chineseRegex = /[^\x00-\xff]/g;
                var singleChar = '';
                var strLength = str.replace(chineseRegex, '**').length;
                for (var i = 0; i < strLength; i++) {
                    singleChar = str.charAt(i).toString();
                    if (singleChar.match(chineseRegex) != null) {
                        newLength += 2;
                    }
                    else {
                        newLength++;
                    }
                    if (newLength > length) {
                        break;
                    }
                    newStr += singleChar;
                }
                if (hasDot && strLength > length) {
                    newStr += '...';
                }
                return newStr;
            }

        },

        /**
         * 对象工具类
         */
        ObjectUtil: {
            /**
             * 根据对象路径，动态调用对象方法，支持 . 操作符
             * @param methodName 调用的对象方法层次
             * @param scope 当前对象作用域 默认window
             * @param 动态参数，可以任意传递
             * @return 调用的方法的返回结果
             * eg:invokeMethod('obj.add.getCode',scope,params1,params2,params3)
             */
            invokeMethod: function (methodName, scope) {
                if (!methodName) {
                    return null;
                }

                var dys = methodName.split('.');
                var fun = scope || window;

                for (var i = 0; i < dys.length; i++) {
                    fun = fun[dys[i]];

                    if (!fun) {
                        break;
                    }
                }

                if (!fun) {
                    return null;
                }

                var params = [];
                //去除前2个参数，拼装需要调用的方法参数
                for (var j = 0; j < arguments.length; j++) {
                    if (j >= 2) {
                        params.push(arguments[j]);
                    }
                }

                return fun.apply([this], params)
            },
            /**
             * 获取对象字段为数组
             *
             * @param object
             *            对象
             * @param attr
             *            字段名
             * @returns
             */
            getObjectAttributeAsArray: function (object, attr) {
                var result = null;

                if (object) {
                    result = [];
                    var value = object[attr];
                    if (value) {
                        if ($.isArray(value)) {
                            result = value;
                        } else {
                            result.push(value);
                        }
                    }
                }

                return result;
            },

            /**
             * 获取对象数组对应的映射
             *
             * @param array
             *            对象数组
             * @param keyField
             *            键字段名
             * @param valueField
             *            值字段名，空则取整个对象
             * @returns 对象映射
             */
            getObjectMapByArray: function (array, keyField, valueField) {
                var map = {};

                if (array) {
                    for (var i = 0; i < array.length; i++) {
                        var value = array[i];
                        if (valueField) {
                            value = value[valueField];
                        }
                        map[array[i][keyField]] = value;
                    }
                }

                return map;
            },

            /**
             * 转换对象中null数据为undefined<br>
             * 注：使用jTemplate时，null会在界面显示null，undefined就不会显示了
             * @param object 处理数据
             * @returns 已处理数据
             */
            convertNullToUndefined: function (data) {
                if (data && data instanceof Object) {
                    if (data instanceof Array) {
                        var size = data.length;
                        for (var i = 0; i < size; i++) {
                            this.convertNullToUndefined(data[i]);
                        }
                    }
                    else {
                        for (var attr in data) {
                            if (data[attr] === null) {
                                data[attr] = undefined;
                                continue;
                            }
                            if (data[attr] instanceof Object) {
                                this.convertNullToUndefined(data[attr]);
                                continue;
                            }
                        }
                    }
                }
            },

            /**
             * 转换对象中Method为undefined(不会删除Array的lastIndexOf和indexOf)<br>
             * 注：使用当处理方法的数据不能带有Function时使用
             * @param object 处理数据
             * @returns 已处理数据
             */
            convertMethodToUndefined: function (data) {
                if (data && data instanceof Object) {
                    if (data instanceof Array) {
                        var size = data.length;
                        for (var i = 0; i < size; i++) {
                            this.convertMethodToUndefined(data[i]);
                        }
                    }
                    else {
                        for (var attr in data) {
                            if (data[attr] === null) {
                                continue;
                            }
                            if (data[attr] instanceof Function) {
                                data[attr] = undefined;
                                continue;
                            }
                            if (data[attr] instanceof Object) {
                                this.convertMethodToUndefined(data[attr]);
                                continue;
                            }
                        }
                    }
                }
            },
            /*
             **如果对象未定义，或者为空，或者是空字符串，返回真，否则返回假
             */
            isEmpty: function (obj) {
                if (typeof(obj) == "undefined" || obj == null || (typeof(obj) != "object" && (obj + "").replace(/ /g, "") == "")) {//||obj.length==0
                    return true;
                }
                return false;
            }

        },

        /**
         * 时间工具类
         */
        DateUtil: {
            /**
             * 格式化日期格式
             * @param date Date对象
             * @param pattern 时间格式
             * @returns 指定格式的时间字符串
             */
            format: function (date, pattern) {
                var o = {
                    'M+': date.getMonth() + 1, // month
                    'd+': date.getDate(), // day
                    'h+': date.getHours(), // hour
                    'm+': date.getMinutes(), // minute
                    's+': date.getSeconds(), // second
                    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
                    'S': date.getMilliseconds() // millisecond
                };
                if (/(y+)/.test(pattern)) {
                    pattern = pattern.replace(RegExp.$1, (date.getFullYear() + '')
                        .substr(4 - RegExp.$1.length));
                }
                for (var k in o) {
                    if (new RegExp('(' + k + ')').test(pattern)) {
                        pattern = pattern.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                            : ('00' + o[k]).substr(('' + o[k]).length));
                    }
                }
                return pattern;
            },
            DateToString: function (d, useTime) {
                if (d) {
                    return d.getFullYear() + "-" +
                        Util.StringUtil.StrZeroAdd(d.getMonth() + 1) + "-" +
                        Util.StringUtil.StrZeroAdd(d.getDate()) + ((useTime) ? " " +
                        Util.StringUtil.StrZeroAdd(d.getHours()) + ":" +
                        Util.StringUtil.StrZeroAdd(d.getMinutes()) + ":" +
                        Util.StringUtil.StrZeroAdd(d.getSeconds()) : "");
                }
                else return "";
            },
            StringToDate: function (s) {
                var s = s.substring(0, 19);
                var aD = s.split(/[\/\-: ]/);
                if (aD.length < 3)return null;
                if (aD.length < 4) aD[3] = aD[4] = aD[5] = "00";
                var d = new Date(aD[0], parseInt(aD[1] - 1, 10), aD[2], aD[3], aD[4], aD[5]);
                if (null == d || isNaN(d.getTime()))return null;
                return d;
            }
        },
        /**
         * 数字工具类
         */
        Number: {
            round: function (v, e) {
                var t = 1;
                for (; e > 0; t *= 10, e--);
                for (; e < 0; t /= 10, e++);
                return Math.round(v * t) / t;
            }
        },
        /**
         * 返回表单数据为对象
         * */
        FormUtil: {
            getFormJson: function (form) {
                var o = {};
                var a = $(form).serializeArray();
                $.each(a, function () {
                    if (o[this.name] !== undefined) {
                        if (!o[this.name].push) {
                            o[this.name] = [o[this.name]];
                        }
                        o[this.name].push(this.value || '');
                    } else {
                        o[this.name] = this.value || '';
                    }
                });
                return o;
            }
        },

        /**请求工具类*/
        Request: {
            /**
             * 获取指定请求参数，中文参数需用encodeURI处理后传输
             * @param name 参数名
             * @returns 参数值
             */
            getUrlParam: function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) {
                    return unescape(decodeURI(r[2]));
                }
                return null;
            }
        }
    };
    //重写日期字符串转换，该方法导致IE11日期处理错误，暂时注释掉
    // Date.prototype.toString = function () {
    //     return Util.DateUtil.DateToString(this, true);
    // }


    // 文件工具类
    Util.FileUtil = (function () {
        // 图片文件的后缀名
        var imgExt = new Array("png", "jpg", "jpeg", "bmp", "gif");
        // word文件的后缀名
        var docExt = new Array("doc", "docx");
        // ppt文件的后缀名
        var pptExt = new Array("ppt", "pptx");
        // excel文件的后缀名
        var xlsExt = new Array("xls", "xlsx");

        return {
            /**
             * 获取文件后缀
             * @param fileName 文件名称或路径
             * @returns {string} 文件后缀
             */
            getFileExtension: function (fileName) {
                var ext = "";
                var i = fileName.lastIndexOf(".");
                if (i > -1) {
                    ext = fileName.substring(i + 1);
                }
                return ext;
            },

            /**
             * 判断文件是否图片
             * @param fileName 文件名称或路径
             * @returns 是否图片
             */
            isImageFile: function (fileName) {
                return $.inArray(this.getFileExtension(fileName), imgExt) != -1;
            }

        };
    })();

    module.exports = Util;

});