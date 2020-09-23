/*
 * @Author: your name
 * @Date: 2020-08-16 17:29:57
 * @LastEditTime: 2020-08-16 17:32:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\warning\WarningSettingSearchModel.ts
 */
export default class WarningSettingSearchModel{
    public projectId:string;

    public partitionId:string;

    public groupId:string;

    public deviceId:string;

    constructor({
        projectId,
        partitionId,
        groupId,
        deviceId,
    }:any){
        this.projectId = projectId;
        this.partitionId = partitionId;
        this.groupId = groupId;
        this.deviceId = deviceId;
    }
}