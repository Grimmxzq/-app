/*************************************************
 *FileName:      setads.js
 *Description:   我的收货地址.js
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
    /*
     * 主程序
     */ 
    window.addEventListener('refresh', function(e){
      location.reload(); 
    });
   var my = new Vue({
      el: '.mui-content',
      data: {
          items:[]
      },
        created:function(){
            var vm = this;
            var request_obj = {};
            common.curl(common.config +"/newapi/jifenshop/get_user_addresses",request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
                console.log(e);
                if(e.code==403){
                    mui.toast('登录过期，请重新登录');
                    setTimeout(()=>{
                        common.pageTransition('login.html');
                    },1000)
                }else{
                    if(e.code==1){
                        vm.items=e.data;
                        console.log(vm.items);
                    }else{
                        mui.toast(e.msg);
                    }
                }
            })
        },
      methods: {
          addsite: function(){
            //跳转增加地址
              common.pageTransition('site.html?that=add');
          },
          eddsite: function(oid){
            //跳转编辑地址
            common.pageTransition('site.html?that=edd&&del=true&&oid='+oid);
          },
          onedd: function(oid){
            //跳转编辑地址
              common.pageTransition('site.html?that=edd&&del=false&&oid='+oid);
          },
          ondel: function(index,oid){
            //删除
            var vm=this;
            mui.confirm('确定删除？','',['取消','确定'],function(e){
                console.log(e)
                if(e.index==1){
                    var request_obj = {
                        id:oid,
                    };
                    common.curl(common.config +'/newapi/jifenshop/del_address',request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
                        console.log(e);
                        if(e.code==1){
                            mui.toast('删除成功！');
                            setTimeout(function(){
                                vm.items.splice(index,1);
                            },500);
                        }else{
                            mui.toast(e.msg)
                        }
                    })
                }
            },'div')
          },
          isfads: function(index,oid){
              //默认地址
            var vm=this;
            if(vm.items[index].is_default!=1){
                vm.items.forEach(function(item){
                    item.is_default = 0;
                });
                var request_obj = {
                    access_token: localStorage.access_token,
                    address_id:oid,
                };
                common.curl(common.config +"/index.php/api/user/setDefaultAddress",request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
                    console.log(e);
                    if(e.error_code==0){
                        vm.items[index].is_default = 1;
                    }else{
                        mui.toast(e.error_msg)
                    }
                })
            }
          },
          oncon:function(oid){
              if(common.getUrlParam('that')==1){
                  localStorage.ads_id=oid;
                  mui.back();
                  var list = plus.webview.currentWebview().opener();
                  mui.fire(list, 'refresh');
                  return true;
              }
          },
      }
    })
   
   if(common.getUrlParam('that')==2){
       document.querySelector("#setads").classList.add('active');
       document.querySelector(".mui-title").innerHTML='我的收货地址';
       
   }else if(common.getUrlParam('that')==1){
       document.querySelector(".mui-title").innerHTML='选择收货地址';
   }
//    document.querySelector(".set").addEventListener('tap',function(){
//       console.log(document.querySelector(".main").classList.toggle('active'));
//    })
    