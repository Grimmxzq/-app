

//封装
var common = {
    isFirst: true,
    /** 只有第一次点击有效 防止重复点击 **/
    waiting: null,
    /** 只有第一次点击有效 原生缓冲动画 **/
    play: null,
    /** 播放语音 **/
    init: function() { /** 初始化 **/
        mui.init();

        // textarea输入框阻止默认滑动 S
        window.addEventListener('touchmove', function(e) {
            var target = e.target;
            if(target && target.tagName === 'TEXTAREA' && target.scrollHeight > target.clientHeight) { //textarea阻止冒泡
                e.stopPropagation();
            }
        }, true);

        //初始化滚动
        //mui('.mui-scroll-wrapper').scroll({
        //    scrollY: true, //是否竖向滚动 默认true
        //    scrollX: false, //是否横向滚动 默认false
        //    startX: 0, //初始化时滚动至x 默认0
        //    startY: 0, //初始化时滚动至y 默认0
        //    indicators: false, //是否显示滚动条 默认为true
        //    deceleration: 0.003, //阻尼系数,系数越小滑动越灵敏 默认0.0006
        //    bounce: false //是否启用回弹 默认true
        //});
    },
    setFullscreen: function(isTrue) { /** 设置隐藏顶部状态栏 **/
        !arguments.length ? (isTrue = true) : (isTrue = false);
        plus.navigator.setFullscreen(isTrue);
    },
    getStatusBarBackground: function(callback) { /** 获取顶部状态栏背景颜色 **/
        var rgb = plus.navigator.getStatusBarBackground();
        callback(rgb);
    },
    setStatusBarBackground: function(color) { /** 设置顶部状态栏背景颜色 **/
        plus.navigator.setStatusBarBackground(color);
    },
    storageSetItem: function(str, obj) { /** 本地存储对象 **/
        plus.storage.setItem(str, JSON.stringify(obj));
    },
    storageGetItem: function(str, callback) { /** 获取本地存储 **/
        if(this.IsJsonString(plus.storage.getItem(str))) {
            var obj = JSON.parse(plus.storage.getItem(str));
            callback(obj);
        } else {
            var strs = plus.storage.getItem(str);
            callback(strs);
        }
    },
    pageTransition: function(href) { /** H5+ 页面过渡封装 S  common.pageTransition(href) **/
        var me = this;
        if(me.isFirst) {
            if(mui.os.plus) {
                //me.waiting = plus.nativeUI.showWaiting(); //开启缓冲图
                // plus.nativeUI.showWaiting();
            }
            me.isFirst = false;
            setTimeout(function() {
                me.isFirst = true;
            }, 500)
            if(!mui.os.plus) {
                location.href = href;
                return;
            }
            /**
             *动画效果有：auto-自动选择动画效果; none-无动画效果; slide-in-right 从右侧横向滑动效果-关闭动画"slide-out-right"
             *slide-in-left 从左侧横向滑动效果-关闭动画"slide-out-left"; slide-in-top 从上侧竖向滑动效果-关闭动画"slide-out-top"
             *slide-in-bottom 从下侧竖向滑动效果-关闭动画"slide-out-bottom"; fade-in 从透明到不透明逐渐显示效果-关闭动画"fade-out"
             *zoom-out 从小到大逐渐放大显示效果-关闭动画"zoom-in"; zoom-fade-out 从小到大逐渐放大并且从透明到不透明逐渐显示效果-关闭动画"zoom-fade-in"
             *pop-in 从右侧平移入栈动画效果-关闭动画"pop-out"
             **/
            var aniShow = arguments[1] || "pop-in"; //动画效果
            if(mui.os.android && parseFloat(mui.os.version) < 4.4) {
                aniShow = arguments[1] || "slide-in-right";
            }

            var h = plus.webview.getWebviewById(href); //对于预加载是直接跳转
            if(h) {
                h.show(aniShow, 250, function() {
                    plus.nativeUI.closeWaiting();
                    // me.waiting.close(); //关闭缓冲图
                }, {});
            } else {
                var webview = plus.webview.create(href, href, {
                    popGesture: "close"
                }, {});
                webview.addEventListener("loaded", function() {
                    webview.show(aniShow, 250, function() {
                        plus.nativeUI.closeWaiting();
                        // me.waiting.close(); //关闭缓冲图
                    }, {});
                });
            }
        }
    },
    galleryImg: function(callback) { /** H5+ 选择相册 S  common.galleryImg(callback) **/
        plus.gallery.pick(function(a) {
            plus.io.resolveLocalFileSystemURL(a, function(entry) {
                var s = entry.toLocalURL() + "?version=" + new Date().getTime();
                callback(s);
            }, function(e) {
                console.log("读取拍照文件错误：" + e.message);
            });
        }, function(e) {
            mui.toast('取消选择', {
                duration: 2000,
                type: 'div'
            })
            console.log('取消选择');
        }, {
            filter: 'image'
        })
    },
    cameraImg: function(callback) { /** H5+ 拍照 S  cameraImg(callback); **/
        var cmr = plus.camera.getCamera();
        //  var res = cmr.supportedImageResolutions[0]; //大小
        //  var fmt = cmr.supportedImageFormats[0]; //jpg
        cmr.captureImage(function(e) {
                plus.io.resolveLocalFileSystemURL(e, function(entry) {
                    var s = entry.toLocalURL() + "?version=" + new Date().getTime();
                    console.log(s)
                    callback(s);
                }, function(e) {
                    console.log("读取拍照文件错误：" + e.message);
                });
            },
            function(error) {
                mui.toast('取消拍照', {
                    duration: 2000,
                    type: 'div'
                })
                console.log('取消拍照');
            }, {
                format: 'jpg'
            }
        );
    },
    videoCapture: function(callback) { /** H5+ 摄像 S  videoCapture(callback);   未完成 **/
        var cmr = plus.camera.getCamera();
        var res = cmr.supportedVideoResolutions[0];
        var fmt = cmr.supportedVideoFormats[0];
        cmr.startVideoCapture(function(path) {
                plus.io.resolveLocalFileSystemURL(path, function(entry) {
                    var s = entry.toLocalURL();
                    callback(s);
                }, function(e) {
                    alert("读取文件错误：" + e.message);
                });
            },
            function(error) {
                alert("Capture video failed: " + error.message);
            }, {
                resolution: res,
                format: fmt
            }
        );

        // 停止摄像
        function stopCapture() {
            console.log("stopCapture");
            cmr.stopVideoCapture();
        }
    },
    actionSheet: function(title, cancel, btns, callback) { /** H5+ 弹出系统选择按钮框 S  actionSheet(title, cancel, btns,callback);  **/
        if(arguments.length != 4) {
            console.error('传入参数错误：1. title标题，2.底部按钮名称(取消)，3.按钮数组对象[{title:"1"},{title:"2"}],4.回调函数');
            return
        }
        if(!btns[0].title) {
            console.error('按钮数组对象错误：样式 [{title:"1"},{title:"2"}]');
            return
        }
        if(!cancel) {
            cancel = "取消";
        }
        // 弹出系统选择按钮框
        plus.nativeUI.actionSheet({
            title: title,
            cancel: cancel,
            buttons: btns
        }, function(e) {
            callback(e.index);
        });
    },
    resizeImage: function(src, callback) { /** 压缩图片 S  未测试 **/
        plus.zip.compressImage({
                src: src,
                dst: '_doc/a.jpg',
                overwrite: true,
                width: '270px', //这里指定了宽度，同样可以修改
                format: 'jpg',
                quality: 100 //图片质量不再修改，以免失真
            },
            function(e) {
                callback(e.target);
                //上传图片, e.target存的是本地路径！
            },
            function(err) {
                mui.toast('未知错误', {
                    duration: 2000,
                    type: 'div'
                })
            }
        );
    },
    uploadImg: function(src) { /** 上传图片 S  未测试 **/
        var task = plus.uploader.createUpload(ajaxUrl, {
            method: 'post',
            blocksize: 204800,
            timeout: 10
        });

        task.addFile(src, {
            key: 'headImg'
        });
        task.addData('type', 'uploadImg');
        task.addData('userId', '');
        task.addEventListener('statechanged', stateChanged, false);
        task.start();

        function stateChanged(upload, status) {
            if(upload.state == 4 && status == 200) {
                plus.uploader.clear(); //清除上传
                console.log(upload.responseText); //服务器返回存在这里
            }
        }
    },
    audioRecording: function(elem, callback) { /** 录制语音 S **/
        mui.init({
            gestureConfig: {
                tap: true, //默认为true
                doubletap: true, //默认为false
                longtap: true, //默认为false
                swipe: true, //默认为true
                drag: true, //默认为true
                hold: true, //默认为false，不监听
                release: true //默认为false，不监听
            }
        });
        var r = null,
            end = null,
            start = null,
            audiourl = "",
            audiolength = 0,
            recordCancel = false;
        elem.on('hold', function() {
            recordCancel = false;
            start = (new Date()).valueOf();
            r = plus.audio.getRecorder();
            if(r == null) {
                plus.nativeUI.toast("Device not ready!");
                return;
            }
            var fileName = "/audio/" + (new Date()).valueOf() + ".amr";
            r.record({
                filename: "_doc" + fileName
            }, function(path) {
                audiourl = plus.io.convertLocalFileSystemURL(path);
                if(!recordCancel) {
                    return
                };
                callback({
                    length: audiolength,
                    path: audiourl
                });
            }, function(e) {
                r.stop();
                plus.nativeUI.toast("录音时出现异常: " + e.message);
            });
        }).on('release', function() {
            end = (new Date()).valueOf();
            r.stop();
            //计算录音长度
            audiolength = end - start;
            if(audiolength < 800) {
                plus.nativeUI.toast('语音时间太短');
                recordCancel = false;
            } else {
                recordCancel = true;
            }
        });
    },
    playAudio: function(audiokey, callback) { /** 播放语音 S **/
        var me = this;
        if(plus.audio == undefined) {
            plus.nativeUI.toast("Device not ready!");
            return
        }
        if(me.play) {
            me.play.stop();
        }
        me.play = plus.audio.createPlayer(audiokey);
        me.play.play(function() {
            me.play = null;
            callback();
        }, function(e) {
            plus.nativeUI.toast("播放错误: " + e.message);
        });
    },
    thirdparty: function(callback) { /** 第三方登录模块 mui.plusReady(function(data) {}) **/
        //配置第三方登录板块
        var isInstalleds = function(id) { //判断是否安装 weixin qq sinaweibo qihoo
            if(id === 'qihoo' && mui.os.plus) {
                return true;
            }
            if(mui.os.android) {
                var main = plus.android.runtimeMainActivity();
                var packageManager = main.getPackageManager();
                var PackageManager = plus.android.importClass(packageManager)
                var packageName = {
                    "qq": "com.tencent.mobileqq",
                    "weixin": "com.tencent.mm",
                    "sinaweibo": "com.sina.weibo"
                }
                try {
                    return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
                } catch(e) {}
            } else {
                switch(id) {
                    case "qq":
                        var TencentOAuth = plus.ios.import("TencentOAuth");
                        return TencentOAuth.iphoneQQInstalled();
                    case "weixin":
                        var WXApi = plus.ios.import("WXApi");
                        return WXApi.isWXAppInstalled()
                    case "sinaweibo":
                        var SinaAPI = plus.ios.import("WeiboSDK");
                        return SinaAPI.isWeiboAppInstalled()
                    default:
                        break;
                }
            } 
        }

        //第三方登录['weixin', 'qq']
        var authBtns = ['weixin']; //配置业务支持的第三方登录
        var auths = {};
        var oauthArea = document.querySelector('.ys-thirdparty');
        plus.oauth.getServices(function(services) {
            for(var i in services) {
                var service = services[i];
                auths[service.id] = service;
                if(~authBtns.indexOf(service.id)) {
                    var isInstalled = isInstalleds(service.id);
                    var btn = document.createElement('div');
                    //如果微信未安装，则为不启用状态
                    btn.setAttribute('class', 'oauth-btn' + (!isInstalled && service.id === 'weixin' ? (' disabled') : ''));
                    btn.authId = service.id;
                    
                    btn.style.backgroundImage = 'url("img/' + service.id + '.png")'
                    if(!isInstalled && service.id === 'weixin') {
                    	
                    }else {
                    	oauthArea.appendChild(btn);
                    }
                }
            }
            $(oauthArea).on('tap', '.oauth-btn', function() {
                if(this.classList.contains('disabled')) {
                    plus.nativeUI.toast('您尚未安装微信客户端');
                    return;
                }
                var auth = auths[this.authId];
                var waiting = plus.nativeUI.showWaiting();
                var index = this.authId;
                auth.login(function() {
                    waiting.close();
//                  plus.nativeUI.toast("登录认证成功");18670675396
                    auth.getUserInfo(function() {
//                      plus.nativeUI.toast("获取用户信息成功");
                        var name = auth.userInfo.nickname || auth.userInfo.name;
                        plus.storage.setItem("$authIndex", index);
                        //登录成功后的 回调函数
                        callback(auth.userInfo);
                        //location.replace('bind-phone.html');
                    }, function(e) {
                        plus.nativeUI.toast("获取用户信息失败：" + e.message);
                    });
                }, function(e) {
                    waiting.close();
                    plus.nativeUI.toast("登录认证失败：" + e.message);
                });
            });
        }, function(e) {
            oauthArea.style.display = 'none';
            plus.nativeUI.toast("获取登录认证失败");
        });
        // close splash
        setTimeout(function() {
            //关闭 splash
            plus.navigator.closeSplashscreen();
        }, 600);
    },
    logout: function(callback) { /** 第三方登录模块 注销 common.logout(function(){}); **/
        var index = plus.storage.getItem("$authIndex");
        var serviceId = null,
            msg = null;
        plus.oauth.getServices(function(services) {
            for(var i in services) {
                var service = services[i];
                if(service.id == index) {
                    serviceId = service.id;
                    msg = service.description;
                }
                service.logout(function() {
                    if(serviceId) {
                        callback();
                        // plus.nativeUI.toast("账号注销成功");
                    }
                }, function(e) {
                    //plus.nativeUI.toast("注销\"" + service.description + "\"失败：" + e.message);
                });
            }
        }, function(e) {

        });
    },
    /******* js封装 ********/
    imageLazyload: function() { /** 懒加载图片 需要改img src改为data-lazyload 需添加默认图片默认logo.png **/
        mui(document).imageLazyload({
            placeholder: '../images/logo.png'
        });
    },
    getUrlParam: function(name) { /** 获取URL中参数 S   getUrlParam(name) **/
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if(r != null) return unescape(r[2]);
        return null; //返回参数值
    },
    resizeImg: function() { /** 图片转64位码 可压缩 resizeImg(ele,callback,1)  ele为input元素(原生) callback 回调函数  1为压缩比例 默认0.8 **/
        var me = this;
        var ele = arguments[0],
            callback = arguments[1],
            size = arguments[2];
        if(!size) {
            size = 0.8;
        }
        if(size > 1) {
            size = 1;
        }
        var files = ele.files[0];
        var elem = $(ele);
        if(!ele.files.length) {
            return
        };
        if(ele.files.length > 1) {
            mui.alert("只允许上传一张图片!", '提示', '确定', function() {}, 'div');
            return;
        }
        if(!/image\/\w+/.test(files.type)) {
            mui.alert("请选择图片格式！", '提示', '确定', function() {}, 'div');
            return
        }
        var reader = new FileReader();
        reader.readAsDataURL(files);
        reader.onload = function() {
            var newimg = new Image();
            var dataResult = this.result;
            //newimg.setAttribute('crossorigin','anonymous'); 跨域
            newimg.quality = 1.0;
            console.log(dataResult.length)
            newimg.src = dataResult; //data:base64
            newimg.onload = function() {
                var imgData = me.getBase64Image(newimg, size);
                if(dataResult.length < imgData.length) {
                    imgData = dataResult;
                }
                callback(imgData);
            }
        };
    },
    getBase64Image: function(img, size) { /** 压缩图片 **/
        var canvas = document.createElement("canvas");
        var imgW = img.width - 0,
            imgH = img.height - 0;
        canvas.width = imgW * size; //设置绘图大小
        canvas.height = imgH * size;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        var basePath = canvas.toDataURL('image/png');
        console.log(basePath.length)
        //basePath.replace("data:image/png;base64,", "");
        return basePath;
    },
    getTop: function(elem) { /** 计算元素距离文档顶部距离 S **/
        var sum = elem.offsetTop;
        while(elem.offsetParent) {
            sum += elem.offsetParent.offsetTop;
            elem = elem.offsetParent;
        }
        return sum;
    },
    inputOnresize: function(elem, btm) { /** 输入框呼出输入法时 改输入框显示在可视窗口内 S     elem为$(input)输入框元素 btm为距离底部高度(计算出来 底部浮动元素高度+10) **/
        var me = this;
        var viewH1 = document.documentElement.clientHeight; //获取 除去输入法的可视高度
        var viewH = 0;
        elem.focusin(function() {
            var scrolltop = me.getTop(this);
            onresize = function() {
                viewH = document.documentElement.clientHeight; //获取可视高度 如果发生了改变
                if(viewH1 != viewH && viewH < scrolltop + btm) {
                    mui('.mui-scroll-wrapper').scroll().scrollTo(0, (viewH - btm - scrolltop), 100);
                    return
                }
            }
        });
    },
    scrollUpDown: function(elem, callback) { /** 上拉加载 下拉刷新 S  scrollUpDown(elem,callback); 小于0为刷新 大于0为加载 **/
        //elem为滑动的$('.mui-scroll')元素  callback回调函数 index  -2  -1  0  1  2 五个状态 -2为刷新 -1为松开可刷新状态 0为常平常 1为松开可加载 2为加载
        // elem.prepend('<div class="ys-scroll-top">下拉刷新数据</div>').append('<div class="ys-scroll-btm">上拉加载更多</div>');
        // elem.prepend('<div class="ys-scroll-top">下拉刷新数据</div>').append('<div class="ys-scroll-btm">正在加载更多商品</div>');
        elem.prepend('<div class="ys-scroll-top">下拉刷新数据</div>').append('<div class="ys-scroll-btm"></div>');
        // console.log(elem)
        // console.log(elem.height)
        var scrH = elem.height,
            scrPH = elem.parent().height(),
            scrT = 0;
        lineH = elem.children('.ys-scroll-top').height();
        // var index = 0;
        var index = 2;//设置回调函数index为2：加载
        var isDown = false,
            isUp = false; //状态
        if(scrH < scrPH) {
            elem.children('.ys-scroll-btm').text('');
        }
        if(elem.css('transform')!=undefined&&elem.css('transform')!='none'){
            scrT = elem.css('transform').split(/,/)[5].replace(/\)$/, "") - 0;
        }
        //加载
        elem.on('drag', function() {
            scrT = elem.css('transform').split(/,/)[5].replace(/\)$/, "") - 0;
            scrH = elem.height();
            
            if(scrT > 0) {
                //关闭搜索下拉刷新
                // if(scrT > lineH) {
                //     if(!isUp) {
                //         isUp = true;
                //         elem.children('.ys-scroll-top').html('松开刷新数据');
                //     }
                // } else {
                //     index = 0;
                //     if(isUp) {
                //         isUp = false;
                //         elem.children('.ys-scroll-top').html('下拉刷新数据');
                //     }
                // }
            } else if(scrT < 0) {
                // if(-scrT > scrH - scrPH + 10) {

                // console.log("这是滑动距离+1200  ");//-113   手滑动距离
                // console.log(-scrT +1200);
                // console.log("这是滑动距离+1200  ");
                // console.log("这是scrH  "+scrH);
                // console.log("这是scrPH  "+scrPH);
                // console.log(scrH - scrPH + 10);//2626
                // console.log(-scrT  +1200> scrH - scrPH);//2626   
                // console.log(!isDown)
                
                if(-scrT  +1200> scrH - scrPH) {
                    // 滑动到一定位置就加载
                    index = 2;
                    // 原代码是
                    // if(-scrT + 500 > scrH - scrPH + 10) {
                    // if(!isDown) {
                    //     isDown = true;
                    //     elem.children('.ys-scroll-btm').html('松开加载更多');
                    // }
                    // 滑动到一定位置就加载
                } else {
                    // index = 0;
                    index = 0;//修改为index为2：加载
                    if(isDown) {
                        isDown = false;
                        // elem.children('.ys-scroll-btm').html('上拉加载更多');
                        elem.children('.ys-scroll-btm').html('正在加载更多商品');
                    }
                }
            }
        })
        //上拉加载 下拉刷新
        elem.on('dragend', function() {
            scrH = elem.height();
            scrPH = elem.parent().height();
            if(isDown) {
                // index = 1;
                index = 1;//修改index为2：加载状态
                isDown = false;
                elem.children('.ys-scroll-btm').html('<span class="mui-spinner"></span>');
            } else if(isUp) {
                index = -1;
                isUp = false;
                elem.children('.ys-scroll-top').html('<div class="mui-spinner"></div>').css({
                    'position': 'relative',
                    'top': 0
                });
            }
            callback(index, elem);
            //取消加载动画 （这个需要在ajax请求成功后调用 这里不调用 ）
            //          elem.children('.ys-scroll-btm').html('上拉加载更多');
            //          elem.children('.ys-scroll-top').html('下拉刷新数据').attr('style', false);
        })
    },
    get_parmas:function(timestamp){
        var date = new Date();
        date.setTime(timestamp * 1000);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return   y +  '-' + m + '-' + d+' '+h+':'+minute;
    },
    format: function() { /** 时间转换加载 时间戳 转换日期yyyy年M月d日 h:m:s  S    var time=new Date(parseInt(1420184730s) * 1000).format('yyyy年M月d日'); **/

        Date.prototype.format = function(fmt) {
            var o = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3),
                "S": this.getMilliseconds()
            };
            if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for(var k in o) {
                if(new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k] < 10 ? "0" + o[k] : o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
            return fmt;
        };
        
    },
    getCookie: function(name) { /** 获取cookie值 **/
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if(arr = document.cookie.match(reg)) {
            return unescape(arr[2]);
        } else {
            return null;
        }
    },
    browserType: function() { /** 判断访问终端 **/
        var u = navigator.userAgent,
            app = navigator.appVersion; 
        return {
            trident: u.indexOf("Trident") > -1, //IE内核
            presto: u.indexOf("Presto") > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq", //是否QQ
            language: (navigator.browserLanguage || navigator.language).toLowerCase() //语言
        };   
    },
    loadingIn: function() { /** 添加 加载动画 S **/
//     document.querySelector("#ysLoading").remove();
       document.querySelector("body").insertAdjacentHTML('afterend', '<div class="ys-modal-loading" id="ysLoading"><div class="spinner-content"><div class="mui-spinner"></div></div></div>');
//      $('#ysLoading').remove();
//      $('body').append('<div class="ys-modal-loading" id="ysLoading"><div class="spinner-content"><div class="mui-spinner"></div></div></div>');
    },
    loadingOut: function() { /** 取消 加载动画 E **/
//      $('#ysLoading').remove();
        document.querySelector("#ysLoading").remove();
    },
    videoImg: function(ele, callback) { /** common.videoImg(this,function(){}) **/
        $(ele).on('timeupdate', function() {
            if(ele.currentTime > 0.00005) {
                ele.pause();
            }
        }).on('pause', function() {
            var canvas = document.createElement("canvas");
            canvas.width = ele.videoWidth * 0.5;
            canvas.height = ele.videoHeight * 0.5;
            canvas.getContext('2d').drawImage(ele, 0, 0, canvas.width, canvas.height);
            var src = canvas.toDataURL("image/png");
            callback(src);
        })
    },
    checkType: function(str, type) { /** 初步验证 邮件 电话 固定电话 数字 字母 中文 大写字母 **/
        switch(type) {
            case 'email':
                return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
            case 'phone':
                return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
            case 'tel':
                return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
            case 'number':
                return /^[0-9]$/.test(str);
            case 'english':
                return /^[a-zA-Z]+$/.test(str);
            case 'chinese':
                return /^[\u4E00-\u9FA5]+$/.test(str);
            case 'lower':
                return /^[a-z]+$/.test(str);
            case 'upper':
                return /^[A-Z]+$/.test(str);
            case 'ID':
                return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str);
            case 'psw':
                return /^(?=.*[0-9].*)(?=.*[a-zA-Z].*).{6,20}$/.test(str);
                
            default:
                return true;
        }
    },
    checkPwd: function(str) { /** 密码强度检测 返回0 1 2 3 4等级 **/
        var nowLv = 0;
        if(str.length < 6) {
            return nowLv
        }
        if(/[0-9]/.test(str)) {
            nowLv++
        }
        if(/[a-z]/.test(str)) {
            nowLv++
        }
        if(/[A-Z]/.test(str)) {
            nowLv++
        }
        if(/[\.|-|_]/.test(str)) {
            nowLv++
        }
        return nowLv;
    },
    randomNumber: function(count) { /** 随机码 count取值范围0-36 0-9|a-z **/
        return Math.random().toString(count).substring(2);
    },
    countStr: function(str, strSplit) { /** 查找 字符串 出现的次数 **/
        return str.split(strSplit).length - 1
    },
    removeRepeatArray: function(arr) { /** 数组去重 **/
        return Array.from(new Set(arr))
    },
    onlyAndroid: function() { /** 安卓下样式修改 **/
        if(mui.os.android) {
            $('.only-android').css({
                "position": "relative",
                "bottom": "-1px"
            })
        };
    },
    IsJsonString: function(str) { /** 判读是否为JSON字符串 **/
        try {
            JSON.parse(str);
        } catch(e) {
            return false;
        }
        return true;
    },
    formatPassTime: function(startTime) { /** 格式化${startTime}距现在的已过时间 **/
        var currentTime = Date.parse(new Date());
        var time = currentTime - startTime;
        var day = parseInt(time / (1000 * 60 * 60 * 24 ));
        var hour = parseInt(time / ( 1000 * 60 * 60 ));
        var min = parseInt(time / ( 1000 * 60 ));
        var month = parseInt(day / 30 );
        var year = parseInt(month / 12 );
        if(year) return year + "年前";
        if(month) return month + "个月前";
        if(day) return day + "天前";
        if(hour) return hour + "小时前";
        if(min) return min + "分钟前"
        else return '刚刚';
    },
    countDown: function(btnID, times) { /** 发送验证码 **/
        btnID.setAttribute("disabled", "disabled");
        btnID.innerHTML = times + "s后重新发送";
        var outtime = setInterval(function() {
            times--;
            btnID.innerHTML = times + "s后重新发送";
            if(times <= 0) {
                clearInterval(outtime);
                btnID.innerHTML = "发送验证码";
                btnID.removeAttribute("disabled");
            }
        }, 1000);
    },
    // common.curl(common.config +"/newapi/jifenshop/get_single_address",request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){})
    curl: function(url,data,headers,type,callbackcurl){

        var o_headers = {
            'Content-Type' : 'application/json',
            // 'key'	 	   : localStorage.getItem('userKey'),
            'plustype'     : common.plustype,
            'version'      : common.version
        };
        mui.extend(o_headers,headers);
        console.log("系统统一请求");
        // console.log(o_headers);
        
        mui.ajax(url,{
            data:data,
            dataType:'json',//服务器返回json格式数据
            async:true,//异步 同时执行函数
            type:type,//HTTP请求类型
            timeout:10000,//超时时间设置为10秒；
            headers:o_headers,	              
            success:function(redata){
                if(callbackcurl){
                    callbackcurl(redata);
                }
                
            },
            error:function(xhr,type,errorThrown){
                //异常处理；
                 console.log(type);
                plus.nativeUI.toast(errorThrown);
            }
        });
    },
          config: "http://www.ycyz-yt.com",
//   config: "http://192.168.9.204",
    //  config:"http://www.ycyz204.com",
    version:'2.2.5',
    plustype:1
}
var cc = {
    axml : function(url,data,callback) { /** 原生ajax **/
       var xmlhttp;
        if (window.XMLHttpRequest){
            xmlhttp=new XMLHttpRequest();
        }else{
            xmlhttp=new ActiveXObject(url);
        }
        xmlhttp.onreadystatechange=function()
          {
            if (xmlhttp.readyState==4 && xmlhttp.status==200){
                callback(JSON.parse(xmlhttp.response));
            }
          }
        xmlhttp.open("post",url,true);
        xmlhttp.send(data);
    }
}
mui.plusReady(function() {});
common.init();

// 禁止body的滚动事件 S app不要调用
//document.body.addEventListener('touchmove', function(evt) {
//  if(!evt._isScroller && evt.target.className != "district-item" && evt.target.className != "name-item" && evt.target.className != "price-item") {
//      evt.preventDefault();
//  }
//});

 (function(w) {
    var immersed = 0;
    var ms = (/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
    if(ms && ms.length >= 3) {
        immersed = parseFloat(ms[2]);
    }
    w.immersed = immersed;
    w.immersedStyle = function(opy){
        if(!immersed) {
            return;
        }
        var immersedTop = document.querySelector('.immersedTop');
        if(immersedTop){
            // 设置顶部状态栏透明度
            // immersedTop.style.opacity = opy||0.3;
            immersedTop.style.opacity = opy||0;
        }else{
            var immersedDiv = document.createElement("div");
            immersedDiv.className = 'immersedTop';
            immersedDiv.style.height = immersed + 'px';
            // immersedDiv.style.opacity = opy||0.3;
            immersedDiv.style.opacity = opy||0
            document.body.appendChild(immersedDiv);
        }
    };
    if(!immersed) {
        return;
    }
    // immersedStyle(0.0001);
    var t = document.querySelectorAll('[data-header]');
    var tStyle = null;
    if(t.length>0){
        for(var i=0;i<t.length;i++){
            tStyle = parseFloat(getComputedStyle(t[i]).height);
            t[i].style.paddingTop = immersed + 'px';
            t[i].style.height = tStyle+immersed+'px';
        }
    }
    t = document.querySelectorAll('[data-content]');
    if(t.length>0){
        for(var j=0;j<t.length;j++){
            tStyle = parseFloat(getComputedStyle(t[j]).paddingTop);
            t[j].style.paddingTop = tStyle+immersed + 'px';
        }
    }
})(window)