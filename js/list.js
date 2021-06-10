var goods=document.querySelector('.goods-list-goods')
var pagination=document.querySelector('.pagination')
var mokuai=document.querySelector('.goods-mokuai')
var arr;
var dt;
var goods_numder=0
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
    $('.goods-num').html(cartlist4.length).css({'color':'red','font-size':'15px'});
}


(async function () {
    arr=await promiseAjax({
        url:'../php/list.php'
    })
    arr=eval('('+arr+')');
    arr.forEach(item=>{
        var price=item.price.substr(1)
        var renshu = item.renshu.replace(/[^0-9]/ig,"");//忽略大小写，全局匹配
        item.price=price
        item.renshu=renshu
    })

    function modle(){
         // 配置传入的对象信息
        var o1={
            pageInfo:{
                pagenum:1,
                pagesize:12,
                totalsize:arr.length,
                totalpage:Math.ceil(arr.length/12)
            },
            textInfo:{
                first:"首页",
                prev:"上一页",
                next:"下一页",
                last:"尾页"
            }
        }

        // 实例化分页器
        new Pagination(pagination,o1,(m)=>{
            //通过页码，来进行分页数据显示
            var arr2=arr.slice((m-1)*12,m*12)
            //创建字符串，拼接所有数据
            var str=''
            //遍历数组中的数据
        
            arr2.forEach(item => {
                goods_numder=item.id;
                var title=item.title.trim();
                var price=item.price //截取字符串第二个到最后一个字符
                var num = item.renshu.replace(/[^0-9]/ig,"");//忽略大小写，全局匹配
                str+=`
                <div class="goods-mokuai" data-id=${item.id}>

                <p><a href="./xiangqing.html?id=${item.id}"  role="button"><img src="${item.url}"></a></p>

                <p class="p1"><a href="./xiangqing.html?id=${item.id}"  role="button">${title}</a></p>
                
                <p class="money">￥<span>${price}</span></p>
                <p>已有<span class="money1">${num}</span>人购买</p>
                <button type="button">加入购物车</button>
                
            </div>
                `
            
                
            });
            goods.innerHTML=str;

            $('.goods-mokuai').click(function(){
            
                var id1=$(this).attr('data-id')

                ajax({
                    url:'../php/xiangqing.php',
                    data:'id='+id1,
                    success:function(dt){
                        // 字符串转为对象
                        dt=eval('('+dt+')')
                        console.log(dt)
                        var title=dt.title.trim();
                        var price=dt.price //截取字符串第二个到最后一个字符
                        var num = dt.renshu.replace(/[^0-9]/ig,"");
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
                                        item.cart_number++
                                        localStorage.setItem("cartlist4",JSON.stringify(cartlist4))
                                        alert("添加成功")
                                    }
                                })
                                    //数组中没有与现在加入的商品相同的商品，则添加一个当前商品的数据，设置数量为1
                                if(bool){
                                    // 修改dt对象中的数量
                                    dt.cart_number=1
                                    cartlist4.push(dt)
                                    localStorage.setItem("cartlist4",JSON.stringify(cartlist4))
            
                                    // 更新购物车按钮数据
                                    $('.goods-num').html(cartlist4.length)
                                    alert("添加成功")
                                }
                            }else{
                                dt.cart_number=1
                                cartlist4.push(dt)
                                localStorage.setItem("cartlist4",JSON.stringify(cartlist4))
                                alert("添加成功")
                            }
                        }else{
                            alert("请先登录")
                            location.href="./login.html"
                        }
                    }
                })
                
            })



        })
    }
   
    //默认的数据引入
    modle()

    
    
    // 销量由高到低的排序
    $('.num-less').click(function(){
        arr.sort(function(a,b){
            return b.renshu - a.renshu
        })
       modle()

    })


    // 销量由低到高的排序
    $('.num-higher').click(function(){
        arr.sort(function(a,b){
            return a.renshu - b.renshu
        })
        modle()
    })
   

    // 价格由高到低的排序
    $('.price-less').click(function(){
        arr.sort(function(a,b){
            return b.price - a.price
        })
        modle()
    })

    // 价格由高到低的排序
    $('.price-higher').click(function(){
        arr.sort(function(a,b){
            return a.price - b.price
        })
        modle()
    })
    
    
    $('.sale-num').mousemove(function(){
        $(this).children('.num-select').css('display','block')
        $(this).css('background','pink')
    }) 
    $('.sale-num').mouseout(function(){
        $(this).children('.num-select').css('display','none')
        $(this).css('background','')
    })  
    $('.sale-price').mousemove(function(){
        $(this).children('.price-select').css('display','block')
        $(this).css('background','pink')
    }) 
    $('.sale-price').mouseout(function(){
        $(this).children('.price-select').css('display','none')
        $(this).css('background','')
    }) 
    
    $('.goods-mokuai').mousemove(function(){
        $(this).css('border','1px solid #999').siblings().css('border','none')
    })
    $('.goods-mokuai').mouseout(function(){
        $(this).css('border','none')
    })
    

    $('.ku-num').html(goods_numder)
})()


