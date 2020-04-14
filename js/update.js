/*************************************************
 *FileName:      update.js
 *Description:   今日上新.js
 *************************************************/
    /*
     * 启动
     */
    mui.init();
    
    /*
     * 变量初始化
     */
    var isUp=false;
    /*
     * 主程序
     */ 
    var commodity = new Vue({
      el: '#main-box',
      data: {
        eq:0,
        type:0,
        sort:0,
        that:common.getUrlParam('that'),
        num:common.getUrlParam('num'),
        openmuea:false,
        page:1,
        shork:'综合排序',
        shorks:[
            '综合排序',
            '销量优先',
            '价格从低到高',
            '价格从高到低',
        ],
        titletype:['全部','女装', '男装','内衣','美妆','配饰','鞋品','箱包','儿童','母婴','居家','美食','数码','家电','其他','车品','文体',],
        indexcon:[],
        pointpre:0,
        returnpre:0,
        mains:[
            {txt:"膨化食品",img:"../img/eating1.png"},
            {txt:"膨化食品",img:"../img/eating1.png"},
            {txt:"膨化食品",img:"../img/eating1.png"},
            {txt:"膨化食品",img:"../img/eating1.png"},
            {txt:"膨化食品",img:"../img/eating1.png"},
        ],
        loading:false,
        finished:false,
        show_loading:false
      },
      created:function(){
        if(localStorage.index_type){
            this.eq=localStorage.index_type;
            localStorage.index_shork==0 ? this.sort=0 :localStorage.index_shork==2 ? this.sort=4 : localStorage.index_shork==3 ? this.sort=1: this.sort=2;
            this.shork=this.shorks[this.sort];
            delete localStorage.index_type;
            delete localStorage.index_shork;
        }
        var vm=this;
        //返佣比例
        this.getpre();
        if(this.that==0){
            //今日上新
            this.type=1;
        }else if(this.that==1){
            //9.9包邮
            this.type=2;
        }else if(this.that==2){
            //品牌精选
            this.type=3;
        }else if(this.that==3){
            //热销榜单
            this.type=4;
            this.sort=4;
        }else if(this.that==4){
            //超值特惠
            this.type=5;
            this.sort=1;
        }
        if(this.num){

            console.log(this.num)
            this.eq=this.num
        }
        this.getlist();
        setTimeout(function () {
            vm.show_loading = true;
        }, 200)
      },
      methods: {
        showLogin: function(){
            if(!localStorage.userKey){
              mui.plusReady(function(){ 
                //   common.pageTransition('login.html')
                mui.openWindow({
                    url:"login.html",
                    id:"login"
                });
              })
              return false;
          }
            return true;
        },
        getlist:function(oppo){
            //商品列表
            var vm=this;
            $.ajax({
                type: "get",
                url: "http://v2.api.haodanku.com/column",//http://v2.api.haodanku.com/column
                dataType:'json',
                data: {
                    apikey:'redgo',
                    cid:vm.eq,
                    type:vm.type,
                    sort:vm.sort,
                    min_id:vm.page,
                    back:20,
                },
                success: function(data) {
                    console.log(data);
                    if(data.data.length<20){
                        vm.finished = true;
                    }
                    // 加载状态结束
                    if(vm.page==1){
                        console.log(vm.page)
                        vm.indexcon = data.data;
                        vm.loading = false;
                    }else{
                        console.log(vm.page)
                        for (let i = 0; i < data.data.length; i++) {
                            var item = data.data[i]
                            vm.indexcon.push(item);
                        }
                        vm.loading = false;
                    }
                    vm.page=data.min_id;
                    console.log(vm.page);
                }  
            });
        },
        onstorecon: function(oid,title,oldprice,newprice,cheapprice,guide_title,saled,img){
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
        muea: function(){
            //点击菜单
            this.openmuea=true;
        },
        offmuea: function(){
            this.openmuea=false;
        },
        onshork: function(othis,index){
            // mui('#pullrefresh').scroll().scrollTo(0,0,0);
            this.indexcon=[];
            this.page=1;
            this.shork=othis;
            this.openmuea=false;
            index==0 ? this.sort=0 :index==1 ? this.sort=4 : index==2 ? this.sort=1: this.sort=2;
            this.getlist();
            console.log(index)
        },
        onscroll: function(){
            //滚动
            var elem=$('.mui-scroll');
            var scrH = elem.height()
            var scrPH = elem.parent().height();
            var scrT=0;
            if(elem.css('transform')!=undefined){
                scrT = elem.css('transform').split(/,/)[5].replace(/\)$/, "") - 0
            }
            if(scrPH-scrH>scrT){
                isUp = true;
                elem.children('.ys-scroll-btm').html('松开加载更多');
            }else{
                isUp = false;
            }
        },
        oves: function(){
            //商品滚动获取
              if(isUp){
                isUp = false;
                this.getlist(true);
              }
        },
        totop: function(){
            mui('#pullrefresh').scroll().scrollTo(0,0,0);
        },
        ontype: function(index){
            mui('#pullrefresh').scroll().scrollTo(0,0,0);
            this.page=1;
            this.eq=parseInt(index);
            this.indexcon=[];
            this.getlist();
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
      },
      updated:function(){
        $('.update .main .con img').error(function(){
            $(this).attr("src", "./img/index_shoppingCity.jpg");
        });
      }
    })