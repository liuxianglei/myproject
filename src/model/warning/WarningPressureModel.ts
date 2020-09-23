/*
 * @Author: your name
 * @Date: 2020-08-16 16:34:53
 * @LastEditTime: 2020-08-16 16:36:02
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\warning\WarningPressureModel.ts
 */
export default class WarningPressureModel{
    public projectId:string;

    public partitionId:string;

    public groupId:string;

    public enable:boolean;

    public waterPressure0:number;

    public waterPressure1:number;

    public waterPressure2:number;

    public waterPressure3:number;

    public mobileNumbers:string;

    constructor({
        projectId,
        partitionId,
        groupId,
        enable,
        waterPressure0,
        waterPressure1,
        waterPressure2,
        waterPressure3,
        mobileNumbers,
    }:any){
        this.projectId = projectId;
        this.partitionId = partitionId;
        this.groupId = groupId;
        this.enable = enable;
        this.waterPressure0 = waterPressure0;
        this.waterPressure1 = waterPressure1;
        this.waterPressure2 = waterPressure2;
        this.waterPressure3 = waterPressure3;
        this.mobileNumbers = mobileNumbers;
    }
}

