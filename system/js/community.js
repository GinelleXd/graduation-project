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
    var url_article = "http://127.0.0.1/system/php/article.php"
    var selectDate = `status=select`;
    var addList = document.getElementsByClassName("article")[0];
    ajaxGet(url_article, function (msg) {
        var arr = JSON.parse(msg);
        var str = "";
        for (let i = 0; i < arr.length; i++) {
            var item = arr[i];
            str += `<div class="content">
            <div class="title">
                <a href="#" class="atitle">${item.atitle}</a>
                <div class="name">
                    <p class="uname">${item.aid}</p>
                    <p>发布于</p>
                    <p class="atime">${item.atime}</p>
                </div>
            </div>
            <div class="sort">
                <span class="asort">${item.asort}</span>
            </div>
            <div class="box">
                <p class="acontent">${item.acontent}</p>
            </div>
        </div>`
        }
        addList.innerHTML = str;
    }, selectDate)
}