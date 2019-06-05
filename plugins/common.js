import Vue from 'vue'

let bus = new Vue();
var common= {
    install(Vue){
        Vue.prototype.common = {
            //深拷贝 切断数据双向绑定
            deepcopy:function(source){
                if (!source) {
                    return source;
                }
                let sourceCopy = source instanceof Array ? [] : {};
                for (let item in source) {
                    sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item];
                }
                return sourceCopy;
            },
            //设置cookie
            setCookie:function(name, value, day){
                if (day !== 0) { 
                    //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
                    var curDate = new Date();
                    var curTamp = curDate.getTime();
                    var curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1;
                    var passedTamp = curTamp - curWeeHours;
                    var leftTamp = 24 * 60 * 60 * 1000 - passedTamp;
                    var leftTime = new Date();
                    leftTime.setTime(leftTamp + curTamp);
                    document.cookie = name + "=" + escape(value) + ";expires=" + leftTime.toGMTString()+";path=/";
                } else {
                    document.cookie = name + "=" + escape(value)+";path=/";
                }
            },
            //获取cookie
            getCookie:function(name){
                var arr;
                var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg)){
                    return unescape(arr[2]);
                }else{
                    return null; 
                    document.cookie = name + "=" + escape(value);
                }
            },
            //删除cookie
            delCookie:function(name){
                var keys=document.cookie.match(/[^ =;]+(?=\=)/g); 
                if (keys) { 
                    for (var i = keys.length; i--;) 
                    document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString() +";path=/"
                } 
            },
            //存取localstorage
            storage:function(key, value){
                if (value === void(0)) {
                    let lsVal = localStorage.getItem(key);
                    if (lsVal && lsVal.indexOf('autostringify-') === 0) {
                        return JSON.parse(lsVal.split('autostringify-')[1]);
                    } else {
                        return lsVal;
                    }
                } else {
                    if (typeof(value) === "object" || Array.isArray(value)) {
                        value = 'autostringify-' + JSON.stringify(value);
                    };
                    return localStorage.setItem(key, value);
                }
            },
            //全局监听接收
            on:function(eventName, eventHandle){
                if (eventName && (typeof eventHandle === 'function'))
                return bus.$on(eventName, eventHandle)
            },
            //全局监听传递
            emit:function(eventName, msg){
                return bus.$emit(eventName, msg)
            },
            //其他添加
            test:function(val){
                return val
            }
        }
    }
}
Vue.use(common);

window.history.replaceState = window.history.replaceState || function () {}