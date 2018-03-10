/**
 * 中介模式
 * Created by Sebarswee on 2015/10/30.
 */
define('mediator/1.0/mediator', [], function (require, exports, module) {
    'use strict';

    var Mediator = function() {
        // 订阅一个事件，并且提供一个事件触发以后的回调函数
        var subscribe = function(channel, fn) {
            if (!Mediator.channels[channel]) {
                Mediator.channels[channel] = [];
            }
            Mediator.channels[channel].push({
                context: this,
                callback: fn
            });
            return this;
        };
        // 广播事件
        var publish = function(channel) {
            if (!Mediator.channels[channel])  {
                return false;
            }
            var args = Array.prototype.slice.call(arguments, 1);
            for (var i = 0, l = Mediator.channels[channel].length; i < l; i++) {
                var subscription = Mediator.channels[channel][i];
                subscription.callback.apply(subscription.context, args);
            }
            return this;
        };

        return {
            channels: {},
            subscribe: subscribe,
            publish: publish,
            installTo: function(obj) {
                obj.subscribe = subscribe;
                obj.publish = publish;
            }
        };
    }();

    module.exports = Mediator;
});