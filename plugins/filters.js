import Vue from 'vue'

export function formatDate(value, fmt) {
    if(!value){
        return "--"
    }
    if(fmt == undefined){
        fmt = "yyyy/MM/dd hh:mm"
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

const filters = { formatDate }

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
export default filters
