var packet_id = common.getUrlParam('packet_id');//获取链接的参数

mui.init({
    beforeback: function() {
        //获得父页面的webview
        var list = plus.webview.currentWebview().opener();
        //触发父页面的自定义事件(refresh),从而进行刷新
        mui.fire(list, 'change_msg');
        //返回true,继续页面关闭逻辑
        return true;
    }
});

var packet_memory = new Vue({
    el: '#packrt_memory',
    data: {
        packet_id: parseInt(packet_id),
        description:"",
        title:"",
        money:0.00,
        packet_memorys:[],
    },
    created: function() {
        this.get_packet();
        this.get_memory();
    },
    methods: {
        get_packet:function(){
            console.log(this.packet_id);
            var vm =this;
            var request_obj = {
                id:vm.packet_id
            };
            common.curl(common.config +"/newapi/hongbao/khb",request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
                console.log(e)
                if(e.code==1){
                    vm.title = e.data.title;//红包标题名
                    vm.description = e.data.description;//红包描述
                    vm.money = e.data.money;//金额
                    localStorage.money  = e.data.current_money//余额
                    localStorage.count_dkhb = e.data.count_dkhb//红包个数
                    
                }else{
                    mui.toast(e.msg);
                    setTimeout(function(){
                        backView();
                    },1000);
                }
            })
        },
        get_memory:function(){
            var vm =this;
            var request_obj = {
                page:1,
                size:6
            };
            common.curl(common.config +"/newapi/hongbao/lists",request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
                console.log(e)
                if(e.code==1){
                    vm.packet_memorys = e.data.list;
                }else{
                    mui.toast(e.msg);
                    setTimeout(function(){
                        backView();
                    },1000);
                }
            });
        }
    }
  })
  
