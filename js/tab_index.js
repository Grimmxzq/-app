


// 首页商城


mui.init({
    statusBarBackground:"#fff",
});
mui.plusReady(function(){              
    plus.navigator.setStatusBarStyle('dark');                
}); 
var tab_index = new Vue({
    el:"#tab_index",
    data:{
        banner:[],
        indexBanner2:[],
        bannerfrist:[],
        bannerlast:[],
        menus:[
            {text:"男装",icon:"./img/home_icon_men.png",num:"2"},
            {text:"女装",icon:"./img/home_icon_girl.png",num:"1"},
            {text:"美妆",icon:"./img/home_icon_cosmetics.png",num:"4"},
            {text:"箱包",icon:"./img/home_icon_bag.png",num:"7"},
            {text:"鞋具",icon:"./img/home_icon_shoes.png",num:"6"},
            {text:"母婴",icon:"./img/home_icon_baby.png",num:"9"},
            {text:"美食",icon:"./img/home_icon_food.png",num:"11"},
            {text:"更多",icon:"./img/home_icon_more.png",num:"0"},
        ],
        index_page:1,
        shopindex:0,
        loading:false,
        finished:false,
        shop_list:[],//商品列表
        pointpre:0,
        returnpre:0,
        signImg:{},
        isLoading: false
    },
    created:function(){
        this.index_version();
        this.getpre();
        this.get_click_first();
        mui.plusReady(function() {
            console.log( "uuid: "+plus.device.uuid );		
            localStorage.uuid = plus.device.uuid;//存储设备唯一标示;
            // cid  plus.push.getClientInfo().clientid 设备唯一编号;
        });
        
    },
    methods:{
        //判断是否登录
        showLogin: function(){
            if(!localStorage.userKey){
                  mui.openWindow({
                      url:"login.html",
                      id:"login"
                  });
                  // common.pageTransition('login.html');
              return false;
          }
            return true;
        },
        // 首页轮播+版本号
        index_version:function(){
            console.log(common.version);
            var vm = this;
            this.$http.get(common.config+'/newapi/index/index', {
                version: common.version,
                plustype:common.plustype
            },{
                headers:{
                    uuid:localStorage.uuid
                }
            }).then(function (e) {
                console.log(e.body);
                localStorage.secret = e.body.data.secret;
                if(e.body.data.version_info.update_must == 1){
                    //进入这里就是强制跟新
                    vm.versionNum = e.body.data.version_info.new_version;
                    vm.updateLink = e.body.data.version_info.url;
                    console.log(vm.versionNum);
                    $(".backgroundUpdate").addClass("active");
                }else{
    
                }
                if(e.body.code==1){
                    //首页顶部banner图片获取
                    if(e.body.data.data_banner.length<2){
                        vm.banner = e.body.data.data_banner;
                    }else{
                        $(".slider_banner").css("display","none");
                        $(".slider_banner2").css("display","block");
                        vm.banner=e.body.data.data_banner;
                            vm.bannerfrist = e.body.data.data_banner[e.body.data.data_banner.length - 1];
                            vm.bannerlast = e.body.data.data_banner[0];
                    }
                    //首页中部banner图片获取
                    if(e.body.data.data_center_ad.length<2){
                        vm.indexBanner2 = e.body.data.data_center_ad;
                        
                    }else{
                        $(".activeImg .show_two").css("display","block");
                        $(".activeImg .show_one").css("display","none");
                        vm.indexBanner2 = e.body.data.data_center_ad;
                    }
                    //首页签到弹框图片获取
                    if(e.body.data.data_alert.length==0||e.body.data.data_alert==""){
                        
                    }else{
                        vm.signImg = e.body.data.data_alert[0];
                        var url = vm.signImg.url;
                        var picurl = vm.signImg.picurl;
                        mui.plusReady(function(){
                            // $(".jump_sign").css("display",'block');
                            // //获取父页面的webview对象
                            // var main = plus.webview.currentWebview().parent();
                            // //定义自定义事件openMask，通知父页面的打开遮罩蒙板
                            // mui.fire(main, 'openMask', {});
                            var wb = plus.webview.create('sign_img.html', 'sign_img.html', {
                                background: 'transparent',
                                zindex: '101'
                            },{
                                picurl:picurl,
                                url:url
                            });
                            wb.show();
                        })
                    }
                }else{
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        // 跳转去列表详情页面
        gotolist:function(i){
            if(i==0){
              mui.openWindow({
                  url:"update2.html?num="+i,
                  id:"update",
                  createNew: true,
                  show:{
                      autoShow:true,
                      aniShow:"slide-in-right",
                      duration:300,
                  },
                  waiting:{
                      autoShow: false,
                  }
              }); 
            }else{
              mui.openWindow({
                  url:"update.html?num="+i,
                  id:"update",
                  createNew: true,
                  show:{
                      autoShow:true,
                      aniShow:"slide-in-right",
                      duration:300,
                  },
                  waiting:{
                      autoShow: true,
                  }
              });
            }
          
        },
        // 获取好单库商品列表
        getshop:function(){
            var vm = this;
            $.ajax({
                type: "get",
                url: 'http://v2.api.haodanku.com/itemlist',
                dataType:'json',
                data: {
                    apikey:'redgo',
                    nav :3,
                    min_id:vm.index_page,
                    back:20,
                    cid:vm.shopindex,
                },
                success: function(data) {
                    console.log(data);
                    if(data.data.length<20){
                        vm.finished = true;
                    }
                    // 加载状态结束
                    if(vm.index_page==1){
                        console.log(vm.index_page)
                        vm.shop_list = data.data;
                    }else{
                        console.log(vm.index_page)
                        for (let i = 0; i < data.data.length; i++) {
                            var item = data.data[i]
                            vm.shop_list.push(item);
                        }
                    }
                    vm.loading = false;
                    vm.index_page=data.min_id;
                    console.log(vm.index_page);
                }   
            });
        },
        //商品列表跳详情
        onstorecon:function(oid,title,oldprice,newprice,cheapprice,guide_title,saled,img){
            console.log(guide_title);
            //   mui预加载参考  http://ask.dcloud.net.cn/article/12575
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
                        url:"newparticulars.html?that=1&&dataid="+oid,  
                        id: 'newparticulars',  
                        styles: {  
                            "render": "always",//一直渲染  
                            "popGesture": "hide",  
                            "titleNView": titleNView//使用原生渐变导航  
                        }  
                    });  
                    mui.fire(webview_detail, 'newparticulars', {  
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
                    url:"newparticulars.html?that=1&&dataid="+oid,  
                    id:"newparticulars",
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
                mui.openWindow({
                    url:"login.html",
                    id:"login"
                });
            }
        },
        getpre:function(){//返佣比例
            var vm = this;
            $.ajax({
                type:"get",
                url:common.config+"/index.php/api/index/getpre",
                async:true,
                success:function(data){
                    vm.pointpre = data.money_point*1;
                    vm.returnpre = data.gold_pro*1;
                }
            });
        },
        //跳转benner页面
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
        // 活动页面跳转
        onupdate: function(oindex){
            common.pageTransition("update.html?that="+oindex);
        },
        // 点击搜索框进行全网搜索
        onsearch: function(){
            mui.openWindow({
                url:"search.html",
                id:"pagesearch",
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
        //前往站内信
        go_msg_center:function(){
            if(this.showLogin()) {
                mui.openWindow({
                    url:"msg_center.html",
                    id:"msg_center",
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
            }
        },
        // 是否存在淘宝标题
        get_click_first:function(){
            mui.plusReady(function(){
                var Context = plus.android.importClass("android.content.Context");
                var main = plus.android.runtimeMainActivity();
                var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
                var msg_title = plus.android.invoke(clip, "getText");//复制的标题
                // console.log(msg_title!=localStorage.search_goods_name)
                if(msg_title&&msg_title!=localStorage.search_goods_name){
                    var ws = plus.webview.getDisplayWebview();//仅在屏幕区域显示的Webview窗口，如果Webview窗口显示了但被其它Webview窗口盖住则认为不可视。
                    var cur = plus.webview.currentWebview();//获取当前webview窗口
                    //判断是否首页tab页面
                    var isTabs = false;
                    //判断是否index 页面
                    id = plus.webview.getDisplayWebview();
                    //判断是否是启动页
                    // console.log(JSON.stringify(id));
                    // console.log(JSON.stringify(ws));
                    // console.log(JSON.stringify(cur));
                    
                    if(id.length == 1 && id[0].id.indexOf('HBuilder') != -1){
                        return;
                    }
                    
                    //判断是否登录页
                    if(id[0].id.indexOf('login') != -1 || id[0].id.indexOf('regist') != -1 || id[0].id.indexOf('share') != -1  ){
                        return ;
                    }
                    console.log(JSON.stringify(id));
                    var htmls = window.PAGE_ID_HOME + ',' + window.PAGE_ID_MATTER + ',' + window.PAGE_ID_ENERGIZ + ',' + window.PAGE_ID_MIAN;
                    for(var i = 0; i < ws.length; i++) {
                        if(htmls.indexOf(ws[i].id) != -1) {
                            isTabs = true;
                            break;
                        }
                    }
                    var id = null;
                    if(isTabs) {
                        id = plus.webview.getLaunchWebview();
                        id.setStyle({
                            mask: 'rgba(0,0,0,0.5)'
                        });
                    } else {
                        id = plus.webview.getDisplayWebview();
                        id = id[0];
                        id.setStyle({
                            mask: 'rgba(0,0,0,0.5)'
                        });
                    }
                    localStorage.setItem('copySearchId', id.id);
                    var wb = plus.webview.create('active_box.html', 'active_box.html', {
                        background: 'transparent',
                        zindex: '100'
                    });
                    wb.show();
                }
            })
        },
        // 下拉刷新
        onRefresh:function(){
            setTimeout(() => {
                // this.$toast('刷新成功');
                this.isLoading = false;
            }, 0);
        }
    },
    mounted:function(){
        // plus.webview.open("login.html","login.html",{opacity:0.8});
    },
    updates:function(){
        // 图片加载失败显示系统自带图片
        $('.slider_banner img').error(function(){
            $(this).attr("src", "./img/index_loading.jpg");
        });
        $('.activeImg img').error(function(){
            $(this).attr("src", "./img/index_banner.jpg");
        });
        $('.con img').error(function(){
            $(this).attr("src", "./img/index_shoppingCity.jpg");
        });
    }
})

// 当应用从后台进入前台时，触发resume事件
document.addEventListener("resume", function() {
    console.log("触发后台事件--------tab_index")
    // plus.nativeUI.closeWaiting();
    tab_index.get_click_first();
}, false);





 // 获取置顶对象
 var obj = document.getElementById('scroll');
 var scrollTop = null;

 // 置顶对象点击事件
 obj.onclick = function() {
     var timer = setInterval(function() {
         window.scrollBy(0, -100);
         if (scrollTop == 0) 
             clearInterval(timer);
     }, 5);
 }

 // 窗口滚动检测
 window.onscroll = function() {
     scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
     obj.style.display = (scrollTop >= 500) ? "block" : "none";
 }