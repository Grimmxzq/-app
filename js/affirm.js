/*************************************************
 *FileName:      affirm.js
 *Description:   确认订单.js
 *************************************************/
    /*
     * 启动
     */
    
    /*
     * 变量初始化
     */
    var oid = common.getUrlParam('dataid');
    window.addEventListener('refresh', function(e){//执行刷新
        location.reload(); 
    });
    /*
     * 主程序
     */ 
    mui.init({
        statusBarBackground:"#fff"
    });
//  immersedStyle(0.5);
    var commodity = new Vue({
      el: '#main-box',
      data: {
          hasads: false,
          face:'',
          goods_name:'',
          subval:localStorage.order_osub,
          shop_price:'',
          shop_point:'',
          ads:'',
          name:'',
          phone:'',
          address_id:'',
          html:'',
      },
      created: function() {
        var vm = this;
        //详情内容
        var request_obj = {id: oid }
        common.curl(common.config +"/newapi/jifenshop/goods_info",request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
            console.log(e);
            if(e.code==1){
                vm.face = e.data.picurl;
                vm.goods_name=e.data.title;
                vm.shop_price=e.data.price;
                vm.shop_point=e.data.jifen;
            }else{
                mui.toast(e.msg)
            }
        })
        if(localStorage.ads_id){
            //如果用户地址ID存在就执行下面
            var request_obj = {id:localStorage.ads_id}
            common.curl(common.config +"/newapi/jifenshop/get_single_address",request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
                console.log(e);
                if(e.code==1){
                    vm.hasads=true;
                    vm.ads=e.data.province+e.data.city+e.data.area+e.data.address;
                    vm.name=e.data.real_name;
                    vm.phone=e.data.phone;
                    vm.address_id = e.data.address_id;
                    return false;
                }
            })
        }else{
             //没有用户地址ID就先查找所有地址（有就取第一个没有就不取值）
             var item = {}
             common.curl(common.config +"/newapi/jifenshop/get_user_addresses",item,{sign:create_sign(item),key: localStorage.userKey},'post',function(e){
                 console.log(e);
                 if(e.code==1){
                     console.log(e.data.length)
                     if(e.data.length>0){
                         vm.hasads=true;
                         vm.ads=e.data[0].province+e.data[0].city+e.data[0].area+e.data[0].address;
                         vm.name=e.data[0].real_name;
                         vm.phone=e.data[0].phone;
                         vm.address_id=e.data[0].address_id;
                     }else{
                         vm.hasads=false;
                     }
                 }else{
                     vm.hasads=false;
                 }
             })
        }
      },
      methods: {
          setads: function(){
              //选择地址
            var vm =this;
            var choose = {}
            common.curl(common.config +"/newapi/jifenshop/get_user_addresses",choose,{sign:create_sign(choose),key: localStorage.userKey},'post',function(e){
                console.log(e);
                if(e.data.length>0){
                    // common.pageTransition("setads.html?that=1");
                    common.pageTransition("manageAds.html?that=1");
                }else{
                    common.pageTransition("site.html?that=add");
                }
            })
          },
          convert: function(){
              //点击底部
              var vm=this;
              mui.confirm('确定兑换？','',['取消','确定'],function(e){
                  if(e.index==1){
                      vm.converton();
                  }
              },'div')
          },
          maskh: function(){
                document.querySelector(".mask").classList.remove('active');
                mui.back();
          },
          //兑换积分商品
          converton: function(){
            console.log(localStorage.attr);
            var vm = this;
            var item = {address_id: vm.address_id  ,goods_id: oid ,attr: localStorage.attr,buy_num: localStorage.order_osub }
            common.curl(common.config +"/newapi/jifenshop/buy_goods",item,{sign:create_sign(item),key: localStorage.userKey},'post',function(e){
                console.log(e);
                if(e.code==1){
                    // document.querySelector(".mask").classList.add('active');
                    mui.alert(e.msg,'','关闭',function(e){
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
                    },'div')
                }else{
                    mui.alert(e.msg,'','关闭',function(e){
                        
                    },'div')
                }
            })
          },
      },
      updated:function(){
        $('.affirm .con .img img').error(function(){
			$(this).attr("src", "./img/index_shoppingCity.jpg");
		});
      }
    })
    