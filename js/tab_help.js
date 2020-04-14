mui.init();

var tab_help = new Vue({
    el:"#help",
    data:{
        msgli:[],
    },
    methods:{
        // 获取解答列表
        get_help_msg:function(){
            var vm = this;
            this.$http.get(common.config+'/newapi/index/getquestions', {
                
            }).then(function (e) {
                console.log(e.body);
                    if(e.body.code==1){
                        vm.msgli=e.body.data.list;
                    }else{
                        mui.toast(e.body.msg)
                    }
            }).catch(function (error) {
                console.log(error);
            });
        },
        // 展示问题解答详情
        onmsgli:function(index){
            document.querySelectorAll(".msg .li")[index].classList.toggle('active');
        },
        // 客服
        kf_link:function(){
            plus.runtime.openURL("http://p.qiao.baidu.com//im/index?siteid=12516047&ucid=26239188");//打开浏览器
        },
        //测试
        text:function(){
            mui.openWindow({
                url:"type.html",
                styles:{
                    cachemode: 'default',
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
        },
    },
    created:function(){
        this.get_help_msg();
    }
})

mui('.mui-scroll-wrapper').scroll({
    indicators: false,      //是否显示滚动条 默认为true
    deceleration: 0.001,    //阻尼系数,系数越小滑动越灵敏 默认0.0006
    bounce: true           //是否启用回弹 默认true
});