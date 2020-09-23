import {list,page,add,edit,del} from '../../api/project/partition-api';
import PartitionVo from '../../model/project/PartitionVo';
import PageRequest from '../../model/common/PageRequest';

export default class PartitionService {

    async list(projectId:string): Promise<any> {
        let res = await list(projectId);
        return res;
    }
    async page(projectId:string,createDate:string,pageRequest:PageRequest,partitionId:string): Promise<any> {
        return await page(projectId,createDate,pageRequest,partitionId);
    }

    async add(partitionVo:PartitionVo): Promise<any> {
        return await add(partitionVo);
    }

    async edit(partitionVo:PartitionVo): Promise<any> {
        return await edit(partitionVo);
    }

    async del(partitionId:string): Promise<any> {
        return await del(partitionId);
    }
}
