/*************************************************
 *FileName:      set.js
 *Description:   设置.js
 *************************************************/
    /*
     * 启动
     */
    mui.init({
        statusBarBackground:"#fff"
    });
//  immersedStyle(0.5);
    /*
     * 变量初始化
     */
    var phone ,psw;
    /*
     * 主程序
     */ 

     
    window.addEventListener('refreshs', function(e){//执行刷新
        mui.back();
        var list = plus.webview.currentWebview().opener();
        mui.fire(list, 'refreshs');
        return true;
    //刷新页面
    });

    
   var my = new Vue({
      el: '.mui-content',
      data: {},
      methods: {
          setads: function(){
            //跳转收货地址
              common.pageTransition('setads.html?that=2');
          },
          setphone: function(){
            //跳转手机号更换
              common.pageTransition('setphone.html');
          },
          setpsw: function(){
            //跳转设置登录密码
              common.pageTransition('setpsw.html');
          },
          about: function(){
            //跳关于我们
            var link = "http://www.ycyz-yt.com/wap/sp/index/id/5.html";
            var titleNView = {
                backgroundColor: '#fff',//导航栏背景色
                titleText: '关于我们',//导航栏标题
                titleColor: '#333',//文字颜色
                // type:'transparent',//透明渐变样式
                autoBackButton: true,//自动绘制返回箭头
                splitLine:{//底部分割线
                    color:'#cccccc'
                }
            }
            mui.openWindow({
                url:"outLink.html?link="+link,
                id:"outLink",
                styles:{
                    cachemode: 'default',
                    titleNView:titleNView
                },
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
          },
          exit: function(){
              //跳转设置
              mui.confirm('确定退出登录？','',['取消','确定'],function(e){
                  if(e.index==1){
                    //   先关闭首页 再重新打开；
                    //ads_id()  count_dkhb(红包个数)    expire_time(过期时间)   goodisId()  money(余额) myphone(手机号) order_osub(积分商品兑换数量)  point(积分)   secret(秘钥) userKey(用户的key)  order_osize(商品尺寸)  order_ocolor(商品颜色)  search_arr(搜索的字段)
                    localStorage.clear();
                    var index_city = plus.webview.getLaunchWebview();
                    plus.webview.close(index_city);
                    common.logout(function(){});
                    common.pageTransition('tab_index_main.html');
                    // window.location.href="login.html";
                        // mui.back();
                        // common.pageTransition('login.html');
                        // var list = plus.webview.currentWebview().opener();
                        // mui.fire(list, 'refreshs');
                    // mui.plusReady(function(){ 
                    //     // common.pageTransition('index.html');
                    //     mui.openWindow({
                    //         url:"tab_index_main.html",
                    //         show:{
                    //             autoShow:true,
                    //             aniShow:"slide-in-right",
                    //             duration:300,
                    //         },
                    //         waiting:{
                    //             autoShow: false,
                    //         }
                    //     }); 
			        // })
                    
                  }
              },'div')
          },
          clearCache:function(){
            plus.cache.calculate(function(size) {
                console.log(size)
                sizeCache = size;
                var size_m = parseFloat(sizeCache / (1024 * 1024)).toFixed(2);
                if(size_m > 1) {
                    mui.confirm("您目前的系统缓存为" +size_m + "M？", "清除缓存", ["确认", "取消"], function(e) {
                        if(e.index == 1) {} else {
                            plus.cache.clear(function() {
                                alert("缓存清除完毕")
                            });
                        }
                    });
                }
            });
          }
      }
    })
   

    if(!localStorage.myphone){
        $(".setpsw").css("display","none")
    }

    