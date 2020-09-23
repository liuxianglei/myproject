import RainGaugeAnalysisModel from './RainGaugeAnalysisModel';

/*
 * @Author: your name
 * @Date: 2020-08-01 19:11:19
 * @LastEditTime: 2020-08-01 19:13:58
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\data\RainGaugeAnalysisModel.ts
 */ 
export default class RainGaugeAnalysisRetModel{
    public stationName:string;

    public models:Array<RainGaugeAnalysisModel>;
    
    constructor({
        stationName,
        models
    }:any){
        this.stationName = stationName;
        this.models = models;
    }
}
    