import { getRoleList,pageRole,addRole,delRole,editRole } from '../../api/role/role-api'
import RoleVo from '../../model/authority/RoleVo';
import PageRequest from '../../model/common/PageRequest';
import PageDataVo from '../../model/common/PageDataVo';

export default class RoleService{

    pageRole = async (roleName:string,pageRequest:PageRequest):Promise<any> =>{
        let res = pageRole(roleName,pageRequest);
        return res;
    }

    getRoleList = async ():Promise<any> =>{
        let res = getRoleList();
        return res;
    }

    addRole = (addVo:RoleVo) =>{
        return addRole(addVo);
    }

    editRole = (editVo:RoleVo) =>{
        return editRole(editVo);
    }

    delRole = (roleId:string) =>{
        return delRole(roleId);
    }
}