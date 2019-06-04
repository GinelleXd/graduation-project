<?php
	include "public.php";
	$status = $_GET["status"];//控制功能选择
	// isset()  如果传递了参数 就返回true 没传递参数 就返回false
	$id =isset( $_GET["id"] ) ? $_GET["id"] : "";
	$content =isset( $_GET["content"] ) ? $_GET["content"] : "";
	$where =isset( $_GET["where"] ) ? $_GET["where"] : "";
	$idea =isset( $_GET["idea"] ) ? $_GET["idea"] : "";
	
	if( $status == "insert" ){
		$sql = "INSERT INTO `wrongtable`( `icontent`, `iwhere`, `idea`) VALUES ('$content','$where','$idea')";
		$row = mysql_query( $sql );
		if( $row ){
			echo 1;//添加成功
		}else{
			echo 0;//添加失败
		}
	}else if( $status == "delete" ){
		$sql = "DELETE FROM `wrongtable` WHERE `id`=$id";
		mysql_query($sql);
		$row = mysql_affected_rows();
		if( $row ){
			echo 1;//成功
		}else{
			echo 0;//失败
		}
	}else if( $status == "update" ){
		$sql = "UPDATE `wrongtable` SET `icontent`='$content',`iwhere`='$where',`idea`='$idea' WHERE `id`=$id";
		mysql_query($sql);
		$row = mysql_affected_rows();
		if( $row ){
			echo 1;//成功
		}else{
			echo 0;//失败
		}
	}else if( $status == "select" ){
		$sql = "select * from wrongtable";
		$res = mysql_query($sql);
		$data = array();//空数组 用来存放从数据库查询出来的每一条数据 
		while( $arr = mysql_fetch_array( $res ) ) {
			$data[] = $arr;//把从数据库中查询出来的每一条数据存放到一个空数组中
		}
		echo json_encode( $data );
	}
?>