/*
 * @Author: your name
 * @Date: 2020-08-06 21:43:35
 * @LastEditTime: 2020-08-23 23:30:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\data\PointDataModel.ts
 */
import PointModel from './PointModel';
import Fta3DModel from './Fta3DModel';

export default class PointDataModel{
    public number:number;
    
    public pointName:string;
    
    public ax:Array<PointModel>;
    
    public ay:Array<PointModel>;
    
    public axy:Array<PointModel>;
    
    public z:Array<PointModel>;
    
    public sx:Array<PointModel>;
    public sy:Array<PointModel>;
    public sxy:Array<PointModel>;

    //原始数据x
    public originalX:Array<PointModel>;
    //原始数据Y
    public originalY:Array<PointModel>;
    
    //矢量角
    public azimuth:number;

    //矢量值
    public vectorValue:number;

    constructor({
        number,
        pointName,
        ax,
        ay,
        axy,
        z,
        sx,
        sy,
        sxy,
        originalX = [],
        originalY = [],
        azimuth,
        vectorValue
    }:any){
        this.number = number;
        this.pointName = pointName;
        this.ax = ax;
        this.ay = ay;
        this.axy = axy;
        this.z = z;
        this.sx = sx;
        this.sy = sy;
        this.sxy = sxy;
        this.originalX = originalX;
        this.originalY = originalY;
        this.azimuth = azimuth;
        this.vectorValue = vectorValue;
    }
}