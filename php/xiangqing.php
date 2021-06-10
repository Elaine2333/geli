<?php
include "./datas.php";
$id=$_GET['id'];

$sql="select * from goods1 where id=$id";
$result=mysqli_query($link,$sql);
// 获取结果集中的数据
$row=mysqli_fetch_assoc($result);
// 数组转为字符串，响应给浏览器
echo json_encode($row);

mysqli_close($link);

?>