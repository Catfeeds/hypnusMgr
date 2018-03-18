;(function($) {
	/**
	 * 创建select下拉框
	 */
	function createSelect(target) {
//		var state = $.data(target, 'mulSelect');
//		var opts = state.options;
		$(target).hide();
		
//		var cattSelect = $('<dd class="moreSelect">' + '</dd>').insertAfter(target);
		$('<dd class="moreSelect">' + '</dd>').insertAfter(target)
	}
	

	/**
	 * select the specified value
	 */
	function select(target, value) {
		var opts = $.data(target, 'mulSelect').options;
		var values = $(target).mulSelect('getValues');
		if ($.inArray(value + '', values) == -1) {
			if (opts.multiple) {
				values.push(value);
			} else {
				values = [ value ];
			}
			setValues(target, values);
			opts.onSelect.call(target, findRowBy(target, value));
		}
	}

	/**
	 * unselect the specified value
	 */
	function unselect(target, value) {
		var opts = $.data(target, 'mulSelect').options;
		var values = $(target).mulSelect('getValues');
		var index = $.inArray(value + '', values);
		if (index >= 0) {
			values.splice(index, 1);
			setValues(target, values);
			opts.onUnselect.call(target, findRowBy(target, value));
		}
	}
	
	/**
	 * set values
	 */
	function setValues(target, values, remainText) {
		var opts = $.data(target, 'mulSelect').options;
		
		$(target).siblings("dd.moreSelect").find("div.sel").removeClass('selected');
		
		var vv = [], ss = [];
		for ( var i = 0; i < values.length; i++) {
			var v = values[i];
			var s = v;
			var row = findRowBy(target, v);
			if (row) {
				s = row[opts.textField];
				$('#' + row.domId).addClass('selected');
			}
			vv.push(v);
			ss.push(s);
		}

		$(target).val(vv.join(opts.separator));
		
		if (!remainText) {
			$(target).attr('selText', ss.join(opts.separator));
		}
	}
	
	function getValues(target) {
//		var vv = [];
//		$(target).siblings("dd.moreSelect").find("div.sel").each(function() {
//			if ($(this).hasClass('selected')) {
//				vv.push($(this).attr('value') + '');
//			}
//		});
//		
//		return vv;
		
		var opts = $.data(target, 'mulSelect').options;
		var val = $(target).attr('value');
		return (val != '' ? val.split(opts.separator) : []);
	}
	
	function findRowBy(target, value, param, isGroup) {
		var state = $.data(target, 'mulSelect');
		var opts = state.options;
		if (isGroup) {
			return _findRow(state.groups, param, value);
		} else {
			return _findRow(state.data, (param ? param : opts.valueField), value);
		}

		function _findRow(data, key, value) {
			for ( var i = 0; i < data.length; i++) {
				var row = data[i];
				if (row[key] == value) {
					return row;
				}
			}
			return null;
		}
	}
	
	/**
	 * request remote data if the url property is setted.
	 */
	function request(target, url, param, remainText) {
		var opts = $.data(target, 'mulSelect').options;
		if (url) {
			opts.url = url;
		}
		// if (!opts.url) return;
		param = param || {};

		if (opts.onBeforeLoad.call(target, param) == false) {
			return;
		}

		opts.loader.call(target, param, function(data) {
			if (opts.showAll) {
				var a = {};
				a[opts.valueField] = '';
				a[opts.textField] = '不限'; 
				data.splice(0, 0, a);
			}
			loadData(target, data, remainText);
		}, function() {
			opts.onLoadError.apply(this, arguments);
		});
	}
	
	/**
	 * load data, the old list items will be removed.
	 */
	var itemIndex = 1;
	function loadData(target, data, remainText) {
		var state = $.data(target, 'mulSelect');
		var opts = state.options;
		state.data = opts.loadFilter.call(target, data);
		state.groups = [];
		data = state.data;

		var selected = $(target).mulSelect('getValues');
		var dd = [];
		var group = undefined;
		for ( var i = 0; i < data.length; i++) {
			var row = data[i];
			var v = row[opts.valueField] + '';
			var s = row[opts.textField];
			var g = row[opts.groupField];

			// TODO 选项分组？
			if (g) {
				if (group != g) {
					group = g;
					var grow = {
						value : g,
						domId : ('_tenhiUI_mulselect_' + itemIndex++)
					};
					state.groups.push(grow);
					dd.push('<div id="' + grow.domId + '" value="' + v + '" class="sel">');
					dd.push('<a>');
					dd.push(opts.groupFormatter ? opts.groupFormatter.call(target, g) : g);
					dd.push('</a><i></i>');
					dd.push('</div>');
				}
			} else {
				group = undefined;
			}

			var cls = 'sel';//'combobox-item' + (row.disabled ? ' combobox-item-disabled' : '') + (g ? ' combobox-gitem' : '');
			row.domId = '_tenhiUI_mulselect_' + itemIndex++;
			dd.push('<div id="' + row.domId + '" value="' + v + '" class="' + cls + '">');
			dd.push('<a>');
			dd.push(opts.formatter ? opts.formatter.call(target, row) : s);
			dd.push('</a><i></i>');
			dd.push('</div>');

			if (row['selected'] && $.inArray(v, selected) == -1) {
				selected.push(v);
			}
		}
		$(target).siblings('dd.moreSelect').html(dd.join(''));
		
		$(target).siblings('dd.moreSelect').find("div.sel").click(function() {
			var val = $(this).attr('value');
			var text = $(this).find('a').html();

			if (opts.multiple) {
				if ($(this).hasClass('selected')) {
					unselect(target, val, text);
				} else {
                    if (val == null || val == '') {
                        setValues(target, []);
                    }
					select(target, val, text);
				}
			} else {
                if (val == null || val == '') {
                    setValues(target, []);
                }
				select(target, val, text);
			}
			
		});

		if (opts.multiple) {
			setValues(target, selected, remainText);
		} else {
			setValues(target, selected.length ? [ selected[selected.length - 1] ] : [], remainText);
		}

		opts.onLoadSuccess.call(target, data);
	}
	
	$.fn.mulSelect = function(options, param){
		if (typeof options == 'string') {
			var method = $.fn.mulSelect.methods[options];
			if (method) {
				return method(this, param);
			}
		}

		options = options || {};
		return this.each(function() {
			var state = $.data(this, 'mulSelect');
			if (state) {
				$.extend(state.options, options);
				createSelect(this);
			} else {
				state = $.data(this, 'mulSelect', {
					options : $.extend({}, $.fn.mulSelect.defaults, $.fn.mulSelect.parseOptions(this), options),
					data : []
				});
				createSelect(this);
				var data = $.fn.mulSelect.parseData(this);
				if (data.length) {
					loadData(this, data);
				}
			}
			
			if (state.options.data) {
				loadData(this, state.options.data);
			}
			request(this);
		});
	};

	$.fn.mulSelect.parseOptions = function(target) {
//		return $.extend({}, $.fn.validatebox.parseOptions(target), {});
		return $.extend({}, {});
	};
	
	$.fn.mulSelect.parseData = function(target) {
		var data = [];
		var opts = $(target).mulSelect('options');
		$(target).siblings('dd.moreSelect').find('div.sel').each(function() {
			_parseItem(this);
		});
		return data;

		function _parseItem(el) {
			var t = $(el);
			var row = {};
			row[opts.valueField] = t.attr('value') != undefined ? t.attr('value') : t.find('a').html();
			row[opts.textField] = t.find('a').html();
			row['selected'] = t.is(':selected');
			row['disabled'] = t.is(':disabled');
			
			data.push(row);
		}
	};

	$.fn.mulSelect.methods = {
		options: function(jq) {
			return $.data(jq[0], "mulSelect").options;
		},
		getData : function(jq) {
			return $.data(jq[0], 'mulSelect').data;
		},
		setValues : function(jq, values) {
			return jq.each(function() {
				setValues(this, values);
			});
		},
		setValue : function(jq, value) {
			return jq.each(function() {
				setValues(this, [ value ]);
			});
		},
		getValues : function(jq) {
			return getValues(jq[0]);
		},
		reset : function(jq) {
			return jq.each(function() {
				$(this).mulSelect('setValues', []);
//				var opts = $(this).mulSelect('options');
//				if (opts.multiple) {
//					$(this).mulSelect('setValues', opts.originalValue);
//				} else {
//					$(this).mulSelect('setValue', opts.originalValue);
//				}
			});
		},
		loadData : function(jq, data) {
			return jq.each(function() {
				loadData(this, data);
			});
		},
		reload : function(jq, url) {
			return jq.each(function() {
				request(this, url);
			});
		},
		select : function(jq, value) {
			return jq.each(function() {
				select(this, value);
			});
		},
		unselect : function(jq, value) {
			return jq.each(function() {
				unselect(this, value);
			});
		}
	};
	
	$.fn.mulSelect.defaults = {
		valueField : 'value',
		textField : 'text',
		method : 'post',
		url : null,
		data : null,
		separator : ',',
		multiple : true,
		showAll : false,

		keyHandler : {},
		filter : function(q, row) {
			var opts = $(this).mulSelect('options');
			return row[opts.textField].toLowerCase().indexOf(q.toLowerCase()) == 0;
		},
		formatter : function(row) {
			var opts = $(this).mulSelect('options');
			return row[opts.textField];
		},
		loader : function(param, success, error) {
			var opts = $(this).mulSelect('options');
			if (!opts.url) {
				return false;
			}
			$.ajax({
				type : opts.method,
				url : opts.url,
				data : param,
				dataType : 'json',
				success : function(data) {
					success(data);
				},
				error : function() {
					error.apply(this, arguments);
				}
			});
		},
		loadFilter : function(data) {
			return data;
		},
		onBeforeLoad : function(param) {
		},
		onLoadSuccess : function() {
		},
		onLoadError : function() {
		},
		onSelect : function(record) {
		},
		onUnselect : function(record) {
		}
	};
})(jQuery);




/**
 * 单选下拉框
 */
;(function($) {
	/**
	 * 创建select下拉框
	 */
	function createSelect(target) {
		var state = $.data(target, 'select');
		var opts = state.options;
		$(target).hide();
		
		var id = 'catt_select_' + $(target).attr('id');
		var cattSelect;
		if (opts.size != null && opts.size == 'big') {
			var styles = '';
			if (opts.zIndex != null && opts.zIndex != '') {
				styles += ' z-index:' + opts.zIndex;
			}
			cattSelect = $('<div id="catt_' + $(target).attr('id') + '" name="catt_' + $(target).attr('id') + '" class="circlemohusearch xw_circlemohusearch" style="' + styles + '">'
					+ '<input id="' + id + '" name="' + id + '" type="text" class="searchSimpleInputb xw_searchInput" ' + (opts.editable ? "" : "readonly") + '/>'
					+ '<a class="searchSubb"></a>'
					+ '<div class="draDownToChose xw_draDownToChose">'
					+ '<div class="draDownToChoseMain">'
					+ '<ul class="draDownToChoselist">'
					+ '</ul>'
					+ '</div>'
					+ '</div>'
					+ '</div>').insertAfter(target);
			
			if (opts.width) {
				$('#' + id).width(opts.width - 25);
				$('#' + id).siblings('div.xw_draDownToChose').width(opts.width);
				$('#' + id).siblings('div.xw_draDownToChose').find('div.draDownToChoseMain').width(opts.width);
			}
			// 是否显示查询框
			if (opts.isShowQuery) {
				var id = 'catt_select_qry_' + new Date().getTime();
				var queryDiv = $('<div class="draDownToChoseSearch" style="clear:both; float:left; position:relative;margin-right:3px; margin-top:3px;">'
						+ '<input type="text" id="' + id + '" class="searchSimpleInput" style="width: 200px;" />'
						+ '<a class="searchSub"></a>'
						+ '</div>').insertBefore($(cattSelect).find('div.draDownToChoseMain'));
				if (opts.width) {
					$('#' + id).width(opts.width - 35);
				}
				$(queryDiv).find('a.searchSub').click(function() {
					var param = {};
					param[opts.queryParamName] = $(this).siblings('input.searchSimpleInput').val() || '';
					
					request(target, null, param);
				});
			}
			
			$(cattSelect).click(function() {
				$(this).find("div.xw_draDownToChose").slideDown('fast');
			});
			
			$(cattSelect).mouseleave(function() {
				$(this).find("div.xw_draDownToChose").slideUp('fast');
			});
		} else if (opts.size != null && opts.size == 'small') {
			var styles = '';
			if (opts.zIndex != null && opts.zIndex != '') {
				styles += ' z-index:' + opts.zIndex;
			}
			cattSelect = $('<div id="catt_' + $(target).attr('id') + '" name="catt_' + $(target).attr('id') + '" class="choseDiv xw_choseDiv">'
					+ '<input id="' + id + '" name="' + id + '" type="text" class="choseDivInput xw_choseDivInput" ' + (opts.editable ? "" : "readonly") + '/>'
					+ '<a class="choseDivSubA"></a>'
					+ '<div class="choseDivRefault xw_choseDivRefault">'
					+ '<div class="choseDivSeconListDiv">'
					+ '<ul class="choseDivSeconListUl">'
					+ '</ul>'
					+ '</div>'
					+ '</div>'
					+ '</div>').insertAfter(target);
			
			if (opts.width) {
				$('#' + id).width(opts.width - 25);
				$('#' + id).siblings('div.xw_choseDivRefault').width(opts.width);
				$('#' + id).siblings('div.xw_choseDivRefault').find('div.choseDivSeconListDiv').width(opts.width);
			}
			// 是否显示查询框
			if (opts.isShowQuery) {
				var id = 'catt_select_qry_' + new Date().getTime();
				var queryDiv = $('<div class="choseDivSecondSearch" style="clear:both; float:left; position:relative;margin-right:3px; margin-top:3px;">'
						+ '<input type="text" id="' + id + '" class="choseDivSecondInput" />'
						+ '<a class="choseDivSeconSubA"></a>'
						+ '</div>').insertBefore($(cattSelect).find('div.choseDivSeconListDiv'));
				if (opts.width) {
					$('#' + id).width(opts.width - 35);
				}
				$(queryDiv).find('a.choseDivSeconSubA').click(function() {
					var param = {};
					param[opts.queryParamName] = $(this).siblings('input.choseDivSecondInput').val() || '';
					
					request(target, null, param);
				});
			}
			
			$(cattSelect).click(function() {
				$(this).find("div.xw_choseDivRefault").slideDown('fast');
			});
			
			$(cattSelect).mouseleave(function() {
				$(this).find("div.xw_choseDivRefault").slideUp('fast');
			});
		} else{
			cattSelect = $('<div id="catt_' + $(target).attr('id') + '" name="catt_' + $(target).attr('id') + '" class="mohusearch" style="float: left; margin-left: 0px; margin-top: 3px;">'
					+ '<input id="' + id + '" name="' + id + '" type="text" class="searchSimpleInputb xw_searchInput" ' + (opts.editable ? "" : "readonly") + '/>'
					+ '<a class="searchSubb"></a>'
					+ '<div class="searchDoult xw_searchDoult">'
					+ '<div class="jieguo">'
					+ '<ul class="jieguolist">'
					+ '</ul>'
					+ '</div>'
					+ '</div>'
					+ '</div>').insertAfter(target);
			
			if (opts.width) {
				$('#' + id).width(opts.width - 25);
				$('#' + id).siblings('div.xw_searchDoult').width(opts.width - 5);
				$('#' + id).siblings('div.xw_searchDoult').find('div.jieguo').width(opts.width - 5);
			}
			// 是否显示查询框
			if (opts.isShowQuery) {
				var id = 'catt_select_qry_' + new Date().getTime();
				var queryDiv = $('<div class="searchSimple" style="margin-right: 3px; margin-top: 3px;">'
						+ '<input type="text" id="' + id + '" class="searchSimpleInput" style="width: 150px;" />'
						+ '<a class="searchSub"></a>'
						+ '</div>').insertBefore($(cattSelect).find('div.jieguo'));
				if (opts.width) {
					$('#' + id).width(opts.width - 40);
				}
				$(queryDiv).find('a.searchSub').click(function() {
					var param = {};
					param[opts.queryParamName] = $(this).siblings('input.searchSimpleInput').val() || '';
					
					request(target, null, param);
				});
			}
			
			$(cattSelect).click(function() {
				$(this).find("div.xw_searchDoult").slideDown('fast');
			});
			
			$(cattSelect).mouseleave(function() {
				$(this).find("div.xw_searchDoult").slideUp('fast');
			});
		}
	}
	

	/**
	 * select the specified value
	 */
	function select(target, value) {
		var opts = $.data(target, 'select').options;
		var values = $(target).select('getValues');
		if ($.inArray(value + '', values) == -1) {
			if (opts.multiple) {
				values.push(value);
			} else {
				values = [ value ];
			}
			setValues(target, values);
			opts.onSelect.call(target, findRowBy(target, value));
		}
	}

	/**
	 * unselect the specified value
	 */
	function unselect(target, value) {
		var opts = $.data(target, 'select').options;
		var values = $(target).select('getValues');
		var index = $.inArray(value + '', values);
		if (index >= 0) {
			values.splice(index, 1);
			setValues(target, values);
			opts.onUnselect.call(target, findRowBy(target, value));
		}
	}
	
	/**
	 * set values
	 */
	function setValues(target, values, remainText) {
		var opts = $.data(target, 'select').options;
		
		if (opts.size != null && opts.size == 'big') {
			$(target).siblings("div.xw_circlemohusearch").find("ul.draDownToChoselist li").removeClass('selected');
			$(target).siblings("div.xw_circlemohusearch").find(".xw_searchInput").val('');
		} else if (opts.size != null && opts.size == 'small') {
			$(target).siblings("div.choseDiv").find("ul.choseDivSeconListUl li").removeClass('selected');
			$(target).siblings("div.choseDiv").find(".choseDivInput").val('');
		} else {
			$(target).siblings("div.mohusearch").find("ul.jieguolist li").removeClass('selected');
			$(target).siblings("div.mohusearch").find(".xw_searchInput").val('');
		}
		
		var vv = [], ss = [];
		for ( var i = 0; i < values.length; i++) {
			var v = values[i];
//			var s = v;
			var s = null;
			var row = findRowBy(target, v);
			if (row) {
				s = row[opts.textField];
				$('#' + row.domId).addClass('selected');
			}
			vv.push(v);
			if (s != null) {
				ss.push(s);
			}
		}

		$(target).val(vv.join(opts.separator));
		
		if (!remainText && ss.length > 0) {
			if (opts.size != null && opts.size == 'big') {
				$(target).siblings("div.xw_circlemohusearch").find(".xw_searchInput").val(ss.join(opts.separator));
			} else if (opts.size != null && opts.size == 'small') {
				$(target).siblings("div.choseDiv").find(".choseDivInput").val(ss.join(opts.separator));
			} else {
				$(target).siblings("div.mohusearch").find(".xw_searchInput").val(ss.join(opts.separator));
			}
		}
	}
	
	function getValues(target) {
//		var vv = [];
//		$(target).siblings("div.mohusearch").find('ul.jieguolist li').each(function() {
//			if ($(this).hasClass('selected')) {
//				vv.push($(this).attr('value') + '');
//			}
//		});
//		return vv;
		
		var opts = $.data(target, 'select').options;
		var val = $(target).attr('value');
		return (val != '' ? val.split(opts.separator) : []);
	}
	
	function findRowBy(target, value, param, isGroup) {
		var state = $.data(target, 'select');
		var opts = state.options;
		if (isGroup) {
			return _findRow(state.groups, param, value);
		} else {
			return _findRow(state.data, (param ? param : opts.valueField), value);
		}

		function _findRow(data, key, value) {
			for ( var i = 0; i < data.length; i++) {
				var row = data[i];
				if (row[key] == value) {
					return row;
				}
			}
			return null;
		}
	}
	
	/**
	 * request remote data if the url property is setted.
	 */
	function request(target, url, param, remainText) {
		var opts = $.data(target, 'select').options;
		if (url) {
			opts.url = url;
		}
		// if (!opts.url) return;
		param = param || {};

		if (opts.onBeforeLoad.call(target, param) == false) {
			return;
		}

		opts.loader.call(target, param, function(data) {
			loadData(target, data, remainText);
		}, function() {
			opts.onLoadError.apply(this, arguments);
		});
	}
	
	/**
	 * load data, the old list items will be removed.
	 */
	var itemIndex = 1;
	function loadData(target, data, remainText) {
		var state = $.data(target, 'select');
		var opts = state.options;
		state.data = opts.loadFilter.call(target, data);
		state.groups = [];
		data = state.data;

		var selected = $(target).select('getValues');
		var dd = [];
		var group = undefined;
		for ( var i = 0; i < data.length; i++) {
			var row = data[i];
			var v = row[opts.valueField] + '';
			var s = row[opts.textField];
			var g = row[opts.groupField];

			// TODO 选项分组？
			if (g) {
				if (group != g) {
					group = g;
					var grow = {
						value : g,
						domId : ('_tenhiUI_select_' + itemIndex++)
					};
					state.groups.push(grow);
					dd.push('<li id="' + grow.domId + '" value="' + v + '" class="combobox-group">');
					dd.push(opts.groupFormatter ? opts.groupFormatter.call(target, g) : g);
					dd.push('</li>');
				}
			} else {
				group = undefined;
			}

			var cls = '';//'combobox-item' + (row.disabled ? ' combobox-item-disabled' : '') + (g ? ' combobox-gitem' : '');
			row.domId = '_tenhiUI_select_' + itemIndex++;
			dd.push('<li id="' + row.domId + '" value="' + v + '" class="' + cls + '">');
			dd.push(opts.formatter ? opts.formatter.call(target, row) : s);
			dd.push('</li>');

			if (row['selected'] && $.inArray(v, selected) == -1) {
				selected.push(v);
			}
		}
		if (opts.size != null && opts.size == 'big') {
			$(target).siblings('div.xw_circlemohusearch').find('ul.draDownToChoselist').html(dd.join(''));
			
			$(target).siblings('div.xw_circlemohusearch').find("ul.draDownToChoselist li").click(function(event) {
				var val = $(this).attr('value');
				var text = $(this).text();

				if (opts.multiple) {
					if ($(this).hasClass('selected')) {
						unselect(target, val, text);
					} else {
						select(target, val, text);
					}
				} else {
					select(target, val, text);
					event.stopPropagation();	// 阻止事件冒泡
					$(this).closest("div.xw_draDownToChose").slideUp('fast');
				}
				
			});
		} else if (opts.size != null && opts.size == 'small') {
			$(target).siblings('div.choseDiv').find('ul.choseDivSeconListUl').html(dd.join(''));
			
			$(target).siblings('div.choseDiv').find("ul.choseDivSeconListUl li").click(function(event) {
				var val = $(this).attr('value');
				var text = $(this).text();

				if (opts.multiple) {
					if ($(this).hasClass('selected')) {
						unselect(target, val, text);
					} else {
						select(target, val, text);
					}
				} else {
					select(target, val, text);
					event.stopPropagation();	// 阻止事件冒泡
					$(this).closest("div.xw_choseDivRefault").slideUp('fast');
				}
				
			});
		} else {
			$(target).siblings('div.mohusearch').find('ul.jieguolist').html(dd.join(''));
			
			$(target).siblings('div.mohusearch').find("ul.jieguolist li").click(function(event) {
				var val = $(this).attr('value');
				var text = $(this).text();

				if (opts.multiple) {
					if ($(this).hasClass('selected')) {
						unselect(target, val, text);
					} else {
						select(target, val, text);
					}
				} else {
					select(target, val, text);
					event.stopPropagation();	// 阻止事件冒泡
					$(this).closest("div.xw_searchDoult").slideUp('fast');
				}
				
			});
		}

		if (opts.multiple) {
			setValues(target, selected, remainText);
		} else {
			setValues(target, selected.length ? [ selected[selected.length - 1] ] : [], remainText);
		}

		opts.onLoadSuccess.call(target, data);
	}
	
	$.fn.select = function(options, param){
		if (typeof options == 'string') {
			var method = $.fn.select.methods[options];
			if (method) {
				return method(this, param);
			}
		}

		options = options || {};
		return this.each(function() {
			var state = $.data(this, 'select');
			if (state) {
				$.extend(state.options, options);
				createSelect(this);
			} else {
				state = $.data(this, 'select', {
					options : $.extend({}, $.fn.select.defaults, $.fn.select.parseOptions(this), options),
					data : []
				});
				createSelect(this);
				var data = $.fn.select.parseData(this);
				if (data.length) {
					loadData(this, data);
				}
			}
			
			if (state.options.data) {
				loadData(this, state.options.data);
			}
			request(this);
		});
	};

	$.fn.select.parseOptions = function(target) {
		// $.fn.validatebox.parseOptions(target),
		return $.extend({}, {});
	};
	
	$.fn.select.parseData = function(target) {
		var data = [];
		var opts = $(target).select('options');
		if (opts.size != null && opts.size == 'big') {
			$(target).siblings('div.xw_circlemohusearch').find('ul.draDownToChoselist li').each(function() {
				_parseItem(this);
			});
		} else if (opts.size != null && opts.size == 'small') {
			$(target).siblings('div.choseDiv').find('ul.choseDivSeconListUl li').each(function() {
				_parseItem(this);
			});
		} else {
			$(target).siblings('div.mohusearch').find('ul.jieguolist li').each(function() {
				_parseItem(this);
			});
		}
		
		return data;

		function _parseItem(el) {
			var t = $(el);
			var row = {};
			row[opts.valueField] = t.attr('value') != undefined ? t.attr('value') : t.html();
			row[opts.textField] = t.html();
			row['selected'] = t.is(':selected');
			row['disabled'] = t.is(':disabled');
			
			data.push(row);
		}
	};

	$.fn.select.methods = {
		options: function(jq) {
			return $.data(jq[0], "select").options;
		},
		getData : function(jq) {
			return $.data(jq[0], 'select').data;
		},
		setValues : function(jq, values) {
			return jq.each(function() {
				setValues(this, values);
			});
		},
		setValue : function(jq, value) {
			return jq.each(function() {
				setValues(this, [ value ]);
			});
		},
		getValues : function(jq) {
			return getValues(jq[0]);
		},
		reset : function(jq) {
			return jq.each(function() {
				$(this).select('setValues', []);
//				var opts = $(this).select('options');
//				if (opts.multiple) {
//					$(this).select('setValues', opts.originalValue);
//				} else {
//					$(this).select('setValue', opts.originalValue);
//				}
			});
		},
		loadData : function(jq, data) {
			return jq.each(function() {
				loadData(this, data);
			});
		},
		reload : function(jq, url) {
			return jq.each(function() {
				request(this, url);
			});
		},
		select : function(jq, value) {
			return jq.each(function() {
				select(this, value);
			});
		},
		unselect : function(jq, value) {
			return jq.each(function() {
				unselect(this, value);
			});
		}
	};
	
	$.fn.select.defaults = {
		valueField : 'value',
		textField : 'text',
		method : 'post',
		url : null,
		data : null,
		separator : ',',
		isShowQuery : false,
		editable : false,
		width : null,

		keyHandler : {},
		filter : function(q, row) {
			var opts = $(this).select('options');
			return row[opts.textField].toLowerCase().indexOf(q.toLowerCase()) == 0;
		},
		formatter : function(row) {
			var opts = $(this).select('options');
			return row[opts.textField];
		},
		loader : function(param, success, error) {
			var opts = $(this).select('options');
			if (!opts.url) {
				return false;
			}
			$.ajax({
				type : opts.method,
				url : opts.url,
				data : param,
				dataType : 'json',
				success : function(data) {
					success(data);
				},
				error : function() {
					error.apply(this, arguments);
				}
			});
		},
		loadFilter : function(data) {
			return data;
		},
		onBeforeLoad : function(param) {
		},
		onLoadSuccess : function() {
		},
		onLoadError : function() {
		},
		onSelect : function(record) {
		},
		onUnselect : function(record) {
		}
	};
})(jQuery);


/**
 * pagination - catt UI
 * @author wengsiwei
 * Copyright (c) 2014 All rights reserved.
 * Dependencies: jquery
 */
;(function($) {
	function createPagination(target) {
//		var opts = $.data(target, "pagination").options;
		var _target = $(target).addClass("pageBar").empty().show();
		$('<div class="snPages"></div>').appendTo(_target);
		
		// 插入分页链接
		drawLinks(target);
	}
	
	
	/**
	 * 根据显示的链接数，计算中间可点击链接的起止点
	 */
	function getInterval(target)  {
		var opts = $.data(target, "pagination").options;
		var neHalf = Math.ceil(opts.entriesNum / 2);
		var totalPage = Math.ceil(opts.total / opts.pageSize);
		var upperLimit = totalPage - opts.entriesNum;
		var start = opts.pageNumber > neHalf ? Math.max(Math.min(opts.pageNumber - neHalf, upperLimit), 0) : 0;
		var end = opts.pageNumber > neHalf ? Math.min(opts.pageNumber + neHalf, totalPage) : Math.min(opts.entriesNum, totalPage);
		return [start, end];
	}
	
	/**
	 * 分页操作
	 */
	function pageSelected(target, pageNumber) {
		var opts = $.data(target, "pagination").options;
		var totalPage = Math.ceil(opts.total / opts.pageSize) || 1;
		var pageNum = pageNumber;
		if (pageNumber < 1) {
			pageNum = 1;
		}
		if (pageNumber > totalPage) {
			pageNum = totalPage;
		}
		opts.pageNumber = pageNum;
		// 重新渲染分页链接
		drawLinks(target);
		opts.onSelectPage.call(target, pageNum, opts.pageSize);
		//setPageInfo(target);
	}
	
	/**
	 * 将分页链接插入到容器中
	 */
	function drawLinks(target) {
		var opts = $.data(target, "pagination").options;
		var _target = $(target).find('div.snPages').empty();
		var interval = getInterval(target);
		var totalPage = Math.ceil(opts.total / opts.pageSize) || 1;
		
		var appendItem = function(pageNum, appendopts) {
			pageNum = pageNum < 0 ? 0 : (pageNum < totalPage ?  pageNum : totalPage - 1);
			appendopts = jQuery.extend({text : pageNum + 1, classes : ""}, appendopts || {});
			var lnk;
			if ((pageNum + 1) == opts.pageNumber) {
				lnk = $('<a href="javascript:void(0);" class="current" style="color: rgb(255, 102, 0);">' + (appendopts.text) + '</a>');
			} else {
				lnk = $('<a href="javascript:void(0);">' + (appendopts.text) + '</a>').bind('click', function() {
					pageSelected(target, (pageNum + 1));
				});
			}
			if (appendopts.classes) {
				lnk.addClass(appendopts.classes);
			}
			_target.append(lnk);
		};
		
		// 上一页
		if (opts.showPrev) {
			var style = "";
			if (opts.pageNumber > 1) {
				style = "border-color: #fff #000000 #fff #fff;";
			}
			var prev = $('<span class="prev" title="上一页"><b style="' + style + '"></b></span>').bind('click', function() {
				if (opts.pageNumber > 1) {
					pageSelected(target, opts.pageNumber - 1);
				}
			});
			_target.append(prev);
		}
		
		// 首页
		if (interval[0] > 0 && opts.edgeEntriesNum > 0) {
			var end = Math.min(opts.edgeEntriesNum, interval[0]);
			for (var i = 0; i < end; i++) {
				appendItem(i);
			}
			if (opts.edgeEntriesNum < interval[0] && opts.ellipseText) {
				$('<span>' + opts.ellipseText + '</span>').appendTo(_target);
			}
		}
		
		// 中间可点击链接
		for (var i = interval[0]; i < interval[1]; i++) {
			appendItem(i);
		}
		
		// 末页
		if (interval[1] < totalPage && opts.edgeEntriesNum > 0) {
			if (totalPage - opts.edgeEntriesNum > interval[1] && opts.ellipseText) {
				$('<span>' + opts.ellipseText + '</span>').appendTo(_target);
			}
			
			var begin = Math.max(totalPage - opts.edgeEntriesNum, interval[1]);
			for (var i = begin; i < totalPage; i++) {
				appendItem(i);
			}
		}
		
		// 下一页
		if (opts.showNext) {
			var style = "";
			if (opts.pageNumber >= totalPage) {
				style = "border-color: #fff #fff #fff #b1b1b1;";
			}
			var next = $('<a class="next" href="javascript:void(0);" title="下一页"><b style="' + style + '"></b></a>').bind('click', function() {
				var totalPage = Math.ceil(opts.total / opts.pageSize);
				if (opts.pageNumber < totalPage) {
					pageSelected(target, opts.pageNumber + 1);
				}
			});
			_target.append(next);
		}
		
		// 是否显示跳转输入框
		if (opts.showNumInput) {
			$('<div>跳转至<input type="text" />页<input type="button" class="pagesubmit" value="确定" /></div>').appendTo(_target);
			
			_target.find('input[type=text]').bind('keydown', function(e) {
				if (e.keyCode == 13) {
					var pageNum = parseInt($(this).val()) || 1;
					pageSelected(target, pageNum);
					return false;
				}
			});
			_target.find('input[type=button]').bind('click', function() {
				var pageNum = parseInt($(this).siblings('input[type=text]').val()) || 1;
				pageSelected(target, pageNum);
				return false;
			});
		}
	}
	
	/**
	 * 设置分页信息
	 */
	function setPageInfo(target) {
		// TODO 待扩展，显示当前分页信息
		var opts = $.data(target, "pagination").options;
		var totalPage = Math.ceil(opts.total / opts.pageSize) || 1;
		var num = $(target).find("input.pagination-num");
		num.val(opts.pageNumber);
		num.parent().next().find("span").html(opts.afterPageText.replace(/{pages}/, totalPage));
		var disMsg = opts.displayMsg;
		disMsg = disMsg.replace(/{from}/, opts.pageSize * (opts.pageNumber - 1) + 1);
		disMsg = disMsg.replace(/{to}/, Math.min(opts.pageSize * (opts.pageNumber), opts.total));
		disMsg = disMsg.replace(/{total}/, opts.total);
		$(target).find(".pagination-info").html(disMsg);
//		$("a[icon=pagination-first],a[icon=pagination-prev]", target).linkbutton({
//			disabled : (opts.pageNumber == 1)
//		});
//		$("a[icon=pagination-next],a[icon=pagination-last]", target).linkbutton({
//			disabled : (opts.pageNumber == totalPage)
//		});
		if (opts.loading) {
			$(target).find("a[icon=pagination-load]").find(".pagination-load").addClass("pagination-loading");
		} else {
			$(target).find("a[icon=pagination-load]").find(".pagination-load").removeClass("pagination-loading");
		}
	}
	
	$.fn.pageBar = function(options, param) {
		if (typeof options == "string") {
			return $.fn.pageBar.methods[options](this, param);
		}
		options = options || {};
		return this.each(function() {
			var opts;
			var state = $.data(this, "pagination");
			if (state) {
				opts = $.extend(state.options, options);
			} else {
				opts = $.extend({}, $.fn.pageBar.defaults, options);
				$.data(this, "pagination", {
					options : opts
				});
			}
			createPagination(this);
			setPageInfo(this);
		});
	};
	
	// methods
	$.fn.pageBar.methods = {
		options : function(jq) {
			return $.data(jq[0], "pagination").options;
		}
	};
	$.fn.pageBar.defaults = {
		total : 1,
		entriesNum : 4,		// 可点击超链接数量，不包括首尾
		edgeEntriesNum : 1,	// 首尾可点击超链接数
		ellipseText : '...',
		showNumInput : true,// 是否显示跳转输入框
		showPrev : true,
		showNext : true,
		pageSize : 10,
		pageNumber : 1,
		pageList : [ 10, 20, 30, 50 ],
		loading : false,
		buttons : null,
		showPageList : false,
		showRefresh : false,
		onSelectPage : function(pageNumber, pageSize) {
		},
		onBeforeRefresh : function(pageNumber, pageSize) {
		},
		onRefresh : function(pageNumber, pageSize) {
		},
		onChangePageSize : function(pageSize) {
		},
		beforePageText : "第 ",
		afterPageText : " 页，共 {pages} 页",
		displayMsg : "显示第 {from} - {to} 条记录，共 {total}条记录"
	};
})(jQuery);


/**
 * cart - catt UI
 * 购物车
 * @author wengsiwei
 * Copyright (c) 2014 All rights reserved.
 * Dependencies: jquery
 */
;(function($) {
	function createCart(target) {
		var opts = $.data(target, "cart").options;
		var cartName = opts.cartName;
		var editUrl = opts.editUrl;
		var editName = opts.editName;
		
		if (editName == null || editName == '') {
			editName = '编辑数量';
		}
		
		var _target = $(target).addClass("cartMain").empty().show();
		$('<a class="cartMaina">' + cartName + '车<font>0</font></a>'
				+ '<div class="cartList">'
				+ '<div class="cartListMain">'
//				+ '<table class="shoppingCart"></table>'
				+ '</div>'
				+ '<div class="cartListFoot">'
				+ '<span class="totalText">共<font>0</font>件' + cartName + '</span>'
				+ '<a class="cartBottom" href="' + editUrl + '">'+editName+'</a>'
				+ '</div>'
				+ '</div>').appendTo(_target);
		
		request(target);
	}
	
	/**
	 * 请求数据
	 */
	function request(target, param) {
		var opts = $.data(target, "cart").options;
		if (param) {
			opts.queryParams = param;
		}
		if (!opts.url) {
			return;
		}
		var data = $.extend({}, opts.queryParams);
		setTimeout(function() {
			doRequest();
		}, 0);
		function doRequest() {
			$.ajax({
				type : opts.method,
				url : opts.url,
				data : data,
				dataType : "json",
				success : function(data) {
					loadData(target, data);
				}
			});
		};
	};
	
	/**
	 * 加载数据
	 */
	function loadData(target, data) {
		var opts = $.data(target, "cart").options;
		$.data(target, "cart").data = data;
		
		var dataRows = [];
		if (data != null && data.cartItems != null) {
			dataRows = data.cartItems;
		}
		
		$(target).find('a.cartMaina > font').html(dataRows.length);
		$(target).find('div.cartListFoot span.totalText > font').html(data.quantity);
		
		var table = ["<table class=\"shoppingCart\"><tbody>"];
		for (var i = 0, l = dataRows.length; i < l; i++) {
			table.push("<tr cart-row-index=\"" + i + "\">");
			table.push(renderRow(target, dataRows[i]));
			table.push("</tr>");
		}
		table.push("</tbody></table>");
		$(target).find("div.cartListMain").html(table.join(""));
		
		bindEvents(target);
	}
	
	/**
	 * 拼接数据行
	 */
	function renderRow(target, rowData) {
		var opts = $.data(target, "cart").options;
		var nameField = opts.nameField;
		var quantityField = opts.quantityField;
		var cc = [];
		cc.push("<td field=\"" + nameField + "\">");
		cc.push(rowData[nameField]);
		cc.push("</td>");
		cc.push("<td field=\"" + quantityField + "\">");
		cc.push(rowData[quantityField]);
		cc.push("<font>(件)</font>");
		cc.push("</td>");
		cc.push("<td class=\"delbt\"><a class=\"shoppingcart_del\"></a></td>");
		return cc.join("");
	}
	
	/**
	 * 绑定事件
	 */
	function bindEvents(target)  {
		var opts = $.data(target, "cart").options;
		var data = $.data(target, "cart").data;
		var dataRows = data.cartItems;
		
		$(target).find("table.shoppingCart tr td > a.shoppingcart_del").unbind('click').bind('click', function() {
			var index = $(this).closest('tr').attr('cart-row-index');
			var dataRow = dataRows[index];
			var data = $.extend({ids : dataRow.id}, opts.queryParams);
			$.ajax({
				type : opts.method,
				url : opts.delUrl,
				data : data,
				dataType : "json",
				success : function(data) {
					$(target).cart("reload");
				}
			});
		});
	}
	
	$.fn.cart = function(options, param) {
		if (typeof options == "string") {
			return $.fn.cart.methods[options](this, param);
		}
		options = options || {};
		return this.each(function() {
			var opts;
			var state = $.data(this, "cart");
			if (state) {
				opts = $.extend(state.options, options);
			} else {
				opts = $.extend({}, $.fn.cart.defaults, options);
				$.data(this, "cart", {
					options : opts
				});
			}
			createCart(this);
		});
	};
	
	$.fn.cart.methods = {
		options : function(jq) {
			return $.data(jq[0], "cart").options;
		},
		loadData : function(jq, data) {
			return jq.each(function() {
				loadData(this, data);
			});
		},
		reload : function(jq, param) {
			return jq.each(function() {
				request(this, param);
			});
		},
		addItem : function(jq) {
			
		},
		removeItem : function(jq) {
			
		},
		clearCart : function(jq) {
			
		}
	};
	$.fn.cart.defaults = {
		method : 'post',
		url : '',
		delUrl : '',
		editUrl : 'javascript:void(0);',	// 编辑数量跳转的完整链接地址
		cartName : '购物',					// 购物车名称（不要“车”字）
		nameField : 'name',
		quantityField : 'quantity',
		onAddItem : function() {
		},
		onRemoveItem : function() {
		},
		onClear : function() {
		}
	};
})(jQuery);




/**
 * comboZTree - catt UI
 * 下拉树
 * @author wengsiwei
 * Copyright (c) 2014 All rights reserved.
 * Dependencies: jquery ztree
 */
;(function($) {
	/**
	 * 创建select下拉框
	 */
	function createSelect(target) {
		var state = $.data(target, 'comboZTree');
		var opts = state.options;
		$(target).hide();
		
		var id = 'catt_comboztree_' + $(target).attr('id');
		$('div#catt_' + $(target).attr('id')).remove();
		var cattSelect;
		
		cattSelect = $('<div id="catt_' + $(target).attr('id') + '" name="catt_' + $(target).attr('id') + '" class="kfSearch xw_kfSearch">'
				+ '<input id="' + id + '" name="' + id + '" type="text" class="kfSearchInput" readonly="' + (opts.editable ? "readonly" : "false") + '"/>'
				+ '<a class="kfSearchSubb"></a>'
				+ '<div class="kf_searchDra xw_kf_searchDra">'
				+ '<ul class="ztree"></ul>'
				+ '</div>'
				+ '</div>').insertAfter(target);
		
		// 是否显示查询框
		if (opts.isShowQuery) {
			var id = 'catt_comboztree_qry_' + new Date().getTime();
			var queryDiv = $('<div class="kf_searchDraInp">'
					+ '<input type="text" id="' + id + '" />'
					+ '<a></a>'
					+ '</div>').insertBefore($(cattSelect).find('ul.ztree'));
			$(queryDiv).find('a').click(function() {
				var param = {};
				param[opts.queryParamName] = $(this).siblings('input').val() || '';
				
				// 不保留已选
				setValues(target, []);
				request(target, null, param, true);
			});
		}
		
		// init ztree
		var setting = {
			view : {
				selectedMulti : opts.multiple || false
			},
			key : {
				name : opts.textField || 'name'
			},
			data : {
				simpleData : {
					enable : true,
					idKey : opts.valueField || "id",
					pIdKey : opts.parentField || "pId",
					rootPId : 0
				}
			},
			callback : {
				onClick : function(event, treeId, treeNode) {
					select(target, treeNode[opts.valueField]);
				}
			}
		};
		
		var $ul = cattSelect.find('ul.ztree');
		var $tree = $.fn.zTree.init($ul, setting, []);
		
		state.ztree = $tree;
		
		$(cattSelect).click(function() {
			$(this).find("div.xw_kf_searchDra").slideDown('fast');
		});
		
		$(cattSelect).mouseleave(function() {
			$(this).find("div.xw_kf_searchDra").slideUp('fast');
		});
	}

	/**
	 * select the specified value
	 */
	function select(target, value) {
		var opts = $.data(target, 'comboZTree').options;
		var values = $(target).comboZTree('getValues');
		if ($.inArray(value + '', values) == -1) {
			if (opts.multiple) {
				values.push(value);
			} else {
				values = [ value ];
			}
			setValues(target, values);
			opts.onSelect.call(target, findRowBy(target, value));
		} else {
			unselect(target, value);
		}
	}

	/**
	 * unselect the specified value
	 */
	function unselect(target, value) {
		var opts = $.data(target, 'comboZTree').options;
		var values = $(target).comboZTree('getValues');
		var index = $.inArray(value + '', values);
		if (index >= 0) {
			values.splice(index, 1);
			setValues(target, values);
			opts.onUnselect.call(target, findRowBy(target, value));
		}
	}
	
	/**
	 * set values
	 */
	function setValues(target, values, remainText) {
		var opts = $.data(target, 'comboZTree').options;
		var ztree = $.data(target, "comboZTree").ztree;
		// 取消节点选中
		ztree.cancelSelectedNode();
		
		var vv = [], ss = [];
		for (var i = 0; i < values.length; i++) {
			var v = values[i];
//			var s = v;
			var s = null;
			var row = findRowBy(target, v);
			if (row) {
				s = row[opts.textField];
				// 追加方式选中节点
				ztree.selectNode(row, true);
			}
			vv.push(v);
			if (s != null) {
				ss.push(s);
			}
		}

		$(target).val(vv);
		
		if (!remainText && ss.length > 0) {
			$(target).siblings("div.xw_kfSearch").find(".kfSearchInput").val(ss.join(opts.separator));
		} else if (!remainText) {
			// 清空文本框
			$(target).siblings("div.xw_kfSearch").find(".kfSearchInput").val('');
		}
	}
	
	function getValues(target) {
		var opts = $.data(target, 'comboZTree').options;
		var val = $(target).attr('value');
		return (val != '' ? val.split(opts.separator) : []);
	}
	
	function findRowBy(target, value, param, isGroup) {
		var state = $.data(target, 'comboZTree');
		var opts = state.options;
		var ztree = state.ztree;
		
		var node = ztree.getNodesByParam((param ? param : opts.valueField), value);
		return ((node && node.length > 0) ? node[0] : null);
	}
	
	/**
	 * request remote data if the url property is setted.
	 */
	function request(target, url, param, remainText) {
		var opts = $.data(target, 'comboZTree').options;
		if (url) {
			opts.url = url;
		}
		// if (!opts.url) return;
		param = param || {};

		if (opts.onBeforeLoad.call(target, param) == false) {
			return;
		}

		opts.loader.call(target, param, function(data) {
			loadData(target, data, remainText);
		}, function() {
			opts.onLoadError.apply(this, arguments);
		});
	}
	
	/**
	 * load data, the old list items will be removed.
	 */
	var itemIndex = 1;
	function loadData(target, data, remainText) {
		var state = $.data(target, 'comboZTree');
		var ztree = state.ztree;
		var opts = state.options;
		state.data = opts.loadFilter.call(target, data);
		data = state.data;

		var selected = $(target).comboZTree('getValues');
		var dd = [];
		for (var i = 0; i < data.length; i++) {
			var row = data[i];
			var v = row[opts.valueField] + '';
			var s = row[opts.textField];

			var cls = '';
			row.domId = '_tenhiUI_select_' + itemIndex++;
			dd.push('<li id="' + row.domId + '" value="' + v + '" class="' + cls + '">');
			dd.push(opts.formatter ? opts.formatter.call(target, row) : s);
			dd.push('</li>');

			if (row['selected'] && $.inArray(v, selected) == -1) {
				selected.push(v);
			}
		}
		
		var $ul = $(target).siblings('div.xw_kfSearch').find('ul.ztree');
		var $tree = $.fn.zTree.init($ul, ztree.setting, data);
		state.ztree = $tree;

		if (opts.multiple) {
			setValues(target, selected, remainText);
		} else {
			setValues(target, selected.length ? [ selected[selected.length - 1] ] : [], remainText);
		}

		opts.onLoadSuccess.call(target, data);
	}
	
	$.fn.comboZTree = function(options, param){
		if (typeof options == 'string') {
			var method = $.fn.comboZTree.methods[options];
			if (method) {
				return method(this, param);
			}
		}

		options = options || {};
		return this.each(function() {
			var state = $.data(this, 'comboZTree');
			if (state) {
				$.extend(state.options, options);
				createSelect(this);
			} else {
				state = $.data(this, 'comboZTree', {
					options : $.extend({}, $.fn.comboZTree.defaults, $.fn.comboZTree.parseOptions(this), options),
					data : []
				});
				createSelect(this);
				var data = $.fn.comboZTree.parseData(this);
				if (data.length) {
					loadData(this, data);
				}
			}
			
			if (state.options.data) {
				loadData(this, state.options.data);
			}
			request(this);
		});
	};

	$.fn.comboZTree.parseOptions = function(target) {
		return $.extend({}, {});
	};
	
	$.fn.comboZTree.parseData = function(target) {
		var data = [];
//		var opts = $(target).comboZTree('options');
//		$(target).siblings('div.mohusearch').find('ul.jieguolist li').each(function() {
//			_parseItem(this);
//		});
		
		return data;

//		function _parseItem(el) {
//			var t = $(el);
//			var row = {};
//			row[opts.valueField] = t.attr('value') != undefined ? t.attr('value') : t.html();
//			row[opts.textField] = t.html();
//			row['selected'] = t.is(':selected');
//			row['disabled'] = t.is(':disabled');
//			
//			data.push(row);
//		}
	};

	$.fn.comboZTree.methods = {
		options: function(jq) {
			return $.data(jq[0], "comboZTree").options;
		},
		getData : function(jq) {
			return $.data(jq[0], 'comboZTree').data;
		},
		setValues : function(jq, values) {
			return jq.each(function() {
				setValues(this, values);
			});
		},
		setValue : function(jq, value) {
			return jq.each(function() {
				setValues(this, [ value ]);
			});
		},
		getValues : function(jq) {
			return getValues(jq[0]);
		},
		reset : function(jq) {
			return jq.each(function() {
				$(this).comboZTree('setValues', []);
//				var opts = $(this).select('options');
//				if (opts.multiple) {
//					$(this).select('setValues', opts.originalValue);
//				} else {
//					$(this).select('setValue', opts.originalValue);
//				}
			});
		},
		loadData : function(jq, data) {
			return jq.each(function() {
				loadData(this, data);
			});
		},
		reload : function(jq, url) {
			return jq.each(function() {
				request(this, url);
			});
		},
		select : function(jq, value) {
			return jq.each(function() {
				select(this, value);
			});
		},
		unselect : function(jq, value) {
			return jq.each(function() {
				unselect(this, value);
			});
		}
	};
	
	$.fn.comboZTree.defaults = {
		valueField : 'value',
		textField : 'text',
		method : 'post',
		url : null,
		data : null,
		separator : ',',
		isShowQuery : false,
		editable : false,
		width : null,

		keyHandler : {},
		filter : function(q, row) {
			var opts = $(this).comboZTree('options');
			return row[opts.textField].toLowerCase().indexOf(q.toLowerCase()) == 0;
		},
		formatter : function(row) {
			var opts = $(this).comboZTree('options');
			return row[opts.textField];
		},
		loader : function(param, success, error) {
			var opts = $(this).comboZTree('options');
			if (!opts.url) {
				return false;
			}
			$.ajax({
				type : opts.method,
				url : opts.url,
				data : param,
				dataType : 'json',
				success : function(data) {
					success(data);
				},
				error : function() {
					error.apply(this, arguments);
				}
			});
		},
		loadFilter : function(data) {
			return data;
		},
		onBeforeLoad : function(param) {
		},
		onLoadSuccess : function() {
		},
		onLoadError : function() {
		},
		onSelect : function(record) {
		},
		onUnselect : function(record) {
		}
	};
})(jQuery);