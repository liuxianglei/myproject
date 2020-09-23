/*
 * @Author: your name
 * @Date: 2020-07-25 19:47:11
 * @LastEditTime: 2020-07-25 19:49:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\device\DeviceModel.ts
 */ 
export default class DeviceModel{
    /* 监测点类型编号 */
    public deviceId:string;

    /* 监测点类型名称 */
    public deviceName:String;

    constructor({
        deviceId,
        deviceName
    }:any){
        this.deviceId = deviceId,
        this.deviceName = deviceName
    }
}