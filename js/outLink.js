



var link = common.getUrlParam('link');
mui.init({
    subpages:[{
      url:link,//子页面HTML地址，支持本地地址和网络地址
      id:"content",//子页面标志
      styles:{
        top:"66px",//子页面顶部位置
        // top:"44px"//子页面顶部位置
      }
    }]
});

var link = new Vue({
    el:"#outLink",
    data:{
        
    },
    methods:{
        goback:function(){
            mui.back();
        }
    }
})