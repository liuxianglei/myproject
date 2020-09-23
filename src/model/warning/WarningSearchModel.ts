/*
 * @Author: your name
 * @Date: 2020-08-07 23:05:24
 * @LastEditTime: 2020-08-07 23:06:02
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\warning\WarningSearchModel.ts
 */
export default class WarninSearchModel{
    public projectId:string;
    
    public deviceId:string;
    
    public deviceType:string;
    
    public warningLevel:string;
    
    public processingStatus:number;
    
    public waringDate:string;
    
    constructor({
        projectId,
        deviceId,
        deviceType,
        warningLevel,
        processingStatus,
        waringDate,
    }:any){
        this.projectId = projectId;
        this.deviceId = deviceId;
        this.deviceType = deviceType;
        this.warningLevel = warningLevel;
        this.processingStatus = processingStatus;
        this.waringDate = waringDate;
    }
}
    
    