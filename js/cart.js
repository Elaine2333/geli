var box=document.querySelector('.cart-list')
var cartlist4=localStorage.getItem("cartlist4")

var name1=getCookie("name")
// 判断是否已经登录
if(name1){
    cartlist4=eval('('+cartlist4+')')
    show()
}else{
    alert('未登录，请登录')
    // 获取当前地址栏信息，方便登录后直接跳转过来
    var url=location.href
    location.href='./login.html?newUrl='+url
}

function show(){
    if(cartlist4.length>0){
        cartlist4.forEach(item=>{
            item.is_select=0
        })
        localStorage.setItem("cartlist4",JSON.stringify(cartlist4))
        var str1=`
        <div class="cart-list">
        <div class="title">
            <ul class="goods-title">
                <li style="width:80px" class="first">
                    <input type="checkbox" class="quan">全选 
                </li>
                <li style="width:480px">
                    <span>商品信息</span> 
                </li>
                <li style="width:130px"><span>单价</span></li>
                <li style="width:130px"><span>数量</span></li>
                <li style="width:130px"><span>合计</span></li>
                <li style="width:130px"><span>操作</span></li>
            </ul>
        `
        cartlist4.forEach(item=>{
            var title=item.title.trim();
            var price=item.price.substr(1,item.price.length-1) //截取字符串第二个到最后一个字符
            var num = item.renshu.replace(/[^0-9]/ig,"");//忽略大小写，全局匹配
            var size=item.cart_number
            
            str1+=`
                <ul class="goods-ul" data-id="${item.id}">
                <li style="width:80px" class="first">
                    <input type="checkbox" class="xuan"> 
                </li>
                <li style="width:480px">
                    <div class="li-left-img">
                        <img style="width:66px;height: 66px;" src="${item.url}" alt="">
                    </div>
                    <div class="li-right-info">
                        <p>${title}</p>
                    </div>
                </li>
                <li style="width:130px" class="danjia">￥${price}</li>
                <li style="width:130px">
                    <button class="num num1">+</button>
                    <input class="num num2" type="text" value="${size}"> 
                    <button class="num num3">-</button>
                </li>
                <li style="width:130px" class="heji">￥${size*price}</li>
                <li style="width:130px"><a href="javascript:;"  class="del">[删除]</a> </li>
            </ul>
            `
            str1+=`</div></div>`

            box.innerHTML=str1;
        })
    }else{
        var str2=`
        <div class="cart-list">
        <div class="title">
            <ul class="goods-title">
                <li style="width:80px" class="first">
                &nbsp;
                </li>
                <li style="width:480px">
                    <span>商品信息</span> 
                </li>
                <li style="width:130px"><span>单价</span></li>
                <li style="width:130px"><span>数量</span></li>
                <li style="width:130px"><span>合计</span></li>
                <li style="width:130px"><span>操作</span></li>
            </ul>
            <ul class="goods-ul" style="height:200px;width:400px;margin:100px auto;">
            <h1>空空如也</h1>
            <h3>快去选购心仪的商品吧~</h3>
            </ul>
        </div>
        </div>
        `
        
        box.innerHTML=str2;
    }
}






// 全选按钮

$(document).on("change",'.quan',function(){
    // console.log($(this),$('.quan').prop('checked'))
    $('.xuan,.quan').prop('checked',$('.quan').prop('checked'))

    cartlist4.forEach(item=>{
        if($('.quan').prop('checked')==true){
            item.is_select=1
        }
        else item.is_select=0
    })

    localStorage.setItem("cartlist4",JSON.stringify(cartlist4))

    sum1()

    //已选中多少件商品
    $('.num-check').html($('.xuan:checked').length)
})

//单选按钮
$(document).on("change",'.xuan',function(){
    

    var id1=$(this).parents('.goods-ul').attr('data-id')
    // 筛选出id不一样的数据
    cartlist4.forEach(item=>{
        if(item.id==id1){
            if(item.is_select!=1)item.is_select=1
            else item.is_select=0
        }
    })
    localStorage.setItem("cartlist4",JSON.stringify(cartlist4))
    //show()   //!!!为什么不能show一下
    sum1()

    //已选中多少件商品
    $('.num-check').html($('.xuan:checked').length)

    var len1=cartlist4.length
    var len2=$('.xuan:checked').length
    if(len1==len2){
        $('.quan').prop('checked',true)
    }else $('.quan').prop('checked',false)
})



// +号按钮
$(document).on('click','.num1',function(){
    
    var id=$(this).parents('.goods-ul').attr('data-id')
    cartlist4.forEach(item=>{
        if(item.id==id){
            item.cart_number++
        }
    })
    localStorage.setItem("cartlist4",JSON.stringify(cartlist4))

    show()
    sum1();
 
}) 






// -号按钮
$(document).on('click','.num3',function(){
    var id=$(this).parents('.goods-ul').attr('data-id')
    cartlist4.forEach(item=>{
        if(item.id==id){
            if(item.cart_number>1)item.cart_number--
        }
    })
    localStorage.setItem("cartlist4",JSON.stringify(cartlist4))
    show()
    sum1();

    
}) 


//输入框修改数量
$(document).on('change','.num2',function(){
    var id=$(this).parents('.goods-ul').attr('data-id')
    cartlist4.forEach(item=>{
        if(item.id==id){
            item.cart_number= $(this).val()
        }
    })
    localStorage.setItem("cartlist4",JSON.stringify(cartlist4))
    show()
    sum1();
})


// 删除按钮
$(document).on("click",".del",function(){
    if(confirm("确认删除以下商品吗？")){
        var id1=$(this).parents('.goods-ul').attr('data-id')
        // 筛选出id不一样的数据
        cartlist4=cartlist4.filter(item=>{
            return item.id!=id1
        })
        localStorage.setItem("cartlist4",JSON.stringify(cartlist4))
        show() 

        //已选中多少件商品
        $('.num-check').html($('.xuan:checked').length)
    }
    

})

// 批量删除
$(document).on("click",".del-check",function(){
    if(confirm("确认批量删除以下商品吗？")){
        cartlist4=cartlist4.filter(item=>{
            return item.is_select!=1
        })
        localStorage.setItem("cartlist4",JSON.stringify(cartlist4))
        show()
        sum1();

        //已选中多少件商品
        $('.num-check').html($('.xuan:checked').length)
    }
    
})


//结算
$(document).on('click','.buy-all',function(){
    alert("你已支付："+$('.zongji').html())
    //过滤不满足条件的商品
    cartlist4=cartlist4.filter(item=>{
        return item.is_select!=1
    })
    //把修改完毕的cartList4重新存储在localStorage中
    localStorage.setItem("cartlist4",JSON.stringify(cartlist4))
    show()
    sum1()

    //已选中多少件商品
    $('.num-check').html($('.xuan:checked').length)
})
    


var sum1=function(){
    var money=0;
    $('.xuan:checked').each(function(){
        money+=parseFloat($(this).parent().parent().children('.heji').html().substr(1))
    })
    money=money.toFixed(2)
    $('.zongji').html(money)
}


//左上角用户名
var ckname=getCookie("name")
if(ckname){
    $('.replacename').html(ckname).css({"color":"black","font-size":"14px","border-right":'none'}).prop('href','')
    $('.null').html('退出').prop('href','')
    
    $('.null').click(function(){
        delCookie('name')
        location.href='./cart.html';
    })
}