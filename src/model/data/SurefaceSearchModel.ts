import DeviceModel from '../device/DeviceModel';

/*
 * @Author: your name
 * @Date: 2020-07-25 19:38:50
 * @LastEditTime: 2020-09-03 10:39:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \safety\src\model\data\SurefaceSearchModel.ts
 */ 
export default class SurefaceSearchModel{
    /**
     *
     * 项目编号
     * @memberof SurefaceSearchModel
     */
    public projectId:string;

    /**
     * 统计周期(小时、日、3天、周、月、年)
     *
     * @type {string}
     * @memberof SurefaceSearchModel
     */
    public countPeriod:string;

    /**
     * 监测站编号列表
     *
     * @type {Array<string>}
     * @memberof SurefaceSearchModel
     */
    public stationIdList:string;

    /**
     * 监测站编号
     *
     * @type {string}
     * @memberof SurefaceSearchModel
     */
    public stationId:string;

    /**
     * 开始时间
     *
     * @type {string}
     * @memberof SurefaceSearchModel
     */
    public startTime:string;

    /**
     * 结束时间
     *
     * @type {string}
     * @memberof SurefaceSearchModel
     */
    public endTime:string;

    /**
     *设备类型对象
     *
     * @type {DeviceModel}
     * @memberof SurefaceSearchModel
     */
    public deviceTypeModel:DeviceModel;

    /**
     * 度数
     *
     * @type {number}
     * @memberof SurefaceSearchModel
     */
    public degree:number;

    /**
     *
     * 数据查询频率
     * @type {number}
     * @memberof SurefaceSearchModel
     */
    public dataQueryFrequency:number;

    /**
     * 监测点类型编号 地表联合查询 第二种类型需传监测点类型编号
     *
     * @type {string}
     * @memberof SurefaceSearchModel
     */
    public deviceId:string;

    /**
     *  曲线类型
     *
     * @type {string}
     * @memberof SurefaceSearchModel
     */
    public lineType:string;

    constructor({
       projectId,
       countPeriod,
       stationIdList,
       stationId,
       startTime,
       endTime,
       deviceTypeModel,
       degree,
       dataQueryFrequency,
       deviceId,
       lineType
    }:any){
        this.projectId = projectId;
        this.countPeriod = countPeriod;
        this.stationIdList = stationIdList;
        this.stationId = stationId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.deviceTypeModel = deviceTypeModel;
        this.degree = degree;
        this.dataQueryFrequency = dataQueryFrequency;
        this.deviceId = deviceId;
        this.lineType = lineType;
    }
}