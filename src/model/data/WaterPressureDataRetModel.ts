import WaterPressureDataModel from './WaterPressureDataModel';

/*
 * @Author: your name
 * @Date: 2020-08-01 19:15:08
 * @LastEditTime: 2020-08-01 19:15:26
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\data\WaterModel.ts
 */ 
export default class WaterPressureDataRetModel{
    public stationName:string;

    public waterPressure:Array<WaterPressureDataModel>;
    
    constructor({
        stationName,
        waterPressure,
    }:any){
        this.stationName = stationName;
        this.waterPressure = waterPressure;
    }
}