/*
 * @Author: your name
 * @Date: 2020-07-26 16:27:24
 * @LastEditTime: 2020-07-26 16:32:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\station\StationQuery.ts
 */ 
export default class StationQuery{

    public projectId:string;

    public partitionId:string;

    public groupId:string;

    public deviceId:string;

    constructor({
        projectId,
        partitionId,
        groupId,
        deviceId
    }:any){
        this.projectId = projectId;
        this.partitionId = partitionId;
        this.groupId = groupId;
        this.deviceId = deviceId;
    }
}
