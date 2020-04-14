//对参数进行排序
function sort(obj){
    var newkey = Object.keys(obj).sort();
　　//先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    var newObj = {};//创建一个新的对象，用于存放排好序的键值对
    for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
        newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
    }
    return newObj;//返回排好序的新对象
}
//请求参数组成的对象
function create_sign(request_obj) {
    //定义秘钥
    var secret = localStorage.secret;
    //对请求参数进行排序
    obj =sort(request_obj);
      //拼接出需要加密的字符串
    var str = '';
    for(var i in obj){
        if(obj[i]){
           str+= i+'='+obj[i]
        }
    }
    console.log(str);
    console.log(secret);
    console.log(str+secret);
    console.log($.md5(str+secret));
    return $.md5(str+secret);//需要引入md5.js
}