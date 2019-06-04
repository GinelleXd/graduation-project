<?php
    include "public.php";
    $status = $_GET["status"];//控制功能选择
	// isset()  如果传递了参数 就返回true 没传递参数 就返回false
	$atitle =isset( $_GET["atitle"] ) ? $_GET["atitle"] : "";
	$aid =isset( $_GET["aid"] ) ? $_GET["aid"] : "";
	$atime =isset( $_GET["atime"] ) ? $_GET["atime"] : "";
	$asort =isset( $_GET["asort"] ) ? $_GET["asort"] : "";
	$acontent =isset( $_GET["acontent"] ) ? $_GET["acontent"] : "";
	
	if( $status == "insert" ){
		$sql = "INSERT INTO `article`( `atitle`, `aid`, `atime`, `asort`, `acontent`) VALUES ('$atitle','$aid','$atime','$asort','$acontent')";
		$row = mysql_query( $sql );
		if( $row ){
			echo 1;//添加成功
		}else{
			echo 0;//添加失败
		}
	}else if( $status == "delete" ){
		$sql = "DELETE FROM `article` WHERE `atitle`='$atitle'";
		mysql_query($sql);
		$row = mysql_affected_rows();
		if( $row ){
			echo 1;//成功
		}else{
			echo 0;//失败
		}
	}else if( $status == "update" ){
		$sql = "UPDATE `article` SET `aportrait`='$aportrait' WHERE `atitle`='$atitle'";
		mysql_query($sql);
		$row = mysql_affected_rows();
		if( $row ){
			echo 1;//成功
		}else{
			echo 0;//失败
		}
	}else if( $status == "select" ){
		$sql = "select * from article";
		$res = mysql_query($sql);
		$data = array();//空数组 用来存放从数据库查询出来的每一条数据 
		while( $arr = mysql_fetch_array( $res ) ) {
			$data[] = $arr;//把从数据库中查询出来的每一条数据存放到一个空数组中
		}
		echo json_encode( $data );
	}
?>