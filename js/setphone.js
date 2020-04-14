/*************************************************
 *FileName:      setphone.js
 *Description:   更换手机号.js
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
    window.addEventListener('refresh', function(e){
      location.reload();
    //刷新页面
    });
    /*
     * 主程序
     */ 
        
    new Vue({
      el: '.mui-content',
      data: {
        phone: localStorage.myphone,
      },
      methods: {
          changephone: function(){
            //跳转注册
              common.pageTransition('changephone.html');
          }
      }
    })
        
    