/*
 * @Author: your name
 * @Date: 2020-07-25 18:02:08
 * @LastEditTime: 2020-08-30 19:33:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\api\data\data-api.ts
 */ 
import axios from "../../lib/api.request";
import SurefaceSearchModel from '../../model/data/SurefaceSearchModel';

export const getSureFaceData=(surefaceSearchModel:SurefaceSearchModel)=>{
  return axios.request({
    url: "/api/v1/GetSureFaceDatas",
    method: "get",
    params: {...surefaceSearchModel}
  });
}
export const exportSureFaceData=(surefaceSearchModel:SurefaceSearchModel)=>{
  return axios.request({
    url: "/api/v1/GetSureFaceDataExcel",
    method: "get",
    params: {...surefaceSearchModel}
  });
}

export const getFlexData=(surefaceSearchModel:SurefaceSearchModel)=>{
  return axios.request({
    url: "/api/v1/GetFlexData",
    method: "get",
    params:  {...surefaceSearchModel}
  });
}

export const getRainData=(surefaceSearchModel:SurefaceSearchModel)=>{
  return axios.request({
    url: "/api/v1/GetRainData",
    method: "get",
    params: {...surefaceSearchModel}
  });
}

export const getIntellectualCorePileData=(surefaceSearchModel:SurefaceSearchModel)=>{
  return axios.request({
    url: "/api/v1/PostIntellectualCorePile",
    method: "get",
    params: {...surefaceSearchModel}
  });
}

export const getWaterLevelData=(surefaceSearchModel:SurefaceSearchModel)=>{
  return axios.request({
    url: "/api/v1/WaterLevelData",
    method: "get",
    params: {...surefaceSearchModel}
  });
}

export const getWaterPressureData=(surefaceSearchModel:SurefaceSearchModel)=>{
  return axios.request({
    url: "/api/v1/getWaterPressureData",
    method: "get",
    params: {...surefaceSearchModel}
  });
}

export const getCurveTypeSet=(deviceId:string)=>{
  return axios.request({
    url: "/api/v1/CurveTypeSet",
    method: "get",
    params: {
      deviceId
    }
  });
}
