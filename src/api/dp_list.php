<?php
    require('connect.php');
    $qty = isset($_GET['qty']) ? $_GET['qty'] : 16;
    // $type=isset($_GET['type'])? $_GET['type'] : null;
    $page = isset($_GET['page']) ? $_GET['page'] : 1;
    $min = $qty*($page-1)+1;
    $data = array();
    // echo $data;
    $sql = "select * from goodslist limit $min ,16";
    $result= $conn->query($sql);
    while($row = mysqli_fetch_array($result)){
        $data[]=$row;
    }
    echo json_encode($data);
?>