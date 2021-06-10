var search1=location.search

$("button").click(function(){
    var u1=$('.user').val();
    var p1=$('.pwd').val();
    ajax({
        url:'../php/login.php',
        data:`username=${u1}&password=${p1}`,
        success(dt){
            console.log(dt)
            if(dt==1){
                // 保存账号
                setCookie('name',u1)
                // 判断当前search是否有值
                if(search1){
                    var url1=search1.split('=')[1]
                    location.href=url1
                }else{
                    location.href='./home.html'
                }
            }
            else alert('登录失败1');
        },
        error(){
            alert('登录失败2')
        }
        
    })
})