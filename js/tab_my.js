


mui.init();

var tab_my = new Vue({
    el:"#tab_my",
    store,
    data:{
        name:"",
        mid:null,
        phone:null,
        qrcord:"",//用户推广码
        point:null,//积分
        my_banner2:[],
        face:"./img/profile.jpg",
        banner:{}
    },
    methods:{
        // 获取用户信息
        getmy:function(){
            var vm =this;
            var request_obj = {};
            common.curl(common.config +'/newapi/users/userinfo',request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
                console.log(e.data)
                if(e.code==1){
                     vm.name=e.data.nickname;
                     vm.phone=e.data.mobile;
                     vm.mid=e.data.uid;
                     vm.qrcord=e.data.code;
                     localStorage.myphone =e.data.mobile,
                     localStorage.point=e.data.point,
                     vm.point=localStorage.point,
                     localStorage.count_dkhb = e.data.count_dkhb;
                     localStorage.money = e.data.money;
                     vm.face = e.data.face;
                }else{
                    // mui.toast(e.msg);
                }
            }) 
        },
        //跳转banner页面
        banner_url:function(url){
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
        //测试
        text:function(){
            mui.openWindow({
                url:"text.html",
                styles:{
                    cachemode: 'default',
                },
                show:{
                    autoShow: true,
                    aniShow: 'slide-in-right',
                    duration: 300,
                    event: 'loaded', 
                },
                waiting:{
                    autoShow: false,
                }
            });
        },
        // 点击编辑
        edd:function(){
            mui.openWindow({
                url:"edd.html",
                id:"main-box",
                show:{
                    autoShow: true,
                    aniShow: 'slide-in-right',
                    duration: 300,
                    event: 'loaded', 
                },
                waiting:{
                    autoShow: false,
                }
            });
        },
        // 跳转去签到
        goSign:function(){
            mui.openWindow({
                url:"sign2.html",
                id:"sign",
                styles:{
                    cachemode:"noCache",
                },
                createNew: true,
                show:{
                    autoShow:"true",
                    aniShow:"slide-in-right",
                    duration:100
                },
                waiting:{
                    autoShow: true,
                    options:{
                        padlock: true
                    }
                }
            });
        },
        // 客服
        kf_link:function(){
            plus.runtime.openURL("http://p.qiao.baidu.com//im/index?siteid=12516047&ucid=26239188");
        },
        // 分享
        share:function(){
            mui.openWindow({
                url:'share.html',
            });
        },
        // 钱包
        packet:function(){
            var link = "page1.html";
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
        },
        // 积分流水
        goIntegralstate:function(){
            var link = "integralstate.html";
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
        },
        // 我的订单
        indent:function(){
            var titleNView = {
                backgroundColor: '#fff',//导航栏背景色
                titleText: '我的订单',//导航栏标题
                titleColor: '#333',//文字颜色
                // type:'transparent',//透明渐变样式
                autoBackButton: true,//自动绘制返回箭头
            }
            mui.openWindow({
                url:"order.html",
                styles:{
                    cachemode: 'default',
                    titleNView:titleNView
                },
                show:{
                    autoShow: true,
                    aniShow: 'slide-in-right',
                    duration: 300,
                    event: 'loaded', 
                },
                waiting:{
                    autoShow: false,
                }
            });
        },
        // 新手教程
        teach_You:function(){
            var link = "http://www.ycyz-yt.com/wap/sp/index/id/7.html"
            var titleNView = {
                backgroundColor: '#fff',//导航栏背景色
                titleText: '新手教程',//导航栏标题
                titleColor: '#333',//文字颜色
                // type:'transparent',//透明渐变样式
                autoBackButton: true,//自动绘制返回箭头
                splitLine:{//底部分割线
                    color:'#cccccc'
                }
            }
            mui.openWindow({
                url:"outLink.html?link="+link,
                id:"outLink",
                styles:{
                    cachemode: 'default',
                    titleNView:titleNView
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
        },
        // 设置
        set:function(){
            mui.openWindow({
                url:"set.html",
                id:"set",
                show:{
                    autoShow:"true",
                    aniShow:"slide-in-right",
                    duration:200,
                },
                waiting:{
                    autoShow: false
                }
            });
        },
        // banner图广告
        my_banner:function(){
            var that = this;
            var request_obj = {adp_code:"userinfo_bottom"}//data值
            // create_sign(request_obj);
            common.curl(common.config +"/newapi/index/get_ad_list",request_obj,{sign:create_sign(request_obj)},'post',function(e){
                console.log(e);
                if(e.code==1){
                    // that.my_banner2 = e.data.list;
                    if(e.data.list.length<2){
                        // 只获取到0-1个
                        that.banner = e.data.list[0];
                    }else{
                        $(".myselfImg .show_one").css("display","none");
                        $(".myselfImg .show_two").css("display","block");
                        that.my_banner2 = e.data.list;
                    }
                    console.log(that.my_banner2); 
                }else{
                    mui.toast(e.msg);
                }
            })
        },
        // 设置头像
        upimg:function(){
            //上传头像
            common.pageTransition('tailor.html');
        },
    },
    created:function(){
        this.getmy();
        this.my_banner();
    },
    mounted:function(){
        console.log(this.$store);
    },
    computed:{
        point(){
            var point = this.$store.state.point;
            console.log(this.$store.state);
            return point;
        }
    }
})


document.addEventListener('change_point', function() {
    tab_my.getmy();
});