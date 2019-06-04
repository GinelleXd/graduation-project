<?php
    header("content-type:text/html;charset=utf-8");
    header("Access-Control-Allow-Origin:*");//表示任何域下都可以访问该接口
    $db = mysql_connect("localhost","root","root");
    mysql_select_db( "system" , $db );
    mysql_query("set names utf8");
?>