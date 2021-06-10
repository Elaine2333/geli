 <?php
include "./datas.php";

$sql='select * from goods1';
$result=mysqli_query($link,$sql);

// 创建存放数据的数组
$arr=array();
// 遍历结果集中的数据
while($row=mysqli_fetch_assoc($result)){
    array_push($arr,$row);
}

echo json_encode($arr);
mysqli_close($link);


?> 