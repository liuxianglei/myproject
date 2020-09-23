/*
 * @Author: your name
 * @Date: 2020-07-06 19:58:55
 * @LastEditTime: 2020-07-26 16:35:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\api\station\station-api.ts
 */ 
import axios from "../../lib/api.request";

export const changePassword=(userName:string,oldPassword:string,newPassword:string)=>{
  return axios.request({
    url: "/api/v1/password",
    method: "put",
    data: {
      username:userName,
      oldPassword,
      newPassword
    }
  });
}
export const resetPassword=(userName:string,phone:string,code:string,newPassword:string)=>{
  return axios.request({
    url: "/api/v1/me/retrievePassword",
    method: "post",
    data: {
      code,
      userName,
      phone,
      newPassword
    }
  });
}
export const getSmsCode=(userName:string,phone:string)=>{
  return axios.request({
    url: "/api/v1/me/getCode",
    method: "post",
    data: {
      username:userName,
      phone
    }
  });
}
export const getProjectsByUser=(userId:string)=>{
  return axios.request({
    url: "/api/v1/GetProjectList/"+userId,
    method: "get",
  });
}
