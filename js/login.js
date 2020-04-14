/*************************************************
 *FileName:      login.js
 *Description:   登录.js
 *************************************************/
    /*
     * 启动
     */
    var login_oppo='false';
    // mui.plusReady(function(){ 
    //     var wv=plus.webview.currentWebview();// 关闭侧滑返回功能
    //     wv.setStyle({'popGesture':'close'});
    //     var old_back = mui.back;
    //     mui.back = function() {
    //     }
    // });
    mui.init({
        swipeBack:true//侧滑返回
    });
    /*
     * 变量初始化
     */
    var phone ,code;
    var goSign = common.getUrlParam('goSign');
     //验证码开关
     var is_code = true;
    /*
     * 主程序
     */ 
    pagecss();
    window.addEventListener('logingoback', function(e){
        login_oppo=true;
        mui.back();
        var list = plus.webview.currentWebview().opener();
        mui.fire(list, 'refreshs');
        return true;
    });
    /** 
     * pagecss
     * 样式加载
     * @cc 
     * @DateTime 2018-01-08T06:19:16+0800
     * @param    int        
     * @return   void
     */
    //监听返回键
    document.querySelector("#back").addEventListener('tap',function(){
        backView();
    })
        // 监听手机号有没有输入
    document.querySelector("#phone").addEventListener('input',function(){
        phone = document.querySelector("#phone").value;
        if(document.querySelector("#code").value!=""){
            $(".btn .certain").addClass('active');
        }
    })
    
    //监听验证码有没有输入
    document.querySelector("#code").addEventListener('input',function(){
        if(document.querySelector("#phone").value!=""){
            $(".btn .certain").addClass('active');
        }
    })
    function pagecss(){
        
        //跳转注册
        // document.querySelector(".gotoregiste").addEventListener('tap',function(){
        //     common.pageTransition('register.html');
        // })
        
        //跳忘记密码
        // document.querySelector(".forgotpsw").addEventListener('tap',function(){
        //     common.pageTransition('forgetpsw.html');
        // })
        
        //跳用户协议
        document.querySelector(".user-know").addEventListener('tap',function(){
            common.pageTransition('userknow.html?that=login');
        })
        
        //判断手机号
        document.querySelector("#phone").addEventListener('input',function(){
            phone = document.querySelector("#phone").value;
            if(common.checkType(phone,'phone')){
                document.querySelector(".okmsg").classList.add('active');
            }else{
                document.querySelector(".okmsg").classList.remove('active');
            }
        })
        
    };
    var text_rule = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;//2018最新手机号正则；包含166
    //发送手机验证码
    document.querySelector('.getcode').addEventListener('tap',function(){
        if(is_code){
            // ||!/^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(phone)
            if(phone == ''|| !text_rule.test(phone)) {
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
                var request_obj = { mobile: phone }
                common.curl(common.config+"/newapi/index/sendMessage/",request_obj,{sign:create_sign(request_obj)},'post',function(data){
                    console.log(data)
                    if(data.code==0){
                        mui.toast(data.msg)
                    }else{
                        // clearInterval(outtime);
//                          btnID.classList.add('active');
//                          btnID.innerHTML = "发送验证码";
                        is_code=true;
                        mui.toast("短信发送成功");
                    }
                })
            }
                
        }
    })

    
    //点击确认
    document.querySelector(".certain").addEventListener('tap',function(){
        code = document.querySelector("#code").value;
        // 登录接口
        if(phone!=""&code!=""){
            $(".register .btn .certain").addClass('active');
        }
        if(phone == ''||!text_rule.test(phone)){
            mui.toast('请输入正确的手机号码');
            return false;
        }else if(!code){
            mui.toast('请输入短信验证码!');
            return false;
        }else{
            var request_obj = {mobile: phone , code:code,type:1};
            common.curl(common.config+"/newapi/index/login",request_obj,{sign:create_sign(request_obj)},'post',function(data){
                if(data.code==1){
                    mui.toast('登陆成功');
                    //key是关键字不能使用
                    localStorage.userKey = data.data.key;
                    localStorage.myphone=phone;
                    localStorage.expire_time = data.data.expire_time;
                    if(!!goSign){
                        // 如果goSign存在就跳转签到页面
                        mui.openWindow({
                            url:"sign2.html?fromLogin=1",
                            id:"sign",
                            styles:{
                                cachemode:"noCache"
                            },
                            createNew: true,
                            show:{
                                autoShow:"true",
                                aniShow:"slide-in-right",
                                duration:300,
                                event: 'titleUpdate',
                            },
                            waiting:{
                                autoShow: true,
                                options:{
                                    padlock: true
                                }
                            }
                        });

                    }else{
                        // 否 就返回
                        backView();
                    }
                }else{
                    mui.toast(data.msg);
                }
            })
        }
    })
    mui.plusReady(function(){
        // 在这里调用plus api
       common.thirdparty(function(weixin){
           console.log(weixin.openid);
           var request_obj = {openid:weixin.openid,type:0 }//微信登录方式0;
           common.curl(common.config +"/newapi/index/sns_login_check",request_obj,{sign:create_sign(request_obj)},'post',function(datas){
               if(datas.code == 1){
                   //微信登录，然后判断手机号是否绑定；未绑定就跳转到绑定手机号页面，绑定就跳转到首页
                   // 返回的error_code = 1、3的时候就跳去绑定手机号
                   mui.toast('登陆成功');
                       localStorage.userKey = datas.data.key;//返回的key
                       localStorage.expire_time = datas.data.expire_time;//返回的时间戳
                       localStorage.myphone=datas.data.mobile;//返回的手机号
                       login_oppo=true;
                       if(!!goSign){
                           // 如果goSign存在就跳转签到页面
                           mui.openWindow({
                               url:"sign2.html?fromLogin=1",
                               id:"sign",
                               styles:{
                                   cachemode:"noCache"
                               },
                               createNew: true,
                               show:{
                                   autoShow:"true",
                                   aniShow:"slide-in-right",
                                   duration:300,
                                   event: 'titleUpdate',
                               },
                               waiting:{
                                   autoShow: true,
                                   options:{
                                       padlock: true
                                   }
                               }
                           });
                       }else{
                           // 否 就返回
                           backView();
                       }
                       return true;
               }else{
                   //code = 0 表示登录失败
                   if(datas.data.error_code == 1 || datas.data.error_code == 3){
                       mui.toast('检测到您未绑定手机号，现在跳转绑定手机号界面');
                       mui.openWindow({
                           url:"bindingPhone.html",
                           id:"bindingPhone",
                           extras:{
                               openid:weixin.openid,
                               face:weixin.headimgurl,
                               nickname:weixin.nickname 
                           },
                           show:{
                               autoShow:"ture",
                               aniShow:"slide-in-right",
                               duration:200
                           }
                       });
                   }else{
                       //返回的error_code = 2 的时候就报系统错误
                       mui.toast(datas.msg);

                   }
               }
          })
       })
   });

