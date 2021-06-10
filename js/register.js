var form=document.querySelector('form')
var user=document.querySelector('.user')
var psw=document.querySelector('.pwd1')
var psw2=document.querySelector('.pwd2')
var tel=document.querySelector('.phone')
var span=document.querySelectorAll('p')
var zhuce=document.querySelector('.zhuce')
var user5=false
var psw5=false
var psw25=false
var tel5=false
var email5=false
var date5=false
var id5=false
var span5=false

// 用户名
user.onblur=function(){
    var value1=this.value
    var reg=/^[a-z0-9_-]{3,16}$/
    if(reg.test(value1)){
        $(this).next('p').html('√')
        user5=true
    }else{
        $(this).next('p').html('×')
        user5=false
    }
}


// 密码
psw.onblur=function(){
    var value1=this.value
    var reg=/^\w{6,15}$/
    if(reg.test(value1)){
        psw5=true
        var a=0
        var b=0;
        var c=0;
        var d=0;
        for(var i=0;i<value1.length;i++){
            
            if(value1[i]>='a'&& value1[i]<='z')a=1;
            else if(value1[i]>='1'&&value1[i]<='9') b=1;
            else if(value1[i]>='A' && value1[i]<='Z') c=1;
            else  d=1;
            

        }
        var e=parseInt(a+b+c+d)
        if(e==1)span[1].innerHTML='密码安全等级低'
        else if(e==2||e==3)span[1].innerHTML='密码安全等级中'
        else if(e==4)span[1].innerHTML='密码安全等级高'
    }
    else{
        span[1].innerHTML='×'
        psw5=false
    }
}



psw2.onblur=function(){
    var value1=this.value
    if(value1===psw.value){
        var reg=/^\w{6,15}$/
        if(reg.test(value1)){
            span[2].innerHTML='√'
            psw25=true
        }

        else{
        span[2].innerHTML='×'
        psw25=false

    }
    }
    else{
        span[2].innerHTML='密码不一致'
        psw25=false
    }
}

   // 电话
    tel.onblur=function(){
    var value1=this.value
    var reg=/^1[3-8][0-9]{9}$/
    if(reg.test(value1)){
        span[3].innerHTML='√'
        tel5=true
    }else{
        span[3].innerHTML='×'
        tel5=false
    }
}
zhuce.onclick=function(){
    if(user5 && psw5 && psw25 && tel5){
        var u1=$('.user').val();
        var p1=$('.pwd1').val();
        $.ajax({
            url:'../php/register.php',
            data:`username=${u1}&password=${p1}`,
            success(dt){
                if(dt==1){
                    alert('注册成功')
                    location.href='../pages/login.html'
                }
                else alert('注册失败1');
            },
            error(){
                alert('注册失败2')
            }
        
    })
    }
          
}

       

