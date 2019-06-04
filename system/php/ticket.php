<?php
    include "public.php";
    $status = $_GET["status"];//控制功能选择
	// isset()  如果传递了参数 就返回true 没传递参数 就返回false
	$uname =isset( $_GET["uname"] ) ? $_GET["uname"] : "";
	$ttitle =isset( $_GET["ttitle"] ) ? $_GET["ttitle"] : "";
	$tcity =isset( $_GET["tcity"] ) ? $_GET["tcity"] : "";
	$twhere =isset( $_GET["twhere"] ) ? $_GET["twhere"] : "";
	$tpic =isset( $_GET["tpic"] ) ? $_GET["tpic"] : "";
	
	if( $status == "insert" ){
		$sql = "INSERT INTO `ticket`( `uname`, `ttitle`, `tcity`, `twhere`, `tpic`) VALUES ('$uname','$ttitle','$tcity','$twhere','$tpic')";
		$row = mysql_query( $sql );
		if( $row ){
			echo 1;//添加成功
		}else{
			echo 0;//添加失败
		}
	}else if( $status == "delete" ){
		$sql = "DELETE FROM `ticket` WHERE `uname`='$uname'";
		mysql_query($sql);
		$row = mysql_affected_rows();
		if( $row ){
			echo 1;//成功
		}else{
			echo 0;//失败
		}
	}else if( $status == "update" ){
		$sql = "UPDATE `ticket` SET `ijoin`='$ijoin' WHERE `uname`='$uname'";
		mysql_query($sql);
		$row = mysql_affected_rows();
		if( $row ){
			echo 1;//成功
		}else{
			echo 0;//失败
		}
	}else if( $status == "select" ){
		$sql = "select * from ticket";
		$res = mysql_query($sql);
		$data = array();//空数组 用来存放从数据库查询出来的每一条数据 
		while( $arr = mysql_fetch_array( $res ) ) {
			$data[] = $arr;//把从数据库中查询出来的每一条数据存放到一个空数组中
		}
		echo json_encode( $data );
	}
?>