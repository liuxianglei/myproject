import axios from "../../lib/api.request";
import OriginalSetModel from '../../model/dataManage/OriginalSetModel'
import PageRequest from '../../model/common/PageRequest'

export const pageGnss=(originalSetModel:OriginalSetModel,pageRequest:PageRequest)=>{
  return axios.request({
    url: "/api/v1/Original/GetGNSSOriginalData",
    method: "get",
    params: {
      ...originalSetModel,
      ...pageRequest
    }
  });
}
export const saveGnss=(data)=>{
  return axios.request({
    url: "/api/v1/OriginalPostGNSSOriginalData",
    method: "post",
    data
  });
}
export const saveRain=(data)=>{
  return axios.request({
    url: "/api/v1/OriginalPostRainOriginalData",
    method: "post",
    data
  });
}
export const pageFlt=(originalSetModel:OriginalSetModel,pageRequest:PageRequest)=>{
  return axios.request({
    url: "/api/v1/Original/GetFlexiTiltData",
    method: "get",
    params: {
      ...originalSetModel,
      ...pageRequest
    }
  });
}
export const pageIcp=(originalSetModel:OriginalSetModel,pageRequest:PageRequest)=>{
  return axios.request({
    url: "/api/v1/Original/GetCorePileOriginalData",
    method: "get",
    params: {
      ...originalSetModel,
      ...pageRequest
    }
  });
}
export const pageRain=(originalSetModel:OriginalSetModel,pageRequest:PageRequest)=>{
  return axios.request({
    url: "/api/v1/Original/GetRainOriginalData",
    method: "get",
    params: {
      ...originalSetModel,
      ...pageRequest
    }
  });
}
export const pageWl=(originalSetModel:OriginalSetModel,pageRequest:PageRequest)=>{
  return axios.request({
    url: "/api/v1/Original/GetWaterLevelOriginalData",
    method: "get",
    params: {
      ...originalSetModel,
      ...pageRequest
    }
  });
}
export const pageWp=(originalSetModel:OriginalSetModel,pageRequest:PageRequest)=>{
  return axios.request({
    url: "/api/v1/Original/GetWaterPressureOriginalData",
    method: "get",
    params: {
      ...originalSetModel,
      ...pageRequest
    }
  });
}
