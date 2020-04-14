/*************************************************
 *FileName:      setpsw.js
 *Description:   修改登陆密码.js
 *************************************************/
    /*
     * 启动
     */
    mui.init({
        statusBarBackground:"#fff"
    });
//  immersedStyle(0.5);
    /*
     * 变量初始化
     */
    //验证码开关
    var is_code = true;
    /*
     * 主程序
     */ 
     
    new Vue({
        el: '.mui-content',
        data: {
            phone:'',
            code:'',
            oldpsw:'',
            newpsw:'',
            usertel:localStorage.myphone
        },
        methods: {
            ongetcode:function(){
                if(is_code){
                    is_code = !is_code;
                    document.querySelector(".getcode").classList.remove('active');
                    var btnID = document.querySelector(".getcode");
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
                    var request_obj = {
                        mobile: this.usertel,
                    };
                    common.curl(common.config +"/newapi/index/sendMessage/",request_obj,{sign:create_sign(request_obj)},'post',function(e){
                        console.log(e.body);
                        if(e.body.code==0){
                            mui.toast(e.data.msg)
                        }else{
                            clearInterval(outtime);
                            $('.getcode').addClass('active');
                            btnID.innerHTML = "发送验证码";
                            is_code=true;
                            mui.toast(e.data.msg)
                        }
                    })
                }
            },
            exit:function(){
                if(!common.checkType(this.newpsw,'psw')){
                    mui.toast('请输入由字母和数字组成的6位数以上密码!');
                    return false;
                }
                var request_obj = {
                    mobile: this.usertel,
                    code:this.code,
                    password:this.oldpsw,
                    repassword:this.newpsw,
                };
                common.curl(common.config +"/newapi/users/setpassword",request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
                    console.log(e);
                    if(e.code==0){
                        console.log('修改成功！');
                        common.pageTransition('index.html');
                    }else{
                        mui.toast(e.msg)
                    }
                })
            },
        }
    })
        
        
        
    
    //发送手机验证码
    document.querySelector('.getcode').addEventListener('tap',function(){
        phone = localStorage.myphone;
        if(is_code){
            if(phone == ''||!/^1[3457896]\d{9}$/.test(phone)) {
                mui.toast('请输入正确的手机号码',{duration:2000,type:'div'});
                return false;
            }else{
                is_code = !is_code;
                this.classList.remove('active');
                var btnID = this;
                var times = 60;
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
            }
                
        }
    })