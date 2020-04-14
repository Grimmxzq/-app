


        var wallet = new Vue({
            el: '#share',
            data: {
                share_img : [],
                swiper:null
            },
            created: function() {
                this.get_img();
            },
            updated:function(){
                new Swiper('.swiper-container', {
                    effect: 'coverflow',
                    grabCursor: true,
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    coverflowEffect: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows : true,
                    },
                    pagination: {
                    el: '.swiper-pagination',
                    },
                });
            },
            methods: {
                get_img:function(){
                    var that = this;
                    var request_obj = {};
                    common.curl(common.config +'/newapi/users/get_share_img',request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
                        console.log(e);
                        if(e.code == 403){
                            mui.toast(e.msg);
                            setTimeout(function(){
                                mui.openWindow({
                                    url:"login.html",
                                    id:"login"
                                });
                            },1000)
                        }else{
                            that.share_img = e.data;
                            console.log(that.share_img);
                        }
                    })
                }
            },
        })



        

        
        
        var Intent = null,
        File = null,
        Uri = null,
        main = null;
        var shares = null;
        var shareImageUrl = '';
        mui.plusReady(function() {
        updateSerivces();
        if(plus.os.name == "Android") {
        Intent = plus.android.importClass("android.content.Intent");
        File = plus.android.importClass("java.io.File");
        Uri = plus.android.importClass("android.net.Uri");
        main = plus.android.runtimeMainActivity();
        }
        })
        /**
        * 更新分享服务
        */
        function updateSerivces() {
        plus.share.getServices(function(s) {
        shares = {};
        for(var i in s) {
        var t = s[i];
        shares[t.id] = t;
        }
        outSet("获取分享服务列表成功");
        }, function(e) {
        outSet("获取分享服务列表失败：" + e.message);
        });
        }
        /**
        * 分享操作
        */
        function shareAction(id, ex,img) {
            var s = null;
            if(!id || !(s = shares[id])) {
                outLine("无效的分享服务！");
                return;
            }
            if(s.authenticated) {
                outSet("---已授权---");
                shareMessage(s, ex,img);
            } else {
                outSet("---未授权---");
                s.authorize(function() {
                    shareMessage(s, ex,img);
                }, function(e) {
                    outLine("认证授权失败");
                });
            }
        }
        /**
        * 发送分享消息
        */
        function shareMessage(s, ex,img) {
            var msg = {
                pictures: [img],
                extra: {
                    scene: ex
                }
            };
            s.send(msg, function() {
                // outLine("分享成功!");
            }, function(e) {
                outLine("分享失败!");
            });
        }
        /**
        * 分享按钮点击事件
        */
        var ids = [{
            id: "weixin",
            ex: "WXSceneSession" /*微信好友*/
            }, {
            id: "weixin",
            ex: "WXSceneTimeline" /*微信朋友圈*/
            }],
        bts = [{
            title: "微信好友",
            url:"./img/share_friend.png"
        }, {
            title: "朋友圈",
            url:"./img/share_friends.png"
        },{
            title: "保存至相册",
            url:"./img/save_phone.png"
        }]


        for(var i=0;i<bts.length;i++){
            $(".shareMenu ul li .sharename").eq(i).html(bts[i].title);
            $(".shareMenu ul li img").eq(i).attr('src',bts[i].url);
            console.log($(".shareMenu ul li .sharename").eq(i).html(bts[i].title));
            $(".shareMenu ul li").eq(i).attr("class",i); 
        }
        $(".shareMenu ul li").each(function(){
            var temp = $(this).attr("class")*1;
            $(this).click(function(){    
                var share_imgs = $(".swiper-slide-active img").attr("src");
                // alert(JSON.stringify( temp*1 ));
                if(temp==$(".shareMenu ul li").length-1){
                    // alert("保存至相册");
                    // alert(share_imgs);
                    savePicture(share_imgs);
                }else{
                    // alert("分享" + ids[temp].id);
                    // alert(share_imgs);
                    shareAction(ids[temp].id, ids[temp].ex,share_imgs);
                }
                
            })
            
        })


        function outSet(msg) {
        console.log(msg);
        }
        // 界面弹出吐司提示
        function outLine(msg) {
            mui.toast(msg);
        }

          // 保存图片到相册中 
    function savePicture(url) {
        plus.gallery.save( url, function () {
            mui.toast( "保存图片到相册成功" );
        } ,function(){
            mui.toast( "保存失败" );
        } );
    }