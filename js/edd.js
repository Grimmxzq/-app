/*************************************************
 *FileName:      edd.js
 *Description:   编辑资料.js
 *************************************************/
    /*
     * 启动
     */
    mui.init({
        statusBarBackground:"#fff"
    });
    mui.plusReady(function(){              
        plus.navigator.setStatusBarStyle('dark');                
    }); 
    /*
     * 变量初始化
     */
    var birthday;
    /*
     * 主程序
     */ 
    var commodity = new Vue({
      el: '#main-box',
      data: {
          sex:'boy',
          name:'',
          email:'',
          ads:'',
          birthday:'',
      },
      created:function(){
        var vm =this;
        var request_obj = {};
        common.curl(common.config +"/newapi/users/userinfo",request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
            console.log(e);
            if(e.code==1){
                 vm.name=e.data.nickname;
                 vm.ads=e.data.address;
                 vm.sex=e.data.sex;
                 vm.birthday=e.data.birthday;
                 vm.email=e.data.email;
                 if(e.data.role=='diamondnetred'){
                     vm.isjewel=true;
                 }
                 vm.myurl=common.config+e.data.face;
                 vm.vip=e.data.vip;
            }else{
                mui.toast(e.error_msg)
            }
        })
      },
      methods: {
          onsex: function(otext){
              this.sex=otext;
          },
          onads:function(){
            //增加地址
            var vm=this;
            var _getParam = function(obj, param) {return obj[param] || '';};
            var cityPicker3 = new mui.PopPicker({layer: 3});
            cityPicker3.setData(cityData3);
            cityPicker3.show(function(items) {
                vm.ads=_getParam(items[0], 'text')+'-'+_getParam(items[1], 'text')+'-'+_getParam(items[2], 'text');
            });
          },
          onedd:function(){
              //保存
            var vm =this;
            var request_obj = {
                nickname: this.name ,
                sex: this.sex ,
                birthday: this.birthday ,
                address: this.ads ,
                email: this.email 
            }
            common.curl(common.config +"/newapi/users/setuserinfo",request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
                console.log(e);
                if(e.code==1){
                    mui.openWindow({
                        url:"index.html?get_jifen=1",
                        id:"my",
                        createNew: true,
                        show:{
                            autoShow:true,
                            aniShow:"slide-in-right",
                            duration:300,
                        },
                        waiting:{
                            autoShow: false,
                        }
                    });
                }else{
                    mui.toast(e.msg)
                }
            })
          },
          onbirthday:function(){
            //生日
            var vm=this;
              var _self = document.querySelector("#demo2");
            if(_self.picker) {
                _self.picker.show(function (rs) {
                    time=rs.text;
                    vm.birthday=rs.text;
                    _self.picker.dispose();
                    _self.picker = null;
                });
            } else {
                var optionsJson = _self.getAttribute('data-options') || '{}';
                var options = JSON.parse(optionsJson);
                var id = _self.getAttribute('id');
                _self.picker = new mui.DtPicker(options);
                _self.picker.show(function(rs) {
                    time=rs.text;
                    vm.birthday=rs.text;
                    _self.picker.dispose();
                    _self.picker = null;
                });
            }
          },
      }
    })
        
    
    
    
//  var result = mui('#demo2')[0];
//  result.addEventListener('tap', function() {
//      var _self = this;
//      if(_self.picker) {
//          _self.picker.show(function (rs) {
//              result.value =  rs.text;
//              time=rs.text;
//              birthday=rs.text;
//              _self.picker.dispose();
//              _self.picker = null;
//          });
//      } else {
//          var optionsJson = this.getAttribute('data-options') || '{}';
//          var options = JSON.parse(optionsJson);
//          var id = this.getAttribute('id');
//          _self.picker = new mui.DtPicker(options);
//          _self.picker.show(function(rs) {
//              result.value =  rs.text;
//              time=rs.text;
//              birthday=rs.text;
//              _self.picker.dispose();
//              _self.picker = null;
//          });
//      }
//  }, false);
