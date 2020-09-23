/*
 * @Author: your name
 * @Date: 2020-08-01 19:15:08
 * @LastEditTime: 2020-08-01 19:15:26
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\data\WaterModel.ts
 */ 
export default class WaterPressureDataModel{
    public stationName:string;

    public collectDate:Date;
    
    public waterPressure:number;
    
    constructor({
        stationName,
        collectDate,
        waterPressure,
    }:any){
        this.stationName = stationName;
        this.collectDate = collectDate;
        this.waterPressure = waterPressure;
    }
}