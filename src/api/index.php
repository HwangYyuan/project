<?php
require("connect.php");
$type=isset($_GET['type'])? $_GET['type'] : null;
   $sql="SELECT * FROM `goodslist` where type='$type'";
    $res=$conn -> query($sql);
    $row=$res->fetch_all(MYSQLI_ASSOC);
    echo json_encode($row,JSON_UNESCAPED_UNICODE);

?>