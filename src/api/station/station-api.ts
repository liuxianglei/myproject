/*
 * @Author: your name
 * @Date: 2020-07-06 19:58:55
 * @LastEditTime: 2020-07-26 16:35:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\api\station\station-api.ts
 */ 
import axios from "../../lib/api.request";
import StationQuery from '../../model/station/StationQuery';
import StationVo from '../../model/station/StationVo';
import InitValueVo from '../../model/project/InitValueVo';
import ChildNodeVo from '../../model/project/ChildNodeVo';
import PageRequest from '../../model/common/PageRequest';

export const getStationTypeList=()=>{
  return axios.request({
    url: "/api/v1/Project/StationType",
    method: "get",
    params: ''
  });
}
export const getChildNodeList=(stationId:string)=>{
  return axios.request({
    url: "/api/v1/Project/ChildNode",
    method: "get",
    params: {
      stationId
    }
  });
}
export const editChildNode=(editVo:ChildNodeVo)=>{
  return axios.request({
    url: "/api/v1/Project/ChildNode",
    method: "put",
    data: editVo
  });
}

export const getStationList=(stationQuery:StationQuery)=>{
  return axios.request({
    url: "/api/v1/Project/Station",
    method: "get",
    params: stationQuery
  });
}
export const addStation=(addVo:StationVo)=>{
  return axios.request({
    url: "/api/v1/Project/Station",
    method: "post",
    data: addVo
  });
}
export const editStation=(editVo:StationVo)=>{
  return axios.request({
    url: "/api/v1/Project/Station/" + editVo.stationId,
    method: "put",
    data: editVo
  });
}
export const delStation=(stationId:string,deviceId:string)=>{
  return axios.request({
    url: "/api/v1/Project/Station/" + stationId + "?deviceId=" + deviceId,
    method: "delete",
  });
}
export const findInitVal=(stationId:string,deviceId:string)=>{
  return axios.request({
    url: "/api/v1/Project/InitialValue",
    method: "get",
    params:{
      stationId,
      deviceId
    }
  });
}
export const findInitTypeList=()=>{
  return axios.request({
    url: "/api/v1/Project/nitialValueType",
    method: "get"
  });
}
export const addInitVal=(initValueVo:InitValueVo)=>{
  return axios.request({
    url: "/api/v1/Project/InitialValue",
    method: "post",
    data:initValueVo
  });
}
export const delInitVal=(stationId:string,deviceId:string,initialValueId:string)=>{
  return axios.request({
    url: "/api/v1/Project/InitialValue/" + stationId + "?deviceId="+deviceId+"&initialValueId="+initialValueId,
    method: "delete"
  });
}
export const findAddInitVal=(stationId:string,deviceId:string,startDate:string,endDate:string,pageRequest:PageRequest)=>{
  return axios.request({
    url: "/api/v1/Project/InitialValue/original",
    method: "get",
    params:{
      ...pageRequest,
      stationId,
      deviceId,
      startDate,
      endDate
    }
  });
}
