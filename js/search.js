/*************************************************
 *FileName:      search.js
 *Description:   搜索.js
 *************************************************/
    /*
     * 启动
     */
    mui.init({
        // statusBarBackground:"#fff"
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
//   获取url参数
    function get_params(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        // alert(decodeURI(window.location.search));
        var url = decodeURI(window.location.search);
        var r = url.substr(1).match(reg); 
        if (r != null) return unescape(r[2]); return null; 
    }
    var serch_content = get_params('serch_content');
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
            '价格从低到高',
            '价格从高到低'
        ],
        sort:0,
        page:1,
        serch_content,
        sort:2,
        sale_flag:false,
        sale_click:false,
        flag:false,
        price_flag:false,
        price_click:false,
        chang_list:false
      },
      methods: {
        showLogin: function(){
            if(!localStorage.userKey){
              mui.plusReady(function(){ 
                //   common.pageTransition('login.html');
                mui.openWindow({
                    url:"login.html",
                    id:"login"
                });
              })
              return false;
          }
            return true;
        },
            onsork: function(){
                document.querySelector(".onsork-box").classList.toggle('active');
            },
            icon_change_list:function(){
                mui('#pullrefresh').scroll().scrollTo(0,0,0);
                var vm = this;
                if(!vm.chang_list){
                    $(".icon_change_list").addClass('active');
                    $(".lists").addClass('active');
                    $(".row_list").removeClass('active');
                    vm.chang_list = true;
                }else{
                    $(".icon_change_list").removeClass('active');
                    $(".lists").removeClass('active');
                    $(".row_list").addClass('active');
                    vm.chang_list = false;
                }
            },
            change_price_sort:function(){
                var vm = this;
                if(vm.price_flag == 0 ){
                    $(".price_up").css('border-color','transparent transparent #f1341c');
                    $(".price_down").css('border-color','#999 transparent transparent');
                    vm.price_flag = true;
                    console.log("价格从低到高");
                    vm.sort = 2;
                }else{
                    $(".price_up").css('border-color','transparent transparent #999');
                    $(".price_down").css('border-color','#f1341c transparent transparent');
                    vm.price_flag = false;
                    console.log("价格从高到低");
                    vm.sort=1;
                }
                $("#loading").show();
                this.onsearch(false,false,true);
                mui('#pullrefresh').scroll().scrollTo(0,0,0);
            },
            change_sale_sort:function(){
                var vm = this;
                if(vm.sale_flag == 0 ){
                    $(".sale_up").css('border-color','transparent transparent #f1341c');
                    $(".sale_down").css('border-color','#999 transparent transparent');
                    vm.sale_flag = true;
                    console.log("销量从低到高");
                    vm.sort = 4;
                }else{
                    $(".sale_up").css('border-color','transparent transparent #999');
                    $(".sale_down").css('border-color','#f1341c transparent transparent');
                    vm.sale_flag = false;
                    console.log("销量从高到低");
                    vm.sort=3;
                }
                $("#loading").show();
                this.onsearch(false,true);
                mui('#pullrefresh').scroll().scrollTo(0,0,0);
            },
            all_goods:function(){
                this.sort = 0;
                $("#loading").show();
                this.onsearch();
                mui('#pullrefresh').scroll().scrollTo(0,0,0);
            },
          onsorka: function(temp,index){
            this.page=1;
            document.querySelector(".onsork-box").classList.remove('active');
            console.log(index)
            if(index==0){
                //index 1   销量由高到低   
                this.sort=3;
            }else if(index==2){
                //index 2   价格由低到高
                this.sort=1;
            }else if(index==3){
                //index 3   价格由高到低
                this.sort=2;
            }else{
                //index 0   综合排序
                this.sort=0;
            }
            $("#loading").show();
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
          onsbtn:function(){
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
                document.querySelector(".main").classList.add('active');
                $("#loading").show();
                this.onsearch();
                mui('#pullrefresh').scroll().scrollTo(0,0,0);
          },
          
          onsearch:function(oppo,sale_index,price_index){
            var vm=this;
            if(!!vm.flag){
                return
            }else{
                vm.flag = true;
            }
            var request_obj = {
                sokey:vm.searchval,
                page:vm.page,
                size:20,
                quan:0,
                sort:vm.sort
            }
            console.log(this.searchval);
            $.ajax({
                type: "get",
                // url: "http://v2.api.haodanku.com/get_keyword_items/",
                url:common.config+'/newapi/index/search_tywl',
                dataType:'json',
                data: request_obj,
                // beforeSend: function () {
                //     plus.nativeUI.showWaiting()
                // },
                success: function(data) {
                    console.log(data)
                    if(data.code==0){
                        $('.mui-scroll').children('.ys-scroll-btm').html('暂无更多商品');
                        mui.toast('没有找到相关的宝贝优惠');
                    }else{
                        if(data.data.length == 20){
                            $('.mui-scroll').children('.ys-scroll-btm').html('正在加载更多商品');
                            isUp = true;
                        }else{
                            $('.mui-scroll').children('.ys-scroll-btm').html('暂无更多商品');
                            isUp = false;
                        }
                        $('.mui-scroll').children('.ys-scroll-top').html('').attr('style', false);
                        document.querySelector(".pagesearch").classList.add('active');
                        if(oppo){
                            for(var i=0;i<data.data.length;i++){
                                vm.con.push(data.data[i]);
                            }
                        }else{
                            vm.con=data.data;
                        };
                        if(sale_index){
                            //0表示
                            vm.sale_click = false;
                        };
                        if(price_index){
                            vm.price_click = false;
                        }
                        vm.page++;
                        vm.flag = false;
                    }
                } ,
                complete: function () {
                    $("#loading").hide();
                }
            });
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
            document.querySelector(".main").classList.add('active');
            $("#loading").show();
            this.onsearch();
            mui('#pullrefresh').scroll().scrollTo(0,0,0);
          },
        //   onstorecon: function(oid){
        //       common.pageTransition("particulars.html?that=1&&dataid="+oid);
        //   },
        closeAllmsg:function(){
            document.getElementById("search-input").value = "";
            $(".closemsg").removeClass("active");
        },
        onstorecon: function(oid,index,title,oldprice,newprice,saled,img){
            console.log('oid:'+oid+'index:'+index+'title:'+title+'oldprice:'+oldprice+'newprice:'+newprice+ 'saled:' + saled+'img:'+img);
            if(this.showLogin()) {
                // index=1表示有券
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
                    get_ticket = mui.preload({  
                        url: "particulars4.html?dataid="+oid,  
                        id: 'get_ticket',  
                        styles: {  
                            "render": "always",//一直渲染  
                            "popGesture": "hide",  
                            "titleNView": titleNView//使用原生渐变导航  
                        }  
                    });  
                    mui.fire(get_ticket, 'get_ticket', {  
                        oid:oid,
                        index:index,
                        title:title,
                        oldprice:oldprice,
                        newprice:newprice,
                        saled:saled,
                        img:img
                    });
                });
                var titleNView2 = {
                    backgroundColor: '#fff',//导航栏背景色
                    titleText: '商品详情',//导航栏标题
                    titleColor: '#333',//文字颜色
                    type:'transparent',//透明渐变样式
                    autoBackButton: true,//自动绘制返回箭头
                    splitLine:{//底部分割线
                        color:'#cccccc'
                    }
                }
                mui.openWindow({
                    url:"particulars4.html?dataid="+oid,
                    id:"get_ticket",
                    styles:{
                        titleNView:titleNView2
                    },
                    createNew: true,
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
          onclear:function(){
              this.mainalink = [];
              delete localStorage.search_arr;
          },
        
      },
      mounted:function(){
          
        // alert(decodeURI(window.location.href));
        
        var that = this
        if(!!serch_content){
            that.onolda(serch_content);
        }
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
        // console.log("这是index"+index);
        if(index>0&&isUp){
            isUp = false;
            search.onsearch(true);
            // console.log("上拉加载更多");
        }else if(index<0){
            // isUp = false;
            // search.page=1;
            // console.log("222222222222");
            // search.con=[];
            // search.onsearch();
        }else if(index>0 && !isUp){
            // $('.mui-scroll').children('.ys-scroll-btm').html('暂无更多数据');
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

    mui('.sort').on('tap', 'a', function(e) {
        var sort_length = document.getElementsByClassName('change_tab');
        for(var i =0;i<sort_length.length;i++){
            var item = sort_length[i];
            item.classList.remove('active');
        }
        var id = $(this).attr('data-id');
        if(id!=1){
            $(".sale_up").css('border-color','transparent transparent #999');
            $(".sale_down").css('border-color','#999 transparent transparent');
        }
        if(id!=2){
            $(".price_up").css('border-color','transparent transparent #999');
            $(".price_down").css('border-color','#999 transparent transparent');
        }
        $(this).addClass('active');
    })
    

        