
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/tabbar/tabbar-2/tabbar-2","pages/register/register","pages/qianxi/qianxi","pages/ucenter/about_us","pages/rumor/rumor","pages/community/community","pages/community/map"],"window":{"navigationBarBackgroundColor":"#39b54a","navigationBarTitleText":"Color UI","navigationStyle":"custom","navigationBarTextStyle":"white"},"tabBar":{"color":"#8a8a8a","selectedColor":"#66ccff","list":[{"pagePath":"pages/index/index","selectedIconPath":"static/tabBar/indexS.png","iconPath":"static/tabBar/index.png","text":"首页"},{"pagePath":"pages/register/register","selectedIconPath":"static/tabBar/tubiaoS.png","iconPath":"static/tabBar/tubiao.png","text":"登记"},{"pagePath":"pages/qianxi/qianxi","selectedIconPath":"static/tabBar/pluginS.png","iconPath":"static/tabBar/plugin.png","text":"迁徙"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"wx-校园疫情管理系统","compilerVersion":"3.2.16","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"全国疫情实时大数据报告"}},{"path":"/pages/tabbar/tabbar-2/tabbar-2","meta":{},"window":{"navigationBarTitleText":"全国疫情小区分布情况"}},{"path":"/pages/register/register","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"每日健康统计"}},{"path":"/pages/qianxi/qianxi","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"全国人口大数据迁徙"}},{"path":"/pages/ucenter/about_us","meta":{},"window":{"navigationBarTitleText":"关于我们"}},{"path":"/pages/rumor/rumor","meta":{},"window":{"navigationBarTitleText":"谣言止步"}},{"path":"/pages/community/community","meta":{},"window":{"navigationBarTitleText":"疫情社区"}},{"path":"/pages/community/map","meta":{},"window":{"navigationBarTitleText":"社区地图"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});