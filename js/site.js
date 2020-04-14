/*************************************************
 *FileName:      site.js
 *Description:   收货地址.js
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
    var title= common.getUrlParam('that');
    var del= common.getUrlParam('del');
    var oid= common.getUrlParam('oid');
    var onley= common.getUrlParam('onley');
    var _getParam = function(obj, param) {return obj[param] || '';};
    var cityPicker3 = new mui.PopPicker({layer: 3});
    cityPicker3.setData(cityData3);
    /*
     * 主程序
     */ 
   if(title=='edd'){
       document.querySelector(".mui-title").innerHTML='管理收货地址'
   }else{
       document.querySelector(".mui-title").innerHTML='添加收货地址'
   }
   
   
   var site = new Vue({
      el: '.min-box',
      data: {
          del:del,
          name:'',
          phone:'',
          province:'',
          city:'',
          area:'',
          ads:'',
          isf:'0',
      },
      created:function(){
          var vm=this;
          if(title=='edd'){
            //判断是否进入修改地址页面,并获取参数
            var request_obj = {
                id:oid
            };
            common.curl(common.config +"/newapi/jifenshop/get_single_address",request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
                console.log(e);
                if(e.code==1){
                    if(oid==e.data.address_id){
                        vm.name=e.data.real_name;
                        vm.phone=e.data.phone;
                        vm.province=e.data.province;
                        vm.city=e.data.city;
                        vm.area=e.data.area;
                        vm.ads=e.data.address;
                        vm.isf=e.data.is_default;
                        document.querySelector("#seit").value=vm.province+'-'+vm.city+'-'+vm.area;
                        return false;
                    }else{
                        mui.toast("系统错误")
                    }
                }else{
                    mui.toast(e.msg)
                }
            })
          }
      },
      methods: {
          delect: function(){
            //删除
            var vm=this;
            mui.confirm('确定删除？','',['取消','确定'],function(e){
                if(e.index==1){
                    var request_obj = {
                        access_token: localStorage.access_token,
                        address_id:oid,
                    };
                    common.curl(common.config +"/index.php/api/user/delAddress",request_obj,{sign:create_sign(request_obj)},'post',function(e){
                        console.log(e);
                        if(e.error_code==0){
                            mui.toast('删除成功！');
                            setTimeout(function(){
                                mui.back();
                                var list = plus.webview.currentWebview().opener();
                                mui.fire(list, 'refresh');
                                return true;
                            },1000);
                        }else{
                            mui.toast(e.error_msg)
                        }
                    })
                }
            },'div')
          },
          onswitch:function(){
              console.log(document.querySelector(".mui-switch").classList.contains('mui-active'))
              if(document.querySelector(".mui-switch").classList.contains('mui-active')){
                  this.isf='1';
              }else{
                  this.isf='0';
              }
          },
          onads:function(){
              document.querySelector("#name").blur();
              document.querySelector("#phone").blur();
              document.querySelector(".adss").blur();
              _silf = this;
              cityPicker3.show(function(items) {
                document.querySelector("#seit").value=_getParam(items[0], 'text')+'-'+_getParam(items[1], 'text')+'-'+_getParam(items[2], 'text');
                _silf.province=_getParam(items[0], 'text');
                _silf.city=_getParam(items[1], 'text');
                _silf.area=_getParam(items[2], 'text');
            });
            console.log(_silf.area)
          },
          onbtn:function(){
            //点击保存
            var text_rule = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;//2018最新手机号正则；包含166
            if(!text_rule.test(this.phone)){
                mui.toast('请输入正确的手机号码');
                return false;
            }else if(title=='edd'){
                //保存修改地址页面
                $(".b-right").attr("disabled",true);
                var request_obj = {
                    province: this.province,
                    city: this.city,
                    area: this.area,
                    address: this.ads,
                    real_name: this.name,
                    phone: this.phone,
                    is_default: this.isf,
                    id:oid,
                };
                common.curl(common.config +"/newapi/jifenshop/up_address",request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
                    console.log(e);
                    if(e.code==1){
                        mui.toast('修改成功！');
                        setTimeout(function(){
                            mui.back();
                            var list = plus.webview.currentWebview().opener();
                            mui.fire(list, 'refresh');
                            return true;
                        },1000);
                    }else{
                        mui.toast(e.msg);
                        $(".b-right").attr("disabled",false);
                    }
                })
            }else{
                $(".b-right").attr("disabled",true);
                var vm = this;
                var request_obj ={
                    province: vm.province,
                    city: vm.city,
                    area: vm.area,
                    address: vm.ads,
                    real_name: vm.name,
                    phone: vm.phone,
                    is_default: vm.isf*1,
                };
                console.log(create_sign(request_obj));
                common.curl(common.config +"/newapi/jifenshop/add_address",request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
                    console.log(e);
                    if(e.code==403){
                        mui.toast('登录过期，请重新登录');
                        setTimeout(()=>{
                            common.pageTransition('login.html');
                        },1000)
                    }else{
                        if(e.code==1){
                            mui.toast('添加成功！');
                            // if(onley){
                            //     localStorage.ads_id=e.data;
                            // }
                            // localStorage.ads_id=e.code;
                            localStorage.ads_id=e.data;
                            setTimeout(function(){
                                mui.back();
                                var list = plus.webview.currentWebview().opener();
                                mui.fire(list, 'refresh');
                                return true;
                            },1000);
                        }else{
                            mui.toast(e.msg);
                            $(".b-right").attr("disabled",false);
                        }
                    }
                })
            }
                
          },
      }
    })
    
    
    