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
    // var data = "status=select";
    // function showData(){
    //     ajaxGet( url , function(msg){
    //         var arr = JSON.parse( msg );
    //         var str = "";
    //         for( var i = 0 ; i < arr.length ; i++ ){
    //             var item = arr[i];
    //             str += `<tr class="text-center middle">
    //                         <td>${item.id}</td>
    //                         <td>${item.icontent}</td>
    //                         <td>${item.iwhere}</td>
    //                         <td>${item.idea}</td>
    //                         <td>
    //                             <button class="btn" idx="del">删除</button>
    //                         </td>
    //                         <td>
    //                             <button wid='${item.id}' where='${item.iwhere}' content='${item.icontent}'  idea='${item.idea}' class="btn" idx="upt" data-toggle="modal" data-target=".wq-upt">
    //                                 修改
    //                             </button>
    //                         </td>
    //                     </tr>`
    //         }
    //         tbody.innerHTML = str;
    //     } , data)
    // }
    var url = "http://127.0.0.1/system/php/storage.php";
    var btn = document.getElementById("btn");
    btn.onclick = function(){
        var stitle = document.getElementsByClassName("name")[0].value;
        var beginDate = document.getElementsByClassName("begin-date")[0].value;
        var beginHour = document.getElementsByClassName("begin-hour")[0].value;
        var beginMinute = document.getElementsByClassName("begin-minute")[0].value;
        var overDate = document.getElementsByClassName("over-date")[0].value;
        var overHour = document.getElementsByClassName("over-hour")[0].value;
        var overMinute = document.getElementsByClassName("over-minute")[0].value;
        var stime = beginDate + " " + beginHour + ":" + beginMinute + " " + overDate + " " + overHour + ":" + overMinute;
        var swhere = document.getElementsByClassName("where")[0].value;
        var scity = document.getElementsByClassName("city")[0].value;
        var myval = document.getElementsByClassName("myval")[0].value;
        var price = document.getElementsByClassName("price")[0].value;
        var sval = myval + "-" + price;
        var scontact = document.getElementsByClassName("contact")[0].value;
        var addData = `status=insert&stitle=${stitle}&stime=${stime}&swhere=${swhere}&scity=${scity}&sval=${sval}&scontact=${scontact}`;
        ajaxGet( url , function(){
            alert("添加信息成功");
        },addData )
    }
}