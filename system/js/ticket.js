window.onload = function () {
    var str = document.cookie;
    var cookie = str.split(";")[0];
    var uname = cookie.split("=")[1];
    if (str == "") {
        $(".login").addClass("show");
        $(".allready").addClass("none");
    } else {
        $(".login").addClass("none");
        $(".allready").addClass("show");
    }
    var href = location.href;
    var url = href.split("=")[1];
    var ititle = decodeURI(url);
    var url_detail = "http://127.0.0.1/system/php/detail.php"
    var url_ticket = "http://127.0.0.1/system/php/ticket.php"
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
                var allLi = $(".kind_choose").children();
                for (let i = 0; i < allLi.length; i++) {
                    allLi[i].onclick = function () {
                        for (var j = 0; j < allLi.length; j++) {
                            allLi[j].className = "";
                        }

                        allLi[i].className = "active";
                        if (i == 0) {
                            $(".scene_choose").children().eq(1).text("￥" + myval)
                        } else {
                            $(".scene_choose").children().eq(1).text("￥" + price)
                        }
                        $(".which").text($(".active").text());
                        $(".sceneM").text("默认场次" + $(".myval").text());
                        $(".price").text("￥" + price);
                        $(".now_val").text($(".myval").text());
                    }
                }
                var lastDay = item.itime.split(" ")[0];
                var lastYear = lastDay.split("-")[0];
                var lastMonth = lastDay.split("-")[1];
                var lastDate = lastDay.split("-")[2];
                $(".overtime").text("停售：" + lastYear + "-" + lastMonth + "-0" + (lastDate - 1) + " 23:55");
            }
        }
    }, selectDate)
    $(".btn").on("click", function () {
        var ijoin = ""
        if ($(".which").text()) {
            if ($("input[name='check']:checked").val()) {
                ajaxGet(url_detail, function (msg) {
                    var arr = JSON.parse(msg);
                    for (let i = 0; i < arr.length; i++) {
                        var item = arr[i];
                        if (item.ititle == ititle) {
                            if (!item.ijoin) {
                                ijoin = 1;
                            } else {
                                ijoin = Number(item.ijoin) + 1;
                            }
                            var updateDate = `status=update&ititle=${ititle}&ijoin=${ijoin}`;
                            ajaxGet(url_detail, function () {
                                alert("购票成功");
                            }, updateDate);
                            var ttitle = $(".ititle").text();
                            var tcity = $(".iwhere").text().split(" ")[0];
                            var twhere = $(".iwhere").text().split(" ")[1] + " " + $(".iwhere").text().split(" ")[2] + " " + $(".iwhere").text().split(" ")[3];
                            var tpic = $(".pic").attr("src").split("/")[2];
                            var insertDate = `status=insert&uname=${uname}&ttitle=${ttitle}&tcity=${tcity}&twhere=${twhere}&tpic=${tpic}`;
                            ajaxGet(url_ticket, function () {
                                location.reload();
                            }, insertDate);
                        }
                    }
                }, selectDate)
            }else{
                alert("请阅读购票协议")
            }
        } else {
            alert("请选择购票信息")
        }
    })
}