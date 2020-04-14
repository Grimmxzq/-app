/*************************************************
 *FileName:      recharge.js
 *Description:   积分充值.js
 *************************************************/
    /*
     * 启动
     */
    mui.init();
    immersedStyle(0.5); 
    /*
     * 变量初始化
     */
    var arr;
    mui.init({
        beforeback: function() {
            var list = plus.webview.currentWebview().opener();
            mui.fire(list, 'refreshs');
            return true;
        }
    })
    /*
     * 主程序
     */ 
     var channels=null;
    // 监听plusready事件  
    document.addEventListener("plusready", function(){
        // 扩展API加载完毕，现在可以正常调用扩展API
        plus.payment.getChannels(function(s){
            channels = s;
        }, function(e){
            alert("获取支付通道列表失败："+e.message);
        });
    }, false );
    new Vue({
        el: '.mui-content',
        data: {
            sub:"",
            datas: [
                "10",
                "50",
                "100",
                "150",
                "200",
                "250",
                "300", 
                "400",
                "500",
            ],
            qwerqwre:0,
            data: [
                "微信支付",
                "支付宝支付",
            ],
            qwerqwre2:0,
            integral:0,
            money_point:0,
        },
        created: function() {
            //个人信息
            var vm =this;
            vm.$http.post(common.config+'/index.php/api/user/userInfo', {
                access_token: localStorage.access_token ,
            }).then(function (e) {
                console.log(e.body)
                if(e.body.error_code==0){
                     vm.integral=e.body.data.point;
                }else{
                    mui.toast(e.body.error_msg)
                }
            })
            //佣金比例
            this.$http.post(common.config+'/index.php/api/index/systemInfo', {
                key: 'money_point',
            }).then(function (e) {
                console.log(e.body);
                if(e.body.error_code==0){
                    this.money_point= e.body.data.value;
                }else{
                    mui.toast(e.body.error_msg)
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        methods: {
            addClassFun: function(index) {
                this.qwerqwre=index;
            }, 
            addClassFun2: function(index) { 
                this.qwerqwre2=index;
            },
            onbtn:function(){
                document.querySelector(".ys-modal-loading").classList.remove('active');
                var omoney = this.qwerqwre>=0 ? parseInt(this.datas[this.qwerqwre]) : parseInt(this.sub) ;
                if(this.qwerqwre2==0){
                    mui.ajax(common.config+"/index.php/api/user/buyPoint",{
                        data:{
                            amount: omoney ,
                            pay: 'wxpay' ,
                            access_token: localStorage.access_token ,
                        },
                        dataType:'json',
                        type:'post',
                        success:function(data){
                            var opaytype  = common.browserType().android? channels[0] :channels[1];
                            data =JSON.parse(data);
                            console.log(data);
                            console.log(JSON.stringify(channels));
                            document.querySelector(".ys-modal-loading").classList.add('active');
                            plus.payment.request(opaytype, data, function(){
                                mui.toast("支付操作成功！");
                                location.reload(); 
                            }, function(e){
//                              mui.toast(JSON.stringify(e));
                            } );
                                                     
                        },
                        error:function(data){
                        	console.log(JSON.stringify(data));
                        }                        
                    });
                }else{
                    mui.ajax(common.config+"/index.php/api/Alinotify/ali",{
                        data:{
                            amount: omoney ,
                            pay: 'alipay' ,
                            access_token: localStorage.access_token  ,
                        },
                        dataType:'text',
                        type:'post',
                        success:function(data){
                            var opaytype  = common.browserType().android?channels[1] : channels[0];
                            console.log(data);
                            console.log(JSON.stringify(channels));
                            document.querySelector(".ys-modal-loading").classList.add('active');
                            plus.payment.request(opaytype, data, function(){
                                mui.toast("支付操作成功！");
                                location.reload(); 
                            }, function(e){
                                 console.log(JSON.stringify(e));
                            } );
                           
                        }
                    });
                    
                }
            },
            inputsub:function(){
                this.qwerqwre=-1;
            },
        }
    })
