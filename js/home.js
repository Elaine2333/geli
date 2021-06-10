//左上角用户名
var ckname=getCookie("name")
if(ckname){
    $('.replacename').html(ckname).css({"color":"black","font-size":"14px","border-right":'none'}).prop('href','')
    $('.null').html('退出').prop('href','')
    
    $('.null').click(function(){
        delCookie('name')
        location.href='./home.html';
    })
    //购物车数量
    var cartlist4=localStorage.getItem("cartlist4")
    cartlist4=JSON.parse(cartlist4)
    $('.goods-num').html(cartlist4.length).css({'color':'red','font-size':'15px'})
}


var a=0,b=0;
// console.log($(".banner-img").innerWidth())
function move(){
    a++;
    if(a>2)a=0;
    $('.banner-img>img').eq(a).css("left","100%");
    $('.banner-img>img').eq(a).stop().animate({left:0},1500);
    $('.banner-img>img').eq(b).stop().animate({left:'-100%'},1500);

    $('.banner-img li').eq(a).attr('class','full')
    $('.banner-img li').eq(b).attr('class','')

    b=a;
}
var dsq=setInterval(move,3000)


$(".banner-img").mousemove(function(){
    clearInterval(dsq)
})
$(".banner-img").mouseout(function(){
    dsq=setInterval(move,3000)
})

$(".banner-img li").click(function(){
    if($(this).index()-a==2){
        $('.i2').css('left','100%').next('.i3').css('left','100%');
        $('.i2').animate({left:'-100%'},1500,function(){
            $('.i3').animate({left:0},1500)
        })
    }
    a=$(this).index()  
    a--;
    move()
})


$('.banner-list li').mouseover(function(){
    $(this).next('.banner-mask').css('display','block')
})
$('.banner-mask').mouseover(function(){
    $(this).css('display','block')
})
$('.banner-list li').mouseout(function(){
    $(this).next('.banner-mask').css('display','none')
})
$('.banner-mask').mouseout(function(){
    $(this).css('display','none')
})

window.onscroll=function(){
    var top=$(window).scrollTop();
    if(top>=1200&&top<=5800){
        $('.fixed').css({'display':'block'})
        if(top>=1500&&top<2130){
            $('.first-f').css({'background':'pink'}).siblings('li').css({'background':'white'})
        }
        else if(top>=2130&&top<2780){
            $('.second-f').css({'background':'pink'}).siblings('li').css({'background':'white'})
        }
        else if(top>=2780&&top<3400){
            $('.third-f').css({'background':'pink'}).siblings('li').css({'background':'white'})
        }
        else if(top>=3400&&top<4050){
            $('.fourth-f').css({'background':'pink'}).siblings('li').css({'background':'white'})
        }
        else if(top>=4050&&top<4680){
            $('.fifth-f').css({'background':'pink'}).siblings('li').css({'background':'white'})
        }
        else if(top>=4680&&top<5310){
            $('.sixth-f').css({'background':'pink'}).siblings('li').css({'background':'white'})
        }
        else if(top>=5310&&top<5800){
            $('.seven-f').css({'background':'pink'}).siblings('li').css({'background':'white'})
        }
    }else{
        $('.fixed').css({'display':'none'})
    }

    $('.first-f').click(function(){
        $(window).scrollTop(1500)
        $(this).css({'background':'pink'}).siblings('li').css({'background':'white'})
    })
    $('.second-f').click(function(){
        $(window).scrollTop(2150)
        $(this).css({'background':'pink'}).siblings('li').css({'background':'white'})
    })
    $('.third-f').click(function(){
        $(window).scrollTop(2800)
        $(this).css({'background':'pink'}).siblings('li').css({'background':'white'})
    })
    $('.fourth-f').click(function(){
        $(window).scrollTop(3420)
        $(this).css({'background':'pink'}).siblings('li').css({'background':'white'})
    })
    $('.fifth-f').click(function(){
        $(window).scrollTop(4070)
        $(this).css({'background':'pink'}).siblings('li').css({'background':'white'})
    })
    $('.sixth-f').click(function(){
        $(window).scrollTop(4700)
        $(this).css({'background':'pink'}).siblings('li').css({'background':'white'})
    })
    $('.seven-f').click(function(){
        $(window).scrollTop(5330)
        $(this).css({'background':'pink'}).siblings('li').css({'background':'white'})
    })
}
