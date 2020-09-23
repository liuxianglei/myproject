import pImg from '../assets/images/p-l.png'
import normal from '../assets/images/normal.png'
import blue from '../assets/images/blue.png'
import yellow from '../assets/images/yellow.png'
import red from '../assets/images/red.png'
import orange from '../assets/images/orange.png'
import offline from '../assets/images/offline.png'
import dibiao from '../assets/images/ico_dibiaoweiyi.png'
import cexie from '../assets/images/ico_rouxingjiance.png'
import jiangyu from '../assets/images/ico_jiangyuliang.png'
import shuiwei from '../assets/images/ico_shuiweijiance.png'
import shuiya from '../assets/images/ico_shiweijiance.png'
import zhixingzhunag from '../assets/images/ico_zhixinzhuang.png'
import dibiaoGreen from '../assets/images/ico_dibiaoweiyi-green.png'
import cexieGreen from '../assets/images/ico_rouxingjiance-green.png'
import jiangyuGreen from '../assets/images/ico_jiangyuliang-green.png'
import shuiweiGreen from '../assets/images/ico_shuiweijiance-green.png'
import shuiyaGreen from '../assets/images/ico_shiweijiance-green.png'
import zhixingzhunagGreen from '../assets/images/ico_zhixinzhuang-green.png'
import dibiaoRed from '../assets/images/ico_dibiaoweiyi-red.png'
import cexieRed from '../assets/images/ico_rouxingjiance-red.png'
import jiangyuRed from '../assets/images/ico_jiangyuliang-red.png'
import shuiweiRed from '../assets/images/ico_shuiweijiance-red.png'
import shuiyaRed from '../assets/images/ico_shiweijiance-red.png'
import zhixingzhunagRed from '../assets/images/ico_zhixinzhuang-red.png'
import dibiaoOr from '../assets/images/ico_dibiaoweiyi-o.png'
import cexieOr from '../assets/images/ico_rouxingjiance-o.png'
import jiangyuOr from '../assets/images/ico_jiangyuliang-o.png'
import shuiweiOr from '../assets/images/ico_shuiweijiance-o.png'
import shuiyaOr from '../assets/images/ico_shiweijiance-o.png'
import zhixingzhunagOr from '../assets/images/ico_zhixinzhuang-o.png'
import dibiaoY from '../assets/images/ico_dibiaoweiyi-y.png'
import cexieY from '../assets/images/ico_rouxingjiance-y.png'
import jiangyuY from '../assets/images/ico_jiangyuliang-y.png'
import shuiweiY from '../assets/images/ico_shuiweijiance-y.png'
import shuiyaY from '../assets/images/ico_shiweijiance-y.png'
import zhixingzhunagY from '../assets/images/ico_zhixinzhuang-y.png'
import dibiaoOff from '../assets/images/ico_dibiaoweiyi-off.png'
import cexieOff from '../assets/images/ico_rouxingjiance-off.png'
import jiangyuOff from '../assets/images/ico_jiangyuliang-off.png'
import shuiweiOff from '../assets/images/ico_shuiweijiance-off.png'
import shuiyaOff from '../assets/images/ico_shiweijiance-off.png'
import zhixingzhunagOff from '../assets/images/ico_zhixinzhuang-off.png'
import { MarkerTypeEnum, DeviceIdEnum } from '../model/enum/enum'
require('es6-promise').polyfill();
require('isomorphic-fetch');

export const getMarkerByImg = (img,BMap,point,content) =>{
    console.log(img)
    let myIcon = new BMap.Icon(img, new BMap.Size(30,30),{
        imageSize:new BMap.Size(30,30)
    });
    let marker = new BMap.Marker(point,{
        icon:myIcon,
        offset:new BMap.Size(0,-15)
    });
    let label = new BMap.Label(content,{
        offset:new BMap.Size(30,0)
    });
    marker.setLabel(label);
    return marker;
}
export const getMarker = (type,BMap,point,content) =>{
    let marker = null;
    if(type === MarkerTypeEnum.PROJECT){
        let myIcon = new BMap.Icon(pImg, new BMap.Size(30,30),{
            imageSize:new BMap.Size(30,30)
        });
        marker = new BMap.Marker(point,{
            icon:myIcon,
            offset:new BMap.Size(0,-15)
        });
        let label = new BMap.Label(content,{
            offset:new BMap.Size(30,0)
        });
        marker.setLabel(label);
    }
    if(type === MarkerTypeEnum.BIAOMIAN){
        let myIcon = new BMap.Icon(dibiao, new BMap.Size(30,30),{
            imageSize:new BMap.Size(30,30)
        });
        marker = new BMap.Marker(point,{
            icon:myIcon,
            offset:new BMap.Size(0,-15)
        });
        let label = new BMap.Label(content,{
            offset:new BMap.Size(30,0)
        });
        marker.setLabel(label);
    }
    if(type === MarkerTypeEnum.CEXIE){
        let myIcon = new BMap.Icon(cexie, new BMap.Size(30,30),{
            imageSize:new BMap.Size(30,30)
        });
        marker = new BMap.Marker(point,{
            icon:myIcon,
            offset:new BMap.Size(0,-15)
        });
        let label = new BMap.Label(content,{
            offset:new BMap.Size(30,0)
        });
        marker.setLabel(label);
    }
    return marker;
}

export const getInfoWindow = (BMap,title, width,height,content) =>{
    let opts = {
        width,
        height,
        title,
        enableMessage:true,
        offset:new BMap.Size(0,-30)
    };
    return new BMap.InfoWindow(content,opts); 
}

export const getImgByWarningLevelAndDeviceId = (level,deviceId) => {
    if(level === "0") {
        if(deviceId === DeviceIdEnum.BIAOMIAN) return dibiaoGreen;
        if(deviceId === DeviceIdEnum.CEXIE) return cexieGreen;
        if(deviceId === DeviceIdEnum.SHUIWEI) return shuiweiGreen;
        if(deviceId === DeviceIdEnum.SHUIYA) return shuiyaGreen;
        if(deviceId === DeviceIdEnum.JIANGYU) return jiangyuGreen;
        if(deviceId === DeviceIdEnum.ZHIXINZHUANG) return zhixingzhunagGreen;
    }
    if(level === "1") {
        if(deviceId === DeviceIdEnum.BIAOMIAN) return dibiao;
        if(deviceId === DeviceIdEnum.CEXIE) return cexie;
        if(deviceId === DeviceIdEnum.SHUIWEI) return shuiwei;
        if(deviceId === DeviceIdEnum.SHUIYA) return shuiya;
        if(deviceId === DeviceIdEnum.JIANGYU) return jiangyu;
        if(deviceId === DeviceIdEnum.ZHIXINZHUANG) return zhixingzhunag;
    }
    if(level === "2") {
        if(deviceId === DeviceIdEnum.BIAOMIAN) return dibiaoOr;
        if(deviceId === DeviceIdEnum.CEXIE) return cexieOr;
        if(deviceId === DeviceIdEnum.SHUIWEI) return shuiweiOr;
        if(deviceId === DeviceIdEnum.SHUIYA) return shuiyaOr;
        if(deviceId === DeviceIdEnum.JIANGYU) return jiangyuOr;
        if(deviceId === DeviceIdEnum.ZHIXINZHUANG) return zhixingzhunagOr;
    }
    if(level === "3") {
        if(deviceId === DeviceIdEnum.BIAOMIAN) return dibiaoY;
        if(deviceId === DeviceIdEnum.CEXIE) return cexieY;
        if(deviceId === DeviceIdEnum.SHUIWEI) return shuiweiY;
        if(deviceId === DeviceIdEnum.SHUIYA) return shuiyaY;
        if(deviceId === DeviceIdEnum.JIANGYU) return jiangyuY;
        if(deviceId === DeviceIdEnum.ZHIXINZHUANG) return zhixingzhunagY;
    }
    if(level === "4") {
        if(deviceId === DeviceIdEnum.BIAOMIAN) return dibiaoRed;
        if(deviceId === DeviceIdEnum.CEXIE) return cexieRed;
        if(deviceId === DeviceIdEnum.SHUIWEI) return shuiweiRed;
        if(deviceId === DeviceIdEnum.SHUIYA) return shuiyaRed;
        if(deviceId === DeviceIdEnum.JIANGYU) return jiangyuRed;
        if(deviceId === DeviceIdEnum.ZHIXINZHUANG) return zhixingzhunagRed;
    }
    if(level === "9") {
        if(deviceId === DeviceIdEnum.BIAOMIAN) return dibiaoOff;
        if(deviceId === DeviceIdEnum.CEXIE) return cexieOff;
        if(deviceId === DeviceIdEnum.SHUIWEI) return shuiweiOff;
        if(deviceId === DeviceIdEnum.SHUIYA) return shuiyaOff;
        if(deviceId === DeviceIdEnum.JIANGYU) return jiangyuOff;
        if(deviceId === DeviceIdEnum.ZHIXINZHUANG) return zhixingzhunagOff;
    }
}
export const getImgBydeviceId = (deviceId) => {
    if(deviceId === DeviceIdEnum.BIAOMIAN) return dibiao;
    if(deviceId === DeviceIdEnum.CEXIE) return cexie;
    if(deviceId === DeviceIdEnum.JIANGYU) return jiangyu;
    if(deviceId === DeviceIdEnum.SHUIWEI) return shuiwei;
    if(deviceId === DeviceIdEnum.SHUIYA) return shuiya;
    if(deviceId === DeviceIdEnum.ZHIXINZHUANG) return zhixingzhunag;
}
export const getNameBydeviceId = (deviceId) => {
    if(deviceId === DeviceIdEnum.BIAOMIAN) return "表面位移";
    if(deviceId === DeviceIdEnum.CEXIE) return "柔性测斜仪";
    if(deviceId === DeviceIdEnum.JIANGYU) return "雨量计";
    if(deviceId === DeviceIdEnum.SHUIWEI) return "水位";
    if(deviceId === DeviceIdEnum.SHUIYA) return "水压";
    if(deviceId === DeviceIdEnum.ZHIXINZHUANG) return "智芯桩";
}
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
let _ = require("lodash");

export const isArrayEqual = (x, y) => {
  return _(x)
    .xorWith(y, _.isEqual)
    .isEmpty();
};

interface DownloadInfo{
    url:string,
    method:string,
    fileName:string,
    params?:any
}
export const download = (downloadInfo:DownloadInfo) =>{
    let { url, method, params, fileName } = downloadInfo
    if (params) {  
        let paramsArray = [];  
        //拼接参数  
        Object.keys(params).forEach(key => {
            if(params[key]){
                paramsArray.push(key + '=' + params[key])
            }
        })  
        if (url.search(/\?/) === -1) {  
            url += '?' + paramsArray.join('&')  
        } else {  
            url += '&' + paramsArray.join('&')  
        }  
    } 
    let token = window.sessionStorage.getItem('token');
    fetch(url,{
        method,
        headers: new Headers({
            "XASPSESSION": token?token:""
        })
    }).then(response => {
        if (response.ok) {
          return response.blob(); // 处理二进制数据流，返回blob对象
        }
        else {
          return Promise.reject(response);
        }
      })
      .then(blob => {
        let url = window.URL.createObjectURL(blob); // //创建下载的链接
        if (window.navigator.msSaveBlob) {
          // ie 浏览器
          try {
            window.navigator.msSaveBlob(blob, fileName)
          } catch (e) {
            // console.log(e)
          }
        } else {
          // 谷歌浏览器 创建a标签 添加download属性下载
          let a = document.createElement('a');
          a.href = url;
          document.body.appendChild(a)
          a.download = fileName; // 下载文件的文件名
          a.click(); // 点击下载
          document.body.removeChild(a) // 下载完成移除a元素
          window.URL.revokeObjectURL(url) //释放掉blob对象
        }
      }).catch(e => {})
}
