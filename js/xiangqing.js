var box=document.querySelector('.goods-info')
//左上角用户名
var ckname=getCookie("name")
if(ckname){
    $('.replacename').html(ckname).css({"color":"black","font-size":"14px","border-right":'none'}).prop('href','')
    $('.null').html('退出').prop('href','')

    $('.null').click(function(){
        delCookie('name')
        location.href='./list.html';
    })
    
    //购物车数量
    var cartlist4=localStorage.getItem("cartlist4")
    cartlist4=JSON.parse(cartlist4)
    $('.goods-num').html(cartlist4.length).css({'color':'red','font-size':'15px'})
}else{
    alert('请先登录');
    location.href='./login.html';
}
    



var search1=location.search
var dt
// 判断地址栏是否有参数
if(search1){
    var ar1=search1.split("=")
    // 判断当前参数的值
    if(ar1[0]=='?id'){
        var id=ar1[1];
        
        (async function(){
            dt=await promiseAjax({
                url:'../php/xiangqing.php',
                data:'id='+id
            })
            
            // 字符串转为对象
            dt=eval('('+dt+')')
            var title=dt.title.trim();
            var price=dt.price.substr(1,dt.price.length-1) //截取字符串第二个到最后一个字符
            var num = dt.renshu.replace(/[^0-9]/ig,"");//忽略大小写，全局匹配
            var str=`
            <!-- 商品内容 -->
            <div class="goods-info">
                <div class="goods-info-content">
                    <p class="p1">冰箱</p>

                    <!-- 左边图片 -->
                    <div class="imgs">
                        <div class="big-img">
                            <img class="bigimg" style="width:400px;height: 400px;"  src="${dt.url}">
                            <!-- 遮罩层 -->
                            <div class="img-mask"></div>
                            <!-- 放大后的图 -->
                            <div class="img-fangda">
                                <img class="fangdaimg" style="width:800px;height: 800px;"  src="${dt.url}">
                            </div>
                        </div>
                            

                        <div class="small-img">
                            <ul>
                                <li>
                                    <img style="width:78px;height: 78px;" src="${dt.url}">
                                </li>
                                <li>
                                    <img style="width:78px;height: 78px;"  src="../img/baa3fbac-5e72-4aec-b750-4a9d6c3e3454.jpg" alt="">
                                </li>
                                <li>
                                    <img style="width:78px;height: 78px;"  src="../img/9ef2aeb3-ba6e-4fb9-bc98-794fe7ccde87.jpg" alt="">
                                </li>
                                <li>
                                    <img style="width:78px;height: 78px;"  src="../img/fdf5bf8d-cc2d-42f3-b34b-4949d61af61c.jpg" alt="">
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- 右边文字详情 -->
                    <div class="goods-word">
                        <p class="p1">${title}</p>
                        <ul>
                            <li class="l1">售价:</li>
                            <li style="color:red">￥${price}</li>
                        </ul><br/>
                        <ul>
                            <li class="l1">累计销售:</li>
                            <li style="color:orange">${num}件</li>
                        </ul><br/>
                        <ul>
                            <li class="l1">数量:</li>
                            <li>
                                <button class="num num1">+</button>
                                <input class="num num2" type="text" value=1> 
                                <button class="num num3">-</button>
                            </li>
                        </ul><br/>
                        <ul>
                            <button class="add">加入购物车</button>
                            <button class="buy">立即购买</button>
                        </ul>

                    </div>

                </div>
            </div>
            `
            box.innerHTML=str
            func()

        })()
    }else{
        alert('参数有误')
        location.href="./list.html"
    }
}else{
    alert('非法进入，请选择商品')
    location.href="./list.html"
}








function func(){
    var mask=document.querySelector('.img-mask')
    var imgbox=document.querySelector('.big-img')
    var fangda=document.querySelector('.img-fangda')
    var fangdaimg=document.querySelector('.fangdaimg')
    var bigimg=document.querySelector('.bigimg')


    imgbox.onmouseout=function(){
        fangda.style.display='none';
        mask.style.display='none';
    }
    imgbox.onmouseover=function(){
        fangda.style.display='block';
        mask.style.display='block';
    }
    imgbox.onmousemove=function(e){
        
        var boxw=imgbox.offsetWidth
        var boxh=imgbox.offsetHeight
        var maskw=mask.clientWidth
        var maskh=mask.clientHeight
    
        var sl=e.pageX-imgbox.offsetLeft
        var st=e.pageY-imgbox.offsetTop
    
        var fdl,fdt
        if(sl<=maskw/2){
            mask.style.left=0+'px'
        
        }
        if(st<=maskh/2){
            mask.style.top=0+'px'
    
        }
        if(sl>maskw/2&&sl<(boxw-maskw/2)){
            mask.style.left=(sl-maskw/2)+'px'
            
        }
        if(st>maskh/2&&st<(boxh-maskh/2)){
            mask.style.top=(st-maskh/2)+'px'
            
        }
        if(sl>=(boxw-maskw/2)){
            mask.style.left=(boxw-maskw)+'px'
            
        }
        if(st>=(boxh-maskh/2))mask.style.top=(boxh-maskh)+'px'
        fdl=parseInt(mask.style.left)
        fdt=parseInt(mask.style.top)
        fangdaimg.style.left=(-fdl)*2+'px'
        fangdaimg.style.top=(-fdt)*2+'px'
    }
        
    
    $('.small-img li').click(function(){
        $(this).css({'border':'1px solid black'}).siblings().css('border','none')
        var src1=$(this).children('img').prop('src')
        bigimg.setAttribute('src',src1)
        fangdaimg.setAttribute('src',src1)
    })
    
    $('.num1').click(function(){
        var number1=$('.num2').val()
        number1++
        $('.num2').val(number1)
    })
    $('.num3').click(function(){
        var number1=$('.num2').val()
        if(number1>1)number1--
        $('.num2').val(number1)
    })

    // 大盒子点击事件
    box.onclick=function(e){
        var e=e||window.event
        var target=e.target||e.srcElement
        if(target.innerHTML=='加入购物车'){
            if(ckname){
                // 获取localStorage中的cartlist4  
                var cartlist4=localStorage.getItem("cartlist4")||[]
                // 判断当前cartlist4是否存在
                if(cartlist4.length>0){
                    //把cartlist4转为数组对象
                    cartlist4=eval('('+cartlist4+')')
                    var bool=true //是否有相同的商品
                    // 遍历数组
                    cartlist4.forEach(item=>{
                        //遍历数组看是否已经有相同商品加入购物车
                        //有相同商品，则++
                        if(dt.id==item.id){
                            bool=false
                            var cnum=parseInt($('.num2').val())
                            item.cart_number=parseInt(item.cart_number)
                            item.cart_number+=cnum
                            localStorage.setItem("cartlist4",JSON.stringify(cartlist4))
                            alert('添加成功')
                        }
                    })
                        //数组中没有与现在加入的商品相同的商品，则添加一个当前商品的数据，设置数量为1
                    if(bool){
                        // 修改dt对象中的数量
                        var cnum=parseInt($('.num2').val())
                        dt.cart_number=cnum
                        cartlist4.push(dt)
                        localStorage.setItem("cartlist4",JSON.stringify(cartlist4))
                        alert('添加成功')
                        // 更新购物车按钮数据
                        $('.goods-num').html(cartlist4.length)
                    }
                }else{
                    var cnum=parseInt($('.num2').val())
                    dt.cart_number=cnum
                    cartlist4.push(dt)
                    localStorage.setItem("cartlist4",JSON.stringify(cartlist4))
                    alert('添加成功')
                }
            }else{
                alert("添加失败，请先登录")
                location.href="./login.html"
            }
        }

        if(target.innerHTML=='立即购买'){
            if(ckname){
                // 获取localStorage中的cartlist4  
                var cartlist4=localStorage.getItem("cartlist4")||[]
                // 判断当前cartlist4是否存在
                if(cartlist4.length>0){
                    //把cartlist4转为数组对象
                    cartlist4=eval('('+cartlist4+')')
                    var bool=true //是否有相同的商品
                    // 遍历数组
                    cartlist4.forEach(item=>{
                        //遍历数组看是否已经有相同商品加入购物车
                        //有相同商品，则++
                        if(dt.id==item.id){
                            bool=false
                            var cnum=parseInt($('.num2').val())
                            item.cart_number=parseInt(item.cart_number)
                            item.cart_number+=cnum
                            localStorage.setItem("cartlist4",JSON.stringify(cartlist4))
                            alert('选择成功，马上购买')
                            location.href='./cart.html';
                        }
                    })
                        //数组中没有与现在加入的商品相同的商品，则添加一个当前商品的数据，设置数量为1
                    if(bool){
                        // 修改dt对象中的数量
                        var cnum=parseInt($('.num2').val())
                        dt.cart_number=cnum
                        cartlist4.push(dt)
                        localStorage.setItem("cartlist4",JSON.stringify(cartlist4))
                        alert('选择成功，马上购买')
                        location.href='./cart.html';
                        // 更新购物车按钮数据
                        $('.goods-num').html(cartlist4.length)
                    }
                }else{
                    var cnum=parseInt($('.num2').val())
                    dt.cart_number=cnum
                    cartlist4.push(dt)
                    localStorage.setItem("cartlist4",JSON.stringify(cartlist4))
                    alert('选择成功，马上购买')
                    location.href='./cart.html';
                }
            }else{
                alert("选择失败，请先登录")
                location.href="./login.html"
            }
        }
    }
}
