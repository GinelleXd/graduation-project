window.onload = function () {
    var str = document.cookie;
    var cookie = str.split(";")[0];
    var uname = cookie.split("=")[1];
    var href = location.href;
    var url = href.split("=")[1];
    var ititle = decodeURI(url);
    if (str == "") {
        $(".login").addClass("show");
        $(".allready").addClass("none");
    } else {
        $(".login").addClass("none");
        $(".allready").addClass("show");
    }
    var buy = document.getElementsByClassName("buy")[0];
    buy.onmouseover = function () {
        buy.style.backgroundColor = "#ff6388"
    }
    buy.onmouseout = function () {
        buy.style.backgroundColor = "#ffbc47"
    }
    buy.onclick = function () {
        location.href = "http://localhost/system/ticket.html?pname=" + encodeURI(ititle);
    }
    var url_detail = "http://127.0.0.1/system/php/detail.php"
    var url_guest = "http://127.0.0.1/system/php/guest.php"
    var selectDate = `status=select`;
    ajaxGet(url_detail, function (msg) {
        var arr = JSON.parse(msg);
        for (let i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (item.ititle == ititle) {
                $(".pic").attr("src", "./images/" + item.iphoto);
                $(".ititle").text(item.ititle);
                $(".iwhere").text(item.icity + " " + item.iwhere);
                $(".itime").text(item.itime);
                var myval = item.ival.split("-")[0];
                var price = item.ival.split("-")[1];
                $(".myval").text("￥" + myval);
                $(".price").text("现场票" + price + "元");
            }
        }
    }, selectDate)
    ajaxGet(url_guest, function (msg) {
        var arr = JSON.parse(msg);
        for (let i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (item.ititle == ititle) {
                $(".portrait").attr("src", "./images/" + item.gportrait);
                $(".pid").text(item.gid);
            }
        }
    }, selectDate)
    var url = "http://127.0.0.1/system/php/post.php";
    $(document).on("click", ".btn", function () {
        var ititle = document.getElementsByClassName("ititle")[0].innerHTML;
        function CurentTime() {
            var now = new Date();
            var year = now.getFullYear();       //年
            var month = now.getMonth() + 1;     //月
            var day = now.getDate();            //日
            var hh = now.getHours();            //时
            var mm = now.getMinutes();          //分
            var clock = year + "-";
            if (month < 10)
                clock += "0";
            clock += month + "-";
            if (day < 10)
                clock += "0";
            clock += day + " ";
            if (hh < 10)
                clock += "0";
            clock += hh + ":";
            if (mm < 10) clock += '0';
            clock += mm;
            return (clock);
        }
        var ptime = CurentTime();
        var portrait = "middle.jpg"
        var pcontent = document.getElementById("post").value;
        var addData = `status=insert&ititle=${ititle}&ptime=${ptime}&pid=${uname}&pcontent=${pcontent}&portrait=${portrait}`;
        ajaxGet(url, function () {
            alert("添加信息成功");
            location.reload();
        }, addData)
    })
    ajaxGet(url, function (msg) {
        var arr = JSON.parse(msg);
        for (let i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (item.ititle == ititle) {
                $(".portrait").attr("src", "./images/" + item.portrait);
                $(".name").text(item.pid);
                $(".ptime").text(item.ptime);
                $(".pcontent").text(item.pcontent);
            }
        }
    }, selectDate)
}

