/*************************************************
 *FileName:      integralstate.js
 *Description:   积分明细.js
 *************************************************/
    /*
     * 启动
     */
    mui.init();
    // immersedStyle(0.5); 
    common.format();
    /*
     * 变量初始化
     */
    var isUp = false;
    /*
     * 主程序
     */ 
        
    var commodity =new Vue({
        el: '.mui-content',
        data: {
            todos: [],
            page:1,
        },
        created:function(){
            this.getlist();
        },
        methods:{
            getlist: function(oppo){
                var vm=this;
                var request_obj = {
                    page:this.page,
                    size:10
                }
                common.curl(common.config +"/newapi/users/jifen_list",request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
                    console.log(e);
                    if(e.code==1){
                        if(e.data.list.length == 10){
                            $('.mui-scroll').children('.ys-scroll-btm').html('上拉加载更多');
                            isUp = true;
                        }else{
                            $('.mui-scroll').children('.ys-scroll-btm').html('暂无更多数据');
                            isUp = false;
                        }
                        $('.mui-scroll').children('.ys-scroll-top').html('下拉刷新数据').attr('style', false);
                        if(oppo){
                            for(var i=0;i<e.data.list.length;i++){
                                vm.todos.push(e.data.list[i]);
                            }
                        }else{
                            vm.todos=e.data.list;
                        }
                        vm.page++;
                    }else{
                        $('.ys-scroll-btm').html('没有更多数据了');
                    }
                })
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
            commodity.todos=[];
            commodity.getlist();
        }else if(index>0 && !isUp){
            $('.mui-scroll').children('.ys-scroll-btm').html('暂无更多数据');
        }
    });
    mui('.mui-scroll-wrapper').scroll({
        indicators: false,      //是否显示滚动条 默认为true
        deceleration: 0.003,    //阻尼系数,系数越小滑动越灵敏 默认0.0006
        bounce: true           //是否启用回弹 默认true
    });
