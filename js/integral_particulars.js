


// 积分商品详情页面

mui.previewImage();
var oid = common.getUrlParam('dataid');
var integral_particulars = new Vue({
    el:"#integral_particulars",
    data:{
        banner:'./img/time.gif',
        title:"",
        id:"",
        price:"",
        picurl:"",
        jifen:"",
        imgs:'',
        subval:1,
        attr:[],
        osize:-1,
        ocolor:-1,
        textcolor:'',
        textsize:'',
        items:[]
    },
    methods:{
        close_canshu(){
            $(".gray_bg_canshu").css("display","none");
        },
        show_canshu(){
            $(".gray_bg_canshu").css("display","block");
        },
        onupsub: function() {
            this.subval++;
            console.log("++++")
        },
        ondownsub: function() {
            if(this.subval > 1) {
                this.subval--;
            }
            console.log("-----")
        },
        valblur: function() {
            if(!this.subval) {
                this.subval = 1;
            }
        },
        close_choose_box:function(){
            $(".gray_bg_choose").css("display","none");
        },
        show_choose_box:function(){
            $(".gray_bg_choose").css("display","block");
        },
        get_msg:function(index,i){
            var vm = this;
            var id = $(".choose_box_color .colors").eq(i).attr('data-id');
            var temp = $(".choose_box_color .colors").eq(id).children()
            temp.removeClass('active');
            temp.each(function(){
                if(id==0){
                    // 如果id:0 表示用户点击了颜色
                    vm.ocolor = id;
                    vm.textcolor = temp.eq(index).html();
                }else{
                    //如果id:1 表示用户点击了尺寸
                    vm.osize = id;
                    vm.textsize = temp.eq(index).html();
                }
                temp.eq(index).addClass('active');
            })
        },
        change_goods:function(){
            var vm = this;
            //跳转确认订单
            var obj = [];
            if(vm.textsize){
                obj.push(vm.textsize);
                if(vm.textcolor){
                    obj.push(vm.textcolor);
                }
            }else if(vm.textcolor){
                obj.push(vm.textcolor);
                if(vm.textsize){
                    obj.push(vm.textsize);
                }
            }
            console.log(JSON.stringify(obj));
            console.log(this.attr.length);
            if(this.attr.length  == obj.length) {
                // console.log("全部选中；准备跳转")
                localStorage.order_ocolor = vm.textcolor;
                localStorage.order_osize = vm.textsize;
                localStorage.order_osub = vm.subval;
                common.pageTransition("affirm.html?dataid=" + oid);
                vm.close_choose_box();
            } else {
                vm.show_choose_box();
                mui.toast('请全部选中');
            }
        }
    },
    created:function(){
        mui.init({
            statusBarBackground:"#fff",
        });
        var vm = this;
        document.addEventListener('get_detail', function(event) {  
            var id = event.detail.id;  
            if(!id) {  
                    return;  
            }  
            //前页传入的数据，直接渲染，无需等待ajax请求详情后  
            vm.title = event.detail.title;  
            vm.id = event.detail.id;  
            vm.price = event.detail.price;  
            vm.banner = event.detail.picurl;  
            vm.jifen = event.detail.jifen;
            //向服务端请求文章详情内容  
            var request_obj = {
                id:id
            };
            common.curl(common.config +"/newapi/jifenshop/goods_info",request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
                console.log(JSON.stringify(e));
                if(e.code == 403){
                    mui.toast(e.msg);
                    setTimeout(function(){
                        mui.openWindow({
                            url:"login.html",
                            id:"login"
                        });
                    },1000)
                }else{
                    if(e.code==0){
                        mui.toast(e.msg);
                    }else{
                        vm.imgs = e.data.content;
                        vm.attr = e.data.attr;
                    }
                }
            })
        });
    },
    updated:function(){
        $('img').error(function(){
            $(this).attr("src", "./img/index_shoppingCity.jpg");
        });
    }
})

mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0006 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
