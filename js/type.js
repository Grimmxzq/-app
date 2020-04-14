/*************************************************
 *FileName:      type.js
 *Description:   分类.js
 *************************************************/
    /*
     * 启动
     */
    mui.init();
    
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
        titletype:['全部','女装', '男装','内衣','美妆','配饰','鞋品','箱包','儿童','母婴','居家','美食','数码','家电'],
        type_main:[],
        findex:0,
        num:1,
        goodsname:[],
        text:[]
      },
      created:function(){
          this.getlist();
          
      },
      methods: {
        showLogin: function(){
            if(!localStorage.userKey){
              mui.plusReady(function(){ 
                //   common.pageTransition('login.html')
                mui.openWindow({
                    url:"login.html",
                    id:"login"
                });
              })
              return false;
          }
            return true;
        },
        getlist:function(){
            //商品列表
            var vm=this;
            $.ajax({
                type: "get",
                url: "http://v2.api.haodanku.com/super_classify",//http://v2.api.haodanku.com/column
                dataType:'json',
                data: {
                    apikey:'redgo'
                },
                success: function(data) {
                    console.log(data);
                    if(data.code==1){
                        // for(var i=0;i<data.general_classify.length;i++){
                        //     var type_name = data.general_classify[i].main_name;
                        //     vm.titletype.push(type_name);//获取分类名称
                        // };
                        vm.text = data.general_classify;
                        for(var i=0;i<data.general_classify.length;i++){
                            var type_content = data.general_classify[i].data;
                            vm.type_main.push(type_content);//获取详细
                        }
                    }
                }  
            });
        },
        ontype: function(index){
            console.log($(".li").length);
            $(".li").removeClass("active");
            $(".li").eq(index).addClass("active");
            console.log(this.type_main[index]);
            $(".right .lists").removeClass("active");
            $(".right .lists").eq(index).addClass("active");
        },
      },
      updated:function(){
        this.ontype(0);
        $('#type .main .con img').error(function(){
            $(this).attr("src", "./img/index_shoppingCity.jpg");
        });
      }
    })