window.onload = function () {
    var url_detail = "http://127.0.0.1/backstage/php/detail.php"
    var url_guest = "http://127.0.0.1/backstage/php/guest.php"
    var selectDate = `status=select`;
    var addList = document.getElementsByClassName("add_list")[0];
    ajaxGet(url_detail, function (msg) {
        var arr = JSON.parse(msg);
        var str = "";
        for (let i = 0; i < arr.length; i++) {
            var item = arr[i];
            str += `<div class="detail">
            <img src="./images/${item.iphoto}" alt="" class="photo">
            <div class="information">
                <i>标题：</i>
                <p class="title">${item.ititle}</p>
                <i>日期：</i>
                <p class="time">${item.itime}</p>
                <i>地址：</i>
                <p class="where">${item.iwhere}</p>
                <i>城市：</i>
                <p class="city">${item.icity}</p>
                <i>价格：</i>
                <p class="val">${item.ival}</p>
                <i>嘉宾：</i>
                <p class="id"></p>
                <img src="" alt="" class="gportrait">
            </div>
            <div class="button">
                <p class="delete">删除</p>
                <p class="examine">审核评论</p>
                <p class="change">修改</p>
            </div>
        </div>`
        }
        addList.innerHTML = str;
    }, selectDate)
    ajaxGet(url_guest, function (msg) {
        var arr = JSON.parse(msg);
        for (let i = 0; i < arr.length; i++) {
            var item = arr[i];
            $(".detail").eq(i).children(".information").children(".id").text(item.gid);
            $(".detail").eq(i).children(".information").children(".gportrait").attr("src", './images/' + item.gportrait);
        }
    }, selectDate)

    var details = document.getElementsByClassName("detail");
    var str = document.cookie;
    var aname = str.split("=")[1];
    var uname = document.getElementsByClassName("uname")[0];
    var reg = document.getElementsByClassName("reg")[0];
    var tabbar = document.getElementsByClassName("tabbar")[0];
    var contain = document.getElementsByClassName("container_detail")[0];
    var allLi = tabbar.getElementsByTagName("li");
    var oDivs = contain.getElementsByClassName("content");
    var addNew = document.getElementsByClassName("add")[0].firstElementChild;
    var newBox = document.getElementsByClassName("new_box")[0];
    var changeBox = document.getElementsByClassName("change_box")[0];
    var deleteBox = document.getElementsByClassName("delete_box")[0];
    if (str == "") {
        $("#js_userName").val("未登录");
        $("#js_logout").addClass("none");
    } else {
        $("#js_userName").html(aname);
        $("#js_logout").removeClass("none");
    }
    $("#js_logout").on("click", function () {
        location.href = './login.html';
    })
    for (let i = 0; i < allLi.length; i++) {
        allLi[i].onclick = function () {
            for (var j = 0; j < allLi.length; j++) {
                allLi[j].className = "";
                oDivs[j].style.display = "none";
            }

            allLi[i].className = "active";
            oDivs[i].style.display = "block";
        }
    }
    $(document).on("click", ".examine", function () {
        alert(111);
    })
    $(document).on("click", ".change", function () {
        changeBox.style.display = "block";
        var changeModity = document.getElementsByClassName("change_modity")[0];
        var ititle = changeModity.getElementsByClassName("ititle")[0];
        var itime = changeModity.getElementsByClassName("itime")[0];
        var iwhere = changeModity.getElementsByClassName("iwhere")[0];
        var icity = changeModity.getElementsByClassName("icity")[0];
        var ival = changeModity.getElementsByClassName("ival")[0];
        var gid = changeModity.getElementsByClassName("gid")[0];
        var iphoto = changeModity.getElementsByClassName("logo")[0];
        var gportrait = changeModity.getElementsByClassName("portrait")[0];
        var title = $(this).parent().siblings(".information").children(".title").text();
        var time = $(this).parent().siblings(".information").children(".time").text();
        var where = $(this).parent().siblings(".information").children(".where").text();
        var city = $(this).parent().siblings(".information").children(".city").text();
        var val = $(this).parent().siblings(".information").children(".val").text();
        var id = $(this).parent().siblings(".information").children(".id").text();
        var photo = $(this).parent().siblings(".photo").attr('src');
        var portrait = $(this).parent().siblings(".information").children(".gportrait").attr("src");
        var str1 = photo.split("/");
        var str2 = portrait.split("/");
        var pic1 = str1[str1.length - 1]
        var pic2 = str2[str2.length - 1]
        ititle.value = title;
        itime.value = time;
        iwhere.value = where;
        icity.value = city;
        ival.value = val;
        gid.value = id;
        iphoto.value = pic1;
        gportrait.value = pic2;
    })
    addNew.onclick = function () {
        newBox.style.display = "block";
    }
    $(document).on("click", ".sure", function () {
        if (newBox.style.display == "block") {
            newBox.style.display = "none";
            var newModity = document.getElementsByClassName("new_modity")[0];
            var ititle = newModity.getElementsByClassName("ititle")[0].value;
            var itime = newModity.getElementsByClassName("itime")[0].value;
            var iwhere = newModity.getElementsByClassName("iwhere")[0].value;
            var icity = newModity.getElementsByClassName("icity")[0].value;
            var ival = newModity.getElementsByClassName("ival")[0].value;
            var gid = newModity.getElementsByClassName("gid")[0].value;
            var iphoto = newModity.getElementsByClassName("logo")[0].value;
            var gportrait = newModity.getElementsByClassName("portrait")[0].value;
            var addData = `status=insert&ititle=${ititle}&itime=${itime}&iwhere=${iwhere}&icity=${icity}&ival=${ival}&iphoto=${iphoto}`;
            var addDataGuest = `status=insert&ititle=${ititle}&gid=${gid}&gportrait=${gportrait}`;
            if (ititle && itime && iwhere && icity && ival && iphoto != "") {
                ajaxGet(url_detail, function () {
                    alert("添加信息成功");
                }, addData);
                ajaxGet(url_guest, function () {
                    location.reload();
                }, addDataGuest)
            } else {
                alert("信息不能为空")
            }
        } else {
            changeBox.style.display = "none";
            var changeModity = document.getElementsByClassName("change_modity")[0];
            var ititle = changeModity.getElementsByClassName("ititle")[0].value;
            var itime = changeModity.getElementsByClassName("itime")[0].value;
            var iwhere = changeModity.getElementsByClassName("iwhere")[0].value;
            var icity = changeModity.getElementsByClassName("icity")[0].value;
            var ival = changeModity.getElementsByClassName("ival")[0].value;
            var gid = changeModity.getElementsByClassName("gid")[0].value;
            var iphoto = changeModity.getElementsByClassName("logo")[0].value;
            var gportrait = changeModity.getElementsByClassName("portrait")[0].value;
            var changeData = `status=update&ititle=${ititle}&itime=${itime}&iwhere=${iwhere}&icity=${icity}&ival=${ival}&iphoto=${iphoto}`;
            var changeDataGuest = `status=update&ititle=${ititle}&gid=${gid}&gportrait=${gportrait}`;
            if (ititle && itime && iwhere && icity && ival && iphoto != "") {
                ajaxGet(url_detail, function () {
                    alert("修改信息成功");
                }, changeData);
                ajaxGet(url_guest, function () {
                    location.reload();
                }, changeDataGuest)

            } else {
                alert("信息不能为空")
            }
        }
    })
    $(document).on("click", ".back", function () {
        if (newBox.style.display == "block") {
            newBox.style.display = "none";
        } else {
            changeBox.style.display = "none";
        }
    })
    var dtitle = "";
    $(document).on("click", ".delete", function () {
        deleteBox.style.display = "block";
        dtitle = $(this).parent().siblings(".information").children(".title");
    })
    $(document).on("click", ".yes", function () {
        deleteBox.style.display = "none";
        var ititle = dtitle[0].innerHTML;
        var deleteData = `status=delete&ititle=${ititle}`;
        var deleteDataGuest = `status=delete&ititle=${ititle}`;
        ajaxGet(url_detail, function () {
            alert("删除信息成功");
        }, deleteData);
        ajaxGet(url_guest, function () {
            location.reload();
        }, deleteDataGuest)
    })
    $(document).on("click", ".no", function () {
        deleteBox.style.display = "none";
    })
    var url_article = "http://127.0.0.1/backstage/php/article.php"
    ajaxGet(url_article, function (msg) {
        var arr = JSON.parse(msg);
        var str = "";
        for (let i = 0; i < arr.length; i++) {
            var item = arr[i];
            str += `<li>
            <p class="id">${item.aid}</p>
            <p class="atitle">${item.atitle}</p>
            <p class="word">${item.acontent}</p>
            <p class="btn">删除</p>
        </li>`
        }
        $(".add_article").html(str);
        $(".btn").on("click", function () {
            var atitle = $(this).parent().children(".atitle").text();
            var deleteData = `status=delete&atitle=${atitle}`;
            ajaxGet(url_article, function () {
                alert("删除信息成功");
                location.reload();
            }, deleteData);
        })
    }, selectDate)
    var url_login = "http://127.0.0.1/backstage/php/login.php"
    ajaxGet(url_login, function (msg) {
        var arr = JSON.parse(msg);
        var str = "";
        for (let i = 0; i < arr.length; i++) {
            var item = arr[i];
            str += `<li>
            <p class="uname">${item.uname}</p>
            <p class="del">删除</p>
        </li>`
        }
        $(".add_user").html(str);
        $(".del").on("click", function () {
            var uname = $(this).parent().children(".uname").text();
            var deleteData = `status=delete&uname=${uname}`;
            ajaxGet(url_login, function () {
                alert("删除信息成功");
                location.reload();
            }, deleteData);
        })
    }, selectDate)
    var storageBox = document.getElementsByClassName(".storage_box")[0];
    var url_storage = "http://127.0.0.1/backstage/php/storage.php"
    ajaxGet(url_storage, function (msg) {
        var arr = JSON.parse(msg);
        var str = "";
        for (let i = 0; i < arr.length; i++) {
            var item = arr[i];
            str += `<div class="s_detail">
            <div class="s_information">
                <i>标题：</i>
                <p class="stitle">${item.stitle}</p>
                <i>日期：</i>
                <p class="stime">${item.stime}</p>
                <i>地址：</i>
                <p class="swhere">${item.swhere}</p>
                <i>城市：</i>
                <p class="scity">${item.scity}</p>
                <i>价格：</i>
                <p class="sval">${item.sval}</p>
                <i>联系人:</i>
                <p class="scontact">${item.scontact}</p>
            </div>
            <div class="button">
                <p class="s_delete">删除</p>
                <p class="s_change">修改</p>
            </div>
        </div>`
        }
        $(".add_message").html(str);
        $(".s_delete").on("click", function () {
            var stitle = $(this).parent().siblings(".s_information").children(".stitle").text();
            var deleteData = `status=delete&stitle=${stitle}`;
            ajaxGet(url_storage, function () {
                alert("删除信息成功");
                location.reload();
            }, deleteData);
        })
    }, selectDate)
    $(document).on("click", ".s_change", function () {
        $(".storage_box").css("display", "block")
        var storageModity = document.getElementsByClassName("storage_modity")[0];
        var ititle = storageModity.getElementsByClassName("stitle")[0];
        var itime = storageModity.getElementsByClassName("stime")[0];
        var iwhere = storageModity.getElementsByClassName("swhere")[0];
        var icity = storageModity.getElementsByClassName("scity")[0];
        var ival = storageModity.getElementsByClassName("sval")[0];
        var title = $(this).parent().siblings(".s_information").children(".stitle").text();
        var time = $(this).parent().siblings(".s_information").children(".stime").text();
        var where = $(this).parent().siblings(".s_information").children(".swhere").text();
        var city = $(this).parent().siblings(".s_information").children(".scity").text();
        var val = $(this).parent().siblings(".s_information").children(".sval").text();
        console.log(title)
        ititle.value = title;
        itime.value = time;
        iwhere.value = where;
        icity.value = city;
        ival.value = val;
    })
    $(document).on("click", ".s_sure", function () {
        $(".storage_box").css("display", "none")
        var storageModity = document.getElementsByClassName("storage_modity")[0];
        var stitle = storageModity.getElementsByClassName("stitle")[0].value;
        var stime = storageModity.getElementsByClassName("stime")[0].value;
        var swhere = storageModity.getElementsByClassName("swhere")[0].value;
        var scity = storageModity.getElementsByClassName("scity")[0].value;
        var sval = storageModity.getElementsByClassName("sval")[0].value;
        var gid = storageModity.getElementsByClassName("gid")[0].value;
        var iphoto = storageModity.getElementsByClassName("logo")[0].value;
        var gportrait = storageModity.getElementsByClassName("portrait")[0].value;
        var storageDate = `status=insert&ititle=${stitle}&itime=${stime}&iwhere=${swhere}&icity=${scity}&ival=${sval}&iphoto=${iphoto}`;
        var storageDataGuest = `status=insert&ititle=${stitle}&gid=${gid}&gportrait=${gportrait}`;
        if (stitle && stime && swhere && scity && sval && iphoto != "") {
            ajaxGet(url_detail, function () {
                alert("修改信息成功");
            }, storageDate);
            ajaxGet(url_guest, function () {
                location.reload();
            }, storageDataGuest)
            var deleteData = `status=delete&stitle=${stitle}`;
            ajaxGet(url_storage, function () {
                location.reload();
            }, deleteData);
        } else {
            alert("信息不能为空")
        }
    })
    $(document).on("click", ".back", function () {
        if (newBox.style.display == "block") {
            newBox.style.display = "none";
        } else if (changeBox.style.display == "block") {
            changeBox.style.display = "none";
        } else {
            storageBox.style.display = "none";
        }
    })
}
