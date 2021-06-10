//创建分页器的构造函数
function Pagination(ele,options,cb){
    //创建实例化属性
    this.ele=ele  //操作的对象
    this.options=options||{}  //页码对象信息传入
    this.cb=cb||function(){}    //页码开始的页数(一般是1)
    //创建默认属性
    this.default={
        //数据信息
        pageInfo:{
            pagenum:1, //当前页
            pagesize:10,//每页显示的条数
            totalsize:130,//总条数
            totalpage:13 //总页数
        },
        //文本信息
        textInfo:{
            first:"first", //首页
            prev:"prev", //上一页
            list:"",  //页码
            next:"next", //下一页
            last:"last" //尾页
        }
    }
    this.list=null //存放所有页码
    //调用入口函数
    this.init()
}
//创建入口函数
Pagination.prototype.init=function(){
    //调用替换参数的方法
    this.replace1()
    //显示大盒子中的信息
    this.showBox()
    //给大盒子对象添加点击事件
    this.clickBox()
}
//使用传入的参数去替换默认参数
Pagination.prototype.replace1=function(){
    //判断传入的参数中是否存在pageinfo
    if(this.options.pageInfo){
        //使用传入的参数替换默认参数
        for(let attr in this.options.pageInfo){
            //把传入的参数赋值给对应默认参数中的指定位置
            this.default.pageInfo[attr]=this.options.pageInfo[attr]
        }
    }

    if(this.options.textInfo){
        for(let attr in this.options.textInfo){
            this.default.textInfo[attr]=this.options.textInfo[attr]
        }
    }
}
//把数据信息放在大盒子中
Pagination.prototype.showBox=function(){
    //清空大盒子中的内容
    this.ele.innerHTML=''
    //给大盒子对象设置为弹性盒子
    setStyle(this.ele,{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    })
    //显示文本信息
    this.showText()
    //显示页码信息
    this.showP()
    //给大盒子中设置禁用按钮
    this.stop1()
    //显示按钮信息
    this.showBtn()
    //调用回调函数
    this.cb(this.default.pageInfo.pagenum)
}
//创建按钮
Pagination.prototype.showBtn=function(){
    //创建输入框对象
    var inp=document.createElement("input")
    //给输入框添加文本
    inp.value=this.default.pageInfo.pagenum
    //给输入框对象设置样式
    setStyle(inp,{
        width:"30px",
        lineHeight:"20px"
    })
    //把当前输入框追加到大盒子中
    this.ele.appendChild(inp)
    //创建按钮对象
    var btn=document.createElement("button")
    //给按钮设置文本
    btn.innerHTML="GO"
    //给按钮设置样式
    setStyle(btn,{
        width:"30px",
        lineHeight:"20px"
    })
    //把按钮追加到大盒子中
    this.ele.appendChild(btn)

}
//禁用
Pagination.prototype.stop1=function(){
    //获取当前页码
    var pagenum=this.default.pageInfo.pagenum
    //获取最大页码
    var totalpage=this.default.pageInfo.totalpage
    //获取大盒子对象中所有的子div对象
    var divs=this.ele.children
    //判断当前页是否为第一页
    if(pagenum==1){
        divs[0].style.backgroundColor="#666"
        divs[1].style.backgroundColor="#666"
    }

    if(pagenum==totalpage){
        divs[3].style.backgroundColor="#666"
        divs[4].style.backgroundColor="#666"
    }
}
//显示文本信息
Pagination.prototype.showText=function(){
    //获取默认参数中的文本内容
    let textInfo=this.default.textInfo
    //遍历当前对象中的键值对
    for(var attr in textInfo){
        //创建div对象
        var newDiv=document.createElement("div")
        //给当前div对象添加class属性值
        newDiv.className=attr
        //判断当前attr是否等于list
        if(attr=="list"){
            this.list=newDiv
            //给当前页码盒子设置为弹性盒子
            setStyle(newDiv,{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            })
        }else{
            setStyle(newDiv,{
                border:"1px solid #333",
                margin:"0px 1px",
                padding:"2px 5px"
            })
            //给新的div对象添加文本
            newDiv.innerHTML=textInfo[attr]
        }
        //把新的div对象追加到大盒子中
        this.ele.appendChild(newDiv)
    }
}
//显示页码信息
Pagination.prototype.showP=function(){
    //获取默认参数中的当前页和总页数
    var pagenum=this.default.pageInfo.pagenum
    var totalpage=this.default.pageInfo.totalpage
    //判断总页数是否小于10
    if(totalpage<10){
        //遍历所有页码的数字
        for(let i=1;i<=totalpage;i++){
            //创建p标签对象
            var newP=createP(i,pagenum)
            //把当前p标签对象追加到list对象中
            this.list.appendChild(newP)
        }
    }else{
        //判断当前页码是多少
        if(pagenum<5){
            //前面5个
            for(let i=1;i<=5;i++){
                //创建p标签对象
                var newP=createP(i,pagenum)
                //把当前p标签对象追加到list对象中
                this.list.appendChild(newP)
            }
            //中间三个点
            var span=document.createElement('span')
            span.innerHTML="..."
            //把span标签追加到this.list中
            this.list.appendChild(span)
            //最后两个
            for(let i=totalpage-1;i<=totalpage;i++){
                //创建p标签对象
                var newP=createP(i,pagenum)
                //把当前p标签对象追加到list对象中
                this.list.appendChild(newP)
            }
        }else if(pagenum==5){
            //前面7个
            for(let i=1;i<=7;i++){
                //创建p标签对象
                var newP=createP(i,pagenum)
                //把当前p标签对象追加到list对象中
                this.list.appendChild(newP)
            }
            //中间三个点
            var span=document.createElement('span')
            span.innerHTML="..."
            //把span标签追加到this.list中
            this.list.appendChild(span)
            //最后两个
            for(let i=totalpage-1;i<=totalpage;i++){
                //创建p标签对象
                var newP=createP(i,pagenum)
                //把当前p标签对象追加到list对象中
                this.list.appendChild(newP)
            }
        }else if(pagenum>5 && pagenum<totalpage-4){
            //前面2个
            for(let i=1;i<=2;i++){
                //创建p标签对象
                var newP=createP(i,pagenum)
                //把当前p标签对象追加到list对象中
                this.list.appendChild(newP)
            }
            //中间三个点
            var span=document.createElement('span')
            span.innerHTML="..."
            //把span标签追加到this.list中
            this.list.appendChild(span)
            //中间5个
            for(let i=pagenum-2;i<=pagenum+2;i++){
                //创建p标签对象
                var newP=createP(i,pagenum)
                //把当前p标签对象追加到list对象中
                this.list.appendChild(newP)
            }
            //中间三个点
            var span2=document.createElement('span')
            span2.innerHTML="..."
            //把span标签追加到this.list中
            this.list.appendChild(span2)
            //最后两个
            for(let i=totalpage-1;i<=totalpage;i++){
                //创建p标签对象
                var newP=createP(i,pagenum)
                //把当前p标签对象追加到list对象中
                this.list.appendChild(newP)
            }
        }else if(pagenum==totalpage-4){
            //前面2个
            for(let i=1;i<=2;i++){
                //创建p标签对象
                var newP=createP(i,pagenum)
                //把当前p标签对象追加到list对象中
                this.list.appendChild(newP)
            }
            //中间三个点
            var span=document.createElement('span')
            span.innerHTML="..."
            //把span标签追加到this.list中
            this.list.appendChild(span)
            //最后7个
            for(let i=totalpage-6;i<=totalpage;i++){
                //创建p标签对象
                var newP=createP(i,pagenum)
                //把当前p标签对象追加到list对象中
                this.list.appendChild(newP)
            }
        }else if(pagenum>totalpage-4){
            //前面2个
            for(let i=1;i<=2;i++){
                //创建p标签对象
                var newP=createP(i,pagenum)
                //把当前p标签对象追加到list对象中
                this.list.appendChild(newP)
            }
            //中间三个点
            var span=document.createElement('span')
            span.innerHTML="..."
            //把span标签追加到this.list中
            this.list.appendChild(span)
            //最后7个
            for(let i=totalpage-4;i<=totalpage;i++){
                //创建p标签对象
                var newP=createP(i,pagenum)
                //把当前p标签对象追加到list对象中
                this.list.appendChild(newP)
            }
        }
    }
}
//给大盒子添加点击事件
Pagination.prototype.clickBox=function(){  
    //给大盒子添加点击事件
    this.ele.onclick=(e)=>{
        //获取当前页
        var pagenum=this.default.pageInfo.pagenum
        //事件对象兼容
        var e = e || window.event
        //获取当前操作对象
        var target=e.target || e.srcElement
        //下一页
        if(target.className=="next" && pagenum!=this.default.pageInfo.totalpage){
            //改变当前页码
            this.default.pageInfo.pagenum+=1
            //重新刷新大盒子中的内容
            this.showBox()
        }
        //上一页
        if(target.className=="prev" && pagenum!=1){
            //改变当前页码
            this.default.pageInfo.pagenum-=1
            //重新刷新大盒子中的内容
            this.showBox()
        }
        //尾页
        if(target.className=='last' && pagenum!=this.default.pageInfo.totalpage){
            //改变当前页码
            this.default.pageInfo.pagenum=this.default.pageInfo.totalpage
            //重新刷新大盒子中的内容
            this.showBox()
        }
        //首页
        if(target.className=="first" && pagenum!=1){
            //改变当前页码
            this.default.pageInfo.pagenum=1
            //重新刷新大盒子中的内容
            this.showBox()
        }
        //点击页码
        if(target.nodeName=="P" && pagenum!=target.innerHTML){
            //把当前点击对象的文本获取，并赋值给默认参数
            this.default.pageInfo.pagenum=parseInt(target.innerHTML)
            this.showBox()
        }
        //点击go按钮
        if(target.nodeName=="BUTTON" && target.previousElementSibling.value!=pagenum){
            //把输入框中的value值赋值给到当前页
            this.default.pageInfo.pagenum=parseInt(target.previousElementSibling.value)
            this.showBox()
        }
    }
}
//创建页码p标签
function createP(m,nn){
    //创建p标签
    var p1=document.createElement("p")
    //给当前p标签添加内容
    p1.innerHTML=m
    //给p标签设置样式
    setStyle(p1,{
        border:"1px solid #333",
        margin:"0px 2px",
        padding:"2px 5px"
    })
    //判断m是否为当前被选中的页码
    if(m==nn){
        setStyle(p1,{
            backgroundColor:"#ccc"
        })
    }
    return p1
}
//给当前元素设置样式
function setStyle(ele,options){
    //遍历样式对象
    for(var attr in options){
        ele.style[attr]=options[attr]
    }
}