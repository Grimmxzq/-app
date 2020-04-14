/*************************************************
 *FileName:      getphone.js
 *Description:   绑定手机号.js
 *************************************************/
    /*
     * 启动
     */
    /*
     * 变量初始化
     */
    //验证码开关
    var is_code = true;
    
    /*
     * 主程序
     */ 
     
    mui.init();
    immersedStyle(0.5);
    new Vue({
        el: '.mui-content',
        data: {
            phone:'',
            code:'',
        },
        methods: {
            ongetcode:function(){
                if(this.phone == ''||!common.checkType(this.phone,'phone')){
                    mui.toast('请输入正确的手机号码',{duration:2000,type:'div'});
                    return false;
                }else if(is_code){
                    is_code = !is_code;
                    document.querySelector(".getcode").classList.remove('active');
                    var btnID = document.querySelector(".getcode");
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
                    var request_obj = {mobile: this.phone}
                    common.curl(common.config+'/index.php/api/index/sendCode',request_obj,{sign:create_sign(request_obj)},'post',function(e){
                        console.log(e);
                        if(e.error_code==0){
                        }else{
                            clearInterval(outtime);
                            document.querySelector('.getcode').classList.add('active');
                            btnID.innerHTML = "发送验证码";
                            is_code=true;
                            mui.toast(e.error_msg)
                        }
                    });
                }
            },
            changephone:function(){
                var request_obj = {
                    openid:localStorage.wx_openid,
                    nickname:localStorage.wx_nickname,
                    face:localStorage.wx_face,
                    mobile: this.phone,
                    code:this.code
                };
                common.curl(common.config +'/index.php/api/index/wxLogin',request_obj,{sign:create_sign(request_obj)},'post',function(e){
                    console.log(JSON.stringify(e));
                    if(e.error_code==0){
                        mui.toast('登陆成功');
                        setTimeout(function(){
                            localStorage.clear();
                            localStorage.access_token=e.data.access_token;
                            localStorage.uid=e.data.uid;
                            localStorage.myphone=e.data.mobile;
                            localStorage.face=e.data.face;
                            mui.back();
                            var list = plus.webview.currentWebview().opener();
                            mui.fire(list, 'logingoback');
                            return true;
                        },500);
                    }else{
                        mui.toast(e.error_msg)
                    }
                })
            },
        }
    })

                        