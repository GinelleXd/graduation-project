<?php  
	header("content-type:text/html;charset=utf-8");
	header("Access-Control-Allow-Origin:*");
	if(isset($_POST["submit"]) && $_POST["submit"] == "登录"){
		$user = $_POST["username"];
		$pwd = $_POST["password"];
		$identify = $_POST["identify"];
		if($user == "" || $pwd == ""){
			echo "<script>alert('请输入用户名或密码！'); history.go(-1);</script>";
		}else if($identify == ""){
			echo "<script>alert('请输入验证码！'); history.go(-1);</script>";
		}else{
			mysql_connect("localhost","root","root");
			mysql_select_db("system");
			mysql_query("set names utf8");
			$sql = "SELECT * FROM `login` WHERE uname = '$_POST[username]' and upwd = '$_POST[password]'"/*"select * from 'user' where username = '$_POST[username]' and password = '$_POST[password]'"*/;
			$result = mysql_query($sql);
			$row = mysql_fetch_array($result);  //将数据以索引方式储存在数组中
			//echo "<script>alert($row);</script>";
			if( $row ){
				//用户名存在 判断密码是否相等
				//如果数据库中的密码和用户输入的密码相等 提示登录成功
				if( $row["upwd"] == $pwd ){
					echo "<script>alert('登录成功');location.href='../index.html';document.cookie = 'uname =' + '$_POST[username]' + ';Path=' + escape('/');document.cookie = 'upwd =' + '$_POST[password]' + ';Path=' + escape('/');</script>";
				}else{
					echo "<script>alert('密码错误'); history.go(-1);</script>";
				}
			}else{
				//没有查询出任何数据 说明用户名不存在
				echo "<script>alert('用户名不存在'); history.go(-1);</script>";
			}
			/*if($row){
				echo $row[0];
			}else{
				echo "<script>alert('用户名或密码不正确！');history.go(-1);</script>";
			}*/
		}
	}else{
		echo "<script>alert('提交未成功！'); history.go(-1);</script>";
	}
?>