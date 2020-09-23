/*
 * @Author: your name
 * @Date: 2020-08-01 19:06:32
 * @LastEditTime: 2020-08-01 19:07:18
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\data\PointModel.ts
 */ 
export default class PointModel{
    public dataDate:Date;
    
    public dataValue:number;
    
    constructor({
        dataDate,
        dataValue,
    }:any){
        this.dataDate = dataDate;
        this.dataValue = dataValue;
    }
}