<?php
require("connect.php");
$userNum=isset($_GET['userNum'])? $_GET['userNum']:null;
$password=isset($_GET['password'])? $_GET['password']:null;
$sql="SELECT * FROM `user` WHERE phone='$userNum' and password='$password'";
$res=$conn -> query($sql);
$row = $res->fetch_assoc();
if($res->num_rows > 0){
    echo "登录成功";
}else{
    echo "fail";
}
?>
