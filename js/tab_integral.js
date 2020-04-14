

// 积分商城



var tab_integral = new Vue({
    el:"#tab_integral",
    data:{
        IntegralDirectory:[],
        integralpage:1,
        loading:false,
        finished:false,
        integralcon:[],
        integralMenu:[
            {text:"潮流数码",msg:"电竞神奇钜惠",img:"http://www.ycyz-yt.com/uploads/goods/aaba455e2b43a52ae8257182fe2959c8.jpeg",num:4,jifen:1990,title:"荣耀手环4标准版",price:199},
            {text:"明显同款",msg:"时尚潮流运动",img:"http://www.ycyz-yt.com/uploads/goods/2cc1bda6c63605229c7550e76198a90b.jpeg",num:6,jifen:5090,title:"FILA斐乐明星同款手表",price:509},
            {text:"便携办公",msg:"科技改变生活",img:"http://www.ycyz-yt.com/uploads/goods/c732f7a6adbbbc7f2dfcd029f68f1140.jpeg",num:13,jifen:5280,title:"Herschel经典双肩包",price:528},
            {text:"时尚女装",msg:"全民潮流女装",img:"http://www.ycyz-yt.com/uploads/goods/33bcca2048eb8c8776885d5529f248c7.jpeg",num:38,jifen:2280,title:"时尚甜美文艺女款树叶手镯",price:228},
        ],
        showLoading:false
    },
    methods:{
        // 是否登录
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
        gotodetail:function(id,picurl,price,title,jifen){
            localStorage.goodisId = id;
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
                    url: "integral_particulars.html?dataid="+id,  
                    id: 'integral_particulars',  
                    styles: {  
                        "render": "always",//一直渲染  
                        "popGesture": "hide",  
                        "titleNView": titleNView//使用原生渐变导航  
                    }  
                });  
                mui.fire(webview_detail, 'get_detail', {  
                    id:id,
                    picurl:picurl,
                    title:title,
                    jifen:jifen,
                    price:price
                });
            });
            mui.openWindow({
                url:"integral_particulars.html?dataid="+id,
                id:"integral_particulars",
                styles:{
                    titleNView:titleNView
                },
                show:{
                    autoShow:true,
                    aniShow:"slide-in-right",
                    duration:300,
                }
            });
        },
        //积分商城分类
        get_integral_menus:function(){
            var request_obj = {parent_id:0}//data值
            var vm = this;
            common.curl(common.config +"/newapi/index/get_cats",request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
                console.log(e);
                if(e.code==1){
                    vm.IntegralDirectory = e.data.list;
                }else{
                    mui.toast(e.msg);
                }
            });
        },
        //点击商城分类获取商品
        get_goods:function(id,page){
            console.log("商城分类id:"+ id);
            console.log(!!page);
            if(!!page){
                this.integralpage = page;
                this.finished = false;
            }
            var vm = this;
            var request_obj = {size:10,page:this.integralpage,cid:id};
            common.curl(common.config +"/newapi/index/search_goods",
            request_obj,
            {sign:create_sign(request_obj),key: localStorage.userKey},
            'post',
            function(e){
                console.log(e);
                if(!!page){
                    vm.integralcon = [];
                }
                if(e.code==501){
                    mui.toast(e.msg);//提示系统错误，数据请求过快
                    vm.loading = false;
                    vm.finished = true;
                    return false;
                }
                if(e.data.length<10){
                    vm.finished = true;
                }
                // 加载状态结束
                if(vm.integralpage==1){
                    console.log(vm.integralpage);
                    vm.integralcon = e.data;
                    vm.loading = false;
                    vm.integralpage++;
                    return false;
                }else{
                    console.log(vm.integralpage);
                    for (let i = 0; i < e.data.length; i++) {
                        var item = e.data[i]
                        vm.integralcon.push(item);
                    }
                    vm.loading = false;
                    vm.integralpage++;
                }
                console.log(vm.integralpage);
            })
        },
        //去积分商品详情页
        particulars: function(id,picurl,price,title,jifen){
            if(this.showLogin()) {
              localStorage.goodisId = id;
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
                      url: "integral_particulars.html?dataid="+id,  
                      id: 'integral_particulars',  
                      styles: {  
                          "render": "always",//一直渲染  
                          "popGesture": "hide",  
                          "titleNView": titleNView//使用原生渐变导航  
                      }  
                  });  
                  mui.fire(webview_detail, 'get_detail', {  
                      id:id,
                      picurl:picurl,
                      price:price,
                      title:title,
                      jifen:jifen
                  });
              });
              mui.openWindow({
                  url:"integral_particulars.html?dataid="+id,
                  id:"integral_particulars",
                  styles:{
                      titleNView:titleNView
                  },
                  show:{
                      autoShow:true,
                      aniShow:"slide-in-right",
                      duration:300,
                  }
              });
            }
        },
        // 跳去积分搜索页面
        onsearchHistory:function(){
            mui.openWindow({
                url:"searchHistory.html",
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
        // 历史兑换页面
        harvest:function(){
            mui.openWindow({
                url:"harvest.html",
                id:"harvest",
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
        }
    },
    created:function(){
        var vm = this;
        mui.init();
        immersedStyle(0);
        mui.plusReady(function(){
            vm.showLoading = true;
        })
    },
    mounted:function(){
        this.get_integral_menus();
        this.get_goods(0,0);
    }
})

document.addEventListener('show', function () {
    setTimeout(function () {
        tab_integral.showLoading = false;
    }, 300)
    console.log('这里是积分商城的 show');
}, false);

    