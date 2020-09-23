/*
 * @Author: your name
 * @Date: 2020-08-28 11:27:58
 * @LastEditTime: 2020-09-01 16:29:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\data\FlexiTiltAnalysisTableModel.ts
 */
export default class FlexiTiltAnalysisTableModel{
    public dataDate:Date;
    public number:number;
    public pointName:string;
    public sx:number;
    public sy:number;
    public sxy:number;
    public ax:number;
    public ay:number;
    public axy:number;
    public vx:number;
    public vy:number;
    public vxy:number;
    public rotationAngle:number;
    public z:number;
    constructor({
        dataDate,
        number,
        pointName,
        sx,
        sy,
        sxy,
        ax,
        ay,
        axy,
        vx,
        vy,
        vxy,
        rotationAngle,
        z
    }:any){
        this.dataDate = dataDate;
        this.number = number;
        this.pointName = pointName;
        this.sx = sx;
        this.sy = sy;
        this.sxy = sxy;
        this.ax = ax;
        this.ay = ay;
        this.axy = axy;
        this.vx = vx;
        this.vy = vy;
        this.vxy = vxy;
        this.rotationAngle = rotationAngle;
        this.z = z;
    }
}