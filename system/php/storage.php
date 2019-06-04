<?php
	include "public.php";
    $status = $_GET["status"];//控制功能选择
	// isset()  如果传递了参数 就返回true 没传递参数 就返回false
	$stitle =isset( $_GET["stitle"] ) ? $_GET["stitle"] : "";
	$stime =isset( $_GET["stime"] ) ? $_GET["stime"] : "";
	$swhere =isset( $_GET["swhere"] ) ? $_GET["swhere"] : "";
	$scity =isset( $_GET["scity"] ) ? $_GET["scity"] : "";
	$sval =isset( $_GET["sval"] ) ? $_GET["sval"] : "";
	$scontact =isset( $_GET["scontact"] ) ? $_GET["scontact"] : "";
	
	if( $status == "insert" ){
		$sql = "INSERT INTO `storage`( `stitle`, `stime`, `swhere`, `scity`, `sval`, `scontact`) VALUES ('$stitle','$stime','$swhere','$scity','$sval','$scontact')";
		$row = mysql_query( $sql );
		if( $row ){
			echo 1;//添加成功
		}else{
			echo 0;//添加失败
		}
	}else if( $status == "delete" ){
		$sql = "DELETE FROM `storage` WHERE `stitle`=$stitle";
		mysql_query($sql);
		$row = mysql_affected_rows();
		if( $row ){
			echo 1;//成功
		}else{
			echo 0;//失败
		}
	}else if( $status == "update" ){
		$sql = "UPDATE `storage` SET `stitle`='$stitle',`stime`='$stime',`swhere`='$swhere',`scity`='$scity',`sval`='$sval',`scontact`='$scontact' WHERE `stitle`=$stitle";
		mysql_query($sql);
		$row = mysql_affected_rows();
		if( $row ){
			echo 1;//成功
		}else{
			echo 0;//失败
		}
	}else if( $status == "select" ){
		$sql = "select * from storage";
		$res = mysql_query($sql);
		$data = array();//空数组 用来存放从数据库查询出来的每一条数据 
		while( $arr = mysql_fetch_array( $res ) ) {
			$data[] = $arr;//把从数据库中查询出来的每一条数据存放到一个空数组中
		}
		echo json_encode( $data );
	}
?>