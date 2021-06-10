<?php
include "./datas.php";
$u=$_GET['username'];
$p=$_GET['password'];

$sql="select * from users where username='$u' and password='$p'";
$result=mysqli_query($link,$sql);
if($row=mysqli_fetch_row($result)){
    echo "1";
}else{
    echo "0";
}
mysqli_close($link)
?>