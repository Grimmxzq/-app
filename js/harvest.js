/*************************************************
 *FileName:      harvest.js
 *Description:   历史兑换.js
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
    var isUp=false;
    /*
     * 主程序
     */
    var commodity = new Vue({
      el: '#main-box',
      data: {
          page:1,
          items:[],
      },
      created: function() {
        this.getlist();
      },
      methods: {
          getlist:function(oppo){
            var vm = this;
            //详情内容
            var request_obj={
                access_token: localStorage.access_token ,
                type:'point',
                page:this.page,
                order_status:'',
                num:10,
            }
            common.curl(common.config +'/index.php/api/user/orderList',request_obj,{sign:create_sign(request_obj)},'post',function(e){
                console.log(e);
                if(e.error_code==0){
                    if(e.data.length == 10){
                        $('.mui-scroll').children('.ys-scroll-btm').html('上拉加载更多');
                        isUp = true;
                    }else{
                        $('.mui-scroll').children('.ys-scroll-btm').html('已经到底了');
                        isUp = false;
                    }
                    $('.mui-scroll').children('.ys-scroll-top').html('下拉刷新数据').attr('style', false);
                    if(oppo){
                        for(var i=0;i<e.data.length;i++){
                            vm.items.push(e.data[i]);
                        }
                    }else{
                        vm.items=e.data;
                    }
                    this.page++;
                }else{
                    $('.ys-scroll-btm').html('没有更多数据了');
                }
            })
          },
          kf: function(){
              //客服
              localStorage.indexfoot=3;
              mui.back();
              var list = plus.webview.currentWebview().opener();
                mui.fire(list, 'refreshs');
             return true;
          },
          orderdetails: function(oid){
              //跳转订单详情
            common.pageTransition("particulars.html?that=3&&dataid="+oid);
          },
      }
    })
    common.scrollUpDown($('.mui-scroll'),function(index){
        if(index>0&&isUp){
            isUp = false;
            commodity.getlist(true);
        }else if(index<0){
            isUp = true;
            commodity.page=1;
            commodity.items=[];
            commodity.getlist();
        }else if(index>0 && !isUp){
            $('.mui-scroll').children('.ys-scroll-btm').html('已经到底了');
        }
    });
    mui('.mui-scroll-wrapper').scroll({
        indicators: false,      //是否显示滚动条 默认为true
        deceleration: 0.003,    //阻尼系数,系数越小滑动越灵敏 默认0.0006
        bounce: true           //是否启用回弹 默认true
    });
        
    