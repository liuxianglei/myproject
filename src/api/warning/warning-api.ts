/*
 * @Author: your name
 * @Date: 2020-08-06 22:11:13
 * @LastEditTime: 2020-08-16 22:59:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\api\warning\warning-api.ts
 */
import axios from "../../lib/api.request";
import WarninSearchModel from '../../model/warning/WarningSearchModel';
import PageRequest from '../../model/common/PageRequest';
import WarningDataModel from '../../model/warning/WarningDataModel';
import FissureMeterModel from '../../model/warning/FissureMeterModel';
import WarningSettingSearchModel from '../../model/warning/WarningSettingSearchModel';
import FlexiTiltParmsSetModel from '../../model/warning/FlexiTiltParmsSetModel';
import IntellectualCorePileParmsModel from '../../model/warning/IntellectualCorePileParmsModel';
import RainGaugeParmsSetModel from '../../model/warning/RainGaugeParmsSetModel';
import SurefaceParmsSetModel from '../../model/warning/SurefaceParmsSetModel';
import WarningLevelModel from '../../model/warning/WarningLevelModel';
import WarningPressureModel from '../../model/warning/WarningPressureModel';


export const getWarningRecordList=(warninSearchModel:WarninSearchModel,pageRequest:PageRequest)=>{
  console.log( {
    ...warninSearchModel,
    ...pageRequest
  })
  return axios.request({
    url: "/api/v1/GetWarninDataList",
    method: "get",
    params: {
      ...warninSearchModel,
      page:pageRequest.page,
      pageSize:pageRequest.pageSize
    }
    
    
  });
}

export const warningStatusSet=(warningDataModel:WarningDataModel)=>{
  return axios.request({
    url: "/api/v1/WarningStatusSet",
    method: "post",
    data: 
      warningDataModel
    
  });
}

export const setFissureMeter=(params:FissureMeterModel)=>{
  return axios.request({
    url: "/api/v1/FissureMeter",
    method: "post",
    data: params
  });
}
export const getFissureMeter=(params:WarningSettingSearchModel)=>{
  return axios.request({
    url: "/api/v1/FissureMeterSearch",
    method: "get",
    params: {...params}
  });
}
export const setFlexiTiltParams=(params:FlexiTiltParmsSetModel)=>{
  return axios.request({
    url: "/api/v1/FlexiTiltParamsSet",
    method: "post",
    data: params
  });
}
export const getFlexiTiltParamsSearch=(params:WarningSettingSearchModel)=>{
  return axios.request({
    url: "/api/v1/FlexiTiltParamsSearch",
    method: "get",
    params: {...params}
  });
}
export const setIntellectualCorePile=(params:IntellectualCorePileParmsModel)=>{
  return axios.request({
    url: "/api/v1/IntellectualCorePile",
    method: "post",
    data: params
  });
}
export const getIntellectualCorePile=(params:WarningSettingSearchModel)=>{
  return axios.request({
    url: "/api/v1/IntellectualCorePileSearch",
    method: "get",
    params: {...params}
  });
}
export const setRainParams=(params:RainGaugeParmsSetModel)=>{
  return axios.request({
    url: "/api/v1/RainParamsSet",
    method: "post",
    data: params
  });
}
export const getRainParams=(params:WarningSettingSearchModel)=>{
  return axios.request({
    url: "/api/v1/RainParamsSearch",
    method: "get",
    params: {...params}
  });
}
export const setsurfaceParams=(params:SurefaceParmsSetModel)=>{
  return axios.request({
    url: "/api/v1/surfaceParamsSet",
    method: "post",
    data: params
  });
}
export const getsufaceParames=(params:WarningSettingSearchModel)=>{
  return axios.request({
    url: "/api/v1/sufaceParamesSearch",
    method: "get",
    params: {...params}
  });
}
export const setWaterLevelParams=(params:WarningLevelModel)=>{
  return axios.request({
    url: "/api/v1/WaterLevelSet",
    method: "post",
    data: params
  });
}
export const getWaterLevelParams=(params:WarningSettingSearchModel)=>{
  return axios.request({
    url: "/api/v1/WaterLevelSearch",
    method: "get",
    params: {...params}
  });
}
export const setWaterPressureParams=(params:WarningPressureModel)=>{
  return axios.request({
    url: "/api/v1/WaterPressureSet",
    method: "post",
    data: params
  });
}
export const getWaterPressureParams=(params:WarningSettingSearchModel)=>{
  return axios.request({
    url: "/api/v1/WaterPressureSearch",
    method: "get",
    params: {...params}
  });
}