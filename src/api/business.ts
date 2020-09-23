import axios from "../lib/api.request";
import LoginParamVo from  "../model/LoginParamVo";
export const delHmChart = (chartId:number) =>{
  return axios.request({
    url: "heatmap/delHmChart",
    method: "get",
    params: {
      chartId
    }
  });
}

// 1. 获取token
export const getToken = (params:LoginParamVo) => {
  return axios.request({
    url: "/api/v1/token",
    method: "post",
    data: params
  });
}
// 2. 登录
export const getUserInfo = () => {
  return axios.request({
    url: "/api/v1/me",
    method: "get",
    params: ''
  });
};
