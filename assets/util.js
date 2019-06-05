/* eslint-disable */
import Vue from 'vue'
//localStorage
export const storage = function(key, value) {
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
}
//生成随机数
export const getUUID = function (len) {
  len = len || 6;
  len = parseInt(len, 10);
  len = isNaN(len) ? 6 : len;
  var seed = "0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ";
  var seedLen = seed.length - 1;
  var uuid = "";
  while (len--) {
    uuid += seed[Math.round(Math.random() * seedLen)];
  }
  return uuid;
};
//深拷贝
export const deepcopy = function (source) {
  if (!source) {
    return source;
  }
  let sourceCopy = source instanceof Array ? [] : {};
  for (let item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item];
  }
  return sourceCopy;
};

//日期格式化
export const formatDate = (value,fmt) => {
  if(!value){
      return "--"
  }
  if(fmt == undefined){
      fmt = "yyyy/MM/dd hh:mm"
  }
  if(fmt===true){
      fmt = "yyyy/MM/dd"
  }
  if (!isNaN(parseInt(value))) {
      //时间戳（秒）
      value = value * 1000
  }
  
  let getDate = new Date(value);
  let o = {
      'M+': getDate.getMonth() + 1,
      'd+': getDate.getDate(),
      'h+': getDate.getHours(),
      'm+': getDate.getMinutes(),
      's+': getDate.getSeconds(),
      'q+': Math.floor((getDate.getMonth() + 3) / 3),
      'S': getDate.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
  }
  return fmt
}
//ajax错误处理
export const catchError = function (error) {
  //业务代码拦截
  if(error.data){
      error.response = error.data
  }
  //原生错误对象
  if (error.response) {
    switch (error.response.status) {
      case 400:
        Vue.prototype.$message({
          message: error.response.statusCode || '请求参数异常',
          type: 'error'
        });
        break;
      case 401:
        sessionStorage.removeItem('user');
        Vue.prototype.$message({
          message: error.response.statusCode || '密码错误或账号不存在！',
          type: 'warning',
          onClose: function () {
            storage('user','');
            location.reload();
          }
        });
        break;
      case 403:
        Vue.prototype.$message({
          message: error.response.statusCode || '无访问权限，请联系企业管理员',
          type: 'warning'
        });
        break;
      default:
        Vue.prototype.$message({
          message: error.response.statusCode || '服务端异常，请联系技术支持',
          type: 'error'
        });
    }
  } else if (error.message) {
  	let message = error.message;
    if(message.indexOf('timeout')>-1){
      message = '请求超时，请重试'
    }
    if(message.indexOf('Network')>-1){
      message = '网络异常'
    }
    Vue.prototype.$message({
      message,
      type: 'error'
    });
    
  }
  return Promise.reject(error);
}

let bus = new Vue();
//监听事件
export const on = function (eventName, eventHandle) {
  if (eventName && (typeof eventHandle === 'function'))
    return bus.$on(eventName, eventHandle)
};
//触发事件
export const emit = function (eventName, msg) {
  return bus.$emit(eventName, msg)
};