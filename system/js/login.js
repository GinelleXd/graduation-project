window.onload = function(){
	var uLi = $(".change li");
	var form = $(".box form");
	for(let i = 0 ; i < uLi.length ; i++){
		uLi.eq(i).on("mouseenter",function(){
			$(this).addClass("active1").siblings().removeClass("active1");
			form.eq(i).addClass("active").siblings().removeClass("active");
		})
	}
}
var in1 = document.getElementsByClassName("form1")[0].children[0].children[0].children[1];
var in2 = document.getElementsByClassName("form1")[0].children[0].children[2].children[1];
var in3 = document.getElementsByClassName("form1")[0].children[0].children[4].children[1];
var btn1 = document.getElementsByClassName("form1")[0].children[0].children[8].children[0];
var form2 = document.getElementsByClassName("form2")[0];
var in4= document.getElementsByClassName("form2")[0].children[0].children[0].children[0];
var in5= document.getElementsByClassName("form2")[0].children[0].children[2].children[0];
var in6 = document.getElementsByClassName("form2")[0].children[0].children[4].children[0];
var in7 = document.getElementsByClassName("form2")[0].children[0].children[6].children[0];
var btn2= document.getElementsByClassName("form2")[0].children[0].children[8].children[0];
var reg1 = /^1[34578]\d{9}$/;
var reg2 = /\w{6,}/;
console.log(btn2);
btn2.onclick = function(){
	if(reg1.test(in4.value)){
		if(reg2.test(in5.value)){
			if(in5.value == in6.value){
				if(in7.checked){
					form2.action = "./php/register.php";
					form2.method = "post";
				}else{
					alert("请阅读用户协议！");
				}
			}else{
				alert("两次输入的密码不一致");
			}
		}else{
			alert("请输入正确的密码");
		}
	}else{
		alert("请输入正确的手机号");
	}
}
