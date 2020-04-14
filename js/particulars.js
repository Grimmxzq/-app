/*************************************************
 *FileName:      particulars.js
 *Description:   商品详情.js
 *************************************************/
/*
 * 启动
 */
mui.previewImage();
    mui.init({
				statusBarBackground:"#fff",
				
    });
//  immersedStyle(0.5);
common.format();
options = {
	scrollY: true, //是否竖向滚动
	scrollX: false, //是否横向滚动
	startX: 0, //初始化时滚动至x
	startY: 0, //初始化时滚动至y
	indicators: false, //是否显示滚动条
	deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
	bounce: true //是否启用回弹
   }

//返回前初始
/*
 * 变量初始化
 */
var that = common.getUrlParam('that');
var oid = common.getUrlParam('dataid');
var woman_num = common.getUrlParam('woman_num');
/*
 * 主程序
 */
if(that == 1) {
		window.BC_SDK = BCSDK_AppLink.init({
			appkey: '23082328', //必填，输入百川应用的appkey
			backURL: 'tbopen7663://', //必填，默认为空字符串，applink的tips的回跳url， 设置能在手机淘宝里面调回你自己应用的url，格式为`tbopen${appkey}`。
			openApp: true, //非必填，默认为true，非必填，是否唤起客户端，设置false，只会做H5跳转。
			linkKey: 'TB', //非必填，默认为TB, 唤起手淘(TB)/天猫(TM)。
			isNeedDownload: false, //非必填，默认为false, 没有app的情况下跳转目标h5页面还是下载页, 默认跳转目标h5页面。
			isDefaultRedirect: true, //选填, 没有唤起app的情况下是否默认跳转, 默认true。
			params: {}, //非必填，带给applink协议的扩展参数,用户自定义参数也传在这里, 如scm、pvid、pid、subpid、e、unionId等业务参数会放到这里。
			trackParams: {}, //非必填，ybhpss的映射对象，传入这里的参数会被拼为ybhpss字符串带到协议上。   
			timeout: 1000 // 非必填，默认跳转(目标h5页/下载页)的延时时长。
		});
}
function getDefaultData() {
	return {
		title : '', 
		oldprice : '', 
		newprice : '',  
		cheapprice : '',  
		guide_title : '',  
		saled : '',
		banner : '',
		type: parseInt(that),
		subval: 1,
		ocolor: -1,
		textcolor: ["默认"],
		osize: -1,
		textsize: ["默认"],
		goodssize:"",
		goodscolor:"",
		datas: [],
		banner: '',
		items: [],
		con: [],
		quan: '',
		shop_article: '',
		shop_point: '',
		oldmoney: '',
		tkmoney: '',
		fans: '',
		buyurl: [],
		pimgs: '',
		li: [{
				lis: '不支持退换货'
			},
			{
				lis: '正版授权'
			},
			{
				lis: '本商城自营'
			},
		],
		pointpre: 0,
		returnpre: 0,
		detailAllImg:'',
		detailImg:"",
		detailImg_that:[],
		picAndFontDetail:"商品图文详情",
		arr:{},
		chooseNum:[],
		chooseData:[],
		flag:false,
		type_num:0,
	}
}
var commodity = new Vue({
	el: '#main-box',
	data: getDefaultData(),
	created: function() {
		var vm = this;

		if(that == 1) {
			document.addEventListener('get_detail', function(event) {  
				var oid = event.detail.oid;  
				if(!oid) {  
						return;  
				}  
				//前页传入的数据，直接渲染，无需等待ajax请求详情后  
				vm.title = event.detail.title;  
				vm.oldprice = event.detail.oldprice;  
				vm.newprice = event.detail.newprice;  
				vm.cheapprice = event.detail.cheapprice;  
				vm.guide_title = event.detail.guide_title;  
				vm.saled = event.detail.saled;  
				vm.banner = event.detail.img;
				//向服务端请求文章详情内容  
				mui.ajax(common.config + "/newapi/index/gettbitemdetail", {  
						data:{
							num_iid:oid
						},
						type:'get',  
						dataType: 'json', //服务器返回json格式数据  
						timeout: 15000, //15秒超时  
						headers:{
								key:localStorage.userKey
						},
						success: function(e) {  
								console.log(e);
								if(e.code == 403){
									mui.toast(e.body.msg);
									setTimeout(function(){
											mui.openWindow({
													url:"login.html",
													id:"login"
											});
									},1000)
							}else{
								vm.detailAllImg = e.data.small_images.string;
							}
						},  
						error: function(xhr, type, errorThrown) {  
								mui.toast('获取文章内容失败');  
								//TODO 此处可以向服务端告警  
						}  
				});  
			});
			// //返佣比例
			this.getpre();
		} else if(that == 2) {
			//详情内容
			var request_obj = {
					id: oid
			};
			common.curl(common.config +"/newapi/jifenshop/goods_info",request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(e){
				console.log(e);
				if(e.code == 1) {
					//给积分商城商品详情每个元素标记
					vm.datas.title = e.data.title;//积分商品名称
					vm.datas.jifen = e.data.jifen;//积分商品积分
					vm.datas.update_time = e.data.update_time;//积分商品时间戳（转化为时间）
					vm.datas.shangjia_time = getLocalTime(e.data.shangjia_time);
					if(vm.datas.color){
						vm.textcolor = vm.datas.color;
					}
					if(vm.datas.size){
						vm.textsize = vm.datas.size;
					}
					vm.detailImg=e.data.content;
					// var reg = "</p>";
					// var content = e.body.data.content.split(reg);
					// var reg2 = "<p>";
					// for(var i=0;i<content.length;i++){
					// 	vm.detailImg.push(content[i].split(reg2));
					// }
					vm.datas.attr = e.data.attr;
					console.log(vm.datas.attr);
					vm.banner = e.data.picurl;//积分商品banner图
					$(".particulars .top .discount").css("display","none")
					$(".particulars .top .msg-oldmoney").css("display","none")
				} else {
					mui.toast(e.msg)
				}
			})
		} else {
			var request_obj = {
				access_token: localStorage.access_token,
				order_id: oid,
			};
			common.curl(common.config +"/index.php/api/user/orderinfo",request_obj,{sign:create_sign(request_obj)},'post',function(e){
				console.log(e);
				if(e.error_code == 0) {
					this.banner = common.config + e.data.banner;
					this.datas.shop_point = e.data.shop_point;
					this.datas.shop_price = e.data.shop_price;
					this.datas.order_sn = e.data.order_sn;
					this.datas.over_time = e.data.over_time;
					this.datas.start_time = e.data.start_time;
					this.datas.pay_time = e.data.pay_time;
					this.datas.goods_color = e.data.goods_color;
					this.datas.goods_size = e.data.goods_size;
					this.datas.ads = e.data.province + e.data.city + e.data.area + e.data.address;
					this.datas.img = e.data.image;
				} else {
					mui.toast(e.error_msg)
				}
			})
		}
	},
	methods: {
		affirm: function() {
			//跳转确认订单
			if(this.ocolor == -1 || this.osize == -1) {
				this.select();
			} else {
				localStorage.order_ocolor = this.textcolor;
				localStorage.order_osize = this.textsize;
				localStorage.order_osub = this.subval
				common.pageTransition("affirm.html?dataid=" + oid);
			}
		},
		goback:function(){
			mui.back()
		},
		select: function() {
			//选择颜色
			document.querySelector(".show").classList.remove('active');
			document.querySelector(".porer").classList.add('active');
			document.querySelector(".mask").classList.add('active');
			document.querySelector(".seiecolor").classList.add('active');
		},
		site: function() {
			document.querySelector(".show").classList.add('active');
			document.querySelector(".porer").classList.add('active');
			document.querySelector(".mask").classList.add('active');
			document.querySelector(".seiecolor").classList.remove('active');
		},
		onnoover: function() {
			//点击订单状态
			common.pageTransition("addorder.html?oid=" + oid);
		},
		onover: function() {
			//点击失败
			mui.back();
		},
		onmask: function() {
			document.querySelector(".mask").classList.remove('active');
			document.querySelector(".porer").classList.remove('active');
		},
		onupsub: function() {
			this.subval++;
		},
		ondownsub: function() {
			if(this.subval > 1) {
				this.subval--;
			}
		},
		valblur: function() {
			if(!this.subval) {
				this.subval = 1;
			}
		},
		choose: function(con,index) {
			console.log(con);
			console.log(index);
			// this.ocolor = index;
			// this.goodscolor = con;
			// $(this).addClass("chooseActive");

			for(var i=0;i<this.datas.attr.length;i++){
				if(i==index){
					var attrTitle = this.datas.attr[i][0];
					this.chooseNum.push(this.datas.attr[i][0]);//判断是否用户全部选中
					this.arr[attrTitle] = con;
				}
			}
			//去重
			for(var j=0;j<this.chooseNum.length;j++){
				if (this.chooseData.indexOf(this.chooseNum[j]) === -1) {
					this.chooseData.push(this.chooseNum[j]);
				}
			}
			console.log(this.arr.length);
			console.log(this.chooseData);
			$(".cloexbox a").on('click',function(){
				$(this).addClass("active").siblings().removeClass("active");
			})
		},
		onsize: function(con, index) {
			this.osize = index;
			this.goodssize = con;
			// $(this).addClass("active");
		},
		onbtn: function() {
			// document.querySelector(".porer").classList.remove('active');
			// document.querySelector(".mask").classList.remove('active');

			console.log(this.chooseData.length)
			if(this.datas.attr.length  == this.chooseData.length) {
				// console.log("全部选中；准备跳转")
				localStorage.attr = JSON.stringify(this.arr);
				localStorage.order_osub = this.subval;
				// document.querySelector(".mask").classList.remove('active');
				// document.querySelector(".porer").classList.remove('active');
				common.pageTransition("affirm.html?dataid=" + oid);
			} else {
				// localStorage.order_ocolor = this.goodscolor;
				// localStorage.order_osize = this.goodssize;
				// localStorage.order_osub = this.subval;
				// common.pageTransition("affirm.html?dataid=" + oid);
				mui.toast('请全部选中');
			}
		},
		// 判断app是否安装
		testApp:function (url){ 
			var timeout , t = 1000, hasApp = true; 
			setTimeout(function () { 
			  if (hasApp) { 
				alert('安装了app'); 
			  } else { 
				alert('未安装app'); 
			  } 
			  document.body.removeChild(ifr); 
			}, 2000) 
			var t1 = Date.now(); 
			var ifr = document.createElement("iframe"); 
			ifr.setAttribute('src', url); 
			ifr.setAttribute('style', 'display:none'); 
			document.body.appendChild(ifr); 
			timeout = setTimeout(function () { 
			   var t2 = Date.now(); 
			   if (!t1 || t2 - t1 < t + 100) { 
				 hasApp = false; 
			   } 
			}, t); 
			return hasApp;
		  } ,
		  
		buy: function() {
			// 转链接口
			plus.nativeUI.showWaiting();
			vm = this;
			if(!!woman_num){
				vm.type_num = woman_num;
			}
			var request_obj = {
					item_id: oid,
					type:vm.type_num
			};
			common.curl(common.config +"/newapi/tb/convertlink",request_obj,{sign:create_sign(request_obj),key: localStorage.userKey},'post',function(data){
				console.log(data)
					if(data.code==403){
						mui.toast('登录过期，请重新登录');
						setTimeout(()=>{
							common.pageTransition('login.html');
						},1000)
					}else{
						if(data.code==1){
							if(data.data.coupon_click_url){
								// vm.testApp(data.data.coupon_click_url);
								var ApplicationInf = {
									pname: 'com.taobao.taobao',
									action: 'taobao://'
								}
								if(plus.runtime.isApplicationExist(ApplicationInf)){
									console.log("淘宝已安装");
									mui.openWindow({
										url:data.data.coupon_click_url,
										show:{
											autoShow:false,//页面loaded事件发生后自动显示，默认为true
											aniShow:"slide-in-right",//页面显示动画，默认为”slide-in-right“；
											duration:'100'//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
										},
										waiting:{
											autoShow:false,//自动显示等待框，默认为true
											title:'正在加载...',//等待对话框上显示的提示内容
											options:{
												padlock:"ture"
											}
										},
									})
									return true;
								}else{
									console.log("淘宝未安装");
									mui.toast("检测到未安装淘宝app");
									return false;
								}
							}
							
						}else{
							mui.toast("网络异常,请稍候再试");
						}
					}
			})
		},
		getpre: function() { //返佣比例
			var vm = this;
			$.ajax({
				type: "get",
				url: common.config + "/index.php/api/index/getpre",
				async: true,
				success: function(data) {
					vm.pointpre = data.money_point * 1;
					vm.returnpre = data.gold_pro * 1;
				}
			});
		},
		// 重置数据
		resetData:function(){
			Object.assign(this.$data, getDefaultData());
		}
	},
	updated:function(){
		$('.particulars .top .mui-slider .mui-slider-group .mui-slider-item img, .particulars .top .taobao-banner img').error(function(){
			$(this).attr("src", "./img/index_shoppingCity.jpg");
		});
		$('.particulars .show-img-box .img-box img').error(function(){
			$(this).attr("src", "./img/index_shoppingCity.jpg");
		});
		$('.particulars .porer .seiecolor .con .img img').error(function(){
			$(this).attr("src", "./img/index_shoppingCity.jpg");
		});
	}
})

document.querySelector(".close .em").addEventListener('tap', function() {
	$(".cloexbox .active").removeClass("active");
	document.querySelector(".mask").classList.remove('active');
	document.querySelector(".porer").classList.remove('active');
})

//时间戳转时间
function getLocalTime(nS) {  
	return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');  
}
// 监听后台运行
document.addEventListener('pause',function(){
    console.log('后台运行...');
    plus.nativeUI.closeWaiting(); 
});

//重写返回逻辑，返回时隐藏详情页webview  
mui.back = function() {  
	plus.webview.currentWebview().hide("auto", 300);  
}  
//窗口隐藏时，重置页面数据  
mui.plusReady(function () {  
	var self = plus.webview.currentWebview();  
	self.addEventListener("hide",function (e) {  
			window.scrollTo(0, 0);//重置滚动条位置  
			commodity.resetData();//重置页面数据  
	},false);  
})  
