Date.prototype.Format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                //alert(fmt);
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }else{
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                //alert(fmt);
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
};

const util = {
	host: window.location.href.indexOf('localhost') > -1 ? '//localhost:3000' : '',
	callback: (res, _this) => {
		if (res && res.auth == 0) {
			_this.router.push({name: 'Login'});
		}
	},
	getCookie: (name) => {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },
    delCookie: (name) => {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = util.getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + "; path=/";
    },
	setCookie: (name, value, h) => {
		var exp = new Date();
		exp.setTime(exp.getTime() + h * 60 * 60 * 1000);
		document.cookie = name + '=' + value + ';expires=' + exp.toGMTString() + "; path=/";
	}
}

export default util;
