/**
 * <pre>
 * Description: 非Html5浏览器的placeholder特性支持，当文本框值为空时，设置为placeholder的值
 * Author：Zhang zhongtao
 * Date：2014-11-11 10:56
 * </pre>
 */
define('placeholderFix/1.0/placeholderFix', [ '$' ], function(require, exports,
		module) {
	var $ = require('$');

	$(function() {
		var doc = document;
		var supportPlaceholder = 'placeholder' in doc.createElement('input');

		if (!supportPlaceholder) {
			// 空值颜色
			var nullColor = '#a9a9a8';
			var notNullColor = 'black';

			/**
			 * 刷新文本框的placeholder状态
			 */
			var refreshPlaceHolderStatus = function() {
				var $this = $(this);
				var placeholder = $this.attr('placeholder');
				if (placeholder) {
					if (!$this.val() || $this.val() == placeholder) {
						$this.val(placeholder);
						$this.css("color", nullColor);
					}
				}
			};

			$('body').on('focus', 'input[type="text"]', function() {
				var $this = $(this);
				var placeholder = $this.attr('placeholder');
				if (placeholder) {
					if ($this.val() === placeholder) {
						$this.val('');
						$this.css("color", notNullColor);
					}
				}
			}).on('blur', 'input[type="text"]', refreshPlaceHolderStatus).find(
					'input[type="text"]').each(refreshPlaceHolderStatus);
		}
	});
});