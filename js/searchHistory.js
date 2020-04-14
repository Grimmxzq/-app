/*************************************************
 *FileName:      search.js
 *Description:   搜索.js
 *************************************************/
    /*
     * 启动
     */
    mui.init({
        statusBarBackground:"#fff"
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
    /*
     * 主程序
     */ 
    var search = new Vue({
      el: '#pagesearch',
      data: {
        searchval:'',
        mainalink:arr,
        con: [],
        innerhtml: '综合排序',
        innerhtmllist: [
            '综合排序',
            '销量优先',
            '价格从高到低',
            '价格从低到高'
        ],
        sort:0,
        page:1,
        integralcon:[],
        serchkey:"",
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
          onsork: function(){
              document.querySelector(".onsork-box").classList.toggle('active');
          },
          onsorka: function(othis,index){
              //下拉框
            this.innerhtml = othis;
            this.page=1;
            document.querySelector(".onsork-box").classList.remove('active');
            console.log(index)
            if(index==1){
                this.sort=4;
            }else if(index==2){
                this.sort=2;
            }else if(index==3){
                this.sort=1;
            }else{
                this.sort=0;
            }
            this.onsearch();
            mui('#pullrefresh').scroll().scrollTo(0,0,0);
          },
          oninput: function(){
              //输入文字效果
              if(document.querySelector(".search-input").value.length==0){
                  document.querySelector(".input-box").classList.remove('active');
                  document.querySelector(".pagesearch").classList.remove('active');
                //   immersedStyle(0.5);
              }else{
                  document.querySelector(".input-box").classList.add('active');
              }
          },
          particulars: function(id){
                if(this.showLogin()) {
                    // common.pageTransition("particulars.html?that=2&&dataid="+id);
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
                    // var webview = plus.webview.create("particulars.html?that=1&&dataid="+oid, "particulars", {
                    //      titleNView:titleNView
                    // });
                    mui.openWindow({
                        url:"particulars.html?that=2&&dataid="+id,
                        id:"particularsTop",
                        styles:{
                            titleNView:titleNView
                        }
                    });
                }else{
                    window.location.href="login.html"
                }
            },
          onsbtn: function(){
              //点击搜索
              this.page=1;
              if(this.searchval.length>0){
                  if(this.mainalink.indexOf(this.searchval)>=0){
                      this.mainalink.splice( this.mainalink.indexOf( this.searchval ), 1 );
                  }
                  this.mainalink.unshift(this.searchval);
                  localStorage.search_arr=this.mainalink;
                  if(this.mainalink.length>8){
                      this.mainalink.length = 8;
                  }
              }
            this.onsearch();
            mui('#pullrefresh').scroll().scrollTo(0,0,0);
          
          },
          closeAllmsg:function(){
            document.getElementById("search-input").value = "";
            $(".closemsg").removeClass("active");
        },
          onsearch:function(oppo){
            console.log('搜索')
            console.log(this.searchval)
              this.integralcon=[];
              getserchkey_oppo=true;
              var vm=this;
              var request_obj = {
                keyword:this.searchval,
              };
                common.curl(common.config +"/newapi/index/search_goods",request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
                    console.log(e);
                    if(e.code==1){
                        if(e.data.length==0){
                            $('.mui-scroll').children('.ys-scroll-btm').html('暂无更多商品');
                        }else{
                            vm.integralcon=e.data;
                        }
                        
                        console.log(vm.integralcon);
                        $(".main").css("display","none");
                        $(".content").css("display","block")
                        $(".pagesearch .mui-bar-nav ~ .mui-content > .mui-scroll-wrapper").css("paddingTop","2.2rem")
                        $(".pagesearch .wrapper").css("display","block")
                    }else{
                        vm.integralcon=[];
                        mui.toast(e.msg);
                        $('.mui-scroll').children('.ys-scroll-btm').html('暂无更多商品');
                    }
                })
          },
          onolda: function(otext){
            //点击搜索词条
            this.page=1;
            this.searchval=otext;
              if(this.searchval.length>0){
                  if(this.mainalink.indexOf(this.searchval)>=0){
                      this.mainalink.splice( this.mainalink.indexOf( this.searchval ), 1 );
                  }
                  this.mainalink.unshift(this.searchval);
                  localStorage.search_arr=this.mainalink;
                  if(this.mainalink.length>8){
                      this.mainalink.length = 8;
                  }
              }
            document.querySelector(".input-box").classList.add('active');
            this.onsearch();
            mui('#pullrefresh').scroll().scrollTo(0,0,0);
          },
          onstorecon: function(oid){
              common.pageTransition("particulars.html?that=1&&dataid="+oid);
          },
          onclear:function(){
              this.mainalink = [];
              delete localStorage.search_arr;
          },
      },
      updated:function(){
        $('.pagesearch .wrapper .con .img img').error(function(){
            $(this).attr("src", "./img/index_shoppingCity.jpg");
        });
      },
      mounted:function(){
        var that = this
        document.getElementById("search-input").addEventListener("keypress",function(event) {
            if(event.keyCode == "13") {
                search.page=1;
                if(search.searchval.length>0){
                    if(search.mainalink.indexOf(search.searchval)>=0){
                        search.mainalink.splice( search.mainalink.indexOf( search.searchval ), 1 );
                    }
                    search.mainalink.unshift(search.searchval);
                    localStorage.search_arr=search.mainalink;
                    if(search.mainalink.length>8){
                        search.mainalink.length = 8;
                    }
                }
                document.activeElement.blur();//收起虚拟键盘
                document.querySelector(".main").classList.add('active');
                $("#loading").show();
                that.onsearch();//TODO 完成搜索事件
                event.preventDefault(); // 阻止默认事件---阻止页面刷新
            }
        });
      }
    })
    common.scrollUpDown($('.mui-scroll'),function(index){
        if(index>0&&isUp){
            isUp = false;
            search.onsearch(true);
            console.log(123)
        }else if(index<0){
            isUp = true;
            search.page=1;
            search.con=[];
            search.onsearch();
        }else if(index>0 && !isUp){
            $('.mui-scroll').children('.ys-scroll-btm').html('已经到底了');
        }
    });
    mui('.mui-scroll-wrapper').scroll({
        indicators: false,      //是否显示滚动条 默认为true
        deceleration: 0.003,    //阻尼系数,系数越小滑动越灵敏 默认0.0006
        bounce: true           //是否启用回弹 默认true
    });
    function listenMsg(){
        var msg = document.getElementById("search-input").value
        if(!!msg){
            $(".closemsg").addClass("active");
        }else{
            $(".closemsg").removeClass("active");
        }
    }
