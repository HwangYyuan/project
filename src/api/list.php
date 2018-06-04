<?php
require("connect.php");
    $sql="select * from goodslist";
   $result = $conn->query($sql);
   $res = $result->num_rows;
   echo $res;
?>