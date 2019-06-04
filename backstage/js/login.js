var btn = document.getElementById("btn");
var uname = document.getElementById("login_id");
var pwd = document.getElementById("login_pwd");
function Setcookie (name, value){ 
    document.cookie = name+"="+value+";path=/";
}
btn.onclick = function(){
	if(uname.value == "root"){
		if(pwd.value == "root"){
			Setcookie("uname",uname.value);
			location.href='./index.html';
		}else{
			alert("密码错误");
		}
	}else{
		alert("没有登录权限");
	}
}
