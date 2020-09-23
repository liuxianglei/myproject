import WaterLevelDataModel from './WaterLevelDataModel';

/*
 * @Author: your name
 * @Date: 2020-08-01 19:15:08
 * @LastEditTime: 2020-08-01 19:15:26
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\data\WaterModel.ts
 */ 
export default class WaterLevelDataRetModel{
    public stationName:string;

    public waterLevel:Array<WaterLevelDataModel>;
    
    constructor({
        stationName,
        waterLevel,
    }:any){
        this.stationName = stationName;
        this.waterLevel = waterLevel;
    }
}