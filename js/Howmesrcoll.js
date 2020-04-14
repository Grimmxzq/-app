// 初始化mescroll
function initMeScroll() {
    //创建MeScroll对象,内部已默认开启下拉刷新,自动执行up.callback,刷新列表数据;
    //是否为ios设备;
    var isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    //是否为PC端,如果是scrollbar端,默认自定义滚动条
    var isPC = typeof window.orientation == 'undefined' ;
    var mescroll = new MeScroll("mescroll", {
      //下拉刷新的所有配置项
      down:{
        use: true, //是否初始化下拉刷新; 默认true
        auto: false, //是否在初始化完毕之后自动执行下拉回调callback; 默认true
        autoShowLoading: true, //如果在初始化完毕之后自动执行下拉回调,是否显示下拉刷新进度; 默认false
        isLock: false, //是否锁定下拉,默认false;
        isBoth: false, //下拉刷新时,如果滑动到列表底部是否可以同时触发上拉加载;默认false,两者不可同时触发;
        callback: function(mescroll) {
          //加载轮播数据
          getRankingListDown();
          //下拉刷新的回调,默认重置上拉加载列表为第一页
          // mescroll.resetUpScroll();
        },
        offset: 60, //触发刷新的距离,默认80
        outOffsetRate: 0.2, //超过指定距离范围外时,改变下拉区域高度比例;小于1,越往下拉高度变化越小;
        mustToTop: !isIOS, //是否列表必须滑动到顶部才能下拉;因为列表回弹效果(-webkit-overflow-scrolling:touch)是iOS专属样式,所以iOS默认false,其他为true;
        hardwareClass: "mescroll-hardware", //硬件加速样式;解决iOS下拉因隐藏进度条而闪屏的问题,参见mescroll.min.css
        warpClass: "mescroll-downwarp", //容器,装载布局内容,参见mescroll.min.css
        resetClass: "mescroll-downwarp-reset", //高度重置的动画,参见mescroll.min.css
        htmlContent: '<p class="downwarp-progress"></p><p class="downwarp-tip">下拉刷新</p>', //布局内容
        inited: function(mescroll, downwarp) {
          console.log("down --> inited");
          //初始化完毕的回调,可缓存dom
          mescroll.downTipDom = downwarp.getElementsByClassName("downwarp-tip")[0];
          mescroll.downProgressDom = downwarp.getElementsByClassName("downwarp-progress")[0];
        },
        inOffset: function(mescroll) {
          console.log("down --> inOffset");
          //进入指定距离offset范围内那一刻的回调
          if(mescroll.downTipDom) mescroll.downTipDom.innerHTML = "下拉刷新";
          if(mescroll.downProgressDom) mescroll.downProgressDom.classList.remove("mescroll-rotate");
        },
        outOffset: function(mescroll) {
          console.log("down --> outOffset");
          //下拉超过指定距离offset那一刻的回调
          if(mescroll.downTipDom) mescroll.downTipDom.innerHTML = "释放更新";
        },
        onMoving: function(mescroll, rate, downHight) {
          //下拉过程中的回调,滑动过程一直在执行; rate下拉区域当前高度与指定距离offset的比值(inOffset: rate<1; outOffset: rate>=1); downHight当前下拉区域的高度
          console.log("down --> onMoving --> mescroll.optDown.offset="+mescroll.optDown.offset+", downHight="+downHight+", rate="+rate);
          if(mescroll.downProgressDom) {
            var progress = 360 * rate;
            mescroll.downProgressDom.style.webkitTransform = "rotate(" + progress + "deg)";
            mescroll.downProgressDom.style.transform = "rotate(" + progress + "deg)";
          }
        },
        beforeLoading: function(mescroll, downwarp) {
          console.log("down --> beforeLoading");
          //准备触发下拉刷新的回调
          return false; //如果要完全自定义下拉刷新,那么return true,此时将不再执行showLoading(),callback();
        },
        showLoading: function(mescroll) {
          console.log("down --> showLoading");
          //触发下拉刷新的回调
          if(mescroll.downTipDom) mescroll.downTipDom.innerHTML = "加载中 ...";
          if(mescroll.downProgressDom) mescroll.downProgressDom.classList.add("mescroll-rotate");
        }
      },
      //上拉加载的所有配置项
      up: {
        use: true, //是否初始化上拉加载; 默认true
        auto: true, //是否在初始化时以上拉加载的方式自动加载第一页数据; 默认false
        isLock: false, //是否锁定上拉,默认false;当列表没有更多数据时会自动锁定不可上拉;在endSuccess如果检查到有下一页数据,则会自动解锁true
        isBoth: false, //上拉加载时,如果滑动到列表顶部是否可以同时触发下拉刷新;默认false,两者不可同时触发; 这里为了演示改为true,不必等列表加载完毕才可下拉;
        callback: getRankingListUp, //上拉回调,此处可简写; 相当于 callback: function (page, mescroll) { getListData(page); }
        page: {
          num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 12, //每页数据条数
          time: null //加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
        },
        noMoreSize: 1, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        offset: 100, //离底部的距离
        resetShowDownScroll: false, //重置上拉加载数据,是否显示下拉的进度布局;默认false,默认显示上拉加载的进度布局;
        toTop: {
          //回到顶部按钮,需配置src才显示
          src: "", //图片路径,默认null;
          offset: 1000, //列表滚动多少距离才显示回到顶部按钮,默认1000
          warpClass: "mescroll-totop", //按钮样式,参见mescroll.min.css
          showClass: "mescroll-fade-in", //显示样式,参见mescroll.min.css
          hideClass: "mescroll-fade-out", //隐藏样式,参见mescroll.min.css
          duration: 300 //回到顶部的动画时长,默认300ms
        },
        loadFull: {
          use: false, //列表数据过少,不足以滑动触发上拉加载,是否自动加载下一页,直到满屏或者无更多数据为止;默认false,因为可通过调高page.size避免这个情况
          delay: 500 //延时执行的毫秒数; 延时是为了保证列表数据或占位的图片都已初始化完成,且下拉刷新上拉加载中区域动画已执行完毕;
        },
        empty: {
          //列表第一页无任何数据时,显示的空提示布局; 需配置warpId或clearEmptyId才生效;
          warpId:'webGame', //父布局的id; 如果此项有值,将不使用clearEmptyId的值;
          icon: null, //图标,默认null
          tip: "暂无相关数据~", //提示
          btntext: "", //按钮,默认""
          btnClick: null, //点击按钮的回调,默认null
        },
        clearId: null, //加载第一页时需清空数据的列表id; 如果此项有值,将不使用clearEmptyId的值;
        clearEmptyId: "", //相当于同时设置了clearId和empty.warpId; 简化写法;
        hardwareClass: "mescroll-hardware", //硬件加速样式,动画更流畅,参见mescroll.min.css
        warpClass: "mescroll-upwarp", //容器,装载布局内容,参见mescroll.min.css
        htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>', //上拉加载中的布局
        htmlNodata: '<p class="upwarp-nodata">更多精彩敬请期待</p>', //无数据的布局
        inited: function(mescroll, upwarp) {
          console.log("up --> inited");
          //初始化完毕的回调,可缓存dom 比如 mescroll.upProgressDom = upwarp.getElementsByClassName("upwarp-progress")[0];
        },
        showLoading: function(mescroll, upwarp) {
          console.log("up --> showLoading");
          //上拉加载中.. mescroll.upProgressDom.style.display = "block" 不通过此方式显示,因为ios快速滑动到底部,进度条会无法及时渲染
          upwarp.innerHTML = mescroll.optUp.htmlLoading;
        },
        showNoMore: function(mescroll, upwarp) {
          console.log("up --> showNoMore");
          //无更多数据
          upwarp.innerHTML = mescroll.optUp.htmlNodata;
        },
        onScroll: function(mescroll, y){ //列表滑动监听,默认onScroll: null;
          //y为列表当前滚动条的位置
          console.log("up --> onScroll 列表当前滚动的距离 y = " + y);
        },
        scrollbar: {
          use: isPC, //默认只在PC端自定义滚动条样式
          barClass: "mescroll-bar"
        }
      }
    });
    return mescroll;
  }


  //上拉加载插件
Mescroll = function(){
    var that = this;
    that.mescrollCallBack;//回调函数，可拆分为上拉加载回调函数、下拉刷新回调函数，此处上拉加载、下拉刷新调用同一个回调函数
    that.page = {//列表信息的页码信息，包括每页条数、页码
            num: 1,//初始页码，默认列表页初始页码为1。第一种访问方式，页码变化，列表条数不变
            size: 10,//每页显示条数，默认列表页每页显示10条
            trueNum: "",//另一种页码计算方式，此计算方式中，页码不变，变化的只有列表页条数，此变量用于记录页码，初始值为page.num。第二种访问方式，页码不变，列表条数变化
            trueSize: "",//列表页条数，初始值为page.size
        };
    that.emptyId = "ListUl";//列表信息为空时，显示列表为空的信息的div的id值，默认为ListUl
    that.empty = {//列表信息为空时，显示列表为空的信息
            icon: "../../images/mescroll-empty.png",//默认图标地址
            tip: "暂无相关数据~", //提示
            btntext: "返回上一页", //按钮,默认""
            btnHref: "javascript:history.go(-1)"//点击按钮的回调,默认null
        };
    that.noMoreSize = 5;//如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(譬如只有一条数据),显示无更多数据会不好看;默认设置为5
    that.noMore = {//列表无更多信息时，显示的提示
            tip: "-- END --"//提示
        };
    that.toTop = {//配置回到顶部按钮
        src: "../../images/mescroll-totop.png",//默认图标
        offset: window.innerHeight,//默认滚出设备屏幕高度时显示
        time: 1000//回到顶部的时间，默认1秒钟
    };
    that.upLoadHeight = 60;//距离底部60px时，即触发上拉加载，不必完全拉到底部
    that.upLoad = true;//是否启用上拉加载，默认启用
    that.downLoad = true;//是否启用下拉刷新，默认启用
    that.scrollToptimer;//定时循环回到顶部的定时器
    
    var firstLoadStatu = true;//是否第一次执行此函数
    var scrollUpLoad = true;//滚动条触发上拉加载，一段范围内，只允许触发一次
    var oldScrollHeight = 0;//存储上一个滚轮的位置，用以判断滚轮是向上滚动、还是向下滚动，初始值为0
    var pageY;//当前页面高度
    var sheBeiY = window.innerHeight;//设备屏幕高度
    var scrollY;//当前滚动条的位置
    var startY;//起点Y轴位置
    var endY;//终点Y轴位置
    
    that.firstLoad = function(){//初始化此插件时，执行回调函数
        if(firstLoadStatu){
            that.page.trueNum = that.page.num;//第二种访问方式，为页码赋值
            that.page.trueSize = that.page.size;//为列表页条数赋值
            
            that.mescrollCallBack(that.page);//若是第一次执行此函数，直接执行回调函数
            firstLoadStatu = false;//实例化此插件后，只能执行一次此函数
        };
    };
    
    that.endMescroll = function(listNum){//传入列表信息条数，判断显示的内容
        document.getElementById(that.emptyId).innerHTML="";//执行此函数前，先把之前添加的参数清空
        if(listNum == 0){//若列表信息为空时，显示列表为空的信息
            document.getElementById(that.emptyId).innerHTML="<div class=\"mescroll_empty\">"
                +"<img class=\"mescroll_empty_icon\" src=\""+that.empty.icon+"\">"
                +"<p class=\"mescroll_empty_tip\">"+that.empty.tip+"~</p>"
                +"<a class=\"mescroll_empty_btn\" href=\""+that.empty.btnHref+"\">"+that.empty.btntext+"</a>"
                +"</div>";
        }else if(that.noMoreSize<listNum && listNum<that.page.trueSize){//列表无更多信息时，显示提示
            document.getElementById(that.emptyId).innerHTML="<h4 class=\"mescroll_end\">"+that.noMore.tip+"</h4>";
        }
        if(listNum < that.page.trueSize){
            that.upLoad = false;//禁止上拉加载
        }else{
            that.upLoad = true;//启用上拉加载
        }
    };
    
    document.addEventListener("touchstart",function(ev){//手指在屏幕上的起始位置
        startY = ev.touches[0].pageY;//获取起点Y轴位置
    },false);
    document.addEventListener("touchend",function(ev){//手指在屏幕上的结束位置
        pageY = document.body.scrollHeight;//获取当前页面高度
        scrollY = window.scrollY;//获取当前滚动条的位置
        endY = ev.changedTouches[0].pageY;//获取终点Y轴位置
        
        //上拉加载
        if(pageY-sheBeiY < 0 || (pageY-sheBeiY-scrollY-that.upLoadHeight<0)){//若 当前页面高度 - 设备屏幕高度 < 0 ，即屏幕不满一页，需要拉动的距离设置为0
            var upDistanceY = 0;
        }else{
            var upDistanceY = pageY - sheBeiY - scrollY -that.upLoadHeight;//当前页面高度-设备屏幕高度-当前滚动条的位置=需要拉动的距离，60是指距离底部60px，即触发下拉加载，不必完全拉到底部
        }
        var upY = startY - endY;//上拉时，向上拉动的距离
        if(upY > upDistanceY){//上拉加载
            if(that.scrollToptimer){//若正处于回到顶部的过程中，立即停止回到顶部，清除掉定时器
                clearInterval(that.scrollToptimer);
            }
            if(that.upLoad){//启用了上拉加载
                that.page.num += 1;//页码数+1
                that.page.trueSize = that.page.num*that.page.size;//计算列表页条数
                that.mescrollCallBack(that.page);//执行回调函数
            }
        };
        
        //下拉刷新
        var dowmY = endY - startY;//下拉刷新时，向下拉动的距离
        if(dowmY>scrollY){//下拉刷新
            if(that.downLoad){//启用了下拉刷新
                that.page.num = that.page.trueNum;//页码数还原为初始页码
                that.page.trueSize = that.page.size;//列表页条数还原为初始列表页条数
                that.mescrollCallBack(that.page);//执行回调函数
            };
        };
    },false);
    //监听滚动条
    document.addEventListener("scroll",function(ev){
        pageY = document.body.scrollHeight;//获取当前页面高度
        scrollY = window.scrollY;//获取当前滚动条的位置
        if(scrollY>oldScrollHeight){//如果当前位置>上一个滚轮的位置，即为向下滚动，即上拉
            if(that.scrollToptimer){//若正处于回到顶部的过程中，立即停止回到顶部，清除掉定时器
                clearInterval(that.scrollToptimer);
            }
        }
        oldScrollHeight = scrollY;
        //console.log("当前滚动条的位置:"+scrollY);
        //上拉加载
        if(pageY - scrollY - sheBeiY < that.upLoadHeight){//当前页面高度 - 若 当前滚动条的位置 - 设备屏幕高度 < 60 ，即触发上拉加载
            if(scrollUpLoad){//是否允许滚动条触发上拉加载
                scrollUpLoad = false;//滚动条触发上拉加载后，禁止滚动条触发上拉加载，一段范围内，只允许触发一次
                if(that.upLoad){//启用了上拉加载
                    that.page.num += 1;//页码数+1
                    that.page.trueSize = that.page.num*that.page.size;//计算列表页条数
                    that.mescrollCallBack(that.page);//执行回调函数
                }
            }
        }else{
            scrollUpLoad = true;//滚动条无法触发上拉加载后，允许滚动条触发上拉加载
        }
        
        if(scrollY>that.toTop.offset){//若滚动条位置 > 设置的高度，新增一个回到顶部的img元素
            if(document.getElementsByClassName("mescroll_toTop_img").length==0){//若没有回到顶部的img，添加它
                var toTopImg = document.createElement("img");//创建一个img元素
                toTopImg.className="mescroll_toTop_img";//为该img元素添加一个class名
                toTopImg.src=that.toTop.src;//为该img元素的src属性赋值  
                document.getElementById(that.emptyId).before(toTopImg);//在指定的dom元素前添加该子元素img 
                
                document.getElementsByClassName("mescroll_toTop_img")[0].addEventListener("click",function(ev){
                    //document.documentElement.scrollTop = 0;
                    
                    var toTop = document.body.scrollTop || document.documentElement.scrollTop;//获取初始时距顶部距离的值
                    var toTopHeight = toTop * 20 * 3 / that.toTop.time;//初始时距顶部距离的值 * 定时器的时间 / 回到顶部的时间 = 单位时间内，往上滑的距离，多乘了一个3，是因为测试时觉得太慢
                    that.scrollToptimer = setInterval(function (){//定时循环回到顶部，speed值越小，动画效果越慢
                        var currentToTop = document.body.scrollTop || document.documentElement.scrollTop;//获取当前距顶部距离的值
                        if (document.body.scrollTop!=0){
                            document.body.scrollTop -= toTopHeight;
                        }else{
                            document.documentElement.scrollTop -= toTopHeight;
                        }
                        if(currentToTop == 0){
                            clearInterval(that.scrollToptimer);
                        }
                    },20);
                },false);
            }
        }else{//若滚动条位置 < 设置的高度，移除该回到顶部的img元素
            if(document.getElementsByClassName("mescroll_toTop_img").length==1){//若有回到顶部的img，移除它
                var toTopImg=document.getElementsByClassName("mescroll_toTop_img")[0];//获取该回到顶部的img元素
                toTopImg.parentNode.removeChild(toTopImg);//移除该回到顶部的img元素
            }
        }
    },false);
};