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
    console.log()
    $(".btn").on("click", function () {
        if (uname) {
            if ($(".atitle")) {
                if ($("#word")) {
                    if ($("#choose option:selected").val() != "选择分区") {
                        var url = "http://127.0.0.1/system/php/article.php"
                        var atitle = $(".atitle").val();
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
                        var atime = CurentTime();
                        var asort = $("#choose option:selected").val();
                        var acontent = $("#word").val();
                        var insertDate = `status=insert&aid=${uname}&atitle=${atitle}&atime=${atime}&asort=${asort}&acontent=${acontent}`;
                        ajaxGet(url, function () {
                            alert("发帖成功");
                            location.reload();
                        }, insertDate);
                    }else{
                        alert("请选择分区")
                    }
                } else {
                    alert("请输入正文")
                }
            } else {
                alert("请输入标题")
            }
        } else {
            location.href("http://localhost/system/login.html");
        }
    })
}