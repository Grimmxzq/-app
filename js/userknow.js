/*************************************************
 *FileName:      userknow.js
 *Description:   协议.js
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
    var that=common.getUrlParam('that');
    /*
     * 主程序
     */ 
    new Vue({
        el: '.main-box',
        data: {
            title:'',
            html:'',
        },
        created:function(){
            var pagekey;
            if(that=='login'){
                //服务协议
                immersedStyle(0.000001);
                document.querySelector(".mui-bar").classList.remove('c-bar');
                this.title= '服务协议';
                pagekey='service_page';
            }else if(that=='about'){
                //关于我们
                this.title= '关于我们';
                pagekey='about_us';
            }else if(that=='iscyber'){
                //直推奖规则
                this.title= '直推奖规则';
                pagekey='push_page';
            }else if(that=='addorder'){
                //用户协议须知
                this.title= '用户协议';
                pagekey='users_page';
            }else if(that=='becyber'){
                //规则说明
                this.title= '规则说明';
                pagekey='rule_page';
            }else if(that=='rule'){
                //推广规则
                this.title= '推广规则';
                pagekey='seo_page';
            }else if(that=='msg'){
                //消息中心帮助中心
                this.title= '帮助中心';
                pagekey='message_page';
            }
            
            // this.$http.post(common.config+'/index.php/api/index/systemInfo', {
            //     key: pagekey,
            // }).then(function (e) {
            //     console.log(e.body);
            //     if(e.body.error_code==0){
            //         this.html= e.body.data.value;
            //     }else{
            //         mui.toast(e.body.error_msg)
            //     }
            // }).catch(function (error) {
            //     console.log(error);
            // });
            
            
        },
    })
        
        
        
               
        
    
    
