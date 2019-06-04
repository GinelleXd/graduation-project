window.onload = function(){
    var str = document.cookie;
    var uname = document.getElementsByClassName("uname")[0];
    var reg = document.getElementsByClassName("reg")[0];
    if(str == ""){
        $(".login").addClass("show");
        $(".allready").addClass("none");
    }else{
        $(".login").addClass("none");
        $(".allready").addClass("show");
    }
    var url_detail = "http://127.0.0.1/backstage/php/detail.php"
    var selectDate = `status=select`;
    var addList = document.getElementsByClassName("con-list")[0];
    ajaxGet(url_detail, function (msg) {
        var arr = JSON.parse(msg);
        var str = "";
        for (let i = 0; i < arr.length; i++) {
            var item = arr[i];
            oldMonth = item.itime.split(" ")[0].split("-")[1];
			oldDay = item.itime.split(" ")[0].split("-")[2];
			nowMonth = item.itime.split(" ")[2].split("-")[1];
			nowDay = item.itime.split(" ")[2].split("-")[2];
            str += `<li>
            <img src="./images/${item.iphoto}" alt="">
            <div class="information">
                <a href="http://localhost/system/buy.html?pname=${encodeURI(item.ititle)}">${item.ititle}</a>
                <div class="in-title">
                    <i></i>
                    <span>${item.icity}</span>
                    <i></i>
                    <span>${oldMonth}/${oldDay}-${nowMonth}/${nowDay}</span>
                </div>
                <p>地址：${item.iwhere}</p>
                <div class="recommend">喵球推荐</div>
            </div>
        </li>`
        }
        addList.innerHTML = str;
    }, selectDate)
}