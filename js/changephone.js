/*************************************************
 *FileName:      changephone.js
 *Description:   更换手机号.js
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
     window.addEventListener('back', function(e){
      mui.back();
        var list = plus.webview.currentWebview().opener();//触发父页面的自定义事件(refresh),从而进行刷新
        mui.fire(list, 'refresh');//返回true,继续页面关闭逻辑
        return true;
    //刷新页面
    });
     
    mui.init();
    immersedStyle(0.5);
    new Vue({
        el: '.mui-content',
        data: {
            phone:localStorage.myphone,
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
                    var request_obj = {mobile: this.phone};
                    common.curl(common.config +"/index.php/api/index/sendCode",request_obj,{sign:create_sign(request_obj)},'post',function(e){
                        console.log(e);
                        if(e.error_code==0){
                        }else{
                            clearInterval(outtime);
                            document.querySelector('.getcode').classList.add('active');
                            btnID.innerHTML = "发送验证码";
                            is_code=true;
                            mui.toast(e.error_msg)
                        }
                    })
                }
            },
            changephone:function(){
                var request_obj = {
                    access_token:localStorage.access_token,
                    mobile: this.phone,
                    code:this.code
                }
                common.curl(common.config +"/index.php/api/user/checkPhone'",request_obj,{sign:create_sign(request_obj)},'post',function(e){
                    console.log(e);
                    if(e.error_code==0){
                        mui.toast('验证成功！')
                        setTimeout(function(){
                            common.pageTransition("newphone.html")
                        },1000);
                    }else{
                        mui.toast(e.error_msg)
                    }
                })
            },
        }
    })
        
