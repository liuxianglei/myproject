/*
 * @Author: your name
 * @Date: 2020-06-26 19:27:12
 * @LastEditTime: 2020-06-26 19:27:26
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\config\utils.ts
 */ 


export const convert = (date,format) => {
    let _this = date
    var args = {
        "M+": _this.getMonth() + 1,
        "d+": _this.getDate(),
        "h+": _this.getHours(),
        "m+": _this.getMinutes(),
        "s+": _this.getSeconds(),
        "q+": Math.floor((_this.getMonth() + 3) / 3), //quarter
        "S": _this.getMilliseconds()
    };
    if(/(y+)/.test(format))
        format = format.replace(RegExp.$1, (_this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for(var i in args) {
        var n = args[i];
        if(new RegExp("(" + i + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? n : ("00" + n).substr(("" + n).length));
    }
    return format;
};