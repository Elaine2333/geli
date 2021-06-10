//根据键名，获取指定的键值
function getCookie(key){
    //获取所有的cookie
    var cookies=document.cookie
    //使用分割的方式，把字符串转为数组
    var ar1=cookies.split("; ")
    //遍历分割好的数组元素
    for(var i=0;i<ar1.length;i++){
        //分割遍历出来的数组元素
        var ar2=ar1[i].split('=')
        //判断当前分割出来的键名是否等于传入的键名
        if(ar2[0]==key){
            return ar2[1]
        }
    }
}
//设置cookie
function setCookie(key,val,time1=0){
    //判断当前time1是否等于0
    if(time1==0){
        document.cookie=`${key}=${val}`
    }else{
        //获取当前北京时间
        var dt1=new Date()
        //获取当前世界时间
        var time2=dt1-8*3600*1000+time1*1000
        //添加cookie
        document.cookie=`${key}=${val};expires=${new Date(time2)}`
    }
}

//删除cookie
function delCookie(key){
    setCookie(key,'',-1)
}