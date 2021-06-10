<?php
include "./datas.php";
$u=$_GET['username'];
$p=$_GET['password'];

$sql="insert into users (username,password) values ('$u','$p')";
$result=mysqli_query($link,$sql);
if($result){
    echo "1";
}else{
    echo "0";
}
mysqli_close($link)
?>