


mui.previewImage();
mui.init();
// 配置滑动
options = {
    scrollY: true, //是否竖向滚动
    scrollX: false, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: true, //是否显示滚动条
    deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
    bounce: true //是否启用回弹
}

// 获取url参数
var dataid = common.getUrlParam('dataid');
var womanDay = common.getUrlParam('womanDay');

function getDefaultData(){
    return{
        detailAllImg:[],
        banner:'./img/time.gif',
        ticket:'有券',
        title:'',
        fuhao:'¥',
        money:null,
        saled:null,
        addvice:'商品图文详情',
        oid:null,
        type_num:0,
        gotoTAOBAO:'',
        oldprice:null,
        newprice:null,
        cheapprice:null,
        guide_title:null,

    }
};
var newparticulars = new Vue({
    el:"#newparticulars",
    data:getDefaultData(),
    methods:{
       buy:function(){
            // 转链接口
            var vm = this;
            if(!!vm.gotoTAOBAO){
                plus.nativeUI.showWaiting();
                var ApplicationInf = {
                    pname: 'com.taobao.taobao',
                    action: 'taobao://'
                }
                if(plus.runtime.isApplicationExist(ApplicationInf)){
                    console.log("淘宝已安装");
                    mui.openWindow({
                        url:vm.gotoTAOBAO,
                        show:{
                            autoShow:false,//页面loaded事件发生后自动显示，默认为true
                            aniShow:"slide-in-right",//页面显示动画，默认为”slide-in-right“；
                            duration:'100'//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
                        },
                        waiting:{
                            autoShow:false,//自动显示等待框，默认为true
                            title:'正在加载...',//等待对话框上显示的提示内容
                            options:{
                                padlock:"ture"
                            }
                        },
                    })
                    return true;
                }else{
                    console.log("淘宝未安装");
                    mui.toast("检测到未安装淘宝app");
                    return false;
                }
            }
       },
       TAOBAO_url:function(id){
            // 转链接口
            vm = this;
            if(!!womanDay){
                vm.type_num = 1//womanDay存在表示三八节活动专场进入 
            }
            var request_obj = {
                item_id: id,
                type:vm.type_num
            };
            common.curl(common.config +"/newapi/tb/convertlink",request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
                    console.log(JSON.stringify(e));
                    if(e.code==403){
                        mui.toast('登录过期，请重新登录');
                        setTimeout(()=>{
                            common.pageTransition('login.html');
                        },1000)
                    }else{
                        if(e.code==1){
                            vm.gotoTAOBAO = e.data.coupon_click_url;
                        }else{
                            mui.toast("网络异常,请稍候再试");
                        }
                    }
            })
       }
    },
    created:function(){
        var vm = this;
        // 如果has存在就显示有券
        document.addEventListener('newparticulars', function(event) {  
            vm.oid = event.detail.oid;  
            if(!vm.oid) {  
                return;  
            }  
            //前页传入的数据，直接渲染，无需等待ajax请求详情后  
            // cheapprice:cheapprice,
            // guide_title:guide_title,
            // saled:saled,
            // img:img
            vm.oldprice = event.detail.oldprice;
            vm.newprice = event.detail.newprice;
            vm.cheapprice = event.detail.cheapprice;
            vm.title = event.detail.title;  
            vm.guide_title = event.detail.guide_title;  
            vm.saled = event.detail.saled;  
            vm.banner = event.detail.img;
            if(event.detail.index == 1){
                //有券
                vm.money = event.detail.newprice;  
                vm.ticket = '券后'
            }else{
                // 无券
                vm.money = event.detail.oldprice;
                vm.ticket = '优惠'
            }
            //向服务端请求文章详情内容  
            mui.ajax(common.config + "/newapi/index/gettbitemdetail", {  
                data:{
                    num_iid:vm.oid
                },
                type:'get',
                async:true,  
                dataType: 'json', //服务器返回json格式数据  
                timeout: 15000, //15秒超时  
                headers:{
                    key:localStorage.userKey
                },
                success: function(e) {  
                        console.log(e);
                        if(e.code == 403){
                            mui.toast(e.body.msg);
                            setTimeout(function(){
                                    mui.openWindow({
                                            url:"login.html",
                                            id:"login"
                                    });
                            },1000)
                    }else{
                        vm.detailAllImg = e.data.small_images.string;
                    }
                },  
                error: function(xhr, type, errorThrown) {  
                    mui.toast('获取文章内容失败');  
                    //TODO 此处可以向服务端告警  
                }  
            });  
            vm.TAOBAO_url(vm.oid);
        });
    },
    updated:function(){
        $('img').error(function(){
            $(this).attr("src", "./img/index_shoppingCity.jpg");
        })
    }
})

mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0006 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

// 监听后台运行
document.addEventListener('pause',function(){
    console.log('后台运行...');
    plus.nativeUI.closeWaiting(); 
});