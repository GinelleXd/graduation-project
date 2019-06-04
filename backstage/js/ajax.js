//url :路径
//callback ： 回调函数  服务器处理后将结果返回
//data ： 参数 （可选）  放到最后
function ajaxGet(url,callback,data){
	var ajax = null;
	var result = 0;
	if( window.XMLHttpRequest ){
		ajax = new XMLHttpRequest();
	}else{
		ajax = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if( data ){
		url = url + "?" + data;
	}
	ajax.open("get",url);
	ajax.send();
	ajax.onreadystatechange = function(){
		if( ajax.readyState == 4 && ajax.status == 200 ){
			// ajax.responseText;//服务器返回的结果到客户端     客户端对于 ajax.responseText处理是可变的 
			//通过回调函数的调用  将服务器处理的结果返回到客户端上
			callback( ajax.responseText );
		}
	}
}
