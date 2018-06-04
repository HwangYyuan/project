<?php
    require('connect.php');
    $qty = isset($_GET['qty']) ? $_GET['qty'] : null;
    $type = isset($_GET['type']) ? $_GET['type'] : null;
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    //判断类型是加，判断是否有一样的id，有的话，改变数量
    if($type==='add'){
        $sql = "update car set qty='$qty' where id='$id'";
        $res = $conn->query($sql);
    }
    //判断类型是减，如果id一致，数量减少
    if($type==='reduce'){
        $sql = "update car set qty='$qty' where id='$id'";
        $res = $conn->query($sql);
    }
    //判断类型是否删除，将整个列数据删除
    if($type==='delete'){
        $sql = "delete from car where id='$id'";
        $res = $conn->query($sql);
    }
    $sql = "select * from car";
    $result = $conn->query($sql);
    $data = array();
    while($row = mysqli_fetch_array($result)){
        $data[]=$row;
    }
    echo json_encode($data);
    $conn->close();
?>