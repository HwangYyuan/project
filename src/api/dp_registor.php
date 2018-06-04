<?php
require("connect.php");
$phone=isset($_GET['phone'])? $_GET['phone']:null;
$password=isset($_GET['password'])? $_GET['password']:null;
$sql="SELECT * FROM `user` WHERE phone='$phone'";
$res=$conn -> query($sql);
$row=$res->fetch_all(MYSQLI_ASSOC);
if($row){
    echo "exist";
}else{
        $sql="INSERT INTO `user`(`phone`, `password`) VALUES ('$phone','$password')";
        $result=$conn -> query($sql);
        if($result){
                echo 'success';
            }else{
                echo 'fail';
            }
    }
//关闭数据库
$conn ->close();
?>