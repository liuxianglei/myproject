/*
 * @Author: your name
 * @Date: 2020-08-01 19:15:08
 * @LastEditTime: 2020-08-01 19:15:26
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\data\WaterModel.ts
 */ 
export default class WaterLevelDataModel{
    public stationName:string;

    public collectDate:Date;
    
    public waterLevel:number;
    
    constructor({
        stationName,
        collectDate,
        waterLevel,
    }:any){
        this.stationName = stationName;
        this.collectDate = collectDate;
        this.waterLevel = waterLevel;
    }
}