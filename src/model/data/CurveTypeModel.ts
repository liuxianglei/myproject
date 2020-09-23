/*
 * @Author: your name
 * @Date: 2020-07-26 17:53:23
 * @LastEditTime: 2020-07-26 17:55:57
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\data\CurveTypeModel.ts
 */ 

export default class CurvetTypeModel{

    public curveTypeId:number;

    public curveTypeName:string;

    constructor({
        curveTypeId,
        curveTypeName
    }:any){
        this.curveTypeId = curveTypeId;
        this.curveTypeName = curveTypeName;
    }
}