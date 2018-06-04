<?php
 $servername="localhost";
 $username="yuyuan";
 $password="12356";
 $dbname="dolphin";
 //创建连接
 $conn=new mysqli($servername,$username,$password,$dbname);
//判断是否连接成功
 if($conn -> connect_error){
    die("连接失败:".$conn -> connect_error);
 }
 $conn -> set_charset("utf8");
 // echo "连接成功";
?>