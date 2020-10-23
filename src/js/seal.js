var main_width = $(window).width();
var main_height = $(window).height();

$(function () {
	$("body").css("min-height", main_height);
	$(".bn_nav li").css("min-height", main_height / 5);
});

(function ($) {
	$.fn.JQRadio = function (settings) {
		var $div = this;
		var radioVal = $div.find(".radioVal"); 	//当前的radio选中项的value值
		var items = $div.find("dd");
		//每个li的点击事件
		$div.on("click", "dd", function () {
			radioVal.val($(this).attr("id"));
			$(this).addClass("active").siblings("dd").removeClass("active");
		});
		items.each(function () {
			if ($(this).hasClass('active')) {
				$(this).trigger('click');
			}
		});
	};
})(jQuery);

var _User;
window.addEventListener("DOMContentLoaded", function () {
	var arr = ['/Static/Agent/Login.html','/Static/Agent/BackPassword.html'];
	if (arr.indexOf(window.location.pathname) >= 0) { return };
	var ev = CreatedUserEvent();
	$.post('/api/AppAgent/AppAgentSession', {}, function (data) {
		if (data.Status == 1) {
			_User = data.Data;
			onUserReady(data.Data);
			if (ev) {
				ev.initCustomEvent('CheckUser', false, false, data.Data);
				document.dispatchEvent(ev);
			}
		} else {
			window.localStorage.clear();
			window.location.replace('/Static/Agent/Login.html');
		}
	}).error(function (err) {
		console.log('AppAgentSession异常:' + JSON.stringify(err));
	});
}, true);

function onUserReady(user) {

}
//自定义事件
function CreatedUserEvent() {
	try {
		var ev = document.createEvent('CustomEvent');
		return ev;
	} catch (err) {
		console.log('CreatedUserEvent' + JSON.stringify(err));
	}
}

function ShowMsg(msg, time) {
	time = time || 1500;
	if (msg) {
		$('#_msgtips').remove();
		var dom = `<div id="_msgtips" class="msgtips" style="z-index:9999;"> <div class="weui-mask_transparent"></div> <div class="weui-toast weui-animate-fade-in"><p class="weui-toast__content">` + msg + `</p> </div> </div>`;
		$('body').append(dom);
		setTimeout(function () { $('#_msgtips').remove(); }, time);
	}
}

