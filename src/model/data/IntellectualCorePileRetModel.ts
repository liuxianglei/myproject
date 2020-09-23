/*
 * @Author: your name
 * @Date: 2020-08-30 14:40:30
 * @LastEditTime: 2020-08-30 14:42:32
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\data\IntellectualCorePileRetModel.ts
 */
import IntellectualCorePileModel from './IntellectualCorePileModel';

export default class IntellectualCorePileRetModel{
    public corePileModels:Array<IntellectualCorePileModel>

    public stationName:string;

    constructor({
        stationName,
        corePileModels,
    }:any){
        this.stationName = stationName;
        this.corePileModels = corePileModels;
    }
}