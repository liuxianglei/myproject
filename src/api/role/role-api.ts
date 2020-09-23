import axios from "../../lib/api.request";
import PageRequest from '../../model/common/PageRequest';
import RoleVo from '../../model/authority/RoleVo';

export const getRoleList=()=>{
  return axios.request({
    url: "/api/v1/ROLE/List",
    method: "get",
    params: {}
  });
}

export const pageRole=(roleName: string, pageRequest: PageRequest)=>{
  return axios.request({
    url: "/api/v1/ROLE",
    method: "get",
    params: {
        ...pageRequest,
        roleName: roleName
    }
  });
}

export const addRole=(roleVo:RoleVo)=>{
  let functions = "";
  roleVo.functions.forEach(fun=>{
    functions += `${fun},`
  })
  return axios.request({
    url: "/api/v1/ROLE",
    method: "post",
    data: {
      ...roleVo,
      functions:functions
    }
  });
}

export const editRole=(roleVo:RoleVo)=>{
  let functions = "";
  roleVo.functions.forEach(fun=>{
    functions += `${fun},`
  })
  console.log(roleVo)
  return axios.request({
    url: "/api/v1/ROLE/"+roleVo.roleId,
    method: "put",
    data: {
      ...roleVo,
      functions:functions
    }
  });
}

export const delRole=(roleId:string)=>{
  return axios.request({
    url: "/api/v1/ROLE/" + roleId,
    method: "delete"
});
}