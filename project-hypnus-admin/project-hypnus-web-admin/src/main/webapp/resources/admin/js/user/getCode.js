/**
 * Created by yxc on 2015-10-12 16:03:20.
 */
//设置setLocalDelay
function setLocalDelay(delay,rel) {
    localStorage.setItem("delay_"+rel, delay);
    localStorage.setItem("time_"+rel, new Date().getTime());
}

//getLocalDelay()
function getLocalDelay(rel) {
    var LocalDelay = {};
    LocalDelay.delay = localStorage.getItem("delay_" + rel);
    LocalDelay.time = localStorage.getItem("time_" + rel);
    return LocalDelay;
}


//倒计时效果
/**
 *
 * @param {Object} obj 获取验证码按钮
 *@param _delay 倒计时长
 * @param {Function} callback  获取验证码接口函数
 */
function countDown(obj, _delay,callback) {
    var rel = obj.attr("data-rel");
    if (typeof  obj.attr("disabled") == "undefined") {
        var delay = _delay;
        obj.attr("disabled",true).find("span").text("已发送("+delay+"s)");
        var timer = setInterval(function() {
            if (delay > 1) {
                delay--;
                obj.find("span").text("已发送("+delay+"s)");
                setLocalDelay(delay,rel);
            } else {
                clearInterval(timer);
                obj.removeAttr("disabled").find("span").text("获取验证码");
            }
        }, 1000);
        callback;
    } else {
        return false;
    }
}

//防止页面刷新倒计时失效,监听
/**
 *
 * @param {Object} obj  获取验证码按钮
 */
function monitor(obj) {
	var rel = obj.attr("data-rel");
    var LocalDelay = getLocalDelay(rel);
    var timeLine = parseInt((new Date().getTime() - LocalDelay.time) / 1000);
    if (timeLine > LocalDelay.delay) {
        console.log("该记录过期了");
    } else {
        _delay = LocalDelay.delay - timeLine;
        obj.attr("disabled",true).find("span").text("已发送("+_delay+"s)");
        var timer = setInterval(function() {
            if (_delay > 1) {
                _delay--;
                obj.find("span").text("已发送("+_delay+"s)");
                setLocalDelay(_delay,rel);
            } else {
                clearInterval(timer);
                obj.removeAttr("disabled").find("span").text("获取验证码");
            }
        }, 1000);
    }
};