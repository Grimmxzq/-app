/*************************************************
 *FileName:      register.js
 *Description:   注册账号.js
 *************************************************/
    /*
     * 启动
     */
    mui.init();
    /*
     * 变量初始化
     */
    var phone,psw,code;
    //验证码开关
    var is_code = true;
    /*
     * 主程序
     */ 
    //验证手机号


    // 监听手机号有没有输入
    document.querySelector("#phone").addEventListener('input',function(){
        phone = document.querySelector("#phone").value;
        if(common.checkType(phone,'phone')){
            document.querySelector(".isok").classList.add('active');
        }else{
            document.querySelector(".isok").classList.remove('active');
        }
        if(document.querySelector("#psw").value!=""&document.querySelector("#code").value!=""){
            $(".register .btn .btns").addClass('active')
        }
    })
    //监听密码有没有输入
    document.querySelector("#psw").addEventListener('input',function(){
        if(document.querySelector("#phone").value!=""&document.querySelector("#code").value!=""){
            $(".register .btn .btns").addClass('active')
        }
    })
    //监听验证码有没有输入
    document.querySelector("#code").addEventListener('input',function(){
        if(document.querySelector("#phone").value!=""&document.querySelector("#psw").value!=""){
            $(".register .btn .btns").addClass('active')
        }
    })
 

    
    //点击确定
    document.querySelector(".btns").addEventListener('tap',function(){
        psw = document.querySelector("#psw").value;
        code = document.querySelector("#code").value;
        if(phone!=""&psw!=""&code!=""){
            $(".register .btn .btns").addClass('active')
        }
        if(phone == ''||!common.checkType(phone,'phone')){
            mui.toast('请输入正确的手机号码');
             return false;
        }else if(!common.checkType(psw,'psw')){
            mui.toast('请输入由字母和数字组成的6位数以上密码!');
             return false;
        }else if(!code){
            mui.toast('请输入短信验证码!');
            return false;
        }else{
            // 注册接口
            mui.ajax(common.config+"/newapi/index/reg_mobile",{
                data:{
                    mobile: phone ,
                    password:psw,
                    code:code,
                },
                dataType:'json',
                type:'post',
                success:function(data){
                    console.log(data)
                    if(data.code==1){
                        mui.toast("注册成功");
                        localStorage.userKey = data.data.key;
                        localStorage.myphone=phone;
                        localStorage.expire_time = data.data.expire_time;
                        // setTimeout(function(){mui.back()},1000);
//                      common.pageTransition('index.html');
						window.location.href="index.html";
                    }else{
                        mui.toast(data.msg);
                    }
                }
            });
        }
    })

    //发送手机验证码
    document.querySelector('.getcode').addEventListener('tap',function(){
        if(is_code){
            if(phone == ''||!/^1[3457896]\d{9}$/.test(phone)) {
                mui.toast('请输入正确的手机号码',{duration:2000,type:'div'});
                return false;
            }else if(is_code){
                is_code = !is_code;
                this.classList.remove('active');
                var btnID = this;
                var times = 120;
                btnID.innerHTML = times+"s后重新发送";
                var outtime = setInterval(function(){
                    times--;
                    btnID.innerHTML = times+"s后重新发送";
                    if(times<=0){
                        btnID.classList.add('active');
                        clearInterval(outtime);
                        btnID.innerHTML = "发送验证码";
                        is_code=true;
                    }
                },1000);
                // 手机验证码接口
                mui.ajax(common.config+"/newapi/index/sendMessage/",{
                    data:{
                        mobile: phone ,
                    },
                    dataType:'json',
                    type:'post',
                    success:function(data){
                        console.log(data)
                        if(data.code==0){
                        	mui.toast(data.msg)
                        }else{
                            // clearInterval(outtime);
//                          btnID.classList.add('active');
//                          btnID.innerHTML = "发送验证码";
                            is_code=true;
                            mui.toast("短信发送成功")
                        }
                    }
                });
            }
                
        }
    })
