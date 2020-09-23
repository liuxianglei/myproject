/*
 * @Author: your name
 * @Date: 2020-08-01 19:11:19
 * @LastEditTime: 2020-08-01 19:13:58
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\data\RainGaugeAnalysisModel.ts
 */ 
export default class RainGaugeAnalysisModel{
    public stationName:string;

    public time:Date;
    
    public rains:number;
    
    constructor({
        stationName,
        time,
        rains,
    }:any){
        this.stationName = stationName;
        this.time = time;
        this.rains = rains;
    }
}
    