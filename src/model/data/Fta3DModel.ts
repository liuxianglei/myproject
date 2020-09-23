/*
 * @Author: your name
 * @Date: 2020-08-06 21:43:35
 * @LastEditTime: 2020-08-23 22:32:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\data\Fta3DModel.ts
 */
export default class Fta3DModel{
    public x:number;
    public y:number;
    public z:number;
    public h:number;
    public pointNo:string;
    public pointName:string;
    constructor({
        x,
        y,
        z,
        h,
        pointNo,
        pointName
    }:any){
        this.x = x;
        this.y = y;
        this.z = z;
        this.h = h;
        this.pointNo = pointNo;
        this.pointName = pointName;
    }
}