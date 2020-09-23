/*
 * @Author: your name
 * @Date: 2020-08-16 16:29:23
 * @LastEditTime: 2020-08-16 16:30:21
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\warning\WarningLevelModel.ts
 */
export default class WarningLevelModel{
    public projectId:string;

    public partitionId:string;

    public groupId:string;

    public enable:boolean;

    public waterLevel0:number;

    public waterLevel1:number;

    public waterLevel2:number;

    public waterLevel3:number;

    public mobileNumbers:string;

    constructor({
        projectId,
        partitionId,
        groupId,
        enable,
        waterLevel0,
        waterLevel1,
        waterLevel2,
        waterLevel3,
        mobileNumbers,
    }:any){
        this.projectId = projectId;
        this.partitionId = partitionId;
        this.groupId = groupId;
        this.enable = enable;
        this.waterLevel0 = waterLevel0;
        this.waterLevel1 = waterLevel1;
        this.waterLevel2 = waterLevel2;
        this.waterLevel3 = waterLevel3;
        this.mobileNumbers = mobileNumbers;
    }
}

