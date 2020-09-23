/*
 * @Author: your name
 * @Date: 2020-08-08 08:37:56
 * @LastEditTime: 2020-08-16 16:27:55
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\warning\RainGaugeParmsSetModel.ts
 */
export default class RainGaugeParmsSetModel{
    public projectId:string;

    public partitionId:string;

    public groupId:string;

    public enable:boolean;

    public dayRainLevel0:number;

    public dayRainLevel1:number;

    public dayRainLevel2:number;

    public dayRainLevel3:number;

    public mobileNumbers:string;

constructor({
    projectId,
    partitionId,
    groupId,
    enable,
    dayRainLevel0,
    dayRainLevel1,
    dayRainLevel2,
    dayRainLevel3,
    mobileNumbers,
}:any){
    this.projectId = projectId;
    this.partitionId = partitionId;
    this.groupId = groupId;
    this.enable = enable;
    this.dayRainLevel0 = dayRainLevel0;
    this.dayRainLevel1 = dayRainLevel1;
    this.dayRainLevel2 = dayRainLevel2;
    this.dayRainLevel3 = dayRainLevel3;
    this.mobileNumbers = mobileNumbers;
}
}

