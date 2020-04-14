/*************************************************
 *FileName:      register.js
 *Description:   绑定手机号.js
 *************************************************/
    /*
     * 启动
     */
    mui.init();
    /*
     * 变量初始化
     */
    var phone,code;
    //验证码开关
    var is_code = true;
    /*
     * 主程序
     */ 
    //验证手机号
    var bindingPhone = new Vue({
        el:"#bindingPhone",
        data:{
            
        },
        methods:{
            goback:function(){
                localStorage.clear();
                common.logout(function(){});
                mui.back();
            }
        }
    })

    // 监听手机号有没有输入
    document.querySelector("#phone").addEventListener('input',function(){
        phone = document.querySelector("#phone").value;
        if(common.checkType(phone,'phone')){
            document.querySelector(".isok").classList.add('active');
        }else{
            document.querySelector(".isok").classList.remove('active');
        }
        if(document.querySelector("#code").value!=""){
            $(".register .btn .btns").addClass('active')
        }
    })
    //监听验证码有没有输入
    document.querySelector("#code").addEventListener('input',function(){
        if(document.querySelector("#phone").value!=""){
            $(".register .btn .btns").addClass('active')
        }
    })
 

    
    //点击确定
    document.querySelector(".btns").addEventListener('tap',function(){
        code = document.querySelector("#code").value;
        if(phone!=""&code!=""){
            $(".register .btn .btns").addClass('active')
        }
        if(phone == ''||!common.checkType(phone,'phone')){
            mui.toast('请输入正确的手机号码');
             return false;
        }else if(!code){
            mui.toast('请输入短信验证码!');
            return false;
        }else{
            var self = plus.webview.currentWebview();
            // alert(phone);
            // alert(code);
            // alert(self.expire_time)
            var request_obj = {mobile: phone ,code:code,openid:self.openid,nickname:self.nickname,face:self.face};
            common.curl(common.config +"/newapi/index/sns_login_bind_mobile",request_obj,{sign:create_sign(request_obj)},'post',function(e){
                console.log(e);
                // alert(JSON.stringify(e))
                if(e.code==1){
                    mui.toast(e.msg)
                    setTimeout(function(){
                        localStorage.userKey = e.data.key;
                        localStorage.expire_time = e.data.expire_time;
                        localStorage.myphone = e.data.mobile;
                        login_oppo=true;
                        // mui.back();
                        common.pageTransition('index.html');
                        var list = plus.webview.currentWebview().opener();
                        mui.fire(list, 'refreshs');
                        return true;
                    },500);
                }else{
                    mui.toast(e.msg)
                }
            })
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
                var request_obj = {mobile: phone};
                common.curl(common.config +"/newapi/index/sendMessage/",request_obj,{sign:create_sign(request_obj)},'post',function(data){
                    console.log(data);
                    if(data.code==0){
                        mui.toast(data.msg);
                    }else{
                        is_code=true;
                        mui.toast("短信发送成功");
                    }
                });
            }
                
        }
    })

    
