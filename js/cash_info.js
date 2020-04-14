/*************************************************
 *FileName:      cash_info.js
 *Description:   支付宝提现.js
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
    var money = common.getUrlParam('money');//获取链接的参数
    new Vue({
        el: '.mui-content',
        data: {
            phone:'',
            code:'',//验证码
            psw:'',//真实姓名
            psws:"",//支付宝账户
            usertel:localStorage.myphone,
            name_val:"",
            count_val:"",
            code_val:"",
            cash_money:money
        },
        created:function(){
            this.get_info();
        },
        methods: {
            ongetcode:function(){
                if(is_code){
                    is_code = !is_code;
                    document.querySelector(".Gotcode").classList.remove('active');
                    var btnID = document.querySelector(".Gotcode span");
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
                    var requset_obj = {mobile: this.usertel};
                    common.curl(common.config +"/newapi/index/sendMessage/",requset_obj,{sign:create_sign(requset_obj)},'post',function(e){
                        console.log(e);
                        if(e.code==0){
                            mui.toast(e.msg)
                        }else{
                            clearInterval(outtime);
                            $('.Gotcode').addClass('active');
                            btnID.innerHTML = "发送验证码";
                            is_code=true;
                            mui.toast(e.msg)
                        }
                    })
                }
            },
            exit:function(){
                console.log($("#psw").val())
                console.log($("#psws").val())
                console.log($("#code").val())
                $(".btn-public .btns").attr("disabled",true);//点击，让提现不能输入
                if($("#psw").val() == "" || $("#psws").val() == "" || $("#code").val() == ""){
                    mui.toast("请全部输入");
                }else{
                    var vm = this;
                    var request_obj = {
                        money:vm.cash_money,
                        account:$("#psws").val(),
                        type:1,  //1支付宝 2微信 3银行卡	
                        phone:vm.usertel,
                        bank_name:$("#psw").val(),
                        code:$("#code").val(),
                        real_name:$("#psw").val()
                    }
                    common.curl(common.config +"/newapi/users/withdraw",request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
                        console.log(e);
                        if(e.code == 403){
                            mui.toast(e.msg);
                            setTimeout(function(){
                                mui.openWindow({
                                    url:"login.html",
                                    id:"login"
                                });
                            },1000)
                        }else if(e.code==1){
                            localStorage.money = e.data;
                            mui.toast(e.msg);
                            setTimeout(function(){
                                mui.back();
                                //获得父页面的webview
                                var list = plus.webview.currentWebview().opener();
                                //触发父页面的自定义事件(refresh),从而进行刷新
                                mui.fire(list, 'refresh');
                                //返回true,继续页面关闭逻辑
                                return true;
                            },1000)
                        }else{
                            mui.toast(e.msg);
                            $(".btn-public .btns").attr("disabled",false);//报错，就让提现可以输入
                        }
                    })
                }
            },
            get_info:function(){
                var vm =this;
                common.curl(common.config +"/newapi/users/get_withdraw_data",request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
                    console.log(e);
                    if(e.code==1){
                        vm.name_val = e.data.real_name;//获取真实姓名；
                        vm.count_val = e.data.account;//获取支付宝账户；
                        vm.usertel = e.data.phone;//获取手机号；
                    }else{
                        mui.toast(e.msg);
                        setTimeout(function(){
                            backView();
                        },1000);
                    }
                });
            }
        }
    })
        
        
        
    
    //发送手机验证码
    document.querySelector('.Gotcode').addEventListener('tap',function(){
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