import {list,page,add,edit,del} from '../../api/project/group-api';
import GroupVo from '../../model/project/GroupVo';
import PageRequest from '../../model/common/PageRequest';
import PageDataVo from '../../model/common/PageDataVo';

export default class GroupService {

    async list(projectId:string,partitionId:string): Promise<any> {
        let res = await list(projectId,partitionId);
        return res;
    }
    async page(projectId:string,createDate:string,partitionId:string,groupId:string,pageRequest:PageRequest): Promise<any> {
        return await page(projectId,createDate,partitionId,groupId,pageRequest);
    }

    async add(groupVo:GroupVo): Promise<any> {
        return await add(groupVo);
    }

    async edit(groupVo:GroupVo): Promise<any> {
        return await edit(groupVo);
    }
    async del(groupId:string): Promise<any> {
        return await del(groupId);
    }
}
