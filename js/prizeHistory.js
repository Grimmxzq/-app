

// 签到



// mui.init({
//     statusBarBackground:"#fff",
// });
            


// mui.plusReady(function(){              
//     plus.navigator.setStatusBarStyle('dark');                
// }); 

// function pulldownRefresh(){
//     this.endPullupToRefresh();
// }
// var isUp=false;
// var sign = new Vue({
//     el:"#sign",
//     data:{

//     },
//     methods:{
//         onscroll: function(){
//             //滚动
//             var elem=$('.mui-scroll');
//             var scrH = elem.height()
//             var scrPH = elem.parent().height();
//             var scrT=0;
//             if(elem.css('transform')!=undefined){
//                 scrT = elem.css('transform').split(/,/)[5].replace(/\)$/, "") - 0;
//                 // scrT = elem.css('transform').split(/,/)[5]
//             }
//             console.log(elem.css('transform'))
//             // console.log(scrPH)
//             console.log(scrPH-scrH);
//             console.log(scrT)
//             if(scrPH-scrH>scrT){
//                 // 判断用户上拉
//                 isUp = true;
//                 alert("上拉加载");
//                 elem.children('.ys-scroll-btm').html('松开加载更多');
//             }else{
//                 // 判断用户下拉
//                 isUp = false;
//                 // alert("下拉刷新")
//             }
//         },
//         oves: function(){
//             //商品滚动获取
//               if(isUp){
//                 isUp = false;
//                 // this.getlist(true);
//               }
//         },
//     }
// })

// mui('.mui-scroll-wrapper').scroll({
//     indicators: false,      //是否显示滚动条 默认为true
//     deceleration: 0.0006,    //阻尼系数,系数越小滑动越灵敏 默认0.0006
//     bounce: true           //是否启用回弹 默认true
// });




/*************************************************
 *FileName:      prizeHistory.js
 *Description:   中奖记录.js
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
    // if(localStorage.search_arr){
    //     var arr=localStorage.search_arr.split(',');
    // }else{
    //     var arr=[];
    // }
    var isUp = false;
    /*
     * 主程序
     */ 
    var prizeHistory = new Vue({
      el: '#prizeHistory',
      data: {
            items:[],
            prizeLi:[],
            prize_id:"",
            certainAddress:[],
            page:1,
            size:10,
            checkPrize:[]
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
            close:function(){
                $(".hideAddress").css("display","none");
            },
            show:function(id){
                // type=1 积分 type=2 实物 type=3 现金
                // type =3现金
                //     status 0待领取
                //     status 1现金发货中
                //     status 3现金以收货  
                // type=2实物 //不用判断address_id
                //     status 0待领取
                //     status 1发货中
                //     status 2已收货
                // type=1积分
                //     status 只有状态2 已收货
                $(".hideAddress").css("display","block");
                localStorage.id = id;
                // 展现收货地址
                var vm = this;
                var request_obj = {};
                common.curl(common.config +"/newapi/jifenshop/get_user_addresses",request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
                    console.log(e);
                    if(e.code==403){
                        mui.toast('登录过期，请重新登录');
                        setTimeout(()=>{
                            common.pageTransition('login.html');
                        },1000)
                    }else{
                        if(e.code==1){
                            if(e.data==""){
                                $(".hideAddress .whiteBox ul li").remove();
                                $(".hideAddress .whiteBox ul").append("<li style='text-align:center'>暂无收货地址</li>");
                            }else{
                                vm.items=e.data;
                            }
                            console.log(vm.items);
                        }else{
                            mui.toast(e.msg);
                        }
                    }
                });
            },
            // 添加收货地址
            addAddress:function(){
                $(".hideAddress").css("display","none");
                common.pageTransition('site.html');
            },
            certain:function(address_id,i){
                console.log("用户点击确定绑定了后货地址");
                console.log(address_id,localStorage.id*1);
                var request_obj = {
                    address_id:address_id,
                    id:localStorage.id*1
                };
                common.curl(common.config +"/newapi/users/bind_box_prize_address",request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
                    console.log(e);
                    if(e.code==403){
                        mui.toast('登录过期，请重新登录');
                        setTimeout(()=>{
                            common.pageTransition('login.html');
                        },1000)
                    }else{
                        if(e.code==1){
                            $(".hideAddress").css("display","none");
                            $(".certainBox").css("display","block");
                            this.certainAddress = this.items[i];
                            console.log(this.certainAddress);
                        }else{
                            mui.toast(e.msg);
                        }
                    }
                })
            },
            closeBox:function(){
                $(".certainBox").css("display","none");
                window.location.href=window.location.href; 
            },
            edit:function(oid){
                $(".hideAddress").css("display","none");
                common.pageTransition('site.html?that=edd&&del=false&&oid='+oid);
            },
            getPrize:function(oppo){
                // 获取用户中奖记录
                var vm = this;
                var request_obj = {
                    page:this.page,
                    size:this.size
                };
                common.curl(common.config +"/newapi/users/signin_prize_lists",request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
                    console.log(e.data);
                    if(e.code==403){
                        mui.toast('登录过期，请重新登录');
                        setTimeout(()=>{
                            common.pageTransition('login.html');
                        },1000);
                    }else{
                        if(e.code==1){
                            // this.prizeLi = e.data;
                            if(e.data.length == 10){
                                $('.mui-scroll').children('.ys-scroll-btm').html('上拉加载更多');
                                isUp = true;
                            }else{
                                $('.mui-scroll').children('.ys-scroll-btm').html('暂无更多数据');
                                isUp = false;
                            }
                            $('.mui-scroll').children('.ys-scroll-top').html('下拉刷新数据').attr('style', false);
                            if(oppo){
                                // oppo为ture就继续上拉添加
                                for(var i=0;i<e.data.length;i++){
                                    vm.prizeLi.push(e.data[i]);
                                }
                            }else{
                                //oppo为false就直接添加
                                vm.prizeLi=e.data;
                            }
                            this.page++;
                            console.log(this.page);
                            
                        }else{
                            // mui.toast(e.msg);
                            $('.mui-scroll').children('.ys-scroll-btm').html('暂无更多数据');
                            mui.toast('暂无数据');
                        }
                    }
                })
            },
            copy:function(){
                // 点击复制
                var copyRight = document.getElementById('copyRight');
                if(!document.execCommand) {
                    console.error('copy unsupport');
                    return;
                  }
                  copyRight.select();
                  var result = document.execCommand('copy');
                  if(result) {
                    mui.toast("复制成功");
                  } else {
                    mui.toast("复制失败");
                  }
            },
            closeCashBox:function(){
                $(".cashTip").css("display","none");
            },
            look:function(item){
                var that = this;
                for(var i=0;i<this.prizeLi.length;i++){
                    if(item == this.prizeLi[i].id){
                        that.checkPrize.push(this.prizeLi[i]);
                    }
                }
                console.log(that.checkPrize);
                $(".check_Look").css("display","block");
                
            },
            // 关闭中奖详情
            close_check_Look:function(){
                $(".check_Look").css("display","none");
            },
            // 展现微信公众号
            showCashTip:()=>{
                $(".cashTip").css("display","block");
            }
      },
      mounted:function(){
          //进入页面就加载
          this.getPrize();
      }
    })
    common.scrollUpDown($('.mui-scroll'),function(index){
        if(index>0&&isUp){
            isUp = false;
            prizeHistory.getPrize(true);
            console.log(123);
        }else if(index<0){
            // 下拉刷新
            isUp = true;
            prizeHistory.page=1;
            prizeHistory.prizeLi=[];
            prizeHistory.getPrize();
            mui.toast("刷新成功");
        }else if(index>0 && !isUp){
            $('.mui-scroll').children('.ys-scroll-btm').html('暂无更多数据');
        }
    });
    mui('.mui-scroll-wrapper').scroll({
        indicators: false,      //是否显示滚动条 默认为true
        deceleration: 0.0006,    //阻尼系数,系数越小滑动越灵敏 默认0.0006
        bounce: true           //是否启用回弹 默认true
    });




        
    