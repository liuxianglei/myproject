import axios from "../../lib/api.request";
import PageRequest from "../../model/common/PageRequest";
import AccountVo from '../../model/authority/AccountVo'

//分页账号信息接口
export const pageAccount = (realName: string, pageRequest: PageRequest) => {
    return axios.request({
        url: "/api/v1/User",
        method: "get",
        params: {
            ...pageRequest,
            realName: realName
        }
    });
}

//查询账号信息接口
export const getAccount = (userId: string) => {
    return axios.request({
        url: "/api/v1/User/"+userId,
        method: "get",
        params: {}
    });
}

//新增账号
export const addAccount = (accountVo: AccountVo) => {
    return axios.request({
        url: "/api/v1/User",
        method: "post",
        data: accountVo
    });
}

//修改账号
export const editAccount = (accountVo: AccountVo) => {
    return axios.request({
        url: "/api/v1/User/" + accountVo.userId,
        method: "put",
        data: accountVo
    });
}

//删除账号
export const delAccount = (userId:string) => {
    return axios.request({
        url: "/api/v1/User/" + userId,
        method: "delete"
    });
}




