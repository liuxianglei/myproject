import axios from "../../lib/api.request";
import PageRequest from '../../model/common/PageRequest';
import PartitionVo from '../../model/project/PartitionVo';

export const list=(projectId:string)=>{
  return axios.request({
    url: "/api/v1/Partition/List",
    method: "get",
    params: {
      projectId,
    }
  });
}

export const page = (projectId: string, createDate:string, pageRequest: PageRequest, partitionId?:string) => {
  return axios.request({
      url: "/api/v1/Partition",
      method: "get",
      params: {
          ...pageRequest,
          projectId: projectId,
          partitionId: partitionId,
          createDate: createDate
      }
  });
}

export const add = (partitionVo: PartitionVo) => {
  return axios.request({
      url: "/api/v1/Partition",
      method: "post",
      data: partitionVo
  });
}

export const edit = (partitionVo: PartitionVo) => {
  return axios.request({
      url: "/api/v1/Partition/" + partitionVo.partitionId,
      method: "put",
      data: partitionVo
  });
}

export const del = (partitionId: string) => {
  return axios.request({
      url: "/api/v1/Partition/" + partitionId,
      method: "delete"
  });
}
