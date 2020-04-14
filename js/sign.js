
/*************************************************
 *FileName:      sign.js
 *Description:   签到.js
 *************************************************/
    /*
     * 启动
     */
    mui.init({
        statusBarBackground:"#fff",
        //swipeBack:true    //右滑关闭功能
    });
    mui.plusReady(function(){              
        plus.navigator.setStatusBarStyle('dark');                
    });
    /*
     * 变量初始化
     */
    if(localStorage.search_arr){
        var arr=localStorage.search_arr.split(',');
    }else{
        var arr=[];
    }
    var isUp = false;
    var fromLogin = common.getUrlParam('fromLogin');//从登陆页面去签到页面
    var from_index = common.getUrlParam('from_index');// sign2.html?from_index=1 跳转去签到页面

    if(!!fromLogin){//监听浏览器自带的返回键，如果从首页->登录->签到，则点击返回键返回首页
        $(document).ready(function() {		
            window.history.pushState("","","index.html");
        });
        window.addEventListener("popstate",function(e){
            location.href = "index.html";//跳转到你上页路径（根据自己的需求实现自己的功能 ）
        },false)
    }
    /*
     * 主程序
     */ 
    var sign = new Vue({
        el: '#sign',
        data: {
            integral:'',//签到积分
            NowSignIntegral:"",//今日签到可领取积分
            signNum:0,//签到次数
            playBox:"ture",//开宝箱
            mainalink:arr,
            con: [],
            showPrize:[],
            index: "",//0是签到，1是商城兑换，2是打开宝箱
            buttonMsg: [
                '签到',
                '商城兑换',
                '打开宝箱'
            ],
            sort:0,
            page:1,
            html:"测试",
            tip:false,
            signDay:0,
            day:7,
            prizeName:"",
            rule:[],
            hot_tuijian:[
                {picurl:"./img/loading_sign.png",url:""},
                {picurl:"./img/loading_sign.png",url:""}
            ],
            // alreadySign: "ture",
            need_sign_times:"",
            finished:false,
            loading:false,
        },
        methods: {
            showLogin: function(){
                if(!localStorage.userKey){
                mui.plusReady(function(){ 
                    common.pageTransition('login.html')
                })
                return false;
            }
                return true;
            },
            //获取宝贝推荐商品
            babySug:function(oppo){
                var vm = this;
                $.ajax({
                    type: "get",
                    url: 'http://v2.api.haodanku.com/column',
                    dataType:'json',
                    data: {
                        apikey:'redgo',
                        type: 2,
                        back:20,
                        min_id:vm.page,
                        cid:0,
                    },
                    success: function(data) {
                        console.log(data);
                        if(data.data.length<20){
                            vm.finished = true;
                        }
                        // 加载状态结束
                        if(vm.page==1){
                            console.log(vm.page)
                            vm.con = data.data;
                        }else{
                            console.log(vm.page)
                            for (let i = 0; i < data.data.length; i++) {
                                var item = data.data[i]
                                vm.con.push(item);
                            }
                        }
                        vm.loading = false;
                        vm.page=data.min_id;
                        console.log(vm.page);
                    }   
                });
            },
            signRule:function(){
                $(".ruleDetail").css("display","block");
            },
            hideRule:function(){
                $(".ruleDetail").css("display","none");
            },
            back:function(){
                if(!!fromLogin){
                    // 如果goSign存在就跳转签到页面
                    // plus.webview.currentWebview().opener().close();//上一个页面
                    // plus.webview.currentWebview().close();
                    mui.openWindow({
                        url:"index.html",
                        id:"index",
                        createNew: true,
                        show:{
                            autoShow:"true",
                            aniShow:"slide-in-right",
                            duration:300,
                            event: 'titleUpdate',
                        },
                    })
                }else if(!!from_index){
                    // 否 就跳转个人中心（刷新积分）          
                    mui.back();
                }else{
                    // mui.openWindow({
                    //     url:"index.html?get_jifen=1",
                    //     id:"my",
                    //     createNew: true,
                    //     show:{
                    //         autoShow:true,
                    //         aniShow:"slide-in-right",
                    //         duration:300,
                    //     },
                    //     waiting:{
                    //         autoShow: false,
                    //     }
                    // });  
                    mui.back();
                    //获得父页面的webview
                    var list = plus.webview.currentWebview().opener();
                    //触发父页面的自定义事件(refresh),从而进行刷新
                    mui.fire(list, 'change_point');
                    //返回true,继续页面关闭逻辑
                    return true;
                }
                // history.back(-1);
            },
            // moveTop:function(){
            //     mui('.mui-content').scroll().scrollTo(0,0,0);
            // },
            // 打开或关闭提醒
            playTip:function(){
                this.tip = !this.tip;
                if(this.tip){
                    console.log(this.tip);
                    console.log("打开提醒");
                }else{
                    // 如果是关闭提醒就弹出关闭框
                    var btnArray = ["关闭提醒","继续提醒"];
                    mui.confirm("关闭提醒，可能会让你漏签哦","",btnArray,function(e){
                        console.log(e);
                        if (e.index == 1) {
                            // 进来表示用户点击继续提醒
                        } else {
                            // 进来表示用户点击关闭提醒
                            mui.toast("关闭提醒成功");
                        }
                    });
                    console.log(this.tip);
                    console.log("关闭提醒");
                }
            },
            // 点击关闭宝箱
            close:function(){
                $(".getPrize").css("display","none");
            },
            // 查看详情 跳转获奖历史页面
            goHistory:function(){
                common.pageTransition("prizeHistory.html");
            },
            // 点击按钮
            clickButton:function(){
                // if(plus.networkinfo.getCurrentType() != plus.networkinfo.CONNECTION_NONE) {
                    if(this.index==0 || this.index==2){
                        //显示签到  
                        for(var i=0;i<this.signNum;i++){
                            var temp = i+1;
                            $("#sign .continuousSign .progress li:nth-child(" + temp +")").css("backgroundColor","#ffa33b");
                        }
                        console.log(this.signNum);
                        var vm = this;
                        var request_obj = {};
                        common.curl(common.config +"/newapi/users/signin",request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
                            console.log(e);
                            if(e.code==403){
                                mui.toast('登录过期，请重新登录');
                                setTimeout(()=>{
                                    common.pageTransition('login.html');
                                },1000);
                            }else{
                                if(e.code==1){
                                    if(e.data.type==2){
                                        mui.toast("开箱成功");
                                        vm.integral = "开箱中"
                                        $(".playBox").css("display","block");
                                        setTimeout(()=>{
                                            $(".playBox").css("display","none");
                                            $(".getPrize").css("display","block");
                                            vm.getSign();
                                        },1000);
                                        vm.index = 1;
                                        vm.prizeName = e.data.data.name;
                                    }else{
                                        mui.toast("签到成功");
                                        localStorage.point = e.data.total_point;
                                        vm.getSign();
                                    }
                                    
                                }else{
                                    mui.toast(e.msg);
                                }
                            }
                        })
                    }else if(this.index==1){
                        //显示商城兑换  跳积分商城
                        // window.location.href="index.html?sign=2";

                        //获得父页面的webview
                        var list = plus.webview.getLaunchWebview();
                        //触发父页面的自定义事件(refresh),从而进行刷新
                        mui.fire(list, 'gohome');
                        mui.back();
                        //返回true,继续页面关闭逻辑
                    }
            },
            // 跳详情页
            goDetail:function(oid,title,oldprice,newprice,cheapprice,guide_title,saled,img){
                if(this.showLogin()) {
                    localStorage.goodisId = oid;
                    var titleNView = {
                        backgroundColor: '#fff',//导航栏背景色
                        titleText: '商品详情',//导航栏标题
                        titleColor: '#333',//文字颜色
                        type:'transparent',//透明渐变样式
                        autoBackButton: true,//自动绘制返回箭头
                        splitLine:{//底部分割线
                            color:'#cccccc'
                        }
                    }
                    mui.plusReady(function() {  
                        //预加载详情页  
                        webview_detail = mui.preload({  
                            url: "particulars.html?that=1&&dataid="+oid,  
                            id: 'particularsTop',  
                            styles: {  
                                "render": "always",//一直渲染  
                                "popGesture": "hide",  
                                "titleNView": titleNView//使用原生渐变导航  
                            }  
                        });  
                        mui.fire(webview_detail, 'get_detail', {  
                            oid:oid,
                            title:title,
                            oldprice:oldprice,
                            newprice:newprice,
                            cheapprice:cheapprice,
                            guide_title:guide_title,
                            saled:saled,
                            img:img
                        });
                    });
                    mui.openWindow({
                        url:"particulars.html?that=1&&dataid="+oid,
                        id:"particularsTop",
                        styles:{
                            titleNView:titleNView
                        },
                        show:{
                            autoShow:true,
                            aniShow:"slide-in-right",
                            duration:300,
                        }
                    });
                  }else{
                       window.location.href="login.html"
    //              common.pageTransition("login.html");
                }
            },
            //进来就获取用户签到情况
            getSign:function(){
                // mui.toast("获取用户签到状态成功");
                var vm=this;
                var request_obj = {};
                common.curl(common.config +"/newapi/users/get_sign_info",request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
                    console.log(e.data);
                    // alert(JSON.stringify(e));
                    if(e.code==403){
                        mui.toast('登录过期，请重新登录');
                        setTimeout(()=>{
                            common.pageTransition('login.html');
                        },1000);
                    }else{
                        vm.signNum = e.data.times;//已连续签到次数
                        vm.need_sign_times = e.data.need_sign_times;//还需签到天数
                        vm.day = e.data.reset_days;//总天数
                        vm.showPrize = e.data.box;//本期签到奖品
                        vm.rule = e.data.rule;
                        // 显示签到天数圆圈
                        for(var i=0;i<=vm.signNum;i++){
                            $("#sign .continuousSign .progress li:nth-child(" + i +")").css("backgroundColor","#ffa33b");
                        };
                        if(e.code==1){
                            // mui.toast("获取用户状态成功");
                            if(e.data.times==e.data.reset_days-1 & !e.data.is_sign){
                                //n-1天时 如果签到了n-1次，并且没有抽奖就进来
                                vm.integral = 0;
                                vm.index = 2;
                                $(".tomorrow").html("今日可抽奖一次");
                            }else if(e.data.times==e.data.reset_days-1 & e.data.is_sign){
                                //n-1天时 如果签到了n-1次，并且抽奖就进来
                                $(".tomorrow").html("明日可抽奖一次");
                                vm.integral = e.data.today_prize;
                                vm.index=1;
                            }else{ 
                                if(e.data.is_sign){
                                    // 为ture表示签到
                                    vm.index=1;
                                    //明日签到获取积分
                                    $(".tomorrow").html("明日签到可获取"+ e.data.next_prize.value +"积分");
                                    if(vm.day==1&&e.data.rule[vm.day].type==1){
                                        vm.integral = e.data.rule[vm.day].value;
                                        return
                                    }
                                    if(vm.day!=1&&e.data.rule[vm.day].type==1){
                                        // 表示积分 type=1
                                        vm.integral = e.data.rule[vm.day].value;
                                        return
                                    }else{
                                        // 表示抽奖 type=2
                                        vm.integral = e.data.today_prize;
                                        return
                                    }
                                }else{
                                    // 表示没签到
                                    vm.index = 0;
                                    vm.integral = 0;
                                    $(".tomorrow").html("今日签到可领取"+ e.data.now_prize.value +"积分");
                                }
                            }
                        }else{
                            mui.toast(e.msg);
                        }
                    }
                })
            },
            record:function(){
                //跳中奖记录
                common.pageTransition('prizeHistory.html');
            },
            qiandao_hot_tuijian:function(){
                //获取热门推荐广告图
                var that = this;
                var request_obj = {
                    adp_code:"qiandao_hot_tuijian",
                };
                common.curl(common.config +"/newapi/index/get_ad_list",request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
                    console.log(e);
                    if(e.code==1){
                        that.hot_tuijian = e.data.list;
                    }else{
                    //    mui.toast(e.msg);
                    console.log(e.msg);
                    }
                })
            },
            // 点击热门推荐图片跳转
            jump_tuijian:(url)=>{
                var link = url;
                // 判断是外部链接还是内部链接
                var Expression=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
                var objExp=new RegExp(Expression);
                if(objExp.test(url)==true){
                    mui.openWindow({
                        url:"outLink.html?link="+link,
                        id:"outLink",
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
                }else{
                    common.pageTransition(url);
                }
            },
            onshopscroll:function(){
                //商品滚动
                var elem=$('#pullrefresh .mui-scroll');
                var scrH = elem.height()
                var scrPH = elem.parent().height();
                var scrT=0;
                if(elem.css('transform')!=undefined){
                    scrT = elem.css('transform').split(/,/)[5].replace(/\)$/, "") - 0;
                }
                // console.log("这是scrH "+scrH);
                // console.log("这是scrPH "+scrPH);
                // console.log("这是scrT "+ -scrT);
                // console.log(scrPH-scrH/2>scrT);
                if(scrH/2<-scrT + scrPH){
                    isUp = true;
                }else{
                    isUp = false;
                }
            },
            onshopovs:function(){
                //商品滚动获取
                if(isUp){
                    isUp = false;
                    // this.babySug(true);
                }
            },
        },
        created:function(){
            this.getSign();
            this.qiandao_hot_tuijian();
        },
        updated:function(){
            $('#sign .nowDayPrize .Showprize li img, #sign .goodsRecommend li .img img').error(function(){
                $(this).attr("src", "./img/index_shoppingCity.jpg");
            });
            $('#sign .hotRecommend ul li img').error(function(){
                $(this).attr("src", "./img/sign_banner.png");
            });
        }
    })
    mui('.mui-scroll-wrapper').scroll({
        indicators: false,      //是否显示滚动条 默认为true
        deceleration: 0.001,    //阻尼系数,系数越小滑动越灵敏 默认0.0006
        bounce: true           //是否启用回弹 默认true
    });
    // 根据移动高度判断是否显示或隐藏置顶图标
    $(document).ready(function(){
        $(window).scroll(function() {
            var top = $(".hotRecommend").offset().top; //获取指定位置
            var scrollTop = $(window).scrollTop();  //获取当前滑动位置
            if(scrollTop > top){                 //滑动到该位置时执行代码
                $(".moveTop").css("display","block");
            }else{
                $(".moveTop").css("display","none");
            }
        });
    });

    


        
    