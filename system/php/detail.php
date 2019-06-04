<?php
    include "public.php";
    $status = $_GET["status"];//控制功能选择
	// isset()  如果传递了参数 就返回true 没传递参数 就返回false
	$ititle =isset( $_GET["ititle"] ) ? $_GET["ititle"] : "";
	$iphoto =isset( $_GET["iphoto"] ) ? $_GET["iphoto"] : "";
	$itime =isset( $_GET["itime"] ) ? $_GET["itime"] : "";
	$iwhere =isset( $_GET["iwhere"] ) ? $_GET["iwhere"] : "";
	$icity =isset( $_GET["icity"] ) ? $_GET["icity"] : "";
	$ival =isset( $_GET["ival"] ) ? $_GET["ival"] : "";
	$ijoin =isset( $_GET["ijoin"] ) ? $_GET["ijoin"] : "";
	
	if( $status == "insert" ){
		$sql = "INSERT INTO `details`( `ititle`, `iphoto`, `itime`, `iwhere`, `icity`, `ival`) VALUES ('$ititle','$iphoto','$itime','$iwhere','$icity','$ival')";
		$row = mysql_query( $sql );
		if( $row ){
			echo 1;//添加成功
		}else{
			echo 0;//添加失败
		}
	}else if( $status == "delete" ){
		$sql = "DELETE FROM `details` WHERE `ititle`='$ititle'";
		mysql_query($sql);
		$row = mysql_affected_rows();
		if( $row ){
			echo 1;//成功
		}else{
			echo 0;//失败
		}
	}else if( $status == "update" ){
		$sql = "UPDATE `details` SET `ijoin`='$ijoin' WHERE `ititle`='$ititle'";
		mysql_query($sql);
		$row = mysql_affected_rows();
		if( $row ){
			echo 1;//成功
		}else{
			echo 0;//失败
		}
	}else if( $status == "select" ){
		$sql = "select * from details";
		$res = mysql_query($sql);
		$data = array();//空数组 用来存放从数据库查询出来的每一条数据 
		while( $arr = mysql_fetch_array( $res ) ) {
			$data[] = $arr;//把从数据库中查询出来的每一条数据存放到一个空数组中
		}
		echo json_encode( $data );
	}
?>