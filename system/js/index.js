window.onload = function () {
	var timer = setInterval(auto, 3000);
	var index = 0;
	function auto() {
		index++;
		if (index == $(".point li").size()) {
			index = 0;
		}
		$(".point li").eq(index).addClass("active").siblings().removeClass("active");
		$(".rotation li").eq(index).fadeIn(500).siblings().fadeOut(500);
		$(".title p").eq(index).addClass("show").siblings().removeClass("show");
	}

	//鼠标 操作
	$(".point li").mouseenter(function () {
		clearInterval(timer);
		index = $(this).index() - 1;
		auto();
	})
	$(".point li").mouseout(function () {
		timer = setInterval(auto, 3000);
	})

	var str = document.cookie;
	var uname = document.getElementsByClassName("uname")[0];
	var reg = document.getElementsByClassName("reg")[0];
	if (str == "") {
		$(".login").addClass("show");
		$(".allready").addClass("none");
	} else {
		$(".login").addClass("none");
		$(".allready").addClass("show");
	}
	var conBottom = document.getElementsByClassName("c-bottom")[0];
	$(document).on("mouseenter", ".box_detail", function () {
		$(".time").css("opacity","0.7")
	})
	$(document).on("mouseout", ".box_detail", function () {
		$(".time").css("opacity","0")
	})
	var url = "http://127.0.0.1/system/php/detail.php"
	var selectDate = `status=select`;
	ajaxGet(url, function (msg) {
		var arr = JSON.parse(msg);
		var str = "";
		for (let i = 0; i < arr.length; i++) {
			var item = arr[i];
			oldMonth = item.itime.split(" ")[0].split("-")[1];
			oldDay = item.itime.split(" ")[0].split("-")[2];
			nowMonth = item.itime.split(" ")[2].split("-")[1];
			nowDay = item.itime.split(" ")[2].split("-")[2];
			str += `<a href="http://localhost/system/buy.html?pname=${encodeURI(item.ititle)}">
		<img src="./images/${item.iphoto}" alt="" class="box_detail">
		<p>${item.ititle}</p>
		<div class="time">
			<span>起止时间</span>
			<span>${oldMonth}.${oldDay}-${nowMonth}.${nowDay}</span>
		</div>
	</a>`
		}
		conBottom.innerHTML = str;
	}, selectDate)
}