//定义一个函数 功能是根据id查找页面元素
function $id( id ){
	return document.getElementById( id );
}
//创建元素
function create(ele){
	return document.createElement(ele);
}

//获取任意区间的整数值
function rand( min , max ){
    return Math.round( Math.random()*(max-min) + min );
}

//随机获取六位十六进制颜色值 
function getColor(){
	var str = "0123456789abcdef";
	var color = "#";
	for( var i = 1 ; i <= 6 ; i++ ){
		color += str.charAt( rand(0,15) );
	}
	return color;
}

//自定义日期时间格式
function dateToString(now,sign){
	//默认日期的间隔符为  -  如果用户传递的是/  就使用/  .  如果用户不传递任何参数 默认是-
	sign = sign || "-";
	var y = now.getFullYear();
	var m = toTwo(  now.getMonth()+ 1  ) ;
	var d = toTwo(  now.getDate() );
	var h = toTwo(  now.getHours() );
	var _m = toTwo(  now.getMinutes() );
	var s = toTwo( now.getSeconds() ) ;
	var str = y + sign + m + sign + d + " " + h + ":" + _m + ":" + s;
	return str;
}
//判断得到的结果是否小于10 如果小于10，前面拼接0
function toTwo(val){
	return val < 10 ? "0"+val : val;
}

//验证码 ： 字母和数字组成
function yzm(){
	//小写字母   大写字母   数字
	//48--122 随机获取一个code值  判断编码值如果在 58--64   91--96 两个区间，就重新抽取
	//如果不在上面的两个区间内，就将code转成字符， 拼接到字符串中
	var str = "";//拼接6位的验证码
	for( var i = 1 ; i <= 6 ; i++ ){
		var code = rand( 48 , 122 );
		if( code >= 58&&code <= 64 || code >= 91 && code <= 96 ){
			//就重新抽一次
			i--;
		}else{
			var ch = String.fromCharCode( code );
			str += ch;
		}
	}
	return str;
}

//碰撞函数
function pz(d1,d2){
	R1 = d1.offsetWidth+d1.offsetLeft;
	L1 = d1.offsetLeft;
	T1 = d1.offsetTop;
	B1 = d1.offsetHeight + d1.offsetTop;
	
	R2 = d2.offsetWidth+d2.offsetLeft;
	L2 = d2.offsetLeft;
	T2 = d2.offsetTop;
	B2 = d2.offsetHeight + d2.offsetTop;
	
	//如果碰不上 返回false 
	if( R1 < L2 || B1 < T2 || T1 > B2 || L1 > R2 ){
		return false;
	}else{
		return true;
	}
}