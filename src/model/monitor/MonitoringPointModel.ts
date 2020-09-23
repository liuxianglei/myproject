/*
 * @Author: your name
 * @Date: 2020-08-08 16:50:38
 * @LastEditTime: 2020-08-08 16:51:04
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\monitor\MonitoringPointModel.ts
 */
export default class MonitoringPointModel{
    public currentX:string;
    
    public currentY:string;
    
    public MonitorPointName:string;
    
    public WaringState:string;
    
    public MonitorPointId:string;
    
    constructor({
        currentX,
        currentY,
        MonitorPointName,
        WaringState,
        MonitorPointId,
    }:any){
        this.currentX = currentX;
        this.currentY = currentY;
        this.MonitorPointName = MonitorPointName;
        this.WaringState = WaringState;
        this.MonitorPointId = MonitorPointId;
    }
}