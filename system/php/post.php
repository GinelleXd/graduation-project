<?php
    include "public.php";
    $status = $_GET["status"];//控制功能选择
	// isset()  如果传递了参数 就返回true 没传递参数 就返回false
	$ititle =isset( $_GET["ititle"] ) ? $_GET["ititle"] : "";
	$pid =isset( $_GET["pid"] ) ? $_GET["pid"] : "";
	$ptime =isset( $_GET["ptime"] ) ? $_GET["ptime"] : "";
	$portrait =isset( $_GET["portrait"] ) ? $_GET["portrait"] : "";
	$pcontent =isset( $_GET["pcontent"] ) ? $_GET["pcontent"] : "";
	
	if( $status == "insert" ){
		$sql = "INSERT INTO `post`( `ititle`, `pid`, `ptime`, `portrait`, `pcontent`) VALUES ('$ititle','$pid','$ptime','$portrait','$pcontent')";
		$row = mysql_query( $sql );
		if( $row ){
			echo 1;//添加成功
		}else{
			echo 0;//添加失败
		}
	}else if( $status == "delete" ){
		$sql = "DELETE FROM `post` WHERE `ititle`='$ititle'";
		mysql_query($sql);
		$row = mysql_affected_rows();
		if( $row ){
			echo 1;//成功
		}else{
			echo 0;//失败
		}
	}else if( $status == "update" ){
		$sql = "UPDATE `post` SET `aportrait`='$aportrait' WHERE `ititle`='$ititle'";
		mysql_query($sql);
		$row = mysql_affected_rows();
		if( $row ){
			echo 1;//成功
		}else{
			echo 0;//失败
		}
	}else if( $status == "select" ){
		$sql = "select * from post";
		$res = mysql_query($sql);
		$data = array();//空数组 用来存放从数据库查询出来的每一条数据 
		while( $arr = mysql_fetch_array( $res ) ) {
			$data[] = $arr;//把从数据库中查询出来的每一条数据存放到一个空数组中
		}
		echo json_encode( $data );
	}
?>