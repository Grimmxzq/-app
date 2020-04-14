


mui.init({
    swipeBack: false,
    // keyEventBind: {
    //     backbutton: false //关闭back按键监听
    // }
});
immersedStyle(0);
var womanDay = new Vue({
    el:"#womanDay",
    data:{
        swiper1:null,
        datalist:[],
        pointpre:null,
        returnpre:null,
        active:2,
        loading: false,
        finished: false,
        index_page:1,
        shopindex:1,
        get_menus:{},
        get_menus_key:[],//展示的列表
        get_menus_value:[],//搜索的列表
    },
    methods:{
        rules:function(){
            console.log("1111");
            $(".ruleDetail").show();
        },
        get_menu:function(){
            var vm=this;
            var request_obj = {};
            common.curl(common.config +"/newapi/huodong/index",request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
                console.log(e);
                localStorage.get_woman_img_url = e.data.top_ad[0].picurl;
                localStorage.get_woman_img_goUrl = e.data.top_ad[0].url;
                vm.get_menus = e.data.cat_arr;
                for(var key in vm.get_menus){
                    vm.get_menus_key.push(key);
                    vm.get_menus_value.push(vm.get_menus[key]);
                }
                console.log(vm.get_menus_key);
                console.log(vm.get_menus_value);
                
                mui.plusReady(function() {
                    var _self = plus.webview.currentWebview();
                    var group = new webviewGroup(_self.id, {
                        items: [{
                            id: "0.html?item="+vm.get_menus_value[0],
                            url: "0.html?item="+vm.get_menus_value[0],
                            extras: {},
                            styles:{
                                top:"110px"
                            },
                            waiting:{ autoShow:false}
                        }, {
                            id: "1.html?item="+womanDay.get_menus_value[1],
                            url: "1.html?item="+womanDay.get_menus_value[1],//将要搜索的关键字传过去
                            extras: {},
                            styles:{
                                top:"110px"
                            }
                        }, {
                            id: "2.html?item="+womanDay.get_menus_value[2],
                            url: "2.html?item="+womanDay.get_menus_value[2],//将要搜索的关键字传过去
                            extras: {},
                            styles:{
                                top:"110px"
                            }
                        }, {
                            id: "3.html?item="+womanDay.get_menus_value[3],
                            url: "3.html?item="+womanDay.get_menus_value[3],//将要搜索的关键字传过去
                            extras: {},
                            styles:{
                                top:"110px"
                            }
                        }, {
                            id: "4.html?item="+womanDay.get_menus_value[4],
                            url: "4.html?item="+womanDay.get_menus_value[4],//将要搜索的关键字传过去
                            extras: {},
                            styles:{
                                top:"110px"
                            }
                        }, {
                            id: "5.html?item="+womanDay.get_menus_value[5],
                            url: "5.html?item="+womanDay.get_menus_value[5],//将要搜索的关键字传过去
                            extras: {},
                            styles:{
                                top:"110px"
                            }
                        }, {
                            id: "6.html?item="+womanDay.get_menus_value[6],
                            url: "6.html?item="+womanDay.get_menus_value[6],//将要搜索的关键字传过去
                            extras: {},
                            styles:{
                                top:"110px"
                            }
                        }, {
                            id: "7.html?item="+womanDay.get_menus_value[7],
                            url: "7.html?item="+womanDay.get_menus_value[7],//将要搜索的关键字传过去
                            extras: {},
                            styles:{
                                top:"110px"
                            }
                        }, {
                            id: "8.html?item="+womanDay.get_menus_value[8],
                            url: "8.html?item="+womanDay.get_menus_value[8],//将要搜索的关键字传过去
                            extras: {},
                            styles:{
                                top:"110px"
                            }
                        }, {
                            id: "9.html?item="+womanDay.get_menus_value[9],
                            url: "9.html?item="+womanDay.get_menus_value[9],//将要搜索的关键字传过去
                            extras: {},
                            styles:{
                                top:"110px"
                            }
                        }],
                        onChange: function(obj) {
                            // alert(JSON.stringify(obj));
                            var c = document.querySelector(".mui-control-item.mui-active");
                            if(c) {
                                c.classList.remove("mui-active");
                            }
                            var target = document.querySelector(".mui-scroll .mui-control-item:nth-child(" + (parseInt(obj.index) + 1) + ")");
                            target.classList.add("mui-active");
                            if(target.scrollIntoView) {
                                target.scrollIntoView();
                            }
                        }
                    });
                    mui(".mui-scroll").on("tap", ".mui-control-item", function(e) {
                        var wid = this.getAttribute("data-wid");
                        group.switchTab(wid);
                    });
                });
            })
        },
        back:function(){
            mui.back();
        },
    },
    updated:function(){
        $(".mui-control-item").eq(0).addClass('mui-active')
    },
    created:function(){
        this.get_menu();
        var vm = this;
        
    }
})
