/*
 * @Author: your name
 * @Date: 2020-07-26 22:02:20
 * @LastEditTime: 2020-08-09 11:41:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\service\project\ProjectService.ts
 */ 
import {getProjectInfo,getProjectList,pageProject,add,edit,del} from '../../api/project/project-api';
import ProjectVo from '../../model/project/ProjectVo';
import PageRequest from '../../model/common/PageRequest';
import PageDataVo from '../../model/common/PageDataVo';

export default class ProjectService {

    async getProjectInfo(projectId?:string): Promise<any> {
        let res = await getProjectInfo(projectId);
        return res;
    }
    async getProjectList(deviceId?:string): Promise<any> {
        let res = await getProjectList(deviceId);
        
        return res;
    }
    async pageProject(projectId:string,createDate:string,pageRequest:PageRequest): Promise<any> {
        return await pageProject(projectId,createDate,pageRequest);
    }

    async add(projectVo:ProjectVo): Promise<any> {
        return await add(projectVo);
    }

    async edit(projectVo:ProjectVo): Promise<any> {
        return await edit(projectVo);
    }
    async del(projectId:string): Promise<any> {
        return await del(projectId);
    }
}
