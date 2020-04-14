


/*************************************************
 *FileName:      order.js
 *Description:   钱包.js
 *************************************************/
/*
 * 启动
 */

// mui('#pullrefresh').pullRefresh().setStopped(true); //暂时禁止滚动
// mui('#pullrefresh').pullRefresh().setStopped(false); //取消暂时禁止滚动

// mui('#pullrefresh').pullRefresh().disablePullupToRefresh();//禁用上拉加载
// mui('#pullrefresh').pullRefresh().enablePullupToRefresh();//启用上拉加载



var wallet = new Vue({
    el: '#pullrefresh',
    data: {
        msg:[],
        page:2,
        size:10,
        type:2,
        text:[],
        packet_title:"",
        packet_description:"",
        packet_id:null,
        moneys:"",
        cash_money:null,
        money:'',
        count_dkhb:'',
        point:''
    },
    ready:function(){
        
    },
    created: function() {
        // alert("222");
        this.pulldownRefresh();
    },
    methods: {
        back:function(){
            backView();
        },

        pulldownRefresh:function(){
            var that = this;
            console.log(that.page);
            // alert("9999");
            this.getmy();
            var request_obj = {
                page:1,
                size:10
            };
            common.curl(common.config +"/newapi/users/sys_money_list",request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
                console.log(e);
                if(e.code==501){
                     mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
                    setTimeout(function(){
                        mui('#pullrefresh').pullRefresh().refresh(true);//自动触发下拉刷新
                    },20000)
                }
                if(e.code==1){
                    that.msg = e.data;
                    that.page = 2;
                     mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
                    //  mui('#pullrefresh').pullRefresh().refresh(true);//自动触发下拉刷新
                }else{
                    mui.toast(e.msg);
                }
            })
        },
        getmy:function(){
            //个人信息
            var vm =this;
            var obj = {};
            common.curl(common.config +"/newapi/users/userinfo",obj,{sign:create_sign(obj),key: localStorage.userKey},'post',function(e){
                console.log(e.data);
                if(e.code==1){
                     vm.money = e.data.money;
                     vm.point = e.data.point;
                     vm.count_dkhb = e.data.count_dkhb;
                }
            })
        },
        close_red_packet:function(){    
            $(".click_red_packet").css("display","none");
        },
        pullupRefresh:function(){
            var that = this;
            console.log(that.page);
            var obj = {
                page:that.page,
                size:that.size
            };
            common.curl(common.config +"/newapi/users/sys_money_list",obj,{sign:create_sign(obj),key: localStorage.userKey},'post',function(e){
                console.log(e);
                mui('#pullrefresh').pullRefresh().endPullupToRefresh((e.data.length < 3));
                if(e.code==1){
                    that.page++;
                    for(var i=0;i<e.data.length;i++){
                        that.msg.push(e.data[i]);
                    }
                }else{
                    mui.toast(e.msg);
                }
            })
        },
        // 开红包
        play_packet:function(){
            $('html').css({"height":"100%","overflow":"hidden"});//禁止滚动
            $('body').css({"height":"100%","overflow":"hidden"});//禁止滚动

            mui('#pullrefresh').pullRefresh().setStopped(true);
            mui('#pullrefresh').pullRefresh().disablePullupToRefresh();

            var vm =this;
            var obj = {};
            common.curl(common.config +"/newapi/hongbao/get_l_hb",obj,{sign:create_sign(obj),key: localStorage.userKey},'post',function(e){
                console.log(e);
                if(e.code == 403){
                    mui.toast(e.msg);
                    setTimeout(function(){
                        mui.openWindow({
                            url:"login.html",
                            id:"login"
                        });
                    },1000)
                }else{
                    if(e.code==1){
                        vm.packet_title = e.data.title;//红包标题名
                        vm.packet_description = e.data.description;//红包描述
                        vm.packet_id = e.data.id;
                        $(".click_red_packet").css("display","block");
                    }else{
                        mui.toast(e.msg);
                    }
                }
            })
        },
        jump_packet:function(){
            $('html').css({"overflow":"auto","height":"auto"});
            $('body').css({"overflow":"auto","height":"auto"});
            mui('#pullrefresh').pullRefresh().setStopped(false);
            mui('#pullrefresh').pullRefresh().enablePullupToRefresh();
            var link = "packet_memory.html?packet_id="+this.packet_id;
            mui.openWindow({
                url:link,
                styles:{
                    cachemode: 'default',
                    // titleNView:titleNView
                },
                show:{
                    autoShow:"true",
                    aniShow:"slide-in-right",
                    duration:200,
                    event:"loaded",
                },
                waiting:{
                    autoShow: true,
                }
            });
            $(".click_red_packet").css("display","none");
        },
        cash_deposit:function(){
            $('html').css({"height":"100%","overflow":"hidden"});//禁止滚动
            $('body').css({"height":"100%","overflow":"hidden"});//禁止滚动
            mui('#pullrefresh').pullRefresh().setStopped(true);
            mui('#pullrefresh').pullRefresh().disablePullupToRefresh();
            var vm =this;
            var obj = {};
            common.curl(common.config +"/newapi/users/get_withdraw_money_list",obj,{sign:create_sign(obj),key: localStorage.userKey},'post',function(e){
                console.log(e);
                if(e.code == 403){
                    mui.toast(e.msg);
                    setTimeout(function(){
                        mui.openWindow({
                            url:"login.html",
                            id:"login"
                        });
                    },1000)
                }else{
                    vm.text = e.data;
                    vm.cash_money = e.data[0].info;//获取默认提现金额
                    $(".cash_box_shadow").css("display","block");
                }
            })
        },
        close_cashBox:function(){
            $('html').css({"overflow":"auto","height":"auto"});
            $('body').css({"overflow":"auto","height":"auto"});
            mui('#pullrefresh').pullRefresh().setStopped(false);
            mui('#pullrefresh').pullRefresh().enablePullupToRefresh();
            $(".cash_box_shadow").css("display","none");
        },
        go_cash:function(){
            $('html').css({"overflow":"auto","height":"auto"});
            $('body').css({"overflow":"auto","height":"auto"});
            mui('#pullrefresh').pullRefresh().setStopped(false);
            mui('#pullrefresh').pullRefresh().enablePullupToRefresh();
            //检验是否符合提现要求
            var vm =this;
            var obj = {
                money:vm.cash_money,
                type:vm.type
            };
            common.curl(common.config +"/newapi/users/validate_can_withdraw",obj,{sign:create_sign(obj),key: localStorage.userKey},'post',function(e){
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
                    if(vm.type == 1){
                        //跳转支付宝
                        var link = "cash_info.html?money=" + vm.cash_money;
                        mui.openWindow({
                            url:link,
                            styles:{
                                cachemode: 'default',
                            },
                            show:{
                                autoShow:"true",
                                aniShow:"slide-in-right",
                                duration:200,
                                event:"loaded",
                            },
                            waiting:{
                                autoShow: true,
                            }
                        });
                        $(".cash_box_shadow").css("display","none");
                        $(".cash_box .much_money ul li .money").css("background-image","url(./img/wallet_gray_Bg.png)");
                        $(".cash_box .much_money ul li .money").eq(0).css("background-image","url(./img/wallet_light_Bg.png)");
                    }else{
                        mui.toast(e.msg)
                    }
                }else{
                    mui.toast(e.msg);
                }
            })
        },
        change:function(type){
            // 1表示支付宝  2表示微信
            this.type = type;
        },
        click_money:function(index,cash_money){
            this.cash_money = cash_money;
            $(".cash_box .much_money ul li .money").css("background-image","url(./img/wallet_gray_Bg.png)");
            $(".cash_box .much_money ul li .money").eq(index).css("background-image","url(./img/wallet_light_Bg.png)");
        }
    },
    // watch:{
    //     moneys(newName,oldName){
    //         newName = localStorage.money;
    //         oldName = this.money;
    //         console.log(newName,oldName);
    //     },
    //     deep: true,
    //     immediate: true
    // },
    updated:function(){
        window.addEventListener('refresh', function(e){//监听红包页面返回   然后执行刷新
            location.reload();
        });
    }
})


mui.init({
    pullRefresh: {
        container: '#pullrefresh',
        down: {
            callback: wallet.pulldownRefresh
        },
        up: {
            contentrefresh: '正在加载...',
            callback: wallet.pullupRefresh
        }
    }
});

// 开红包http://192.168.9.204/newapi/test/fhb
document.addEventListener('change_msg', function() {
    // wallet.getmy();
    wallet.money = localStorage.money;
    wallet.count_dkhb = localStorage.count_dkhb;
});
