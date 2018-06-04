<?php
    require('connect.php');
    $id=isset($_GET['id'])? $_GET['id'] : 1;
    $sql="SELECT * FROM `goodslist` where id=$id";
    $result = $conn->query($sql);
    $res = $result ->fetch_assoc();
    if($result->num_rows >0){
        echo json_encode($res,JSON_UNESCAPED_UNICODE);
    }else{
        echo "fail";
    }
?>