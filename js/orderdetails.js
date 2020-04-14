/*************************************************
 *FileName:      orderdetails.js
 *Description:   订单详情.js
 *************************************************/
    /*
     * 启动
     */
    mui.init();
    immersedStyle(0.3);
    common.format();
    /*
     * 变量初始化
     */
    
    /*
     * 主程序
     */
    var commodity = new Vue({
      el: '#orderdetails-box',
      data: {
          type:0,
          ads:'',
          name:'',
          oederid:'',
          oedertime:'',
          phone:'',
          site:[],
          img:'',
          content:'',
          start_time:'',
          over_time:'',
          money:'',
          oldmoney:'￥190.00',
          sub:'',
          order_ro:common.getUrlParam("that"),
      },
      created: function() {
        var vm = this;
        if(common.getUrlParam('that')==2){
            //积分详情
            var request_obj = {
                access_token: localStorage.access_token ,
                order_id:common.getUrlParam('oid'),
            };
            common.curl(common.config +"/index.php/api/user/orderinfo",request_obj,{sign:create_sign(request_obj)},'post',function(e){
                console.log(e);
                if(e.error_code==0){
                    this.img=common.config+e.data.banner;
                    this.oederid=e.data.order_sn;
                    this.oedertime=e.data.pay_time;
                    this.phone=e.data.phone;
                    this.ads=e.data.province+e.data.city+e.data.area+e.data.address;
                    this.name=e.data.real_name;
                    this.oldmoney=e.data.point+'积分';
                    this.start_time=e.data.start_time;
                    this.over_time=e.data.over_time;
                    this.content=e.data.goods_name;
                    this.money=e.data.shop_price;
                    this.sub=e.data.buy_num;
                    this.type=parseInt(e.data.order_status);
                    this.site=e.data.order_log;
                }else{
                    mui.toast(e.error_msg)
                }
            })
        }else{
            //首页详情
            var request_obj = {
                access_token: localStorage.access_token ,
                order_id:common.getUrlParam('oid'),
            };
            common.curl(common.config +"/index.php/api/user/tbOrderInfo",request_obj,{sign:create_sign(request_obj)},'post',function(e){
                console.log(e);
                if(e.error_code==0){
                    this.oederid=e.data.order_sn;
                    this.oedertime=e.data.pay_time;
                    this.phone=e.data.phone;
                    this.ads=e.data.province+e.data.city+e.data.area+e.data.address;
                    this.name=e.data.real_name;
                    this.oldmoney='￥'+e.data.bf_price;
                    this.start_time=e.data.start_time;
                    this.over_time=e.data.over_time;
                    this.money=e.data.order_account;
                    this.content=e.data.goods_name;
                    this.sub=e.data.buy_num;
                    this.type=parseInt(e.data.order_status);
                }else{
                    mui.toast(e.error_msg)
                }
            })
        }
      },
      methods: {
        service:function(){
            //跳转客服
            plus.runtime.openURL("http://p.qiao.baidu.com//im/index?siteid=9939186&ucid=22317857");
        },
      }
    })
    