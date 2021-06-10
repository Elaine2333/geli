function ajax(obj){
    //默认参数
    var defaultObj={
        url:'',//请求地址
        type:'get',//请求方式
        async:true,//是否异步
        data:'',//请求参数
        success:function(){},//请求成功的回调函数
        error:function(){} //请求失败的回调函数
    }
    //判断传入的参数中是否有请求地址
    if(!obj.url){
        throw new Error("必须书写请求地址")
    }
    //把传入的参数替换默认参数
    for(var attr in obj){
        defaultObj[attr]=obj[attr]
    }

    //创建ajax对象
    var xhr=new XMLHttpRequest()
    //判断当前defaultObj.data中是否存在内容
    if(defaultObj.data){
        //判断请求方式
        if(defaultObj.type.toUpperCase()=="GET"){
            //配置请求信息
            xhr.open(defaultObj.type,defaultObj.url+"?"+defaultObj.data,defaultObj.async)
            //发送请求
            xhr.send()
        }else if(defaultObj.type.toUpperCase()=="POST"){
            //配置请求信息
            xhr.open(defaultObj.type,defaultObj.url,defaultObj.async)
            //设置请求头信息
            xhr.setRequestHeader("content-type","application/x-www-form-urlencoded")
            //发送请求
            xhr.send(defaultObj.data)
        }
    }else{
        //配置请求信息
        xhr.open(defaultObj.type,defaultObj.url,defaultObj.async)
        //发送请求
        xhr.send()
    }

    //监听ajax状态是否结束
    xhr.onreadystatechange=function(){
        //判断ajax状态是否结束
        if(xhr.readyState==4){
            //判断http请求是否成功
            if(xhr.status==200){
                //调用成功的回调函数
                defaultObj.success(xhr.responseText)
            }else{
                //调用失败的回调函数
                defaultObj.error("请求失败")
            }
        }
    }
}

//promise对象的封装
function promiseAjax(obj){
    //创建并返回promise对象
    return new Promise(function(resolve,reject){
        //默认参数
        var defaultObj={
            url:'',//请求地址
            type:'get',//请求方式
            async:true,//是否异步
            data:''//请求参数
            // success:function(){},//请求成功的回调函数
            // error:function(){} //请求失败的回调函数
        }
        //判断传入的参数中是否有请求地址
        if(!obj.url){
            throw new Error("必须书写请求地址")
        }
        //把传入的参数替换默认参数
        for(var attr in obj){
            defaultObj[attr]=obj[attr]
        }

        //创建ajax对象
        var xhr=new XMLHttpRequest()
        //判断当前defaultObj.data中是否存在内容
        if(defaultObj.data){
            //判断请求方式
            if(defaultObj.type.toUpperCase()=="GET"){
                //配置请求信息
                xhr.open(defaultObj.type,defaultObj.url+"?"+defaultObj.data,defaultObj.async)
                //发送请求
                xhr.send()
            }else if(defaultObj.type.toUpperCase()=="POST"){
                //配置请求信息
                xhr.open(defaultObj.type,defaultObj.url,defaultObj.async)
                //设置请求头信息
                xhr.setRequestHeader("content-type","application/x-www-form-urlencoded")
                //发送请求
                xhr.send(defaultObj.data)
            }
        }else{
            //配置请求信息
            xhr.open(defaultObj.type,defaultObj.url,defaultObj.async)
            //发送请求
            xhr.send()
        }

        //监听ajax状态是否结束
        xhr.onreadystatechange=function(){
            //判断ajax状态是否结束
            if(xhr.readyState==4){
                //判断http请求是否成功
                if(xhr.status==200){
                    //调用成功的回调函数
                    resolve(xhr.responseText)
                }else{
                    //调用失败的回调函数
                    reject("请求失败")
                }
            }
        }
    })
}