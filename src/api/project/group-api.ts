import axios from "../../lib/api.request";
import PageRequest from '../../model/common/PageRequest';
import GroupVo from '../../model/project/GroupVo';

export const list=(projectId:string,partitionId:string)=>{
  return axios.request({
    url: "/api/v1/Group/List",
    method: "get",
    params: {
      projectId,
      partitionId
    }
  });
}

export const page = (projectId: string, createDate:string, partitionId:string, groupId:string, pageRequest: PageRequest) => {
  return axios.request({
      url: "/api/v1/Group",
      method: "get",
      params: {
          ...pageRequest,
          projectId: projectId,
          partitionId: partitionId,
          groupId: groupId,
          createDate: createDate
      }
  });
}

export const add = (groupVo: GroupVo) => {
  return axios.request({
      url: "/api/v1/Group",
      method: "post",
      data: groupVo
  });
}

export const edit = (groupVo: GroupVo) => {
  return axios.request({
      url: "/api/v1/Group/" + groupVo.groupId,
      method: "put",
      data: groupVo
  });
}
export const del = (groupId: string) => {
  return axios.request({
      url: "/api/v1/Group/" + groupId,
      method: "delete",
  });
}
