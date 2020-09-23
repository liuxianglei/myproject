/*
 * @Author: your name
 * @Date: 2020-08-05 20:45:55
 * @LastEditTime: 2020-08-30 16:00:35
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\data\IntellectualCorePileModel.ts
 */

export default class IntellectualCorePileModel{
    public collectTime:Date;
    /**
     * x倾斜角
     */
    public tiltAngleX:number;
    /**
     * y倾斜角
     */
    public tiltAngleY:number;
    /**
     * xy倾斜角
     */
    public tiltAngleXY:number;
    /**
     * 加速度
     */
    public acceleratedX:number;
    public acceleratedY:number;
    /**
     *xy角位移加速度
     *
     * @type {number}
     * @memberof IntellectualCorePileModel
     */
    public acceleratedXY:number;

    /**
     * 变形
     *
     * @type {number}
     * @memberof IntellectualCorePileModel
     */
    public deformation:number;

    /**
     * 监测点名称
     *
     * @type {string}
     * @memberof IntellectualCorePileModel
     */
    public stationName:string;

    constructor({
        collectTime,
        tiltAngleX,
        tiltAngleY,
        tiltAngleXY,
        acceleratedX,
        acceleratedY,
        acceleratedXY,
        deformation,
        stationName,
    }:any){
        this.collectTime = collectTime;
        this.tiltAngleX = tiltAngleX;
        this.tiltAngleY = tiltAngleY;
        this.tiltAngleXY = tiltAngleXY;
        this.acceleratedX = acceleratedX;
        this.acceleratedY = acceleratedY;
        this.acceleratedXY = acceleratedXY;
        this.deformation = deformation;
        this.stationName = stationName;
    }
}