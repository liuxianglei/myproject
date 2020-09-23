/*
 * @Author: your name
 * @Date: 2020-08-07 23:02:48
 * @LastEditTime: 2020-08-09 14:27:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\warning\WarningDataModel.ts
 */
export default class WarningDataModel{
    public warningId:string;
    
    public projectName:string;
    
    public warningDate:string;
    
    public stationName:string;
    
    public deviceType:string;
    
    public warningLevel:number;
    
    public processingStatus:number;
    
    public warningText:string;
    
    constructor({
        warningId,
        projectName,
        warningDate,
        stationName,
        deviceType,
        warningLevel,
        processingStatus,
        warningText,
    }:any){
        this.warningId = warningId;
        this.projectName = projectName;
        this.warningDate = warningDate;
        this.stationName = stationName;
        this.deviceType = deviceType;
        this.warningLevel = warningLevel;
        this.processingStatus = processingStatus;
        this.warningText = warningText;
    }
}