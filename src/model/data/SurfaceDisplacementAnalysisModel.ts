/*
 * @Author: your name
 * @Date: 2020-07-06 20:40:50
 * @LastEditTime: 2020-08-30 19:01:14
 * @LastEditors: Please set LastEditors
 * @Description: 地表位移数据model
 * @FilePath: \safety\src\model\data\SurfaceDisplacementAnalysisModel.ts
 */ 
export default class SurfaceDisplacementAnalysisModel{

    /*
     * 监测点名称
     */
    public stationName:string;
    /*
     * 采集数据时间
     */
    public collectDataTime:Date;
    /*
     * 数据采集起始时间
     */
    public startTime:Date;
    /*
     * 数据采集结束时间
     */
    public endTime:Date;
    /*
     * X向日位移量 
     */
    public x:number;
    /*
     * Y向日位移量
     */
    public y:number;

    /*
     * H向日位移量
     */
    public h:number;
    /*
     * XY向日位移量
     */
    public lxy:number;

    /*
     * 3D日位移量
     */
    public l3d:number;

    /*
     * 累计X向日变化
     */
    public sx:number;

    /*
     * 累计Y向日变化
     */
    public sy:number;

    /*
     * 累计H向日变化
     */
    public sh:number;

    /*
     * 累计XY向日变化
     */
    public sxy:number;

    /*
     * 累计3D日变化
     */
    public s3d:number;

    /*
     * X向日位移速度
     */
    public vx:number;

    /*
     * Y向日位移速度
     */
    public vy:number;

    /*
     * H向日位移速度
     */
    public vh:number;

    /*
     * XY向日位移速度
     */
    public vxy:number;

    /*
     * 3D日位移速度
     */
    public vl3d:number;

    /*
     * X向日位移加速度
     */
    public accX:number;

    /*
     * Y向日位移加速度
     */
    public accY:number;

    /*
     * 垂直位移加速度
     */
    public accH:number;
    /*
     * 垂直位移加速度
     */
    public accXY:number;

    /*
     * 3D日位移加速度
     */
    public acc3d:number;

    /**
     * 三维位移矢量值
     */
    public beta:number;

    /*
     * XY向日位移矢量角
     */
    public vectoranglexy:number;

    public originalX:number;

    public originalY:number;

    constructor(
        {
            stationName,  
            collectDataTime,
            startTime,  
            endTime, 
            x, 
            y, 
            h, 
            lxy, 
            l3d, 
            sx, 
            sy, 
            sh, 
            sxy, 
            s3d, 
            vx, 
            vy,
            vh, 
            vxy, 
            vL3d, 
            accX, 
            accY, 
            accH, 
            accXY,
            acc3d, 
            beta,
            vectoranglexy,
            originalX,
            originalY
        }:any){
        this.stationName = stationName;
        this.collectDataTime = collectDataTime
        this.startTime = startTime;
        this.endTime = endTime;
        this.x = x;
        this.y = y;
        this.h = h;
        this.lxy = lxy;
        this.l3d = l3d;
        this.sx = sx;
        this.sy = sy;
        this.sh = sh;
        this.sxy = sxy;
        this.s3d = s3d;
        this.vx = vx;
        this.vy = vy;
        this.vh = vh;
        this.vxy = vxy;
        this.vl3d = vL3d;
        this.accX = accX;
        this.accY = accY;
        this.accH = accH;
        this.accXY = accXY;
        this.acc3d = acc3d;
        this.beta = beta;
        this.vectoranglexy = vectoranglexy;
        this.originalX = originalX;
        this.originalY = originalY;
    }
}