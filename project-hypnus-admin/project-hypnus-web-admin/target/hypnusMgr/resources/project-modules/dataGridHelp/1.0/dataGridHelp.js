/**
 * Created by Zhang zhongtao on 2016/5/17.
 */
define('{projectModuleBase}/dataGridHelp/1.0/dataGridHelp', ['$'], function (require, exports, module) {
        'use strict';
        var $window = $(window),
            //插件名称
            pluginName = 'dataGridHelp',
            // 默认插件配置属性
            defaults = {
                checkClassName: 'check',
                cacheKey: 'listData',
                /**全选复选框容器样式名*/
                allCheckClassName: 'allCheckContainer',
                /**全选控件样式*/
                allCheckboxClass: 'icheckbox_minimal-red',
                /**全选控件*/
                ctrlAllCheck: '',
                /**行参数表单中的样式名称*/
                formRowParamsClassName: 'formRowParams',
                /**单选控件*/
                ctrSingleCheckList: '',
                /**多选按钮，格式：[{btn:jquery对象,fn:回调函数}]*/
                multSelectBtns: [],
                /**单选按钮，格式：[{btn:jquery对象,fn:回调函数}]*/
                singleSelectBtns: []
            };


        function setICheckBox(ctrCheck, className) {
            ctrCheck.iCheck({
                checkboxClass: className
            });
        }

        function form2Obj($form) {
            var datas = $form.serializeArray();
            var data = {};
            $.each(datas, function (idx, v) {
                data[v.name] = v.value;
            });

            return data;
        }

        /**
         * 查找全选控件
         * @param $this
         * @returns {*}
         */
        function findAllCheck($this) {
            return $this.$element.find('input[type=checkbox][check-all=true]')
                .filter('.' + $this.options.checkClassName);
        }

        /**
         * 查找全选控件
         * @param _this
         * @returns {*}
         */
        function findSingleCheck($this) {
            return $this.$element.find('input[type=checkbox][check-all=false]')
                .filter('.' + $this.options.checkClassName);
        }

        /**
         * 复选框控件添加事件
         * @param $container
         */
        function addCheckEvent($this) {
            $this.$element.on('ifChecked ifUnchecked', function (event) {
                var $target = $(event.target);
                var ctrlSingle = $this.options.ctrSingleCheckList;
                var ctrlAll = $this.options.ctrlAllCheck;

                if ($target.attr('check-all') === 'true') {
                    var op = 'check';
                    //取消选中
                    if (event.type != 'ifChecked') {
                        op = 'uncheck';
                    }

                    if (ctrlSingle.length) {
                        ctrlSingle.iCheck(op);
                    }

                    setBtnStatus($this);

                } else if ($target.attr('check-all') === 'false') {

                    if (ctrlSingle.filter(':checked').length == ctrlSingle.length) {
                        ctrlAll.prop('checked', 'checked');
                    } else {
                        ctrlAll.removeProp('checked').removeAttr('checked');
                    }
                    ctrlAll.iCheck('update');

                    setBtnStatus($this);
                }
            });

            $this.$element.on('ifChanged', function () {

            });
        }

        /**
         * 设置按钮状态
         */
        function setBtnStatus($this) {
            var options = $this.options;
            var ctrlSingle = options.ctrSingleCheckList;
            //选中的个数
            var length = ctrlSingle.length ? ctrlSingle.filter(':checked').length : 0;

            for (var i = 0; i < options.multSelectBtns.length; i++) {
                var btn = options.multSelectBtns[i];
                if (length >= 1) {
                    btn.btn.removeClass('disabled');
                } else {
                    btn.btn.addClass('disabled');
                }
            }

            for (var j = 0; j < options.singleSelectBtns.length; j++) {
                var btnsingle = options.singleSelectBtns[j];
                if (length == 1) {
                    btnsingle.btn.removeClass('disabled');
                } else {
                    btnsingle.btn.addClass('disabled');
                }

            }

        }

        /**
         * 按钮添加事件
         * @param $this
         */
        function addBtnEvent($this) {
            var eventKey = pluginName + '_$btnClick';
            var options = $this.options;

            var newBtns = options.multSelectBtns.concat(options.singleSelectBtns);

            for (var i = 0; i < newBtns.length; i++) {
                var btnCfg = newBtns[i];

                btnCfg.btn.addClass('disabled');
                btnCfg.btn.data(eventKey, btnCfg.fn);
                btnCfg.btn.click(function (event) {

                    var $this = $(event.target);

                    if (!$this.hasClass('disabled')) {
                        var fn = $this.data(eventKey);
                        fn && fn(event);
                    }
                });
            }
        }

        function DataGridHelp(element, options) {
            this.$element = $(element);
            this.options = $.extend(true, {}, defaults, options);

            // 调用初始化方法
            this._init();
        }

        DataGridHelp.prototype = {
            constructor: DataGridHelp,

            // Console log wrapper
            _debug: function () {
                if (true !== this.options.debug) {
                    return;
                }

                if (typeof console !== 'undefined' && typeof console.log === 'function') {
                    // 自带console的浏览器
                    if ((Array.prototype.slice.call(arguments)).length === 1 && typeof Array.prototype.slice.call(arguments)[0] === 'string') {
                        console.log((Array.prototype.slice.call(arguments)).toString());
                    } else {
                        console.log(Array.prototype.slice.call(arguments));
                    }
                } else if (!Function.prototype.bind && typeof console !== 'undefined' && typeof console.log === 'object') {
                    // IE8
                    Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments));
                }
            },

            /**
             * _init
             * @param {Function} callback
             */
            _init: function (callback) {
                var options = this.options;

                //查找全选复选框控件
                options.ctrlAllCheck = findAllCheck(this);
                options.ctrSingleCheckList = findSingleCheck(this);
                setICheckBox(this.$element, options.allCheckboxClass);
                addCheckEvent(this);
                addBtnEvent(this);
            },

            /***
             * 列表重新设置数据或者tbody节点重新显示数据,注意确保此方法在tbody渲染完成之后调用
             * @param data
             */
            renderList: function (data) {
                var options = this.options;
                this.$element.data(options.cacheKey, data);
                options.ctrSingleCheckList = findSingleCheck(this);
                setICheckBox(this.$element, options.allCheckboxClass);

                for (var i = 0; i < options.multSelectBtns.length; i++) {
                    options.multSelectBtns[i].btn.addClass('disabled');
                }

                for (var j = 0; j < options.singleSelectBtns.length; j++) {
                    options.singleSelectBtns[j].btn.addClass('disabled');
                }

                options.ctrlAllCheck.iCheck('uncheck');
            },

            /**
             * 获取选中行的表单参数
             */
            getSelectedParams: function () {
                var ctrlSingle = this.options.ctrSingleCheckList;

                if (!ctrlSingle) {
                    this.options.ctrSingleCheckList = findSingleCheck(this);
                }

                var cacheData = [];
                var resultData = [];

                for (var j = 0; j < ctrlSingle.length; j++) {
                    var form = $(ctrlSingle[j].closest('tr')).find('form.' + this.options.formRowParamsClassName);
                    var $form = $(form);

                    if ($form.length) {
                        var data = form2Obj($form);
                        cacheData.push(data);
                    }
                }

                for (var i = 0; i < ctrlSingle.length; i++) {
                    var $ctrl = ctrlSingle[i];
                    if ($ctrl.checked) {
                        resultData.push(cacheData[i]);
                    }
                }

                return resultData;

            },

            /**
             * 获取选中的行数据
             */
            getSelected: function () {
                var resultData = [];

                var ctrlSingle = this.options.ctrSingleCheckList;

                if (!ctrlSingle) {
                    this.options.ctrSingleCheckList = findSingleCheck(this);
                    ctrlSingle = this.options.ctrSingleCheckList;
                }

                var cacheData = this.$element.data(this.options.cacheKey) || [];

                if (cacheData == null || cacheData.length == 0) {

                    for (var j = 0; j < ctrlSingle.length; j++) {
                        var form = $(ctrlSingle[j].closest('tr')).find('form.' + this.options.formRowParamsClassName);
                        var $form = $(form);

                        if ($form.length) {
                            var data = form2Obj($form);
                            cacheData.push(data);
                        }
                    }

                    if (cacheData == null || cacheData.length == 0) {
                        return resultData;
                    }
                }

                for (var i = 0; i < ctrlSingle.length; i++) {
                    var $ctrl = ctrlSingle[i];
                    if ($ctrl.checked) {
                        resultData.push(cacheData[i]);
                    }
                }

                return resultData;
            },

            test: function () {
                return this.$element.attr('id');
            },

            /**
             * 重设插件配置
             * @param {Object} opts
             * @param {Function} callback
             */
            option: function (opts, callback) {
                if ($.isPlainObject(opts)) {
                    this.options = $.extend(true, this.options, opts);

                    if (typeof callback === 'function') {
                        callback();
                    }

                    // 重新初始化
                    this._init();
                }
            }

            // 在这里继续添加API方法，前缀为"_"的方法名为私有方法
            // 如：publicMethod1, _privateMethod1
        };

        // 注册到jQuery的fn命名空间, 使用$(element).xxx()进行调用
        $.fn[pluginName] = function (options, param) {
            if (typeof options === 'string') { // plugin method

                var method = $.fn[pluginName].methods[options];
                if (method) {
                    return method(this, param);
                }

                var args = Array.prototype.slice.call(arguments, 1);

                this.each(function () {
                    var instance = $.data(this, pluginName);

                    if (!instance) {
                        instance._debug('instance is not initialization');
                        return;
                    }

                    if (!$.isFunction(instance[options]) || options.charAt(0) === '_') { //
                        instance._debug('no such method "' + options + '"');
                        return;
                    }

                    // apply method
                    instance[options].apply(instance, args);
                });
            } else { // new plugin
                this.each(function () {
                    if (!$.data(this, pluginName)) {
                        $.data(this, pluginName, new DataGridHelp(this, options));
                    }
                });
            }

            return this;
        };

        // methods
        $.fn[pluginName].methods = {
            /**
             * 获取选中的行数据
             * 数据来源于：
             *  1. 当renderList方法设置有数据时，返回此对应的行数据
             *  2. 行中的form表单数据
             * @param jq
             * @returns {*}
             */
            getSelected: function (jq) {
                var $jq = $.data(jq[0], pluginName);
                var selectedData = $jq.getSelected();
                return selectedData;
            },
            /***
             * 获取选中的行数据（只限于行中包含的form表单数据）
             */
            getSelectedFormData: function (jq) {
                var $jq = $.data(jq[0], pluginName);
                var params = $jq.getSelectedParams();
                return params;
            },
            /**
             * 列表渲染
             * @param data
             */
            renderList: function (jq, data) {
                var $jq = $.data(jq[0], pluginName);
                $jq.renderList(data);
            }
        };
    }
);