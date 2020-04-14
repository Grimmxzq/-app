


// 站内信


mui.init();

var msg_center = new Vue({
    el:"#msg_center",
    data:{
        msgs:[],
        hide:null,
        no_msg:''
    },
    methods:{
        get_msg:function(){
            var vm = this;
            $.ajax({
                type:"get",
                url:common.config+"/newapi/users/message",
                headers:{
                    key:localStorage.userKey
                },
                success:function(data){
                    console.log(data);
                    if(data.code==403){
                        mui.toast(data.msg);
                        mui.openWindow({
                            url:"login.html",
                            id:"login"
                        });
                    }else{
                        vm.msgs = data.data.list;
                        if(data.data.list.length!=0){
                            vm.hide = true;
                        }else{
                            vm.hide = false;
                            vm.no_msg = "./img/no_msg.jpg";
                        }
                    }
                }
            });
        },
        delete_msg:function(index,id){
            
            var vm = this;
            $.ajax({
                type:"get",
                url:common.config+"/newapi/users/del_message",
                data:{
                    id:id
                },
                headers:{
                    key:localStorage.userKey
                },
                success:function(data){
                    console.log(data);
                    if(data.code==403){
                        mui.toast(data.msg);
                        mui.openWindow({
                            url:"login.html",
                            id:"login"
                        });
                    }else{
                        if(data.code==1){
                            var list_length = document.querySelectorAll(".mui-table-view-cell").length;
                            for(var i= 0; i< list_length; i++){
                                if(i == index){
                                    mui.swipeoutClose(document.querySelectorAll(".mui-table-view-cell")[i]);
                                }
                            }
                            mui.toast('删除成功！');
                            setTimeout(function(){
                                vm.msgs.splice(index,1);
                                if(vm.msgs.length==0){
                                    vm.hide = false;
                                    vm.no_msg = "./img/no_msg.jpg";
                                }
                            },500);
                        }else{
                            mui.toast(e.body.msg);
                        }
                    }
                }
            });
        },
        go_msg:function(id,title){
            console.log(id);
            var titleNView = {
                backgroundColor: '#fff',//导航栏背景色
                titleText: title,//导航栏标题
                titleColor: '#333',//文字颜色
                autoBackButton: true,//自动绘制返回箭头
                splitLine:{//底部分割线
                    color:'#cccccc'
                }
            }
            mui.openWindow({
                url:"msg_detail.html?id="+id,
                id:"msg_detail.html",
                styles:{
                    titleNView:titleNView
                }
            });
        }
    },
    created:function(){
        this.get_msg();
    }
})

// mui('#OA_task_1').on('tap', '.mui-btn-red', function() {
//     alert("!11111");
//     var elem = this;
//     mui.swipeoutClose(elem);
// });

mui('.mui-scroll-wrapper').scroll({
    indicators: false,      //是否显示滚动条 默认为true
    deceleration: 0.0006,    //阻尼系数,系数越小滑动越灵敏 默认0.0006
    bounce: true           //是否启用回弹 默认true
});