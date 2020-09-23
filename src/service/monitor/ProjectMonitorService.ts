/*
 * @Author: your name
 * @Date: 2020-08-08 16:45:05
 * @LastEditTime: 2020-08-09 19:32:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\service\monitor\ProjectMonitorService.ts
 */
import { getProjectMonitor, getMonitoringPoint } from '../../api/monitor/monitor-api';

export default class ProjectMonitorService{
    async getProjectMonitor(projectId:string): Promise<any> {
        let res = await getProjectMonitor(projectId);
        return res;
    }

    async getMonitoringPoint(projectId:string,partitionId:string,groupId:string):Promise<any>{
        let res = await getMonitoringPoint(projectId,partitionId,groupId);
        return res;
    }
    
}