/* 工具类   */
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n():"function"==typeof define&&define.amd?define(n):n()}(0,function(){"use strict";function e(e){var n=this.constructor;return this.then(function(t){return n.resolve(e()).then(function(){return t})},function(t){return n.resolve(e()).then(function(){return n.reject(t)})})}function n(){}function t(e){if(!(this instanceof t))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=undefined,this._deferreds=[],u(e,this)}function o(e,n){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,t._immediateFn(function(){var t=1===e._state?n.onFulfilled:n.onRejected;if(null!==t){var o;try{o=t(e._value)}catch(f){return void i(n.promise,f)}r(n.promise,o)}else(1===e._state?r:i)(n.promise,e._value)})):e._deferreds.push(n)}function r(e,n){try{if(n===e)throw new TypeError("A promise cannot be resolved with itself.");if(n&&("object"==typeof n||"function"==typeof n)){var o=n.then;if(n instanceof t)return e._state=3,e._value=n,void f(e);if("function"==typeof o)return void u(function(e,n){return function(){e.apply(n,arguments)}}(o,n),e)}e._state=1,e._value=n,f(e)}catch(r){i(e,r)}}function i(e,n){e._state=2,e._value=n,f(e)}function f(e){2===e._state&&0===e._deferreds.length&&t._immediateFn(function(){e._handled||t._unhandledRejectionFn(e._value)});for(var n=0,r=e._deferreds.length;r>n;n++)o(e,e._deferreds[n]);e._deferreds=null}function u(e,n){var t=!1;try{e(function(e){t||(t=!0,r(n,e))},function(e){t||(t=!0,i(n,e))})}catch(o){if(t)return;t=!0,i(n,o)}}var c=setTimeout;t.prototype["catch"]=function(e){return this.then(null,e)},t.prototype.then=function(e,t){var r=new this.constructor(n);return o(this,new function(e,n,t){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof n?n:null,this.promise=t}(e,t,r)),r},t.prototype["finally"]=e,t.all=function(e){return new t(function(n,t){function o(e,f){try{if(f&&("object"==typeof f||"function"==typeof f)){var u=f.then;if("function"==typeof u)return void u.call(f,function(n){o(e,n)},t)}r[e]=f,0==--i&&n(r)}catch(c){t(c)}}if(!e||"undefined"==typeof e.length)throw new TypeError("Promise.all accepts an array");var r=Array.prototype.slice.call(e);if(0===r.length)return n([]);for(var i=r.length,f=0;r.length>f;f++)o(f,r[f])})},t.resolve=function(e){return e&&"object"==typeof e&&e.constructor===t?e:new t(function(n){n(e)})},t.reject=function(e){return new t(function(n,t){t(e)})},t.race=function(e){return new t(function(n,t){for(var o=0,r=e.length;r>o;o++)e[o].then(n,t)})},t._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){c(e,0)},t._unhandledRejectionFn=function(e){void 0!==console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)};var l=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw Error("unable to locate global object")}();"Promise"in l?l.Promise.prototype["finally"]||(l.Promise.prototype["finally"]=e):l.Promise=t});

 


(function(window){
	// 部分常亮定义
	window.backgroundColor = '#94243A';
	window.PAGE_ID_DETAIL = 'product_detail.html';  	//商品详情页 
	window.PAGE_ID_LIST = 'product_list.html';   		//商品列表页
	window.PAGE_ID_MATTER = 'matter.html';   			//物料
	window.PAGE_ID_ENERGIZ = 'energiz.html'; 			//赋能
	window.PAGE_ID_SEARCH  = 'search.html';  			//搜索
	window.PAGE_ID_CLASSIFY = 'classify.html';    		//分类
	window.PAGE_ID_LOGIN  = 'login.html';    			//登录
	window.PAGE_ID_GOODS_RECOMMEND = 'goods_recommend.html'  //
	window.PAGE_ID_EDIT  = 'myedit.html';
	window.PAGE_ID_BUYVIP = 'buyvip.html';
	window.PAGE_ID_RENEWVIP = 'renewVip.html';
	window.PAGE_ID_VIP_BEFORE = 'vipBefore.html';
	window.PAGE_ID_VIP_SUCCESS = 'vip_success.html';
	window.PAGE_ID_AMEND_PHONE = 'amend_phone.html';
	window.PAGE_ID_ERROR = 'networkError.html';
	window.PAGE_ID_404  = '404.html';
	
	
	window.PAGE_ID_MIAN = 'src/pages/mymian.html';
	window.PAGE_ID_HOME = 'src/pages/home.html';  
	window.PAGE_ID_MATTER = 'src/pages/matter.html';  
	window.PAGE_ID_ENERGIZ = 'src/pages/energiz.html';
	window.PAGE_ID_WITHDRAW = 'src/pages/withdraw.html';
	window.PAGE_ID_REEDIT  = 'src/pages/myedit.html';
	
	
	window.VERSION = '1.0.0';
	
	if(!String.prototype.trim){
		String.prototype.trim = function() {
		  return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		} 
	}
	
	window.gData = {};    //全局数据
	window.addEventListener("online", function(){
		window.gData.online = true; 
	}, false);


　　	window.addEventListener("offline", function(){
		window.gData.online = false; 
	}, false);
})(window)
 

/* 安卓复制文本*/
function copyToClip(text){
    var Context = plus.android.importClass("android.content.Context");
    var main = plus.android.runtimeMainActivity();
    var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
    plus.android.invoke(clip,"setText",text);
}

function copyText(text) {
	
	if(isAndroid()){
		copyToClip(text);
	}else if(isIos()){
		var UIPasteboard = plus.ios.importClass("UIPasteboard");
        var generalPasteboard = UIPasteboard.generalPasteboard();
        generalPasteboard.plusCallMethod({
            setValue:text,
            forPasteboardType: "public.utf8-plain-text"
        });
        generalPasteboard.plusCallMethod({
            valueForPasteboardType: "public.utf8-plain-text"
        });
	}
 
}


// 判断是否安卓环境下
function isAndroid() {
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/Android/i)== "android") {
		return true;
	}
	return false;
}

//判断是否ios环境下
function isIos() {
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/iPhone/i)== "iphone") {
		return true;
	}
	return false;
}

//打开外部页面
function openViewUrl(url){
	var sw = plus.nativeUI.showWaiting();
	var w = plus.webview.open(url,url, {
			errorPage: '404.html',
			bottom:'0px',
			statusbar:{  // 顶部电量栏 背景颜色
				background: window.backgroundColor 
			},
			backButtonAutoControl: 'close', 
			titleNView:{
				backgroundColor: window.backgroundColor,
				autoBackButton: true,
				titleColor: '#FFFFFF',
			},
			progress: window.backgroundColor,
		},'auto', 200,function(){
			sw.close();
			sw = null;
		});
//	w.show("auto",200,);
//	 ;
}
// 打开新页面窗口 创建webview方式打开 打开默认导航栏
/*  文档地址 http://dev.dcloud.net.cn/mui/window/#openwindow
 @parmas: url 		跳转的地址  	String
 		  id  		跳转id	   	String
 		  isShowStatus 是否使用顶部statusbar  默认不适用区域
  		  extras  	传递参数  		Object  
		  params    暂未
* */
function openView(url, id, isShowStatus ,extras, params) {
	var params = params ? params : {};
	var preload = params && params.preload ? params.preload : false; //是否预加载
	var extras = extras ? extras : {};
	var obj = {};
	obj = {url: url, id:id, extras: extras, params: params};
	var isL = false;
//	console.log(url);
//	console.log(id);
//	console.log(extras);
//	console.log(params);
	
 	//登录页面   或者 详情页
	if(url.indexOf('product_detail') != -1 || url.indexOf('login.html') != -1 || url.indexOf('product_no') != -1  || url.indexOf('tobe_member') != -1){
		obj.styles = {
			top: "0",
			bottom: 0,
		};
		obj.createNew = true;
	}else if(isShowStatus == undefined) {
		if(url.indexOf('login_page') != -1 || url.indexOf('register') != -1){
			obj.styles = {
				statusbar:{  // 顶部电量栏 背景颜色
					background:"#FFFFFF"
				}
			};
			isL = true;
		}else {
			obj.styles = {
				statusbar:{  // 顶部电量栏 背景颜色
					background:"#94243A"
				}
			};
		}
	} 
	obj.styles.popGesture = "close";
//	obj.styles.bounce = "horizontal";
	obj.styles.errorPage = PAGE_ID_ERROR;
	obj.show = {
		autoShow: true,
	}
	obj.waiting = {
		options: {
			background: 'rgba(255,255,255,.1)',
			modal: true,
			loading: {
				height: '28px',
				icon: '../../img/pageLoading.gif', //String类型,loading图标路径.自定义loading图标的路径,png格式,并且必须是本地资源地址;loading图要求宽是高的整数倍,显示等待框时按照图片的高横向截取每帧刷新.
                interval: 100 
			}, 
			back: 'close',
		}
	}

	if(typeof window.viewCtrl  == 'undefined'){
		window.viewCtrl = {};
	}
	if(mui.openWindow && window.plus){  //判断是否支持
		mui.openWindow(obj); 
		console.log('openView');
		if(isL){
			window.plus.navigator.setStatusBarStyle('dark');
		}else {
			window.plus.navigator.setStatusBarStyle('light');
		}
		 
	}else{
		location.href = url;
	}
}

// 打开网络错误页面
// params:  value 商品信息  index  列表序号  type 1 商品详情  2分享    clickType 点击商品的来源  1首页列表
function openErrorView(value, index, type, clickType){
	if(!navigator.onLine){   //如果网络不存在
		var params = params ? params : {};
		var preload = params && params.preload ? params.preload : false; //是否预加载
		var extras = extras ? extras : {};
		var obj = {};
//		var id = id || url || null;
//		obj = {url: url, id:id, extras: extras, params: params};
		var c = plus.webview.currentWebview();
		
		var errorData = {
			value: value  || null,
			index: index  || null,
			type: type  || null,
			clickType: clickType || null
		}
		plus.storage.setItem('errorData',JSON.stringify(errorData));
		if(c.id.indexOf(PAGE_ID_ERROR) != -1) return;
		var tmpUrl = PAGE_ID_ERROR;
		var w = plus.webview.open(tmpUrl , PAGE_ID_ERROR, {
				bottom: '0px',
				statusbar: { // 顶部电量栏 背景颜色
					background: window.backgroundColor
				},
				backButtonAutoControl: 'close',
				titleNView: {
					backgroundColor: window.backgroundColor,
					autoBackButton: true,
					titleColor: '#FFFFFF',
				}
			});
			w.show();
		return;
	}
}
 
/* 返回 页面 */
function backView(){
	if(mui.back && window.plus){
		var list = plus.webview.currentWebview().opener();
		console.log(list);
		list && mui.fire(list, 'show');
		mui.back();
		//窗口返回后设置 状态栏颜色
//		setStatuBarTextColor();
	}else {
		history.go(-1);
	}
}

// 关闭新页面
function closeView(){
	
}

//设置顶部栏背景
function setStatuBarBackColor(){
	window.plus && window.plus.setStatusBarBackground('#94243A');
}

//设置状态栏文本颜色  默认白色     参数传递true 则为黑色
function setStatuBarTextColor(mode){
	if(mode){
		window.plus && window.plus.navigator.setStatusBarStyle('dark');
	}else{
		window.plus && window.plus.navigator.setStatusBarStyle('light');
	}
	 
}
 

//获取url参数
 function getQueryVariable(variable){
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0;i<vars.length;i++) {
           var pair = vars[i].split("=");
           if(pair[0] == variable){return pair[1];}
   }
   return(false);
}
 
 //获取url参数
function getQueryParam(url, variable){
	if(!url) return false;
    var query = url.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
           var pair = vars[i].split("=");
           if(pair[0] == variable){return pair[1];}
    }
    return(false);
}
 
//随机生成 销量
function rodamSales(obj){
	obj.forEach(function(vlaue,index){
//		vlaue.volume = Math.floor(Math.random()*100000+1);
		if(vlaue.volume > 10000) {
			vlaue.volume  = vlaue.volume  / 10000 + '万';
		}
	});
}

// 保存临时商品信息 用于跳转 列表页 和详情页
function setTmpProducts(obj){
	localStorage.setItem('tmpProducts',JSON.stringify(obj));
}
// 读取临时商品信息
function getTmpProducts(){
	var item = localStorage.getItem('tmpProducts');
	if(item != '' && item != null){
		return JSON.parse(item) || null;
	}
	return null;
}

// 首页tab 缓存数据
function tabSetItem(key,value){
	mui.plusReady(function(){
		plus.storage.setItem(key,  JSON.stringify(value));
	})
	 
}
//首页tab 读取缓存数据
function tabGetItem(key){
	var str = plus.storage.getItem(key);
	return  str ? JSON.parse(str) : str; 
}

//检测版本是否有更新	
function checkVersion(desVersion, curVersion){
	var curVersion = curVersion || window.VERSION;
	var ary = curVersion.split('.');
	var ary1 = desVersion.split('.');
	if(ary.length == ary1.length){
		for(var i=0;i<ary.length;i++){
			if(ary[i]<ary1[i]){
				return true;
			}else if(ary[i] != ary1[i]){
				break;
			}
		}
	}else{
		var version1pre = parseFloat(curVersion);
	    var version2pre = parseFloat(desVersion);
	    var version1next =  ver1.replace(version1pre + ".","");
	    var version2next =  ver2.replace(version2pre + ".","");
	    if(version1pre > version2pre){
	        return true;
	    }else if(version1pre < version2pre){
	        return false;
	    }else{
	        if(version1next >= version2next){
	            return true;
	        }else{
	            return false;
	        }
	    }
	}
}

// 删除临时商品信息
function removeTmpProducts(){
	localStorage.removeItem('tmpProducts');
}


// 保存临时商品分享链接信息
function setTmpUrlData(obj){
	localStorage.setItem('tmpUrlData',JSON.stringify(obj));
}
// 读取临时商品分享链接信息
function getTmpUrlData(){
	var item = localStorage.getItem('tmpUrlData');
	if(item != ''){
		return JSON.parse(item) || null;
	}
	return null;
}
// 删除临时商品分享链接信息
function removeTmpUrlData(){
	localStorage.removeItem('tmpUrlData');
}

//读取人物信息 成功返回人物信息 失败返回 Null
function getUserData(){
	var obj = localStorage.getItem('user');
	console.log(obj);
	return obj && obj != null ? JSON.parse(obj) : null;
}
function setUserData(obj){
	localStorage.setItem('user', JSON.stringify(obj));
}


//打开 商品列表页面
function openProductList(value){
//	console.log('value' + value);
	setTmpTag(value);
	if(window.plus){
		 
		var id = plus.webview.getWebviewById('product_list');
		if(!id){
			var is = plus.navigator.isImmersedStatusbar();
			var style = {	
				bottom: 0,
				statusbar:{  // 顶部电量栏 背景颜色
					background:"#94243A"
				}
			};
			if(!is) {
				style.top = plus.navigator.getStatusbarHeight();
			}
			 
			id = plus.webview.create('product_list.html?tag=1',
				'product_list',
				style
			);
			
		}else {
			mui.fire(id,'reload',{tag: value});
		}
		plus.webview.show(id);
	}else {
		setTmpTag(value);
		location.href = 'product_list.html?tag=1';
	}
}
//重新加载用户信息reloadUser
function reloadUser(){
 	if(window.plus){
		var id = plus.webview.getWebviewById(window.PAGE_ID_MIAN);
		console.log("重载用户信息",JSON.stringify(id));
		id && mui.fire(id,'reload',{});  //重新加载数据
    }
}
//重新加载提现页面获取支付宝状态
function reUserZfb(){
	if(window.plus){
	 var id = plus.webview.getWebviewById(window.PAGE_ID_WITHDRAW);
	 console.log(id);
	 id && mui.fire(id,'rezfb',{});  //重新加载数据
	 }
}
//删除 人物信息
function removeUserData(){
	localStorage.removeItem('user');
	localStorage.removeItem('token');
	localStorage.removeItem('phone');
}

//窗口交互数据
/*  
 @param  id  		目标窗口的id
 @param  event		事件名   默认show事件
 @param  parameter  传递的参数 默认 空
*/
function sendMsg(id, event, parameter){
	if(window.plus){
		var id = plus.webview.getWebviewById(id);
		id && mui.fire(id, event || 'show', parameter || {});  //重新加载数据
	} 
}


//设置 物料传递给分享页的数据
function setMatterData(obj){
	if(window.plus){
		plus.storage.setItem('matterShare', JSON.stringify(obj));
		localStorage.setItem('matterShare',JSON.stringify(obj));
	}else{
		localStorage.setItem('matterShare',JSON.stringify(obj));
	}
}

//获取 物料传递给分享页的数据
function getMatterData(){
	var obj = null;
	if(window.plus){
		obj = plus.storage.getItem('matterShare');
		obj = obj ? obj : localStorage.getItem('matterShare'); 
	}else{
		obj = localStorage.getItem('matterShare');
	}
	return obj ? JSON.parse(obj) : null;
}
//本地保存 数据  key --> value 
function setStorageItem(key,value){
	if(window.plus){
		plus.storage.setItem(key, value);
		localStorage.setItem(key,value);
//		console.log('保存key');
	}else{
		localStorage.setItem(key,value);
	}
}
//本地读取数据 
function getStorageItem(key){
	if(window.plus){
		 
		return plus.storage.getItem(key);
	}else{
		return localStorage.getItem(key);
	}
}

function removeStorageItem(key){
	if(window.plus){
		plus.storage.removeItem(key);
		localStorage.removeItem(key);
	}else{
		localStorage.removeItem(key);
	}
}
//读取人物信息 成功返回人物信息 失败返回 Null
function getUserData(){
	var obj = localStorage.getItem('user');
	return obj ? JSON.parse(obj) : null;
}
function setUserData(obj){
	localStorage.setItem('user', JSON.stringify(obj));
}


//删除 人物信息
function removeUserData(){
	localStorage.removeItem('user');
	localStorage.removeItem('token');
}
//登录成功通知 页面数据刷新
function reloadUserData(){
	if(window.plus){
		//赋能
		var id = plus.webview.getWebviewById(window.PAGE_ID_ENERGIZ);
		id && mui.fire(id, 'reload',{});
		//个人用户
		var id = plus.webview.getWebviewById(window.PAGE_ID_MIAN);
		id && mui.fire(id, 'reload',{});
	}
}

//用token来判断用户是否登录
function getLogin(){
	return localStorage.getItem('token') || localStorage.getItem('user') || null;
}

// 跳转商品详情信息  
function goDetail(product){
	var id = product.good ? product.good.id : product.id;
	
	setTmpProducts(product);   //保存临时商品信息
	openView('product_detail.html?' + "id="+ id, window.PAGE_ID_DETAIL);
	return;
	
//				console.log('setTmpProducts');

//	$http.getTestProduct(product.numIid,function(data){
//		 
//	},function(xml,type,errorThrown){
//		var aaa = xml.responseText;
//		if(aaa != null){
//			if(aaa.indexOf("results") != -1){
//				setTmpProducts(product);   //保存临时商品信息
//				openView('product_detail.html?' + "id="+ id, window.PAGE_ID_DETAIL);
//			}else{
//				setTmpProducts(product);
//				openView('product_no.html?' + "id=" + id, 'product_no.html');
//			}
//		}
//	});
}

// 跳转VIP购买页面
function goBuyVip(){
	var user = getUserData();
	if(user && user.id && user.memberType >= 2){
		openView('renewVip.html', PAGE_ID_RENEWVIP);				
	}else {
		openView('buyvip.html', PAGE_ID_BUYVIP);
	}
	 
}

function  setTmpTag(value){
	localStorage.setItem('type-tag', value);
}
function getTmpTag(value){
	return localStorage.getItem('type-tag') || '';
}

// 是否第一次启动 返回true则表示 第一次启动
function isFirstStart(tabs){
	var version = localStorage.getItem('version');
	if(version != window.VERSION){  //判断版本是否一致
		localStorage.removeItem('firstStart');
		localStorage.setItem('version', window.VERSION);
		return true;
	}
//	console.log('isss');
	var data = localStorage.getItem('firstStart');
	if(!data){
		return true;
	}
	return false;
}

//设置保存 第一次启动tab的提示  保存内容 [,tabs] 
function setFirstStart(tabs){
//	var data = localStorage.getItem('firstStart') || '';
//	data = data + ',' + tabs;	
	localStorage.setItem('firstStart', window.VERSION);
}

// 判断输入是否是标签
function isEmojiCharacter(substring) {
    for ( var i = 0; i < substring.length; i++) {
        var hs = substring.charCodeAt(i);
        if (0xd800 <= hs && hs <= 0xdbff) {
            if (substring.length > 1) {
                var ls = substring.charCodeAt(i + 1);
                var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
                if (0x1d000 <= uc && uc <= 0x1f77f) {
                    return true;
                }
            }
        } else if (substring.length > 1) {
            var ls = substring.charCodeAt(i + 1);
            if (ls == 0x20e3) {
                return true;
            }
        } else {
            if (0x2100 <= hs && hs <= 0x27ff) {
                return true;
            } else if (0x2B05 <= hs && hs <= 0x2b07) {
                return true;
            } else if (0x2934 <= hs && hs <= 0x2935) {
                return true;
            } else if (0x3297 <= hs && hs <= 0x3299) {
                return true;
            } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
                    || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
                    || hs == 0x2b50) {
                return true;
            }
        }
    }
}
//启动 loading
(function(){
	 
	window.UILoading = {ws:null};
//		plus.nativeUI.showWaiting('加载中...');
	UILoading.start = function(){ 
		UILoading.ws =  plus.nativeUI.showWaiting('',{
			background: 'rgba(255,255,255,.1)',
			loading: {
				height: '28px',
				icon: '../../img/pageLoading.gif', //String类型,loading图标路径.自定义loading图标的路径,png格式,并且必须是本地资源地址;loading图要求宽是高的整数倍,显示等待框时按照图片的高横向截取每帧刷新.
                interval: 100 
			}
		});
//			UILoading.ws =  plus.nativeUI.showWaiting();
	}
	UILoading.end = function(){
		UILoading.ws && UILoading.ws.close();
	}
})();


// 创建http 全局对象  包含post get方法
(function (){
	var host1 = 'http://192.168.2.150:8080/' //103.235.224.197:8085  47.99.213.146:8085
	var host = 'http://192.168.2.150:8080/'  //192.168.2.150:8080 192.168.2.150:8080  http://java.money008.com/
	var host2 = 'http://java.money008.com/'
	var host4 = 'http://192.168.2.150:8080/'    // java 本地测试专用
	var homeSilde = 'matter/navigation?matterId=1';  
	var homeNav = 'matter/navigation?matterId=2';
	var hostPHP = 'http://jhm.money008.com/api/v1/';
	
	var news = 'matter/navigation?matterId=3';   //新品推荐
	var hotList = 'matter/navigation?matterId=4';   //商品类型接口
	var host3 = 'http://jhm.money008.com/api/v1/'
	var porducts = 'good/product';    	//首页列表 推荐
	var search = 'good/TbSearch';    	//搜索 包括热词 参数tag
	var detail = 'subject/product';   	//列表 参数id
	var cate = 'cate/stair';        	//分类接口
	var cateGood = 'cate/good';	    	//分类下的商品列表
	var wordSearch = 'word/search';  	//热门搜索
	var shareUrl = 'domain/geturl';		//获取分享商品的链接
 
	//var inviteFans = 'template/imageList';  //邀请粉丝
	var productPic = 'http://h5api.m.taobao.com/h5/mtop.taobao.detail.getdesc/6.0/?data={%22{%22{%22id%22:%22577647291655%22}&callback=jQuery214038283929090346613_1544551239808&_=1544551239809';
	
	// 找麦子。找麦子选品师 | 好物推荐 + mid
	var findRoleList = 'matuser/findRoleList';
	// 找麦子。找麦子盆友圈
	var materialFind = 'material/find';
	// 关注的商品
	var findRoleGood = 'matuser/findRoleGood';
	// 我的账单
	var myBill = 'my_bill'
	// 一级市场
	var myFansFirst = 'my_fans_first';
	// 第一市场-粉丝明细
	var myFansFirstDetail = 'my_fans_first_detail';
	// 二级市场
	var myFansSecond = 'my_fans_second';
	// 第二市场-粉丝明细
	var myFansSecondDetail = 'my_fans_second_detail';

	var timeout = 10000; //超时时间设置为10秒；
	function post(url, data, params) {
 
			var token = localStorage.getItem('token') || '';
			var showWaiting = params && params.showWaiting ? true : false;
			var wt = null;
			if(showWaiting && window.plus){  //是否显示加载状态
				wt = plus.nativeUI.showWaiting('',{
					padlock: true,
					back: 'close',
				});
			}
			if(params && params.encrypt){
				data = encrypt(JSON.stringify(data));
				data = {data: data};
			}
			mui.ajax(url,{
				type:'post',//HTTP请求类型
				data: data,
				timeout: timeout, 
				headers:{'Content-Type':'application/x-www-form-urlencoded', 'token': token || ''},
				dataType:'json',//服务器返回json格式数据
				crossDomain: true,
				cache: false,
				success: function(data) {
					wt && plus.nativeUI.closeWaiting();
					if(!params) return;
					if(params.encrypt){    //判断是否需要解密
						 
						if(data && data.data){
							data = decrypt(data.data);
							try{
								data = JSON.parse(data);
							}catch (e){
								params.success && params.success(data);
								return ; 
							}
						}else{
							params.success && params.success(data);
							return ;
						}
					}
					if(params && params.isData){
						params.success && params.success(data);
						return ;
					}
					if (data.code == 200){
						if(data.data){
							params.success && params.success(data.data);
						}else{
							params.success && params.success(data);
						}
					}else{
						params.success && params.success(data);
					}
				},
				error: function(xhr,type,errorThrown){
					wt && plus.nativeUI.closeWaiting();
					params.error && params.error(xhr,type,errorThrown);
				}
			});
	}
	 
	/*
	 params: 参数 success 		成功回调
	 			error   		失败回调
	 			isData     		是否过滤data的code msg信息 默认过滤 直接返回data数据
	 * */
	function get(url, params) {
	 
//		params.isParseData = params.isParseData 
//		console.log(token);
//		(function(url, params){
			var token = localStorage.getItem('token') || '';
			var showWaiting = params.showWaiting ? true : false;
			var wt = null;
			if(showWaiting && window.plus){  //是否显示加载状态
				wt = plus.nativeUI.showWaiting('',{
					padlock: true,
					back: 'close',
				});
			}
			var data = params.data || '';
			var cache = params.cache || false;
			mui.ajax(url,{
				type:'get',//HTTP请求类型
				timeout: timeout, 
				data: data,
				headers:{'Content-Type':'application/json', 'token': token || ''},
				dataType:'json',//服务器返回json格式数据
				crossDomain: true,
				cache: cache,
				success: function(data,is, xml) {
	//				console.log(data)
					wt && plus.nativeUI.closeWaiting();
					if(!params) return;
					  
					if(params.isData){
						params.success && params.success(data);
						return ;
					}
					if(data.code == 200){
						if(data.data){
							params.success && params.success(data.data,0);
						}else{
							params.success && params.success(data,0);
						}
					}else{
						params.success && params.success(data,0);
					}
				},
				error: function(xhr,type,errorThrown){
					wt && plus.nativeUI.closeWaiting();
					params.error && params.error(xhr,type,errorThrown);
				}
			});
//		})(url, params);
	}
	//获取商品是否还存在
	function getTestProduct(id,success,error){
		var url= 'https://jhm.money008.com/api/add_info?nums=' + id;
		get(url,{showWaiting: true,success:success,error:error});
	}
	
	//获取用户信息  勿动
	function getUserInfo(success,error){
		var data = getUserData();
		if(data && data.id){
			// var url= host + 'user/getUser?id=' + data.id;
			// get(url,{success:success,error:error});
			var url= host4 + 'user/getUser';
			post(url,{id:data.id},{success:success,error:error,encrypt:true,showWaiting: 'showWaiting'});
		}else {
			error && error();
		}
	}

	//加油吧下载
	function downAmt(params,success,error){
		console.log(params.matId)
		console.log(params.downAmt)
		var url = host2 + 'material/shareDown'
		if(params.downAmt >= 0){
			url += '?downAmt='+params.downAmt
		}
		if(params.matId){
			url += '&matId=' +params.matId
		}
		get(url,{success:success,error:error})
	}

	//加油吧分享
	function shareAmt(params,success,error){
		console.log(params)
		var url = host2 + 'material/shareDown'
		if(params.shareAmt>=0){
			url += '?shareAmt='+params.shareAmt
		}
		if(params.matId){
			url += '&matId=' +params.matId
		}
		get(url,{success:success,error:error})
	}
	



	//展示标签
	function myTags(success,error){
		var url= hostPHP + 'my_tags'
		get(url,{success:success,error:error});
	}
	//提交专属标签
	function myTagsStore(params,success,error){
		console.log(params)
		var url = hostPHP + 'my_tags_store' + '?gender=' + params.gender
		if(params.identity_id){
			console.log(params.identity_id)
			url += '&identity_id=' + params.identity_id
		}
		if(params.hobby_id){
			console.log(params.hobby_id)
			url += '&hobby_id=' + params.hobby_id
		}
		if(params.customHobby){
			console.log(params.customHobby)
			url += '&hobby=' + params.customHobby
		}
		get(url,{success:success,error:error})
	}

	//赋能
	function energize(success,error){
		var url = hostPHP + 'report'
		// var url = "http://192.168.2.161:300/user/getCode?username=18627722435"
		get(url,{success:success,error:error});
	}
	//当前用户的30日收益
	function monthIncome(success,error){
		var url = hostPHP + 'month_income'
		get(url,{success:success,error:error});
	}

	//30日 top10 收入类型
	function incomeType(success,error){
		var url = hostPHP + 'income_type'
		get(url,{success:success,error:error});
	}

	//30日 top10 收入类型明细
	function incomeTypeDetail(success,error){
		var url = hostPHP + 'income_type_detail'
		get(url,{success:success,error:error});
	}

	//30日 top10 销量类型
	function saleType(success,error){
		var url = hostPHP + 'sale_type'
		get(url,{success:success,error:error});
	}

	//30日 top10 销量类型 明细
	function saleTypeDetail(success,error){
		var url = hostPHP + 'sale_type_detail'
		get(url,{success:success,error:error});
	}

	//30日销量分析
	function monthSale(success,error){
		var url = hostPHP + 'month_sale'
		get(url,{success:success,error:error});
	}

	// 获取首页 轮播图
	function getHomeSlide(success,error){
		get(host+homeSilde,{success:success,error:error});
	}
	//获取 首页 两行5列 导航频道
	function getHomeNav(success,error){
		get(host+homeNav,{success:success,error:error});
	}
	// 获取 商品类型接口 
	function getProductTypes(success,error){
		get(host+productType,{success:success,error:error});
	}
	//获取 首页 今日热销接口
	function getHotList(success,error){
		get(host+hotList,{success:success,error:error});
	}
	function getNews(success,error){
		get(host+news,{success:success,error:error});
	}
	//首页下面  猜你喜欢 推荐商品
	function getLikeProducts(page, success,error){   
		var url = host + 'subject/like' + '?pageSize=10&pageNum=' + page ;
		var userData = getUserData();
		if(userData && userData.adzoneIdBuy){
			url += '&adzoneId=' + userData.adzoneIdBuy;
		}
		get(url,{success:success,error:error});
	}
	//获取商品列表
	function getProducts(params, success,error){
		var url = host + porducts + '?pageSize=10&pageNum=';
		if(typeof params == 'object'){
			url += params.pageSize;
		}else{
			url += params; 
		}
	 
//		console.log(url);
		get(url,{success:success,error:error});
	}
	function getSearchWord(success,error){
		get(host + "word/recommend",{success:success,error:error});
	}
	//从tag 搜索跳转
	function getSearch(data, success,error){
		var url = host+search;
		post(url, data, {success:success,error:error});
	}
	
	//从首页
	function getDetail(params, success,error){
		var url = host+detail+ '?id='+params.id+"&pageNum="+(params.pageNum || 1);
		if(params.volume){
			url += '&volume=' + params.volume; // 销量从高到低
		}
		if(params.zkPrice){  // 1 价格从高到低    2 价格从低到高
			url += '&zkPrice=' + params.zkPrice; 
		}
		if(params.couponPrice){  // 1  优惠卷从高到低    2 优惠卷从低到高
			url += '&couponPrice=' + params.couponPrice; 
		}
		if(params.comPrice){  // 1  佣金由高到低
			url += '&comPrice=' + params.comPrice || 1; 
		}
		var user = getUserData();
		if(user && user.id){
			url += '&userId=' + user.id || ''; 
		}
		get(url,{showWaiting: params.showWaiting || false, success:success,error:error});
	}
	
	// 通过numId 获取商品信息
	function getOutsitegood(numId, success,error){
		get(host+"good/outsitegood?numId="+numId,{showWaiting: true,success:success,error:error});
	}
	// 通过id 获取端内商品信息
	function getGoodId(id, success,error){
		get(host+"good/getgoodId?id="+id,{showWaiting: true,success:success,error:error});
	}
	//获取分类的 商品列表
	function getCateGood(params, success,error){
		var url = host+cateGood+ '?cateId='+params.cateId + '&pageNum='+ (params.pageNum || 1);
		if(params.volume){
			url += '&volume=' + params.volume; // 销量从高到低
		}
		if(params.zkPrice){  // 1 价格从高到低    2 价格从低到高
			url += '&zkPrice=' + params.zkPrice; 
		}
		if(params.couponPrice){  // 1  优惠卷从高到低    2 优惠卷从低到高
			url += '&couponPrice=' + params.couponPrice; 
		}
		if(params.comPrice){  // 1  优惠卷从高到低    2 优惠卷从低到高
			url += '&comPrice=' + params.comPrice; 
		}
		get(url,{success:success,error:error});
	}
	
	//获取端内商品详情页面 的推荐商品
	function getTags(id,success,error){
		get(host+'good/tags?id='+id,{cache:true, success:success,error:error});
	}
	//获取淘宝 商品详情页面 的推荐商品
	function getTbCates(categoryId,success,error){
		get(host+'good/tbcates?cat='+categoryId,{cache:true, success:success,error:error});
	}
	//获取搜索页面  热门搜索接口
	function getWordSearch(success,error){
		get(host+wordSearch ,{success:success,error:error});
	}
	//获取分享的链接
	function getShareUrl(params, success,error){
		var url = host + 'domain/tklurl';
		
		post(url, params, {success:success,error:error, showWaiting: true, encrypt: true});
	}
	function inviteFans(success,error){
		get(host + 'template/imageList', {success:success,error:error});
	}
	//获取 淘口令 Url
	function getTaoWord(params, success,error){
		var url = host + 'good/getnumIid?' + 'numId='+ params.numId;
		url += '&userId=' + params.userId;
		url += '&type=' + params.type || 1;  //1是自购 2是分享
		get(url ,{success:success,error:error});
	}
	//分享购买时候接口 发送商品信息
	function saveGood(data, success,error){
		post(host+"good/savegood",{tbgoodInfo:JSON.stringify(data)},{success:success,error:error});
	}
	//注册页面获取验证码
	function getCode(params,success,error){
		// var url = host2 + 'user/getCode?username=' + params.username;
		var url = host4 + 'user/getCode';
		post(url,params,{success:success,error:error,encrypt:true,showWaiting: 'showWaiting'});
	}
	
	//注册
	function regist(params,success,error){
		//		var url = host2 + 'user/regist?username=' +  params.username.trim();
		//		if(params.invitCode){
		//			url += '&invitCode=' +params.invitCode.trim();
		//		}
		//		if(params.smsCode){
		//			url += '&smsCode=' + params.smsCode.trim();
		//		}
		//		console.log(url);
				var url = host2 + 'user/regist';
				 post(url,{username: params.username.trim(),
						 invitCode: params.invitCode.trim(),
						 smsCode: params.smsCode.trim()},
					 {showWaiting: true, success:success,error:error, isData: true});
			}
	
	//登录页面获取验证码
	function getLoginCode(params,success,error){
		// var url = host2 + 'user/getLoginCode?username=' + params.username;
		var url = host4 + 'user/getLoginCode';
		post(url,params,{success:success,error:error,encrypt:true,showWaiting: 'showWaiting'});
	}

	//登录
	function login(params,success,error){
		var url = host2 + 'user/login?username=' + params.username +'&smsCode=' +params.smsCode;
		// if(params.smsCode){
		// 	url += '&smsCode=' +params.smsCode;
		// }
		get(url,{success:success,error:error});
	}
	//登录post
	function post_login(params,success,error){
		// var url = host2 + 'user/login?username=' + params.username +'&smsCode=' +params.smsCode;
		var url = host4 + 'user/login';
		// if(params.smsCode){
		// 	url += '&smsCode=' +params.smsCode;
		// }
		post(url,params,{success:success,error:error,encrypt:true,showWaiting: 'showWaiting'});
	}
	//获取 商品详情图文
	function getPorductPic(id,success,error){
		//http://h5api.m.taobao.com/h5/mtop.taobao.detail.getdesc/6.0/?data={%22id%22:%22544442940933%22}&callback=jQuery214038283929090346613_1544551239808&_=1544551239809
		var url = 'http://h5api.m.taobao.com/h5/mtop.taobao.detail.getdesc/6.0/?data={%22id%22:%22'; 
		url = url + id + '%22}&callback=jQuery214038283929090346613_1544551239808&_=1544551239809';
	}
	//获取 一级 二级分类
	function getCate(params,success, error){
		var url = host+cate+ '?parentId=' + params;
		get(url,{success:success,error:error});
	}
	
 

	// 获取选品师
	function getFindRoleList(params, success, error) {
		var url = host + findRoleList + '?pageNum=' + params;
		get(url, {success: success, error: error});
	}

	// 找麦子。找麦子盆友圈
	function getMaterialFind(params, num, success, error) {
		var url = host + materialFind + '?pageNum=' + params + '&position=' + num;
		get(url, {success: success, error: error});
	}

	// 好物推荐
	function getFindRoleListGoods(params, id, success, error) {
		var url = host + materialFind + '?pageNum=' + params + '&mId=' + id;
		get(url, {success: success, error: error});
	}

	// 好物推荐/下载量/分享量
	function getMaterialFindDown(id, success, error) {
		var url = host + materialFind + '?mId=' + id;
		get(url, {success: success, error: error});
	}

	// 好物推荐人物
	function getFindOneRole(id, success, error) {
		var url = host + 'matuser/findOneRole?mId=' + id;
		get(url, {success: success, error: error});
	}

	// 关注商品
	function getFindRoleGood(params, tag, cats, success, error) {
		var url = host + findRoleGood + '?pageNum=' + params + '&tag='+ tag + '&cats=' + cats;
		get(url, {success: success, error: error});
	}

	// 我的账单
	function getMyBill(params, success, error) {
		var url = host3 + myBill;
		get(url, {success: success, error: error})
	}

	// 第一市场
	function getMyFansFirst(params, success, error) {
		var url = host3 + myFansFirst + '?page=' + params;
		get(url, {success: success, error: error})
	}
	// 第一市场-粉丝详细
	function getMyFansFirstDetail(params, success, error) {
		var url = host3 + myFansFirstDetail + params;
		get(url, {success: success, error: error})
	}
	// 第二市场
	function getMyFansSecond(params, success, error) {
		var url = host3 + myFansSecond + params;
		get(url, {success: success, error: error})
	}
	// 第二市场-粉丝明细
	function getMyFansSecondDetail(params, success, error) {
		var url = host3 + myFansSecondDetail + params;
		get(url, {success: success, error: error})
	}
	// 我的收益商品
	function getMyProfitGoods(params, success, error) {
		var url = host + 'good/product?pageNum=' + params;
		get(url, {success: success, error: error})
	}
	//退出登录
	function logout(params,success,error){
		// var url = host2 + 'user/logout?username=' + params;
		var url = host4 + 'user/logout';
		post(url,params,{success:success,error:error,encrypt:true,showWaiting: 'showWaiting'});
	}
	//获取用户信息
	function getuser(success,error){
		var url = host3 + 'me'
		get(url,{success:success,error:error})
	}
	//修改昵称
	function alterName(data,success,error){
		var url = host3 + 'my_nickname_store'
		post(url,data,{success:success,error:error})
	}
	//获取昵称
	function getname(success,error){
		var url = host3 + 'my_nickname'
		get(url,{success:success,error:error})
	}
	//获取邀请码
	function getInvite(success,error){
		var url = host3 + 'index'
		get(url,{success:success,error:error})
	}
	//换绑手机号获取手机号码
	function editPhone(success,error){
		var url = host3 + 'editPhone'
		get(url,{success:success,error:error})
	}
	//换绑手机号 发送换绑申请
	function editPhone_store(data,success,error){
		var url = host3 + 'editPhone_store'
		post(url,data,{success:success,error:error, showWaiting: true})
	}
	//换绑手机号 提交新手机号
	function newPhone_store(data,success,error){
		var url = host3 + 'newPhone_store'
		post(url,data,{success:success,error:error, showWaiting: true})
	}
	//绑定支付宝
	function bind_alipay(data,success,error){
		var url = host3 + 'bind_alipay'
		post(url,data,{success:success,error:error})
	}
	
	//编辑支付宝
	function edit_alipay(success,error){
		var url = host3 + 'edit_alipay'
		get(url,{success:success,error:error})
	}
	//绑定微信 解绑微信 type: 1 绑定 0 解绑
	function wechat(params,success,error){
		// var url = host2 + 'wechat/insertChat';
		var url = host4 + 'wechat/insertChat';
		post(url,params,{success:success,error:error,encrypt:true,showWaiting: 'showWaiting'});
	}
	//展示用户余额
	function get_balance(params,success,error){
		// var url = host2 + 'balance/getInfo?userId=' + params;
		var url = host4 + 'balance/getInfo';
		// get(url,{success:success,error:error})
		post(url,params,{success:success,error:error,encrypt:true,showWaiting: 'showWaiting'});
	}
	//申请提现
	function withdraw(params,success,error){
		// var url = host2 + 'with/deposit';
		var url = host4 + 'with/deposit';
		post(url,params,{success:success,error:error,encrypt:true,showWaiting: 'showWaiting'});
	}
	//官方公告
	function communique(params,success,error){
		var url = host2 + 'comm/getInfo?pageNum=' + params;
		get(url,{success:success,error:error});
	}
	//意见反馈
	function feedback(params,success,error){
		var url = host2 + 'opinion/save';
		post(url,params,{success:success,error:error});
	}
	//获取个人中心云端配置
	function get_userjson(success,error){
		var url = 'https://www.jhaomai.com/static/js/guide-config.json';
		get(url,{success:success,error:error})
	}
	//获取vip价格
	function get_price(params,success,error){
		var url = 'http://tb-admin.money008.com/api/alipay/vipPrice';
		post(url,params,{success:success,error:error});
	}
	//微信登录
	function we_login(params,success,error){
		// var url = host2 + 'user/wechatlogin';
		var url = host4 + 'user/wechatlogin';
		post(url,params,{success:success,error:error,encrypt:true,showWaiting: 'showWaiting'});
	}
	//微信注册 post 注册
	function we_regist(params,success,error){
		var url = host4 + 'user/regist';
		// var url = host2 + 'user/regist';
		post(url,params,{success:success,error:error,encrypt:true,showWaiting: 'showWaiting'});
	}

	window.$http = {
		post: post,
		get: get,
		HOST: host,
		getTestProduct: getTestProduct,
		getUserInfo: getUserInfo,
		getHomeSlide: getHomeSlide,
		getHomeNav: getHomeNav,
		getProductTypes: getProductTypes,
		getHotList: getHotList,
		getNews: getNews,
		getProducts: getProducts,
		getCate:getCate,
		getCateGood:getCateGood,
		getSearch: getSearch,
		getDetail: getDetail,
		getPorductPic: getPorductPic,
		getWordSearch:getWordSearch,
		getShareUrl: getShareUrl,
		getTaoWord: getTaoWord,
		getSearchWord: getSearchWord,
		getTbCates: getTbCates,
		getTags: getTags,
		getLikeProducts: getLikeProducts,
		inviteFans: inviteFans,
		getOutsitegood: getOutsitegood,
		getGoodId: getGoodId,
		saveGood: saveGood,
		
		getMaterialFind: getMaterialFind,
		getFindRoleList: getFindRoleList,
		getFindRoleListGoods: getFindRoleListGoods,
		getMaterialFindDown: getMaterialFindDown,
		getFindRoleGood: getFindRoleGood,
		getFindOneRole: getFindOneRole,
		getMyProfitGoods: getMyProfitGoods,
		regist:regist,
		getCode:getCode,
		login:login,

		logout:logout,
		getuser:getuser,
		getname:getname,
		alterName:alterName,
		editPhone:editPhone,
		editPhone_store:editPhone_store,
		newPhone_store:newPhone_store,
		getInvite:getInvite,
		bind_alipay:bind_alipay,
		edit_alipay:edit_alipay,
		get_balance:get_balance,
		withdraw:withdraw,
		communique:communique,
		feedback:feedback,
		get_userjson:get_userjson,
		get_price:get_price,
		we_login:we_login,
		we_regist:we_regist,
		post_login:post_login,
		
		wechat:wechat,
		energize:energize,
		monthIncome:monthIncome,
		incomeType:incomeType,
		incomeTypeDetail:incomeTypeDetail,
		saleType:saleType,
		saleTypeDetail:saleTypeDetail,
		
		getMyBill: getMyBill,
		getMyFansFirst: getMyFansFirst,
		getMyFansFirstDetail: getMyFansFirstDetail,
		getMyFansSecond: getMyFansSecond,
		getMyFansSecondDetail: getMyFansSecondDetail,
		getLoginCode:getLoginCode,
		monthSale:monthSale,

		myTagsStore:myTagsStore,
		myTags:myTags,

		downAmt: downAmt,
		shareAmt: shareAmt

	};
})(window)



