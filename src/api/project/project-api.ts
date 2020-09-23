/*
 * @Author: your name
 * @Date: 2020-07-26 22:02:19
 * @LastEditTime: 2020-08-09 11:41:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\api\project\project-api.ts
 */ 
import axios from "../../lib/api.request";
import PageRequest from '../../model/common/PageRequest';
import ProjectVo from '../../model/project/ProjectVo';
import { convert } from '../../lib/utils';
import { request } from 'http';

export const getProjectInfo=(projectId:string)=>{
  return axios.request({
    url: "/api/v1/Project/"+projectId,
    method: "get",
    params: {}
  });
}

export const getProjectList=(deviceId:string)=>{
  return axios.request({
    url: "/api/v1/Project/List",
    method: "get",
    params: {
      deviceId
    }
  });
}

export const pageProject = (projectId: string, createDate:string, pageRequest: PageRequest) => {
  return axios.request({
      url: "/api/v1/Project",
      method: "get",
      params: {
          ...pageRequest,
          projectId: projectId,
          createDate
      }
  });
}

export const add = (projectVo: ProjectVo) => {
  return axios.request({
      url: "/api/v1/Project",
      method: "post",
      data: projectVo
  });
}

export const edit = (projectVo: ProjectVo) => {
  return axios.request({
      url: "/api/v1/Project/" + projectVo.projectId,
      method: "put",
      data: projectVo
  });
}
export const del = (projectId: string) => {
  return axios.request({
      url: "/api/v1/Project/" + projectId,
      method: "delete"
  });
}