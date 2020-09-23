/*
 * @Author: your name
 * @Date: 2020-08-08 16:49:23
 * @LastEditTime: 2020-08-09 19:00:12
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\monitor\RealtimeMonitoringModel.ts
 */
export default class RealtimeMonitoringModel{
    public projectId:string;
    
    public projectname:string;
    
    public currentX:string;
    
    public currentY:string;
    
    public normalNums:number;
    
    public offLineNums:number;
    
    public yellowWarningNums:number;
    
    public orangeWarningNums:number;
    
    public redWarningNums:number;

    public blueWarningNums:number;
    
    constructor({
        projectId,
        projectname,
        currentX,
        currentY,
        normalNums,
        offLineNums,
        yellowWarningNums,
        orangeWarningNums,
        redWarningNums,
        blueWarningNums
    }:any){
        this.projectId = projectId;
        this.projectname = projectname;
        this.currentX = currentX;
        this.currentY = currentY;
        this.normalNums = normalNums;
        this.offLineNums = offLineNums;
        this.yellowWarningNums = yellowWarningNums;
        this.orangeWarningNums = orangeWarningNums;
        this.redWarningNums = redWarningNums;
        this.blueWarningNums = blueWarningNums;
    }
}